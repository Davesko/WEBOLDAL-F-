import { useEffect, useState } from "react";

/** Viewport-sized optics, never a filter over the entire long document.
 * A small displacement lookup is generated once: neutral in the middle,
 * radial outward sampling at the edges. CSS blur is the portable fallback.
 * The layer is pointer-transparent and never changes semantic content. */
export function Lens() {
  const [map, setMap] = useState("");
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 96;
    const context = canvas.getContext("2d");
    if (!context) return;
    const pixels = context.createImageData(96, 96);
    for (let y = 0; y < 96; y++)
      for (let x = 0; x < 96; x++) {
        const nx = (x - 47.5) / 47.5,
          ny = (y - 47.5) / 47.5;
        const edge = Math.min(1, (nx * nx + ny * ny) / 1.5);
        const i = (y * 96 + x) * 4;
        pixels.data[i] = 128 + nx * edge * 100;
        pixels.data[i + 1] = 128 + ny * edge * 100;
        pixels.data[i + 2] = 128;
        pixels.data[i + 3] = 255;
      }
    context.putImageData(pixels, 0, 0);
    setMap(canvas.toDataURL());
  }, []);
  return (
    <div className="lens-system" aria-hidden="true">
      <svg className="lens-definitions" width="0" height="0" focusable="false">
        <defs>
          <filter
            id="archive-lens-warp"
            x="-5%"
            y="-5%"
            width="110%"
            height="110%"
            colorInterpolationFilters="sRGB"
          >
            {map && (
              <feImage
                href={map}
                x="0"
                y="0"
                width="100%"
                height="100%"
                preserveAspectRatio="none"
                result="radial-map"
              />
            )}
            <feDisplacementMap
              in="SourceGraphic"
              in2="radial-map"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      {map && <div className="lens-distortion" />}
      <div className="lens-edge-blur" />
      <div className="lens-corners" />
    </div>
  );
}
