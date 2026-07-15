"use client";

import { useMemo, useState } from "react";
import SectionShell from "@/components/ui/SectionShell";
import Button from "@/components/ui/Button";
import LeadCaptureModal from "@/components/forms/LeadCaptureModal";
import { LEAD_SOURCE, LEAD_SOURCE_LABEL } from "@/lib/leadTracking";

const CATEGORIES = [
  { id: "cafe", label: "Cafe", rentPerSqm: 1.2, margin: 0.28 },
  { id: "restaurant", label: "Restaurant", rentPerSqm: 1.5, margin: 0.22 },
  { id: "nightlife", label: "Nightlife", rentPerSqm: 1.8, margin: 0.3 },
] as const;

export default function ROISimulator() {
  const [categoryId, setCategoryId] = useState<(typeof CATEGORIES)[number]["id"]>("cafe");
  const [area, setArea] = useState(80);
  const [investment, setInvestment] = useState(2000);
  const [modalOpen, setModalOpen] = useState(false);

  const category = CATEGORIES.find((c) => c.id === categoryId) ?? CATEGORIES[0];

  const result = useMemo(() => {
    const monthlyRevenue = area * category.rentPerSqm * 12;
    const annualProfit = monthlyRevenue * 12 * category.margin;
    const roiPercent = investment > 0 ? (annualProfit / investment) * 100 : 0;
    const breakevenYears = annualProfit > 0 ? investment / annualProfit : 0;
    return { monthlyRevenue, annualProfit, roiPercent, breakevenYears };
  }, [area, investment, category]);

  return (
    <SectionShell id="roi" variant="default" className="bg-navy">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">
            Calculator
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            ROI Simulator
          </h2>
          <p className="text-cream text-sm mt-3">
            Demo numbers only — replace with your own model assumptions.
          </p>
        </div>

        <div className="space-y-6 border border-white/10 bg-navy-light p-6 md:p-8">
          <div>
            <label className="block text-xs uppercase tracking-widest text-cream mb-2">
              Business model
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategoryId(c.id)}
                  className={`px-4 py-2 text-xs tracking-widest uppercase border ${
                    categoryId === c.id
                      ? "border-gold bg-gold text-navy"
                      : "border-white/20 text-cream hover:border-gold/40"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-cream mb-2">
              Area (m²): {area}
            </label>
            <input
              type="range"
              min={40}
              max={200}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full accent-gold"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-cream mb-2">
              Investment (units): {investment}
            </label>
            <input
              type="range"
              min={500}
              max={10000}
              step={100}
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full accent-gold"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="border border-white/10 p-4 text-center">
              <p className="text-gold text-2xl font-semibold">
                {result.roiPercent.toFixed(1)}%
              </p>
              <p className="text-xs text-cream uppercase tracking-widest mt-1">
                Est. ROI / year
              </p>
            </div>
            <div className="border border-white/10 p-4 text-center">
              <p className="text-gold text-2xl font-semibold">
                {result.breakevenYears.toFixed(1)}
              </p>
              <p className="text-xs text-cream uppercase tracking-widest mt-1">
                Breakeven (years)
              </p>
            </div>
            <div className="border border-white/10 p-4 text-center">
              <p className="text-gold text-2xl font-semibold">
                {Math.round(result.annualProfit)}
              </p>
              <p className="text-xs text-cream uppercase tracking-widest mt-1">
                Annual profit
              </p>
            </div>
          </div>

          <Button onClick={() => setModalOpen(true)} className="w-full">
            Request Full Report
          </Button>
        </div>
      </div>

      <LeadCaptureModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Request ROI Report"
        subtitle="Leave your details to receive a sample investment report."
        source={LEAD_SOURCE.roiReport}
        sourceLabel={LEAD_SOURCE_LABEL[LEAD_SOURCE.roiReport]}
        initialNote={`ROI demo · ${category.label} · ${area}m²`}
        extraPayload={{
          category: category.label,
          areaSqm: area,
          roiPercent: Number(result.roiPercent.toFixed(1)),
          breakevenYears: Number(result.breakevenYears.toFixed(1)),
          totalInvestment: investment,
        }}
      />
    </SectionShell>
  );
}
