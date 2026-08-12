import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/seo/SEO";
import api from "../api/axios";
import { ArrowLeft, Calendar, User, Share2, Check, ArrowRight, Clock, Tag, List, Shield, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

// Helper to convert heading text to URL anchor slug
const slugifyHeading = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Helper to extract Table of Contents (TOC) headings from raw markdown text
const extractTableOfContents = (rawText) => {
  if (!rawText) return [];
  const lines = rawText.split("\n");
  const toc = [];

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("### ") || trimmed.startsWith("## ")) {
      const headingText = trimmed.replace(/^#+\s*/, "");
      toc.push({
        text: headingText,
        id: slugifyHeading(headingText)
      });
    }
  });

  return toc;
};

// Helper to convert Markdown content into clean, semantic HTML with anchor IDs & internal links
const formatArticleContent = (rawText) => {
  if (!rawText) return "";

  const lines = rawText.split("\n");
  let html = "";
  let inList = false;

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      return;
    }

    // Headings (###, ##, #) with anchor IDs for Table of Contents
    if (trimmed.startsWith("### ") || trimmed.startsWith("## ") || trimmed.startsWith("# ")) {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      const headingText = trimmed.replace(/^#+\s*/, "");
      const anchorId = slugifyHeading(headingText);
      html += `<h3 id="${anchorId}" class="scroll-mt-36 text-xl font-bold font-sans-heading text-text-primary mt-10 mb-4 uppercase tracking-tight flex items-center gap-2.5"><span class="w-1.5 h-4 bg-[#C8A15A] rounded-full inline-block"></span>${headingText}</h3>`;
      return;
    }

    // Bullet points (- or *)
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (!inList) {
        html += `<ul class="space-y-3 my-4">`;
        inList = true;
      }
      let itemText = trimmed.replace(/^[-*]\s*/, "");
      itemText = itemText.replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-primary font-bold">$1</strong>');
      html += `<li class="flex items-start gap-3 text-text-secondary text-[0.95rem] leading-relaxed"><span class="text-[#C8A15A] font-bold text-base leading-none select-none mt-1">•</span><div>${itemText}</div></li>`;
      return;
    }

    // Regular paragraphs
    if (inList) {
      html += "</ul>";
      inList = false;
    }

    let pText = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-primary font-bold">$1</strong>');
    html += `<p class="text-text-secondary text-[0.98rem] leading-relaxed my-3">${pText}</p>`;
  });

  if (inList) html += "</ul>";
  return html;
};

// Map of Service CTAs based on Category / Search Intent
const serviceCTAs = {
  "Website Development": {
    heading: "Ready for a fast, secure & high-converting website?",
    description: "Get a custom website built with pixel-perfect design, zero bloated plugins, and core web vitals speed.",
    link: "/services/website-development",
    buttonText: "EXPLORE WEBSITE DEVELOPMENT"
  },
  "Cybersecurity": {
    heading: "Need a comprehensive cybersecurity audit?",
    description: "Identify infrastructure vulnerabilities and zero-day risks before malicious hackers exploit them.",
    link: "/services/cyber-security-assessment",
    buttonText: "REQUEST SECURITY AUDIT"
  },
  "Penetration Testing": {
    heading: "Want your application professionally penetration tested?",
    description: "Ethical hacking and deep-dive security assessments with actionable risk reports and free re-testing.",
    link: "/services/security-testing-analysis",
    buttonText: "GET PENETRATION TESTED"
  },
  "Web Applications": {
    heading: "Ready to scale your business with a custom web app?",
    description: "From SaaS platforms to enterprise portals — robust full-stack applications built for real-world traffic.",
    link: "/services/web-app-development",
    buttonText: "BUILD YOUR WEB APP"
  },
  "Business Technology": {
    heading: "Have a web project or security requirement in mind?",
    description: "Talk to our senior engineering leads for a free technical consultation and project roadmap.",
    link: "/contact",
    buttonText: "SCHEDULE FREE CONSULTATION"
  }
};

