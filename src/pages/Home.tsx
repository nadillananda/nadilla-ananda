import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import introBackgroundImg from '../assets/intro-background.jpg'
import aboutProfileImg from '../assets/about-profile.jpg'
import { workEntries } from '../data/workEntries'

gsap.registerPlugin(ScrollTrigger)

const skills = {
    capabilities: ["Full-Stack Development", "UI/UX", "Media Design", "Beverage Development", "Coffee Roastery"],
    expertise: ["React.js / Next.js", "TypeScript", "MySQL / Node.js", "Tailwind CSS", "Figma"],
    inspiration: ["Cinema", "Brutalism", "Art Deco", "Music", "Art"]
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
    const aboutImgRef = useRef<HTMLImageElement>(null)
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
            // Animate Top Text (about headline)
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
                        src={introBackgroundImg}
                        alt="Background"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-background/50" />
                </div>

                {/* Top Center Text */}
                <div ref={topTextRef} className="relative z-10 text-center mt-10 md:mt-16">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-serif italic text-muted mb-2">
                        A designer who codes <span className="text-foreground not-italic font-sans text-lg md:text-xl">for companies and brands</span>
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

                {/* Bottom Elements — flex-1 on outer columns keeps socials truly centered on md */}
                <div ref={bottomRef} className="relative z-10 w-full flex flex-col md:flex-row items-end gap-6 text-xs md:text-sm font-medium tracking-widest uppercase">
                    {/* Location / Time */}
                    <div className="order-2 md:order-1 flex-1 flex justify-center md:justify-start text-muted">
                        <span>JAKARTA {time}</span>
                    </div>

                    {/* Socials */}
                    <div className="order-1 md:order-2 flex shrink-0 justify-center gap-6 text-foreground/80 mb-6 md:mb-0">
                        <a href="#" className="hover:text-foreground transition-colors">Instagram</a>

                        <span className="text-muted">/</span>
                        <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
                        <span className="text-muted">/</span>
                        <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
                    </div>

                    {/* Spacer for Navbar */}
                    <div className="order-3 md:order-3 flex-1 flex justify-center md:justify-end pointer-events-none" aria-hidden>
                        <div className="w-px h-px overflow-hidden opacity-0" />
                    </div>
                </div>
            </section>

            {/* ABOUT ME SECTION (Section 2) */}
            <section ref={aboutRef} className="min-h-screen py-20 px-6 md:px-12 bg-background relative z-10 text-foreground flex items-center">
                <div className="max-w-[95rem] mx-auto w-full">

                    {/* Top Large Text */}
                    <div ref={aboutTopTextRef} className="mb-5 md:mb-6 text-center md:text-left">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-normal leading-[1.08] md:leading-[1.04] tracking-tight text-balance">
                            <span className="font-serif italic font-light">I design, I code</span>, and I create experience that don’t just look good & appealing—
                        </h2>
                    </div>

                    {/* Split Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
                        <div className="md:col-span-5 relative order-2 md:order-1">
                            <div className="relative w-full aspect-[4/5] overflow-hidden">
                                <img
                                    ref={aboutImgRef}
                                    src={aboutProfileImg}
                                    alt="Nadilla Ananda"
                                    className="object-cover w-full h-full grayscale contrast-125"
                                />
                            </div>
                        </div>

                        {/* Right Content - Spans 7 cols */}
                        <div className="md:col-span-7 flex flex-col order-1 md:order-2">
                            {/* Continuation Text */}
                            <div ref={aboutSplitTextRef} className="-mt-2 md:-mt-3 mb-7 md:mb-8 w-full text-left text-justify">
                                <h2 className="w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-normal leading-[1.1] md:leading-[1.06] tracking-tight">
                                    but to connect, grow, and leave a lasting impression.
                                </h2>
                            </div>

                            {/* Bio & Link */}
                            <div ref={aboutBioRef} className="grid md:grid-cols-2 gap-8 items-start pt-7 md:pt-12">
                                <div className="space-y-7">
                                    <div className="flex justify-between items-center md:hidden">
                                        <span className="text-sm uppercase tracking-widest text-muted">(Info)</span>
                                    </div>
                                    <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light">
                                        My name is Nadilla, i'm a tech and design enthusiast. I believe
                                        thoughtful design with a great code can solve complex business problems
                                        and create lasting connections.
                                    </p>
                                    <div>
                                        <Link to="/info" className="inline-block text-lg font-medium border-b border-foreground/30 pb-1 hover:border-foreground transition-colors hover:text-white">
                                            About me
                                        </Link>
                                    </div>
                                </div>

                                <div className="hidden md:flex justify-end items-start pt-1">
                                    <span className="text-sm uppercase tracking-widest text-muted">(Info)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WORK PROJECTS SECTION (Section 3) */}
            <section ref={worksRef} className="py-24 md:py-32 px-6 md:px-12 bg-background relative z-10 text-foreground">
                <div className="max-w-[95rem] mx-auto w-full">
                    {/* Header */}
                    <div className="max-w-[95rem] mx-auto w-full">
                    <div className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div className="max-w-3xl">
                            <div className="text-sm uppercase tracking-widest text-muted mb-3">
                                projects
                            </div>
                            <h2 ref={worksHeaderRef} className="text-5xl md:text-7xl lg:text-8xl font-sans font-normal tracking-tight">
                            Work<span className="font-serif italic text-muted"> Projects</span>
                        </h2>
                            <p className="mt-4 md:mt-5 text-sm md:text-base text-muted leading-relaxed font-light max-w-2xl">
                                Web/app and full-stack builds work that shows how i ship end to end.
                            </p>
                        </div>
                    </div>
                    </div>

                    {/* Grid — compact cards; max width keeps scale slightly smaller on very wide screens */}
                    <div ref={worksGridRef} className="mx-auto max-w-[85rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
                        {workEntries.slice(0, 3).map((entry) => (
                            <Link
                                to="/work"
                                key={entry.name}
                                className="work-card group block rounded-lg overflow-hidden border border-foreground/[0.08] bg-foreground/[0.02] hover:bg-foreground/[0.04] hover:border-foreground/15 transition-colors shadow-sm shadow-black/5"
                            >
                                <div className="relative flex items-center justify-center aspect-[5/3] bg-foreground/[0.05] overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-50 group-hover:opacity-25 transition-opacity duration-500 z-10 pointer-events-none" />
                                    <img
                                        src={`/${entry.name}.png`}
                                        alt={entry.title}
                                        className="w-full h-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.02] grayscale group-hover:grayscale-0"
                                    />
                                </div>

                                <div className="p-3 md:p-4">
                                    <div className="flex items-center justify-between gap-3 mb-1.5">
                                        <span className="text-[10px] md:text-xs uppercase tracking-widest text-muted group-hover:text-foreground/80 transition-colors whitespace-nowrap">
                                            {entry.category}
                                        </span>
                                        <span className="text-[10px] font-mono text-muted/60 group-hover:text-muted transition-colors whitespace-nowrap">
                                            View
                                        </span>
                                    </div>

                                    <div className="flex items-end justify-between gap-3 border-b border-foreground/10 pb-2.5 group-hover:border-foreground/25 transition-colors">
                                        <h3 className="text-lg md:text-xl font-serif italic leading-snug pr-2">
                                            {entry.title}
                                        </h3>
                                        <span className="text-[10px] uppercase tracking-widest text-muted group-hover:text-foreground transition-colors shrink-0">
                                            →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="sm:hidden mt-8">
                        <Link
                            to="/work"
                            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors pb-1 border-b border-foreground/15 hover:border-foreground/40"
                        >
                            See more
                            <span className="translate-x-0 hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* COURSES & CERTIFICATES HIGHLIGHT (Section 4) */}
            <section className="py-16 md:py-20 px-6 md:px-12 bg-background relative z-10 text-foreground border-t border-foreground/10">
                <div className="max-w-[95rem] mx-auto w-full">
                    <div className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <div className="text-sm uppercase tracking-widest text-muted mb-3">
                                Learning Journey
                            </div>
                            <h2 ref={worksHeaderRef} className="text-5xl md:text-7xl lg:text-8xl font-sans font-normal tracking-tight">
                            Courses &<span className="font-serif italic text-muted"> Certificates</span>
                        </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {/* Course Card */}
                        <Link
                            to="/info"
                            className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.05] transition-colors p-6 md:p-7"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="flex items-center justify-between gap-4 mb-4">
                                <span className="text-xs uppercase tracking-widest text-muted">
                                    Course
                                </span>
                                <span className="text-[11px] font-mono text-muted/70">
                                    Completed
                                </span>
                            </div>

                            <h3 className="text-xl md:text-2xl font-serif italic mb-2">
                            AI for Productivity & API Integration
                            </h3>
                            <p className="text-sm md:text-base text-muted mb-4">
                                Deepening skills in Express.JS, Postman, consistent LLM systems, and interactive chatbot UI.
                            </p>

                            <div className="flex items-center justify-between text-xs text-muted/80">
                                <span>Online programs</span>
                                <span className="inline-flex items-center gap-1 group-hover:text-foreground transition-colors">
                                    View details
                                    <span className="translate-x-0 group-hover:translate-x-1 transition-transform">
                                        →
                                    </span>
                                </span>
                            </div>
                        </Link>

                        {/* Certificate Card */}
                        <Link
                            to="/info"
                            className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.05] transition-colors p-6 md:p-7"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="flex items-center justify-between gap-4 mb-4">
                                <span className="text-xs uppercase tracking-widest text-muted">
                                    Certificate
                                </span>
                                <span className="text-[11px] font-mono text-muted/70">
                                    Selected
                                </span>
                            </div>

                            <h3 className="text-xl md:text-2xl font-serif italic mb-2">
                                EFSet English Certificate
                            </h3>
                            <p className="text-sm md:text-base text-muted mb-4">
                                Certification in communication, reading, writing, listening, and has successfully reached C1 english level.
                            </p>

                            <div className="flex items-center justify-between text-xs text-muted/80">
                                <span>Self-paced and online programs</span>
                                <span className="inline-flex items-center gap-1 group-hover:text-foreground transition-colors">
                                    View details
                                    <span className="translate-x-0 group-hover:translate-x-1 transition-transform">
                                        →
                                    </span>
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* KEY SKILLS & INTERESTS SECTION (Section 5) */}
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

            {/* CONTACT SECTION (final / outro) */}
            <section className="relative min-h-screen w-full flex flex-col justify-between py-10 px-6 md:px-12 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
                    <img
                        src={introBackgroundImg}
                        alt="Contact Background"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-background/50" />
                </div>

                <div className="relative z-10 w-full max-w-[95rem] mx-auto pt-12 md:pt-16">
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
                                            <a href="mailto:747nadillananda@gmail.com" className="text-xl md:text-2xl font-light link-hover">Email</a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/s4inteves/" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-light link-hover">Instagram</a>
                                        </li>
                                        <li>
                                            <a href="https://www.linkedin.com/in/nadillananda/" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-light link-hover">LinkedIn</a>
                                        </li>
                                        <li>
                                            <a href="https://github.com/nadillananda" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-light link-hover">GitHub</a>
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
                                            <span className="text-base text-muted/60">Available to remote worldwide</span>
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

                {/* Bottom bar: copyright left, back-to-top right */}
                <div className="relative z-10 w-full max-w-[95rem] mx-auto flex items-end justify-between gap-6 text-xs uppercase tracking-widest text-muted/60 pb-2">
                    <div className="text-left">
                        <span>© {new Date().getFullYear()} Nadilla Ananda</span>
                    </div>
                    <div className="flex justify-end">
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
