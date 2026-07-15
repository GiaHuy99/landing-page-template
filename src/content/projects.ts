import { PLACEHOLDER_IMAGE } from "@/config/assets";

export type Project = {
  slug: string;
  title: string;
  images: string[];
  developer: string;
  location: string;
  description: string;
};

export const projects: Project[] = [
  {
    slug: "project-a",
    title: "Project A",
    images: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],
    developer: "Developer Name",
    location: "City, Country",
    description: "Short project description placeholder for demo purposes.",
  },
  {
    slug: "project-b",
    title: "Project B",
    images: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],
    developer: "Developer Name",
    location: "City, Country",
    description: "Short project description placeholder for demo purposes.",
  },
];
