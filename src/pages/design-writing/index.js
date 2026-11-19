import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import WritingChoices from '@/components/portfolio/WritingChoices';
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
            {groups.length > 0 && (
              <nav className="writing-series-chooser writing-series-compact" aria-labelledby="choose-series-title">
                <h2 id="choose-series-title">Choose a series</h2>
                <WritingChoices choices={groups.map((group) => ({
                  key: group.key,
                  label: `${group.posts.length} articles`,
                  title: group.title,
                  description: group.description,
                  href: `#series-${group.key}`,
                }))} />
              </nav>
            )}
          </div>
        </header>
        {posts.length > 0 && (
          <div className="writing-latest">
            <div className={`site-shell${startHere ? ' writing-picks' : ''}`}>
              {startHere && (
                <section className="writing-recommended" aria-labelledby="recommended-title">
                  <h2 id="recommended-title">If you only read one</h2>
                  <WritingChoices choices={[{
                    key: startHere.slug,
                    label: startHere.readingTime,
                    title: startHere.title,
                    description: "For a quick look at how I design, here’s what happened when we took two mechanics I liked out of Tracers. What surprised me was how little I missed them.",
                    href: `/design-writing/${startHere.slug}/`,
                  }]} />
                </section>
              )}
              <section aria-labelledby="latest-posts-title">
                <h2 id="latest-posts-title">Latest posts</h2>
                <WritingChoices choices={posts.slice(0, 2).map((post) => ({
                  key: post.slug,
                  label: post.readingTime,
                  title: post.title,
                  description: post.excerpt,
                  href: `/design-writing/${post.slug}/`,
                }))} />
              </section>
            </div>
          </div>
        )}
        <section id="writing-list" className="writing-library" aria-labelledby="writing-library-title">
          <div className="site-shell">
            <div className="writing-library-heading">
              <h2 id="writing-library-title">All articles</h2>
              <p>{posts.length} {posts.length === 1 ? 'article' : 'articles'}</p>
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
