import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import { workEntries } from '../data/workEntries'

export default function Work() {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            gsap.fromTo(
                titleRef.current,
                { y: 80, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
            )

            // Grid items animation
            gsap.utils.toArray<HTMLElement>('.work-card').forEach((card, i) => {
                gsap.fromTo(
                    card,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                )
            })
        }, gridRef) // Scope to gridRef if possible, or main container

        return () => ctx.revert()
    }, [])

    return (
        <div className="page-container pt-32 md:pt-40">
            {/* Header */}
            <section className="mb-16 md:mb-24">
                <span className="label-small mb-4 block">Portfolio</span>
                <h1
                    ref={titleRef}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
                >
                    Work Projects
                </h1>
                <p className="text-muted text-lg mt-6 max-w-xl text-justify">
                    A curated collection of my professional web and app projects.
                </p>
            </section>

            {/* Projects Grid — cards from src/data/workEntries.ts (name = image filename, link = URL) */}
            <section ref={gridRef} className="pb-20 md:pb-32 border-b border-foreground/10 mb-20 md:mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {workEntries.map((entry) => (
                        entry.link ? (
                            <a
                                href={entry.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={entry.name}
                                className="work-card group block relative rounded-xl overflow-hidden border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-colors"
                            >
                                <div className="relative flex items-center justify-center min-h-[220px] sm:min-h-[260px] aspect-[4/3] bg-foreground/[0.06] overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-10 pointer-events-none" />
                                    <img
                                        src={`/${entry.name}.png`}
                                        alt={entry.title}
                                        className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02] grayscale group-hover:grayscale-0"
                                    />
                                </div>

                            {/* Noir Overlay (Black Background) */}
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

                            {/* Text Content (White on Black) */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 z-10">
                                <span className="text-white/60 text-xs uppercase tracking-widest mb-4">
                                    {entry.category}
                                </span>

                                <h3 className="text-3xl font-serif italic text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                                    {entry.title}
                                </h3>

                                <div className="w-8 h-px bg-white/30 my-6" />

                                <p className="text-white/90 text-sm font-light leading-relaxed max-w-[80%] translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                                    {entry.description}
                                </p>

                                <span className="absolute bottom-8 text-white/40 text-xs font-mono">
                                    Open →
                                </span>
                            </div>
                            </a>
                        ) : (
                            <div
                                key={entry.name}
                                className="work-card group block relative rounded-xl overflow-hidden border border-foreground/10 bg-foreground/[0.02]"
                            >
                                <div className="relative flex items-center justify-center min-h-[220px] sm:min-h-[260px] aspect-[4/3] bg-foreground/[0.06] overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
                                    <img
                                        src={`/${entry.name}.png`}
                                        alt={entry.title}
                                        className="w-full h-full object-contain grayscale contrast-125"
                                    />
                                </div>

                                <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center z-10">
                                    <span className="text-foreground/60 text-xs uppercase tracking-widest mb-4">
                                        {entry.category}
                                    </span>

                                    <h3 className="text-3xl font-serif italic text-foreground mb-2">
                                        {entry.title}
                                    </h3>

                                    <div className="w-8 h-px bg-foreground/20 my-6" />

                                    <p className="text-foreground/90 text-sm font-light leading-relaxed max-w-[80%]">
                                        {entry.description}
                                    </p>

                                    <span className="absolute bottom-8 text-muted/60 text-xs font-mono">
                                        Display
                                    </span>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </section>
        </div>
    )
}
