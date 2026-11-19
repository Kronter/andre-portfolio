import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import Navigation from '@/components/portfolio/Navigation';
import FourDotMark from '@/components/portfolio/FourDotMark';
import { getWritingPosts } from '@/lib/portfolio-content';
import { SITE } from '@/data/portfolio';

const formatDate = (date) => new Date(date).toLocaleDateString('en-NZ', {
  day: 'numeric', month: 'long', year: 'numeric',
});

function WritingCard({ post, featured = false }) {
  return (
    <article className={`writing-card${featured ? ' writing-card-featured' : ''}`}>
      <Link href={`/design-writing/${post.slug}`} className="writing-card-link" aria-label={`Read ${post.title}`}>
        {post.coverImage && (
          <div className="writing-card-media">
            <Image src={post.coverImage} alt={post.coverAlt || ''} fill
              sizes={featured ? '(max-width: 767px) 100vw, 58vw' : '(max-width: 767px) 100vw, 38vw'}
              className="writing-card-image" priority={featured} />
          </div>
        )}
        <div className="writing-card-copy">
          <div className="writing-card-meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time><span aria-hidden="true">·</span>
            <span><Clock aria-hidden="true" /> {post.readingTime}</span>
          </div>
          {post.series && <p className="writing-series">{post.series} · Part {post.part}</p>}
          <h2>{post.title}</h2>
          {post.excerpt && <p className="writing-excerpt">{post.excerpt}</p>}
          <div className="writing-tags" aria-label="Topics">
            {post.tags?.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <span className="writing-read">Read article <ArrowRight aria-hidden="true" /></span>
        </div>
      </Link>
    </article>
  );
}

export default function DesignWritingPage({ posts }) {
  const groups = [
    {
      key: 'tcg',
      title: 'Making a TCG (Sort of)',
      description: 'A documented journey through prototypes, Tracers rules and playtest decisions.',
      posts: posts.filter((post) => post.series === 'TCG').sort((a, b) => a.part - b.part),
    },
    {
      key: 'philosophy',
      title: 'My Game Design Philosophy',
      description: 'Standalone essays on choices, play, learning, constraints and clarity.',
      posts: posts.filter((post) => post.series === 'Design Philosophy').sort((a, b) => a.part - b.part),
    },
    {
      key: 'other',
      title: 'Other Writing',
      description: 'Additional articles.',
      posts: posts.filter((post) => !['TCG', 'Design Philosophy'].includes(post.series)),
    },
  ].filter((group) => group.posts.length > 0);
  return (
    <>
      <Head>
        <title>Design Writing | André Gottgtroy</title>
        <meta name="description" content="André Gottgtroy's writing about game design, design exercises and the thinking behind his work." />
      </Head>
      <a className="skip-link" href="#writing-list">Skip to writing</a>
      <Navigation />
      <main className="writing-page">
        <header className="writing-hero">
          <div className="site-shell writing-hero-inner">
            <p className="eyebrow">Design Writing</p>
            <h1>Thoughts, experiments and lessons from making games.</h1>
            <p className="writing-hero-intro">A place to think through game design problems in public—from systems and mechanics to the practical decisions that shape how a game feels.</p>
            {groups.length > 0 && (
              <nav className="writing-series-chooser" aria-label="Choose a writing series">
                <h2>Choose a series</h2>
                <div className="writing-series-chooser-grid">
                  {groups.map((group) => (
                    <a key={group.key} href={`#series-${group.key}`} className="writing-series-choice">
                      <span className="writing-series-choice-content">
                        <span className="writing-series-choice-count">{group.posts.length} {group.posts.length === 1 ? 'article' : 'articles'}</span>
                        <span className="writing-series-choice-title">{group.title}</span>
                        <span className="writing-series-choice-description">{group.description}</span>
                      </span>
                      <ArrowRight aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </nav>
            )}
          </div>
        </header>
        <section id="writing-list" className="writing-library" aria-labelledby="writing-library-title">
          <div className="site-shell">
            <div className="writing-library-heading">
              <div><p className="eyebrow">All articles</p><h2 id="writing-library-title">Read through each series.</h2></div>
              <p>{posts.length} {posts.length === 1 ? 'article' : 'articles'}</p>
            </div>
            {groups.length > 0 ? groups.map((group) => (
              <section key={group.key} id={`series-${group.key}`} className="writing-series-section" aria-labelledby={`group-${group.key}`}>
                <div className="writing-library-heading">
                  <div>
                    <h3 id={`group-${group.key}`}>{group.title}</h3>
                    <p>{group.description}</p>
                  </div>
                  <p>{group.posts.length} articles</p>
                </div>
                <div className="writing-grid">
                  {group.posts.map((post, index) => (
                    <WritingCard key={post.slug} post={post} featured={index === 0} />
                  ))}
                </div>
              </section>
            )) : <p className="writing-empty">New design writing is on the way.</p>}
          </div>
        </section>
      </main>
      <footer className="writing-footer"><div className="site-shell writing-footer-inner">
        <div className="writing-footer-brand"><FourDotMark /><span>{SITE.name}</span></div>
        <Link href="/">Back to portfolio <ArrowRight aria-hidden="true" /></Link>
      </div></footer>
    </>
  );
}

export async function getStaticProps() {
  return { props: { posts: await getWritingPosts() } };
}
