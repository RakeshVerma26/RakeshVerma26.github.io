// main.js — Renders DATA (from data.js) into the page

/** Strip **bold** markdown for plain-text / PDF output. */
function stripMd(s) { return String(s).replace(/\*\*(.*?)\*\*/g, '$1'); }

/** Replace characters unsupported by jsPDF built-in fonts. */
function pdfSafe(s) { return stripMd(s).replace(/→/g, ' > ').replace(/—/g, ' - '); }

/** Resolve jsPDF constructor regardless of UMD global shape. */
function getJsPDF() {
  const w = typeof window !== 'undefined' ? window : {};
  return w.jspdf?.jsPDF ?? w.jspdf?.default?.jsPDF ?? (typeof w.jsPDF === 'function' ? w.jsPDF : null);
}

/** Strip leading emoji from category labels for PDF. */
function plainLabel(s) {
  const m = String(s).match(/[A-Za-z].*/);
  return m ? m[0].trim() : String(s).trim();
}

/* ═══════════════════════════════════════
   PDF GENERATION
   ═══════════════════════════════════════ */
function buildPDF() {
  const JsPDF = getJsPDF();
  if (!JsPDF) {
    alert('PDF library not loaded. Try hard-refreshing (Ctrl+Shift+R).');
    return;
  }
  const doc = new JsPDF({ unit: 'pt', format: 'letter', orientation: 'portrait' });
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const m = 48;
  const cw = pw - m * 2;
  let y = m;

  const clr = { body: [30, 41, 59], muted: [71, 85, 105], accent: [5, 150, 105] };

  const ensureSpace = (need) => { if (y + need > ph - m) { doc.addPage(); y = m; } };

  const heading = (label) => {
    ensureSpace(28);
    y += 6;
    doc.setFont('helvetica', 'bold').setFontSize(9.5).setTextColor(...clr.accent);
    doc.text(label.toUpperCase(), m, y);
    y += 12;
    doc.setDrawColor(...clr.accent).setLineWidth(0.6);
    doc.line(m, y, m + cw, y);
    y += 12;
    doc.setTextColor(...clr.body);
  };

  const para = (text, sz, lh, indent) => {
    sz = sz || 9.5; lh = lh || sz + 3.5; indent = indent || 0;
    doc.setFont('helvetica', 'normal').setFontSize(sz).setTextColor(...clr.body);
    doc.splitTextToSize(stripMd(text), cw - indent).forEach(ln => {
      ensureSpace(lh + 1);
      doc.text(ln, m + indent, y);
      y += lh;
    });
  };

  const bullets = (items, indent) => {
    indent = indent || 12;
    items.forEach(b => {
      const lines = doc.splitTextToSize(stripMd(b), cw - indent - 4);
      lines.forEach((ln, i) => {
        ensureSpace(12);
        doc.setFont('helvetica', 'normal').setFontSize(9.5).setTextColor(...clr.body);
        if (i === 0) doc.text('\u2022', m + indent - 6, y);
        doc.text(ln, m + indent, y);
        y += 11.5;
      });
    });
  };

  // ── Header ──
  doc.setFont('helvetica', 'bold').setFontSize(22).setTextColor(...clr.body);
  doc.text(DATA.profile.name, pw / 2, y, { align: 'center' });
  y += 24;
  doc.setFont('helvetica', 'normal').setFontSize(10).setTextColor(...clr.body);
  doc.splitTextToSize(stripMd(DATA.profile.tagline), cw).forEach(ln => {
    doc.text(ln, pw / 2, y, { align: 'center' }); y += 12;
  });
  const contactLine = [DATA.contact.email, DATA.contact.phone].filter(Boolean).join('  \u2022  ');
  doc.setFontSize(9).setTextColor(...clr.muted);
  doc.text(contactLine, pw / 2, y, { align: 'center' });
  y += 18;
  doc.setDrawColor(200, 200, 205).setLineWidth(0.35);
  doc.line(m + cw * 0.1, y, m + cw * 0.9, y);
  y += 14;

  // ── Summary ──
  heading('Summary');
  para(DATA.profile.bio);
  y += 6;
  
  // ── Photo ──
  const photoImg = document.getElementById('hero-photo');
  if (photoImg && photoImg.complete && photoImg.naturalWidth > 0 && !photoImg.src.includes('.svg')) {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 100; canvas.height = 100;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(photoImg, 0, 0, 100, 100);
      const photoData = canvas.toDataURL('image/jpeg', 0.85);
      doc.addImage(photoData, 'JPEG', pw - m - 65, m, 65, 65);
    } catch(e) { /* skip if CORS or placeholder */ }
  }
  // ── Key Achievements ──
  if (DATA.highlights && DATA.highlights.length) {
    heading('Key Achievements');
    DATA.highlights.forEach(h => {
      ensureSpace(24);
      // Metric in bold accent color
      doc.setFont('helvetica', 'bold').setFontSize(10).setTextColor(...clr.accent);
      doc.text('\u2022', m + 6, y);
      doc.text(stripMd(h.metric), m + 16, y);
      y += 13;
      // Label in normal body color
      doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor(...clr.body);
      doc.splitTextToSize(stripMd(h.label), cw - 20).forEach(ln => {
        ensureSpace(11);
        doc.text(ln, m + 20, y);
        y += 11;
      });
      y += 4;
    });
    y += 6;
  }

  // ── Experience ──
  heading('Experience');
  DATA.experience.forEach(job => {
    ensureSpace(20);
    // Title + Date
    const dateStr = stripMd(job.duration || '');
    doc.setFont('helvetica', 'normal').setFontSize(9);
    const dw = dateStr ? doc.getTextWidth(dateStr) + 12 : 0;
    doc.setFont('helvetica', 'bold').setFontSize(10.5).setTextColor(...clr.body);
    doc.splitTextToSize(pdfsafe(job.title), cw - dw).forEach((ln, i) => {
      ensureSpace(14);
      doc.setFont('helvetica', 'bold').setFontSize(10.5).setTextColor(...clr.body);
      doc.text(ln, m, y);
      if (i === 0 && dateStr) {
        doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor(...clr.muted);
        doc.text(dateStr, pw - m, y, { align: 'right' });
      }
      y += 14;
    });
    // Company
    doc.setFont('helvetica', 'italic').setFontSize(9.5).setTextColor(...clr.accent);
    doc.text(stripMd(job.company), m, y);
    y += 12;
    doc.setTextColor(...clr.body);
    // Sections
    (job.sections || []).forEach(sec => {
      if (sec.heading) {
        ensureSpace(14);
        doc.setFont('helvetica', 'bold').setFontSize(9).setTextColor(...clr.muted);
        doc.text(stripMd(sec.heading), m + 4, y);
        y += 11;
        doc.setTextColor(...clr.body);
      }
      bullets(sec.bullets, 14);
    });
    y += 8;
  });

  // ── Education ──
  heading('Education');
  DATA.education.forEach(e => {
    doc.setFont('helvetica', 'bold').setFontSize(10.5).setTextColor(...clr.body);
    doc.text(stripMd(e.degree + (e.field ? ' — ' + e.field : '')), m, y);
    y += 13;
    doc.setFont('helvetica', 'italic').setFontSize(9.5).setTextColor(...clr.muted);
    doc.text(stripMd(e.institution), m, y);
    y += 11;
    if (e.duration) {
      doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor(...clr.muted);
      doc.text(e.duration, m, y); y += 10;
    }
    y += 8;
  });

  // ── Skills ──
  heading('Core Skills');
  DATA.skills.forEach(g => {
    ensureSpace(12);
    doc.setFont('helvetica', 'bold').setFontSize(9).setTextColor(...clr.body);
    doc.text(plainLabel(g.category), m, y);
    y += 11;
    doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor(...clr.muted);
    doc.splitTextToSize(g.items.join(', '), cw - 14).forEach(ln => {
      ensureSpace(11);
      doc.text(ln, m + 12, y); y += 11;
    });
    y += 5;
  });

  // ── Certifications ──
  heading('Certifications');
  const certImgSize = 28;
  const certPromises = [];
  DATA.certifications.forEach(c => {
    ensureSpace(certImgSize + 8);
    const startY = y;
    // Try to add badge image
    if (c.badge) {
      try {
        const imgEl = document.querySelector(`img[src="${c.badge}"]`);
        if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
          const cvs = document.createElement('canvas');
          cvs.width = 56; cvs.height = 56;
          const cx = cvs.getContext('2d');
          cx.drawImage(imgEl, 0, 0, 56, 56);
          doc.addImage(cvs.toDataURL('image/png'), 'PNG', m + 4, y - 4, certImgSize, certImgSize);
        }
      } catch(e) { /* skip image */ }
    }
    const textX = c.badge ? m + certImgSize + 12 : m + 12;
    doc.setFont('helvetica', 'bold').setFontSize(9.5).setTextColor(...clr.body);
    doc.text(stripMd(c.title), textX, y + 6);
    doc.setFont('helvetica', 'normal').setFontSize(8.5).setTextColor(...clr.muted);
    doc.text(stripMd(c.org), textX, y + 18);
    y = startY + certImgSize + 8;
  });
}

