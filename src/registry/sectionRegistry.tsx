import type { ComponentType } from "react";
import type { SectionId } from "@/config/site";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import IntroduceSection from "@/components/sections/IntroduceSection";
import ImageGallerySection from "@/components/gallery/ImageGallerySection";
import StatsSection from "@/components/sections/StatsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import NewsSection from "@/components/sections/NewsSection";
import FoodTravelSection from "@/components/sections/FoodTravelSection";
import ROISimulator from "@/components/sections/ROISimulator";
import ZoningSection from "@/components/sections/ZoningSection";
import LeadForm from "@/components/forms/LeadForm";

export const sectionRegistry: Record<SectionId, ComponentType> = {
  hero: HeroSection,
  about: AboutSection,
  introduce: IntroduceSection,
  gallery: ImageGallerySection,
  stats: StatsSection,
  projects: ProjectsSection,
  news: NewsSection,
  foodtravel: FoodTravelSection,
  roi: ROISimulator,
  zoning: ZoningSection,
  contact: LeadForm,
};
