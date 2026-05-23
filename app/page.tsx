"use client";

import DesktopExperience from "@/components/Desktop/DesktopExperience";
import MobileExperience from "@/components/Mobile/MobileExperience";
import useIsMobile from "@/hooks/useIsMobile";

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <MobileExperience />
      ) : (
        <DesktopExperience />
      )}
    </>
  );
}