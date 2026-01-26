import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import { projects } from '../data/projects'

// ... existing component logic ...

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
                    A curated collection of projects.
                </p>
            </section>

            {/* Projects Grid */}
            <section ref={gridRef} className="pb-20 md:pb-32 border-b border-foreground/10 mb-20 md:mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {projects.map((project) => (
                        <article key={project.id} className="work-card group cursor-pointer relative aspect-[4/5] overflow-hidden bg-gray-100">
                            {/* Background Image */}
                            <img
                                src={project.image}
                                alt={project.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                            />

                            {/* Noir Overlay (Black Background) */}
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

                            {/* Text Content (White on Black) */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 z-10">
                                <span className="text-white/60 text-xs uppercase tracking-widest mb-4">
                                    {project.category}
                                </span>

                                <h3 className="text-3xl font-serif italic text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                                    {project.name}
                                </h3>

                                <div className="w-8 h-px bg-white/30 my-6" />

                                <p className="text-white/90 text-sm font-light leading-relaxed max-w-[80%] translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                                    {project.description}
                                </p>

                                <span className="absolute bottom-8 text-white/40 text-xs font-mono">
                                    {project.year}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    )
}
