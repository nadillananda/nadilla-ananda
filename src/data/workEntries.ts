/**
 * Work project cards — manually add/update entries here.
 * Each `name` must match the image filename in /public (e.g. name.png) and is used for the card key.
 */
export interface WorkEntry {
    name: string
    title: string
    category: string
    description: string
    link?: string
}

export const workEntries: WorkEntry[] = [
    {
        name: 'nexterp',
        title: 'Next.ERP',
        category: 'ERP',
        description: 'ERP system for business and production management.',
        link: 'https://erp.mitrabisnis.net/',
    },
    {
        name: 'production-dashboard',
        title: 'Production Dashboard',
        category: 'Dashboard',
        description: 'Visual monitoring dashboard for part production in real time.',
        link: 'https://dashboard.asi.mitrabisnis.net/',
    },
    {
        name: 'attendance-tracker',
        title: 'eGPS Presensi',
        category: 'Attendance',
        description: 'GPS-based attendance and activity tracking application.',
        link: 'https://atd.mitrabisnis.net/',
    },
    {
        name: 'iuran-warga',
        title: 'Dashboard Iuran Warga',
        category: 'Web App',
        description: 'Waste & security fee dashboard for residential management (Next.js).',
        link: 'https://mega.mitrabisnis.net/',
    },
    {
        name: 'ai-chatbot',
        title: 'AI Chatbot',
        category: 'LLM',
        description: 'AI Chatbot using LLM and Express.js.',
    },
]
