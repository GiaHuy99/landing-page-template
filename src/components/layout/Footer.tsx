"use client";

import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import { SITE_CONTACT } from "@/config/contact";
import { site } from "@/config/site";
import { desktopNav } from "@/config/navigation";
import { scrollToSection } from "@/lib/scroll";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-navy-light border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 grid gap-10 md:grid-cols-3">
        <div>
          <p className="text-white text-sm font-semibold tracking-widest uppercase mb-3">
            {site.name}
          </p>
          <p className="text-cream text-sm leading-relaxed max-w-sm">{site.tagline}</p>
        </div>

        <div>
          <p className="text-gold text-xs tracking-widest uppercase mb-4">Navigate</p>
          <ul className="space-y-2">
            {desktopNav.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="text-cream text-sm hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 text-sm text-cream">
          <p className="text-gold text-xs tracking-widest uppercase mb-4">Contact</p>
          <a
            href={SITE_CONTACT.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-2 hover:text-white"
          >
            <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold" />
            <span>{SITE_CONTACT.address}</span>
          </a>
          <a
            href={`tel:${SITE_CONTACT.phoneTel}`}
            className="flex items-center gap-2 hover:text-white"
          >
            <Phone className="w-4 h-4 shrink-0 text-gold" />
            <span>{SITE_CONTACT.phoneDisplay}</span>
          </a>
          <a
            href={`mailto:${SITE_CONTACT.email}`}
            className="flex items-center gap-2 hover:text-white"
          >
            <Mail className="w-4 h-4 shrink-0 text-gold" />
            <span>{SITE_CONTACT.email}</span>
          </a>
          <a
            href={SITE_CONTACT.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-white"
          >
            <Facebook className="w-4 h-4 shrink-0 text-gold" />
            <span>Facebook</span>
          </a>
        </div>
      </div>

      <div className="border-t border-white/5 py-4 text-center text-xs text-cream/70">
        © {year} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
