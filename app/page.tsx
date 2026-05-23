"use client";

import DesktopExperience from "@/components/Desktop/DesktopExperience";
import MobileExperience from "@/components/Mobile/MobileExperience";

import useIsMobile from "@/hooks/useIsMobile";

export default function Home() {
  const { isMobile, isReady } = useIsMobile();

  if (!isReady) {
    return (
      <main className="h-screen w-full bg-black" />
    );
  }

  return isMobile
    ? <MobileExperience />
    : <DesktopExperience />;
}