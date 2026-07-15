import Image from "next/image";
import SectionShell from "@/components/ui/SectionShell";
import { introduceContent } from "@/content/introduce";

export default function IntroduceSection() {
  return (
    <SectionShell id="introduce" variant="glassPanel">
      <div className="absolute inset-0">
        <Image
          src={introduceContent.image}
          alt={introduceContent.imageAlt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative z-10 min-h-[60vh] md:min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white/10 border border-white/20 backdrop-blur-md p-6 md:p-10 reveal-on-scroll">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            {introduceContent.title}
          </h2>
          <p className="text-cream text-sm md:text-base leading-relaxed">
            {introduceContent.body}
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
