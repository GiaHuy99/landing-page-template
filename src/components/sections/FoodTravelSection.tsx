"use client";

import { useState } from "react";
import Image from "next/image";
import SectionShell from "@/components/ui/SectionShell";
import Modal from "@/components/ui/Modal";
import { foodTravelContent } from "@/content/gallery";

export default function FoodTravelSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = foodTravelContent.cards.find((c) => c.id === activeId) ?? null;

  return (
    <SectionShell id="foodtravel" variant="default" className="bg-navy-light">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            {foodTravelContent.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {foodTravelContent.cards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => setActiveId(card.id)}
              className="group text-left border border-white/10 overflow-hidden hover:border-gold/40 transition-colors"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={card.cover}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-cream text-sm">{card.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Modal
        open={Boolean(active)}
        onClose={() => setActiveId(null)}
        title={active?.title}
      >
        {active ? (
          <div className="grid sm:grid-cols-2 gap-3">
            {active.images.map((src, i) => (
              <div key={`${active.id}-${i}`} className="relative aspect-video">
                <Image
                  src={src}
                  alt={`${active.title} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
            ))}
          </div>
        ) : null}
      </Modal>
    </SectionShell>
  );
}
