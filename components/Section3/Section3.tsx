"use client";

import PortfolioShowcaseSection from "./PortfolioShowcaseSection";

export default function Section3({
  setSection,
}: {
  setSection: (n: number) => void;
}) {
  return (
    <PortfolioShowcaseSection
      setSection={setSection}
      titleSrc="/images/photography.png"
      titleAlt="photography"
    />
  );
}
