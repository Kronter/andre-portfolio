import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import Navigation from '@/components/portfolio/Navigation';
import FourDotMark from '@/components/portfolio/FourDotMark';
import { getWritingPosts } from '@/lib/portfolio-content';
import { getWritingSeries, seriesTitle } from '@/lib/writing-series';
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
          {post.series && <p className="writing-series">{seriesTitle(post.series)} · Part {post.part}</p>}
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
  const groups = getWritingSeries(posts);
  const startHere = posts.find((post) => post.slug === '06-what-playtesting-made-me-remove');
  const latest = posts[0];
  const ungrouped = posts.filter((post) => !post.series);
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
            <p className="writing-hero-intro">A place to think through game design problems in public.<br />From systems and mechanics to the practical decisions that shape how a game feels.</p>
            {startHere && (
              <p className="writing-entry-link">
                <strong>Start here</strong>{' '}
                <Link href={`/design-writing/${startHere.slug}/`}>{startHere.title}</Link>
              </p>
            )}
          </div>
        </header>
        <section id="writing-list" className="writing-library" aria-labelledby="writing-library-title">
          <div className="site-shell">
            <div className="writing-library-heading">
              <div>
                <h2 id="writing-library-title">All articles</h2>
                {groups.length > 1 && (
                  <nav className="writing-series-links" aria-label="Jump to a series">
                    {groups.map((group) => <a key={group.key} href={`#series-${group.key}`}>{group.title}</a>)}
                  </nav>
                )}
              </div>
              {latest && latest.slug !== startHere?.slug && (
                <p className="writing-entry-link"><strong>Latest</strong>{' '}<Link href={`/design-writing/${latest.slug}/`}>{latest.title}</Link></p>
              )}
            </div>
            {groups.map((group) => (
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
            ))}
            {ungrouped.length > 0 && <div className="writing-grid">{ungrouped.map((post) => <WritingCard key={post.slug} post={post} />)}</div>}
            {posts.length === 0 && <p className="writing-empty">New design writing is on the way.</p>}
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
