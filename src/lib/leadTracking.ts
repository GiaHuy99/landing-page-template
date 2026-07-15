export const LEAD_SOURCE = {
  contactForm: "contact-form",
  welcomePopup: "welcome-popup",
  galleryOfferPin: "gallery-offer-pin",
  roiReport: "roi-report",
  projectCard: "project-card",
} as const;

export type LeadSourceId = (typeof LEAD_SOURCE)[keyof typeof LEAD_SOURCE];

export const LEAD_SOURCE_LABEL: Record<LeadSourceId, string> = {
  [LEAD_SOURCE.contactForm]: "Contact form · Footer section",
  [LEAD_SOURCE.welcomePopup]: "Welcome popup",
  [LEAD_SOURCE.galleryOfferPin]: "Offer pin · Edge widget",
  [LEAD_SOURCE.roiReport]: "ROI Simulator · Report download",
  [LEAD_SOURCE.projectCard]: "Project card · Gallery CTA",
};

export function buildLeadContext(parts: Array<string | undefined | null>): string {
  return parts
    .map((p) => p?.trim())
    .filter((p): p is string => Boolean(p && p !== "—"))
    .join(" · ");
}

export function formatExtraPayload(extra?: Record<string, unknown>): string {
  if (!extra || Object.keys(extra).length === 0) return "—";

  return Object.entries(extra)
    .map(([key, value]) => {
      const formatted =
        typeof value === "number"
          ? Number.isInteger(value)
            ? String(value)
            : value.toFixed(1)
          : String(value);
      return `${key}: ${formatted}`;
    })
    .join(" | ");
}
