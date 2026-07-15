import { PLACEHOLDER_IMAGE } from "@/config/assets";

export type NewsArticle = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  url?: string;
  htmlContent?: string;
};

export type NewsConfig = {
  source: "static" | "cms";
  cmsUrl?: string;
  title: string;
  articles: NewsArticle[];
};

export const newsContent: NewsConfig = {
  source: "static",
  title: "News & Articles",
  articles: [
    {
      id: "1",
      title: "Sample Article One",
      excerpt: "Replace this with a short excerpt from your first news article.",
      date: "2026-01-15",
      image: PLACEHOLDER_IMAGE,
      url: "#",
      htmlContent:
        "<p>Full article body placeholder. Use CMS mode or static HTML here.</p>",
    },
    {
      id: "2",
      title: "Sample Article Two",
      excerpt: "Replace this with a short excerpt from your second news article.",
      date: "2026-02-01",
      image: PLACEHOLDER_IMAGE,
      url: "#",
      htmlContent:
        "<p>Full article body placeholder. Use CMS mode or static HTML here.</p>",
    },
  ],
};
