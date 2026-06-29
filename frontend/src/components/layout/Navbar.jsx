import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../context/AppContext";
import { Button } from "../ui/Button";

export default function Navbar() {
  const { menuOpen, setMenuOpen, theme, setTheme } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [showBar, setShowBar] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("bar-dismissed") !== "true";
    }
    return false;
  });
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Track window scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    if (location.pathname !== "/") {
      if (activeSection !== "") {
        const timer = setTimeout(() => {
          setActiveSection("");
        }, 0);
        return () => clearTimeout(timer);
      }
      return;
    }

    const sectionIds = ["hero", "about-section", "services-section", "portfolio-section", "stats-section", "process-section", "reviews-section", "contact-section"];

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let sectionName = entry.target.id;
          if (sectionName === "about-section") sectionName = "about";
          else if (sectionName === "services-section") sectionName = "services";
          else if (sectionName === "portfolio-section") sectionName = "projects";
          else if (sectionName === "stats-section") sectionName = "stats";
          else if (sectionName === "process-section") sectionName = "process";
          else if (sectionName === "reviews-section") sectionName = "reviews";
          else if (sectionName === "contact-section") sectionName = "contact";
          
          setActiveSection(sectionName);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // triggers when section is in the middle of viewport
      threshold: 0.1
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname, activeSection]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/#portfolio-section" },
    { name: "About", path: "/#about-section" },
    { name: "Process", path: "/#process-section" },
    { name: "Review", path: "/#reviews-section" },
    { name: "Contact", path: "/contact" }
  ];

  const handleLinkClick = (path) => {
    setMenuOpen(false);
    if (path.startsWith("/#")) {
      const id = path.substring(2);
      const element = document.getElementById(id);
      if (element) {
        if (window.lenis) {
          window.lenis.scrollTo(element, { offset: -80 });
        } else {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            if (window.lenis) window.lenis.scrollTo(el, { offset: -80 });
            else el.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else {
      if (path === "/" && window.location.pathname === "/") {
        if (window.lenis) {
          window.lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        navigate(path);
        // scroll to top when changing route
        window.scrollTo(0, 0);
      }
    }
  };

  const handleCTA = () => {
    setMenuOpen(false);
    navigate("/contact");
  };

  const handleDismissBar = () => {
    setShowBar(false);
    sessionStorage.setItem("bar-dismissed", "true");
  };

  // Logo wobble anim parameters
  const logoContainerVariants = {
    initial: {},
    hover: {
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const logoLetterVariants = {
    initial: { y: 0 },
    hover: {
      y: [0, -4, 0],
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const isLinkActive = (link, isActive) => {
    // If router reports path is active and it's not a hash route
    if (!link.path.startsWith("/#") && isActive) {
      if (link.path === "/") {
        return window.location.pathname === "/" && (activeSection === "hero" || activeSection === "");
      }
      return true;
    }
    // If on home, override with intersection observer state
    if (window.location.pathname === "/") {
      if (link.path === "/services" && activeSection === "services") return true;
      if (link.path === "/#portfolio-section" && activeSection === "projects") return true;
      if (link.path === "/#about-section" && activeSection === "about") return true;
      if (link.path === "/#process-section" && activeSection === "process") return true;
      if (link.path === "/#reviews-section" && activeSection === "reviews") return true;
      if (link.path === "/contact" && activeSection === "contact") return true;
    }
    return false;
  };

  return (
    <>
      {/* 1. Announcement Bar */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ height: 36, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-[110] flex items-center justify-between px-6 md:px-12 bg-black border-b border-black overflow-hidden select-none"
            style={{ height: "36px" }}
          >
            {/* Center Content */}
            <div className="flex items-center gap-2 mx-auto font-sans-body text-[0.72rem] md:text-[0.78rem] text-white/70 font-medium">
              {/* White Square Block indicator */}
              <div className="w-[5px] h-[5px] bg-white" />
              <span>Snortweb Technology — Now Accepting New Projects</span>
              <Link to="/contact" className="text-white underline font-semibold hover:text-white/80 nav-link-no-underline ml-1">
                Get Started →
              </Link>
            </div>

            {/* Right Close Button */}
            <button
              onClick={handleDismissBar}
              className="text-white/50 hover:text-white font-sans-body text-[1rem] leading-none outline-none select-none cursor-pointer"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Navigation Bar */}
      <nav
        className={`fixed left-0 right-0 z-[100] h-[72px] flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
          scrolled
            ? "bg-bg-primary border-b border-border-light shadow-hairline"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{
          top: showBar ? "36px" : "0px"
        }}
      >
        {/* Left: Logo Group */}
        <Link
          to="/"
          onClick={() => {
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3.5 select-none group nav-link-no-underline"
        >
          <img
            src="/logo-icon.png"
            alt="Snortweb Logo Icon"
            className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-[1.05]"
          />
          <div className="flex flex-col text-left">
            <span className="font-sans-heading font-black text-[1.1rem] tracking-[0.2em] text-[#F5F3EF] uppercase leading-none transition-colors duration-300 group-hover:text-white">
              SNORTWEB
            </span>
            <span className="font-sans-body font-light text-[0.55rem] tracking-[0.4em] text-text-tertiary leading-none uppercase mt-1 transition-colors duration-300 group-hover:text-text-secondary">
              TECHNOLOGY
            </span>
          </div>
        </Link>

        {/* Center: Nav Links */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => handleLinkClick(link.path)}
              className="nav-link-no-underline py-2"
            >
              {({ isActive }) => {
                const active = isLinkActive(link, isActive);
                return (
                  <span className="relative overflow-hidden group pb-1.5 text-xs font-mono-code font-bold tracking-[0.18em] uppercase transition-colors duration-300 text-text-secondary hover:text-text-primary block">
                    <span className={active ? "text-text-primary" : ""}>{link.name}</span>
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[1px] bg-text-primary origin-left transition-transform duration-300 ease-out ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </span>
                );
              }}
            </NavLink>
          ))}
        </div>

        {/* Right: CTA Button */}
        <div className="hidden md:flex items-center gap-6">
          {/* Premium Tech Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 bg-[#1E1E1E]/40 border border-border-light rounded-none dark:rounded-md text-accent shadow-inset-overlay select-none"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C8A15A]"></span>
            </span>
            <span className="text-[0.62rem] tracking-[0.22em] font-mono-code uppercase font-bold text-accent">
              SECURE OPERATIONS PORTAL ACTIVE
            </span>
          </motion.div>

          <Button
            magnetic={true}
            onClick={handleCTA}
            className="border-2 border-[#C8A15A] bg-transparent px-7 py-2.5 text-[0.72rem] font-mono-code font-bold tracking-[0.18em] text-text-primary hover:bg-[rgba(200,161,90,0.08)] transition-all duration-300 rounded-none dark:rounded-md"
          >
            GET STARTED
          </Button>
        </div>

        {/* Mobile Action Group (Hamburger) */}
        <div className="flex md:hidden items-center gap-4 z-[210]">
          {/* Hamburger toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center w-6 h-6 relative select-none pointer-events-auto"
            aria-label="Toggle Navigation Menu"
          >
            <span
              className={`w-5 h-[2px] bg-text-primary transition-transform duration-100 ${
                menuOpen ? "bg-white rotate-45 translate-y-[5.5px]" : "mb-1"
              }`}
            />
            <span
              className={`w-5 h-[2px] bg-text-primary transition-opacity duration-100 ${
                menuOpen ? "opacity-0" : "mb-1"
              }`}
            />
            <span
              className={`w-5 h-[2px] bg-text-primary transition-transform duration-100 ${
                menuOpen ? "bg-white -rotate-45 -translate-y-[5.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 bg-black z-[200] flex flex-col justify-center px-8 md:hidden text-white"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.2 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => {
                      if (link.path.startsWith("/#")) {
                        handleLinkClick(link.path);
                      } else {
                        setMenuOpen(false);
                      }
                    }}
                    className="nav-link-no-underline text-3xl font-sans-heading font-black tracking-tight text-white uppercase hover:text-white/70 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + navLinks.length * 0.04, duration: 0.2 }}
                className="pt-8"
              >
                <Button
                  magnetic={false}
                  onClick={handleCTA}
                  className="w-full border-2 border-white py-4 text-center text-xs font-mono-code font-bold tracking-[0.2em] text-white rounded-none hover:bg-white hover:text-black transition-colors duration-100 bg-transparent"
                >
                  GET STARTED
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export { Navbar };
