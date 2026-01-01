import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const location = useLocation()
    const [isScrolled, setIsScrolled] = useState(false)
    const isHome = location.pathname === '/'

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight - 100) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const positionClass = isHome && !isScrolled ? 'translate-y-[calc(100vh-100%)]' : 'translate-y-0'

    return (
        <header className={`fixed top-0 right-0 z-50 p-6 md:p-10 mix-blend-difference transition-transform duration-700 ease-in-out ${positionClass}`}>
            <nav>
                <ul className="flex items-center gap-6 md:gap-8">
                    {[
                        { name: 'HOME', path: '/' },
                        { name: 'WORK', path: '/work' },
                        { name: 'INFO', path: '/info' },
                        { name: 'CONTACT', path: '/contact' }
                    ].map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`text-xs md:text-sm font-medium tracking-wide transition-opacity duration-300 ${location.pathname === link.path
                                    ? 'text-foreground'
                                    : 'text-foreground/70 hover:text-foreground'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}
