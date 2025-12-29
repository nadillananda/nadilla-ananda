import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// All projects data
const projects = [
    {
        id: 1,
        name: 'Denderty Official',
        category: 'Web Design',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=1000&fit=crop',
    },
    {
        id: 2,
        name: 'Maxima Legal',
        category: 'Brand Identity',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1634017839464-5c339afa5e6a?w=800&h=1000&fit=crop',
    },
    {
        id: 3,
        name: 'White Stone',
        category: 'Website',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=1000&fit=crop',
    },
    {
        id: 4,
        name: 'AZPO Estate',
        category: 'Brand & Web',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800&h=1000&fit=crop',
    },
    {
        id: 5,
        name: 'The Anix',
        category: 'Music Artist',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=1000&fit=crop',
    },
    {
        id: 6,
        name: 'Shadxw',
        category: 'Brand Identity',
        year: '2022',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=1000&fit=crop',
    },
    {
        id: 7,
        name: 'Elkruff',
        category: 'E-commerce',
        year: '2022',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=1000&fit=crop',
    },
    {
        id: 8,
        name: 'Orto Medical',
        category: 'Healthcare',
        year: '2022',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=1000&fit=crop',
    },
]

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
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                )
            })
        })

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
                    Selected Work
                </h1>
                <p className="text-muted text-lg mt-6 max-w-xl">
                    A curated collection of projects spanning brand identity, web design,
                    and digital experiences.
                </p>
            </section>

            {/* Projects Grid */}
            <section ref={gridRef} className="pb-20 md:pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {projects.map((project) => (
                        <article key={project.id} className="work-card group cursor-pointer">
                            {/* Image Container */}
                            <div className="relative aspect-[4/5] overflow-hidden mb-4">
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500" />
                            </div>

                            {/* Project Info */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-1 group-hover:text-muted transition-colors duration-300">
                                        {project.name}
                                    </h3>
                                    <p className="text-muted text-sm">{project.category}</p>
                                </div>
                                <span className="text-muted text-sm">{project.year}</span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    )
}
