"use client";

import CategoryCard from "./CategoryCard";
import { useState } from "react";

const categories = [
  {
    id: "conceptual",
    title: "CONCEPTUAL",
    image: "/images/conceptual.jpg",
  },
  {
    id: "arangetram",
    title: "ARANGETRAM",
    image: "/images/arangetram.jpg",
  },
  {
    id: "indoor",
    title: "INDOOR",
    image: "/images/indoor.jpg",
  },
  {
    id: "performances",
    title: "PERFORMANCES",
    image: "/images/performances.jpg",
  },
];

export default function CategoryGrid() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-4 gap-6 max-w-[1400px] mx-auto">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.id}
          title={cat.title}
          image={cat.image}
          isActive={active === cat.id}
          onClick={() =>
            setActive(active === cat.id ? null : cat.id)
          }
        />
      ))}
    </div>
  );
}