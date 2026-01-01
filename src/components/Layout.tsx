import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import Lenis from 'lenis'
import Navbar from './Navbar'


interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation()
    const mainRef = useRef<HTMLDivElement>(null)
    const lenisRef = useRef<Lenis | null>(null)

    // Initialize Lenis smooth scroll
    useEffect(() => {
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })

        function raf(time: number) {
            lenisRef.current?.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenisRef.current?.destroy()
        }
    }, [])

    // Page transition animation
    useEffect(() => {
        if (mainRef.current) {
            // Scroll to top on route change
            lenisRef.current?.scrollTo(0, { immediate: true })

            // Fade in animation
            gsap.fromTo(
                mainRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                }
            )
        }
    }, [location.pathname])

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main ref={mainRef} className="will-change-transform">
                {children}
            </main>
        </div>
    )
}