// 6 Core SEO Fallback Articles mapped 1-to-1 with Snortweb Services & Intent Roadmap
const fallbackArticles = {
  "website-development-best-practices": {
    title: "Modern Website Development: Building Fast, Secure & SEO-Optimized Sites",
    slug: "website-development-best-practices",
    category: "Website Development",
    readTime: "6 min read",
    excerpt: "Discover how modern frontend frameworks, responsive UI systems, and Core Web Vitals optimization deliver unbeatable web experiences.",
    content: `
### Why Your Website Speed & Architecture Make or Break Sales

When someone visits your website, you have less than 3 seconds before they decide to stay or hit the back button. A slow or laggy site isn't just frustrating — it directly hurts your Google search rankings and costs you actual leads.

If you are looking for custom-built web solutions, check out our [Website Development Service](/services/website-development).

### 1. Speed Comes First (Core Web Vitals)
- **Why it matters:** Google actively penalizes slow-loading websites in search results.
- **How we solve it:** We optimize image sizes, compress assets, and structure code so your page renders almost instantly on mobile devices and desktops.

### 2. Mobile-First Experience
- **Why it matters:** Over 65% of your visitors are browsing on their smartphones.
- **How we solve it:** We design for mobile screens first. Menus, buttons, and responsive layouts fit naturally in hand.

### 3. Clean Code & SEO Foundation
- **Why it matters:** If search engine bots cannot understand your page structure, you will not rank for target keywords.
- **How we solve it:** Proper heading hierarchy, JSON-LD schema metadata, and clean HTML5 elements make it easy for Google to index your business.

### 4. Zero Plugin Bloat & Enterprise Security
- **Why it matters:** Generic CMS page builders rely on heavy third-party plugins that slow down performance and introduce security vulnerabilities.
- **How we solve it:** Custom code architecture eliminates bloated dependencies, keeping your site fast and resilient.

### Key Takeaways
- Website speed directly drives conversion rates and organic search traffic.
- Mobile responsiveness is a baseline requirement, not an optional feature.
- Custom web engineering outperforms generic page builders in long-term ROI.
    `,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    author: "Snortweb Technology Editorial Team",
    publishedAt: "2026-02-01T00:00:00.000Z",
    updatedAt: "2026-02-01T00:00:00.000Z",
    canonicalUrl: "https://snortwebtechnology.com/blogs/website-development-best-practices",
    tags: ["Website Development", "Core Web Vitals", "SEO"]
  },
  "10-essential-cybersecurity-practices": {
    title: "10 Essential Cybersecurity Practices for Modern Businesses",
    slug: "10-essential-cybersecurity-practices",
    category: "Cybersecurity",
    readTime: "7 min read",
    excerpt: "Safeguard your digital infrastructure against zero-day threats, data breaches, SQL injections, and authentication vulnerabilities.",
    content: `
### Real-World Cybersecurity: Protecting Your Business from Hacks

Cyberattacks aren't just targeted at tech giants. Automated attack scripts scan thousands of small and medium business websites every single day looking for easy vulnerabilities.

For complete infrastructure testing, explore our [Cyber Security Assessment Service](/services/cyber-security-assessment).

### 1. Never Trust User Inputs
- **Why it matters:** SQL injection and cross-site scripting (XSS) happen when form inputs aren't sanitized. Attackers can hijack your database or user sessions.
- **How to fix it:** Validate every form field on the server side and use parameterized database queries.

### 2. Enforce Strict Rate Limiting
- **Why it matters:** Hackers use automated bots to try thousands of password combinations per minute on login forms.
- **How to fix it:** Limit login attempts and API calls per IP address to block brute-force bots automatically.

### 3. Use Secure Headers & Content Security Policy (CSP)
- **Why it matters:** Prevents unauthorized third-party scripts from secretly stealing customer data or loading fake popups.
- **How to fix it:** Configure strict CSP headers so only trusted domains can execute scripts or load media.

### 4. Zero-Trust Access Control & Multi-Factor Auth
- **Why it matters:** Password leaks occur daily across third-party breaches.
- **How to fix it:** Enforce Multi-Factor Authentication (MFA) and least-privilege API access controls.

### Key Takeaways
- Automated bot scripts target websites of all sizes indiscriminately.
- Server-side input validation prevents 90% of injection threats.
- Continuous threat monitoring ensures business continuity and compliance.
    `,
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    author: "Snortweb Technology Editorial Team",
    publishedAt: "2026-02-03T00:00:00.000Z",
    updatedAt: "2026-02-03T00:00:00.000Z",
    canonicalUrl: "https://snortwebtechnology.com/blogs/10-essential-cybersecurity-practices",
    tags: ["Cybersecurity", "Data Protection", "Security Checklist"]
  },
  "penetration-testing-security-audit-guide": {
    title: "Mastering Penetration Testing & Comprehensive Security Audits",
    slug: "penetration-testing-security-audit-guide",
    category: "Penetration Testing",
    readTime: "8 min read",
    excerpt: "Ethical hacking techniques, black-box testing methodologies, and actionable security reporting to uncover zero-day flaws.",
    content: `
### What Happens During a Professional Security Audit?

A security audit (or penetration test) is an authorized, simulated cyberattack on your web applications and API endpoints. The goal is simple: find and fix vulnerabilities before malicious hackers exploit them.

Learn more about our ethical hacking methodologies under [Security Testing & Analysis](/services/security-testing-analysis).

### 1. Black Box vs. White Box Testing
- **Black Box Testing:** We test your web app with zero prior knowledge, exactly like an external attacker would.
- **White Box Testing:** We review internal source code and database architecture to find deeply hidden logic flaws.

### 2. Testing API Authorization & Business Logic Flaws
- **What we look for:** Can User A access User B's private documents by changing an ID in the URL? Can payment verification be bypassed?
- **Why it matters:** Business logic flaws are frequently missed by automated scanners but cause the most catastrophic data breaches.

### 3. Actionable Remediation Reports & Re-Testing
- **No confusing jargon:** We deliver prioritized risk scores (CVSS) accompanied by exact code snippets to fix each bug.
- **Free Re-Testing Included:** Once your developers patch the issues, we re-test to guarantee the hole is closed.

### Key Takeaways
- Penetration testing uncovers deep logic flaws that automated tools miss.
- Regular security audits prevent expensive data breach fines and customer churn.
- Actionable developer remediation reports accelerate patch deployment.
    `,
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    author: "Snortweb Technology Editorial Team",
    publishedAt: "2026-02-05T00:00:00.000Z",
    updatedAt: "2026-02-05T00:00:00.000Z",
    canonicalUrl: "https://snortwebtechnology.com/blogs/penetration-testing-security-audit-guide",
    tags: ["Penetration Testing", "Security Audit", "Ethical Hacking"]
  },
  "when-to-build-custom-web-application": {
    title: "When Should a Business Build a Custom Web Application? (Complete Guide)",
    slug: "when-to-build-custom-web-application",
    category: "Web Applications",
    readTime: "7 min read",
    excerpt: "Learn when off-the-shelf software limits your business growth and why custom web applications provide scalable ROI.",
    content: `
### What Does "Scalable Web Application" Actually Mean?

Building a custom web app isn't just about making it work for 10 users today — it is about ensuring it remains fast, stable, and cost-efficient when 10,000 users log in simultaneously.

Explore our full-stack architecture capabilities under [Web App Development](/services/web-app-development).

### 1. Off-the-Shelf vs. Custom Web Software
- **Off-the-Shelf Software:** Subscription fees stack up, customization is strictly locked, and you don't own the underlying codebase.
- **Custom Web Application:** Designed specifically around your unique workflow, 100% code ownership, and zero per-user licensing fees.

### 2. Separate Frontend & Backend Architecture
- **Why it matters:** When your user interface and database logic are tied together tightly, one bug can bring down the entire app.
- **How it works:** We decouple the React frontend from the Node.js API backend. This enables independent scaling and mobile app integration down the road.

### 3. Smart Database Querying & Caching
- **Why it matters:** Querying a database for unchanged data burns server resources and slows down user response times.
- **How it works:** Indexing and Redis caching serve frequently requested data in milliseconds without straining the primary database.

### Key Takeaways
- Custom web applications eliminate recurring per-user SaaS license costs.
- Decoupled React/Node.js architecture supports long-term scaling and mobile expansion.
- Full code ownership ensures high valuation and competitive security advantages.
    `,
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    author: "Snortweb Technology Editorial Team",
    publishedAt: "2026-02-07T00:00:00.000Z",
    updatedAt: "2026-02-07T00:00:00.000Z",
    canonicalUrl: "https://snortwebtechnology.com/blogs/when-to-build-custom-web-application",
    tags: ["Web Applications", "Software Architecture", "Custom Code"]
  },
  "website-vulnerability-assessment-guide": {
    title: "Website Vulnerability Assessment: Complete Guide for Business Owners",
    slug: "website-vulnerability-assessment-guide",
    category: "Cybersecurity",
    readTime: "6 min read",
    excerpt: "How vulnerability scanning and risk modeling protect customer trust and prevent costly business disruptions.",
    content: `
### Why Every Modern Business Needs Regular Vulnerability Assessments

A vulnerability assessment is a systematic evaluation of your web applications and server infrastructure to identify security gaps, outdated dependencies, and misconfigurations.

For continuous threat management, discover our [Bug Hunting & Vulnerability Support](/services/bug-hunting-vulnerability).

### 1. Automated Scanning vs. Manual Risk Modeling
- **Automated Scans:** Rapidly identify known CVEs across public packages and web frameworks.
- **Manual Assessment:** Inspects custom application logic, session token security, and privilege escalation paths.

### 2. Protecting Customer Data & Compliance
- **Why it matters:** Regulations like GDPR, ISO 27001, and SOC2 require documented vulnerability management.
- **How to execute:** Schedule quarterly vulnerability scans and log remediation roadmaps.

### 3. Patching Prioritization & CVE Remediation
- **Why it matters:** Trying to fix every minor warning wastes time. Focus on High and Critical vulnerabilities first.
- **How to execute:** Prioritize vulnerabilities based on CVSS severity scores and exploit probability.

### Key Takeaways
- Vulnerability assessments provide a roadmap of security weaknesses before hackers exploit them.
- Combining automated scanning with manual verification eliminates false positives.
- Documented security practices build strong trust with enterprise clients.
    `,
    coverImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80",
    author: "Snortweb Technology Editorial Team",
    publishedAt: "2026-02-09T00:00:00.000Z",
    updatedAt: "2026-02-09T00:00:00.000Z",
    canonicalUrl: "https://snortwebtechnology.com/blogs/website-vulnerability-assessment-guide",
    tags: ["Vulnerability Assessment", "Cybersecurity", "OWASP"]
  },
  "how-much-does-a-website-cost-in-india-2026": {
    title: "How Much Does a Website Cost in India in 2026? (Complete Pricing Breakdown)",
    slug: "how-much-does-a-website-cost-in-india-2026",
    category: "Business Technology",
    readTime: "9 min read",
    excerpt: "A transparent breakdown of website design, custom web app development, maintenance, and security costs in India.",
    content: `
### Transparent Website Cost Breakdown for Indian Businesses in 2026

One of the most common questions business owners ask is: "How much will a professional website cost?" The answer depends on whether you need a simple corporate landing page or a custom full-stack web application.

Ready to get an exact custom quote? [Contact our team directly](/contact).

### 1. Basic Business Website (₹15,000 – ₹45,000)
- **Best for:** Small businesses, local services, startup landing pages.
- **Includes:** 5–8 pages, mobile-responsive layout, contact form, basic SEO structure, fast loading speed.

### 2. Custom Business Website & CMS (₹45,000 – ₹1,20,000)
- **Best for:** Growing agencies, corporate brands, custom service providers.
- **Includes:** Custom UI design system, blog management system, advanced SEO optimization, high-performance security headers, lead forms.

### 3. Full-Stack Web Application / SaaS (₹1,20,000 – ₹4,00,000+)
- **Best for:** E-commerce platforms, SaaS startups, client portals, custom workflow software.
- **Includes:** React/Next.js frontend, Node.js REST API, database architecture, payment gateway integration, role-based user management.

### Key Factors That Influence Total Cost
- **Design Complexity:** Pre-made template vs. 100% custom UI system.
- **Security & Performance:** Basic hosting vs. enterprise firewall, rate-limiting, and penetration testing.
- **Maintenance & Upkeep:** Server hosting, domain registration, SSL certificates, and annual security patches.

### Key Takeaways
- Cheap template websites often end up costing more due to slow speeds and security breaches.
- Investing in custom code ensures ownership, speed, and scalable business growth.
- Transparent scope documentation prevents unexpected budget overruns.
    `,
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    author: "Snortweb Technology Editorial Team",
    publishedAt: "2026-02-11T00:00:00.000Z",
    updatedAt: "2026-02-11T00:00:00.000Z",
    canonicalUrl: "https://snortwebtechnology.com/blogs/how-much-does-a-website-cost-in-india-2026",
    tags: ["Website Cost", "India 2026", "Business Technology"]
  }
};

