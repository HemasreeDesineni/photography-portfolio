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
    photos: [],
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
    photos: [],
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
