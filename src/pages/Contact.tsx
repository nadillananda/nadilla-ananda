import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import emailjs from '@emailjs/browser'

declare global {
    interface Window {
        grecaptcha: {
            ready: (callback: () => void) => void
            execute: (siteKey: string, options: { action: string }) => Promise<string>
            render: (element: HTMLElement, options: { sitekey: string; callback: (token: string) => void }) => number
            reset: (widgetId: number) => void
        }
    }
}

const socialLinks = [
    { name: 'Email', url: 'mailto:747nadillananda@gmail.com' },
    { name: 'Instagram', url: 'https://www.instagram.com/s4inteves/' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nadillananda/' },
    { name: 'GitHub', url: 'https://github.com/nadillananda' },
]

// EmailJS Configuration - Replace these with your actual EmailJS credentials
// Get these from https://dashboard.emailjs.com/admin
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || 'YOUR_RECAPTCHA_SITE_KEY'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)
    const captchaRef = useRef<HTMLDivElement>(null)
    const captchaWidgetId = useRef<number | null>(null)

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

    // Initialize reCAPTCHA
    useEffect(() => {
        if (captchaRef.current && window.grecaptcha && RECAPTCHA_SITE_KEY !== 'YOUR_RECAPTCHA_SITE_KEY') {
            window.grecaptcha.ready(() => {
                if (captchaRef.current) {
                    captchaWidgetId.current = window.grecaptcha.render(captchaRef.current, {
                        sitekey: RECAPTCHA_SITE_KEY,
                        callback: (token: string) => {
                            setCaptchaToken(token)
                        },
                    })
                }
            })
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // Check if captcha is verified
        if (!captchaToken) {
            setErrorMessage('Please complete the captcha verification')
            setSubmitStatus('error')
            return
        }

        // Check if EmailJS is configured
        if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            setErrorMessage('Email service is not configured. Please set up EmailJS credentials.')
            setSubmitStatus('error')
            return
        }

        setIsSubmitting(true)
        setSubmitStatus('idle')
        setErrorMessage('')

        try {
            // Prepare email template parameters
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_email: '747nadillananda@gmail.com',
                'g-recaptcha-response': captchaToken,
            }

            // Send email using EmailJS
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            )

            // Success
            setSubmitStatus('success')
            setFormData({ name: '', email: '', message: '' })
            setCaptchaToken(null)
            
            // Reset captcha
            if (captchaWidgetId.current !== null && window.grecaptcha) {
                window.grecaptcha.reset(captchaWidgetId.current)
            }

            // Reset status after 5 seconds
            setTimeout(() => {
                setSubmitStatus('idle')
            }, 5000)
        } catch (error) {
            console.error('Email sending failed:', error)
            setErrorMessage('Failed to send message. Please try again or contact directly via email.')
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
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
                        <label className="label-small mb-2 block">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Your Name"
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

                    {/* reCAPTCHA */}
                    <div className="mt-6">
                        <div ref={captchaRef} className="flex justify-start"></div>
                        {!captchaToken && submitStatus === 'error' && errorMessage.includes('captcha') && (
                            <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting || !captchaToken}
                        className="mt-8 px-8 py-4 bg-foreground text-background font-medium text-sm 
                       tracking-wide uppercase hover:bg-foreground/90 transition-colors duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                        <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 text-green-500">
                            <p className="text-sm">Message sent successfully! I'll get back to you soon.</p>
                        </div>
                    )}
                    {submitStatus === 'error' && errorMessage && !errorMessage.includes('captcha') && (
                        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 text-red-500">
                            <p className="text-sm">{errorMessage}</p>
                        </div>
                    )}
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
