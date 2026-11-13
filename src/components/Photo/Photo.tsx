import type { Photo as PhotoData } from "@/content/media";

type Props = {
  photo: PhotoData;
  className?: string;
  /** Hero images load eagerly; everything else waits until near the viewport. */
  priority?: boolean;
  sizes?: string;
};

/**
 * Responsive photograph with explicit dimensions, so layout never shifts.
 * Browsers that read AVIF get it; the rest get the JPEG. The <picture>
 * wrapper generates no box, so the image sizes against its own parent.
 */
export function Photo({ photo, className, priority = false, sizes = "100vw" }: Props) {
  const { small, large, avif } = photo;
  return (
    <picture style={{ display: "contents" }}>
      <source
        type="image/avif"
        srcSet={`${avif.small} ${small.width}w, ${avif.large} ${large.width}w`}
        sizes={sizes}
      />
      <img
        className={className}
        src={large.src}
        srcSet={`${small.src} ${small.width}w, ${large.src} ${large.width}w`}
        sizes={sizes}
        width={large.width}
        height={large.height}
        alt={photo.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
