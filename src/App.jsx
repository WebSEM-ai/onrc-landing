import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Fuse from 'fuse.js'

import ServiceWizard from './ServiceWizard'

/* ─── DATA ─── */
const servicesData = [
  { id: "infiintare", category: "Înființare firme", icon: "🏢", color: "blue", services: [
    { name: "Înființare SRL", price: "450 lei", duration: "3-5 zile", popular: true, note: "taxe ONRC: 152 lei" },
    { name: "Înființare SRL-D (Debutant)", price: "450 lei", duration: "3-5 zile", note: "taxe ONRC: 152 lei" },
    { name: "Înființare PFA", price: "350 lei", duration: "2-3 zile", popular: true, note: "taxe ONRC: 0 lei" },
    { name: "Înființare II", price: "300 lei", duration: "2-3 zile" },
    { name: "Înființare IF", price: "300 lei", duration: "3-4 zile" },
    { name: "Înființare SA", price: "300 lei", duration: "5-7 zile" },
    { name: "Înființare Sucursală / Filială", price: "300 lei", duration: "5-7 zile" },
    { name: "Înființare Cooperativă", price: "300 lei", duration: "7-10 zile" },
    { name: "Înființare ONG / Asociație", price: "300 lei", duration: "5-10 zile" },
    { name: "Înființare Fundație", price: "300 lei", duration: "7-14 zile" }
  ]},
  { id: "modificari", category: "Modificări firmă", icon: "✏️", color: "purple", services: [
    { name: "Schimbare sediu social", price: "450 lei", duration: "3-5 zile", popular: true },
    { name: "Prelungire valabilitate sediu social", price: "250 lei", duration: "3-5 zile" },
    { name: "Adăugare / retragere asociat", price: "300 lei", duration: "3-5 zile" },
    { name: "Adăugare / retragere administrator", price: "400 lei", duration: "3-5 zile" },
    { name: "Modificare obiect de activitate (CAEN)", price: "450 lei", duration: "3-5 zile", popular: true },
    { name: "Majorare capital social", price: "450 lei", duration: "3-5 zile" },
    { name: "Reducere capital social", price: "300 lei", duration: "5-7 zile" },
    { name: "Cesiune părți sociale", price: "550 lei", duration: "5-7 zile" },
    { name: "Schimbare denumire firmă", price: "300 lei", duration: "3-5 zile" },
    { name: "Punct de lucru (deschidere / închidere)", price: "350 lei", duration: "3-5 zile" },
    { name: "Actualizare CAEN Rev.3 (fără modificare act constitutiv)", price: "300 lei", duration: "3-5 zile" },
    { name: "Actualizare date ONRC", price: "300 lei", duration: "3-5 zile" }
  ]},
  { id: "gazduire", category: "Găzduire sediu social", icon: "🏠", color: "teal", services: [
    { name: "Găzduire sediu social — 12 luni", price: "550 lei", duration: "1-2 zile", popular: true },
    { name: "Găzduire sediu social — 24 luni", price: "1000 lei", duration: "1-2 zile" }
  ]},
  { id: "radiere", category: "Radiere & Dizolvare", icon: "📁", color: "red", services: [
    { name: "Radiere SRL / SA", price: "300 lei", duration: "7-14 zile" },
    { name: "Radiere PFA / II / IF", price: "300 lei", duration: "3-5 zile" },
    { name: "Dizolvare voluntară", price: "300 lei", duration: "30+ zile" },
    { name: "Suspendare activitate", price: "350 lei", duration: "2-3 zile" },
    { name: "Reluare activitate", price: "350 lei", duration: "2-3 zile" }
  ]},
  { id: "mentiuni", category: "Mențiuni & Depuneri", icon: "📋", color: "green", services: [
    { name: "Depunere situații financiare", price: "300 lei", duration: "1-2 zile" },
    { name: "Actualizare beneficiar real (AML)", price: "300 lei", duration: "1-2 zile", popular: true },
    { name: "Declarație pe propria răspundere", price: "300 lei", duration: "1 zi" },
    { name: "Depunere specimen semnătură", price: "300 lei", duration: "1-2 zile" },
    { name: "Înregistrare contract garanție reală mobiliară", price: "300 lei", duration: "2-3 zile" },
    { name: "Depunere act constitutiv actualizat", price: "300 lei", duration: "1-2 zile" },
    { name: "Mențiune hotărâre AGA", price: "300 lei", duration: "2-3 zile" }
  ]},
  { id: "documente", category: "Obținere documente", icon: "🔍", color: "orange", services: [
    { name: "Certificat constatator", price: "300 lei", duration: "1-2 zile", popular: true },
    { name: "Extras RECOM", price: "300 lei", duration: "Imediat" },
    { name: "Copii acte dosar firmă", price: "300 lei", duration: "1-2 zile" },
    { name: "Cazier fiscal", price: "300 lei", duration: "1-3 zile" },
    { name: "Certificat de înregistrare duplicat", price: "300 lei", duration: "2-3 zile" },
    { name: "Rezervare denumire firmă", price: "300 lei", duration: "1 zi", popular: true },
    { name: "Istoric firmă", price: "300 lei", duration: "2-3 zile" },
    { name: "Certificat de bun platnic", price: "300 lei", duration: "1-3 zile" }
  ]}
]

