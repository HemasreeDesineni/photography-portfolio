"use client";

export const PHOTOS_PER_PAGE = 6;

export type CategoryPhoto = {
  src: string;
  alt: string;
};

export type CategoryDefinition = {
  id: string;
  title: string;
  titleImage: string;
  titleScale?: number;
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
    titleImage: "/images/conceptual-title1.png",
    titleScale: 41,
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
    titleImage: "/images/arangetram-title1.png",
    galleryTitle: "Arangetram",
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
    image: "/images/indoor.jpg",
    zoom: 1,
    position: "center",
    photos: [],
  },
  {
    id: "performances",
    title: "PERFORMANCES",
    titleImage: "/images/performances-title1.png",
    galleryTitle: "Performances",
    image: "/images/performances.jpg",
    zoom: 1.2,
    position: "center top",
    photos: [],
  },
];
