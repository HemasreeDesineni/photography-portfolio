export default function HeroOverlay({ loaded }: { loaded: boolean }) {
  return (
    <div
      className={`absolute inset-0 bg-[#7a0000] z-30 transition-opacity duration-[1500ms] ${
        loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    />
  )
}