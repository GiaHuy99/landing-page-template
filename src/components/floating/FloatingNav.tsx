"use client";

import { floatingNav } from "@/config/navigation";
import { site } from "@/config/site";
import { scrollToSection } from "@/lib/scroll";

export default function FloatingNav() {
  const enabledIds = new Set<string>(
    site.sections.filter((s) => s.enabled).map((s) => s.id),
  );

  const items = floatingNav.filter(
    (item) => item.id === "hero" || enabledIds.has(item.id),
  );

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Floating sections"
      className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-2"
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            type="button"
            title={item.label}
            aria-label={item.label}
            onClick={() => scrollToSection(item.id)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-navy/80 border border-white/10 text-cream hover:text-gold hover:border-gold/50 transition-colors"
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </nav>
  );
}
