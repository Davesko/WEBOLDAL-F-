# Nagyházu Archive

English-language photography portfolio, revision 4. The reference-led homepage uses 18 contained opening tiles, three dense 11-frame project mosaics and a photographic About scene. The 10 original photos are intentionally repeated with the owner's approval, ready to be replaced as the archive grows.

## Run and publish

Node.js 22.12+ and npm, or Bun:

```sh
npm install
npm run dev
npm run build
npm run preview
```

`dist/` is ready for static hosting. Netlify/Vercel: build `npm run build`, output `dist`. The build exports `work/1/index.html` through `work/10/index.html` for direct photograph URLs. Root-domain deployment is assumed. Subdirectory hosting requires adapting absolute `/media/`, `/assets/`, `/work/` and manifest paths. Use HTTP rather than file://.

## Main files

- `src/archive/home.tsx`: homepage, bounded opening animation, three project mosaics and About.
- `src/archive/home.css`: dense reference-led layout and responsive rules.
- `src/archive/mosaics.ts`: opening grid positions and repeated photo assignments.
- `src/archive/archive.tsx`: shared navigation/footer, photograph cards, dedicated photograph pages.
- `src/archive/projects.ts`: the 10 original photos, English descriptions and verified shoot relationships.
- `src/archive/media.tsx`: responsive images and optional video playback.
- `src/archive/lens.tsx`: viewport optical effect.
- `src/archive/archive.css`: shared design, detail pages and lens styling.
- `public/media/`: optimized own photographs and small hero thumbnails.

## Opening and project mosaics

The opening is a finite CSS grid below navigation: six irregular-width groups on desktop and three groups on phones. All 18 frames stay within its boundaries. The former oversized cover wall is no longer used. Scroll motion shrinks and spreads the tiles using clamped offsets, then fades them, rather than sending them outside the viewport.

Three project mosaics follow, each with 11 placements: three left images, two above the center, one main center image, two below, and three right images. Thin dark gutters retain the reference contact-sheet look. Every repeated tile links to the original photograph page; repeats do not create fake new photographs or shoot identities. The winter mosaic is a single confirmed series; the other mosaics are explicitly curated selections.

The `mosaics.ts` arrays control which photos appear. Replace repeated IDs when new photos arrive. Opening row/column spans must still fit the declared 24×12 desktop and 3×18 mobile grids. Larger images may be cropped within their frame using object-fit cover, but the frames themselves do not overhang the page.

## About

The About scene uses the owner's supplied photo-07 as a dim, blurred background. The upper-right monochrome image is photo-03, explicitly captioned as a frame from the archive, not represented as a portrait of the owner. Replace it with a supplied self-portrait if desired later. The name, two short biography columns and large role lettering follow the reference composition. No social handles were invented; the working link is email.

## Photograph pages and media

Each photo has `/work/ID`: large uncropped picture, English title/description, navigation and same-shoot thumbnails where verified. Snow photos 2/5/6 share a shoot; poker-table photos 8/10 share a shoot. Other photos remain separate because no shared shoot provenance was supplied.

Add media under `public/media`, then update `projects.ts`. A video entry uses `kind: 'video'`, `src`, a `thumb` poster, original width/height, alt text and editorial fields. Preview videos play muted only while visible and pause when hidden. The current supplied materials are photos, not videos. There is no public admin upload interface; content is edited through these source files.

For new IDs, extend `scripts/make-pages.mjs` as well. The original exported `collage` data in `projects.ts` is retained only as unused legacy configuration; active opening data is `openingTiles` in `mosaics.ts`.

## Optical treatment and accessibility

A fixed pointer-transparent layer provides subtle radial displacement, masked edge blur and vignette. Center content stays sharp. SVG backdrop distortion has a CSS blur/vignette fallback. Reduced transparency disables optics; reduced motion provides a static opening and normal scroll. Navigation remains above the optical layer.

English labels, alt text, semantic links, skip links, visible focus, native page navigation. Fonts are locally served Manrope and Anton. No analytics, microphone, third-party embeds or database. Contact is a direct mailto link to nagyhaza.david@gmail.com.

## Verification

Chromium checks passed at 1440×1000, 390×844, 768×1024 and 844×390. Tests confirmed 18 opening frames remain in viewport during visible motion, three 11-frame mosaics, no horizontal overflow, About background, photograph navigation and reduced-motion fallback. This is not a full physical-device/Safari compatibility audit.
