import Image from "next/image";
import SectionShell from "@/components/ui/SectionShell";
import { aboutContent } from "@/content/about";

export default function AboutSection() {
  return (
    <SectionShell id="about" variant="splitImage" className="bg-navy">
      <div className="max-w-6xl mx-auto relative">
        <div className="relative min-h-[320px] md:min-h-[480px] overflow-hidden">
          <Image
            src={aboutContent.image}
            alt={aboutContent.imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        <div className="md:absolute md:right-8 md:-bottom-10 md:w-[420px] bg-navy-light/95 border border-white/10 p-6 md:p-8 shadow-2xl reveal-on-scroll mt-4 md:mt-0 relative z-10">
          <p className="text-gold text-xs tracking-[0.25em] uppercase mb-3">
            {aboutContent.eyebrow}
          </p>
          <h2 className="text-2xl font-semibold text-white mb-4">
            {aboutContent.title}
          </h2>
          <p className="text-cream text-sm leading-relaxed">{aboutContent.body}</p>
        </div>
      </div>
      <div className="hidden md:block h-16" />
    </SectionShell>
  );
}
