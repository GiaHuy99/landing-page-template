"use client";

import { useEffect, useState } from "react";
import { Facebook, MessageCircle, Phone } from "lucide-react";
import { SITE_CONTACT } from "@/config/contact";

export default function ContactFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed right-3 md:right-5 bottom-24 md:bottom-8 z-40 flex flex-col gap-2">
      <a
        href={SITE_CONTACT.zaloUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on Zalo"
        className="w-11 h-11 flex items-center justify-center rounded-full bg-navy border border-gold/40 text-gold hover:bg-gold hover:text-navy transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
      <a
        href={`tel:${SITE_CONTACT.phoneTel}`}
        aria-label="Call phone"
        className="w-11 h-11 flex items-center justify-center rounded-full bg-navy border border-gold/40 text-gold hover:bg-gold hover:text-navy transition-colors"
      >
        <Phone className="w-5 h-5" />
      </a>
      <a
        href={SITE_CONTACT.facebookUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook"
        className="w-11 h-11 flex items-center justify-center rounded-full bg-navy border border-gold/40 text-gold hover:bg-gold hover:text-navy transition-colors"
      >
        <Facebook className="w-5 h-5" />
      </a>
    </div>
  );
}
