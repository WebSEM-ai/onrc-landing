import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── ENTITY TYPES ─── */
const entityTypes = [
  { id: 'pfa', label: 'PFA' },
  { id: 'ii', label: 'Întreprindere Individuală (II)' },
  { id: 'if', label: 'Întreprindere Familială (IF)' },
  { id: 'srl', label: 'SRL' },
  { id: 'sa', label: 'SA' },
  { id: 'oricare', label: 'Nu știu / Oricare' },
]

/* ─── ENTITY → CATEGORY MAPPING ─── */
const entityCategoryMap = {
  pfa: ['infiintare', 'modificari', 'radiere', 'documente'],
  ii: ['infiintare', 'modificari', 'radiere', 'documente'],
  if: ['infiintare', 'modificari', 'radiere', 'documente'],
  srl: ['infiintare', 'modificari', 'radiere', 'mentiuni', 'documente'],
  sa: ['infiintare', 'modificari', 'radiere', 'mentiuni', 'documente'],
  oricare: ['infiintare', 'modificari', 'radiere', 'mentiuni', 'documente'],
}

const categoryMeta = [
  { id: 'infiintare', label: 'Înființare', icon: '🏢' },
  { id: 'modificari', label: 'Modificări firmă', icon: '✏️' },
  { id: 'radiere', label: 'Radiere & Dizolvare', icon: '📁' },
  { id: 'mentiuni', label: 'Mențiuni & Depuneri', icon: '📋' },
  { id: 'documente', label: 'Obținere documente', icon: '🔍' },
]

function extractPrice(priceStr) {
  const m = priceStr.match(/(\d+)/)
  return m ? parseInt(m[1], 10) : 0
}

/* ─── SEARCH INPUT ─── */
function PanelSearch({ value, onChange, placeholder }) {
  return (
    <div className="relative mb-3">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 outline-none transition bg-white"
      />
    </div>
  )
}