export default function BlogDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(() => {
    return fallbackArticles[slug] || Object.values(fallbackArticles)[0];
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await api.get(`/blogs/${slug}`, { timeout: 4000 });
        if (data) {
          setBlog(data);
        }
      } catch (error) {
        // Quietly keep structured fallback state
      }
    };

    fetchArticle();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Article link copied!");
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (!blog) return null;

  // Extract Table of Contents
  const tocHeadings = extractTableOfContents(blog.content);

  // Get service CTA matching current blog category
  const cta = serviceCTAs[blog.category] || serviceCTAs["Business Technology"];

  // Find 3 Related Articles (excluding current article)
  const allArticlesList = Object.values(fallbackArticles);
  const relatedArticles = allArticlesList
    .filter((item) => item.slug !== blog.slug)
    .sort((a, b) => (a.category === blog.category ? -1 : 1))
    .slice(0, 3);

  const canonicalUrl = blog.canonicalUrl || `https://snortwebtechnology.com/blogs/${blog.slug}`;

  // JSON-LD Structured Data Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt || blog.title,
    "image": blog.coverImage || "https://snortwebtechnology.com/logo.png",
    "datePublished": blog.publishedAt || blog.createdAt || new Date().toISOString(),
    "dateModified": blog.updatedAt || blog.publishedAt || new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": blog.author || "Snortweb Technology Editorial Team",
      "url": "https://snortwebtechnology.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Snortweb Technology",
      "logo": {
        "@type": "ImageObject",
        "url": "https://snortwebtechnology.com/logo.webp"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://snortwebtechnology.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blogs",
        "item": "https://snortwebtechnology.com/blogs"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen bg-bg-primary text-text-primary pt-[140px] pb-[120px] px-6 md:px-12 select-none"
    >
      <SEO
        title={`${blog.title} | Snortweb Technology`}
        description={blog.excerpt || blog.seo?.metaDescription || blog.title}
        canonical={canonicalUrl}
      />

      {/* JSON-LD Structured Data Injections */}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      <div className="max-w-[1000px] mx-auto space-y-10">
        {/* Navigation & Share */}
        <div className="flex items-center justify-between border-b border-border-subtle pb-6">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 font-mono-code text-xs font-bold text-text-secondary hover:text-[#C8A15A] transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 font-mono-code text-xs font-bold text-text-secondary hover:text-[#C8A15A] transition-colors uppercase cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            {copied ? "Copied Link" : "Share"}
          </button>
        </div>

        {/* Article Header */}
        <div className="space-y-6 text-left">
          {/* Category Tag */}
          <span className="inline-block bg-[#C8A15A]/10 text-[#C8A15A] border border-[#C8A15A]/30 px-3.5 py-1 rounded-full text-[11px] font-mono-code font-bold uppercase tracking-wider">
            {blog.category || "Website Development"}
          </span>

          {/* Title */}
          <h1 className="font-sans-heading font-black text-[2rem] md:text-[3rem] tracking-tight text-text-primary uppercase leading-tight">
            {blog.title}
          </h1>

          {/* Author, Date & Read Time Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono-code text-text-tertiary pt-3 border-t border-border-subtle">
            <span className="flex items-center gap-1.5 text-text-secondary">
              <User className="w-4 h-4 text-[#C8A15A]" />
              {blog.author || "Snortweb Technology Editorial Team"}
            </span>
            <span className="flex items-center gap-1.5 text-text-secondary">
              <Calendar className="w-4 h-4 text-[#C8A15A]" />
              {new Date(blog.publishedAt || blog.createdAt || Date.now()).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
              })}
            </span>
            <span className="flex items-center gap-1.5 text-text-secondary">
              <Clock className="w-4 h-4 text-[#C8A15A]" />
              {blog.readTime || "6 min read"}
            </span>
          </div>
        </div>

        {/* Featured Cover Image */}
        {blog.coverImage && (
          <div className="w-full h-[320px] md:h-[450px] rounded-2xl overflow-hidden border border-border-main shadow-2xl bg-black/40">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        )}

        {/* Article Excerpt Callout */}
        {blog.excerpt && (
          <div className="p-6 bg-bg-secondary border-l-4 border-[#C8A15A] rounded-r-2xl text-left shadow-lg">
            <p className="font-sans-body font-medium italic text-[1.05rem] text-text-primary leading-relaxed">
              "{blog.excerpt}"
            </p>
          </div>
        )}

        {/* Table of Contents Box */}
        {tocHeadings.length > 0 && (
          <div className="p-6 bg-bg-card border border-border-main rounded-2xl text-left space-y-4 shadow-xl">
            <h4 className="font-mono-code font-bold text-xs uppercase tracking-wider text-[#C8A15A] flex items-center gap-2">
              <List className="w-4 h-4" />
              TABLE OF CONTENTS
            </h4>
            <ul className="space-y-2.5 font-sans-body text-sm text-text-secondary">
              {tocHeadings.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="hover:text-[#C8A15A] transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#C8A15A] font-mono-code text-xs font-bold">{i + 1}.</span>
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Content Body (HTML Formatted with Heading Anchor IDs & Internal Links) */}
        <div className="prose prose-invert max-w-none text-left font-sans-body text-text-secondary text-[1rem] leading-relaxed pt-2">
          <div
            className="space-y-4"
            dangerouslySetInnerHTML={{
              __html: formatArticleContent(blog.content)
            }}
          />
        </div>

        {/* Relevant Snortweb Service CTA Banner */}
        <div className="mt-16 p-8 md:p-10 bg-bg-card border border-[#C8A15A]/40 rounded-2xl text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl shadow-[#C8A15A]/5">
          <div className="space-y-2 max-w-lg">
            <span className="font-mono-code text-[0.68rem] font-bold text-[#C8A15A] tracking-[0.2em] uppercase flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              WORK WITH SNORTWEB
            </span>
            <h3 className="font-sans-heading font-black text-xl text-text-primary uppercase leading-tight">
              {cta.heading}
            </h3>
            <p className="font-sans-body text-xs text-text-secondary leading-relaxed">
              {cta.description}
            </p>
          </div>
          <Link
            to={cta.link}
            className="bg-[#C8A15A] hover:bg-[#b58e4e] text-slate-950 font-sans-heading font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            {cta.buttonText}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="pt-16 border-t border-border-main space-y-8 text-left">
            <div className="flex items-center justify-between">
              <h3 className="font-sans-heading font-black text-xl text-text-primary uppercase">
                RELATED ARTICLES &amp; GUIDES
              </h3>
              <Link
                to="/blogs"
                className="font-mono-code text-xs font-bold text-[#C8A15A] hover:underline uppercase tracking-wider flex items-center gap-1"
              >
                VIEW ALL ARTICLES <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relItem) => (
                <Link
                  key={relItem.slug}
                  to={`/blogs/${relItem.slug}`}
                  className="group flex flex-col bg-bg-card border border-border-subtle rounded-xl overflow-hidden hover:border-[#C8A15A]/60 transition-all p-5 space-y-3"
                >
                  <span className="text-[10px] font-mono-code font-bold uppercase text-[#C8A15A]">
                    {relItem.category}
                  </span>
                  <h4 className="font-sans-heading font-black text-sm text-text-primary group-hover:text-[#C8A15A] transition-colors leading-snug line-clamp-2">
                    {relItem.title}
                  </h4>
                  <p className="font-sans-body text-xs text-text-secondary line-clamp-2">
                    {relItem.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
