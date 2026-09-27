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
  const [featured, ...remaining] = posts;
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
          <div className="writing-hero-glow" aria-hidden="true" />
          <div className="site-shell writing-hero-inner">
            <p className="eyebrow">Design Writing</p>
            <h1>Ideas, exercises and notes from the design process.</h1>
            <p>A place to think through game design problems in public—from systems and mechanics to the practical decisions that shape how a game feels.</p>
          </div>
        </header>
        <section id="writing-list" className="writing-library" aria-labelledby="writing-library-title">
          <div className="site-shell">
            <div className="writing-library-heading">
              <div><p className="eyebrow">Latest writing</p><h2 id="writing-library-title">Read, explore, and follow the process.</h2></div>
              <p>{posts.length} {posts.length === 1 ? 'article' : 'articles'}</p>
            </div>
            {featured ? <div className="writing-grid"><WritingCard post={featured} featured />{remaining.map((post) => <WritingCard key={post.slug} post={post} />)}</div>
              : <p className="writing-empty">New design writing is on the way.</p>}
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
