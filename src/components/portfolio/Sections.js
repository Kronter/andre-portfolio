import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowLeft, ArrowRight, ExternalLink, FileText, Linkedin, Mail, MapPin } from 'lucide-react';
import ProjectCard from './ProjectCard';
import FourDotMark from './FourDotMark';
import { ABOUT, EXPERIENCE, FILTERS, SITE, SKILL_GROUPS } from '@/data/portfolio';

export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function Hero() {
  return (
    <header id="top" className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="site-shell hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">Game Designer</p>
          <h1>I design game <span>systems</span> people enjoy playing.</h1>
          <p className="hero-lead">
            6 years of professional experience across gameplay, systems, live service, monetization, social features, technical design, prototyping and R&amp;D.
          </p>
          <p className="hero-body">
            With a Software Engineering background and hands-on experience in Unreal Engine, Unity, proprietary engines, Blueprints and scripting, I like getting stuck into design problems, trying ideas quickly and improving them with the team until they make sense for the player.
          </p>
          <p className="hero-location"><MapPin aria-hidden="true" /> Auckland, New Zealand <span aria-hidden="true">·</span> Open to relocation &amp; remote work</p>
          <div className="hero-actions">
            <a className="primary-button" href="#work">View Selected Work <ArrowDown aria-hidden="true" /></a>
            <a className="secondary-button" href={SITE.resume} target="_blank" rel="noreferrer">
              Resume <ExternalLink aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-visual" aria-label="Outfire, one of André's selected projects">
          <Image src="/outfire-image.webp" alt="Outfire characters in a colourful multiplayer battle scene" fill priority sizes="(max-width: 767px) 100vw, 48vw" />
          <div className="hero-visual-caption">
            <span>Selected work</span>
            <strong>Systems · Players · Moments · Better games</strong>
          </div>
        </div>
      </div>
    </header>
  );
}

export function SelectedWork({ projects, onOpen }) {
  return (
    <section id="work" className="section selected-work">
      <div className="site-shell">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects that show different sides of my design work."
          description="Professional and released work across R&D, multiplayer, live service, systems, combat and technical implementation."
        />
        <div className="selected-grid">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} onOpen={onOpen} />)}
        </div>
      </div>
    </section>
  );
}

