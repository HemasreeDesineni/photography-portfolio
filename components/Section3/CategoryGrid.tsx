"use client";

import { useState } from "react";
import CategoryCard from "./CategoryCard";
import {
  photographyCategories,
  type CategoryDefinition,
} from "./categoryData";

export default function CategoryGrid({
  categories = photographyCategories,
  activeId,
  onToggleCategory,
}: {
  categories?: CategoryDefinition[];
  activeId?: string | null;
  onToggleCategory?: (id: string) => void;
}) {
  const [localActive, setLocalActive] = useState<string | null>(null);
  const resolvedActive = activeId !== undefined ? activeId : localActive;

  const handleToggle = (id: string) => {
    if (onToggleCategory) {
      onToggleCategory(id);
      return;
    }

    setLocalActive((current) => (current === id ? null : id));
  };

  return (
    <div className="mx-auto grid h-full max-w-[1400px] grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 xl:auto-rows-fr">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.id}
          title={cat.title}
          titleImage={cat.titleImage}
          image={cat.image}
          isActive={resolvedActive === cat.id}
          onClick={() => handleToggle(cat.id)}
          zoom={cat.zoom}
          position={cat.position}
        />
      ))}
    </div>
  );
}
