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
    const repo = 'andre-portfolio'; // IMPORTANT: Change this to your repository name
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
        if (screenshots.length > 1) {
            timeoutRef.current = setTimeout(() => paginate(1), 4000);
        }
        return () => resetTimeout();
    }, [page, screenshots.length, paginate]);

    const imageIndex = (page % screenshots.length + screenshots.length) % screenshots.length;

    return (
        <div className="aspect-w-16 aspect-h-9 my-8 rounded-lg overflow-hidden relative flex items-center justify-center bg-zinc-900">
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={page}
                    src={screenshots[imageIndex]}
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
const calculateReadingTime = (content) => {
    const wordsPerMinute = 225;
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
};

// --- Main Blog Post Component ---
export default function BlogPostPage({ postData, nextPostInSeries, otherPosts }) {
    
    // A helper function to render content blocks from Markdown HTML
    const renderContent = (htmlContent) => {
        return <div className="prose prose-invert prose-lg max-w-none prose-p:text-gray-400 prose-headings:text-white prose-a:text-violet-400 hover:prose-a:text-violet-300 prose-strong:text-gray-200 prose-blockquote:border-l-violet-500 prose-code:bg-zinc-800 prose-code:rounded-md prose-code:px-2 prose-code:py-1 prose-code:font-mono" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    };

    const readingTime = calculateReadingTime(postData.contentHtml);

    return (
        <div className="bg-zinc-900 text-gray-300 font-sans leading-relaxed">
            <nav className="bg-zinc-900/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 shadow-lg shadow-violet-500/10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Link href={"/"} className="text-2xl font-bold text-white tracking-wider">
                            {postData.author} <span className="text-violet-500">.</span>
                        </Link>
                        <Link href={"/"} className="text-gray-300 hover:text-white transition-colors">
                            &larr; Back to Portfolio
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-16">
                <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="mb-4">
                            {postData.tags.map(tag => (
                                <span key={tag} className="inline-block bg-violet-600/20 text-violet-400 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tighter">
                            {postData.title}
                        </h1>
                        <div className="flex items-center text-gray-400 space-x-4 mb-8">
                            <div className="flex items-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://placehold.co/40x40/18181b/8b5cf6?text=A+D" alt="Alex Doe" className="w-8 h-8 rounded-full mr-2" />
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

                    <motion.div
                        className="mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        {renderContent(postData.contentHtml)}
                    </motion.div>
                </article>

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

                <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-zinc-700 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Let&apos;s Create Something Amazing</h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        I&apos;m always open to new opportunities and collaborations. Let&apos;s get in touch and build the next great game together.
                    </p>
                    <div className="flex justify-center space-x-6 mb-8">
                        <a href="https://www.linkedin.com/in/andré-gottgtroy-b56616172/" className="p-3 bg-zinc-800 rounded-full hover:bg-violet-600 transition-colors transform hover:-translate-y-1"><Linkedin className="w-6 h-6 text-white" /></a>
                        <a href="mailto:andregot@gmail.com" className="p-3 bg-zinc-800 rounded-full hover:bg-violet-600 transition-colors transform hover:-translate-y-1"><Mail className="w-6 h-6 text-white" /></a>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <a href={asset("/Andre_Gottgtroy_Resume.pdf")} download className="inline-flex items-center px-8 py-3 border-2 border-violet-500 text-violet-400 font-bold rounded-lg hover:bg-violet-500 hover:text-white transition-all duration-300 text-lg">
                            <FileText className="w-5 h-5 mr-2" />
                            Download Resume
                        </a>
                    </div>
                </section>
            </main>

            <style jsx global>{`
                .aspect-w-16 { position: relative; padding-bottom: 56.25%; }
                .aspect-h-9 { /* No specific styles needed here with this setup */ }
                .aspect-w-16 > iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
            `}</style>
        </div>
    );
}

// --- Next.js Data Fetching Functions ---

export async function getStaticPaths() {
    const blogDirectory = path.join(process.cwd(), 'src', 'content', 'blog');
    const filenames = fs.readdirSync(blogDirectory);
    const paths = filenames.map(filename => ({
        params: { slug: filename.replace(/\.md$/, '') }
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const blogDirectory = path.join(process.cwd(), 'src', 'content', 'blog');
    
    // Get current post data
    const filePath = path.join(blogDirectory, `${params.slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();
    const postData = { slug: params.slug, ...data, contentHtml };

    // Get all posts for "Keep Reading" section
    const allFilenames = fs.readdirSync(blogDirectory);
    const allPosts = allFilenames.map(filename => {
        const file = fs.readFileSync(path.join(blogDirectory, filename), 'utf8');
        const { data } = matter(file);
        return {
            slug: filename.replace(/\.md$/, ''),
            ...data
        };
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    const nextInSeries = postData.series 
        ? allPosts.find(p => p.series === postData.series && p.part === postData.part + 1)
        : null;

    const otherPosts = allPosts
        .filter(p => p.id !== postData.id && (!nextInSeries || p.id !== nextInSeries.id))
        .slice(0, 2);

    return {
        props: {
            postData,
            nextPostInSeries: nextInSeries || null, // **THE FIX IS HERE**
            otherPosts
        }
    };
}