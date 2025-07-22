import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronLeft, ChevronRight, Linkedin, Twitter, Github, Mail, FileText, ArrowRight } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';

// --- Helper function to get the correct asset path for GitHub Pages ---
const asset = (p) => {
    if (!p || p.startsWith('http')) return p;
    const repo = 'andre-portfolio'; 
    return `/${repo}${p}`;
};

// --- Animation Variants for Framer Motion ---
const sliderVariants = {
  enter: (direction) => ({ x: direction > 0 ? 500 : -500, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 500 : -500, opacity: 0 })
};

// --- Reusable Screenshot Gallery Component ---
const ScreenshotGallery = ({ screenshots }) => {
    const [[page, direction], setPage] = useState([0, 0]);
    const timeoutRef = useRef(null);
    const paginate = useCallback((newDirection) => {
        setPage(p => [p[0] + newDirection, newDirection]);
    }, []);
    
    useEffect(() => {
        const resetTimeout = () => timeoutRef.current && clearTimeout(timeoutRef.current);
        resetTimeout();
        if (screenshots && screenshots.length > 1) {
            timeoutRef.current = setTimeout(() => paginate(1), 7000);
        }
        return () => resetTimeout();
    }, [page, screenshots, paginate]);

    if (!screenshots || screenshots.length === 0) return null;
    const imageIndex = (page % screenshots.length + screenshots.length) % screenshots.length;

    return (
        <div className="aspect-w-16 aspect-h-9 my-8 rounded-lg overflow-hidden relative bg-zinc-900">
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={page}
                    src={asset(screenshots[imageIndex])}
                    alt={`Screenshot ${imageIndex + 1}`}
                    custom={direction}
                    variants={sliderVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                    className="absolute w-full h-full object-cover"
                />
            </AnimatePresence>
            <button className="absolute top-1/2 -translate-y-1/2 left-2 z-10 p-2 bg-black/40 hover:bg-black/60 rounded-full transition-colors text-white" onClick={() => paginate(-1)}><ChevronLeft size={20} /></button>
            <button className="absolute top-1/2 -translate-y-1/2 right-2 z-10 p-2 bg-black/40 hover:bg-black/60 rounded-full transition-colors text-white" onClick={() => paginate(1)}><ChevronRight size={20} /></button>
        </div>
    );
};

// --- Reading Time Calculator ---
const calculateReadingTime = (contentArray) => {
    if (!contentArray || !Array.isArray(contentArray)) return '1 min read';
    const wordsPerMinute = 225;
    let textContent = '';

    contentArray.forEach(block => {
        if (block.type === 'paragraph' || block.type === 'heading' || block.type === 'blockquote') {
            textContent += block.text + ' ';
        } else if (block.type === 'html') {
            textContent += block.value + ' ';
        } else if (block.type === 'list' && Array.isArray(block.items)) {
            textContent += block.items.join(' ') + ' ';
        }
    });

    const plainText = textContent.replace(/<[^>]*>?/gm, '');
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    return `${readingTime || 1} min read`;
};

// --- Main Blog Post Component ---
export default function BlogPostPage({ postData, nextPostInSeries, otherPosts }) {
    const [copySuccess, setCopySuccess] = useState('');

    const handleCopyEmail = () => {
        const email = 'andregot@gmail.com';
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopySuccess('Email copied!');
        setTimeout(() => setCopySuccess(''), 2000);
    };
    
    const renderContent = (block, index) => {
        switch (block.type) {
            case 'paragraph':
                return <p key={index} className="mb-6 text-lg whitespace-pre-line" dangerouslySetInnerHTML={{ __html: block.processedText }} />;
            case 'heading':
                return <h3 key={index} className="text-3xl font-bold text-white mt-12 mb-4">{block.text}</h3>;
            case 'image':
                return <div key={index} className="flex justify-center my-8"><img src={asset(block.src)} alt={block.alt} className="rounded-lg shadow-lg max-w-full h-auto" /></div>;
            case 'video':
                return (
                    <div key={index} className="flex justify-center my-8">
                        <div className="w-full max-w-3xl aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                            <iframe src={`https://www.youtube.com/embed/${block.videoId}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" title={block.alt}></iframe>
                        </div>
                    </div>
                );
            case 'gallery':
                return <div key={index} className="flex justify-center my-8"><div className="w-full max-w-3xl"><ScreenshotGallery screenshots={block.screenshots} /></div></div>;
            case 'list':
                return (
                    <ul key={index} className="list-disc list-inside space-y-4 mb-6 pl-4">
                        {block.items?.map((item, i) => (
                            <li key={i} className="text-lg" dangerouslySetInnerHTML={{ __html: item }} />
                        ))}
                    </ul>
                );
            case 'blockquote':
                return (
                    <blockquote key={index} className="my-8 border-l-4 border-violet-500 pl-4 italic" dangerouslySetInnerHTML={{ __html: block.processedText }} />
                );
            case 'html':
                return <div key={index} dangerouslySetInnerHTML={{ __html: block.value }} />;
            default:
                return null;
        }
    };

    const readingTime = calculateReadingTime(postData.content);

    return (
        <div className="bg-zinc-900 text-gray-300 font-sans leading-relaxed">
            <nav className="bg-zinc-900/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 shadow-lg shadow-violet-500/10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Link href={"/"} className="text-2xl font-bold text-white tracking-wider">
                            {postData.author || "Andre Gottgtroy"} <span className="text-violet-500">.</span>
                        </Link>
                        <Link href={"/"} className="text-gray-300 hover:text-white transition-colors">
                            &larr; Back to Portfolio
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-16">
                <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-invert prose-lg">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <div className="mb-4">
                            {postData.tags?.map(tag => (
                                <span key={tag} className="inline-block bg-violet-600/20 text-violet-400 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">{tag}</span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tighter">{postData.title}</h1>
                        <div className="flex items-center text-gray-400 space-x-4 mb-8">
                            <div className="flex items-center">
                                <img src="https://placehold.co/40x40/18181b/8b5cf6?text=A+D" alt="Andre Gottgtroy" className="w-8 h-8 rounded-full mr-2" />
                                <span>{postData.author}</span>
                            </div>
                            <span>&bull;</span>
                            <span>{new Date(postData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span>&bull;</span>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1.5" />
                                <span>{readingTime}</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="mt-8 prose prose-invert prose-lg max-w-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                        {postData.content?.map((block, index) => renderContent(block, index))}
                    </motion.div>
                </article>

                {(nextPostInSeries || (otherPosts && otherPosts.length > 0)) && (
                    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-zinc-700">
                        <h2 className="text-3xl font-bold text-white mb-8">Keep Reading</h2>
                        {nextPostInSeries && (
                            <Link href={`/blog/${nextPostInSeries.slug}`} className="group block bg-zinc-800 p-6 rounded-lg mb-8 border border-zinc-700 hover:border-violet-500 transition-colors">
                                <p className="text-sm text-violet-400 mb-1">Next in series: {nextPostInSeries.series}</p>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">{nextPostInSeries.title}</h3>
                                <div className="flex items-center text-violet-400 font-semibold">
                                    Continue Reading <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {otherPosts.map(post => (
                                <Link key={post.id} href={`/blog/${post.slug}`} className="group block bg-zinc-800 p-6 rounded-lg border border-zinc-700 hover:border-violet-500 transition-colors">
                                    <p className="text-sm text-gray-400 mb-2">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <h4 className="text-xl font-bold text-white flex-grow mb-4 group-hover:text-violet-400 transition-colors">{post.title}</h4>
                                    <div className="flex items-center text-violet-400 font-semibold mt-auto">
                                       Read Post <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-zinc-700 text-center relative">
                    <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                         I&apos;m always open to new opportunities and collaborations. 
                            Feel free to reach out!
                    </p>
                    <div className="flex justify-center space-x-6 mb-8">
                        <a href="https://www.linkedin.com/in/andré-gottgtroy-b56616172/" className="p-3 bg-zinc-800 rounded-full hover:bg-violet-600 transition-colors transform hover:-translate-y-1"><Linkedin className="w-6 h-6 text-white" /></a>
                        <button onClick={handleCopyEmail} className="p-3 bg-zinc-800 rounded-full hover:bg-violet-600 transition-colors transform hover:-translate-y-1"><Mail className="w-6 h-6 text-white" /></button>
                    </div>
                     <AnimatePresence>
                        {copySuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap"
                            >
                                {copySuccess}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                        <a href={asset("/Andre_Gottgtroy_Resume.pdf")} download className="inline-flex items-center px-8 py-3 border-2 border-violet-500 text-violet-400 font-bold rounded-lg hover:bg-violet-500 hover:text-white transition-all duration-300 text-lg">
                            <FileText className="w-5 h-5 mr-2" />
                            Download Resume
                        </a>
                    </div>
                </section>
            </main>

            <style jsx global>{`
                .aspect-w-16 { position: relative; padding-bottom: 56.25%; }
                .aspect-h-9 { }
                .aspect-w-16 > iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
            `}</style>
        </div>
    );
}

// --- Next.js Data Fetching Functions ---
export async function getStaticPaths() {
    const blogDirectory = path.join(process.cwd(), 'src', 'content', 'blog');
    const filenames = fs.readdirSync(blogDirectory).filter(filename => filename.endsWith('.md'));
    const paths = filenames.map(filename => ({
        params: { slug: filename.replace(/\.md$/, '') }
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const blogDirectory = path.join(process.cwd(), 'src', 'content', 'blog');
    
    const filePath = path.join(blogDirectory, `${params.slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    // **THE FIX IS HERE: Process Markdown for relevant fields in the content array**
    if (data.content && Array.isArray(data.content)) {
        for (const block of data.content) {
            if ((block.type === 'paragraph' || block.type === 'blockquote') && block.text) {
                const processed = await remark().use(html).process(block.text);
                block.processedText = processed.toString();
            }
        }
    }

    const allFilenames = fs.readdirSync(blogDirectory).filter(filename => filename.endsWith('.md'));
    const allPosts = allFilenames.map(filename => {
        const file = fs.readFileSync(path.join(blogDirectory, filename), 'utf8');
        const { data: postMeta } = matter(file);
        return {
            slug: filename.replace(/\.md$/, ''),
            ...postMeta
        };
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    const nextInSeries = data.series 
        ? allPosts.find(p => p.series === data.series && p.part === data.part + 1)
        : null;

    const otherPosts = allPosts
        .filter(p => p.id !== data.id && (!nextInSeries || p.id !== nextInSeries.id))
        .slice(0, 2);

    return {
        props: {
            postData: { slug: params.slug, ...data },
            nextPostInSeries: nextInSeries || null,
            otherPosts
        }
    };
}