/* ═══════════════════════════════════════
   DOM RENDERING
   ═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const D = DATA;

  // ── Nav ──
  const nav = document.getElementById('navbar');
  nav.innerHTML = `
    <a class="nav-brand" href="#about">${D.profile.firstName} <span>${D.profile.lastName}</span></a>
    <button type="button" class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
      <span class="nav-toggle-icon" aria-hidden="true"></span>
    </button>
    <div class="nav-links" id="nav-links">
      ${D.nav.map(n => `<a href="${n.href}">${n.label}</a>`).join('')}
    </div>
  `;
  const toggle = nav.querySelector('.nav-toggle');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ── Hero ──
  document.getElementById('hero-badge').textContent = D.profile.headline;
  document.getElementById('hero-first').textContent = D.profile.firstName + ' ';
  document.getElementById('hero-last').textContent = D.profile.lastName;
  document.getElementById('hero-title').textContent = D.profile.tagline;
  document.getElementById('hero-summary').textContent = D.profile.bio;
  document.getElementById('hero-photo').src = D.profile.photo;
  document.getElementById('hero-photo').alt = D.profile.name;
  document.getElementById('hero-ctas').innerHTML = `
    <button type="button" class="btn-primary" id="downloadBtn">Download CV</button>
    <a href="#contact" class="btn-secondary">Get In Touch</a>
  `;

  // ── Highlights ──
  if (D.highlights && D.highlights.length) {
    document.getElementById('highlights-grid').innerHTML = D.highlights.map((h, i) => `
      <div class="highlight-card reveal reveal-up" style="animation-delay:${i * 80}ms">
        <div class="highlight-metric">${esc(h.metric)}</div>
        <div class="highlight-label">${esc(h.label)}</div>
      </div>
    `).join('');
  }

  // ── Experience ──
  document.getElementById('exp-list').innerHTML = D.experience.map((job, i) => `
    <div class="timeline-item">
      <div class="exp-card reveal ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'}">
        <div class="exp-header">
          <div>
            <div class="exp-role">${esc(job.title)}</div>
            <div class="exp-company">${esc(job.company)}</div>
          </div>
          ${job.duration ? `<span class="exp-date">${esc(job.duration)}</span>` : ''}
        </div>
        ${job.description ? `<p class="exp-desc">${esc(job.description)}</p>` : ''}
        ${(job.sections || []).map(sec => `
          ${sec.heading ? `<div class="exp-section-heading">${esc(sec.heading)}</div>` : ''}
          <ul class="exp-bullets">
            ${sec.bullets.map(b => `<li>${esc(b)}</li>`).join('')}
          </ul>
        `).join('')}
      </div>
    </div>
  `).join('');

  // ── Skills ──
  document.getElementById('skills-grid').innerHTML = D.skills.map((g, i) => `
    <div class="skill-group reveal ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'}">
      <div class="skill-group-header">
        <span class="skill-group-icon">${g.icon || ''}</span>
        <span class="skill-group-title">${esc(g.category)}</span>
      </div>
      <div class="tags">
        ${g.items.map(s => `<span class="tag">${esc(s)}</span>`).join('')}
      </div>
    </div>
  `).join('');

  // ── Education ──
  document.getElementById('edu-list').innerHTML = D.education.map((e, i) => `
    <div class="edu-card reveal ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'}">
      <div class="edu-degree">${esc(e.degree)}</div>
      <div class="edu-field">${esc(e.field || '')}</div>
      <div class="edu-school">${esc(e.institution)}</div>
      ${e.duration ? `<span class="edu-duration">${esc(e.duration)}</span>` : ''}
    </div>
  `).join('');

  // ── Certifications ──
  document.getElementById('cert-list').innerHTML = D.certifications.map(c => `
    <div class="cert-card reveal reveal-up">
      ${c.badge
        ? `<img class="cert-badge-img" src="${esc(c.badge)}" alt="${esc(c.title)}" />`
        : `<div class="cert-icon-wrap">${c.icon || '🏅'}</div>`
      }
      <div class="cert-body">
        <div class="cert-name">${esc(c.title)}</div>
        <div class="cert-org">${esc(c.org)}</div>
      </div>
    </div>
  `).join('');

  // ── Contact ──
  const ct = D.contact;
  document.getElementById('contact-grid').innerHTML = `
    <a class="contact-item reveal reveal-left" href="mailto:${esc(ct.email)}">
      <div class="contact-icon">✉️</div>
      <div class="contact-label">Email</div>
      <div class="contact-value">${esc(ct.email)}</div>
    </a>
    <a class="contact-item reveal reveal-right" href="tel:${esc(ct.phone.replace(/[^\d+]/g, ''))}">
      <div class="contact-icon">📱</div>
      <div class="contact-label">Phone</div>
      <div class="contact-value">${esc(ct.phone)}</div>
    </a>
  `;

  // ── Footer ──
  const f = D.footer;
  document.getElementById('footer-text').innerHTML =
    `&copy; ${esc(f.year)} <span class="foot-accent">${esc(f.name)}</span> &mdash; This page is read-only.`;

  // ── Download CV ──
  document.addEventListener('click', e => {
    const btn = e.target.closest('#downloadBtn');
    if (!btn) return;
    const label = btn.textContent;
    btn.textContent = 'Preparing\u2026';
    btn.disabled = true;
    queueMicrotask(() => {
      try { buildPDF(); }
      catch (err) { console.error(err); alert('Could not generate PDF. Try again.'); }
      finally { btn.textContent = label; btn.disabled = false; }
    });
  });

  // ── Smooth scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── Active nav highlight ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let cur = '';
    const offset = nav.offsetHeight + 24;
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - offset) cur = s.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // ── Scroll reveal (IntersectionObserver) ──
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(r => obs.observe(r));
  }, 60);
});

/** Escape HTML to prevent XSS. */
function esc(s) {
  const d = document.createElement('div');
  d.textContent = String(s || '');
  return d.innerHTML;
}
