"use client";

import { useState } from "react";
import { offerPinContent } from "@/content/gallery";
import LeadCaptureModal from "@/components/forms/LeadCaptureModal";
import Button from "@/components/ui/Button";
import { LEAD_SOURCE, LEAD_SOURCE_LABEL } from "@/lib/leadTracking";

export default function OfferPin() {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex items-stretch">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="writing-vertical bg-gold text-navy text-[10px] font-semibold tracking-[0.2em] uppercase px-2 py-4 hover:bg-gold-light"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          aria-expanded={expanded}
        >
          {offerPinContent.label}
        </button>

        {expanded ? (
          <div className="w-64 max-w-[70vw] bg-navy border border-gold/40 border-l-0 p-4 shadow-2xl">
            <p className="text-white font-semibold mb-2">{offerPinContent.title}</p>
            <p className="text-cream text-xs leading-relaxed mb-4">
              {offerPinContent.body}
            </p>
            <Button
              className="w-full"
              onClick={() => {
                setExpanded(false);
                setModalOpen(true);
              }}
            >
              {offerPinContent.ctaLabel}
            </Button>
          </div>
        ) : null}
      </div>

      <LeadCaptureModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={offerPinContent.title}
        subtitle={offerPinContent.body}
        source={LEAD_SOURCE.galleryOfferPin}
        sourceLabel={LEAD_SOURCE_LABEL[LEAD_SOURCE.galleryOfferPin]}
      />
    </>
  );
}
