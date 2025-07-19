import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsRight, ChevronLeft, ChevronRight, Star, MessageSquare, ThumbsUp, Linkedin, Twitter, Github, Mail, Gamepad2, Code, Brush, BrainCircuit, FileText, Link, X } from 'lucide-react';

// Mock Data (Easy to replace with your actual data)
const portfolioData = {
    name: "Alex Doe",
    title: "Innovative Game Designer & Developer",
    about: "I'm a passionate game designer with a love for creating immersive and memorable experiences. My design philosophy is centered around 'game feel' and player agency. I thrive on solving complex design challenges and collaborating with creative teams to bring virtual worlds to life. From initial concept to final polish, I'm dedicated to crafting games that resonate with players.",
    skills: [
        { name: "Game Design", icon: Gamepad2, description: "System Design, Level Design, Narrative Design, Gameplay Balancing, Prototyping" },
        { name: "Development", icon: Code, description: "Unity (C#), Unreal Engine (Blueprints), C++, JavaScript, Python" },
        { name: "Creative Tools", icon: Brush, description: "Figma, Adobe Photoshop, Blender, Aseprite, Jira, Trello" },
        { name: "Core Competencies", icon: BrainCircuit, description: "Problem Solving, Team Collaboration, Agile/Scrum, Version Control (Git)" },
    ],
    projects: [
        { 
            id: 1, 
            title: "Project Nebula", 
            category: "Professional", 
            image: "https://placehold.co/1600x900/18181b/8b5cf6?text=Project+Nebula", 
            description: "Lead designer on a 3D space exploration RPG. Responsible for core gameplay mechanics and narrative structure.", 
            featured: true,
            videoId: "dQw4w9WgXcQ", // Example YouTube Video ID. This will be shown instead of screenshots.
            screenshots: [
                "https://placehold.co/1600x900/18181b/8b5cf6?text=Nebula+Screenshot+1",
                "https://placehold.co/1600x900/18181b/8b5cf6?text=Nebula+Screenshot+2",
            ],
            details: "As the lead on Project Nebula, I spearheaded the design of the procedural galaxy generation system, ensuring billions of unique star systems could be explored. I also wrote the main questline and designed the branching dialogue system using a proprietary node-based editor. A major challenge was balancing the ship combat to be accessible for new players while offering depth for veterans."
        },
        { id: 2, title: "Chrono Glitch", category: "Game Jam", image: "https://placehold.co/1600x900/18181b/8b5cf6?text=Chrono+Glitch", description: "A 48-hour game jam winner. A 2D platformer with time-manipulation mechanics." },
        { id: 3, title: "Pixel Pets", category: "Personal", image: "https://placehold.co/1600x900/18181b/8b5cf6?text=Pixel+Pets", description: "A cozy life-sim inspired by classic pixel art games. Developed solo in my spare time." },
        { 
            id: 4, 
            title: "Cybernetic Dawn", 
            category: "Professional", 
            image: "https://placehold.co/1600x900/18181b/8b5cf6?text=Cybernetic+Dawn", 
            description: "UI/UX designer for a fast-paced cyberpunk FPS. Focused on creating an intuitive and stylish user interface.",
            screenshots: [ // No videoId, so this gallery will be shown.
                "https://placehold.co/1600x900/18181b/8b5cf6?text=Cybernetic+Screenshot+1",
                "https://placehold.co/1600x900/18181b/8b5cf6?text=Cybernetic+Screenshot+2",
                "https://placehold.co/1600x900/18181b/8b5cf6?text=Cybernetic+Screenshot+3",
            ],
            details: "My primary role was to overhaul the user interface to improve player onboarding and readability during intense combat. I conducted user testing sessions to identify pain points and iterated on HUD layouts in Figma. The final design increased player retention by 15% in the first week post-launch."
        },
        { id: 5, title: "Forest Spirit", category: "Game Jam", image: "https://placehold.co/1600x900/18181b/8b5cf6?text=Forest+Spirit", description: "A beautiful exploration game with a focus on atmosphere and environmental storytelling." },
    ],
    experience: [
        { role: "Lead Game Designer", company: "Starlight Studios", period: "2020 - Present", description: "Leading design on unannounced titles, mentoring junior designers, and defining the creative vision for new IPs.", linkedProjectId: 1 },
        { role: "Game Designer", company: "PixelForge Games", period: "2018 - 2020", description: "Designed and implemented core features for two successful mobile titles, contributing to level design and system balancing.", linkedProjectId: 4 },
        { role: "QA Tester", company: "Questline Interactive", period: "2016 - 2018", description: "Began my journey in the industry, identifying and documenting bugs, and providing player-focused feedback." },
    ],
    blogPosts: [
        { id: 101, title: "The Art of 'Juice': Making Games Feel Good", date: "July 17, 2025", content: "Game 'juice' or 'feel' is that intangible quality that makes an interaction satisfying. It's the screen shake, the particle effects, the snappy sound design... In this post, I break down how I approach adding juice to my projects, turning simple mechanics into delightful experiences.", featured: true },
        { id: 102, title: "Devlog #1: Prototyping a New World", date: "June 28, 2025", content: "Starting a new personal project is always exciting! This week, I've been prototyping the core movement system for a new 2D adventure game. Using simple shapes, I'm focusing entirely on nailing the physics and responsiveness before any art is created. It's all about building a solid foundation." },
    ]
};

