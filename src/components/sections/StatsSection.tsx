import Image from "next/image";
import SectionShell from "@/components/ui/SectionShell";
import StatCard from "@/components/ui/StatCard";
import { statsContent } from "@/content/stats";

export default function StatsSection() {
  return (
    <SectionShell id="stats" variant="statsOverlay">
      <div className="absolute inset-0">
        <Image
          src={statsContent.backgroundImage}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/75" />
      </div>

      <div className="relative z-10 min-h-[50vh] md:min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-10 reveal-on-scroll">
          {statsContent.title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-5xl">
          {statsContent.stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
