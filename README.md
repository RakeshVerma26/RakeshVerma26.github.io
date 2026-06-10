# Rakesh Verma — Personal Portfolio

A clean, SEO-optimised personal portfolio with data/view separation, scroll animations, and PDF download.

## Architecture

```
resume/
├── index.html       ← Structure only (no content, no styles inline)
├── style.css        ← All visual design — navy/emerald theme
├── main.js          ← Reads data.js, renders everything into the DOM
├── data.js          ← ✏️  ONLY FILE YOU EVER EDIT to update the site
├── assets/
│   └── photo.svg    ← Profile photo (replace with your own)
├── robots.txt       ← Search engine crawl rules
├── sitemap.xml      ← Helps Google index the page
└── README.md        ← This file
```

## How to Update Content

You **never need to touch** `index.html`, `style.css`, or `main.js` for content changes.

Just open **`data.js`** and edit the relevant section (experience, skills, education, certifications, contact). Save → commit → push → live.

## How to Update Your Photo

1. Place your photo in `resume/assets/` (`.jpg`, `.png`, `.webp`).
2. Open `data.js` and update the `photo` field:
   ```js
   photo: "assets/your-photo.jpg",
   ```
3. Commit and push.

**Tip:** Use a square image (400×400 px) for best results.

## Viewing the Page

Once GitHub Pages is enabled on this branch, the page will be accessible at:

```
https://cigna-group.github.io/Rakesh_VermaM32199/resume/
```

> The page is read-only — visitors can view but not edit any content.
> Visitors can download a PDF resume via the "Download CV" button.
