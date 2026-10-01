import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Header, Footer, PhotoCard } from "./archive";
import { PortfolioMedia } from "./media";
import { Lens } from "./lens";
import { getPhotograph, contactEmail } from "./projects";
import { openingTiles, mosaicCollections, type MosaicCollection } from "./mosaics";
import "./home.css";

function ProjectMosaic({ collection }: { collection: MosaicCollection }) {
  const tiles = (ids: number[], prefix: string) =>
    ids.map((id, index) => <PhotoCard key={`${prefix}-${index}`} photo={getPhotograph(id)!} />);
  return (
    <section
      className={`project-collection collection-${collection.key}`}
      aria-label={collection.title}
    >
      <div className="project-mosaic">
        <div className="mosaic-side mosaic-left">{tiles(collection.left, "left")}</div>
        <div className="mosaic-center">
          <div className="mosaic-pair">{tiles(collection.top, "top")}</div>
          <div className="mosaic-feature">
            <PhotoCard photo={getPhotograph(collection.hero)!} />
          </div>
          <div className="mosaic-heading">
            <h2>{collection.title}</h2>
            <span>{collection.subtitle}</span>
          </div>
          <div className="mosaic-pair">{tiles(collection.bottom, "bottom")}</div>
        </div>
        <div className="mosaic-side mosaic-right">{tiles(collection.right, "right")}</div>
      </div>
    </section>
  );
}
function About() {
  return (
    <section id="about" className="about-scene" aria-labelledby="about-title">
      <div className="about-background" aria-hidden="true">
        <img src="/media/photo-07.webp" alt="" loading="lazy" width="2000" height="2000" />
      </div>
      <div className="about-inner">
        <div className="about-name">
          <p className="small-label">BEHIND THE ARCHIVE</p>
          <h2 id="about-title">
            Nagyházu
            <br />
            Dávid
          </h2>
        </div>
        <figure className="about-feature">
          <a href="/work/3" aria-label="View The shape of sound">
            <PortfolioMedia media={getPhotograph(3)!} />
          </a>
          <figcaption>A frame from the archive / The shape of sound.</figcaption>
        </figure>
        <a className="about-email" href={`mailto:${contactEmail}`}>
          GET IN TOUCH <ArrowUpRight size={15} />
        </a>
        <div className="about-bio">
          <p>
            I create visual experiences, not just photographs. Based in Budapest, I work across
            advertising, product photography, short films and commercial video.
          </p>
        </div>
        <div className="about-approach">
          <p>
            Selected collaborations include Patron Barber, 1902 KRDY, Starbucks and Dorko Tenisz.
            From a single image to a moving sequence, my focus is light, atmosphere and a clear
            visual idea.
          </p>
        </div>
        <p className="about-role">
          Photographer
          <br />& filmmaker.
        </p>
      </div>
    </section>
  );
}
export function Archive() {
  const root = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!root.current || !hero.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: hero.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 0.92}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>(".collage-tile").forEach((tile) => {
          // All motion is clamped to the opening's internal frame. Shrinking frees
          // space to spread, and opacity resolves the exit without off-page imagery.
          const distance = (axis: "x" | "y") => {
            const field = tile.parentElement!;
            const start = axis === "x" ? tile.offsetLeft : tile.offsetTop;
            const size = axis === "x" ? tile.offsetWidth : tile.offsetHeight;
            const limit = axis === "x" ? field.clientWidth : field.clientHeight;
            const desired = (start + size / 2 - limit / 2) * 0.3;
            return Math.max(-start, Math.min(limit - start - size, desired));
          };
          timeline.to(
            tile,
            {
              x: () => distance("x"),
              y: () => distance("y"),
              scale: 0.73,
              ease: "power1.inOut",
              duration: 0.8,
            },
            0,
          );
          timeline.to(tile, { opacity: 0, duration: 0.45, ease: "power1.in" }, 0.42);
        });
        timeline.to(
          ".hero-title-block",
          { scale: 1.06, y: -25, opacity: 0, ease: "power1.in", duration: 0.4 },
          0.05,
        );
        gsap.utils
          .toArray<HTMLElement>(".project-mosaic")
          .forEach((el) =>
            gsap.fromTo(
              el,
              { y: 24 },
              {
                y: 0,
                ease: "none",
                scrollTrigger: { trigger: el, start: "top bottom", end: "top 70%", scrub: 1 },
              },
            ),
          );
      });
    }, root);
    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);
  return (
    <div className="archive home-v4" ref={root} id="top">
      <a className="skip-link" href="#work">
        Skip to photographs
      </a>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <section className="collage-section" ref={hero} aria-labelledby="archive-title">
          <div className="collage-sticky">
            <div className="collage-field">
              {openingTiles.map((tile) => (
                <a
                  key={tile.key}
                  className="collage-tile"
                  href={`/work/${tile.id}`}
                  aria-label={`View ${getPhotograph(tile.id)!.title}`}
                  tabIndex={-1}
                  style={
                    {
                      "--column": tile.column,
                      "--columns": tile.columns,
                      "--row": tile.row,
                      "--rows": tile.rows,
                      "--mobile-column": tile.mobileColumn,
                      "--mobile-row": tile.mobileRow,
                      "--mobile-rows": tile.mobileRows,
                    } as CSSProperties
                  }
                >
                  <PortfolioMedia media={getPhotograph(tile.id)!} preview />
                </a>
              ))}
            </div>
            <div className="hero-shade" aria-hidden="true" />
            <div className="hero-title-block">
              <h1 id="archive-title">
                Nagyházu
                <br />
                Archive
              </h1>
              <p>PHOTOGRAPHY & FILM</p>
            </div>
          </div>
        </section>
        <div id="work" className="work-collections">
          <ProjectMosaic collection={mosaicCollections[0]} />
          <ProjectMosaic collection={mosaicCollections[1]} />
          <section className="manifesto" aria-labelledby="manifesto-title">
            <div className="manifesto-copy">
              <p className="small-label">A DIFFERENT WAY OF SEEING</p>
              <h2 id="manifesto-title">
                I create visual experiences.<span>Not just photographs.</span>
              </h2>
              <p className="manifesto-note">
                Light, movement and atmosphere.
                <br />
                Images you don’t just see. You feel.
              </p>
            </div>
            <PhotoCard photo={getPhotograph(7)!} />
          </section>
          <ProjectMosaic collection={mosaicCollections[2]} />
        </div>
        <About />
      </main>
      <Footer />
      <Lens />
    </div>
  );
}
