"use client";

export const PHOTOS_PER_PAGE = 6;

export type CategoryPhoto = {
  src: string;
  alt: string;
};

export type CategoryVideo = {
  src: string;
  poster?: string;
  title?: string;
};

export type CategoryDefinition = {
  id: string;
  title: string;
  titleImage: string;
  titleScale?: number;
  galleryTitle: string;
  galleryTitleImage?: string;
  galleryTitleScale?: number;
  image: string;
  zoom?: number;
  position?: string;
  photos: CategoryPhoto[];
};

const createCategoryPhotos = (
  category: string,
  files: string[],
): CategoryPhoto[] =>
  files.map((file, index) => ({
    src: `/images/photography/${category}/${file}`,
    alt: `${category} photography image ${index + 1}`,
  }));

const createNumberedPhotos = (
  category: string,
  total: number,
): CategoryPhoto[] =>
  createCategoryPhotos(
    category,
    Array.from({ length: total }, (_, index) => `${index + 1}.jpg`),
  );

export const photographyCategories: CategoryDefinition[] = [
  {
    id: "conceptual",
    title: "CONCEPTUAL",
    titleImage: "/images/conceptual-title1.png",
    titleScale: 41,
    galleryTitle: "Conceptual",
    galleryTitleImage: "/images/conceptual-title2.png",
    galleryTitleScale: 6,
    image: "/images/conceptual.jpg",
    zoom: 1,
    position: "center",
    photos: createNumberedPhotos("conceptual", 30),
  },
  {
    id: "arangetram",
    title: "ARANGETRAM",
    titleImage: "/images/arangetram-title1.png",
    galleryTitle: "Arangetram",
    galleryTitleImage: "/images/arangetram-title2.png",
    galleryTitleScale: 5.5,
    image: "/images/arangetram.jpg",
    zoom: 1,
    position: "center",
    photos: [],
  },
  {
    id: "indoor",
    title: "INDOOR",
    titleImage: "/images/indoor-title1.png",
    galleryTitle: "Indoor",
    galleryTitleImage: "/images/indoor-title2.png",
    galleryTitleScale: 7.5,
    image: "/images/indoor.jpg",
    zoom: 1,
    position: "center",
    photos: createCategoryPhotos("indoor", [
      "1.jpg",
      "2.jpg",
      "3.jpg",
      "4.png",
    ]),
  },
  {
    id: "performances",
    title: "PERFORMANCES",
    titleImage: "/images/performances-title1.png",
    galleryTitle: "Performances",
    galleryTitleImage: "/images/performances-title2.png",
    galleryTitleScale: 5.3,
    image: "/images/performances.jpg",
    zoom: 1.2,
    position: "center top",
    photos: createNumberedPhotos("performances", 25),
  },
];

export const videographyCategories: CategoryDefinition[] = [
  {
    id: "conceptual-video",
    title: "CONCEPTUAL",
    titleImage: "/images/conceptual-title1.png",
    titleScale: 41,
    galleryTitle: "Conceptual",
    galleryTitleImage: "/images/conceptual-title2.png",
    galleryTitleScale: 6,
    image: "/images/conceptual.jpg",
    zoom: 1,
    position: "center",
    photos: [],
  },

  {
    id: "arangetram-video",
    title: "ARANGETRAM",
    titleImage: "/images/arangetram-title1.png",
    galleryTitle: "Arangetram",
    galleryTitleImage: "/images/arangetram-title2.png",
    galleryTitleScale: 5.5,
    image: "/images/arangetram.jpg",
    zoom: 1,
    position: "center",
    photos: [],
  },

  {
    id: "indoor-video",
    title: "INDOOR",
    titleImage: "/images/indoor-title1.png",
    galleryTitle: "Indoor",
    galleryTitleImage: "/images/indoor-title2.png",
    galleryTitleScale: 7.5,
    image: "/images/indoor.jpg",
    zoom: 1,
    position: "center",
    photos: [],
  },

  {
    id: "performances-video",
    title: "PERFORMANCES",
    titleImage: "/images/performances-title1.png",
    galleryTitle: "Performances",
    galleryTitleImage: "/images/performances-title2.png",
    galleryTitleScale: 5.3,
    image: "/images/performances.jpg",
    zoom: 1.2,
    position: "center top",
    photos: [],
  },
];
