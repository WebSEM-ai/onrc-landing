import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const faqs = [
  {
    q: 'Ce servicii se pot face prin ONRC?',
    a: 'Prin ONRC se pot efectua operațiuni prealabile (verificare și rezervare denumire), înmatriculări persoane fizice (PFA, II, IF) și persoane juridice (SRL, SA, SNC, SCS, SCA), mențiuni de modificare, depunere declarații beneficiari reali, dizolvări, lichidări, radieri, eliberare certificate constatatoare, copii certificate, informații din registrul comerțului și din Buletinul Procedurilor de Insolvență.',
  },
  {
    q: 'Cât durează înființarea unei firme prin ONRC?',
    a: 'Conform Legii nr. 265/2022, cererea de înregistrare se soluționează de către registrator în termen de o zi lucrătoare de la data înregistrării cererii complete. În practică, termenul total până la eliberarea certificatului este, în general, de aproximativ 3 zile lucrătoare.',
  },
  {
    q: 'Ce este portalul ONRC?',
    a: 'Portalul de servicii online al ONRC, disponibil la adresa portal.onrc.ro, permite depunerea cererilor de înmatriculare, mențiune sau radiere, solicitarea de certificate și copii, plata tarifelor și primirea documentelor în format electronic. Accesul necesită cont de utilizator și semnătură electronică calificată pentru semnarea documentelor.',
  },
  {
    q: 'Se percep taxe pentru radierea unei PFA?',
    a: 'Pentru operațiunile de radiere din registrul comerțului a PFA, II și IF nu se percep taxe și tarife, conform informațiilor publicate pe onrc.ro.',
  },
  {
    q: 'Cine poate reprezenta un profesionist la ONRC?',
    a: 'Conform art. 3 alin. (1) lit. e) din Legea nr. 265/2022, reprezentarea poate fi făcută de consilierul juridic salariat, avocatul cu împuternicire avocațială, persoana împuternicită cu procură specială sau generală în formă autentică, ori alte persoane salariate împuternicite.',
  },
  {
    q: 'Care este programul ONRC cu publicul?',
    a: 'Programul cu publicul, la sediul central și la majoritatea oficiilor de pe lângă tribunale, este de luni până vineri, între orele 09:00 – 13:00. Portalul online este accesibil 24/7.',
  },
  {
    q: 'Care sunt taxele pentru înființarea unui SRL?',
    a: 'Taxa oficială ONRC pentru înființarea unei societăți este de 152 lei. Taxele aferente altor modificări sau publicări în Monitorul Oficial variază între 150 și 390 lei, în funcție de tipul operațiunii. Act2Go include consultanța și pregătirea documentelor în pachetele afișate pe pagina de servicii.',
  },
  {
    q: 'Ce este declarația de beneficiar real și cât de des se depune?',
    a: 'Declarația privind beneficiarii reali este obligatorie la înmatricularea unei societăți, anual, precum și ori de câte ori intervine o modificare a datelor beneficiarilor. Se depune la ONRC conform Legii nr. 129/2019, modificată prin Legea nr. 86/2025.',
  },
]

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 text-sm md:text-base">{item.q}</span>
        <svg
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-0">
          <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
        </div>
      )}
    </div>
  )
}

export default function IntrebariFrecventePage() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" style={{ fontFamily: "'Sora', sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-[#1E40AF] flex items-center justify-center">
              <span className="text-white font-bold text-sm">ON</span>
            </div>
            <span className="text-lg font-bold text-gray-900 group-hover:text-[#1E40AF] transition-colors">Act<span className="text-[#F59E0B]">2Go</span></span>
          </Link>
          <Link to="/" className="text-sm text-[#1E40AF] font-medium hover:underline flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Inapoi la pagina principala
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E40AF] via-[#1E3A8A] to-[#172554] text-white py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#F59E0B] rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              FAQ · Întrebări frecvente
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "'Lora', serif" }}>
              Întrebări frecvente despre <span className="text-[#F59E0B]">serviciile ONRC</span>
            </h1>
            <p className="text-blue-200 text-base md:text-lg">
              Răspunsuri clare la cele mai comune întrebări despre Registrul Comerțului – taxe, durate, reprezentare și procedura online.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ list */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="space-y-3"
        >
          {faqs.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </motion.div>

        {/* Link to full services list */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 md:p-8 text-center">
          <h3 className="text-lg md:text-xl font-bold text-[#1E40AF] mb-2" style={{ fontFamily: "'Lora', serif" }}>
            Vrei lista completă cu toate serviciile ONRC?
          </h3>
          <p className="text-gray-600 mb-5 max-w-xl mx-auto">
            Am pregătit un ghid detaliat cu toate operațiunile care se pot efectua prin Registrul Comerțului, structurate pe 11 categorii oficiale.
          </p>
          <Link
            to="/servicii-onrc"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E40AF] text-white rounded-full text-sm font-semibold hover:bg-[#1E3A8A] transition-colors"
          >
            Vezi lista completă servicii ONRC
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Final CTA */}
        <div className="mt-10 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] rounded-2xl p-8 md:p-10 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F59E0B] rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ fontFamily: "'Lora', serif" }}>
              Nu ai găsit răspunsul căutat?
            </h3>
            <p className="text-blue-200 mb-6 max-w-xl mx-auto">
              Contactează echipa Act2Go pentru consultanță gratuită – te ajutăm să alegi procedura corectă și pachetul potrivit situației tale.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#F59E0B] text-gray-900 rounded-full text-base font-bold hover:bg-[#FCD34D] transition-colors shadow-lg"
            >
              Solicită consultanță gratuită
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Act2Go — Servicii profesionale Registrul Comertului</p>
          <p className="mt-1 text-gray-500">Toate serviciile sunt oferite de echipa noastra de specialisti autorizati.</p>
        </div>
      </footer>
    </div>
  )
}
