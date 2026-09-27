import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowLeft, ArrowRight, ExternalLink, FileText, Linkedin, Mail, MapPin } from 'lucide-react';
import ProjectCard from './ProjectCard';
import FourDotMark from './FourDotMark';
import { ABOUT, EXPERIENCE, FILTERS, SITE, SKILL_GROUPS } from '@/data/portfolio';

export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className={`section-heading${title ? '' : ' section-heading-compact'}`}>
      <p className="eyebrow">{eyebrow}</p>
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
    </div>
  );
}

function AboutParagraph({ text }) {
  const parts = text.split('**');
  return <p>{parts.map((part, index) => (index % 2 ? <strong key={`${index}-${part}`}>{part}</strong> : part))}</p>;
}

export function Hero() {
  return (
    <header id="top" className="hero">
      <div className="site-shell hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">André Gottgtroy</p>
          <h1>Game Designer</h1>
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
          description="A few projects that best show the range of my work."
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
    <section className="section more-projects" aria-label="More projects">
      <div className="site-shell">
        <div className="more-projects-heading">
          <SectionHeading eyebrow="More projects" />
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
  return (
    <section id="experience" className="section experience-section">
      <div className="site-shell">
        <SectionHeading
          eyebrow="Experience"
          description="Professional experience and overlapping responsibilities over time. Mytona was one continuous Game Design role; on Hublix, leadership and deputy-production responsibilities overlapped with hands-on design."
        />

        <div className="desktop-career-flow" aria-label="Career timeline from 2019 to 2026">
          {EXPERIENCE.employment.map((job) => (
            <article key={job.company} className={`desktop-career-item ${job.company === 'Mytona' ? 'desktop-career-item-primary' : ''}`}>
              <span className="desktop-timeline-dot" aria-hidden="true" />
              <p className="eyebrow">{job.period}</p>
              <h3>{job.role}</h3>
              <p className="career-company">{job.company}</p>
              <p className="desktop-career-summary">{job.summary}</p>
              {job.company === 'Mytona' && (
                <div className="desktop-project-list" aria-label="Projects within Mytona">
                  {EXPERIENCE.projects.map((item) => (
                    <div key={item.slug} className="desktop-project-item">
                      <TimelineButton item={item} onOpen={onOpenBySlug} />
                      {item.additional && (
                        <div className="overlap-labels" aria-label="Additional overlapping Hublix responsibilities">
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
          description="The design disciplines, tools and technical skills I use most often."
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
            <div className="about-text">
              {ABOUT.map((paragraph) => <AboutParagraph key={paragraph} text={paragraph} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickLinks() {
  return (
    <aside className="quick-links footer-quick-links" aria-labelledby="quick-links-title">
      <p className="eyebrow" id="quick-links-title">Quick links</p>
      <a href={SITE.resume} target="_blank" rel="noreferrer"><FileText aria-hidden="true" /> Resume <ExternalLink aria-hidden="true" /></a>
      <a href={SITE.linkedin} target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /> LinkedIn <ExternalLink aria-hidden="true" /></a>
      <a href={`mailto:${SITE.email}`}><Mail aria-hidden="true" /> <span>{SITE.email}</span> <ExternalLink aria-hidden="true" /></a>
    </aside>
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
          <p className="eyebrow">Contact</p>
          <h2>Let’s talk about games and design problems.</h2>
        </div>
        <QuickLinks />
      </div>
      <div className="site-shell footer-bottom">
        <span className="footer-signoff"><FourDotMark /> <span>{new Date().getFullYear()} André Gottgtroy</span></span>
        <span>Game Designer · Auckland, New Zealand</span>
      </div>
    </footer>
  );
}
