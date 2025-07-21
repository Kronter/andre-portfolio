import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { ChevronsRight, ChevronLeft, ChevronRight, Star, Link as LinkIcon, X, FileText, Gamepad2, Code, Brush, BrainCircuit, Twitter, Github, Linkedin, Mail, Steam, Smartphone } from 'lucide-react';
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
  enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 })
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

// --- Screenshot Gallery Component ---
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
            timeoutRef.current = setTimeout(() => paginate(1), 4500);
        }
        return () => resetTimeout();
    }, [page, screenshots, paginate]);

    if (!screenshots || screenshots.length === 0) return null;

    const imageIndex = (page % screenshots.length + screenshots.length) % screenshots.length;

    return (
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden relative flex items-center justify-center bg-zinc-900">
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

// --- NEW Timeline Item Component ---
const TimelineItem = ({ job, index, projects, handleProjectClick }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const animationControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            animationControls.start("visible");
        }
    }, [isInView, animationControls]);

    const linkedProject = job.linkedProjectId ? projects.find(p => p.id === job.linkedProjectId) : null;

    return (
        <div ref={ref} className={`relative mb-12 flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            <motion.div
                className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}
                variants={{
                    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                    visible: { opacity: 1, x: 0 }
                }}
                initial="hidden"
                animate={animationControls}
                transition={{ duration: 0.6 }}
            >
                <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-700 transform transition-all duration-500 hover:scale-105 hover:border-violet-500/50">
                    <p className="text-sm text-violet-500 mb-1">{job.period}</p>
                    <h3 className="text-xl font-bold text-white mb-2">{job.role}</h3>
                    <p className="text-md font-semibold text-gray-300 mb-3">{job.company}</p>
                    <p className="text-gray-400 mb-4">{job.description}</p>
                    {linkedProject && (
                        <button onClick={() => handleProjectClick(linkedProject)} className="flex items-center text-sm font-semibold text-violet-500 hover:text-violet-400 transition-colors">
                            <LinkIcon className="w-4 h-4 mr-2" />
                            See Related Project: {linkedProject.title}
                        </button>
                    )}
                </div>
            </motion.div>
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-violet-500 rounded-full border-4 border-zinc-800"></div>
        </div>
    );
};

// --- Main App Component ---
export default function App({ portfolioData = {}, projects = [], blogPosts = [] }) {
    const [activeFilter, setActiveFilter] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [selectedProject, setSelectedProject] = useState(null);
    const [copySuccess, setCopySuccess] = useState(''); // State for copy confirmation
    const [expandedCategories, setExpandedCategories] = useState({});
    const [isBlogExpanded, setIsBlogExpanded] = useState(false);

    const handleCopyEmail = () => {
        const email = 'andregot@gmail.com';
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        setCopySuccess('Email copied!');
        setTimeout(() => setCopySuccess(''), 2000); // Hide message after 2 seconds
    };
    
    const [featuredContent, setFeaturedContent] = useState([]);
    const [[page, direction], setPage] = useState([0, 0]);
    const timeoutRef = useRef(null);

    const paginate = useCallback((newDirection) => {
        setPage(p => [p[0] + newDirection, newDirection]);
    }, []);

    useEffect(() => {
        const featuredItems = [
            ...(blogPosts || []).filter(b => b.featured).map(b => ({ ...b, type: 'blog' })),
            ...(projects || []).filter(p => p.featured).map(p => ({ ...p, type: 'project' }))
        ];
        setFeaturedContent(featuredItems);
    }, [projects, blogPosts]);

    useEffect(() => {
        const resetTimeout = () => timeoutRef.current && clearTimeout(timeoutRef.current);
        resetTimeout();
        if (featuredContent.length > 1) {
            timeoutRef.current = setTimeout(() => paginate(1), 4500);
        }
        return () => resetTimeout();
    }, [page, featuredContent, paginate]);

    const featureIndex = featuredContent.length > 0 ? (page % featuredContent.length + featuredContent.length) % featuredContent.length : 0;
    
    useEffect(() => {
        if (activeFilter === 'All') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(p => p.category === activeFilter));
        }
    }, [activeFilter, projects]);

    const handleProjectClick = (project) => setSelectedProject(project);
    const closeModal = () => setSelectedProject(null);

    const icons = { Gamepad2, Code, Brush, BrainCircuit };

    // Sub-components
    const Section = ({ id, title, children, className = "" }) => (
        <section id={id} className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-100 tracking-tight">
                    <span className="text-violet-500">*</span>{title}
                </h2>
                {children}
            </div>
        </section>
    );

    const SubSection = ({ id, title, children, className = "" }) => (
        <div id={id} className={`pt-16 md:pt-24 ${className}`}>
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-100 tracking-tight">
                {title}
            </h3>
            {children}
        </div>
    );

    const Nav = () => {
        const [isOpen, setIsOpen] = useState(false);
        /*const navLinks = ["projects", "about", "experience", "skills", "blog", "contact"];*/
        const navLinks = ["projects", "skills", "about", "blog", "contact"];
        return (
            <nav className="bg-zinc-900/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 shadow-lg shadow-violet-500/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <a href="#home" className="text-2xl font-bold text-white tracking-wider">
                            {portfolioData.name || "Game Designer"} <span className="text-violet-500">.</span>
                        </a>
                        <div className="hidden md:flex items-center">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navLinks.map(link => (
                                    <a key={link} href={`#${link}`} className="capitalize text-gray-300 hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300">{link}</a>
                                ))}
                            </div>
                            <a href={asset("/Andre_Gottgtroy_Resume.pdf")} download className="ml-6 inline-flex items-center px-4 py-2 border border-violet-500 text-sm font-medium rounded-md text-violet-500 bg-transparent hover:bg-violet-500 hover:text-white transition-colors">
                                <FileText className="w-4 h-4 mr-2" />
                                Resume
                            </a>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} type="button" className="bg-zinc-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-white">
                                <span className="sr-only">Open main menu</span>
                                {isOpen ? <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>}
                            </button>
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden" id="mobile-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map(link => (
                                <a key={link} href={`#${link}`} onClick={() => setIsOpen(false)} className="capitalize text-gray-300 hover:bg-zinc-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300">{link}</a>
                            ))}
                            <a href={asset("/Andre_Gottgtroy_Resume.pdf")} download className="mt-2 w-full flex items-center justify-center px-4 py-2 border border-violet-500 text-base font-medium rounded-md text-violet-500 bg-transparent hover:bg-violet-500 hover:text-white transition-colors">
                                <FileText className="w-5 h-5 mr-2" />
                                Resume
                            </a>
                        </div>
                    </div>
                )}
            </nav>
        );
    };

    return (
        <div className="bg-zinc-900 text-gray-300 font-sans leading-relaxed">
            <Nav />

            <header id="home" className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-zinc-900 opacity-80 z-10"></div>
                <div className="absolute inset-0 z-0">
                    <div className="absolute bg-violet-600/10 rounded-full w-96 h-96 -top-20 -left-20 filter blur-3xl opacity-50 animate-blob"></div>
                    <div className="absolute bg-blue-500/10 rounded-full w-96 h-96 -bottom-20 -right-20 filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                    <div className="absolute bg-pink-500/10 rounded-full w-72 h-72 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
                </div>
                <div className="text-center z-20 px-4">
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tighter">
                        {portfolioData.title || "Game Designer & Developer"}
                    </h3>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 mb-8 whitespace-pre-line">
                        {portfolioData.heroSubtitle}
                    </p>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 mb-8 justify-left whitespace-pre-line">
                        Thanks for stopping by.
                    </p>
                    <a href="#projects" className="group inline-flex items-center justify-center px-8 py-4 bg-violet-600 text-white font-bold rounded-lg hover:bg-violet-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-violet-600/30">
                        View My Work
                        <ChevronsRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </div>
            </header>

            <main>
                {/* --- Featured Content Slider --- 
                {featuredContent.length > 0 && (
                    <Section id="featured" title="Featured" className="bg-zinc-800/50">
                        <div className="relative h-[450px] md:h-[400px] flex items-center justify-center">
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.div
                                    key={page}
                                    custom={direction}
                                    variants={sliderVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                                    className="absolute w-full max-w-4xl"
                                >
                                    {featuredContent[featureIndex].type === 'project' ? (
                                        <div className="p-8 bg-zinc-800 rounded-lg border border-zinc-700 grid md:grid-cols-2 gap-8 items-center">
                                            <div>
                                                <span className="text-violet-500 font-semibold mb-2 block">Featured Project</span>
                                                <h3 className="text-3xl font-bold text-white mb-2">{featuredContent[featureIndex].title}</h3>
                                                <p className="text-gray-400 mb-6">{featuredContent[featureIndex].description}</p>
                                                <button onClick={() => handleProjectClick(featuredContent[featureIndex])} className="group inline-flex items-center justify-center px-6 py-3 bg-violet-600 text-white font-bold rounded-lg hover:bg-violet-500 transition-all duration-300 transform hover:scale-105">
                                                    View Details
                                                </button>
                                            </div>
                                            {/* eslint-disable-next-line @next/next/no-img-element 
                                            <img src={featuredContent[featureIndex].image} alt={featuredContent[featureIndex].title} className="rounded-lg shadow-lg w-full h-64 object-cover" />
                                        </div>
                                    ) : (
                                        <div className="p-8 bg-zinc-800 rounded-lg border border-zinc-700">
                                            <span className="text-violet-500 font-semibold mb-2 block">Featured Post</span>
                                            <h3 className="text-3xl font-bold text-white mb-2">{featuredContent[featureIndex].title}</h3>
                                            <p className="text-sm text-gray-500 mb-4">{new Date(featuredContent[featureIndex].date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                            <div className="text-gray-400 mb-6 line-clamp-3" dangerouslySetInnerHTML={{ __html: featuredContent[featureIndex].contentHtml }} />
                                            <Link href={`/blog/${featuredContent[featureIndex].slug}`} className="font-semibold text-violet-500 hover:text-violet-400">
                                                Read More &rarr;
                                            </Link>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                            <button className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 z-10 p-2 bg-zinc-700/50 hover:bg-zinc-700 rounded-full transition-colors" onClick={() => paginate(-1)}><ChevronLeft /></button>
                            <button className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 z-10 p-2 bg-zinc-700/50 hover:bg-zinc-700 rounded-full transition-colors" onClick={() => paginate(1)}><ChevronRight /></button>
                        </div>
                    </Section>
                )}*/}

                {/* Projects Section */}
                <Section id="projects" title="Projects" className="bg-zinc-800/50">
                    <div className="flex justify-center space-x-2 md:space-x-4 mb-12">
                        {['Professional', 'Game Jam', 'Personal'].map(filter => (
                            <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-2 md:px-6 md:py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ${activeFilter === filter ? 'bg-violet-600 text-white' : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'}`}>
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-16">
                        {(() => {
                            const categories = ['Professional', 'Game Jam', 'Personal'];
                            const filteredCategories = activeFilter === 'All' ? categories : categories.filter(c => c === activeFilter);
                            
                            const toggleCategoryExpansion = (category) => {
                                setExpandedCategories(prev => ({
                                    ...prev,
                                    [category]: !prev[category]
                                }));
                            };

                            return filteredCategories.map(category => {
                                const projectsForCategory = projects.filter(p => p.category === category);
                                if (projectsForCategory.length === 0) return null;

                                const isExpanded = expandedCategories[category];
                                const displayedProjects = isExpanded ? projectsForCategory : projectsForCategory.slice(0, 3);

                                return (
                                    <div key={category}>
                                        <h3 className="text-3xl font-bold text-white mb-6 pl-2">{category}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {filteredProjects.map(project => (
                                                <div key={project.id} onClick={() => handleProjectClick(project)} className="group bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 hover:border-violet-500/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer shadow-lg hover:shadow-violet-500/10 flex flex-col">
                                                    <div className="relative">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img src={asset(project.image)} alt={project.title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
                                                        <div className="absolute top-4 right-4 flex items-center gap-2">
                                                            {project.current && (
                                                                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">Current</span>
                                                            )}
                                                            <span className="bg-violet-700/80 text-white text-xs font-bold px-3 py-1 rounded-full">{project.category}</span>
                                                        </div>
                                                    </div>
                                                    <div className="p-6 flex-grow flex flex-col">
                                                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                                        <div className="flex flex-wrap gap-2 mt-2 pt-3 border-t border-zinc-700/50">
                                                            {project.roles?.map(role => (
                                                                <span key={role} className="bg-zinc-700 text-violet-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                                                                    {role}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {projectsForCategory.length > 3 && (
                                            <div className="text-center mt-8">
                                                <button
                                                    onClick={() => toggleCategoryExpansion(category)}
                                                    className="px-6 py-2 bg-zinc-700 text-white font-semibold rounded-full hover:bg-zinc-600 transition-colors"
                                                >
                                                    {isExpanded ? 'Show Less' : `Show More Projects`}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            });
                        })()}
                    </div>
                </Section>
                
                {/* Project Modal */}
                <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
                        <motion.div 
                            className="bg-zinc-800 rounded-lg max-w-4xl w-full shadow-2xl shadow-violet-500/20 border border-zinc-700 overflow-y-auto max-h-[90vh] relative" 
                            onClick={e => e.stopPropagation()}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <button onClick={closeModal} className="sticky top-4 right-4 float-right z-20 text-gray-400 hover:text-white transition-colors bg-zinc-800/50 rounded-full p-1">
                                <X size={28} />
                            </button>
                            
                            <div className="p-8 pt-12">
                                <h2 className="text-4xl font-bold text-white mb-2">{selectedProject.title}</h2>
                                
                                <div className="mb-6 mt-6">
                                    <div className="max-w-2xl mx-auto"> {/* This new wrapper controls the size */}
                                        {selectedProject.videoId ? (
                                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                                                <iframe src={`https://www.youtube.com/embed/${selectedProject.videoId}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
                                            </div>
                                        ) : selectedProject.screenshots && selectedProject.screenshots.length > 0 ? (
                                            <ScreenshotGallery screenshots={selectedProject.screenshots} />
                                        ) : (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                                        )}
                                    </div>
                                    <div className="text-left mt-4">
                                        <span className="bg-violet-600 text-white text-sm font-bold px-3 py-1 rounded-full">{selectedProject.category}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-left gap-2 my-4">
                                    {selectedProject.roles?.map(role => (
                                        <span key={role} className="bg-zinc-700 text-violet-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                                            {role}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-gray-300 text-lg mb-6">{selectedProject.description}</p>
                                
                                {selectedProject.contentHtml && (
                                    <div className="mt-8 pt-6 border-t border-zinc-700">
                                        <h3 className="text-2xl font-bold text-white mb-4">Project Breakdown</h3>
                                        <div className="prose prose-invert prose-lg max-w-none prose-p:text-gray-400 prose-headings:text-white prose-a:text-violet-400 hover:prose-a:text-violet-300 prose-strong:text-gray-200 prose-blockquote:border-l-violet-500 prose-code:bg-zinc-800 prose-code:rounded-md prose-code:px-2 prose-code:py-1 prose-code:font-mono" dangerouslySetInnerHTML={{ __html: selectedProject.contentHtml }} />
                                    </div>
                                )}
                                {selectedProject.downloadLinks && selectedProject.downloadLinks.length > 0 && (
                                    <div className="mt-8 pt-6 border-t border-zinc-700">
                                        <h3 className="text-2xl font-bold text-white mb-4">Available On</h3>
                                        <div className="flex flex-wrap gap-4">
                                            {selectedProject.downloadLinks.map(link => {
                                                const Icon = link.platform === 'Steam' ? Steam : Smartphone;
                                                return (
                                                    <a 
                                                        key={link.platform}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center px-6 py-3 bg-zinc-700 text-white font-bold rounded-lg hover:bg-violet-600 transition-all duration-300"
                                                    >
                                                        <Icon className="w-5 h-5 mr-3" />
                                                        {link.platform}
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
                </AnimatePresence>
                <Section id="skills" title="Skills" className="bg-zinc-800/50">
                {/* About Me Section */}
                {/*<Section id="about" title="About Me" className="bg-zinc-800/50">
                    <div className="grid md:grid-cols-3 gap-6 items-center">
                        <div className="md:col-span-1 flex justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element 
                            <img src={asset('/profile-photo.png')} alt="Andre Gottgtroy" className="rounded-full w-48 h-48 md:w-60 md:h-60 object-cover border-4 border-violet-500/50 shadow-2xl" />
                        </div>
                        <div className="md:col-span-2">
                            <p className="text-lg text-gray-400 mb-6">{portfolioData.about}</p>
                            <a href="#contact" className="text-violet-500 font-semibold hover:text-violet-400 transition-colors">
                                Let&apos;s create something amazing together &rarr;
                            </a>
                        </div>
                    </div>*/}

                    {/*<SubSection id="experience" title="Experience">
                        <div className="relative max-w-2xl mx-auto">
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-zinc-700"></div>
                            {portfolioData.experience?.map((job, index) => (
                                <TimelineItem 
                                    key={job.role + index}
                                    job={job}
                                    index={index}
                                    projects={projects}
                                    handleProjectClick={handleProjectClick}
                                />
                            ))}
                        </div>
                    </SubSection>*/}

                    {/*<SubSection id="skills" title="Skills">*/}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {portfolioData.skills?.map(skill => {
                                const Icon = icons[skill.icon];
                                // This splits the description string into an array of tags
                                const skillTags = skill.description.split(',').map(s => s.trim());

                                return (
                                    <div key={skill.name} className="bg-zinc-900 p-6 rounded-lg border border-zinc-700 flex flex-col">
                                        <div className="flex items-center mb-4">
                                            {Icon && <Icon className="w-8 h-8 text-violet-500 mr-4" />}
                                            <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                                        </div>
                                        {/* This new div displays the tags */}
                                        <div className="flex flex-wrap gap-2 mt-2 pt-3 border-t border-zinc-700/50">
                                            {skillTags.map(tag => (
                                                <span key={tag} className="bg-zinc-700 text-violet-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    {/*</SubSection>*/}
                </Section>
                <Section id="about" title="About Me" className="bg-zinc-800/50">
                        <div className="grid md:grid-cols-3 gap-6 items-center">
                            <div className="md:col-span-1 flex justify-center">
                                {/* eslint-disable-next-line @next/next/no-img-element*/} 
                                <img src={asset('/profile-photo.png')} alt="Andre Gottgtroy" className="rounded-full w-48 h-48 md:w-60 md:h-60 object-cover border-4 border-violet-500/50 shadow-2xl" />
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-lg text-gray-400 mb-6">{portfolioData.about}</p>
                                <a href="#contact" className="text-violet-500 font-semibold hover:text-violet-400 transition-colors">
                                    Let&apos;s create something amazing together &rarr;
                                </a>
                            </div>
                        </div>
                </Section>

                <Section id="blog" title="Blog">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {(isBlogExpanded ? blogPosts : blogPosts.slice(0, 4)).map(post => {
                            const postDate = new Date(post.date);
                            const thirtyDaysAgo = new Date();
                            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                            const isNew = postDate > thirtyDaysAgo;

                            return (
                                <div key={post.id} className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 flex flex-col">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm text-gray-400">{postDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        {isNew && (
                                            <span className="bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full">New</span>
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 flex-grow">{post.title}</h3>
                                    <div className="text-gray-400 mb-6 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                                    <div className="mt-auto pt-4 border-t border-zinc-700 flex justify-end items-center">
                                        <Link href={`/blog/${post.slug}`} className="font-semibold text-violet-500 hover:text-violet-400">
                                            Read More &rarr;
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {blogPosts.length > 3 && (
                        <div className="text-center mt-12">
                            <button
                                onClick={() => setIsBlogExpanded(!isBlogExpanded)}
                                className="px-6 py-2 bg-zinc-700 text-white font-semibold rounded-full hover:bg-zinc-600 transition-colors"
                            >
                                {isBlogExpanded ? 'Show Less' : 'Show More Posts'}
                            </button>
                        </div>
                    )}
                </Section>

                <Section id="contact" title="Get In Touch" className="bg-zinc-800/50">
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="text-xl text-gray-400 mb-8">
                            I&apos;m always open to new opportunities and collaborations. 
                            Feel free to reach out!
                        </p>
                        <div className="flex justify-center space-x-6 mb-12">
                            <a href="https://www.linkedin.com/in/andré-gottgtroy-b56616172/" className="p-3 bg-zinc-800 rounded-full hover:bg-violet-600 transition-colors transform hover:-translate-y-1"><Linkedin className="w-6 h-6 text-white" /></a>
                            <div className="relative">
                                <button onClick={handleCopyEmail} className="p-3 bg-zinc-800 rounded-full hover:bg-violet-600 transition-colors transform hover:-translate-y-1">
                                    <Mail className="w-6 h-6 text-white" />
                                </button>
                                <AnimatePresence>
                                    {copySuccess && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap"
                                        >
                                            {copySuccess}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                         <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                                <a href={asset("/Andre_Gottgtroy_Resume.pdf")} download className="inline-flex items-center px-8 py-3 border-2 border-violet-500 text-violet-400 font-bold rounded-lg hover:bg-violet-500 hover:text-white transition-all duration-300 text-lg">
                                    <FileText className="w-5 h-5 mr-2" />
                                    Download Resume
                              </a>
                         </div>
                    </div>
                </Section>
            </main>
            
            <style jsx global>{`
                html {
                    scroll-behavior: smooth;
                }
                body {
                    font-family: 'Inter', sans-serif;
                }
                .aspect-w-16 { position: relative; padding-bottom: 56.25%; }
                .aspect-h-9 { /* No specific styles needed here with this setup */ }
                .aspect-w-16 > iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
                .animate-blob { animation: blob 7s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .line-clamp-3 {
                   overflow: hidden;
                   display: -webkit-box;
                   -webkit-box-orient: vertical;
                   -webkit-line-clamp: 3;
                }
            `}</style>
        </div>
    );
}

// --- Data Fetching for Next.js ---
export async function getStaticProps() {
    let mainData = {};
    let projects = [];
    let blogPosts = [];

    try {
        const mainDataPath = path.join(process.cwd(), 'src', 'data', 'main.md');
        if (fs.existsSync(mainDataPath)) {
            const mainFileContents = fs.readFileSync(mainDataPath, 'utf8');
            const { data } = matter(mainFileContents);
            mainData = data;
        }
    } catch (error) {
        console.error("Error reading main.md:", error);
    }

    try {
        const projectsDirectory = path.join(process.cwd(), 'src', 'content', 'projects');
        if (fs.existsSync(projectsDirectory)) {
            const projectFilenames = fs.readdirSync(projectsDirectory).filter(filename => filename.endsWith('.md'));
            projects = await Promise.all(projectFilenames.map(async (filename) => {
                const filePath = path.join(projectsDirectory, filename);
                const fileContents = fs.readFileSync(filePath, 'utf8');
                const { data, content } = matter(fileContents);
                const processedContent = await remark().use(html).process(content);
                const contentHtml = processedContent.toString();
                return { ...data, contentHtml };
            }));
        }
    } catch (error) {
        console.error("Error reading project files:", error);
    }

    try {
        const blogDirectory = path.join(process.cwd(), 'src', 'content', 'blog');
        if (fs.existsSync(blogDirectory)) {
            const blogFilenames = fs.readdirSync(blogDirectory).filter(filename => filename.endsWith('.md'));
            blogPosts = await Promise.all(blogFilenames.map(async (filename) => {
                const filePath = path.join(blogDirectory, filename);
                const fileContents = fs.readFileSync(filePath, 'utf8');
                const { data, content } = matter(fileContents);
                const processedContent = await remark().use(html).process(content);
                const contentHtml = processedContent.toString();
                const slug = filename.replace(/\.md$/, '');
                return { ...data, contentHtml, slug };
            }));
        }
    } catch (error) {
        console.error("Error reading blog files:", error);
    }

    return {
        props: {
            portfolioData: mainData,
            projects: projects.sort((a, b) => (b.id || 0) - (a.id || 0)),
            blogPosts: blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date)),
        },
    };
}