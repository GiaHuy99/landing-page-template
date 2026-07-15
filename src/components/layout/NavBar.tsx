"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { desktopNav } from "@/config/navigation";
import { scrollToSection } from "@/lib/scroll";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy/95 border-b border-white/5" : "bg-transparent"
      }`}
      style={{ backdropFilter: scrolled ? "blur(12px)" : "none" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top,0px))] sm:px-6 sm:py-4">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("hero");
          }}
          className="flex items-center gap-3 min-w-0"
        >
          <div className="w-8 h-8 border border-gold flex items-center justify-center shrink-0">
            <span className="text-gold text-[10px] font-bold tracking-widest">
              {site.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="hidden sm:block min-w-0">
            <p className="text-white text-xs font-semibold tracking-widest uppercase leading-none truncate">
              {site.name}
            </p>
            <p className="text-cream text-[10px] tracking-widest uppercase truncate mt-1">
              {site.tagline}
            </p>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {desktopNav.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.id);
              }}
              className="text-cream text-xs tracking-widest uppercase font-medium hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => scrollToSection("contact")}
          className="md:hidden shrink-0 min-h-10 px-3 border border-gold/40 text-gold text-[10px] tracking-widest uppercase touch-manipulation"
        >
          Contact
        </button>
      </div>
    </header>
  );
}
