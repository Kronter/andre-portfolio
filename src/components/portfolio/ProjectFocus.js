import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Maximize2, Minimize2, X } from 'lucide-react';
import MediaCarousel from './MediaCarousel';

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'iframe',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function Metadata({ project }) {
  const rows = [
    ['Company', project.company],
    ['Project type', project.projectType],
    ['Period', project.dates],
    ['Engine', project.engine],
    ['Platforms', project.platforms?.join(', ')],
    ['Genres', project.genres?.join(', ')],
  ].filter(([, value]) => value);

  return (
    <dl className="project-metadata">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function ProjectFocus({ project, projects, onClose, onNavigate }) {
  const [fullscreen, setFullscreen] = useState(false);
  const reducedMotion = useReducedMotion();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const projectIndex = projects.findIndex((item) => item.slug === project?.slug);

  useEffect(() => {
    setFullscreen(false);
  }, [project?.slug]);

  useEffect(() => {
    if (!project) return undefined;
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = [...dialogRef.current.querySelectorAll(focusableSelector)]
        .filter((element) => element.getClientRects().length > 0);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, project]);

  const move = (direction) => {
    const nextIndex = (projectIndex + direction + projects.length) % projects.length;
    onNavigate(projects[nextIndex]);
  };

  const related = project?.relatedProjects
    ?.map((slug) => projects.find((item) => item.slug === slug))
    .filter(Boolean);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className={`focus-backdrop ${fullscreen ? 'focus-backdrop-fullscreen' : ''}`}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.18 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-focus-title"
            className={`project-focus ${fullscreen ? 'project-focus-fullscreen' : ''}`}
            initial={reducedMotion ? false : { opacity: 0, y: 22, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: reducedMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="focus-header">
              <button type="button" className="mobile-back" onClick={onClose}>
                <ArrowLeft aria-hidden="true" /> Back to Work
              </button>
              <strong>{project.title}</strong>
              <div className="focus-nav-controls">
                <button type="button" onClick={() => move(-1)} aria-label="Previous project">
                  <ArrowLeft aria-hidden="true" /> <span>Previous</span>
                </button>
                <span aria-live="polite">{projectIndex + 1} / {projects.length}</span>
                <button type="button" onClick={() => move(1)} aria-label="Next project">
                  <span>Next</span> <ArrowRight aria-hidden="true" />
                </button>
              </div>
              <div className="focus-window-controls">
                <button
                  type="button"
                  onClick={() => setFullscreen((value) => !value)}
                  aria-label={fullscreen ? 'Exit full-screen reading mode' : 'Enter full-screen reading mode'}
                >
                  {fullscreen ? <Minimize2 aria-hidden="true" /> : <Maximize2 aria-hidden="true" />}
                </button>
                <button ref={closeRef} type="button" onClick={onClose} aria-label="Close project">
                  <X aria-hidden="true" />
                </button>
              </div>
            </header>

            <div className="focus-scroll-region">
              <div className="focus-content">
                <MediaCarousel project={project} />

                <div className="focus-summary-grid">
                  <section className="project-intro" aria-labelledby="project-focus-title">
                    <p className="eyebrow">{project.projectType}</p>
                    <h2 id="project-focus-title">{project.title}</h2>
                    <p className="project-summary">{project.summary}</p>
                    <div className="tag-list">
                      {project.tags?.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <Metadata project={project} />
                  </section>

                  {project.responsibilityAreas?.length > 0 && (
                    <section className="contribution-panel" aria-labelledby="contribution-title">
                      <p className="eyebrow">My contribution</p>
                      <h3 id="contribution-title">Areas of responsibility</h3>
                      <ul>
                        {project.responsibilityAreas.map((area) => <li key={area}>{area}</li>)}
                      </ul>
                    </section>
                  )}
                </div>

                <article className="project-prose" dangerouslySetInnerHTML={{ __html: project.contentHtml }} />

                {project.ndaLimited && (
                  <p className="nda-note">
                    Some commercial project details are limited by NDA. Where necessary, this case study focuses on publicly shareable responsibilities, design problems and process rather than confidential implementation details.
                  </p>
                )}

                {related?.length > 0 && (
                  <section className="related-projects" aria-labelledby="related-projects-title">
                    <p className="eyebrow">Related work</p>
                    <h3 id="related-projects-title">Technical systems behind the project</h3>
                    <div>
                      {related.map((item) => (
                        <button type="button" key={item.slug} onClick={() => onNavigate(item)}>
                          <span>{item.title}</span><ArrowRight aria-hidden="true" />
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {project.externalLinks?.length > 0 && (
                  <section className="external-links" aria-label={`${project.title} external links`}>
                    {project.externalLinks.map((link) => (
                      <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                        {link.label} <ExternalLink aria-hidden="true" />
                      </a>
                    ))}
                  </section>
                )}

                <nav className="project-bottom-nav" aria-label="Browse projects">
                  <button type="button" onClick={() => move(-1)}>
                    <ArrowLeft aria-hidden="true" /> Previous project
                  </button>
                  <button type="button" onClick={() => move(1)}>
                    Next project <ArrowRight aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
