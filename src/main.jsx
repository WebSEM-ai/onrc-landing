import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CaenExplorer from './CaenExplorer.jsx'
import ServiciiPage from './ServiciiPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/coduri-caen" element={<CaenExplorer />} />
        <Route path="/servicii" element={<ServiciiPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
