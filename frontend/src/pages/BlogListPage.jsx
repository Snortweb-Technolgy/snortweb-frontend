import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/seo/SEO";
import api from "../api/axios";
import { Search, Calendar, User, ArrowRight, BookOpen, Clock, Tag } from "lucide-react";

// Available SEO Content Categories
const CATEGORIES = [
  "All",
  "Website Development",
  "Cybersecurity",
  "Penetration Testing",
  "Website Performance",
  "API Security",
  "Business Technology",
  "Web Applications"
];

// 6 Core SEO Articles mapped 1-to-1 with Snortweb Services & Strategic Search Intent
const fallbackBlogs = [
  {
    _id: "seo-1",
    title: "Modern Website Development: Building Fast, Secure & SEO-Optimized Sites",
    slug: "website-development-best-practices",
    category: "Website Development",
    readTime: "6 min read",
    excerpt: "Discover how modern frontend frameworks, responsive UI systems, and Core Web Vitals optimization deliver unbeatable web experiences.",
    content: "Full article content...",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    author: "Snortweb Technology Editorial Team",
    tags: ["Website Development", "Core Web Vitals", "SEO"],
    createdAt: new Date("2026-02-01").toISOString()
  },
  {
    _id: "seo-2",
    title: "10 Essential Cybersecurity Practices for Modern Businesses",
    slug: "10-essential-cybersecurity-practices",
    category: "Cybersecurity",
    readTime: "7 min read",
    excerpt: "Safeguard your digital infrastructure against zero-day threats, data breaches, SQL injections, and authentication vulnerabilities.",
    content: "Full article content...",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    author: "Snortweb Technology Editorial Team",
    tags: ["Cybersecurity", "Data Protection", "Security Checklist"],
    createdAt: new Date("2026-02-03").toISOString()
  },
  {
    _id: "seo-3",
    title: "Mastering Penetration Testing & Comprehensive Security Audits",
    slug: "penetration-testing-security-audit-guide",
    category: "Penetration Testing",
    readTime: "8 min read",
    excerpt: "Ethical hacking techniques, black-box testing methodologies, and actionable security reporting to uncover zero-day flaws.",
    content: "Full article content...",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    author: "Snortweb Technology Editorial Team",
    tags: ["Penetration Testing", "Security Audit", "Ethical Hacking"],
    createdAt: new Date("2026-02-05").toISOString()
  },
  {
    _id: "seo-4",
    title: "When Should a Business Build a Custom Web Application? (Complete Guide)",
    slug: "when-to-build-custom-web-application",
    category: "Web Applications",
    readTime: "7 min read",
    excerpt: "Learn when off-the-shelf software limits your business growth and why custom web applications provide scalable ROI.",
    content: "Full article content...",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    author: "Snortweb Technology Editorial Team",
    tags: ["Web Applications", "Software Architecture", "Custom Code"],
    createdAt: new Date("2026-02-07").toISOString()
  },
  {
    _id: "seo-5",
    title: "Website Vulnerability Assessment: Complete Guide for Business Owners",
    slug: "website-vulnerability-assessment-guide",
    category: "Cybersecurity",
    readTime: "6 min read",
    excerpt: "How vulnerability scanning and risk modeling protect customer trust and prevent costly business disruptions.",
    content: "Full article content...",
    coverImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80",
    author: "Snortweb Technology Editorial Team",
    tags: ["Vulnerability Assessment", "Cybersecurity", "OWASP"],
    createdAt: new Date("2026-02-09").toISOString()
  },
  {
    _id: "seo-6",
    title: "How Much Does a Website Cost in India in 2026? (Complete Pricing Breakdown)",
    slug: "how-much-does-a-website-cost-in-india-2026",
    category: "Business Technology",
    readTime: "9 min read",
    excerpt: "A transparent breakdown of website design, custom web app development, maintenance, and security costs in India.",
    content: "Full article content...",
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    author: "Snortweb Technology Editorial Team",
    tags: ["Website Cost", "India 2026", "Business Technology"],
    createdAt: new Date("2026-02-11").toISOString()
  }
];

