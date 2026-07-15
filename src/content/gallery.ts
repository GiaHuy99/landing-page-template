import { PLACEHOLDER_IMAGE } from "@/config/assets";

export type GalleryTile = {
  src: string;
  alt: string;
  caption: string;
  aspect: "wide" | "square";
};

export const galleryContent = {
  title: "Featured Gallery",
  tiles: [
    {
      src: PLACEHOLDER_IMAGE,
      alt: "Gallery tile 1",
      caption: "Featured view",
      aspect: "wide",
    },
    {
      src: PLACEHOLDER_IMAGE,
      alt: "Gallery tile 2",
      caption: "Detail view",
      aspect: "square",
    },
  ] as GalleryTile[],
};

export const foodTravelContent = {
  title: "Food & Travel",
  cards: [
    {
      id: "travel",
      title: "Travel",
      description: "Explore destination highlights.",
      cover: PLACEHOLDER_IMAGE,
      images: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],
    },
    {
      id: "food",
      title: "Food",
      description: "Discover culinary experiences.",
      cover: PLACEHOLDER_IMAGE,
      images: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],
    },
  ],
};

export const offerPinContent = {
  label: "Offer",
  title: "Limited Preference",
  body: "Placeholder offer copy. Update with your campaign details.",
  ctaLabel: "Request Details",
};