const allServices = servicesData.flatMap(cat =>
  cat.services.map(s => ({ ...s, category: cat.category, categoryId: cat.id }))
)

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const searchCategories = [
  { id: 'toate', label: 'Toate', short: 'Tot' },
  { id: 'infiintare', label: 'Înființare', short: 'Înf.' },
  { id: 'modificari', label: 'Modificări', short: 'Mod.' },
  { id: 'gazduire', label: 'Sediu social', short: 'Sediu' },
  { id: 'radiere', label: 'Radiere', short: 'Rad.' },
  { id: 'documente', label: 'Documente', short: 'Doc.' },
]

const searchPlaceholders = {
  toate: 'Caută orice serviciu ONRC...',
  infiintare: 'ex: SRL, PFA, SA, ONG...',
  modificari: 'ex: schimbare sediu, administrator...',
  gazduire: 'ex: găzduire sediu social...',
  radiere: 'ex: radiere SRL, suspendare...',
  documente: 'ex: certificat constatator...',
}

/* ─── SVG COMPONENTS ─── */
function LogoIcon({ className = 'w-8 h-8' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="3" width="26" height="34" rx="4" stroke="#F59E0B" strokeWidth="2.5" />
      <line x1="10" y1="12" x2="24" y2="12" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="19" x2="22" y2="19" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <circle cx="28" cy="30" r="9" fill="#F59E0B" opacity="0.2" />
      <circle cx="28" cy="30" r="6" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
      <circle cx="28" cy="30" r="3" fill="#F59E0B" opacity="0.4" />
    </svg>
  )
}

function SocialIcons({ colorClass = 'text-white' }) {
  return (
    <div className="flex items-center gap-3">
      {/* Facebook */}
      <a href="#" className={`${colorClass} hover:opacity-70 transition-opacity`} aria-label="Facebook">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      </a>
      {/* Instagram */}
      <a href="#" className={`${colorClass} hover:opacity-70 transition-opacity`} aria-label="Instagram">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
      </a>
      {/* LinkedIn */}
      <a href="#" className={`${colorClass} hover:opacity-70 transition-opacity`} aria-label="LinkedIn">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
    </div>
  )
}

