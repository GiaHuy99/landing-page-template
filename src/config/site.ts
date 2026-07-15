export type SectionId =
  | "hero"
  | "about"
  | "introduce"
  | "gallery"
  | "stats"
  | "projects"
  | "news"
  | "foodtravel"
  | "roi"
  | "zoning"
  | "contact";

export type SectionConfig = {
  id: SectionId;
  component: string;
  enabled: boolean;
};

export const site = {
  name: "Your Brand",
  tagline: "Your tagline here",
  locale: "en",
  description:
    "Reusable landing page starter. Replace this description with your project SEO text.",
  theme: {
    primary: "gold" as const,
    background: "navy" as const,
  },
  /** Chrome widgets outside the section registry */
  widgets: {
    floatingNav: true,
    contactFloat: true,
    offerPin: false,
    welcomePopup: false,
  },
  sections: [
    { id: "hero", component: "HeroSection", enabled: true },
    { id: "about", component: "AboutSection", enabled: true },
    { id: "introduce", component: "IntroduceSection", enabled: true },
    { id: "gallery", component: "ImageGallerySection", enabled: true },
    { id: "stats", component: "StatsSection", enabled: true },
    { id: "projects", component: "ProjectsSection", enabled: true },
    { id: "news", component: "NewsSection", enabled: false },
    { id: "foodtravel", component: "FoodTravelSection", enabled: false },
    { id: "roi", component: "ROISimulator", enabled: false },
    { id: "zoning", component: "ZoningSection", enabled: false },
    { id: "contact", component: "LeadForm", enabled: true },
  ] as const satisfies readonly SectionConfig[],
} as const;

export type SiteConfig = typeof site;