// --- Animation Variants for Framer Motion ---
const sliderVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

// --- Screenshot Gallery Component ---
const ScreenshotGallery = ({ screenshots }) => {
    const [[page, direction], setPage] = useState([0, 0]);
    const timeoutRef = useRef(null);

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };
    
    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        if (screenshots.length > 1) {
            timeoutRef.current = setTimeout(() => paginate(1), 4000);
        }
        return () => resetTimeout();
    }, [page, screenshots.length]);

    const imageIndex = (page % screenshots.length + screenshots.length) % screenshots.length;

    return (
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden relative flex items-center justify-center bg-zinc-900">
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={page}
                    src={screenshots[imageIndex]}
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


// Main App Component
export default function App() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState(portfolioData.projects);
    const [selectedProject, setSelectedProject] = useState(null);
    
    // --- Featured Slider State & Logic ---
    const [featuredContent, setFeaturedContent] = useState([]);
    const [[page, direction], setPage] = useState([0, 0]);
    const timeoutRef = useRef(null);

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        const featuredItems = [
            ...portfolioData.blogPosts.filter(b => b.featured).map(b => ({ ...b, type: 'blog' })),
            ...portfolioData.projects.filter(p => p.featured).map(p => ({ ...p, type: 'project' }))
        ];
        setFeaturedContent(featuredItems);
    }, []);

    useEffect(() => {
        resetTimeout();
        if (featuredContent.length > 1) {
            timeoutRef.current = setTimeout(() => paginate(1), 4000);
        }
        return () => resetTimeout();
    }, [page, featuredContent]);

    const featureIndex = featuredContent.length > 0 ? (page % featuredContent.length + featuredContent.length) % featuredContent.length : 0;
    
    // --- Project Filtering Effect ---
    useEffect(() => {
        if (activeFilter === 'All') {
            setFilteredProjects(portfolioData.projects);
        } else {
            setFilteredProjects(portfolioData.projects.filter(p => p.category === activeFilter));
        }
    }, [activeFilter]);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const closeModal = () => {
        setSelectedProject(null);
    };

    // Sub-components for cleaner structure
    const Section = ({ id, title, children, className = "" }) => (
        <section id={id} className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-100 tracking-tight">
                    <span className="text-violet-500">/</span>{title}
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
        const navLinks = ["projects", "about", "experience", "skills", "blog", "contact"];
        return (
            <nav className="bg-zinc-900/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 shadow-lg shadow-violet-500/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <a href="#home" className="text-2xl font-bold text-white tracking-wider">
                            {portfolioData.name} <span className="text-violet-500">.</span>
                        </a>
                        <div className="hidden md:flex items-center">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navLinks.map(link => (
                                    <a key={link} href={`#${link}`} className="capitalize text-gray-300 hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300">{link}</a>
                                ))}
                            </div>
                            <a href="/AlexDoe_Resume.pdf" download className="ml-6 inline-flex items-center px-4 py-2 border border-violet-500 text-sm font-medium rounded-md text-violet-500 bg-transparent hover:bg-violet-500 hover:text-white transition-colors">
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
                            <a href="/AlexDoe_Resume.pdf" download className="mt-2 w-full flex items-center justify-center px-4 py-2 border border-violet-500 text-base font-medium rounded-md text-violet-500 bg-transparent hover:bg-violet-500 hover:text-white transition-colors">
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

            <header id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-zinc-900 opacity-80 z-10"></div>
                <div className="absolute inset-0 z-0">
                    <div className="absolute bg-violet-600/10 rounded-full w-96 h-96 -top-20 -left-20 filter blur-3xl opacity-50 animate-blob"></div>
                    <div className="absolute bg-blue-500/10 rounded-full w-96 h-96 -bottom-20 -right-20 filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                    <div className="absolute bg-pink-500/10 rounded-full w-72 h-72 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
                </div>
                <div className="text-center z-20 px-4">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4 tracking-tighter">
                        {portfolioData.title}
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 mb-8">
                        Crafting worlds, one mechanic at a time.
                    </p>
                    <a href="#projects" className="group inline-flex items-center justify-center px-8 py-4 bg-violet-600 text-white font-bold rounded-lg hover:bg-violet-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-violet-600/30">
                        View My Work
                        <ChevronsRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </div>
            </header>

            <main>
                {/* --- Featured Content Slider --- */}
                {featuredContent.length > 0 && (
                    <Section id="featured" title="Featured Content" className="bg-zinc-800/50">
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
                                            <img src={featuredContent[featureIndex].image} alt={featuredContent[featureIndex].title} className="rounded-lg shadow-lg w-full h-64 object-cover" />
                                        </div>
                                    ) : (
                                        <div className="p-8 bg-zinc-800 rounded-lg border border-zinc-700">
                                            <span className="text-violet-500 font-semibold mb-2 block">Featured Post</span>
                                            <h3 className="text-3xl font-bold text-white mb-2">{featuredContent[featureIndex].title}</h3>
                                            <p className="text-sm text-gray-500 mb-4">{featuredContent[featureIndex].date}</p>
                                            <p className="text-gray-400 mb-6 line-clamp-3">{featuredContent[featureIndex].content}</p>
                                            <a href="#blog" className="font-semibold text-violet-500 hover:text-violet-400">Read More &rarr;</a>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                            <button className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 z-10 p-2 bg-zinc-700/50 hover:bg-zinc-700 rounded-full transition-colors" onClick={() => paginate(-1)}><ChevronLeft /></button>
                            <button className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 z-10 p-2 bg-zinc-700/50 hover:bg-zinc-700 rounded-full transition-colors" onClick={() => paginate(1)}><ChevronRight /></button>
                        </div>
                    </Section>
                )}

                {/* Projects Section */}
                <Section id="projects" title="Projects">
                    <div className="flex justify-center space-x-2 md:space-x-4 mb-12">
                        {['All', 'Professional', 'Game Jam', 'Personal'].map(filter => (
                            <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-2 md:px-6 md:py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ${activeFilter === filter ? 'bg-violet-600 text-white' : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'}`}>
                                {filter}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map(project => (
                            <div key={project.id} onClick={() => handleProjectClick(project)} className="group bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 hover:border-violet-500/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer shadow-lg hover:shadow-violet-500/10">
                                <div className="relative">
                                    <img src={project.image} alt={project.title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <span className="absolute top-4 right-4 bg-violet-700/80 text-white text-xs font-bold px-3 py-1 rounded-full">{project.category}</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                    <p className="text-gray-400 truncate">{project.description}</p>
                                </div>
                            </div>
                        ))}
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
                                
                                {/* --- MODAL MEDIA SECTION --- */}
                                <div className="mb-6 mt-6">
                                    {selectedProject.videoId ? (
                                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                            <iframe 
                                                src={`https://www.youtube.com/embed/${selectedProject.videoId}`}
                                                frameBorder="0" 
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                allowFullScreen
                                                className="w-full h-full"
                                            ></iframe>
                                        </div>
                                    ) : selectedProject.screenshots && selectedProject.screenshots.length > 0 ? (
                                        <ScreenshotGallery screenshots={selectedProject.screenshots} />
                                    ) : (
                                        <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-auto object-cover rounded-lg" />
                                    )}
                                     <span className="bg-violet-600 text-white text-sm font-bold px-3 py-1 rounded-full mt-4 inline-block">{selectedProject.category}</span>
                                </div>

                                {/* --- MODAL CONTENT SECTION --- */}
                                <p className="text-gray-300 text-lg mb-6">{selectedProject.description}</p>
                                
                                {selectedProject.details && (
                                    <div className="mt-8 pt-6 border-t border-zinc-700">
                                        <h3 className="text-2xl font-bold text-white mb-4">Project Breakdown</h3>
                                        <p className="text-gray-400 whitespace-pre-line">{selectedProject.details}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
                </AnimatePresence>

                {/* About Me Section (Now contains Experience and Skills) */}
                <Section id="about" title="About Me" className="bg-zinc-800/50">
                    <div className="grid md:grid-cols-3 gap-12 items-center">
                        <div className="md:col-span-1 flex justify-center">
                            <img src="https://placehold.co/400x400/18181b/8b5cf6?text=A+D" alt="Alex Doe" className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover border-4 border-violet-500/50 shadow-2xl" />
                        </div>
                        <div className="md:col-span-2">
                            <p className="text-lg text-gray-400 mb-6">{portfolioData.about}</p>
                            <a href="#contact" className="text-violet-500 font-semibold hover:text-violet-400 transition-colors">
                                Let's create something amazing together &rarr;
                            </a>
                        </div>
                    </div>

                    {/* Experience Sub-Section with Interactive Links */}
                    <SubSection id="experience" title="My Journey">
                        <div className="relative max-w-2xl mx-auto">
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-zinc-700"></div>
                            {portfolioData.experience.map((job, index) => {
                                const linkedProject = job.linkedProjectId ? portfolioData.projects.find(p => p.id === job.linkedProjectId) : null;
                                return (
                                    <div key={job.role} className={`relative mb-12 flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                                        <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                                            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-700 transform transition-all duration-500 hover:scale-105 hover:border-violet-500/50">
                                                <p className="text-sm text-violet-500 mb-1">{job.period}</p>
                                                <h3 className="text-xl font-bold text-white mb-2">{job.role}</h3>
                                                <p className="text-md font-semibold text-gray-300 mb-3">{job.company}</p>
                                                <p className="text-gray-400 mb-4">{job.description}</p>
                                                {linkedProject && (
                                                    <button onClick={() => handleProjectClick(linkedProject)} className="flex items-center text-sm font-semibold text-violet-500 hover:text-violet-400 transition-colors">
                                                        <Link className="w-4 h-4 mr-2" />
                                                        See Related Project: {linkedProject.title}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-violet-500 rounded-full border-4 border-zinc-800"></div>
                                    </div>
                                );
                            })}
                        </div>
                    </SubSection>

                    {/* Skills Sub-Section with NO Animation */}
                    <SubSection id="skills" title="My Arsenal">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {portfolioData.skills.map(skill => (
                                <div key={skill.name} className="bg-zinc-900 p-6 rounded-lg border border-zinc-700 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="flex items-center mb-4">
                                        <skill.icon className="w-8 h-8 text-violet-500 mr-4" />
                                        <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                                    </div>
                                    <p className="text-gray-400">{skill.description}</p>
                                </div>
                            ))}
                        </div>
                    </SubSection>
                </Section>

                {/* Blog Section */}
                <Section id="blog" title="Devlog & Musings">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {portfolioData.blogPosts.map(post => (
                            <div key={post.id} className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 flex flex-col">
                                <p className="text-sm text-gray-400 mb-2">{post.date}</p>
                                <h3 className="text-2xl font-bold text-white mb-4 flex-grow">{post.title}</h3>
                                <p className="text-gray-400 mb-6 line-clamp-3">{post.content}</p>
                                <div className="mt-auto pt-4 border-t border-zinc-700 flex justify-end items-center">
                                    <a href="#" className="font-semibold text-violet-500 hover:text-violet-400">Read More &rarr;</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Contact Section */}
                <Section id="contact" title="Get In Touch" className="bg-zinc-800/50">
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="text-xl text-gray-400 mb-8">
                            I'm always open to new opportunities and collaborations. Whether you have a question or just want to say hi, feel free to reach out!
                        </p>
                        <div className="flex justify-center space-x-6 mb-12">
                            <a href="#" className="p-3 bg-zinc-800 rounded-full hover:bg-violet-600 transition-colors transform hover:-translate-y-1"><Twitter className="w-6 h-6 text-white" /></a>
                            <a href="#" className="p-3 bg-zinc-800 rounded-full hover:bg-violet-600 transition-colors transform hover:-translate-y-1"><Github className="w-6 h-6 text-white" /></a>
                            <a href="#" className="p-3 bg-zinc-800 rounded-full hover:bg-violet-600 transition-colors transform hover:-translate-y-1"><Linkedin className="w-6 h-6 text-white" /></a>
                            <a href="mailto:example@email.com" className="p-3 bg-zinc-800 rounded-full hover:bg-violet-600 transition-colors transform hover:-translate-y-1"><Mail className="w-6 h-6 text-white" /></a>
                        </div>
                        <a href="mailto:alex.doe@email.com" className="inline-block px-12 py-4 bg-zinc-800 border border-violet-500 text-violet-500 font-bold rounded-lg hover:bg-violet-600 hover:text-white transition-all duration-300 text-lg">
                            alex.doe@email.com
                        </a>
                    </div>
                </Section>
            </main>

            <footer className="bg-zinc-900 py-8 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All Rights Reserved.</p>
                <p className="text-sm mt-2">Designed & Built with 💜 by You!</p>
            </footer>
            
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                    scroll-behavior: smooth;
                }
                html {
                    scroll-behavior: smooth;
                }
                .aspect-w-16 { position: relative; padding-bottom: 56.25%; }
                .aspect-h-9 { /* No specific styles needed here with this setup */ }
                .aspect-w-16 > iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }
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