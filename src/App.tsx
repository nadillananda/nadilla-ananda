import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Work from './pages/Work'
import Info from './pages/Info'
import Contact from './pages/Contact'



function App() {
    React.useEffect(() => {
        // Set document title
        document.title = "Nadilla Ananda – Creative Digital Designer"

        // Set meta description
        const metaDescription = document.querySelector('meta[name="description"]')
        if (metaDescription) {
            metaDescription.setAttribute('content', "Nadilla Ananda – Creative Digital Designer crafting memorable digital experiences with a focus on elegant, minimal aesthetics.")
        } else {
            const meta = document.createElement('meta')
            meta.name = "description"
            meta.content = "Nadilla Ananda – Creative Digital Designer crafting memorable digital experiences with a focus on elegant, minimal aesthetics."
            document.head.appendChild(meta)
        }
    }, [])

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<Work />} />
                <Route path="/info" element={<Info />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Layout>
    )
}

export default App
