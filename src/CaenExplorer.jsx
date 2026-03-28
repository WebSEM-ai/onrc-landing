import { useState, useMemo, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Fuse from 'fuse.js'
import { sections, caenCodes, wizardSuggestions } from './data/caenData'

/* ─── FUSE CONFIG ─── */
const fuse = new Fuse(caenCodes, {
  keys: [
    { name: 'code', weight: 0.3 },
    { name: 'name', weight: 0.3 },
    { name: 'keywords', weight: 0.4 },
  ],
  threshold: 0.35,
  includeScore: true,
})

const wizardFuse = new Fuse(wizardSuggestions, {
  keys: [{ name: 'query', weight: 1 }],
  threshold: 0.5,
})

/* ─── RISK BADGE ─── */
function RiskBadge({ level }) {
  const config = {
    scazut: { bg: 'bg-green-100', text: 'text-green-700', label: 'Risc scazut' },
    mediu: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Risc mediu' },
    ridicat: { bg: 'bg-red-100', text: 'text-red-700', label: 'Risc ridicat' },
  }
  const c = config[level] || config.scazut
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>{c.label}</span>
}

/* ─── COMPATIBILITY BADGES ─── */
function CompatBadges({ code }) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {code.pfa && <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">PFA</span>}
      {code.srl && <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">SRL</span>}
      {code.ii && <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-700">II</span>}
      {!code.pfa && !code.ii && <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">Doar SRL/SA</span>}
    </div>
  )
}

/* ─── SECTION CARD ─── */
function SectionCard({ section, isActive, onClick, count }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left cursor-pointer w-full ${
        isActive
          ? 'border-gray-900 bg-gray-900 text-white shadow-lg scale-[1.02]'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md text-gray-700'
      }`}
    >
      <span className="text-2xl shrink-0">{section.icon}</span>
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-sm leading-tight truncate">{section.code}. {section.name}</div>
        <div className={`text-xs mt-0.5 ${isActive ? 'text-gray-300' : 'text-gray-400'}`}>{count} coduri</div>
      </div>
    </button>
  )
}

/* ─── CAEN CODE ROW ─── */
function CaenCodeRow({ code, isExpanded, onToggle }) {
  const sectionObj = sections.find(s => s.code === code.section)
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${isExpanded ? 'border-blue-300 shadow-md bg-white' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer"
      >
        <span className="font-mono text-lg font-bold text-[#1E40AF] shrink-0 w-14">{code.code}</span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-800 leading-tight">{code.name}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <CompatBadges code={code} />
            <RiskBadge level={code.riskLevel} />
            {code.popular && <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">Popular</span>}
          </div>
        </div>
        <svg className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-gray-100 pt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left */}
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Sectiune</h4>
                    <p className="text-sm text-gray-700">{sectionObj?.icon} {sectionObj?.code} — {sectionObj?.name}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Compatibilitate forma juridica</h4>
                    <div className="flex gap-3 text-sm">
                      <span className={code.pfa ? 'text-green-600 font-medium' : 'text-red-400'}>
                        {code.pfa ? '✓' : '✗'} PFA
                      </span>
                      <span className={code.srl ? 'text-green-600 font-medium' : 'text-red-400'}>
                        {code.srl ? '✓' : '✗'} SRL
                      </span>
                      <span className={code.ii ? 'text-green-600 font-medium' : 'text-red-400'}>
                        {code.ii ? '✓' : '✗'} II / IF
                      </span>
                    </div>
                  </div>
                  {code.authorizations.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Autorizatii necesare</h4>
                      <ul className="space-y-1">
                        {code.authorizations.map((auth, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start gap-1.5">
                            <span className="text-amber-500 mt-0.5 shrink-0">!</span>
                            {auth}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {code.authorizations.length === 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Autorizatii necesare</h4>
                      <p className="text-sm text-green-600 font-medium">Nu necesita autorizatii speciale</p>
                    </div>
                  )}
                </div>
                {/* Right */}
                <div className="space-y-3">
                  {code.qualifications && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Calificari necesare</h4>
                      <p className="text-sm text-gray-700">{code.qualifications}</p>
                    </div>
                  )}
                  {!code.qualifications && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Calificari necesare</h4>
                      <p className="text-sm text-green-600 font-medium">Nu necesita calificari speciale</p>
                    </div>
                  )}
                  {code.notes && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Informatii utile</h4>
                      <p className="text-sm text-gray-700">{code.notes}</p>
                    </div>
                  )}
                  {code.relatedCodes.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Coduri CAEN asociate frecvent</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {code.relatedCodes.map(rc => {
                          const related = caenCodes.find(c => c.code === rc)
                          return related ? (
                            <span key={rc} className="inline-flex items-center px-2 py-1 rounded-lg bg-gray-100 text-xs text-gray-600" title={related.name}>
                              <span className="font-mono font-bold text-[#1E40AF] mr-1">{rc}</span>
                              <span className="truncate max-w-[120px]">{related.name}</span>
                            </span>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* CTA */}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <Link
                  to="/#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E40AF] text-white rounded-full text-sm font-semibold hover:bg-[#1E3A8A] transition-colors"
                >
                  Inregistreaza firma cu codul {code.code}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── WIZARD RESULT CARD ─── */
function WizardResult({ suggestion }) {
  const [expandedCode, setExpandedCode] = useState(null)
  const codes = suggestion.codes.map(c => caenCodes.find(cc => cc.code === c)).filter(Boolean)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">💡</span>
        <p className="text-sm font-semibold text-gray-800">{suggestion.explanation}</p>
      </div>
      <p className="text-xs text-gray-500 mb-3">Coduri CAEN recomandate:</p>
      <div className="space-y-2">
        {codes.map(code => (
          <CaenCodeRow key={code.code} code={code} isExpanded={expandedCode === code.code} onToggle={() => setExpandedCode(expandedCode === code.code ? null : code.code)} />
        ))}
      </div>
    </motion.div>
  )
}

/* ─── MAIN COMPONENT ─── */
export default function CaenExplorer() {
  const [search, setSearch] = useState('')
  const [wizardText, setWizardText] = useState('')
  const [activeSection, setActiveSection] = useState(null)
  const [expandedCode, setExpandedCode] = useState(null)
  const [filterPfa, setFilterPfa] = useState(false)
  const [filterNoAuth, setFilterNoAuth] = useState(false)
  const [showWizard, setShowWizard] = useState(true)
  const [page, setPage] = useState(1)
  const resultsRef = useRef(null)
  const ITEMS_PER_PAGE = 30

  // Section code counts
  const sectionCounts = useMemo(() => {
    const counts = {}
    sections.forEach(s => { counts[s.code] = 0 })
    caenCodes.forEach(c => { if (counts[c.section] !== undefined) counts[c.section]++ })
    return counts
  }, [])

  // Filtered results
  const filteredCodes = useMemo(() => {
    let results = caenCodes

    // Section filter
    if (activeSection) {
      results = results.filter(c => c.section === activeSection)
    }

    // Text search
    if (search.trim()) {
      const fuseResults = fuse.search(search.trim())
      const matchedCodes = new Set(fuseResults.map(r => r.item.code))
      results = results.filter(c => matchedCodes.has(c.code))
      // Sort by fuse score
      const scoreMap = {}
      fuseResults.forEach(r => { scoreMap[r.item.code] = r.score })
      results.sort((a, b) => (scoreMap[a.code] || 1) - (scoreMap[b.code] || 1))
    }

    // PFA filter
    if (filterPfa) {
      results = results.filter(c => c.pfa)
    }

    // No auth filter
    if (filterNoAuth) {
      results = results.filter(c => c.authorizations.length === 0)
    }

    return results
  }, [search, activeSection, filterPfa, filterNoAuth])

  // Wizard results
  const wizardResults = useMemo(() => {
    if (!wizardText.trim() || wizardText.trim().length < 5) return []
    // Try wizard suggestions first
    const wizardMatch = wizardFuse.search(wizardText.trim())
    if (wizardMatch.length > 0) {
      return wizardMatch.slice(0, 3).map(r => r.item)
    }
    // Fallback to fuse search on codes
    const fuseResults = fuse.search(wizardText.trim())
    if (fuseResults.length > 0) {
      return [{
        query: wizardText,
        codes: fuseResults.slice(0, 5).map(r => r.item.code),
        explanation: `Rezultate pentru "${wizardText}"`
      }]
    }
    return []
  }, [wizardText])

  // Pagination
  const paginatedCodes = useMemo(() => {
    return filteredCodes.slice(0, page * ITEMS_PER_PAGE)
  }, [filteredCodes, page])

  const hasMore = paginatedCodes.length < filteredCodes.length

  // Reset page on filter change
  useEffect(() => { setPage(1) }, [search, activeSection, filterPfa, filterNoAuth])

  const totalCodes = caenCodes.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" style={{ fontFamily: "'Sora', sans-serif" }}>
      {/* ─── HEADER ─── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-[#1E40AF] flex items-center justify-center">
              <span className="text-white font-bold text-sm">ON</span>
            </div>
            <span className="text-lg font-bold text-gray-900 group-hover:text-[#1E40AF] transition-colors">ONRC<span className="text-[#F59E0B]">.ro</span></span>
          </Link>
          <Link to="/" className="text-sm text-[#1E40AF] font-medium hover:underline flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Inapoi la servicii
          </Link>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="bg-gradient-to-br from-[#1E40AF] via-[#1E3A8A] to-[#172554] text-white py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#F59E0B] rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Actualizat 2025 — CAEN Rev.3
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Lista completa coduri <span className="text-[#F59E0B]">CAEN</span>
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto mb-2">
            {totalCodes}+ coduri CAEN cu informatii practice: compatibilitate PFA/SRL, autorizatii necesare, calificari si coduri asociate.
          </p>
          <p className="text-blue-300/70 text-sm max-w-xl mx-auto">
            Prima lista CAEN din Romania cu business intelligence integrat.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* ─── WIZARD / SEARCH TOGGLE ─── */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setShowWizard(true)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              showWizard ? 'bg-[#1E40AF] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            💡 Nu stiu ce cod CAEN am nevoie
          </button>
          <button
            onClick={() => setShowWizard(false)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              !showWizard ? 'bg-[#1E40AF] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🔍 Caut un cod CAEN specific
          </button>
        </div>

        {/* ─── WIZARD MODE ─── */}
        <AnimatePresence mode="wait">
          {showWizard && (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-10"
            >
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 md:p-8 border border-amber-200">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Lora', serif" }}>
                  Descrie ce vrei sa faci
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  Scrie in cuvintele tale ce afacere vrei sa deschizi si iti sugeram codurile CAEN potrivite.
                </p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">💬</span>
                  <input
                    type="text"
                    value={wizardText}
                    onChange={e => setWizardText(e.target.value)}
                    placeholder='Ex: "vreau sa vand haine online", "vreau sa deschid o cafenea", "vreau sa fac site-uri web"'
                    className="w-full pl-12 pr-4 py-4 text-base rounded-xl border-2 border-amber-200 focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/20 outline-none transition bg-white"
                  />
                </div>

                {/* Wizard example chips */}
                {!wizardText && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {['vreau sa vand haine online', 'vreau sa deschid o cafenea', 'vreau sa fac site-uri web', 'vreau sa fac fotografie', 'vreau sa fac transport marfa', 'vreau sa deschid un salon'].map(q => (
                      <button
                        key={q}
                        onClick={() => setWizardText(q)}
                        className="px-3 py-1.5 rounded-full bg-white border border-amber-200 text-sm text-gray-600 hover:bg-amber-50 hover:border-amber-300 transition cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {/* Wizard results */}
                {wizardResults.length > 0 && (
                  <div className="mt-6 space-y-4">
                    {wizardResults.map((suggestion, i) => (
                      <WizardResult key={i} suggestion={suggestion} />
                    ))}
                  </div>
                )}

                {wizardText.trim().length >= 5 && wizardResults.length === 0 && (
                  <div className="mt-6 text-center py-8 text-gray-400">
                    <p className="text-lg mb-1">Niciun rezultat gasit</p>
                    <p className="text-sm">Incearca sa descrii mai pe larg ce activitate vrei sa desfasori.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── SEARCH MODE ─── */}
        <AnimatePresence mode="wait">
          {!showWizard && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Search bar */}
              <div className="relative mb-6">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Cauta dupa cod, denumire sau cuvant cheie (ex: 6201, restaurant, programare, fotografie...)"
                  className="w-full pl-12 pr-4 py-4 text-base rounded-xl border-2 border-gray-200 focus:border-[#1E40AF] focus:ring-4 focus:ring-[#1E40AF]/20 outline-none transition bg-white shadow-sm"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <button
                  onClick={() => setFilterPfa(!filterPfa)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition cursor-pointer ${
                    filterPfa ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Compatibil PFA
                </button>
                <button
                  onClick={() => setFilterNoAuth(!filterNoAuth)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition cursor-pointer ${
                    filterNoAuth ? 'bg-green-100 text-green-700 ring-2 ring-green-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Fara autorizatii speciale
                </button>
                {activeSection && (
                  <button
                    onClick={() => setActiveSection(null)}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200 transition cursor-pointer flex items-center gap-1"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Sectiunea {activeSection}
                  </button>
                )}
                <span className="text-sm text-gray-400 ml-auto">
                  {filteredCodes.length} {filteredCodes.length === 1 ? 'rezultat' : 'rezultate'}
                </span>
              </div>

              {/* Sections grid */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: "'Lora', serif" }}>
                  Sectiuni CAEN
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {sections.map(s => (
                    <SectionCard
                      key={s.code}
                      section={s}
                      isActive={activeSection === s.code}
                      onClick={() => setActiveSection(activeSection === s.code ? null : s.code)}
                      count={sectionCounts[s.code]}
                    />
                  ))}
                </div>
              </div>

              {/* Results */}
              <div ref={resultsRef}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Lora', serif" }}>
                    {activeSection ? `Sectiunea ${activeSection} — ${sections.find(s => s.code === activeSection)?.name}` : search ? 'Rezultate cautare' : 'Toate codurile CAEN'}
                  </h2>
                </div>

                <div className="space-y-2">
                  {paginatedCodes.map(code => (
                    <CaenCodeRow
                      key={code.code}
                      code={code}
                      isExpanded={expandedCode === code.code}
                      onToggle={() => setExpandedCode(expandedCode === code.code ? null : code.code)}
                    />
                  ))}
                </div>

                {paginatedCodes.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-lg text-gray-400 mb-2">Niciun cod CAEN gasit</p>
                    <p className="text-sm text-gray-300">Incearca alte cuvinte cheie sau reseteaza filtrele.</p>
                  </div>
                )}

                {hasMore && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => setPage(p => p + 1)}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold text-sm hover:bg-gray-200 transition cursor-pointer"
                    >
                      Arata mai multe ({filteredCodes.length - paginatedCodes.length} ramase)
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── CTA BOTTOM ─── */}
        <div className="mt-16 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F59E0B] rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Lora', serif" }}>
              Ai nevoie de ajutor cu inregistrarea firmei?
            </h2>
            <p className="text-blue-200 mb-6 max-w-lg mx-auto">
              Te ajutam sa alegi codurile CAEN potrivite si ne ocupam de toate formalitatile la Registrul Comertului.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F59E0B] text-gray-900 rounded-full text-base font-bold hover:bg-[#FCD34D] transition-colors shadow-lg"
            >
              Solicita oferta gratuita
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ONRC.ro — Servicii profesionale Registrul Comertului</p>
          <p className="mt-1 text-gray-500">Lista coduri CAEN Rev.3 — informatii cu caracter orientativ</p>
        </div>
      </footer>
    </div>
  )
}
