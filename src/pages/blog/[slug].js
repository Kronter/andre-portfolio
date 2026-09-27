import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, ExternalLink, Mail } from 'lucide-react';
import Navigation from '@/components/portfolio/Navigation';
import FourDotMark from '@/components/portfolio/FourDotMark';
import { SITE } from '@/data/portfolio';

const calculateReadingTime = (content = []) => {
  const text = content.flatMap((block) => [block.text || '', ...(block.items || [])]).join(' ');
  const words = text.replace(/<[^>]*>?/g, '').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 225))} min read`;
};

const formatDate = (date) => new Date(date).toLocaleDateString('en-NZ', {
  day: 'numeric', month: 'long', year: 'numeric',
});

function ArticleBlock({ block, title }) {
  switch (block.type) {
    case 'paragraph':
      return <div className="article-paragraph" dangerouslySetInnerHTML={{ __html: block.processedText }} />;
    case 'heading-1':
    case 'heading-2':
      return <h2 className="article-h2">{block.text}</h2>;
    case 'heading-3':
    case 'heading':
      return <h3 className="article-h3">{block.text}</h3>;
    case 'subheading':
    case 'subheading-2':
      return <h3 className="article-subheading">{block.text}</h3>;
    case 'image':
      return <figure className="article-image"><Image src={block.src} alt={block.alt || `${title} design illustration`} width={1200} height={675} sizes="(max-width: 767px) 100vw, 760px" />{block.caption && <figcaption>{block.caption}</figcaption>}</figure>;
    case 'video':
      return <div className="article-video"><iframe src={`https://www.youtube.com/embed/${block.videoId}`} title={block.alt || `${title} video`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>;
    case 'gallery':
      return <div className="article-gallery">{block.screenshots?.map((src, imageIndex) => <Image key={src} src={src} alt={`${title} screenshot ${imageIndex + 1}`} width={900} height={506} sizes="(max-width: 767px) 100vw, 380px" />)}</div>;
    case 'video_gallery':
      return <div className="article-gallery">{block.videos?.map((video) => <div className="article-video" key={video.videoId}><iframe src={`https://www.youtube.com/embed/${video.videoId}`} title={video.alt || `${title} video`} allowFullScreen /></div>)}</div>;
    case 'list':
      return <ul className="article-list">{block.items?.map((item, itemIndex) => <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }} />)}</ul>;
    case 'blockquote':
      return <blockquote className="article-quote" dangerouslySetInnerHTML={{ __html: block.processedText }} />;
    case 'html':
      return <div className="article-paragraph" dangerouslySetInnerHTML={{ __html: block.value }} />;
    default:
      return null;
  }
}

function RelatedCard({ post, nextInSeries }) {
  return <Link href={`/design-writing/${post.slug}`} className="article-related-card">
    <span>{nextInSeries ? `Next in ${post.series}` : formatDate(post.date)}</span>
    <strong>{post.title}</strong>
    <span className="article-related-action">{nextInSeries ? 'Continue reading' : 'Read article'} <ArrowRight aria-hidden="true" /></span>
  </Link>;
}

