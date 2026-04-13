import { useRef, useState } from 'react'

import introBackgroundImg from '../assets/intro-background.jpg'

const socialLinks = [
    { name: 'Email', url: 'mailto:747nadillananda@gmail.com' },
    { name: 'Instagram', url: 'https://www.instagram.com/s4inteves/' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nadillananda/' },
    { name: 'GitHub', url: 'https://github.com/nadillananda' },
]

export default function Contact() {
    const SHOW_CONTACT_FORM = false
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const titleRef = useRef<HTMLHeadingElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const linksRef = useRef<HTMLDivElement>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMessage('')
        setSubmitStatus('idle')
        setIsSubmitting(true)

        try {
            // EmailJS intentionally disabled only on this page.
            // Use a mailto fallback so the content stays functional without exposing EmailJS keys.
            const subject = `Portfolio inquiry from ${formData.name || 'Someone'}`
            const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
            const mailto = `mailto:747nadillananda@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                body
            )}`
            window.location.href = mailto

            await new Promise((r) => setTimeout(r, 400))
            setSubmitStatus('success')
            setFormData({ name: '', email: '', message: '' })
            setTimeout(() => setSubmitStatus('idle'), 5000)
        } catch (err) {
            setSubmitStatus('error')
            setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    src={introBackgroundImg}
                    alt="Contact background"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-background/60" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/70" />
            </div>

            <div className="relative z-10 max-w-[95rem] mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-10 md:pb-12">
                {/* Header */}
                <section className="mb-10 md:mb-14">
                    <span className="label-small mb-4 block">(Get in Touch)</span>
                    <h1
                        ref={titleRef}
                        className="text-5xl md:text-7xl lg:text-8xl font-sans font-normal tracking-tighter leading-[0.95]"
                    >
                        Let's connect 
                        <span className="font-serif italic text-muted font-light"> together</span>
                    </h1>
                </section>

                {/* Main */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    {/* Left: editorial copy + meta */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="space-y-4 max-w-xl">
                            <h2 className="text-xl md:text-2xl font-light text-foreground/90 leading-snug">
                                I&apos;m open to collaborations, freelance work, and full-time opportunities.
                            </h2>
                            <p className="text-base md:text-lg text-muted leading-relaxed">
                                If you have a product to build, a brand to refine, or a web experience to ship, send a
                                note. I reply as soon as possible.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 rounded-2xl border border-foreground/10 bg-foreground/[0.04] backdrop-blur-sm px-6 py-6 md:px-7 md:py-7">
                            <div>
                                <h3 className="label-small mb-3">Location</h3>
                                <p className="text-base md:text-lg text-muted leading-relaxed">
                                    Jakarta, Indonesia
                                    <br />
                                    <span className="text-sm text-muted/70">Available worldwide</span>
                                </p>
                            </div>

                            <div>
                                <h3 className="label-small mb-3">Availability</h3>
                                <p className="text-base md:text-lg flex items-center gap-2">
                                    <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_14px_rgba(34,197,94,0.75)]" />
                                    Open for projects
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: links (and optional form) */}
                    <div ref={linksRef} className="lg:col-span-7 lg:col-start-6">
                        <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.04] backdrop-blur-sm p-6 md:p-8">
                            <div className="flex items-baseline justify-between gap-6 mb-6">
                                <h3 className="label-small">Connect</h3>
                                <span className="text-xs uppercase tracking-[0.25em] text-muted/70">
                                    Prefer email
                                </span>
                            </div>

                            <ul className="divide-y divide-foreground/10">
                                {socialLinks.map((link) => (
                                    <li key={link.name} className="py-4">
                                        <a
                                            href={link.url}
                                            target={link.url.startsWith('mailto') ? undefined : '_blank'}
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-between gap-6"
                                        >
                                            <div className="flex items-baseline gap-4">
                                                <span className="text-2xl md:text-3xl font-serif italic text-foreground group-hover:text-white transition-colors">
                                                    {link.name}
                                                </span>
                                                <span className="hidden md:inline text-sm text-muted group-hover:text-foreground/80 transition-colors">
                                                    {link.url.startsWith('mailto') ? 'Send a message' : 'Open profile'}
                                                </span>
                                            </div>
                                            <span className="text-xs uppercase tracking-[0.25em] text-muted group-hover:text-foreground transition-colors">
                                                →
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            {/* Contact Form (kept for later) */}
                            {SHOW_CONTACT_FORM && (
                                <form
                                    ref={formRef}
                                    onSubmit={handleSubmit}
                                    className="mt-10 pt-8 border-t border-foreground/10 space-y-7"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="relative">
                                            <label className="label-small mb-2 block">Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Your Name"
                                                required
                                                className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted/50"
                                            />
                                        </div>

                                        <div className="relative">
                                            <label className="label-small mb-2 block">Email</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="hello@example.com"
                                                required
                                                className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted/50"
                                            />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="label-small mb-2 block">Message</label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Tell me about your project..."
                                            required
                                            rows={4}
                                            className="w-full bg-transparent border-b border-foreground/20 py-3 text-lg focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted/50 resize-none"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between gap-6">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="inline-flex items-center justify-center rounded-full px-8 py-3 bg-foreground text-background text-xs font-medium tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? 'Preparing email...' : 'Send Message'}
                                        </button>
                                        <span className="text-xs text-muted/70">
                                            Sends via your email client (mailto)
                                        </span>
                                    </div>

                                    {submitStatus === 'success' && (
                                        <div className="p-4 bg-green-500/10 border border-green-500/30 text-green-500 rounded-lg text-sm">
                                            Your email client should open now. If it didn’t, use the “Email” link above.
                                        </div>
                                    )}
                                    {submitStatus === 'error' && errorMessage && (
                                        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg text-sm">
                                            {errorMessage}
                                        </div>
                                    )}
                                </form>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
