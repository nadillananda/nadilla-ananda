
import { useEffect, useRef, useState } from 'react'
import homePageImg from '../assets/home-page.jpg'

// ... (keep existing imports)

// ... inside component ...
<img
    src={homePageImg}
    alt="Background"
    className="w-full h-full object-cover grayscale"
/>
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import { projects } from '../data/projects'

const skills = {
    capabilities: ["Art Direction", "Digital Experience", "Brand Strategy", "Creative Development"],
    expertise: ["React.js / Next.js", "TypeScript", "MySQL / Node.js", "Tailwind CSS", "Figma"],
    inspiration: ["Cinema", "Brutalism", "Art Deco", "Music", "Cinema"]
}

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Hero Refs
    const nameRef = useRef<HTMLHeadingElement>(null)
    const topTextRef = useRef<HTMLDivElement>(null)
    const bottomRef = useRef<HTMLDivElement>(null)

    // About Refs
    const aboutRef = useRef<HTMLDivElement>(null)
    const aboutTopTextRef = useRef<HTMLDivElement>(null)
    const aboutSplitTextRef = useRef<HTMLDivElement>(null)
    const aboutImgRef = useRef<HTMLImageElement>(null) // Changed to HTMLImageElement for direct image ref
    const aboutBioRef = useRef<HTMLDivElement>(null)

    // Works Refs
    const worksRef = useRef<HTMLDivElement>(null)
    const worksHeaderRef = useRef<HTMLHeadingElement>(null)
    const worksGridRef = useRef<HTMLDivElement>(null)

    // Skills Refs
    const skillsRef = useRef<HTMLDivElement>(null)
    const skillsHeaderRef = useRef<HTMLHeadingElement>(null)
    const skillsListRef = useRef<HTMLDivElement>(null)

    const [time, setTime] = useState('')

    // Time update logic for Jakarta
    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const options: Intl.DateTimeFormatOptions = {
                timeZone: 'Asia/Jakarta',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }
            setTime(now.toLocaleTimeString('en-US', options).toUpperCase())
        }
        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

            // Hero Animation
            tl.fromTo(topTextRef.current,
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2 }
            )
                .fromTo(nameRef.current,
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.2, stagger: 0.1 },
                    '-=0.8'
                )
                .fromTo(bottomRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 1 },
                    '-=0.5'
                )

            // About Section Animations
            // Animate Top Text (As a digital designer...)
            gsap.fromTo(aboutTopTextRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: aboutRef.current,
                        start: 'top 60%',
                    }
                }
            )

            // Animate Image
            gsap.fromTo(aboutImgRef.current,
                { clipPath: 'inset(100% 0 0 0)' },
                {
                    clipPath: 'inset(0% 0 0 0)',
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: aboutRef.current,
                        start: 'top 50%',
                    }
                }
            )

            // Animate Split Text part
            gsap.fromTo(aboutSplitTextRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: aboutTopTextRef.current,
                        start: 'bottom 75%',
                    }
                }
            )

            // Animate Bio & Link (grouped under aboutBioRef)
            gsap.fromTo(aboutBioRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.4,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: aboutSplitTextRef.current,
                        start: 'bottom 85%',
                    }
                }
            )

            // Works Section Animations
            gsap.fromTo(worksHeaderRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: worksRef.current,
                        start: 'top 70%',
                    }
                }
            )

            gsap.utils.toArray<HTMLElement>('.work-card').forEach((card, i) => {
                gsap.fromTo(card,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        delay: i * 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: worksGridRef.current,
                            start: 'top 80%',
                        }
                    }
                )
            })

            // Skills Section Animations
            gsap.fromTo(skillsHeaderRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: skillsRef.current,
                        start: 'top 70%',
                    }
                }
            )

            gsap.utils.toArray<HTMLElement>('.skill-item').forEach((item) => {
                gsap.fromTo(item,
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: Math.random() * 0.3, // Random stagger for organic feel
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: skillsListRef.current,
                            start: 'top 80%',
                        }
                    }
                )
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="min-h-screen w-full bg-background text-foreground">
            {/* HERO SECTION */}
            <section className="relative h-screen w-full flex flex-col items-center justify-between py-10 px-6 md:px-12 overflow-hidden">
                {/* Background Image (Subtle) */}
                <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
                    <img
                        src={homePageImg}
                        alt="Background"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-background/50" />
                </div>

                {/* Top Center Text */}
                <div ref={topTextRef} className="relative z-10 text-center mt-10 md:mt-16">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-serif italic text-muted mb-2">
                        A Creative Partner <span className="text-foreground not-italic font-sans text-lg md:text-xl">for companies and brands</span>
                    </h2>
                    <p className="text-foreground text-lg md:text-xl font-medium">
                        that decide to move forward.
                    </p>
                </div>

                {/* Main Name */}
                <div className="relative z-10 w-full text-center mt-auto mb-20 md:mb-10 flex flex-col items-center">
                    <h1 ref={nameRef} className="font-serif text-[clamp(4rem,10vw,12rem)] leading-[0.85] tracking-tight whitespace-nowrap">
                        Nadilla <span className="italic">Ananda</span>
                    </h1>
                </div>

                {/* Bottom Elements */}
                <div ref={bottomRef} className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end md:items-end gap-6 text-xs md:text-sm font-medium tracking-widest uppercase">
                    {/* Location / Time */}
                    <div className="order-2 md:order-1 text-muted">
                        <span>JAKARTA {time}</span>
                    </div>

                    {/* Socials */}
                    <div className="order-1 md:order-2 flex w-full md:w-auto justify-center md:justify-center gap-6 text-foreground/80 mb-6 md:mb-0">
                        <a href="#" className="hover:text-foreground transition-colors">Instagram</a>

                        <span className="text-muted">/</span>
                        <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
                        <span className="text-muted">/</span>
                        <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
                    </div>

                    {/* Spacer for Navbar */}
                    <div className="order-3 md:order-3 w-px h-px invisible"></div>
                </div>
            </section>

            {/* ABOUT ME SECTION (Section 2) */}
            <section ref={aboutRef} className="min-h-screen py-20 px-6 md:px-12 bg-background relative z-10 text-foreground flex items-center">
                <div className="max-w-[95rem] mx-auto w-full">

                    {/* Top Large Text */}
                    <div ref={aboutTopTextRef} className="mb-12 md:mb-20 text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-normal leading-[1.1] tracking-tight">
                            As a <span className="font-serif italic font-light">digital designer who codes</span>, I help brands and <br className="hidden lg:block" />
                            companies connect with their audience, achieve their-
                        </h2>
                    </div>

                    {/* Split Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">

                        {/* Image (Left) - Spans 5 cols */}
                        <div className="md:col-span-5 relative order-2 md:order-1">
                            <div className="relative w-full aspect-[4/5] overflow-hidden">
                                {/* Red Overlay Effect */}
                                <div className="absolute inset-0 bg-[#E63928] mix-blend-multiply z-10 pointer-events-none opacity-80" />
                                <img
                                    ref={aboutImgRef}
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&h=1600&fit=crop"
                                    alt="Nadilla Ananda"
                                    className="object-cover w-full h-full grayscale contrast-125"
                                />

                                <div className="absolute top-1/2 -left-8 md:-left-12 -translate-y-1/2 z-20">
                                    <span className="text-4xl md:text-6xl font-bold font-sans text-blue-400">A</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Spans 7 cols */}
                        <div className="md:col-span-7 flex flex-col justify-between order-1 md:order-2 h-full">
                            {/* Continuation Text */}
                            <div ref={aboutSplitTextRef} className="mb-16 md:mb-auto text-center md:text-left">
                                <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-normal leading-[1.1] tracking-tight">
                                    business goals, and <span className="font-serif italic font-light">leave a mark</span> <br className="hidden lg:block" />
                                    in a fast-moving world.
                                </h2>
                            </div>

                            {/* Bio & Link */}
                            <div ref={aboutBioRef} className="grid md:grid-cols-2 gap-8 items-end mt-auto">
                                <div className="space-y-8">
                                    <div className="flex justify-between items-center md:hidden">
                                        <span className="text-sm uppercase tracking-widest text-muted">(Info)</span>
                                    </div>
                                    <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light">
                                        My name is Nadilla. I’m a passionate creative who works closely with companies to help them unlock their full potential and solve specific business problems with effective and memorable design solutions.
                                    </p>
                                    <div>
                                        <Link to="/info" className="inline-block text-lg font-medium border-b border-foreground/30 pb-1 hover:border-foreground transition-colors hover:text-white">
                                            About me
                                        </Link>
                                    </div>
                                </div>

                                {/* Desktop Info Label */}
                                <div className="hidden md:flex justify-end h-full items-center">
                                    <span className="text-sm uppercase tracking-widest text-muted">(Info)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SELECTED WORKS SECTION (Section 3) */}
            <section ref={worksRef} className="py-24 md:py-32 px-6 md:px-12 bg-background relative z-10 text-foreground">
                <div className="max-w-[95rem] mx-auto w-full">
                    {/* Header */}
                    <div className="mb-16 md:mb-24">
                        <h2 ref={worksHeaderRef} className="text-5xl md:text-7xl lg:text-8xl font-sans font-normal tracking-tight">
                            Selected <span className="font-serif italic text-muted">Works</span>
                        </h2>
                    </div>

                    {/* Grid */}
                    <div ref={worksGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-12">
                        {projects.map((project) => (
                            <Link to="/work" key={project.id} className="work-card group block">
                                <div className="relative aspect-[4/3] overflow-hidden mb-6">
                                    <div className="absolute inset-0 bg-foreground/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />


                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out-expo grayscale group-hover:grayscale-0"
                                    />
                                </div>
                                <div className="flex justify-between items-end border-b border-foreground/20 pb-4 group-hover:border-foreground transition-colors duration-500">
                                    <h3 className="text-3xl md:text-4xl font-serif italic">{project.name}</h3>
                                    <span className="text-xs uppercase tracking-widest text-muted group-hover:text-foreground transition-colors duration-300">{project.category}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* KEY SKILLS & INTERESTS SECTION (Section 4) */}
            <section ref={skillsRef} className="py-24 md:py-32 px-6 md:px-12 bg-background relative z-10 text-foreground border-t border-foreground/10">
                <div className="max-w-[95rem] mx-auto w-full">
                    {/* Header */}
                    <div className="mb-16 md:mb-24">
                        <div className="text-sm uppercase tracking-widest text-muted mb-4 block">(my area of focus)</div>
                        <h2 ref={skillsHeaderRef} className="text-5xl md:text-7xl lg:text-8xl font-sans font-normal tracking-tight">
                            Key Skills & <span className="font-serif italic text-muted">Interests</span>
                        </h2>
                    </div>

                    {/* Lists Grid */}
                    <div ref={skillsListRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                        {/* Capabilities */}
                        <div>
                            <h4 className="text-xs uppercase tracking-widest text-muted mb-6 md:mb-10 pb-4 border-b border-foreground/20">Capabilities</h4>
                            <ul className="space-y-4">
                                {skills.capabilities.map((item, i) => (
                                    <li key={i} className="skill-item text-xl md:text-2xl lg:text-3xl font-light hover:text-muted transition-colors duration-300 cursor-default">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Expertise */}
                        <div>
                            <h4 className="text-xs uppercase tracking-widest text-muted mb-6 md:mb-10 pb-4 border-b border-foreground/20">Expertise</h4>
                            <ul className="space-y-4">
                                {skills.expertise.map((item, i) => (
                                    <li key={i} className="skill-item text-xl md:text-2xl lg:text-3xl font-light hover:text-muted transition-colors duration-300 cursor-default">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Inspiration */}
                        <div>
                            <h4 className="text-xs uppercase tracking-widest text-muted mb-6 md:mb-10 pb-4 border-b border-foreground/20">Inspiration</h4>
                            <ul className="space-y-4">
                                {skills.inspiration.map((item, i) => (
                                    <li key={i} className="skill-item text-xl md:text-2xl lg:text-3xl font-serif italic text-muted hover:text-foreground transition-colors duration-300 cursor-default">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION (Section 5) */}
            <section className="py-24 md:py-32 px-6 md:px-12 bg-background relative z-10 text-foreground">
                <div className="max-w-[95rem] mx-auto w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">

                        {/* Left: Heading */}
                        <div>
                            <span className="label-small mb-4 block">(Get in Touch)</span>
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-sans font-normal tracking-tighter leading-none mb-8">
                                Let's work
                                <br />
                                <span className="font-serif italic text-muted font-light">together</span>
                            </h2>
                        </div>

                        {/* Right: Contact Details */}
                        <div className="flex flex-col justify-end">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">

                                {/* Connect */}
                                <div>
                                    <h3 className="label-small mb-6 md:mb-8 border-b border-foreground/20 pb-4">Connect</h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <a href="mailto:hello@nadillaananda.com" className="text-xl md:text-2xl font-light link-hover">Email</a>
                                        </li>
                                        <li>
                                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-light link-hover">Instagram</a>
                                        </li>
                                        <li>
                                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-light link-hover">LinkedIn</a>
                                        </li>
                                        <li>
                                            <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-light link-hover">Behance</a>
                                        </li>
                                    </ul>
                                </div>

                                {/* Location & Availability */}
                                <div className="space-y-12">
                                    <div>
                                        <h3 className="label-small mb-6 md:mb-8 border-b border-foreground/20 pb-4">Location</h3>
                                        <p className="text-xl md:text-2xl font-light text-muted">
                                            Jakarta, Indonesia
                                            <br />
                                            <span className="text-base text-muted/60">Available to remote Worldwide</span>
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="label-small mb-6 md:mb-8 border-b border-foreground/20 pb-4">Availability</h3>
                                        <p className="text-xl md:text-2xl font-light flex items-center gap-3">
                                            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                                            Open for projects
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* OUTRO SECTION (Duplicate Hero) */}
            {/* OUTRO SECTION (Duplicate Hero) */}
            <section className="relative h-screen w-full flex flex-col items-center justify-between py-10 px-6 md:px-12 overflow-hidden">
                {/* Background Image (Different) */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop"
                        alt="Outro Background"
                        className="w-full h-full object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-background/80" />
                </div>

                {/* Top Section: Heading & Contact Link */}
                <div ref={topTextRef} className="relative z-10 text-center mt-10 md:mt-16">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-serif italic text-muted mb-2">
                        Have an idea? <span className="text-foreground not-italic font-sans text-lg md:text-xl">Let's make it happen</span>
                    </h2>
                    <p className="text-foreground text-lg md:text-xl font-medium">
                        Let's turn your vision into reality.
                    </p>

                    <Link to="/contact" className="text-1xl md:text-2xl font-light tracking-tight hover:italic hover:text-muted transition-all duration-300">
                        (contact me here)
                    </Link>
                </div>

                {/* Main Name */}
                <div className="relative z-10 w-full text-center mt-auto mb-20 md:mb-10 flex flex-col items-center">
                    <h1 className="font-serif text-[clamp(4rem,10vw,12rem)] leading-[0.85] tracking-tight whitespace-nowrap">
                        Nadilla <span className="italic">Ananda</span>
                    </h1>
                </div>

                {/* Bottom Elements: Socials, Copyright, Scroll Top */}
                <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-6 text-xs uppercase tracking-widest text-muted/60">

                    {/* Copyright (Left) */}
                    <div className="order-3 md:order-1 text-center md:text-left w-full md:w-auto">
                        <span>© {new Date().getFullYear()} Nadilla Ananda</span>
                    </div>

                    {/* Socials (Center) */}
                    <div className="order-2 md:order-2 flex gap-6 w-full md:w-auto justify-center">
                        <a href="https://instagram.com/s4inteves" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Instagram</a>
                        <a href="https://github.com/nadillananda" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Github</a>
                        <a href="https://www.linkedin.com/in/nadillananda/" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Linkedin</a>
                    </div>

                    {/* Scroll to Top (Right) */}
                    <div className="order-1 md:order-3 w-full md:w-auto flex justify-center md:justify-end">
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="hover:text-foreground transition-colors flex items-center gap-2"
                        >
                            Back to Top ↑
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
