import SectionShell from "@/components/ui/SectionShell";

const ZONES = [
  {
    name: "Location A",
    highlight: "Prime foot traffic",
    points: ["Transit access", "Mixed-use corridor", "Growing demand"],
  },
  {
    name: "Location B",
    highlight: "Tourism corridor",
    points: ["Resort proximity", "Evening economy", "Brand visibility"],
  },
  {
    name: "Location C",
    highlight: "Emerging district",
    points: ["Infrastructure pipeline", "Early entry pricing", "Long-term upside"],
  },
] as const;

export default function ZoningSection() {
  return (
    <SectionShell id="zoning" variant="default" className="bg-navy-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 reveal-on-scroll">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">
            Locations
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Zoning Overview
          </h2>
          <p className="text-cream text-sm mt-3 max-w-2xl mx-auto">
            Placeholder comparison cards. Replace with your real zoning and location data.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {ZONES.map((zone) => (
            <article
              key={zone.name}
              className="border border-white/10 bg-navy p-6 flex flex-col"
            >
              <h3 className="text-lg font-semibold text-white mb-1">{zone.name}</h3>
              <p className="text-gold text-xs tracking-widest uppercase mb-4">
                {zone.highlight}
              </p>
              <ul className="space-y-2 text-sm text-cream flex-1">
                {zone.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-gold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
