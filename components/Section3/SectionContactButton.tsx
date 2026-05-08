import TransparentImageLabel from "./TransparentImageLabel";

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
      className="absolute right-6 top-5 z-[100] cursor-pointer bg-transparent p-0"
    >
      <TransparentImageLabel
        src="/images/contact-page3.png"
        alt="Contact"
        scale={60}
        sizes="140px"
        className="h-[16px] w-[120px] md:h-[17px] md:w-[130px] xl:h-[18px] xl:w-[140px]"
      />
    </button>
  );
}
