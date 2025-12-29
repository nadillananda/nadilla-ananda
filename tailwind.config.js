/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0D0D0D',
                foreground: '#F5F5F5',
                muted: '#666666',
                accent: '#999999',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            fontSize: {
                'xs': ['0.625rem', { lineHeight: '1.4', letterSpacing: '0.1em' }],
                'sm': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
                'base': ['1rem', { lineHeight: '1.6' }],
                'lg': ['1.125rem', { lineHeight: '1.5' }],
                'xl': ['1.25rem', { lineHeight: '1.4' }],
                '2xl': ['1.5rem', { lineHeight: '1.3' }],
                '3xl': ['2rem', { lineHeight: '1.2' }],
                '4xl': ['2.5rem', { lineHeight: '1.1' }],
                '5xl': ['3.5rem', { lineHeight: '1.05' }],
                '6xl': ['4.5rem', { lineHeight: '1' }],
                '7xl': ['6rem', { lineHeight: '0.95' }],
                '8xl': ['8rem', { lineHeight: '0.9' }],
                '9xl': ['10rem', { lineHeight: '0.85' }],
                '10xl': ['12rem', { lineHeight: '0.8' }],
            },
            letterSpacing: {
                'tightest': '-0.05em',
                'tighter': '-0.025em',
                'tight': '-0.015em',
                'wide': '0.05em',
                'wider': '0.1em',
                'widest': '0.2em',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '30': '7.5rem',
            },
            transitionDuration: {
                '400': '400ms',
                '600': '600ms',
                '800': '800ms',
            },
            transitionTimingFunction: {
                'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
                'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
            },
        },
    },
    plugins: [],
}