/* ─── APP ─── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [searchCat, setSearchCat] = useState('toate')
  const [showCatDropdown, setShowCatDropdown] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' })
  const [heroSlide, setHeroSlide] = useState(0)
  const heroSlideTimer = useRef(null)
  const searchRef = useRef(null)
  const catRef = useRef(null)
  const heroRef = useRef(null)

  const fuse = useMemo(() => new Fuse(allServices, {
    keys: ['name', 'category'],
    threshold: 0.4,
    includeScore: true
  }), [])

  useEffect(() => {
    const handleScroll = () => {
      const heroH = heroRef.current?.offsetHeight || 700
      setScrolled(window.scrollY > heroH - 80)
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowResults(false)
      if (catRef.current && !catRef.current.contains(e.target)) setShowCatDropdown(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Hero slide auto-rotation
  useEffect(() => {
    heroSlideTimer.current = setInterval(() => {
      setHeroSlide(prev => (prev + 1) % 2)
    }, 7000)
    return () => clearInterval(heroSlideTimer.current)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleSearch = (value) => {
    setSearchQuery(value)
    if (value.length > 1) {
      let results = fuse.search(value).slice(0, 8)
      if (searchCat !== 'toate') {
        results = results.filter(r => r.item.categoryId === searchCat)
      }
      setSearchResults(results)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }

  const handleSelectResult = (item) => {
    setSearchQuery(item.name)
    setShowResults(false)
    const el = document.getElementById('servicii')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleWizardQuote = (serviceNames) => {
    setFormData(prev => ({ ...prev, service: serviceNames }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setFormData({ name: '', phone: '', email: '', service: '', message: '' })
    setTimeout(() => setFormSubmitted(false), 5000)
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const navLinks = [
    { label: 'Servicii', href: '/servicii' },
    { label: 'Pachete', href: '/servicii#pachete' },
    { label: 'Coduri CAEN', href: '/coduri-caen' },
    { label: 'Blog', href: '/blog' },
    { label: 'Despre noi', href: '#despre' },
    { label: 'Contact', href: '#contact' },
  ]

  // Group search results by category
  const groupedResults = useMemo(() => {
    const groups = {}
    searchResults.forEach(({ item }) => {
      if (!groups[item.category]) groups[item.category] = []
      groups[item.category].push(item)
    })
    return groups
  }, [searchResults])

  const activeCatLabel = searchCategories.find(c => c.id === searchCat)
  const catLabelDesktop = activeCatLabel?.label || 'Toate'
  const catLabelMobile = activeCatLabel?.short || 'Tot'

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ─── GLASSMORPHISM NAVBAR ─── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 nav-glassmorphism ${scrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between" style={{ height: 70 }}>
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5">
              <LogoIcon className="w-9 h-9" />
              <span className="flex items-baseline gap-0.5">
                <span className={`text-xl tracking-tight transition-colors duration-300 ${scrolled ? 'text-[#1E40AF]' : 'text-white'}`} style={{ fontFamily: "'Lora', serif", fontWeight: 600 }}>
                  ONRC
                </span>
                <span className={`text-lg transition-colors duration-300 ${scrolled ? 'text-gray-500' : 'text-white/80'}`} style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, letterSpacing: '0.05em' }}>
                  Express
                </span>
              </span>
            </a>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <SocialIcons colorClass={`transition-colors duration-300 ${scrolled ? 'text-gray-500' : 'text-white/80'}`} />
              </div>
              <div className={`hidden sm:block w-px h-6 transition-colors duration-300 ${scrolled ? 'bg-gray-300' : 'bg-white/20'}`} />
              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(true)}
                className={`p-2 transition-colors duration-300 cursor-pointer ${scrolled ? 'text-gray-700' : 'text-white'}`}
                aria-label="Deschide meniul"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`block h-0.5 w-full rounded transition-colors duration-300 ${scrolled ? 'bg-gray-700' : 'bg-white'}`} />
                  <span className={`block h-0.5 w-4 rounded transition-colors duration-300 ${scrolled ? 'bg-gray-700' : 'bg-white'}`} />
                  <span className={`block h-0.5 w-5 rounded transition-colors duration-300 ${scrolled ? 'bg-gray-700' : 'bg-white'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── FULLSCREEN MENU OVERLAY ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] fullscreen-menu flex flex-col"
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white p-2 cursor-pointer hover:opacity-70 transition-opacity"
                aria-label="Închide meniul"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="text-white font-semibold hover:text-[#F59E0B] transition-colors"
                  style={{ fontSize: '2.5rem', fontFamily: "'Lora', serif", fontWeight: 600 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 inline-flex items-center px-8 py-3.5 bg-[#F59E0B] text-gray-900 font-bold rounded-full text-lg hover:bg-[#FCD34D] transition-colors"
              >
                Solicită ofertă
              </motion.a>
            </div>

            {/* Bottom social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center pb-10"
            >
              <SocialIcons colorClass="text-white/60" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden flex flex-col"
        style={{ paddingTop: 100 }}
      >
        {/* Background blurs */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-80 h-80 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
        </div>
        {/* Watermark — seal */}
        <svg className="absolute pointer-events-none" style={{ width: 600, height: 600, top: -100, right: -100, opacity: 0.04, zIndex: 0 }} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" stroke="white" strokeWidth="2" />
          <circle cx="100" cy="100" r="75" stroke="white" strokeWidth="1" />
          {[0,45,90,135,180,225,270,315].map(a => {
            const r = 82.5, rad = a * Math.PI / 180
            return <circle key={a} cx={100 + r * Math.cos(rad)} cy={100 + r * Math.sin(rad)} r="2.5" fill="white" />
          })}
          <defs><path id="sealTextPath" d="M 100,100 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" /></defs>
          <text fill="white" fontSize="12" fontFamily="Lora, serif" letterSpacing="8"><textPath href="#sealTextPath" startOffset="15%">ONRC</textPath></text>
        </svg>

        {/* Content — vertically centered with top bias */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto px-4 relative z-10" style={{ marginTop: '-5vh' }}>

          {/* ── SLIDE CONTENT ── */}
          <div className="text-center mb-8 relative w-full" style={{ minHeight: 340 }}>
            <AnimatePresence mode="wait">
              {/* SLIDE 1 — Servicii complete */}
              {heroSlide === 0 && (
                <motion.div
                  key="slide-1"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white/90 text-xs sm:text-[13px] font-medium mb-6"
                    style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
                    <span>🏛️</span>
                    <span>Registrul Comerțului · Servicii profesionale</span>
                  </div>
                  <h1 className="text-[1.8rem] sm:text-[2.2rem] md:text-[3rem] lg:text-[3.8rem] font-bold leading-[1.1] mb-3 sm:whitespace-nowrap" style={{ fontFamily: "'Lora', serif" }}>
                    Servicii <span className="relative inline-block">complete<span className="absolute left-0 right-0 bottom-1 h-[3px] bg-[#F59E0B]/60 rounded-full" /></span> ONRC
                  </h1>
                  <p className="text-[#F59E0B] text-2xl md:text-3xl lg:text-[2.8rem] italic mb-5 leading-tight" style={{ fontFamily: "'Lora', serif" }}>
                    rapid, sigur, fără bătăi de cap
                  </p>

                  {/* Animation: docs → arrow → stamp */}
                  <div className="flex items-center justify-center gap-4 md:gap-6 mt-8">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
                      <svg viewBox="0 0 100 80" className="w-20 md:w-28 h-auto" fill="none">
                        <motion.g initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 0.4 }} transition={{ delay: 0.4, duration: 0.4 }}>
                          <rect x="5" y="10" width="44" height="58" rx="3" stroke="white" strokeWidth="1.3" />
                          <line x1="12" y1="22" x2="42" y2="22" stroke="white" strokeWidth="1" opacity="0.4" />
                          <line x1="12" y1="30" x2="38" y2="30" stroke="white" strokeWidth="1" opacity="0.4" />
                          <line x1="12" y1="38" x2="40" y2="38" stroke="white" strokeWidth="1" opacity="0.4" />
                        </motion.g>
                        <motion.g initial={{ x: 12, opacity: 0 }} animate={{ x: 0, opacity: 0.6 }} transition={{ delay: 0.6, duration: 0.4 }}>
                          <rect x="14" y="5" width="44" height="58" rx="3" stroke="white" strokeWidth="1.3" fill="rgba(255,255,255,0.03)" />
                          <line x1="21" y1="17" x2="51" y2="17" stroke="white" strokeWidth="1" opacity="0.4" />
                          <line x1="21" y1="25" x2="47" y2="25" stroke="white" strokeWidth="1" opacity="0.4" />
                          <line x1="21" y1="33" x2="49" y2="33" stroke="white" strokeWidth="1" opacity="0.4" />
                          <line x1="21" y1="41" x2="42" y2="41" stroke="white" strokeWidth="1" opacity="0.4" />
                        </motion.g>
                        <motion.g initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8, duration: 0.4 }}>
                          <rect x="23" y="0" width="44" height="58" rx="3" stroke="white" strokeWidth="1.3" fill="rgba(255,255,255,0.05)" />
                          <line x1="30" y1="12" x2="60" y2="12" stroke="white" strokeWidth="1" opacity="0.5" />
                          <line x1="30" y1="20" x2="56" y2="20" stroke="white" strokeWidth="1" opacity="0.5" />
                          <line x1="30" y1="28" x2="58" y2="28" stroke="white" strokeWidth="1" opacity="0.5" />
                          <line x1="30" y1="36" x2="50" y2="36" stroke="white" strokeWidth="1" opacity="0.5" />
                          <motion.path d="M52 42 L57 47 L65 36" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 0.35 }} />
                        </motion.g>
                      </svg>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4, duration: 0.25 }}>
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-[#F59E0B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.5, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 1.6, duration: 0.4, type: 'spring' }}>
                      <svg viewBox="0 0 80 80" className="w-16 md:w-22 h-auto">
                        <circle cx="40" cy="40" r="34" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.7" />
                        <circle cx="40" cy="40" r="28" stroke="#10B981" strokeWidth="0.8" fill="none" opacity="0.35" />
                        <text x="40" y="37" textAnchor="middle" fontSize="9" fontWeight="700" fill="#10B981" fontFamily="Sora, sans-serif">APROBAT</text>
                        <text x="40" y="48" textAnchor="middle" fontSize="5.5" fill="#10B981" opacity="0.55" fontFamily="Sora, sans-serif">ONRC EXPRESS</text>
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* SLIDE 2 — Express */}
              {heroSlide === 1 && (
                <motion.div
                  key="slide-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white/90 text-xs sm:text-[13px] font-medium mb-6"
                    style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
                    <span>⚡</span>
                    <span>ONRC Express · Dosar complet, termen rapid</span>
                  </div>
                  <h1 className="text-[1.8rem] sm:text-[2.2rem] md:text-[3rem] lg:text-[3.8rem] font-bold leading-[1.1] mb-3 sm:whitespace-nowrap" style={{ fontFamily: "'Lora', serif" }}>
                    De la cerere la <span className="relative inline-block">aprobare<span className="absolute left-0 right-0 bottom-1 h-[3px] bg-[#F59E0B]/60 rounded-full" /></span>
                  </h1>
                  <p className="text-[#F59E0B] text-2xl md:text-3xl lg:text-[2.8rem] italic mb-5 leading-tight" style={{ fontFamily: "'Lora', serif" }}>
                    în cel mai scurt timp posibil
                  </p>

                  {/* Animation: 5 service icons */}
                  <div className="flex items-center justify-center gap-3 md:gap-5 mt-8 relative">
                    {[
                      { icon: '🏢', label: 'Înființări', delay: 0.3 },
                      { icon: '✏️', label: 'Modificări', delay: 0.5 },
                      { icon: '📁', label: 'Radieri', delay: 0.7 },
                      { icon: '📋', label: 'Mențiuni', delay: 0.9 },
                      { icon: '🔍', label: 'Documente', delay: 1.1 },
                    ].map(item => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: item.delay, duration: 0.35, type: 'spring', stiffness: 200 }}
                        className="flex flex-col items-center gap-1.5"
                      >
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-xl md:text-2xl"
                          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
                          {item.icon}
                        </div>
                        <span className="text-[10px] md:text-xs text-white/50 font-medium">{item.label}</span>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4, duration: 0.3 }}
                      className="absolute left-1/2 -translate-x-1/2"
                      style={{ bottom: -8 }}
                    >
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                        className="h-[2px] w-40 md:w-56 origin-left rounded-full"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)' }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Slide indicators */}
          <div className="flex items-center gap-3 mb-6">
            {[0, 1].map(i => (
              <button
                key={i}
                onClick={() => {
                  setHeroSlide(i)
                  clearInterval(heroSlideTimer.current)
                  heroSlideTimer.current = setInterval(() => setHeroSlide(prev => (prev + 1) % 2), 7000)
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  heroSlide === i ? 'w-8 bg-[#F59E0B]' : 'w-4 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* SEARCH BAR (always visible) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="w-full max-w-2xl relative mb-8 px-2 sm:px-0"
            ref={searchRef}
          >
            <div className="relative flex items-center bg-white rounded-full h-[50px] sm:h-[56px] md:h-[60px]"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>

              {/* Category pill */}
              <div className="relative ml-2" ref={catRef}>
                <button
                  onClick={() => setShowCatDropdown(!showCatDropdown)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#F59E0B] text-white text-xs md:text-sm font-semibold rounded-full cursor-pointer hover:bg-[#D97706] transition-colors whitespace-nowrap"
                >
                  <span className="hidden sm:inline">{catLabelDesktop}</span>
                  <span className="sm:hidden">{catLabelMobile}</span>
                  <svg className={`w-3 h-3 transition-transform ${showCatDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {showCatDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 min-w-[160px]"
                    >
                      {searchCategories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setSearchCat(cat.id)
                            setShowCatDropdown(false)
                            if (searchQuery.length > 1) handleSearch(searchQuery)
                          }}
                          className={`w-full text-left px-4 py-2 text-sm cursor-pointer transition-colors ${
                            searchCat === cat.id ? 'bg-blue-50 text-[#1E40AF] font-semibold' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery.length > 1 && setShowResults(true)}
                placeholder={searchPlaceholders[searchCat]}
                className="flex-1 px-3 md:px-4 py-2 text-gray-800 text-sm md:text-base bg-transparent outline-none min-w-0"
              />

              <button
                onClick={() => {
                  if (searchQuery.length > 1) {
                    const el = document.getElementById('servicii')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="mr-1.5 px-3 sm:px-4 md:px-6 h-[38px] sm:h-[44px] md:h-[48px] bg-[#1E40AF] text-white text-xs sm:text-sm md:text-base font-semibold rounded-full hover:bg-[#1E3A8A] transition-colors cursor-pointer whitespace-nowrap"
              >
                Caută
              </button>
            </div>

            {/* Autocomplete dropdown */}
            <AnimatePresence>
              {showResults && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-3 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-[350px] overflow-y-auto"
                >
                  {Object.entries(groupedResults).map(([category, items]) => (
                    <div key={category}>
                      <div className="px-4 py-2 bg-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {category}
                      </div>
                      {items.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => handleSelectResult(item)}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-50 transition-colors text-left border-b border-gray-50 last:border-0 cursor-pointer"
                        >
                          <div className="flex-1 min-w-0">
                            <span className="text-gray-800 font-medium text-sm">{item.name}</span>
                            {item.popular && (
                              <span className="ml-2 w-1.5 h-1.5 rounded-full bg-[#F59E0B] inline-block" />
                            )}
                          </div>
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded shrink-0">
                            {item.duration}
                          </span>
                          <span className="text-sm font-semibold text-[#1E40AF] shrink-0">{item.price}</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* TRUST BADGES (always visible) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 md:gap-4 mb-10"
          >
            {[
              { icon: '✓', text: '5.000+ firme asistate' },
              { icon: '⚡', text: 'Termen rapid garantat' },
              { icon: '🔒', text: 'Confidențialitate 100%' },
              { icon: '💬', text: 'Suport dedicat' },
            ].map(badge => (
              <div
                key={badge.text}
                className="flex items-center gap-2 px-3 py-2 rounded-full text-white text-xs md:text-[13px]"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <span>{badge.icon}</span>
                <span>{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES WIZARD ─── */}
      <section id="servicii" className="py-16 md:py-24 relative overflow-hidden">
        {/* Watermark — grid */}
        <svg className="absolute pointer-events-none" style={{ width: 500, height: 400, left: -80, bottom: -60, opacity: 0.035, zIndex: 0 }} viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {[0,1,2,3].map(row => [0,1,2,3,4].map(col => (
            <rect key={`${row}-${col}`} x={col * 100 + 10} y={row * 80 + 10} width="80" height="60" rx="3" stroke="#1E40AF" strokeWidth="1.5" fill="none" />
          )))}
        </svg>
        <div className="max-w-7xl mx-auto px-4 relative z-[1]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Lora', serif" }}>Serviciile noastre</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Selectează tipul de firmă, alege categoria și serviciul dorit, apoi solicită oferta — totul în câțiva pași simpli.</p>
        </motion.div>

        <ServiceWizard servicesData={servicesData} onRequestQuote={handleWizardQuote} />
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="despre" className="py-20 md:py-32 bg-gray-900 text-white relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500 rounded-full blur-3xl" />
        </div>
        {/* Watermark — stacked documents */}
        <svg className="absolute pointer-events-none hidden md:block" style={{ width: 350, height: 400, right: -40, top: '50%', transform: 'translateY(-50%)', opacity: 0.04, zIndex: 0 }} viewBox="0 0 140 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="16" y="0" width="100" height="130" rx="4" stroke="white" strokeWidth="1.5" />
          <line x1="30" y1="24" x2="102" y2="24" stroke="white" strokeWidth="1.5" /><line x1="30" y1="40" x2="90" y2="40" stroke="white" strokeWidth="1.5" /><line x1="30" y1="56" x2="96" y2="56" stroke="white" strokeWidth="1.5" />
          <rect x="8" y="10" width="100" height="130" rx="4" stroke="white" strokeWidth="1.5" />
          <line x1="22" y1="34" x2="94" y2="34" stroke="white" strokeWidth="1.5" /><line x1="22" y1="50" x2="82" y2="50" stroke="white" strokeWidth="1.5" /><line x1="22" y1="66" x2="88" y2="66" stroke="white" strokeWidth="1.5" />
          <rect x="0" y="20" width="100" height="130" rx="4" stroke="white" strokeWidth="1.5" />
          <line x1="14" y1="44" x2="86" y2="44" stroke="white" strokeWidth="1.5" /><line x1="14" y1="60" x2="74" y2="60" stroke="white" strokeWidth="1.5" /><line x1="14" y1="76" x2="80" y2="76" stroke="white" strokeWidth="1.5" />
        </svg>

        <div className="max-w-6xl mx-auto px-4 relative z-[1]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-20">
            <span className="inline-block text-[#F59E0B] text-sm font-semibold tracking-widest uppercase mb-4">Proces simplu</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Lora', serif" }}>
              Cum funcționează?
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto text-lg">Trei pași simpli pentru a-ți rezolva orice problemă la ONRC</p>
          </motion.div>

          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-[72px] left-[16.67%] right-[16.67%] h-px">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-full h-full origin-left"
                style={{ background: 'linear-gradient(90deg, #F59E0B, #3B82F6, #10B981)' }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {[
                {
                  num: '1',
                  title: 'Ne contactezi',
                  desc: 'Completează formularul sau sună-ne. Îți oferim consultanță gratuită și stabilim pașii necesari.',
                  gradient: 'from-amber-500/20 to-amber-600/5',
                  iconColor: '#F59E0B',
                  borderColor: 'border-amber-500/30',
                  icon: (
                    <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.5 17.5v2.5a1.67 1.67 0 01-1.82 1.67 16.5 16.5 0 01-7.18-2.55 16.25 16.25 0 01-5-5A16.5 16.5 0 013.95 6.82 1.67 1.67 0 015.6 5H8.1a1.67 1.67 0 011.67 1.43 10.7 10.7 0 00.58 2.35 1.67 1.67 0 01-.37 1.76l-1.06 1.06a13.33 13.33 0 005 5l1.06-1.06a1.67 1.67 0 011.76-.37 10.7 10.7 0 002.35.58 1.67 1.67 0 011.41 1.7z" />
                      <path d="M17.5 3.5a7.5 7.5 0 017 7" opacity="0.5" />
                      <path d="M17.5 7.5a3.5 3.5 0 013 3" opacity="0.7" />
                    </svg>
                  )
                },
                {
                  num: '2',
                  title: 'Trimiți actele',
                  desc: 'Ne transmiți documentele necesare online. Noi pregătim dosarul complet și corect.',
                  gradient: 'from-blue-500/20 to-blue-600/5',
                  iconColor: '#3B82F6',
                  borderColor: 'border-blue-500/30',
                  icon: (
                    <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16.33 3.5H7a2.33 2.33 0 00-2.33 2.33v16.34A2.33 2.33 0 007 24.5h14a2.33 2.33 0 002.33-2.33V10.5L16.33 3.5z" />
                      <path d="M16.33 3.5V10.5H23.33" />
                      <line x1="9.33" y1="15.17" x2="18.67" y2="15.17" opacity="0.5" />
                      <line x1="9.33" y1="19.83" x2="15.17" y2="19.83" opacity="0.5" />
                      <path d="M12.83 7.5h-3.5" opacity="0.5" />
                    </svg>
                  )
                },
                {
                  num: '3',
                  title: 'Primești documentele',
                  desc: 'Depunem actele la ONRC și îți livrăm documentele finale în termenul stabilit.',
                  gradient: 'from-emerald-500/20 to-emerald-600/5',
                  iconColor: '#10B981',
                  borderColor: 'border-emerald-500/30',
                  icon: (
                    <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 7L10.5 17.5 6 13" />
                      <circle cx="14" cy="14" r="11" opacity="0.3" />
                    </svg>
                  )
                }
              ].map((item, i) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="relative text-center group"
                >
                  {/* Large background number */}
                  <div
                    className="absolute -top-6 left-1/2 -translate-x-1/2 font-extrabold text-[8rem] md:text-[10rem] leading-none pointer-events-none select-none"
                    style={{ fontFamily: "'Lora', serif", color: 'rgba(255,255,255,0.03)' }}
                  >
                    {item.num}
                  </div>

                  {/* Icon circle */}
                  <div className="relative mx-auto mb-8">
                    <div className={`w-[88px] h-[88px] rounded-3xl bg-gradient-to-br ${item.gradient} border ${item.borderColor} flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                  </div>

                  {/* Mobile connector arrow */}
                  {i < 2 && (
                    <div className="md:hidden flex justify-center -mb-4 -mt-2">
                      <svg className="w-6 h-10 text-gray-700" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 2v30M6 26l6 6 6-6" />
                      </svg>
                    </div>
                  )}

                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-20 md:py-28 bg-gray-100 relative overflow-hidden">
        {/* Watermark — compass rose */}
        <svg className="absolute pointer-events-none" style={{ width: 450, height: 450, left: '50%', bottom: -100, transform: 'translateX(-50%)', opacity: 0.04, zIndex: 0 }} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" stroke="#1E40AF" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="80" stroke="#1E40AF" strokeWidth="0.8" strokeDasharray="4 4" />
          {[0,45,90,135,180,225,270,315].map(a => {
            const rad = a * Math.PI / 180
            return <line key={a} x1={100 + 30 * Math.cos(rad)} y1={100 + 30 * Math.sin(rad)} x2={100 + 85 * Math.cos(rad)} y2={100 + 85 * Math.sin(rad)} stroke="#1E40AF" strokeWidth={a % 90 === 0 ? '2' : '1'} />
          })}
          <circle cx="100" cy="100" r="6" stroke="#1E40AF" strokeWidth="1.5" />
        </svg>
        <div className="max-w-7xl mx-auto px-4 relative z-[1]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-14">
            <span className="inline-block text-[#1E40AF] text-sm font-semibold tracking-widest uppercase mb-4">Contact</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Lora', serif" }}>
              Contactează-ne
            </h2>
            <p className="text-gray-500 text-lg">Scrie-ne și revenim cu o ofertă personalizată în maximum 2 ore</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form — 3 cols */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:col-span-3"
            >
              <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl p-6 md:p-10 shadow-xl shadow-gray-200/60 space-y-6 relative overflow-hidden">
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #1E40AF, #F59E0B)' }} />

                {formSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-4 rounded-xl text-sm font-medium flex items-center gap-3"
                  >
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Mesajul a fost trimis cu succes! Te vom contacta în cel mai scurt timp.
                  </motion.div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Nume complet</label>
                  <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/10 outline-none transition-all text-sm"
                      placeholder="Ion Popescu"
                    />
                  </div>
                </div>

                {/* Phone + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Telefon</label>
                    <div className="relative">
                      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/10 outline-none transition-all text-sm"
                        placeholder="07XX XXX XXX"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
                    <div className="relative">
                      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/10 outline-none transition-all text-sm"
                        placeholder="email@exemplu.ro"
                      />
                    </div>
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Serviciu dorit</label>
                  <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <input
                      type="text"
                      value={formData.service}
                      onChange={e => setFormData({ ...formData, service: e.target.value })}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/10 outline-none transition-all text-sm"
                      placeholder="ex: Înființare SRL, Schimbare sediu social"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Mesaj</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/10 outline-none transition-all resize-none text-sm"
                    placeholder="Descrie pe scurt ce ai nevoie..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#1E40AF] text-white font-semibold rounded-xl hover:bg-[#1E3A8A] transition-all shadow-lg shadow-blue-900/20 text-base cursor-pointer group flex items-center justify-center gap-2"
                >
                  <span>Trimite mesajul</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </motion.div>

            {/* Contact info — 2 cols */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.5, delay: 0.2 } } }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Contact cards */}
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#1E40AF" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  label: 'Adresă',
                  value: 'Str. Exemplu nr. 10, București, Sector 1'
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#1E40AF" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  label: 'Telefon',
                  value: '0731 123 456'
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#1E40AF" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: 'Email',
                  value: 'contact@onrcexpress.ro'
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#1E40AF" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  label: 'Program',
                  value: 'Luni – Vineri: 09:00 – 18:00'
                },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-gray-800 font-medium text-sm">{item.value}</p>
                  </div>
                </div>
              ))}

              {/* Urgent CTA */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#F59E0B] rounded-full opacity-10 blur-xl" />
                <h4 className="text-lg font-bold mb-2">Ai nevoie de ajutor urgent?</h4>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">Sună-ne direct pentru consultanță gratuită. Răspundem în maximum 30 de minute.</p>
                <a
                  href="tel:0731123456"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#F59E0B] text-gray-900 font-bold rounded-xl hover:bg-[#FCD34D] transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Sună acum
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-gray-900 text-gray-400 py-12 relative overflow-hidden">
        {/* Watermark — document row */}
        <svg className="absolute pointer-events-none w-full" style={{ height: 120, top: 20, left: 0, opacity: 0.03, zIndex: 0 }} viewBox="0 0 1000 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          {[100, 280, 460, 640, 820].map(x => (
            <g key={x}>
              <rect x={x} y="10" width="60" height="78" rx="4" stroke="white" strokeWidth="1.5" />
              <line x1={x + 10} y1="26" x2={x + 50} y2="26" stroke="white" strokeWidth="1.5" />
              <line x1={x + 10} y1="38" x2={x + 42} y2="38" stroke="white" strokeWidth="1.5" />
              <line x1={x + 10} y1="50" x2={x + 46} y2="50" stroke="white" strokeWidth="1.5" />
            </g>
          ))}
        </svg>
        <div className="max-w-7xl mx-auto px-4 relative z-[1]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <LogoIcon className="w-7 h-7" />
                <span className="text-xl text-white">
                  <span style={{ fontFamily: "'Lora', serif", fontWeight: 600 }}>ONRC</span>
                  <span className="text-gray-400" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, letterSpacing: '0.05em' }}>Express</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed">Partenerul tău de încredere pentru toate operațiunile de la Registrul Comerțului.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Servicii</h4>
              <ul className="space-y-2 text-sm">
                {servicesData.map(cat => (
                  <li key={cat.id}><a href="#servicii" className="hover:text-white transition-colors">{cat.category}</a></li>
                ))}
                <li><a href="/servicii" className="hover:text-white transition-colors text-[#F59E0B]">Toate serviciile & pachete</a></li>
                <li><a href="/coduri-caen" className="hover:text-white transition-colors text-[#F59E0B]">Lista coduri CAEN Rev.3</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Companie</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#despre" className="hover:text-white transition-colors">Despre noi</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Politica de confidențialitate</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termeni și condiții</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>📍 Str. Exemplu nr. 10, București</li>
                <li>📞 0731 123 456</li>
                <li>📧 contact@onrcexpress.ro</li>
              </ul>
              <div className="mt-4">
                <SocialIcons colorClass="text-gray-500" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} ONRCExpress. Toate drepturile rezervate.</p>
          </div>
        </div>
      </footer>

      {/* ─── FLOATING BUTTONS ─── */}
      <a
        href="https://wa.me/40731123456"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-40"
        aria-label="WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-24 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-40 cursor-pointer"
            aria-label="Înapoi sus"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
