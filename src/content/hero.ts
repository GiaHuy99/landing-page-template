import { PLACEHOLDER_IMAGE } from "@/config/assets";

export const HERO_AUTOPLAY_MS = 5000;

export const heroContent = {
  brand: "Your Brand",
  title: "Your Headline Here",
  subtitle: "Replace this subtitle with a short value proposition for your landing page.",
  ctaLabel: "Get in Touch",
  ctaHref: "#contact",
  slides: [
    { src: PLACEHOLDER_IMAGE, alt: "Hero placeholder 1" },
    { src: PLACEHOLDER_IMAGE, alt: "Hero placeholder 2" },
    { src: PLACEHOLDER_IMAGE, alt: "Hero placeholder 3" },
  ],
};

export const SLIDE_COUNT = heroContent.slides.length;
