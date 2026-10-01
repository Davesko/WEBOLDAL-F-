import { ArrowUpRight, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { photographs, contactEmail, getPhotograph, type Photograph } from "./projects";
import { PortfolioMedia } from "./media";
import { Lens } from "./lens";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-ext-400.css";
import "@fontsource/manrope/latin-ext-500.css";
import "@fontsource/manrope/latin-ext-600.css";
import "@fontsource/anton/latin-400.css";
import "@fontsource/anton/latin-ext-400.css";
import "./archive.css";

export function Header({ detail = false }: { detail?: boolean }) {
  return (
    <header className={`site-header ${detail ? "detail-header" : ""}`}>
      <a className="header-brand" href="/" aria-label="Nagyházu Archive home">
        N / A
      </a>
      <nav>
        {detail ? (
          <a href="/#work">
            <ArrowLeft size={14} />
            Back to archive
          </a>
        ) : (
          <a href="#work">Work</a>
        )}
        <a href={detail ? "/#about" : "#about"}>About</a>
        <a href={detail ? "/#contact" : "#contact"}>
          Contact <ArrowUpRight size={15} />
        </a>
      </nav>
    </header>
  );
}
export function Footer() {
  return (
    <footer id="contact" className="contact-footer">
      <div className="contact-row">
        <h2>Let’s create something.</h2>
        <a className="email-link" href={`mailto:${contactEmail}`}>
          {contactEmail}
          <ArrowUpRight size={25} weight="light" />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Nagyházu Dávid</span>
        <span>Budapest, Hungary.</span>
        <a href="#top">
          Back to top <ArrowUpRight size={13} />
        </a>
      </div>
    </footer>
  );
}
export function PhotoCard({ photo, caption = false }: { photo: Photograph; caption?: boolean }) {
  return (
    <a
      className={`gallery-photo photo-${photo.id}`}
      href={`/work/${photo.id}`}
      aria-label={`View ${photo.title}`}
    >
      <span
        className={`photo-crop ${photo.frameRatio ? "ratio-crop" : ""}`}
        style={{ aspectRatio: photo.frameRatio }}
      >
        <PortfolioMedia media={photo} />
        <span className="photo-open" aria-hidden="true">
          <ArrowUpRight size={23} weight="light" />
        </span>
      </span>
      {caption && (
        <span className="photo-caption">
          <span>{photo.title}</span>
          <span>{photo.category}</span>
        </span>
      )}
    </a>
  );
}
export function PhotoPage({ photoId }: { photoId: string }) {
  const photo = getPhotograph(photoId);
  if (!photo)
    return (
      <div className="archive">
        <Header detail />
        <main className="error-page">
          <h1>This frame is missing.</h1>
          <a href="/">Back to archive</a>
        </main>
      </div>
    );
  const index = photographs.findIndex((p) => p.id === photo.id);
  const previous = photographs[(index - 1 + photographs.length) % photographs.length];
  const next = photographs[(index + 1) % photographs.length];
  const related = photographs.filter((p) => p.shoot === photo.shoot && p.id !== photo.id);
  return (
    <div className="archive photo-page" id="top">
      <a className="skip-link" href="#photo-description">
        Skip to description
      </a>
      <div className="grain" aria-hidden="true" />
      <Header detail />
      <main>
        <section className="detail-stage" aria-label={photo.title}>
          <div className="detail-media">
            <PortfolioMedia key={photo.id} media={photo} full />
          </div>
          <a
            className="detail-prev"
            href={`/work/${previous.id}`}
            aria-label={`Previous photograph: ${previous.title}`}
          >
            <ArrowLeft size={24} weight="light" />
          </a>
          <a
            className="detail-next"
            href={`/work/${next.id}`}
            aria-label={`Next photograph: ${next.title}`}
          >
            <ArrowRight size={24} weight="light" />
          </a>
          <div className="detail-counter">
            {String(index + 1).padStart(2, "0")} / {photographs.length}
          </div>
        </section>
        <section className="photo-description" id="photo-description">
          <div>
            <p className="small-label">{photo.category}</p>
            <h1>{photo.title}</h1>
          </div>
          <div className="description-body">
            <p>{photo.description}</p>
            <span>Photography by Nagyházu Dávid</span>
          </div>
        </section>
        {related.length > 0 && (
          <section className="related-work">
            <div className="section-line">
              <h2>From the same shoot</h2>
              <span>{related.length + 1} photographs</span>
            </div>
            <div className="related-grid">
              {related.map((p) => (
                <PhotoCard key={p.id} photo={p} caption />
              ))}
            </div>
          </section>
        )}
        <nav className="project-navigation" aria-label="Archive navigation">
          <a href={`/work/${previous.id}`}>
            <ArrowLeft size={18} />
            <span>
              Previous photograph<small>{previous.title}</small>
            </span>
          </a>
          <a href="/#work" className="all-work">
            All work
          </a>
          <a href={`/work/${next.id}`}>
            <span>
              Next photograph<small>{next.title}</small>
            </span>
            <ArrowRight size={18} />
          </a>
        </nav>
      </main>
      <Footer />
      <Lens />
    </div>
  );
}
