import Image from "next/image";

type ProductImageProps = {
  src: string;
  alt: string;
  isBlurred?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function ProductImage({ src, alt, isBlurred = false, size = "md" }: ProductImageProps) {
  const sizeClasses = {
    sm: "h-16 w-16 sm:h-20 sm:w-20",
    md: "h-20 w-20 sm:h-24 sm:w-24",
    lg: "h-24 w-24 sm:h-28 sm:w-28",
  };

  return (
    <div className={`relative ${sizeClasses[size]} rounded-lg border p-1 ${isBlurred ? "relative" : ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`rounded-lg object-cover p-1 ${isBlurred ? "blur-sm" : ""}`}
        sizes="(max-width: 640px) 64px, (max-width: 768px) 96px, 112px"
      />
      {isBlurred && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="2" />
            <circle cx="6" cy="12" r="2" />
            <circle cx="18" cy="12" r="2" />
          </svg>
        </span>
      )}
    </div>
  );
}
