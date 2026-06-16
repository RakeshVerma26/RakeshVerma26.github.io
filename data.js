// data.js — All content for Rakesh Verma's personal portfolio
// ✏️ ONLY FILE YOU EVER EDIT to update the site. No framework, no build step.

const DATA = {

  profile: {
    name: "Rakesh Verma",
    firstName: "Rakesh",
    lastName: "Verma",
    tagline: "Senior Platform Architect · AWS Certified · AI-Enabled Delivery & Developer Enablement",
    headline: "18+ Years in Enterprise Technology",
    bio: "Strategic platform architecture leader with 18+ years of progressive experience defining scalable internal platforms, enabling developer self-service, and embedding AI-assisted practices into enterprise software delivery. Drove $1.2M+ in annual cost savings through platform-level infrastructure optimization and FinOps governance across $5M+ technology budgets. MBA in Business Analytics enabling data-backed architectural decisions that improved operational efficiency by 60%. AWS Certified Solutions Architect with a proven track record of delivering 20+ end-to-end projects following enterprise standards, authoring 30+ Architecture Decision Records (ADRs) to de-risk delivery, and integrating AI tooling that accelerated developer productivity by 35%",
    photo: "assets/Rakesh.jpeg",
    cvFileName: "Rakesh_Verma_Resume.pdf",
  },

  nav: [
    { label: "About",          href: "#about" },
    { label: "Highlights",     href: "#highlights" },
    { label: "Experience",     href: "#experience" },
    { label: "Skills",         href: "#skills" },
    { label: "Education",      href: "#education" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact",        href: "#contact" },
  ],

  highlights: [
    { metric: "$1.2M+", label: "Annual cloud cost savings through AWS rightsizing, Reserved Instances, Savings Plans, and auto-scaling optimization" },
    { metric: "20+", label: "End-to-end projects delivered following enterprise architecture standards, with zero critical post-delivery defects" },
    { metric: "20+", label: "Architecture Decision Records (ADRs) authored, establishing governed decision trails that prevented 15+ costly mid-delivery pivots" },
    { metric: "60%", label: "Reduction in batch-processing time — cut from 6+ hrs to under 2.5 hrs by re-engineering COBOL/JCL/DB2 modules" },
    { metric: "90%", label: "Test-automation coverage achieved, eliminating ~4,000 hrs/year of manual QA effort and accelerating releases by 3×" },
    { metric: "30", label: "Cross-functional team members managed across onshore/offshore models, maintaining 99%+ SLA compliance" },
    { metric: "40%", label: "Reduction in production incidents through proactive SRE monitoring, automated alerting, and self-healing architectures" },
    { metric: "50%", label: "Faster time-to-market via end-to-end CI/CD pipelines with zero-downtime deployments" },
    { metric: "100%", label: "SOX audit compliance maintained across 30 applications for 3+ consecutive years" },
  ],

  experience: [
    {
      title: "Senior Solution Architect / Senior Staff Engineer",
      company: "Cigna Healthcare",
      duration: "Sep 2021 — Present",
      description: "Architected and led end-to-end cloud infrastructure strategy for Client Companion and QUIC applications serving 10,000+ users, delivering $1.2M+ in annual cost savings.",
      sections: [
        {
          heading: "",
          bullets: [
            "Directed SRE and production-support transformation that reduced production incidents by 40% YoY, achieving 99.95% application uptime across a portfolio supporting $50M+ in annual claims throughput",
            "Defined and maintained architectural vision for internal platform capabilities (Client Companion & QUIC) serving 10,000+ users — authored 30+ Architecture Decision Records (ADRs) during requirements phase, preventing 15+ costly architectural pivots during delivery",
            "Delivered 20+ end-to-end projects following enterprise architecture standards, coordinating across 5 engineering teams with a 98% on-time delivery rate and zero critical post-launch defects",
            "Conducted quarterly FinOps reviews with VP/Director leadership, maintaining infrastructure spend within 5% of $5M+ annual budget forecast — identified $1.2M+ in optimization opportunities through rightsizing, Reserved Instances, and Savings Plans",
            "Spearheaded DevOps transformation across 5 engineering teams — implemented CI/CD pipelines (AWS CodePipeline, Jenkins, GitHub Actions), cutting deployment time from 4 hours to under 25 minutes and increasing release frequency from monthly to weekly (10× improvement)",
            "Conducted 12+ AWS Well-Architected Framework reviews, delivering actionable recommendations that improved performance benchmarks by 30% and eliminated 15+ critical security gaps",
            "Led cloud migration of 8 legacy mainframe applications to containers (ECS/EKS) and serverless (Lambda, Fargate), reducing infrastructure costs by 35% and improving scalability to handle 3× peak-load traffic",
            "Enforced enterprise security and compliance through IAM least-privilege policies, KMS encryption, VPC segmentation, and continuous monitoring via Security Hub, GuardDuty, and AWS Config — maintaining 100% compliance with HIPAA, GDPR, SOC 2, and CIS benchmarks across 20+ AWS accounts",
            "Collaborated with executive stakeholders (CTO, Product Management, Security) to shape a 3-year cloud strategy and roadmap; mentored 15+ engineers on AWS best practices, serverless, and microservices",
            "Prototyped 5 emerging AWS services (AI/ML, GenAI, IoT, Data Lakes), delivering 3 POCs approved for production adoption, projected to generate $500K+ in business value",
            "Led integration of AI-assisted development practices across 5 engineering teams — standardized GitHub Copilot and Amazon CodeWhisperer usage with governed platform patterns, improving developer productivity by 35% and reducing boilerplate code generation time by 50%",
            "Defined platform-supported AI workflows for code review, test generation, and documentation — moved teams from ad-hoc AI usage to structured, repeatable, enterprise-approved approaches; delivered 3 AI-enabled POCs approved for production ($500K+ projected business value)",
          ],
        },
      ],
    },
    {
      title: "Senior Consultant — Technical Lead",
      company: "CGI",
      duration: "May 2019 — Aug 2021",
      description: "",
      sections: [
        {
          heading: "",
          bullets: [
            "Led a team of 12 onshore/offshore engineers for claims-processing automation, delivering solutions that automated 90% of testing effort — saving ~4,000 hours/year ($600K+ in labor costs)",
            "Built the business case for migrating 6 legacy claims modules to AWS, projecting $800K in 3-year TCO savings",
            "Automated end-to-end claims entry using Jenkins, Python, and Oracle APEX, reducing manual processing time by 75% (from 8 hrs/day to 2 hrs/day) and cutting error rates by 60%",
            "Created 10+ system architectures and detailed designs; led peer reviews for 50+ code deliverables, ensuring zero critical defects in production over 2 years",
            "Collaborated across 4 IT application teams, providing high-level effort estimates for $2M+ in new initiatives",
          ],
        },
      ],
    },
    {
      title: "Sr. Technical Lead Analyst → Associate Manager",
      company: "Euclid Technologies (Client: VNSNY Health Plans)",
      duration: "Apr 2016 — Apr 2019",
      description: "Promoted from Sr. Technical Lead Analyst to Associate Manager within 12 months, managing a portfolio of 30 applications with a combined annual budget of $3M+.",
      sections: [
        {
          heading: "",
          bullets: [
            "Led data analytics initiatives — analyzed $200M+ in claims payment data using Python, SQL (Toad), and SAS, delivering weekly executive dashboards that surfaced $500K+ in overpayment recovery opportunities",
            "Managed a team of 10 onshore/offshore members, maintaining 99%+ SLA compliance across 500+ monthly service requests and delivering 100% of critical enhancements on time and within budget",
            "Served as single point of contact between 8 business stakeholders and offshore teams; translated 50+ business requirements into technical feasibility assessments, reducing requirement-to-delivery cycle time by 30%",
            "Optimized batch-processing windows by 60% — from 6+ hours to under 2.5 hours — by re-engineering 25+ COBOL/JCL/DB2 modules and tuning 15 DB2 stored procedures, saving ~$200K/year in mainframe MIPS costs",
            "Owned disaster recovery planning and SOX audit compliance for 30 business-critical applications, achieving 100% audit compliance for 3 consecutive years with zero findings",
            "Analyzed 10,000+ aged claims and root causes, enabling claims processors to clear 85% of backlogs within 30 days and reducing average claim resolution time by 40%",
          ],
        },
      ],
    },
    {
      title: "Technical Lead / Scrum Master / Sr. Developer",
      company: "United Health Group",
      duration: "Aug 2010 — Apr 2016",
      description: "UNET TOPS Claims Processing — enterprise auto-adjudication system handling 500K+ medical, dental, and vision claims/month.",
      sections: [
        {
          heading: "Scrum Master (Mar 2015 — Apr 2016)",
          bullets: [
            "Managed Scrum ceremonies for a 12-member cross-functional team, delivering 8 major releases on schedule with 25% sprint velocity improvement over 4 quarters",
            "Reduced impediment resolution time by 50% through proactive servant leadership, contributing to a 20% increase in team throughput",
            "Implemented bi-weekly sprint reviews with 6 business leads, resulting in a 35% reduction in mid-sprint scope changes",
          ],
        },
        {
          heading: "Technical Lead (Oct 2012 — Feb 2015)",
          bullets: [
            "Managed release planning and budget oversight ($1.5M annual) for 15+ major enhancements across an 8-member team with 95%+ on-time delivery rate",
            "Led performance optimization that reduced batch CPU hours by 35% and online transaction response time by 45%, saving ~$300K/year in mainframe processing costs",
            "Conducted 20+ impact analyses; designed 10+ new COBOL/CICS/DB2 components ensuring zero downstream integration failures",
          ],
        },
        {
          heading: "Sr. Mainframe Developer (Aug 2010 — Sep 2012)",
          bullets: [
            "Delivered 30+ critical SPRFs end-to-end with a 98% first-pass acceptance rate",
            "Onshore SME for 5 business-critical modules; resolved 200+ production tickets annually, maintaining 99%+ SLA compliance",
            "Automated 15 manual monitoring tasks using REXX and IBM PCOMM macros, saving ~20 hours/week in operational effort",
            "Wrote 10+ DB2 stored procedures, improving system startup reliability from 92% to 99.5%",
          ],
        },
      ],
    },
    {
      title: "Software Engineer",
      company: "Accenture",
      duration: "Aug 2008 — Aug 2010",
      description: "",
      sections: [
        {
          heading: "Client: Sallie Mae Financial, US",
          bullets: [
            "Private-credit consumer lending system ($10B+ loan portfolio) on IBM Mainframe / DB2",
            "Gathered and analyzed 50+ business requirements; resolved 15 complex design challenges through facilitated brainstorming sessions",
            "Developed comprehensive test plans covering 200+ test cases; achieved 95% defect-detection rate before production deployment",
            "Coded 20+ COBOL/CICS/DB2 programs processing 100K+ daily transactions",
          ],
        },
        {
          heading: "Client: Sun Life Insurance, Canada",
          bullets: [
            "Life insurance platform serving 1M+ policyholders on IBM Mainframe",
            "Led requirements gathering with 4 business user groups; translated needs into 10+ technical design documents",
            "Coded 15+ new enhancements in COBOL/PL1, designed BMS screens, and authored test plans achieving 100% requirement coverage",
          ],
        },
      ],
    },
  ],

  skills: [
    {
      category: "Cloud & Infrastructure",
      icon: "☁️",
      items: ["AWS EC2", "S3", "Lambda", "RDS", "ECS / EKS", "API Gateway", "CloudFront", "IAM", "VPC", "Step Functions", "DynamoDB", "Redshift", "Aurora"],
    },
    {
      category: "DevOps & IaC",
      icon: "🔧",
      items: ["Terraform", "CloudFormation", "AWS CDK", "Ansible", "Docker", "Kubernetes"],
    },
    {
      category: "FinOps & Cost Governance",
      icon: "💰",
      items: ["AWS Cost Explorer", "FinOps Reviews", "Budget Forecasting", "Reserved Instances", "Savings Plans", "Rightsizing"],
    },
    {
      category: "CI/CD",
      icon: "🚀",
      items: ["AWS CodePipeline", "Jenkins", "GitHub Actions"],
    },
    {
      category: "AI-Assisted Development",
      icon: "🤖",
      items: ["GitHub Copilot", "Amazon Bedrock Agentcore", "Cursor", "Devin", "Prompt Engineering", "GenAI Integration"],
    },
    {
      category: "Containers & Serverless",
      icon: "⚡",
      items: ["Docker", "Kubernetes", "ECS / EKS", "Lambda", "Fargate", "Step Functions"],
    },
    {
      category: "Security & Compliance",
      icon: "🔒",
      items: ["IAM", "KMS", "Security Hub", "GuardDuty", "AWS Config", "CIS Benchmarks"],
    },
    {
      category: "Monitoring & Observability",
      icon: "📊",
      items: ["CloudWatch", "ELK Stack", "Prometheus", "Grafana"],
    },
    {
      category: "Analytics & BI",
      icon: "📈",
      items: ["Python (Pandas, NumPy)", "SQL", "SAS", "IBM Cognos BI", "Oracle APEX", "Oracle Toad"],
    },
    {
      category: "Databases",
      icon: "🗄️",
      items: ["Amazon RDS", "Aurora", "DynamoDB", "Redshift", "DB2"],
    },
    {
      category: "Mainframe & Legacy",
      icon: "🖥️",
      items: ["COBOL", "JCL", "CICS", "DB2", "VSAM", "REXX", "SAS", "Assembly"],
    },
    {
      category: "Methodologies",
      icon: "📋",
      items: ["Agile Scrum", "SAFe", "Waterfall", "SDLC"],
    },
  ],

  education: [
    {
      degree: "Master of Business Administration (MBA)",
      field: "Business Analytics",
      institution: "University of Hartford",
      duration: "2023 — 2025",
      details: [],
    },
    {
      degree: "Bachelor of Technology (B.Tech)",
      field: "Electronics & Telecommunication",
      institution: "GGSIP University, India",
      duration: "",
      details: [],
    },
  ],

  certifications: [
    { icon: "🏅", title: "AWS Certified Solutions Architect — Associate", org: "Amazon Web Services", badge: "assets/cert-aws-solutions-architect.png" },
    { icon: "☁️", title: "AWS Certified Cloud Practitioner — Foundational", org: "Amazon Web Services", badge: "assets/cert-aws-cloud-practitioner.png" },
    { icon: "🤖", title: "AWS Certified AI Practitioner — Foundational", org: "Amazon Web Services", badge: "assets/cert-aws-ai-practitioner.png" },
    { icon: "🎓", title: "Certified Application Developer — ASDA", org: "MIT Professional Education Programs", badge: "assets/cert-mit-asda.jpeg" },
    { icon: "📜", title: "Certified Mainframe Technical Check", org: "COBOL, JCL, DB2 — Accenture" },
  ],

  contact: {
    email: "Rakesh.verma2610@gmail.com",
    phone: "860-288-8358",
  },

  footer: {
    year: "2026",
    name: "Rakesh Verma",
  },
};
