"use client";

export const PHOTOS_PER_PAGE = 6;

export type CategoryPhoto = {
  src: string;
  alt: string;
};

export type CategoryDefinition = {
  id: string;
  title: string;
  galleryTitle: string;
  image: string;
  zoom?: number;
  position?: string;
  photos: CategoryPhoto[];
};

export const photographyCategories: CategoryDefinition[] = [
  {
    id: "conceptual",
    title: "CONCEPTUAL",
    galleryTitle: "Conceptual",
    image: "/images/conceptual.jpg",
    zoom: 1,
    position: "center",
    photos: [
      {
        src: "/images/photography/conceptual/img1.jpg",
        alt: "Conceptual photography image 1",
      },
      {
        src: "/images/photography/conceptual/img2.jpg",
        alt: "Conceptual photography image 2",
      },
    ],
  },
  {
    id: "arangetram",
    title: "ARANGETRAM",
    galleryTitle: "Arangetram",
    image: "/images/arangetram.jpg",
    zoom: 1,
    position: "center",
    photos: [],
  },
  {
    id: "indoor",
    title: "INDOOR",
    galleryTitle: "Indoor",
    image: "/images/indoor.jpg",
    zoom: 1,
    position: "center",
    photos: [],
  },
  {
    id: "performances",
    title: "PERFORMANCES",
    galleryTitle: "Performances",
    image: "/images/performances.jpg",
    zoom: 1.2,
    position: "center top",
    photos: [],
  },
];
