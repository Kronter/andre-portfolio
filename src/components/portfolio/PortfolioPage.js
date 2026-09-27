import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import Navigation from './Navigation';
import ProjectFocus from './ProjectFocus';
import {
  About,
  Experience,
  Footer,
  Hero,
  MoreProjects,
  SelectedWork,
  Skills,
  WritingInvitation,
} from './Sections';

function projectSlugFromHash() {
  if (typeof window === 'undefined') return null;
  const match = window.location.hash.match(/^#project\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function restoreScrollPosition(position) {
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  window.scrollTo(0, position);
  window.requestAnimationFrame(() => { root.style.scrollBehavior = previousBehavior; });
}

export default function PortfolioPage({ projects, writingPosts }) {
  const [activeSlug, setActiveSlug] = useState(null);
  const triggerRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const openedFromPageRef = useRef(false);
  const selected = useMemo(() => projects.filter((project) => project.selectedWork), [projects]);
  const more = useMemo(() => projects.filter((project) => !project.selectedWork), [projects]);
  const activeProject = projects.find((project) => project.slug === activeSlug) || null;
  const isOpen = Boolean(activeProject);

  useEffect(() => {
    const syncWithUrl = () => {
      const slug = projectSlugFromHash();
      setActiveSlug(slug);
      if (!slug && triggerRef.current) {
        window.setTimeout(() => {
          restoreScrollPosition(scrollPositionRef.current);
          triggerRef.current?.focus({ preventScroll: true });
          restoreScrollPosition(scrollPositionRef.current);
        }, 80);
      }
    };
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    syncWithUrl();
    window.addEventListener('popstate', syncWithUrl);
    window.addEventListener('hashchange', syncWithUrl);
    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
      window.removeEventListener('popstate', syncWithUrl);
      window.removeEventListener('hashchange', syncWithUrl);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    scrollPositionRef.current = window.scrollY;
    const body = document.body;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = 'fixed';
    body.style.top = `-${scrollPositionRef.current}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    return () => {
      const returnPosition = scrollPositionRef.current;
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      body.style.overflow = previous.overflow;
      window.requestAnimationFrame(() => {
        restoreScrollPosition(returnPosition);
        window.requestAnimationFrame(() => {
          restoreScrollPosition(returnPosition);
          triggerRef.current?.focus({ preventScroll: true });
          restoreScrollPosition(returnPosition);
        });
      });
    };
  }, [isOpen]);

  const openProject = useCallback((project, trigger) => {
    triggerRef.current = trigger || null;
    openedFromPageRef.current = true;
    const url = `${window.location.pathname}${window.location.search}#project/${encodeURIComponent(project.slug)}`;
    window.history.pushState({ portfolioProject: true }, '', url);
    setActiveSlug(project.slug);
  }, []);

  const openBySlug = useCallback((slug, trigger) => {
    const project = projects.find((item) => item.slug === slug);
    if (project) openProject(project, trigger);
  }, [openProject, projects]);

  const navigateProject = useCallback((project) => {
    const url = `${window.location.pathname}${window.location.search}#project/${encodeURIComponent(project.slug)}`;
    window.history.replaceState({ portfolioProject: openedFromPageRef.current }, '', url);
    setActiveSlug(project.slug);
  }, []);

  const closeProject = useCallback(() => {
    if (openedFromPageRef.current && window.history.state?.portfolioProject) {
      window.history.back();
    } else {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
      setActiveSlug(null);
    }
  }, []);

  return (
    <>
      <Head>
        <title>André Gottgtroy — Game Designer</title>
        <meta
          name="description"
          content="Game Designer with 6 years of professional experience across gameplay, systems, live service, technical design, prototyping and R&D."
        />
        <meta property="og:title" content="André Gottgtroy — Game Designer" />
        <meta property="og:description" content="Professional Game Design portfolio: selected work, case studies, experience and design writing." />
        <meta property="og:url" content="https://andregottgtroy.is-a.dev/" />
      </Head>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <SelectedWork projects={selected} onOpen={openProject} />
        <MoreProjects projects={more} onOpen={openProject} />
        <Experience onOpenBySlug={openBySlug} />
        <Skills />
        <About />
        <WritingInvitation posts={writingPosts} />
      </main>
      <Footer />
      {activeProject && (
        <ProjectFocus
          project={activeProject}
          projects={projects}
          onClose={closeProject}
          onNavigate={navigateProject}
        />
      )}
    </>
  );
}
