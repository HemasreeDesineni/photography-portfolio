"use client";

import CategoryCard from "./CategoryCard";
import { useState } from "react";

const categories = [
  {
    id: "conceptual",
    title: "CONCEPTUAL",
    image: "/images/conceptual.jpg",
    zoom: 1,
    position: "center",
  },
  {
    id: "arangetram",
    title: "ARANGETRAM",
    image: "/images/arangetram.jpg",
    zoom: 1,
    position: "center",
  },
  {
    id: "indoor",
    title: "INDOOR",
    image: "/images/indoor.jpg",
    zoom: 1,
    position: "center",
  },
  {
    id: "performances",
    title: "PERFORMANCES",
    image: "/images/performances.jpg",
    zoom: 1.2,
    position: "center top",
  },
];

export default function CategoryGrid() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="mx-auto grid h-full max-w-[1400px] grid-cols-4 auto-rows-fr gap-6">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.id}
          title={cat.title}
          image={cat.image}
          isActive={active === cat.id}
          onClick={() =>
            setActive(active === cat.id ? null : cat.id)
          }
          zoom={cat.zoom}
          position={cat.position}
        />
      ))}
    </div>
  );
}