/* ─── PANEL HEADER ─── */
function PanelHeader({ step, title, subtitle, active, count }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
        active ? 'bg-[#1E40AF] text-white' : 'bg-gray-200 text-gray-500'
      }`}>
        {step}
      </span>
      <div className="min-w-0">
        <h3 className={`text-base font-semibold leading-tight ${active ? 'text-gray-900' : 'text-gray-400'}`}>
          {title}
        </h3>
        {subtitle && <p className="text-xs text-gray-400 truncate">{subtitle}</p>}
      </div>
      {count > 0 && (
        <span className="ml-auto text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full shrink-0">
          {count} selectat{count > 1 ? 'e' : ''}
        </span>
      )}
    </div>
  )
}

/* ─── MOBILE ACCORDION STEP ─── */
function MobileStep({ step, title, isOpen, isCompleted, summary, onToggle, children }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 text-left cursor-pointer"
      >
        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
          isCompleted ? 'bg-green-500 text-white' : isOpen ? 'bg-[#1E40AF] text-white' : 'bg-gray-200 text-gray-500'
        }`}>
          {isCompleted ? '✓' : step}
        </span>
        <span className={`font-semibold text-sm ${isOpen ? 'text-gray-900' : 'text-gray-500'}`}>{title}</span>
        {isCompleted && !isOpen && summary && (
          <span className="ml-auto text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full truncate max-w-[150px]">
            {summary}
          </span>
        )}
        <svg className={`w-4 h-4 ml-auto text-gray-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── MAIN WIZARD ─── */
export default function ServiceWizard({ servicesData, onRequestQuote }) {
  const [selectedEntities, setSelectedEntities] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [cart, setCart] = useState([])
  const [searchP1, setSearchP1] = useState('')
  const [searchP2, setSearchP2] = useState('')
  const [searchP3, setSearchP3] = useState('')
  const [mobileStep, setMobileStep] = useState(1)

  /* ─── Derived data ─── */
  const allowedCategories = useMemo(() => {
    if (selectedEntities.length === 0) return categoryMeta.map(c => c.id)
    const set = new Set()
    selectedEntities.forEach(eid => {
      (entityCategoryMap[eid] || []).forEach(c => set.add(c))
    })
    return [...set]
  }, [selectedEntities])

  const filteredCategories = useMemo(() => {
    let list = categoryMeta
    if (searchP2) {
      const q = searchP2.toLowerCase()
      list = list.filter(c => c.label.toLowerCase().includes(q))
    }
    return list
  }, [searchP2])

  const filteredServices = useMemo(() => {
    if (!selectedCategory) {
      // Show all from allowed categories
      let all = servicesData
        .filter(cat => allowedCategories.includes(cat.id))
        .flatMap(cat => cat.services.map(s => ({ ...s, category: cat.category, categoryId: cat.id })))
      if (searchP3) {
        const q = searchP3.toLowerCase()
        all = all.filter(s => s.name.toLowerCase().includes(q))
      }
      return all
    }
    const cat = servicesData.find(c => c.id === selectedCategory)
    if (!cat) return []
    let list = cat.services.map(s => ({ ...s, category: cat.category, categoryId: cat.id }))
    if (searchP3) {
      const q = searchP3.toLowerCase()
      list = list.filter(s => s.name.toLowerCase().includes(q))
    }
    return list
  }, [selectedCategory, allowedCategories, searchP3, servicesData])

  const filteredEntities = useMemo(() => {
    if (!searchP1) return entityTypes
    const q = searchP1.toLowerCase()
    return entityTypes.filter(e => e.label.toLowerCase().includes(q))
  }, [searchP1])

  const totalPrice = useMemo(() => {
    if (cart.length === 0) return 0
    return 300 + (cart.length - 1) * 100
  }, [cart])

  /* ─── Handlers ─── */
  const toggleEntity = (id) => {
    setSelectedEntities(prev => {
      if (id === 'oricare') return prev.includes('oricare') ? [] : ['oricare']
      const without = prev.filter(e => e !== 'oricare')
      return without.includes(id) ? without.filter(e => e !== id) : [...without, id]
    })
    // Reset downstream if category becomes invalid
    setSelectedCategory(prev => {
      if (!prev) return null
      const newEntities = selectedEntities.includes(id)
        ? selectedEntities.filter(e => e !== id)
        : [...selectedEntities, id]
      if (newEntities.length === 0) return prev
      const allowed = new Set()
      newEntities.forEach(eid => (entityCategoryMap[eid] || []).forEach(c => allowed.add(c)))
      return allowed.has(prev) ? prev : null
    })
  }

  const addToCart = (service) => {
    if (cart.some(c => c.name === service.name)) return
    setCart(prev => [...prev, service])
  }

  const removeFromCart = (name) => {
    setCart(prev => prev.filter(c => c.name !== name))
  }

  const handleRequestQuote = () => {
    const serviceNames = cart.map(c => c.name).join(', ')
    onRequestQuote(serviceNames)
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const isInCart = (name) => cart.some(c => c.name === name)

  const p2Active = true // always show categories
  const p3Active = selectedCategory !== null || selectedEntities.length > 0

  /* ─── PANEL CONTENT RENDERERS ─── */
  const renderPanel1Content = () => (
    <>
      <PanelSearch value={searchP1} onChange={setSearchP1} placeholder="Caută tip..." />
      <div className="space-y-1 overflow-y-auto flex-1" style={{ maxHeight: 'calc(500px - 120px)' }}>
        {filteredEntities.map(entity => {
          const isSelected = selectedEntities.includes(entity.id)
          return (
            <button
              key={entity.id}
              onClick={() => toggleEntity(entity.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-base transition-all cursor-pointer ${
                isSelected ? 'bg-blue-50 text-[#1E40AF] font-medium' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                isSelected ? 'bg-[#1E40AF] border-[#1E40AF]' : 'border-gray-300'
              }`}>
                {isSelected && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span>{entity.label}</span>
            </button>
          )
        })}
      </div>
    </>
  )

  const renderPanel2Content = () => (
    <>
      <PanelSearch value={searchP2} onChange={setSearchP2} placeholder="Caută categorie..." />
      <div className="space-y-1 overflow-y-auto flex-1" style={{ maxHeight: 'calc(500px - 120px)' }}>
        {filteredCategories.map(cat => {
          const isAllowed = allowedCategories.includes(cat.id)
          const isSelected = selectedCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => isAllowed && setSelectedCategory(isSelected ? null : cat.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg text-left text-base transition-all ${
                !isAllowed ? 'opacity-40 cursor-not-allowed' :
                isSelected ? 'bg-blue-50 text-[#1E40AF] font-semibold ring-1 ring-[#1E40AF]/30' :
                'hover:bg-gray-50 text-gray-700 cursor-pointer'
              }`}
              disabled={!isAllowed}
            >
              <span className="text-xl">{cat.icon}</span>
              <span>{cat.label}</span>
              {isSelected && (
                <svg className="w-4 h-4 ml-auto text-[#1E40AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              {!isAllowed && (
                <span className="ml-auto text-xs text-gray-400">indisponibil</span>
              )}
            </button>
          )
        })}
      </div>
    </>
  )

  const renderPanel3Content = () => (
    <>
      {!p3Active ? (
        <div className="flex items-center justify-center h-full text-sm text-gray-400">
          ← Selectează mai întâi
        </div>
      ) : (
        <>
          <PanelSearch value={searchP3} onChange={setSearchP3} placeholder="Caută serviciu..." />
          <div className="space-y-1.5 overflow-y-auto flex-1" style={{ maxHeight: 'calc(500px - 120px)' }}>
            <AnimatePresence>
              {filteredServices.map(service => {
                const added = isInCart(service.name)
                return (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-base transition-all ${
                      added ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium truncate ${added ? 'text-green-700' : 'text-gray-800'}`}>
                          {service.name}
                        </span>
                        {service.popular && (
                          <span className="w-2 h-2 rounded-full bg-[#F59E0B] shrink-0" title="Popular" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                          {service.duration}
                        </span>
                        <span className="text-xs font-semibold text-[#1E40AF]">{cart.length === 0 || isInCart(service.name) ? '300 lei' : '+100 lei'}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => added ? removeFromCart(service.name) : addToCart(service)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                        added
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-[#1E40AF] text-white hover:bg-[#1E3A8A] active:scale-90'
                      }`}
                    >
                      {added ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </button>
                  </motion.div>
                )
              })}
            </AnimatePresence>
            {filteredServices.length === 0 && (
              <p className="text-center text-sm text-gray-400 py-8">Niciun serviciu găsit</p>
            )}
          </div>
        </>
      )}
    </>
  )

  const renderPanel4Content = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2" style={{ maxHeight: 'calc(500px - 190px)' }}>
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
            <svg className="w-10 h-10 mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <p className="text-sm font-medium">Coșul tău e gol</p>
            <p className="text-xs mt-1">Adaugă servicii din stânga →</p>
          </div>
        ) : (
          <AnimatePresence>
            {cart.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 leading-tight">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400 bg-gray-200/60 px-1.5 py-0.5 rounded">{item.category}</span>
                    <span className="text-xs font-semibold text-[#1E40AF]">{idx === 0 ? '300 lei' : '+100 lei'}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.name)}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Sticky bottom */}
      <div className="border-t border-gray-200 pt-4 mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Total estimat:</span>
          <span className="text-lg font-bold text-[#1E40AF]">{totalPrice > 0 ? `${totalPrice} lei` : '—'}</span>
        </div>
        <button
          onClick={handleRequestQuote}
          disabled={cart.length === 0}
          className={`w-full py-3 rounded-full font-semibold text-sm transition-all cursor-pointer ${
            cart.length > 0
              ? 'bg-[#F59E0B] text-gray-900 hover:bg-[#FCD34D] shadow-md'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Solicită ofertă gratuită
        </button>
      </div>
    </div>
  )

  /* ─── MOBILE SUMMARIES ─── */
  const p1Summary = selectedEntities.length > 0
    ? selectedEntities.map(id => entityTypes.find(e => e.id === id)?.label).filter(Boolean).join(', ')
    : null
  const p2Summary = selectedCategory
    ? categoryMeta.find(c => c.id === selectedCategory)?.label
    : null
  const p4Summary = cart.length > 0 ? `${cart.length} servicii` : null

  return (
    <>
      {/* ─── DESKTOP: 4 columns ─── */}
      <div className="hidden md:grid md:grid-cols-4 gap-4">
        {/* Panel 1 */}
        <div className="bg-white rounded-xl border border-gray-200 border-t-4 border-t-[#1E40AF] p-4 flex flex-col" style={{ height: 500 }}>
          <PanelHeader step={1} title="Tip firmă" active count={selectedEntities.length} />
          {renderPanel1Content()}
        </div>

        {/* Panel 2 */}
        <div className={`bg-white rounded-xl border border-gray-200 p-4 flex flex-col transition-opacity ${
          p2Active ? 'border-t-4 border-t-purple-500' : 'opacity-70'
        }`} style={{ height: 500 }}>
          <PanelHeader step={2} title="Categorie" active={p2Active} />
          {renderPanel2Content()}
        </div>

        {/* Panel 3 */}
        <div className={`bg-white rounded-xl border border-gray-200 p-4 flex flex-col transition-opacity ${
          p3Active ? 'border-t-4 border-t-green-500' : 'opacity-70'
        }`} style={{ height: 500 }}>
          <PanelHeader step={3} title="Alege serviciul" active={p3Active} />
          {renderPanel3Content()}
        </div>

        {/* Panel 4 */}
        <div className={`bg-white rounded-xl border border-gray-200 p-4 flex flex-col ${
          cart.length > 0 ? 'border-t-4 border-t-[#F59E0B]' : 'border-t-4 border-t-gray-300'
        }`} style={{ height: 500 }}>
          <PanelHeader step={4} title="Coșul tău" active={cart.length > 0} count={cart.length} />
          {renderPanel4Content()}
        </div>
      </div>

      {/* ─── MOBILE: Accordion stepper ─── */}
      <div className="md:hidden space-y-3">
        <MobileStep
          step={1}
          title="Tip firmă"
          isOpen={mobileStep === 1}
          isCompleted={selectedEntities.length > 0 && mobileStep !== 1}
          summary={p1Summary}
          onToggle={() => setMobileStep(mobileStep === 1 ? 0 : 1)}
        >
          {renderPanel1Content()}
        </MobileStep>

        <MobileStep
          step={2}
          title="Categorie"
          isOpen={mobileStep === 2}
          isCompleted={selectedCategory !== null && mobileStep !== 2}
          summary={p2Summary}
          onToggle={() => setMobileStep(mobileStep === 2 ? 0 : 2)}
        >
          {renderPanel2Content()}
        </MobileStep>

        <MobileStep
          step={3}
          title="Alege serviciul"
          isOpen={mobileStep === 3}
          isCompleted={cart.length > 0 && mobileStep !== 3}
          summary={`${filteredServices.length} disponibile`}
          onToggle={() => setMobileStep(mobileStep === 3 ? 0 : 3)}
        >
          {renderPanel3Content()}
        </MobileStep>

        <MobileStep
          step={4}
          title="Coșul tău"
          isOpen={mobileStep === 4}
          isCompleted={false}
          summary={p4Summary}
          onToggle={() => setMobileStep(mobileStep === 4 ? 0 : 4)}
        >
          {renderPanel4Content()}
        </MobileStep>
      </div>
    </>
  )
}
