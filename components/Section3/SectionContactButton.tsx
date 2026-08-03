export default function SectionContactButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Contact"
      className="absolute right-10 top-[25px] z-[100] cursor-pointer bg-transparent p-0 font-[var(--font-playfair)] text-lg text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] hover:opacity-80"
    >
      Contact
    </button>
  );
}
