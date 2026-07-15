import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Building2,
  Compass,
  Home,
  Info,
  MapPin,
  MessageCircle,
  Newspaper,
  Phone,
} from "lucide-react";
import type { SectionId } from "./site";

export type NavItem = {
  id: SectionId;
  label: string;
  icon: LucideIcon;
};

/** Desktop top nav — keep short for readability */
export const desktopNav: NavItem[] = [
  { id: "about", label: "About", icon: Info },
  { id: "projects", label: "Projects", icon: Building2 },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "contact", label: "Contact", icon: MessageCircle },
];

/** Floating side / bottom nav */
export const floatingNav: NavItem[] = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: Info },
  { id: "projects", label: "Projects", icon: Building2 },
  { id: "news", label: "News", icon: Newspaper },
  { id: "foodtravel", label: "Explore", icon: Compass },
  { id: "roi", label: "ROI", icon: BarChart3 },
  { id: "zoning", label: "Locations", icon: MapPin },
  { id: "contact", label: "Contact", icon: Phone },
];