export default function DesignWritingPostPage({ postData, nextPostInSeries, otherPosts }) {
  const readingTime = calculateReadingTime(postData.content);
  const relatedPosts = [nextPostInSeries, ...otherPosts].filter(Boolean);

  return <>
    <Head>
      <title>{`${postData.title} | André Gottgtroy`}</title>
      <meta name="description" content={postData.excerpt || `Design writing about ${postData.title} by André Gottgtroy.`} />
      <link rel="canonical" href={`/design-writing/${postData.slug}/`} />
    </Head>
    <a className="skip-link" href="#article-content">Skip to article</a>
    <Navigation />
    <main className="article-page">
      <header className="article-hero">
        <div className="site-shell article-hero-inner">
          <Link href="/design-writing" className="article-back"><ArrowLeft aria-hidden="true" /> All Design Writing</Link>
          <div className="article-tags">{postData.tags?.map((tag) => <span key={tag}>{tag}</span>)}</div>
          {postData.series && <p className="eyebrow">{postData.series} · Part {postData.part}</p>}
          <h1>{postData.title}</h1>
          {postData.excerpt && <p className="article-deck">{postData.excerpt}</p>}
          <div className="article-byline">
            <Image src="/profile-photo.webp" alt="" width={42} height={42} />
            <div><strong>{postData.author}</strong><span>{formatDate(postData.date)} <i aria-hidden="true">·</i> <Clock aria-hidden="true" /> {readingTime}</span></div>
          </div>
        </div>
      </header>
      {postData.coverImage && <div className="site-shell article-cover"><Image src={postData.coverImage} alt={postData.coverAlt || ''} width={1600} height={900} priority sizes="(max-width: 767px) 100vw, 1180px" /></div>}
      <div className="site-shell article-layout">
        <aside className="article-rail"><span className="eyebrow">Design Writing</span><p>Practical notes on game design, systems and the decisions behind how a game feels.</p><Link href="/design-writing">Browse all articles <ArrowRight aria-hidden="true" /></Link></aside>
        <article id="article-content" className="article-content">
          {postData.content?.map((block, index) => <ArticleBlock key={`${block.type}-${index}`} block={block} title={postData.title} />)}
        </article>
      </div>
      {relatedPosts.length > 0 && <section className="article-related"><div className="site-shell">
        <div className="article-section-heading"><p className="eyebrow">Keep reading</p><h2>More Design Writing</h2></div>
        <div className="article-related-grid">{relatedPosts.map((post) => <RelatedCard key={post.slug} post={post} nextInSeries={nextPostInSeries?.id === post.id} />)}</div>
      </div></section>}
      <section className="article-contact"><div className="site-shell article-contact-inner">
        <div><p className="eyebrow">Continue the conversation</p><h2>Have a design problem worth discussing?</h2></div>
        <a href={`mailto:${SITE.email}`}><Mail aria-hidden="true" /> Email André <ExternalLink aria-hidden="true" /></a>
      </div></section>
    </main>
    <footer className="writing-footer"><div className="site-shell writing-footer-inner"><div className="writing-footer-brand"><FourDotMark /><span>{SITE.name}</span></div><Link href="/">Back to portfolio <ArrowRight aria-hidden="true" /></Link></div></footer>
  </>;
}

export async function getStaticPaths() {
  const directory = path.join(process.cwd(), 'src', 'content', 'blog');
  const filenames = fs.existsSync(directory) ? fs.readdirSync(directory).filter((filename) => filename.endsWith('.md')) : [];
  return { paths: filenames.map((filename) => ({ params: { slug: filename.replace(/\.md$/, '') } })), fallback: false };
}

export async function getStaticProps({ params }) {
  const directory = path.join(process.cwd(), 'src', 'content', 'blog');
  const source = fs.readFileSync(path.join(directory, `${params.slug}.md`), 'utf8');
  const { data } = matter(source);
  if (Array.isArray(data.content)) {
    for (const block of data.content) {
      if ((block.type === 'paragraph' || block.type === 'blockquote') && block.text) {
        const preparedText = block.text
          .replace(/\[(?:BLOCK|NOTE|CNOTE)(?:=\d+)?\]([\s\S]*?)\[\/(?:BLOCK|NOTE|CNOTE)\]/g, (_match, content) => content.split('\n').map((line) => `> ${line}`).join('\n'))
          .replace(/\[INDENT(?:=\d+)?\]([\s\S]*?)\[\/INDENT\]/g, '$1');
        const processed = await remark().use(html).process(preparedText);
        block.processedText = processed.toString()
          .replace(/\[VIOLET\]/g, '<span class="article-violet">').replace(/\[\/VIOLET\]/g, '</span>')
          .replace(/\[ZINC\]/g, '<span class="article-muted">').replace(/\[\/ZINC\]/g, '</span>')
          .replace(/\[WHITE\]/g, '<span class="article-white">').replace(/\[\/WHITE\]/g, '</span>')
          .replace(/\[SIDENOTE\]/g, '<span class="article-sidenote">—').replace(/\[\/SIDENOTE\]/g, '—</span>');
      }
    }
  }
  const allPosts = fs.readdirSync(directory).filter((filename) => filename.endsWith('.md')).map((filename) => {
    const file = fs.readFileSync(path.join(directory, filename), 'utf8');
    const { data: metadata } = matter(file);
    return { slug: filename.replace(/\.md$/, ''), ...metadata };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
  const nextInSeries = data.series ? allPosts.find((post) => post.series === data.series && post.part === data.part + 1) : null;
  const otherPosts = allPosts.filter((post) => post.id !== data.id && post.id !== nextInSeries?.id).slice(0, 2);
  return { props: { postData: { slug: params.slug, ...data }, nextPostInSeries: nextInSeries || null, otherPosts } };
}
