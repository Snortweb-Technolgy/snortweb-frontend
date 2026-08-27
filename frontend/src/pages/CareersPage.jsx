/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Briefcase,
  Code2,
  CheckCircle2,
  Send,
  User,
  Mail,
  Phone,
  Link as LinkIcon,
  FileText,
  X,
  ArrowRight,
  ChevronDown,
  Building2,
  Clock,
  Check,
  UploadCloud,
  Trash2,
} from "lucide-react";
import SEO from "../components/seo/SEO";
import { Button } from "../components/ui/Button";
import api from "../api/axios";

export default function CareersPage() {
  const [vacancies, setVacancies] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "MERN STACK DEVELOPER INTERN",
    experience: "Fresher / Student",
    linkedinUrl: "",
    portfolioUrl: "",
    resumeUrl: "",
    coverLetter: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const applicationFormRef = useRef(null);

  // Default fallback positions if API is empty
  const defaultJobs = [
    {
      id: "mern-intern-1",
      title: "MERN Stack Developer Intern",
      positionKey: "MERN Stack Developer Intern",
      department: "Development",
      openings: 4,
      badge: "4 Openings",
      type: "Internship",
      experience: "0–1 Year",
      location: "Remote / Hybrid",
      description: "Build scalable web applications, REST APIs, and interactive UI components using MongoDB, Express, React, and Node.js.",
      skills: [
        "HTML5 / CSS3 / Modern JS",
        "React.js & Hooks",
        "Node.js & Express.js",
        "MongoDB & Mongoose",
        "REST APIs & Axios",
        "Git & GitHub"
      ],
      responsibilities: [
        "Develop high-performance frontend interfaces with React and Tailwind CSS",
        "Build secure, well-structured Express API endpoints",
        "Integrate database queries and data models in MongoDB",
        "Participate in code reviews, bug fixes, and feature releases",
        "Collaborate closely with agile engineering leads"
      ],
      whoCanApply: "Pre-final / final year students or fresh graduates with strong fundamentals in JavaScript and a passion for modern web engineering.",
      whatYouGet: [
        "Real client project exposure",
        "Production deployment experience",
        "Direct mentorship from senior leads",
        "Verified Internship Certificate"
      ],
      stipendInfo: "UNPAID INTERNSHIP — NO STIPEND",
      certificateInfo: "INTERNSHIP CERTIFICATE PROVIDED",
      contactEmail: "hr@snortwebtechnology.com",
    },
    {
      id: "uiux-designer-1",
      title: "UI / UX Designer",
      positionKey: "UI / UX Designer",
      department: "Design",
      openings: 2,
      badge: "2 Openings",
      type: "Full-time / Hybrid",
      experience: "1–3 Years",
      location: "Remote / Delhi NCR",
      description: "Craft bespoke digital interfaces, high-conversion landing pages, interactive wireframes, and design systems in Figma.",
      skills: [
        "Figma & Design Systems",
        "Wireframing & Prototyping",
        "Visual & Typography Hierarchy",
        "UX Research & User Journeys",
        "Responsive Web & Mobile Layouts"
      ],
      responsibilities: [
        "Design pixel-perfect interfaces for web applications and corporate websites",
        "Build and maintain SnortWeb's design system and component libraries",
        "Conduct usability reviews and create high-fidelity interactive prototypes",
        "Collaborate with frontend developers to ensure design fidelity"
      ],
      whoCanApply: "Designers with a strong portfolio demonstrating clean typography, dark-mode aesthetics, and thoughtful micro-interactions.",
      whatYouGet: [
        "Creative autonomy on global brands",
        "Competitive project incentives",
        "Modern workflow tools & licenses",
        "Rapid career progression"
      ],
      stipendInfo: "FULL-TIME POSITION",
      certificateInfo: "OFFER LETTER & EMPLOYMENT CONTRACT",
      contactEmail: "hr@snortwebtechnology.com",
    },
    {
      id: "cybersecurity-analyst-1",
      title: "Cyber Security Analyst",
      positionKey: "Cyber Security Analyst",
      department: "Security",
      openings: 2,
      badge: "2 Openings",
      type: "Full-time / Contract",
      experience: "1–3 Years",
      location: "Remote / Hybrid",
      description: "Perform web vulnerability assessments, penetration testing, source code reviews, and threat remediation across client platforms.",
      skills: [
        "OWASP Top 10 & API Security",
        "Burp Suite / Nmap / Metasploit",
        "Network Security & Firewalls",
        "VAPT & Security Auditing",
        "Vulnerability Remediation Reports"
      ],
      responsibilities: [
        "Execute automated and manual penetration tests on client web applications",
        "Identify OWASP vulnerabilities, authorization bypasses, and injection risks",
        "Author clear, actionable executive security assessment reports",
        "Advise engineering teams on secure coding guidelines and fixes"
      ],
      whoCanApply: "Security professionals or certified ethical hackers (CEH / OSCP / eJPT) with practical hands-on testing experience.",
      whatYouGet: [
        "Hands-on testing on enterprise architectures",
        "Research & CVE disclosure encouragement",
        "Competitive compensation package",
        "Professional development support"
      ],
      stipendInfo: "COMPETITIVE INDUSTRY SALARY",
      certificateInfo: "FULL-TIME APPOINTMENT",
      contactEmail: "hr@snortwebtechnology.com",
    },
    {
      id: "digital-growth-1",
      title: "Digital Growth & Content Strategist",
      positionKey: "Digital Growth & Content Strategist",
      department: "Marketing",
      openings: 1,
      badge: "1 Opening",
      type: "Full-time",
      experience: "1–2 Years",
      location: "Remote",
      description: "Drive technical B2B SEO, content marketing, developer-focused case studies, and brand authority across digital channels.",
      skills: [
        "Technical SEO & Content Strategy",
        "B2B Copywriting & Case Studies",
        "LinkedIn & Digital Distribution",
        "Google Analytics & Search Console",
        "Conversion Rate Optimization (CRO)"
      ],
      responsibilities: [
        "Write compelling technical blog posts, service landing copy, and case studies",
        "Optimize website content for search visibility and core search intent",
        "Manage brand messaging and outreach across professional networks",
        "Analyze conversion metrics and refine customer journey touchpoints"
      ],
      whoCanApply: "Growth marketers or technical copywriters with an understanding of software, SaaS, and digital engineering services.",
      whatYouGet: [
        "High-visibility impact on company growth",
        "Performance-based bonuses",
        "Remote-first flexibility",
        "Collaborative team culture"
      ],
      stipendInfo: "COMPETITIVE PACKAGE",
      certificateInfo: "FULL-TIME APPOINTMENT",
      contactEmail: "hr@snortwebtechnology.com",
    }
  ];

  // Fetch active job openings dynamically from backend API
  useEffect(() => {
    const fetchActiveJobs = async () => {
      setLoadingJobs(true);
      try {
        const { data } = await api.get("/careers/jobs");
        if (Array.isArray(data) && data.length > 0) {
          const formattedJobs = data.map((job) => ({
            id: job._id || job.id,
            title: job.title || "MERN Stack Developer Intern",
            positionKey: job.title || "MERN Stack Developer Intern",
            department: job.department || (
              job.title.toLowerCase().includes("design") ? "Design" :
              job.title.toLowerCase().includes("security") ? "Security" :
              job.title.toLowerCase().includes("marketing") || job.title.toLowerCase().includes("content") ? "Marketing" : "Development"
            ),
            openings: job.openings || 2,
            badge: job.badge || `${job.openings || 2} Openings`,
            type: job.type || "Full-time",
            experience: job.experience || "0–2 Years",
            location: job.location || "Remote / Hybrid",
            description: job.description || "Join our team, work on real-world projects, and build production-grade software.",
            skills: job.skills && job.skills.length > 0 ? job.skills : [
              "HTML5 & Modern JavaScript",
              "React.js / Node.js",
              "REST APIs & MongoDB",
              "Git & GitHub"
            ],
            responsibilities: job.responsibilities && job.responsibilities.length > 0 ? job.responsibilities : [
              "Build and improve scalable digital products",
              "Implement robust, tested features",
              "Collaborate with the cross-functional engineering team"
            ],
            whoCanApply: job.whoCanApply || "Passionate candidates ready to build production software with high attention to detail.",
            whatYouGet: job.whatYouGet || [
              "Real client project exposure",
              "Practical engineering workflows",
              "Direct mentorship from senior leads",
              "Certificate / Employment Record"
            ],
            stipendInfo: job.stipendInfo || "COMPETITIVE INCENTIVE",
            certificateInfo: job.certificateInfo || "VERIFIED CREDENTIALS PROVIDED",
            contactEmail: job.contactEmail || "hr@snortwebtechnology.com",
          }));
          setVacancies(formattedJobs);
          if (formattedJobs.length > 0) {
            setFormData((prev) => ({ ...prev, position: formattedJobs[0].title }));
          }
        } else {
          setVacancies(defaultJobs);
          setFormData((prev) => ({ ...prev, position: defaultJobs[0].title }));
        }
      } catch (err) {
        console.error("Could not load dynamic jobs, using default positions:", err);
        setVacancies(defaultJobs);
      } finally {
        setLoadingJobs(false);
      }
    };

    fetchActiveJobs();
  }, []);

  // Filter positions by department
  const filteredJobs = vacancies.filter((job) => {
    if (activeCategory === "ALL") return true;
    return job.department?.toUpperCase() === activeCategory.toUpperCase();
  });

  const handleSelectRoleAndScroll = (jobTitle) => {
    setFormData((prev) => ({
      ...prev,
      position: jobTitle,
    }));
    if (applicationFormRef.current) {
      applicationFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleOpenQuickModal = (job) => {
    setSelectedJob(job);
    setFormData((prev) => ({
      ...prev,
      position: job.positionKey || job.title,
    }));
  };

  const toggleJobDetails = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Resume file size must be less than 10MB.");
      return;
    }

    const allowed = [".pdf", ".doc", ".docx"];
    const ext = "." + file.name.split(".").pop().toLowerCase();
    if (!allowed.includes(ext)) {
      toast.error("Please upload a valid PDF or Word document (.pdf, .doc, .docx).");
      return;
    }

    setResumeFile(file);
    toast.success(`Attached: ${file.name}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error("Please fill in all required fields (Name, Email, Phone).");
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading("Submitting your candidate dossier...");

    try {
      const dataPayload = new FormData();
      dataPayload.append("name", formData.name.trim());
      dataPayload.append("email", formData.email.trim());
      dataPayload.append("phone", formData.phone.trim());
      dataPayload.append("position", formData.position);
      dataPayload.append("experience", formData.experience);
      dataPayload.append("linkedinUrl", formData.linkedinUrl.trim());
      dataPayload.append("portfolioUrl", formData.portfolioUrl.trim());
      dataPayload.append("resumeUrl", formData.resumeUrl.trim());
      dataPayload.append("coverLetter", formData.coverLetter.trim());

      if (resumeFile) {
        dataPayload.append("resume", resumeFile);
      }

      await api.post("/careers/apply", dataPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Application Submitted Successfully! Our talent team will review your profile.", { id: toastId });
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: vacancies[0]?.title || "General Application",
        experience: "Fresher / Student",
        linkedinUrl: "",
        portfolioUrl: "",
        resumeUrl: "",
        coverLetter: "",
      });
      setResumeFile(null);
      setSelectedJob(null);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Failed to submit application. Please try again.";
      toast.error(errorMsg, { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  const categories = ["ALL", "DEVELOPMENT", "DESIGN", "SECURITY", "MARKETING"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative min-h-screen bg-bg-primary select-none font-sans-body w-full overflow-hidden text-text-primary"
    >
      <SEO
        title="Careers & Opportunities | Snortweb Technology"
        description="Explore career and internship opportunities at Snortweb Technology. Join our engineering, design, and cybersecurity teams to build real-world digital products."
        canonical="/careers"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Careers at Snortweb Technology",
          "url": "https://snortwebtechnology.com/careers",
        }}
      />

      {/* Background decorations matching Services & Contact page */}
      <div className="pattern-noise absolute inset-0 pointer-events-none z-0" />
      <div className="pattern-horizontal-lines absolute inset-0 pointer-events-none z-0" />

      {/* 1. HERO AREA */}
      <div className="relative pt-[160px] pb-[80px] px-6 md:px-12 max-w-[1200px] mx-auto z-10 text-left flex flex-col">
        <span className="font-mono-code font-bold text-[0.68rem] tracking-[0.25em] text-text-primary uppercase mb-4">
          ALL OPPORTUNITIES
        </span>
        <h1
          className="font-sans-heading text-4xl sm:text-5xl md:text-6xl font-black text-text-primary leading-tight uppercase mb-6"
          style={{ fontSize: "var(--text-display)" }}
        >
          Build What Matters &amp; Grow.
        </h1>
        <p className="max-w-[620px] text-[1rem] text-text-secondary leading-relaxed font-sans-body">
          We are a modern engineering and design studio crafting high-performance web applications, enterprise software, and secure digital infrastructure. Work on production deployments with low bureaucracy and high impact.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-wrap items-center gap-4 mt-8 pt-2">
          <a
            href="#openings"
            className="px-8 py-4 border border-[#24211C] dark:border-brand-indigo bg-[#24211C] dark:bg-brand-indigo text-[#F8F5F0] dark:text-[#161616] hover:bg-[#C8A15A] hover:text-[#24211C] hover:border-[#C8A15A] dark:hover:bg-transparent dark:hover:text-brand-indigo text-xs font-mono-code font-bold tracking-[0.18em] uppercase transition-all duration-300 rounded-none dark:rounded-md flex items-center gap-2 cursor-pointer shadow-none"
          >
            <span>EXPLORE OPENINGS</span>
            <ChevronDown className="w-4 h-4" />
          </a>

          <button
            onClick={() => handleSelectRoleAndScroll("General Application")}
            className="px-8 py-4 border border-border-main bg-bg-card text-text-primary hover:border-brand-indigo hover:text-brand-indigo text-xs font-mono-code font-bold tracking-[0.18em] uppercase transition-all duration-300 rounded-none dark:rounded-md flex items-center gap-2 cursor-pointer"
          >
            <span>DIRECT APPLICATION</span>
            <ArrowRight className="w-4 h-4 text-brand-indigo" />
          </button>
        </div>
      </div>

      {/* 2. CULTURE & VALUES: 4 COMPACT EDITORIAL COLUMNS */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-20 relative z-10">
        <div className="border-t border-b border-border-main py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-border-main">
            {/* Feature 01 */}
            <div className="pt-6 lg:pt-0 lg:px-6 first:pl-0">
              <span className="text-brand-indigo font-mono-code text-xs font-bold tracking-widest block mb-2">
                01 / PRODUCTION
              </span>
              <h3 className="font-sans-heading font-black text-base text-text-primary uppercase tracking-tight mb-2">
                Real Projects
              </h3>
              <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed font-sans-body">
                Direct exposure to live production systems, client architectures, and scalable full-stack codebases.
              </p>
            </div>

            {/* Feature 02 */}
            <div className="pt-6 lg:pt-0 lg:px-6">
              <span className="text-brand-indigo font-mono-code text-xs font-bold tracking-widest block mb-2">
                02 / WORKFLOW
              </span>
              <h3 className="font-sans-heading font-black text-base text-text-primary uppercase tracking-tight mb-2">
                Practical Learning
              </h3>
              <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed font-sans-body">
                Master modern tech stacks, performance optimization, automated deployments, and application security.
              </p>
            </div>

            {/* Feature 03 */}
            <div className="pt-6 lg:pt-0 lg:px-6">
              <span className="text-brand-indigo font-mono-code text-xs font-bold tracking-widest block mb-2">
                03 / CULTURE
              </span>
              <h3 className="font-sans-heading font-black text-base text-text-primary uppercase tracking-tight mb-2">
                Team Collaboration
              </h3>
              <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed font-sans-body">
                Work directly with experienced developers and designers in an open, low-ego, problem-solving environment.
              </p>
            </div>

            {/* Feature 04 */}
            <div className="pt-6 lg:pt-0 lg:px-6 last:pr-0">
              <span className="text-brand-indigo font-mono-code text-xs font-bold tracking-widest block mb-2">
                04 / GROWTH
              </span>
              <h3 className="font-sans-heading font-black text-base text-text-primary uppercase tracking-tight mb-2">
                Mentorship
              </h3>
              <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed font-sans-body">
                Regular code reviews, architectural discussions, and verifiable performance credentials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CURRENT OPENINGS: STRUCTURED DIRECTORY */}
      <section id="openings" className="max-w-[1200px] mx-auto px-6 md:px-12 mb-24 relative z-10 scroll-mt-24">
        {/* Section Header with Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border-main mb-2">
          <div>
            <span className="text-xs font-mono-code uppercase tracking-[0.2em] text-brand-indigo font-bold block mb-1.5">
              OPPORTUNITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans-heading font-black text-text-primary uppercase tracking-tight">
              Current Openings
            </h2>
            <p className="text-sm text-text-secondary font-sans-body mt-1">
              Find the role where you can make your strongest contribution.
            </p>
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-bg-secondary p-1.5 rounded-none dark:rounded-md border border-border-main">
            {categories.map((cat) => {
              const count = cat === "ALL" 
                ? vacancies.length 
                : vacancies.filter(v => v.department?.toUpperCase() === cat).length;
              
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-none dark:rounded-md text-[11px] font-mono-code font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === cat
                      ? "bg-brand-indigo text-[#161616] shadow-none"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${activeCategory === cat ? "bg-black/20 text-[#161616] font-extrabold" : "bg-bg-primary text-text-secondary"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Directory Header Bar (Desktop Only) */}
        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3.5 text-[11px] font-mono-code font-bold uppercase tracking-widest text-text-tertiary border-b border-border-main select-none">
          <div className="col-span-5">ROLE / OVERVIEW</div>
          <div className="col-span-2">DEPARTMENT</div>
          <div className="col-span-2">EXPERIENCE</div>
          <div className="col-span-1">TYPE</div>
          <div className="col-span-2 text-right">ACTION</div>
        </div>

        {/* Openings Listing */}
        {loadingJobs ? (
          <div className="py-20 text-center text-text-secondary font-mono-code text-xs">
            <div className="w-6 h-6 border-2 border-brand-indigo border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading current openings directory...
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="py-16 text-center border-b border-border-main">
            <p className="text-sm font-mono-code text-text-secondary">
              No active openings in the <strong className="text-brand-indigo">{activeCategory}</strong> category right now.
            </p>
            <button
              onClick={() => setActiveCategory("ALL")}
              className="mt-3 text-xs font-mono-code text-brand-indigo underline hover:text-text-primary cursor-pointer"
            >
              View all available roles
            </button>
          </div>
        ) : (
          <div className="divide-y divide-border-main border-b border-border-main">
            {filteredJobs.map((job) => {
              const isExpanded = expandedJobId === job.id;

              return (
                <div
                  key={job.id}
                  className="group transition-colors hover:bg-bg-secondary/60"
                >
                  {/* Main Horizontal Opening Row */}
                  <div className="py-6 sm:py-7 lg:py-6 px-4 sm:px-6">
                    {/* Desktop Table Grid (lg+) */}
                    <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                      {/* 1. Role Title & Description */}
                      <div className="col-span-5 pr-4">
                        <h3 className="text-base font-sans-heading font-bold text-text-primary group-hover:text-brand-indigo transition-colors flex items-center gap-2">
                          {job.title}
                          {job.badge && (
                            <span className="text-[10px] font-mono-code uppercase px-2 py-0.5 rounded bg-bg-card border border-border-main text-brand-indigo font-medium">
                              {job.badge}
                            </span>
                          )}
                        </h3>
                        <p className="text-xs sm:text-sm text-text-secondary font-sans-body mt-1 line-clamp-1">
                          {job.description}
                        </p>
                      </div>

                      {/* 2. Department */}
                      <div className="col-span-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none dark:rounded-md bg-bg-card border border-border-main text-xs font-mono-code text-text-primary font-medium">
                          <Building2 className="w-3.5 h-3.5 text-brand-indigo" />
                          {job.department}
                        </span>
                      </div>

                      {/* 3. Experience */}
                      <div className="col-span-2">
                        <span className="text-xs font-mono-code text-text-secondary flex items-center gap-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5 text-brand-indigo" />
                          {job.experience}
                        </span>
                      </div>

                      {/* 4. Type */}
                      <div className="col-span-1">
                        <span className="text-xs font-mono-code text-text-primary font-medium">
                          {job.type}
                        </span>
                      </div>

                      {/* 5. Actions */}
                      <div className="col-span-2 flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleJobDetails(job.id)}
                          className="px-3 py-1.5 rounded-none dark:rounded-md text-xs font-mono-code text-text-secondary hover:text-text-primary border border-border-main hover:border-brand-indigo transition-colors cursor-pointer flex items-center gap-1"
                          title="Toggle details"
                        >
                          <span>{isExpanded ? "Less" : "Details"}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180 text-brand-indigo" : ""}`} />
                        </button>

                        <button
                          onClick={() => handleOpenQuickModal(job)}
                          className="bg-brand-indigo hover:bg-[#d6af65] text-[#161616] font-mono-code font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-none dark:rounded-md transition-all flex items-center gap-1.5 cursor-pointer shadow-none group/btn"
                        >
                          <span>Apply</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                        </button>
                      </div>
                    </div>

                    {/* Mobile & Tablet Row Layout (< lg) */}
                    <div className="lg:hidden flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="px-2.5 py-0.5 rounded bg-bg-card border border-border-main text-brand-indigo text-[11px] font-mono-code font-bold uppercase tracking-wider">
                              {job.department}
                            </span>
                            <span className="text-text-tertiary text-xs">·</span>
                            <span className="text-xs font-mono-code text-text-secondary">
                              {job.type}
                            </span>
                            {job.badge && (
                              <>
                                <span className="text-text-tertiary text-xs">·</span>
                                <span className="text-[11px] font-mono-code text-brand-indigo font-medium">
                                  {job.badge}
                                </span>
                              </>
                            )}
                          </div>

                          <h3 className="text-lg font-sans-heading font-bold text-text-primary group-hover:text-brand-indigo transition-colors">
                            {job.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-text-secondary font-sans-body leading-relaxed">
                        {job.description}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-border-main">
                        <span className="text-xs font-mono-code text-text-secondary flex items-center gap-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5 text-brand-indigo" />
                          {job.experience}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleJobDetails(job.id)}
                            className="px-3 py-1.5 rounded-none dark:rounded-md text-xs font-mono-code text-text-secondary hover:text-text-primary border border-border-main transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <span>{isExpanded ? "Hide" : "Details"}</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180 text-brand-indigo" : ""}`} />
                          </button>

                          <button
                            onClick={() => handleOpenQuickModal(job)}
                            className="bg-brand-indigo hover:bg-[#d6af65] text-[#161616] font-mono-code font-bold text-xs uppercase tracking-wider px-4 py-1.5 rounded-none dark:rounded-md transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>Apply</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Editorial Details Drawer */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-bg-secondary border-t border-border-main px-6 py-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                          {/* Key Responsibilities */}
                          <div>
                            <span className="text-[11px] font-mono-code uppercase tracking-widest text-brand-indigo font-bold block mb-2.5">
                              WHAT YOU'LL WORK ON
                            </span>
                            <ul className="space-y-2">
                              {job.responsibilities.map((resp, i) => (
                                <li key={i} className="text-xs sm:text-sm text-text-secondary font-sans-body flex items-start gap-2">
                                  <span className="text-brand-indigo font-bold mt-0.5">•</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Skills We're Looking For */}
                          <div>
                            <span className="text-[11px] font-mono-code uppercase tracking-widest text-brand-indigo font-bold block mb-2.5">
                              RELEVANT SKILLS
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {job.skills.map((skill, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-bg-card border border-border-main rounded-none dark:rounded-md text-xs font-mono-code text-text-primary"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* What You Get & Quick Apply */}
                          <div className="flex flex-col justify-between space-y-4">
                            <div>
                              <span className="text-[11px] font-mono-code uppercase tracking-widest text-brand-indigo font-bold block mb-2.5">
                                BENEFITS &amp; DETAILS
                              </span>
                              <ul className="space-y-2 text-xs sm:text-sm text-text-secondary font-sans-body">
                                {job.whatYouGet.map((item, i) => (
                                  <li key={i} className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="pt-2">
                              <button
                                onClick={() => handleSelectRoleAndScroll(job.title)}
                                className="w-full bg-brand-indigo hover:bg-[#d6af65] text-[#161616] font-mono-code font-bold text-xs uppercase tracking-wider py-2.5 rounded-none dark:rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-none"
                              >
                                <span>Submit Application For This Role</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        {/* 4. "DON'T SEE A ROLE?" COMPACT STRIP */}
        <div className="mt-8 p-6 sm:p-8 rounded-none dark:rounded-md bg-bg-secondary border border-border-main flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-sans-heading font-black text-base text-text-primary uppercase tracking-tight">
              Don't see your specific role listed?
            </h4>
            <p className="text-xs sm:text-sm text-text-secondary font-sans-body mt-1">
              We are always eager to meet driven full-stack developers, security researchers, and designers.
            </p>
          </div>

          <button
            onClick={() => handleSelectRoleAndScroll("General Application")}
            className="px-6 py-3 border border-border-main bg-bg-card hover:border-brand-indigo text-brand-indigo hover:text-brand-indigo font-mono-code font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 rounded-none dark:rounded-md"
          >
            <span>SEND GENERAL APPLICATION</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 5. INTEGRATED APPLICATION SECTION */}
      <section ref={applicationFormRef} className="max-w-[1000px] mx-auto px-6 md:px-12 pt-4 pb-24 relative z-10 scroll-mt-24">
        <div className="bg-bg-secondary border border-border-main rounded-none dark:rounded-md p-6 sm:p-10 shadow-none relative text-left">
          {/* Form Section Header */}
          <div className="pb-6 border-b border-border-main mb-8">
            <span className="text-xs font-mono-code uppercase tracking-[0.2em] text-brand-indigo font-bold block mb-1">
              APPLICATION DOSSIER
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans-heading font-black text-text-primary uppercase tracking-tight">
              Submit Your Application
            </h2>
            <p className="text-sm text-text-secondary font-sans-body mt-1.5">
              Fill out your details below. Our team reviews submissions and contacts qualified candidates.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Clean 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-mono-code uppercase text-text-primary mb-2 tracking-wider font-bold">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-text-tertiary absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-bg-primary dark:bg-bg-card border border-border-main focus:border-brand-indigo rounded-none dark:rounded-md pl-11 pr-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-mono-code uppercase text-text-primary mb-2 tracking-wider font-bold">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-text-tertiary absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="rahul@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-bg-primary dark:bg-bg-card border border-border-main focus:border-brand-indigo rounded-none dark:rounded-md pl-11 pr-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary outline-none transition-all"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-mono-code uppercase text-text-primary mb-2 tracking-wider font-bold">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-text-tertiary absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-bg-primary dark:bg-bg-card border border-border-main focus:border-brand-indigo rounded-none dark:rounded-md pl-11 pr-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary outline-none transition-all"
                  />
                </div>
              </div>

              {/* Applying For Position */}
              <div>
                <label className="block text-xs font-mono-code uppercase text-text-primary mb-2 tracking-wider font-bold">
                  Applying For Position <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-text-tertiary absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full bg-bg-primary dark:bg-bg-card border border-border-main focus:border-brand-indigo rounded-none dark:rounded-md pl-11 pr-4 py-3 text-sm text-text-primary outline-none transition-all cursor-pointer appearance-none"
                  >
                    {vacancies.map((job) => (
                      <option key={job.id} value={job.title} className="bg-bg-primary text-text-primary">
                        {job.title} ({job.department})
                      </option>
                    ))}
                    <option value="General Application" className="bg-bg-primary text-text-primary">
                      General Application / Other
                    </option>
                  </select>
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-xs font-mono-code uppercase text-text-primary mb-2 tracking-wider font-bold">
                  Experience Level <span className="text-red-400">*</span>
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full bg-bg-primary dark:bg-bg-card border border-border-main focus:border-brand-indigo rounded-none dark:rounded-md px-4 py-3 text-sm text-text-primary outline-none transition-all cursor-pointer"
                >
                  <option value="Fresher / Student" className="bg-bg-primary">Fresher / Student (0 Experience)</option>
                  <option value="0 - 1 Year" className="bg-bg-primary">0 - 1 Year Experience</option>
                  <option value="1 - 2 Years" className="bg-bg-primary">1 - 2 Years Experience</option>
                  <option value="2 - 4 Years" className="bg-bg-primary">2 - 4 Years Experience</option>
                  <option value="4+ Years" className="bg-bg-primary">4+ Years Experience</option>
                </select>
              </div>

              {/* LinkedIn Profile */}
              <div>
                <label className="block text-xs font-mono-code uppercase text-text-primary mb-2 tracking-wider font-bold">
                  LinkedIn Profile URL
                </label>
                <div className="relative">
                  <LinkIcon className="w-4 h-4 text-brand-indigo absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    name="linkedinUrl"
                    placeholder="https://linkedin.com/in/yourname"
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                    className="w-full bg-bg-primary dark:bg-bg-card border border-border-main focus:border-brand-indigo rounded-none dark:rounded-md pl-11 pr-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary outline-none transition-all"
                  />
                </div>
              </div>

              {/* Portfolio / GitHub */}
              <div className="md:col-span-2">
                <label className="block text-xs font-mono-code uppercase text-text-primary mb-2 tracking-wider font-bold">
                  GitHub / Portfolio Website URL
                </label>
                <div className="relative">
                  <LinkIcon className="w-4 h-4 text-brand-indigo absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    name="portfolioUrl"
                    placeholder="https://github.com/yourhandle"
                    value={formData.portfolioUrl}
                    onChange={handleInputChange}
                    className="w-full bg-bg-primary dark:bg-bg-card border border-border-main focus:border-brand-indigo rounded-none dark:rounded-md pl-11 pr-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Resume Upload & Link Section */}
            <div className="p-4 bg-bg-primary dark:bg-bg-card border border-border-main rounded-none dark:rounded-md space-y-4">
              <div>
                <label className="block text-xs font-mono-code uppercase text-text-primary mb-1 tracking-wider font-bold">
                  Upload Resume Document (PDF / DOC / DOCX)
                </label>
                <p className="text-[11px] text-text-secondary mb-3">
                  Upload your CV directly (Max 10MB) or provide a Google Drive / Dropbox link below.
                </p>

                {resumeFile ? (
                  <div className="flex items-center justify-between p-3 bg-bg-secondary border border-brand-indigo/40 rounded-none dark:rounded-md">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText className="w-5 h-5 text-brand-indigo shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-text-primary truncate">{resumeFile.name}</div>
                        <div className="text-[10px] font-mono-code text-text-secondary">
                          {(resumeFile.size / 1024).toFixed(1)} KB · Ready to upload
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setResumeFile(null)}
                      className="p-1.5 text-text-secondary hover:text-red-400 transition-colors cursor-pointer"
                      title="Remove attached file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-border-main hover:border-brand-indigo rounded-none dark:rounded-md cursor-pointer bg-bg-secondary/40 hover:bg-bg-secondary transition-all group">
                    <UploadCloud className="w-6 h-6 text-text-tertiary group-hover:text-brand-indigo mb-1.5 transition-colors" />
                    <span className="text-xs font-medium text-text-primary">
                      Click to browse or drag &amp; drop your Resume PDF
                    </span>
                    <span className="text-[10px] font-mono-code text-text-secondary mt-0.5">
                      Supported: .PDF, .DOC, .DOCX (Max 10MB)
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Cloud Link Alternative */}
              <div>
                <label className="block text-[11px] font-mono-code uppercase text-text-secondary mb-1.5 font-semibold">
                  OR Paste Google Drive / Cloud Link
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-text-tertiary absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    name="resumeUrl"
                    placeholder="https://drive.google.com/file/d/your-resume-link"
                    value={formData.resumeUrl}
                    onChange={handleInputChange}
                    className="w-full bg-bg-secondary border border-border-main focus:border-brand-indigo rounded-none dark:rounded-md pl-10 pr-3 py-2 text-xs text-text-primary placeholder:text-text-tertiary outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Cover Letter / Pitch */}
            <div>
              <label className="block text-xs font-mono-code uppercase text-text-primary mb-2 tracking-wider font-bold">
                Brief Pitch / Background
              </label>
              <textarea
                name="coverLetter"
                rows={3}
                placeholder="Share a brief introduction about your key strengths, recent projects, or what you want to achieve at SnortWeb..."
                value={formData.coverLetter}
                onChange={handleInputChange}
                className="w-full bg-bg-primary dark:bg-bg-card border border-border-main focus:border-brand-indigo rounded-none dark:rounded-md p-4 text-sm text-text-primary placeholder:text-text-tertiary outline-none transition-all font-sans-body"
              />
            </div>

            {/* Submit CTA Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={submitting}
                className="w-full px-10 py-4 border border-[#24211C] dark:border-brand-indigo bg-[#24211C] dark:bg-brand-indigo text-[#F8F5F0] dark:text-[#161616] hover:bg-[#C8A15A] hover:text-[#24211C] hover:border-[#C8A15A] dark:hover:bg-transparent dark:hover:text-brand-indigo text-xs font-mono-code font-bold tracking-[0.18em] uppercase transition-all duration-300 rounded-none dark:rounded-md flex items-center justify-center gap-2 cursor-pointer shadow-none disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? "SUBMITTING APPLICATION..." : "SUBMIT CANDIDATE APPLICATION"}</span>
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* 6. MODAL FOR QUICK APPLY */}
      <AnimatePresence>
        {selectedJob && (
          <div
            className="fixed inset-0 z-[300] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-bg-secondary border border-border-main rounded-none dark:rounded-md max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-text-primary max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-5 right-5 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                aria-label="Close application modal"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-[10px] font-mono-code text-brand-indigo uppercase tracking-widest block mb-1 font-bold">
                APPLYING FOR
              </span>
              <h3 className="text-xl font-sans-heading font-black text-text-primary uppercase">
                {selectedJob.title}
              </h3>
              <p className="text-xs font-mono-code text-text-secondary mt-1 mb-6">
                {selectedJob.department} · {selectedJob.type} · {selectedJob.experience}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-mono-code uppercase text-text-primary mb-1 font-bold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-bg-primary dark:bg-bg-card border border-border-main focus:border-brand-indigo rounded-none dark:rounded-md px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-code uppercase text-text-primary mb-1 font-bold">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-bg-primary dark:bg-bg-card border border-border-main focus:border-brand-indigo rounded-none dark:rounded-md px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono-code uppercase text-text-primary mb-1 font-bold">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-bg-primary dark:bg-bg-card border border-border-main focus:border-brand-indigo rounded-none dark:rounded-md px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-code uppercase text-text-primary mb-1 font-bold">
                    Experience Level *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full bg-bg-primary dark:bg-bg-card border border-border-main focus:border-brand-indigo rounded-none dark:rounded-md p-2.5 text-sm text-text-primary outline-none cursor-pointer"
                  >
                    <option value="Fresher / Student" className="bg-bg-primary">Fresher / Student</option>
                    <option value="0 - 1 Year" className="bg-bg-primary">0 - 1 Year</option>
                    <option value="1 - 2 Years" className="bg-bg-primary">1 - 2 Years</option>
                    <option value="2 - 4 Years" className="bg-bg-primary">2 - 4 Years</option>
                    <option value="4+ Years" className="bg-bg-primary">4+ Years</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-code uppercase text-text-primary mb-1 font-bold">
                      LinkedIn Profile URL
                    </label>
                    <input
                      type="url"
                      name="linkedinUrl"
                      placeholder="https://linkedin.com/in/..."
                      value={formData.linkedinUrl}
                      onChange={handleInputChange}
                      className="w-full bg-bg-primary dark:bg-bg-card border border-border-main focus:border-brand-indigo rounded-none dark:rounded-md px-3.5 py-2 text-xs text-text-primary placeholder:text-text-tertiary outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code uppercase text-text-primary mb-1 font-bold">
                      GitHub / Portfolio
                    </label>
                    <input
                      type="url"
                      name="portfolioUrl"
                      placeholder="https://github.com/..."
                      value={formData.portfolioUrl}
                      onChange={handleInputChange}
                      className="w-full bg-bg-primary dark:bg-bg-card border border-border-main focus:border-brand-indigo rounded-none dark:rounded-md px-3.5 py-2 text-xs text-text-primary placeholder:text-text-tertiary outline-none"
                    />
                  </div>
                </div>

                {/* Resume Upload / Link */}
                <div className="bg-bg-primary dark:bg-bg-card p-3 rounded-none dark:rounded-md border border-border-main space-y-2">
                  <label className="block text-xs font-mono-code uppercase text-text-primary font-bold">
                    Resume (PDF / DOC) or Link
                  </label>

                  {resumeFile ? (
                    <div className="flex items-center justify-between p-2 bg-bg-secondary border border-brand-indigo/40 rounded-none dark:rounded-md">
                      <span className="text-xs text-text-primary truncate max-w-[200px]">{resumeFile.name}</span>
                      <button
                        type="button"
                        onClick={() => setResumeFile(null)}
                        className="text-text-secondary hover:text-red-400 text-xs cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf"
                      onChange={handleFileChange}
                      className="text-xs text-text-secondary file:mr-2 file:py-1 file:px-3 file:rounded-none dark:file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-brand-indigo file:text-[#161616] hover:file:bg-[#d6af65] cursor-pointer"
                    />
                  )}

                  <input
                    type="url"
                    name="resumeUrl"
                    placeholder="Or paste Drive Link: https://drive.google.com/..."
                    value={formData.resumeUrl}
                    onChange={handleInputChange}
                    className="w-full bg-bg-secondary border border-border-main focus:border-brand-indigo rounded-none dark:rounded-md p-2 text-xs text-text-primary placeholder:text-text-tertiary outline-none mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-8 py-3.5 border border-[#24211C] dark:border-brand-indigo bg-[#24211C] dark:bg-brand-indigo text-[#F8F5F0] dark:text-[#161616] hover:bg-[#C8A15A] hover:text-[#24211C] hover:border-[#C8A15A] dark:hover:bg-transparent dark:hover:text-brand-indigo text-xs font-mono-code font-bold tracking-[0.18em] uppercase transition-all duration-300 rounded-none dark:rounded-md flex items-center justify-center gap-2 mt-4 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Sending..." : "Submit Application"}</span>
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


