import type { Photo as PhotoData } from "@/content/media";

type Props = {
  photo: PhotoData;
  className?: string;
  /** Hero images load eagerly; everything else waits until near the viewport. */
  priority?: boolean;
  sizes?: string;
};

/** Responsive photograph with explicit dimensions, so layout never shifts. */
export function Photo({ photo, className, priority = false, sizes = "100vw" }: Props) {
  const { small, large } = photo;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export: we ship our own srcset
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
  );
}
