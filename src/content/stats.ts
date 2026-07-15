import { PLACEHOLDER_IMAGE } from "@/config/assets";

export type StatItem = {
  value: string;
  label: string;
};

export const statsContent = {
  title: "Trusted by Clients Worldwide",
  backgroundImage: PLACEHOLDER_IMAGE,
  stats: [
    { value: "500+", label: "Clients" },
    { value: "98%", label: "Satisfaction" },
    { value: "30+", label: "Projects" },
    { value: "5★", label: "Average Rating" },
  ] as StatItem[],
};
