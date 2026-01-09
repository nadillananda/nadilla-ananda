import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const socialLinks = [
    { name: 'Email', url: 'mailto:747nadillananda@gmail.com' },
    { name: 'Instagram', url: 'https://www.instagram.com/s4inteves/' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nadillananda/' },
    { name: 'GitHub', url: 'https://github.com/nadillananda' },
]

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })

    const titleRef = useRef<HTMLHeadingElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const linksRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

            tl.fromTo(
                titleRef.current,
                { y: 80, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 }
            )
                .fromTo(
                    formRef.current,
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    '-=0.5'
                )
                .fromTo(
                    linksRef.current,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    '-=0.4'
                )
        })

        return () => ctx.revert()
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log('Form submitted:', formData)
        alert('Thank you for your message! I\'ll get back to you soon.')
        setFormData({ name: '', email: '', message: '' })
    }

    return (
        <div className="page-container pt-32 md:pt-40 min-h-screen">
            {/* Header */}
            <section className="mb-16 md:mb-24">
                <span className="label-small mb-4 block">Get in Touch</span>
                <h1
                    ref={titleRef}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
                >
                    Let's work
                    <br />
                    together
                </h1>
            </section>

            {/* Main Content */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pb-20 md:pb-32">
                {/* Contact Form */}
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="lg:col-span-7 space-y-8"
                >
                    {/* Name Input */}
                    <div className="relative">
                        <label className="label-small mb-2 block">Your Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Nadilla Ananda"
                            required
                            className="w-full bg-transparent border-b border-foreground/20 py-4 text-lg 
                         focus:outline-none focus:border-foreground transition-colors duration-300
                         placeholder:text-muted/50"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                        <label className="label-small mb-2 block">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            placeholder="hello@example.com"
                            required
                            className="w-full bg-transparent border-b border-foreground/20 py-4 text-lg 
                         focus:outline-none focus:border-foreground transition-colors duration-300
                         placeholder:text-muted/50"
                        />
                    </div>

                    {/* Message Input */}
                    <div className="relative">
                        <label className="label-small mb-2 block">Your Message</label>
                        <textarea
                            value={formData.message}
                            onChange={(e) =>
                                setFormData({ ...formData, message: e.target.value })
                            }
                            placeholder="Tell me about your project..."
                            required
                            rows={4}
                            className="w-full bg-transparent border-b border-foreground/20 py-4 text-lg 
                         focus:outline-none focus:border-foreground transition-colors duration-300
                         placeholder:text-muted/50 resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-8 px-8 py-4 bg-foreground text-background font-medium text-sm 
                       tracking-wide uppercase hover:bg-foreground/90 transition-colors duration-300"
                    >
                        Send Message
                    </button>
                </form>

                {/* Social Links */}
                <div ref={linksRef} className="lg:col-span-5">
                    <h3 className="label-small mb-8">Connect</h3>
                    <ul className="space-y-4">
                        {socialLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.url}
                                    target={link.url.startsWith('mailto') ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    className="text-2xl md:text-3xl font-medium link-hover block py-2"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-16">
                        <h3 className="label-small mb-4">Location</h3>
                        <p className="text-lg text-muted">
                            Available worldwide
                            <br />
                            Based in Jakarta, Indonesia
                        </p>
                    </div>

                    <div className="mt-12">
                        <h3 className="label-small mb-4">Availability</h3>
                        <p className="text-lg">
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2" />
                            Open for new projects
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
