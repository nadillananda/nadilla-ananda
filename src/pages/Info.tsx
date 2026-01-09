import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Data
const services = [
    'Development',
    'UI/UX',
    'Design',
    'Beverage Development',
    'Coffee Roastery',
]

const awards = [
    { name: 'Best Composition for Short Films', project: 'Jeya Short Movie', year: '2020' },
]

const experience = [
    { role: 'IT Support', company: 'PT. Asahi Mitra Industri', period: 'Nov, 2025 [PROJECT]' },
    { role: 'Full-Time Barista', company: 'Navigasi Coffee', period: 'March 2024 - August 2025' },
    { role: 'Modelling', company: 'Red Horse', period: 'February, 2024 [PROJECT]' },
    { role: 'Office Administrator', company: 'PT. Octo Corindo', period: 'February, 2019 - February, 2020]' },
]

export default function Info() {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const bioRef = useRef<HTMLDivElement>(null)
    const detailsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

            tl.fromTo(
                titleRef.current,
                { y: 80, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 }
            )
                .fromTo(
                    bioRef.current,
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    '-=0.5'
                )

            // Animate detail sections on scroll
            gsap.utils.toArray<HTMLElement>('.info-section').forEach((section) => {
                gsap.fromTo(
                    section,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        scrollTrigger: {
                            trigger: section,
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
            <section className="mb-20 md:mb-32">
                <span className="label-small mb-4 block">About</span>
                <h1
                    ref={titleRef}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
                >
                    Info
                </h1>
            </section>

            {/* Main Content - Split Layout */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pb-20 md:pb-32">
                {/* Left Column - Bio */}
                <div ref={bioRef} className="lg:col-span-6">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed tracking-tight mb-8">
                        You can call me Nadilla ^^
                    </p>
                    <p className="text-lg text-muted leading-relaxed mb-8">
                        I specialize in creating brand identities with web experiences. I believe
                        in the power of thoughtful design to solve complex business problems
                        and create lasting connections with audiences.
                    </p>
                    <p className="text-lg text-muted leading-relaxed">
                        When I'm not doing my work, you'll find me exploring specialty coffee and all about technology.
                        Besides that, i love to read, play instruments or learning with new creative
                        tools, and technologies.
                    </p>
                </div>

                {/* Right Column - Details */}
                <div ref={detailsRef} className="lg:col-span-6 space-y-16">
                    {/* Services */}
                    <div className="info-section">
                        <h3 className="label-small mb-6">Services</h3>
                        <ul className="space-y-3">
                            {services.map((service, i) => (
                                <li
                                    key={service}
                                    className="text-lg flex items-center gap-4 group"
                                >
                                    <span className="text-muted text-sm">(0{i + 1})</span>
                                    <span className="group-hover:text-muted transition-colors duration-300">
                                        {service}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Awards */}
                    <div className="info-section">
                        <h3 className="label-small mb-6">Recognition</h3>
                        <ul className="space-y-4">
                            {awards.map((award) => (
                                <li
                                    key={award.name + award.year}
                                    className="flex items-center justify-between border-b border-foreground/10 pb-4"
                                >
                                    <div>
                                        <p className="font-medium">{award.name}</p>
                                        <p className="text-muted text-sm">{award.project}</p>
                                    </div>
                                    <span className="text-muted text-sm">{award.year}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Experience */}
                    <div className="info-section">
                        <h3 className="label-small mb-6">Experience</h3>
                        <ul className="space-y-4">
                            {experience.map((exp) => (
                                <li
                                    key={exp.role + exp.company}
                                    className="flex items-center justify-between border-b border-foreground/10 pb-4"
                                >
                                    <div>
                                        <p className="font-medium">{exp.role}</p>
                                        <p className="text-muted text-sm">{exp.company}</p>
                                    </div>
                                    <span className="text-muted text-sm">{exp.period}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}