export function MoreProjects({ projects, onOpen }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expanded, setExpanded] = useState(false);
  const stripRef = useRef(null);
  const filtered = useMemo(
    () => projects.filter((project) => activeFilter === 'All' || project.browseGroup === activeFilter),
    [activeFilter, projects],
  );

  const scroll = (direction) => {
    stripRef.current?.scrollBy({ left: direction * Math.min(720, stripRef.current.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section className="section more-projects" aria-labelledby="more-projects-title">
      <div className="site-shell">
        <div className="more-projects-heading">
          <SectionHeading eyebrow="More projects" title="Smaller projects, tools and experiments." />
          {!expanded && (
            <div className="strip-controls" aria-label="Scroll projects">
              <button type="button" onClick={() => scroll(-1)} aria-label="Scroll projects left"><ArrowLeft aria-hidden="true" /></button>
              <button type="button" onClick={() => scroll(1)} aria-label="Scroll projects right"><ArrowRight aria-hidden="true" /></button>
            </div>
          )}
        </div>
        <div className="filter-row" role="group" aria-label="Filter more projects">
          {FILTERS.map((filter) => (
            <button
              type="button"
              key={filter}
              className={filter === activeFilter ? 'active' : ''}
              aria-pressed={filter === activeFilter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div ref={stripRef} className={expanded ? 'more-grid' : 'project-strip'}>
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} onOpen={onOpen} compact={!expanded} />
          ))}
        </div>

        <button type="button" className="expand-projects" onClick={() => setExpanded((value) => !value)}>
          {expanded ? 'Show fewer projects ↑' : 'View all projects ↓'}
        </button>
      </div>
    </section>
  );
}

function TimelineButton({ item, onOpen }) {
  return (
    <button type="button" className="timeline-project-button" onClick={(event) => onOpen(item.slug, event.currentTarget)}>
      <span><strong>{item.title}</strong> · {item.period}</span>
      <small>{item.role}</small>
      <ArrowRight aria-hidden="true" />
    </button>
  );
}

export function Experience({ onOpenBySlug }) {
  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
  const columnFor = (year) => year - 2017;

  return (
    <section id="experience" className="section experience-section">
      <div className="site-shell">
        <SectionHeading
          eyebrow="Experience"
          title="Game Design is the through-line."
          description="Professional experience and overlapping responsibilities over time. Mytona was one continuous Game Design role; on Hublix, leadership and deputy-production responsibilities overlapped with hands-on design."
        />

        <div className="desktop-timeline" aria-label="Career timeline from 2019 to 2026">
          <div className="timeline-years">
            <span aria-hidden="true" />
            {years.map((year) => <span key={year}>{year}</span>)}
          </div>
          {EXPERIENCE.employment.map((job) => (
            <div className="timeline-row" key={job.company}>
              <div className="timeline-label"><strong>{job.company}</strong><span>{job.role}</span></div>
              <div
                className={`employment-bar ${job.company === 'Mytona' ? 'mytona-bar' : ''}`}
                style={{ gridColumn: `${columnFor(job.start)} / ${columnFor(job.end) + 1}` }}
              >
                <strong>{job.period}</strong>
              </div>
            </div>
          ))}
          <div className="timeline-projects-label">Projects within Mytona</div>
          {EXPERIENCE.projects.map((item) => (
            <div className="timeline-row project-timeline-row" key={item.slug}>
              <div className="timeline-label"><span>{item.title}</span></div>
              <div style={{ gridColumn: `${columnFor(item.start)} / ${columnFor(item.end) + 1}` }}>
                <TimelineButton item={item} onOpen={onOpenBySlug} />
                {item.additional && (
                  <div className="overlap-labels" aria-label="Additional overlapping Hublix responsibilities">
                    {item.additional.map((label) => <span key={label}>{label}</span>)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mobile-timeline">
          {EXPERIENCE.employment.map((job) => (
            <article key={job.company} className="mobile-career-item">
              <span className="timeline-dot" aria-hidden="true" />
              <p className="eyebrow">{job.period}</p>
              <h3>{job.role}</h3>
              <p className="career-company">{job.company}</p>
              <p>{job.summary}</p>
              {job.company === 'Mytona' && (
                <div className="mobile-project-list">
                  {EXPERIENCE.projects.map((item) => (
                    <div key={item.slug} className="mobile-project-item">
                      <TimelineButton item={item} onOpen={onOpenBySlug} />
                      {item.additional && (
                        <div className="overlap-labels">
                          <span>Game Design continued throughout</span>
                          {item.additional.map((label) => <span key={label}>{label}</span>)}
                        </div>
                      )}
                      <p>{item.summary}</p>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="site-shell">
        <SectionHeading
          eyebrow="Skills"
          title="Core areas I work across."
          description="A broad design practice grounded in implementation, communication and the player problem."
        />
        <div className="skills-grid">
          {SKILL_GROUPS.map((group, index) => (
            <article key={group.title} className="skill-group">
              <span className="skill-number" aria-hidden="true">0{index + 1}</span>
              <h3>{group.title}</h3>
              <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section about-section">
      <div className="site-shell about-grid">
        <div>
          <SectionHeading eyebrow="About" title="Games, stories and how things work." />
          <div className="about-copy-layout">
            <div className="profile-image-wrap">
              <Image src="/profile-photo.webp" alt="André Gottgtroy" fill sizes="(max-width: 767px) 42vw, 180px" />
            </div>
            <p>{ABOUT}</p>
          </div>
        </div>
        <aside className="quick-links" aria-labelledby="quick-links-title">
          <p className="eyebrow" id="quick-links-title">Quick links</p>
          <a href={SITE.resume} target="_blank" rel="noreferrer"><FileText aria-hidden="true" /> Resume <ExternalLink aria-hidden="true" /></a>
          <a href={SITE.linkedin} target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /> LinkedIn <ExternalLink aria-hidden="true" /></a>
          <a href={`mailto:${SITE.email}`}><Mail aria-hidden="true" /> <span>{SITE.email}</span> <ExternalLink aria-hidden="true" /></a>
          <Link href="/design-writing">Design Writing <ArrowRight aria-hidden="true" /></Link>
        </aside>
      </div>
    </section>
  );
}

export function WritingInvitation({ posts }) {
  if (!posts.length) return null;

  return (
    <section id="design-writing" className="writing-invitation">
      <div className="site-shell">
        <p>Interested in how I approach design?</p>
        <Link href="/design-writing">Explore my design writing <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="site-shell footer-grid">
        <div>
          <FourDotMark />
          <p className="eyebrow">Contact</p>
          <h2>Let’s talk about games and design problems.</h2>
          <a className="footer-email" href={`mailto:${SITE.email}`}>{SITE.email} <ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="footer-links">
          <a href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn <ExternalLink aria-hidden="true" /></a>
          <a href={SITE.resume} target="_blank" rel="noreferrer">Resume <ExternalLink aria-hidden="true" /></a>
          <Link href="/design-writing">Design Writing <ArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="site-shell footer-bottom">
        <span>© {new Date().getFullYear()} André Gottgtroy</span>
        <span>Game Designer · Auckland, New Zealand</span>
      </div>
    </footer>
  );
}
