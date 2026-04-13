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
    { role: 'Full-Stack Developer', company: 'Mitra Bisnis', period: 'Nov, 2025 - Present' },
    { role: 'IT Support', company: 'PT. Asahi Mitra Industri', period: 'Nov, 2025 [PROJECT]' },
    { role: 'Full-Time Barista', company: 'Navigasi Coffee', period: 'March 2024 - August 2025' },
    { role: 'Office Administrator', company: 'PT. Octo Corindo', period: 'February, 2019 - February, 2020]' },
]

const courses = [
    {
        title: 'AI for Productivity & API Integration',
        provider: 'Hacktiv8',
        status: 'Completed',
        focus: 'Express.JS, Postman, LLM, and interaction design.',
    },
    {
        title: 'AI and n8n Automation',
        provider: 'MySkill',
        status: 'Completed',
        focus: 'Wireframing, prototyping n8n, and usability.',
    },
    {
            title: 'PHP, HTML & CSS',
            provider: 'Progate',
            status: 'Completed',
            focus: 'Website design and responsive workflows',
    },
]

const certificates = [
    {
        title: 'English Test',
        issuer: 'EF SET',
        year: '2025',
        note: 'Succesfully earned C1 English Level.',
    },
    {
        title: 'Software Engineering',
        issuer: 'RevoU',
        year: '2025',
        note: 'Visual communication within codes using JavaScript.',
    },
    {
        title: 'HTML & CSS',
        issuer: 'Dibimbing',
        year: '2025',
        note: 'Website Design, HTML & CSS.',
    },
    {
        title: 'Ms. Office and E-mail Training',
        issuer: 'Academy',
        year: '2020',
        note: 'Data entries, wording, and intermediate Ms. Excel formulas.',
    },
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
                        Hi, you can call me Nadilla :D
                    </p>
                    <p className="text-lg text-muted leading-relaxed mb-8">
                        I specialize in creating brand identities with web experiences. I believe
                        in the power of thoughtful design to solve complex business problems
                        and create lasting connections with audiences.
                    </p>
                    <p className="text-lg text-muted leading-relaxed">
                        When I'm not doing my work, you'll find me exploring about specialty coffee and roastery.
                        Besides of that, i love to read, play instruments, catching moment, learning with new creative
                        tools, and technologies.
                    </p>
                </div>

                {/* Right Column - Details */}
                <div ref={detailsRef} className="lg:col-span-6 space-y-16">
                    {/* Experience */}
                    <div className="info-section">
                        <h3 className="label-small mb-6">Professional Experience</h3>
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

                    {/* Services */}
                    <div className="info-section">
                        <h3 className="label-small mb-6">Services &amp; focus</h3>
                        <ul className="flex flex-wrap gap-2">
                            {services.map((item) => (
                                <li
                                    key={item}
                                    className="text-sm px-3 py-1.5 rounded-full border border-foreground/15 text-muted"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Awards */}
                    <div className="info-section">
                        <h3 className="label-small mb-6">Awards</h3>
                        <ul className="space-y-4">
                            {awards.map((award) => (
                                <li
                                    key={award.name + award.year}
                                    className="border-b border-foreground/10 pb-4 last:border-0 last:pb-0"
                                >
                                    <p className="font-medium">{award.name}</p>
                                    <p className="text-muted text-sm mt-1">{award.project}</p>
                                    <span className="text-muted text-xs">{award.year}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Courses & Certificates */}
            <section className="pb-24 md:pb-32 border-t border-foreground/10 pt-16 md:pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                    {/* Courses */}
                    <div className="info-section">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="label-small">Courses</h3>
                            <span className="text-xs uppercase tracking-widest text-muted">
                                Learning
                            </span>
                        </div>
                        <div className="space-y-4">
                            {courses.map((course) => (
                                <article
                                    key={course.title}
                                    className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5 md:p-6 hover:bg-foreground/[0.04] transition-colors"
                                >
                                    <div className="flex items-center justify-between gap-4 mb-2">
                                        <h4 className="font-medium">{course.title}</h4>
                                        <span className="text-[11px] font-mono text-muted/70">
                                            {course.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted mb-2">
                                        {course.provider}
                                    </p>
                                    <p className="text-sm text-muted/80">
                                        {course.focus}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* Certificates */}
                    <div className="info-section">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="label-small">Certificates</h3>
                            <span className="text-xs uppercase tracking-widest text-muted">
                                Selected
                            </span>
                        </div>
                        <div className="space-y-4">
                            {certificates.map((certificate) => (
                                <article
                                    key={certificate.title + certificate.year}
                                    className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5 md:p-6 hover:bg-foreground/[0.04] transition-colors"
                                >
                                    <div className="flex items-center justify-between gap-4 mb-2">
                                        <h4 className="font-medium">{certificate.title}</h4>
                                        <span className="text-[11px] font-mono text-muted/70">
                                            {certificate.year}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted mb-2">
                                        {certificate.issuer}
                                    </p>
                                    <p className="text-sm text-muted/80">
                                        {certificate.note}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