export default function BlogListPage() {
  const [blogs, setBlogs] = useState(fallbackBlogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get("/blogs", { timeout: 5000 });
        if (data && Array.isArray(data) && data.length > 0) {
          const published = data.filter((b) => b.isPublished !== false);
          if (published.length > 0) {
            setBlogs(published);
          }
        }
      } catch (error) {
        // Quietly maintain structured fallback blogs
      }
    };

    fetchBlogs();
  }, []);

  // Filtered list based on search term & category selection
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.category && blog.category.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" ||
      (blog.category && blog.category.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen bg-bg-primary text-text-primary pt-[140px] pb-[120px] px-6 md:px-12 select-none"
    >
      <SEO
        title="Tech Articles & Insights | Snortweb Technology"
        description="Explore insights on website development, cybersecurity, penetration testing, performance, and modern business technology from Snortweb Technology."
        canonical="https://snortwebtechnology.com/blogs"
      />

      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Header Hero Section */}
        <div className="flex flex-col items-start text-left max-w-3xl space-y-4">
          <span className="font-mono-code font-bold text-[0.7rem] tracking-[0.25em] text-[#C8A15A] uppercase flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            INSIGHTS &amp; ARTICLES
          </span>
          <h1 className="font-sans-heading font-black text-[2.2rem] md:text-[3.5rem] tracking-tight uppercase leading-none text-text-primary">
            Engineering <span className="text-[#C8A15A]">&amp;</span> Security Intelligence.
          </h1>
          <p className="font-sans-body text-text-secondary text-[0.95rem] md:text-[1.05rem] leading-relaxed">
            Explore insights on website development, cybersecurity, application security, performance and modern business technology from Snortweb Technology.
          </p>
        </div>

        {/* Filter Controls Bar (Category Chips & Search) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-border-main pb-8">
          {/* Category Chips Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono-code font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#C8A15A] text-slate-950 shadow-md shadow-[#C8A15A]/20"
                    : "bg-bg-secondary text-text-secondary border border-border-subtle hover:border-[#C8A15A] hover:text-text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72 flex-shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-bg-secondary border border-border-main rounded-xl pl-10 pr-4 py-2.5 text-xs font-sans-body text-text-primary focus:outline-none focus:border-[#C8A15A] transition-colors"
            />
          </div>
        </div>

        {/* Article Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-bg-secondary/40 border border-border-subtle rounded-2xl">
            <p className="text-text-primary font-bold">No articles match your search or filter.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="text-xs text-[#C8A15A] font-bold underline cursor-pointer"
            >
              Clear search &amp; filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, idx) => (
              <motion.article
                key={blog._id || blog.slug || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group flex flex-col bg-bg-card border border-border-main rounded-2xl overflow-hidden hover:border-[#C8A15A]/60 transition-all duration-300 shadow-lg hover:shadow-[#C8A15A]/5"
              >
                {/* Cover Image */}
                <Link to={`/blogs/${blog.slug}`} className="relative h-48 w-full overflow-hidden bg-black/40 block">
                  <img
                    src={blog.coverImage || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-transparent to-transparent" />

                  {/* Category Tag overlay */}
                  <span className="absolute top-4 left-4 bg-bg-primary/90 backdrop-blur-md text-[#C8A15A] border border-[#C8A15A]/30 px-3 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider">
                    {blog.category || "Website Development"}
                  </span>
                </Link>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3 text-left">
                    {/* Meta info */}
                    <div className="flex items-center justify-between text-[11px] font-mono-code text-text-tertiary border-b border-border-subtle/50 pb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#C8A15A]" />
                        {new Date(blog.createdAt || blog.publishedAt || Date.now()).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#C8A15A]" />
                        {blog.readTime || "6 min read"}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-sans-heading font-black text-[1.15rem] text-text-primary group-hover:text-[#C8A15A] transition-colors leading-snug">
                      <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="font-sans-body text-text-secondary text-[0.875rem] leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* Read Article CTA */}
                  <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                    <span className="text-[11px] font-mono-code text-text-tertiary">
                      {blog.author || "Snortweb Technology Editorial Team"}
                    </span>
                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="font-mono-code font-bold text-[0.75rem] tracking-wider text-[#C8A15A] group-hover:underline inline-flex items-center gap-1.5 uppercase flex-shrink-0"
                    >
                      READ ARTICLE
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
