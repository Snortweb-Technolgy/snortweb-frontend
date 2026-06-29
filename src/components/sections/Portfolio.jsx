import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ExternalLink, Folder } from "lucide-react";

const GithubIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function Portfolio() {
  const staticFallbackProjects = [
    {
      _id: "static-1",
      title: "Hotel Reyansh Pride",
      description: "A premium signature cafe & dine-in experience interface designed with custom booking, menu customization, and sleek order analytics.",
      category: "Dine & Cafe",
      tags: ["React", "Tailwind CSS", "Node.js", "Express"],
      imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
    },
    {
      _id: "static-2",
      title: "Reyansh Heights Real Estate",
      description: "Next-gen real estate platform featuring high-fidelity architectural showcases, dynamic virtual tours, and a secure client portal.",
      category: "Real Estate",
      tags: ["React", "Three.js", "MongoDB", "Tailwind CSS"],
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    },
    {
      _id: "static-3",
      title: "Packzivo Packaging",
      description: "Custom bulk packaging builder and supply chain logistics tracker tailored for premium eco-friendly shipping materials.",
      category: "Logistics & Supply",
      tags: ["React", "Framer Motion", "Node.js", "PostgreSQL"],
      imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const [projects, setProjects] = useState(staticFallbackProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/projects");
        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (error) {
        console.warn("Could not fetch live projects, using static fallback projects:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="portfolio-section" className="relative py-[100px] md:py-[140px] bg-bg-primary border-b border-border-main z-10 select-none overflow-hidden text-text-primary">
      {/* Texture overlays */}
      <div className="pattern-noise absolute inset-0 pointer-events-none z-0" />
      <div className="pattern-horizontal-lines absolute inset-0 pointer-events-none z-0" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20 max-w-[650px] mx-auto">
          <span className="font-mono-code font-bold text-[0.68rem] tracking-[0.3em] text-text-primary uppercase mb-4">
            FEATURED PORTFOLIO
          </span>
          <h2 className="font-sans-heading text-3xl sm:text-4xl md:text-5xl font-black text-text-primary leading-tight uppercase">
            BUILT FOR ULTRA-SECURE <br />
            <span className="font-normal italic">PERFORMANCE & SCALING.</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project._id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ y: { duration: 0.2, ease: "easeOut" } }}
              className="group relative bg-bg-card dark:bg-bg-primary border border-border-main p-6 sm:p-8 flex flex-col justify-between hover:bg-[#24211C] hover:text-[#F7F3EB] dark:hover:bg-bg-elevated dark:hover:text-text-primary transition-all duration-300 rounded-[24px] dark:rounded-md cursor-pointer shadow-card dark:shadow-none hover:shadow-low will-change-transform"
            >
              <div className="space-y-5">
                {/* Project Blurred Image with Coming Soon Overlay */}
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[16px] dark:rounded-md border border-border-subtle group-hover:border-white/10 transition-colors">
                  <img
                    src={project.imageUrl || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"}
                    alt={project.title}
                    className="w-full h-full object-cover filter blur-[8px] scale-[1.05] transition-all duration-500 group-hover:blur-[4px] group-hover:scale-[1.08]"
                  />
                  {/* Glowing Sweep scanline */}
                  <div className="absolute left-0 right-0 bg-gradient-to-b from-[#C8A15A]/35 via-[#C8A15A]/10 to-transparent h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none animate-scanline" />
                  
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="font-mono-code font-bold text-[0.68rem] tracking-[0.25em] text-[#F7F3EB] bg-[#24211C]/90 border border-amber-500/40 px-4 py-2 uppercase select-none shadow-md">
                      COMING SOON
                    </span>
                  </div>
                </div>

                {/* Category & Badge */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono-code font-bold tracking-[0.2em] text-amber-500 uppercase">
                    {project.category}
                  </span>
                  <Folder className="w-4 h-4 text-text-tertiary group-hover:text-amber-500 transition-colors" />
                </div>

                {/* Project Title */}
                <h3 className="font-sans-heading font-black text-xl uppercase tracking-tight text-text-primary group-hover:text-white dark:group-hover:text-text-primary">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="font-sans-body text-text-secondary text-xs sm:text-[13px] leading-[1.7] group-hover:text-white/80 dark:group-hover:text-text-secondary">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags && project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-bg-elevated border border-border-subtle group-hover:bg-white/10 group-hover:border-white/10 px-2 py-0.5 rounded-none dark:rounded text-[9px] font-mono-code text-text-secondary group-hover:text-white transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links (Locked/Coming Soon) */}
              <div className="flex gap-4 border-t border-border-subtle group-hover:border-white/10 pt-5 mt-6 transition-colors">
                <span className="flex items-center gap-2 font-mono-code text-[11px] font-bold text-text-tertiary group-hover:text-white/50 select-none">
                  <span>SYSTEM LOCK</span>
                  <span className="text-[9px] px-1.5 py-0.5 bg-black/10 dark:bg-white/5 rounded text-amber-500/80 group-hover:bg-white/10">SECURE</span>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
