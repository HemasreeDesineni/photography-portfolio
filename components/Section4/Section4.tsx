"use client";

import PortfolioShowcaseSection from "../Section3/PortfolioShowcaseSection";

export default function Section4({
  setSection,
}: {
  setSection: (n: number) => void;
}) {
  return (
    <PortfolioShowcaseSection
      setSection={setSection}
      titleSrc="/images/videography.png"
      titleAlt="videography"
      showBannerImage={false}
      showVisualTitle={false}
      titleClassName="h-[48px] w-[500px] md:h-[72px] md:w-[660px] lg:h-[94px] lg:w-[860px] xl:h-[116px] xl:w-[1040px]"
      titleSizes="(max-width: 768px) 500px, (max-width: 1024px) 660px, (max-width: 1280px) 860px, 1040px"
      gridMarginTop="-135px"
    />
  );
}
