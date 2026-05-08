import Image from "next/image";

export default function TransparentImageLabel({
  src,
  alt,
  scale,
  className = "",
  sizes = "260px",
  priority = false,
}: {
  src: string;
  alt: string;
  scale: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`pointer-events-none relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 transform-gpu"
        style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          priority={priority}
          sizes={sizes}
          className="object-contain"
        />
      </div>
    </div>
  );
}
