import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CaenExplorer from './CaenExplorer.jsx'
import ServiciiPage from './ServiciiPage.jsx'
import ServiciiOnrcPage from './ServiciiOnrcPage.jsx'
import IntrebariFrecventePage from './IntrebariFrecventePage.jsx'
import BlogPage from './BlogPage.jsx'
import BlogArticle from './BlogArticle.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/coduri-caen" element={<CaenExplorer />} />
        <Route path="/servicii" element={<ServiciiPage />} />
        <Route path="/servicii-onrc" element={<ServiciiOnrcPage />} />
        <Route path="/intrebari-frecvente" element={<IntrebariFrecventePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
