import { useEffect, useRef, useState } from "react";
import type { Photograph } from "./projects";
export function PortfolioMedia({
  media,
  preview = false,
  full = false,
}: {
  media: Photograph;
  preview?: boolean;
  full?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = video.current;
    if (!el || full) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (visible && !preference.matches && !document.hidden) void el.play().catch(() => {});
      else el.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      el.pause();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [media.src, full]);
  if (failed) return <span className="image-error">This image could not be loaded.</span>;
  if (media.kind === "video")
    return (
      <video
        ref={video}
        src={media.src}
        poster={media.thumb}
        width={media.width}
        height={media.height}
        muted={!full}
        controls={full}
        loop={!full}
        playsInline
        preload={full ? "metadata" : "none"}
        aria-label={preview ? undefined : media.alt}
        onError={() => setFailed(true)}
      />
    );
  return (
    <img
      src={preview ? media.thumb : media.src}
      srcSet={preview || full ? undefined : `${media.thumb} 760w, ${media.src} 2000w`}
      sizes={preview || full ? undefined : "(max-width: 767px) 94vw, 45vw"}
      width={media.width}
      height={media.height}
      alt={preview ? "" : media.alt}
      loading={preview || full ? "eager" : "lazy"}
      decoding={full ? "sync" : "async"}
      fetchPriority={full || (preview && media.id === 4) ? "high" : "auto"}
      style={{ objectPosition: media.position }}
      onError={() => setFailed(true)}
    />
  );
}
