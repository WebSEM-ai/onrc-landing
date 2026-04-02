import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/* ─── DATA ─── */
const serviceCategories = [
  {
    id: 'infiintare',
    icon: '🏢',
    title: 'Infiintare firme',
    subtitle: 'SRL, PFA, II, IF, SA, SRL-D',
    description: 'Procesul complet de inregistrare a firmelor noi la Registrul Comertului. Ne ocupam de tot, de la pregatirea documentelor pana la obtinerea certificatului de inregistrare.',
    includes: ['Act constitutiv', 'Declaratii pe propria raspundere', 'Cereri de inregistrare', 'Depunere dosar complet', 'Obtinere certificat de inregistrare'],
    color: 'blue',
  },
  {
    id: 'modificari',
    icon: '✏️',
    title: 'Modificari firma',
    subtitle: 'Sediu, administrator, CAEN, capital, asociati',
    description: 'Orice modificare a datelor firmei inscrise la Registrul Comertului: de la schimbarea sediului social, la adaugarea unui nou asociat sau actualizarea codurilor CAEN.',
    includes: ['Pregatire documentatie completa', 'Depunere dosar la ONRC', 'Obtinere certificat actualizat'],
    color: 'purple',
  },
  {
    id: 'gazduire',
    icon: '🏠',
    title: 'Gazduire sediu social',
    subtitle: '12 luni sau 24 luni',
    description: 'Oferim adresa de sediu social pentru firma ta, cu contract de gazduire valabil la Registrul Comertului. Disponibil pe perioade de 12 sau 24 luni.',
    includes: ['Contract gazduire sediu social', 'Adresa valabila ONRC', 'Prelungire simpla la expirare'],
    color: 'teal',
  },
  {
    id: 'radiere',
    icon: '📁',
    title: 'Radiere & Dizolvare',
    subtitle: 'Radiere SRL/PFA, dizolvare, suspendare',
    description: 'Inchiderea sau suspendarea activitatii unei firme. Parcurgem toate etapele legale necesare, inclusiv publicarea in Monitorul Oficial si depunerea actelor la ONRC.',
    includes: ['Hotarare dizolvare', 'Publicare Monitor Oficial', 'Depunere acte radiere', 'Obtinere certificat radiere'],
    color: 'red',
  },
  {
    id: 'mentiuni',
    icon: '📋',
    title: 'Mentiuni & Depuneri',
    subtitle: 'Situatii financiare, AML, acte',
    description: 'Depuneri periodice si actualizari obligatorii la Registrul Comertului: situatii financiare anuale, declaratii privind beneficiarul real (AML), acte constitutive actualizate.',
    includes: ['Depunere situatii financiare', 'Actualizare beneficiar real', 'Depunere acte la dosar'],
    color: 'green',
  },
  {
    id: 'documente',
    icon: '🔍',
    title: 'Obtinere documente',
    subtitle: 'Certificat constatator, extras RECOM',
    description: 'Obtinerea documentelor oficiale de la Registrul Comertului: certificate constatatoare, extrase RECOM, copii certificate de inregistrare, caziere fiscale.',
    includes: ['Certificat constatator', 'Extras RECOM online', 'Copii acte dosar firma', 'Cazier fiscal'],
    color: 'orange',
  },
]

const colorMap = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-100 text-blue-700', tag: 'bg-blue-100 text-blue-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-100 text-purple-700', tag: 'bg-purple-100 text-purple-700' },
  red: { bg: 'bg-red-50', border: 'border-red-200', icon: 'bg-red-100 text-red-700', tag: 'bg-red-100 text-red-700' },
  green: { bg: 'bg-green-50', border: 'border-green-200', icon: 'bg-green-100 text-green-700', tag: 'bg-green-100 text-green-700' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'bg-orange-100 text-orange-700', tag: 'bg-orange-100 text-orange-700' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', icon: 'bg-teal-100 text-teal-700', tag: 'bg-teal-100 text-teal-700' },
}

const packages = [
  {
    id: 'start-rapid',
    name: 'Start Rapid',
    price: '499',
    popular: false,
    features: [
      'Infiintare SRL sau PFA',
      'Contabilitate gratuita inclusa (primele 2 luni)',
      'Consultanta alegere cod CAEN Rev.3',
      'Asistenta la fiecare pas',
    ],
    note: 'Taxele ONRC de 152 lei nu sunt incluse',
    example: 'Ideal pentru freelanceri si consultanti',
    color: 'blue',
  },
  {
    id: 'business-online',
    name: 'Business Online',
    price: '699',
    popular: false,
    features: [
      'Infiintare SRL',
      'Domeniu .ro + hosting (1 an)',
      'Consultanta CAEN Rev.3',
      'Configurare initiala domeniu',
    ],
    note: 'Taxele ONRC de 152 lei nu sunt incluse',
    example: 'Perfect pentru e-commerce, dropshipping, servicii digitale — ca Emag, FashionDays',
    color: 'indigo',
  },
  {
    id: 'ride-drive',
    name: 'Ride & Drive',
    price: '799',
    popular: false,
    features: [
      'Infiintare SRL sau PFA',
      'Ridesharing Uber / Bolt',
      'Consultanta licente transport',
      'Asistenta completa autorizatii',
    ],
    note: 'Taxele ONRC de 152 lei nu sunt incluse',
    example: 'Ideal pentru ridesharing Uber, Bolt',
    color: 'teal',
  },
  {
    id: 'business-complet',
    name: 'Business Complet',
    price: '999',
    popular: true,
    features: [
      'Infiintare SRL',
      'Consultanta completa CAEN + forma juridica',
      'Certificat constatator inclus',
      'Asistenta prioritara dedicata',
    ],
    note: 'Taxele ONRC de 152 lei nu sunt incluse',
    example: 'Pachetul all-inclusive — restaurant, salon, constructii — ca McDonald\'s, Dedeman',
    color: 'amber',
  },
]

/* ─── ANIMATION VARIANTS ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

/* ─── SERVICE CARD ─── */
function ServiceCard({ service, index }) {
  const colors = colorMap[service.color] || colorMap.blue

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={fadeUp}
      className={`rounded-2xl border ${colors.border} ${colors.bg} p-6 hover:shadow-lg transition-shadow`}
    >
      <div className="flex items-start gap-4 mb-4">
        <span className="text-3xl shrink-0">{service.icon}</span>
        <div>
          <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Lora', serif" }}>
            {service.title}
          </h3>
          <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors.tag}`}>
            {service.subtitle}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        {service.description}
      </p>
      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Ce include</h4>
        <ul className="space-y-1.5">
          {service.includes.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
              <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5 pt-4 border-t border-gray-200/60">
        <Link
          to="/#contact"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E40AF] hover:text-[#1E3A8A] transition-colors"
        >
          Solicita o oferta
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  )
}

/* ─── PACKAGE CARD ─── */
function PackageCard({ pkg, index }) {
  const isPopular = pkg.popular

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={fadeUp}
      className={`relative rounded-2xl border-2 p-6 flex flex-col transition-shadow hover:shadow-xl ${
        isPopular
          ? 'border-[#F59E0B] bg-gradient-to-b from-amber-50 to-white shadow-lg scale-[1.03] z-10'
          : 'border-gray-200 bg-white'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#F59E0B] text-gray-900 text-xs font-bold uppercase tracking-wide shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
            Cel mai popular
          </span>
        </div>
      )}

      <div className={`${isPopular ? 'mt-2' : ''}`}>
        <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Lora', serif" }}>
          {pkg.name}
        </h3>
        <div className="flex items-baseline gap-1 mt-2 mb-1">
          <span className="text-4xl font-bold text-[#1E40AF]">{pkg.price}</span>
          <span className="text-base text-gray-500 font-medium">lei</span>
        </div>
        <p className="text-xs text-gray-400 mb-5">pret fix, fara costuri ascunse</p>
      </div>

      <ul className="space-y-2.5 flex-1 mb-6">
        {pkg.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <svg className="w-4 h-4 text-[#1E40AF] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {pkg.note && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
          <p className="text-xs text-amber-700 font-medium">{pkg.note}</p>
        </div>
      )}

      <div className="bg-gray-50 rounded-xl px-4 py-3 mb-5">
        <p className="text-xs text-gray-500 leading-relaxed">
          <span className="font-semibold text-gray-600">Exemplu: </span>
          {pkg.example}
        </p>
      </div>

      <Link
        to="/#contact"
        className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-colors ${
          isPopular
            ? 'bg-[#F59E0B] text-gray-900 hover:bg-[#FCD34D] shadow-md'
            : 'bg-[#1E40AF] text-white hover:bg-[#1E3A8A]'
        }`}
      >
        Alege {pkg.name}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </motion.div>
  )
}

/* ─── MAIN COMPONENT ─── */
export default function ServiciiPage() {
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
            Inapoi la pagina principala
          </Link>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="bg-gradient-to-br from-[#1E40AF] via-[#1E3A8A] to-[#172554] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#F59E0B] rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Servicii complete Registrul Comertului
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Lora', serif" }}>
              Toate serviciile <span className="text-[#F59E0B]">ONRC</span> intr-un singur loc
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto mb-6">
              De la infiintarea firmei pana la obtinerea documentelor oficiale — ne ocupam de toate formalitatile la Registrul Comertului.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#pachete"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#F59E0B] text-gray-900 rounded-full text-base font-bold hover:bg-[#FCD34D] transition-colors shadow-lg"
              >
                Vezi pachetele de start
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full text-base font-semibold hover:bg-white/20 transition-colors"
              >
                Contacteaza-ne
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 1: DESCRIERE SERVICII ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Lora', serif" }}>
            Serviciile noastre
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Acoperim intreaga gama de servicii la Registrul Comertului. Alege categoria care te intereseaza si afla ce include.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* ─── SECTION 2: PACHETE DE START ─── */}
      <section id="pachete" className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Pachete de start
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Lora', serif" }}>
              Alege pachetul potrivit pentru tine
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Pachete complete cu tot ce ai nevoie pentru a-ti incepe afacerea. Pret fix, fara surprize, cu asistenta inclusa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>

          {/* Extra info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gray-400">
              Toate preturile includ TVA. Taxele ONRC aferente publicarii in Monitorul Oficial nu sunt incluse in pret si pot varia intre 150–390 lei.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F59E0B] rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Lora', serif" }}>
              Nu stii ce serviciu ai nevoie?
            </h2>
            <p className="text-blue-200 mb-6 max-w-lg mx-auto">
              Contacteaza-ne si te ajutam sa alegi solutia potrivita pentru situatia ta. Consultanta initiala este gratuita.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#F59E0B] text-gray-900 rounded-full text-base font-bold hover:bg-[#FCD34D] transition-colors shadow-lg"
              >
                Solicita consultanta gratuita
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/caen"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full text-base font-semibold hover:bg-white/20 transition-colors"
              >
                Exploreaza coduri CAEN
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ONRC.ro — Servicii profesionale Registrul Comertului</p>
          <p className="mt-1 text-gray-500">Toate serviciile sunt oferite de echipa noastra de specialisti autorizati.</p>
        </div>
      </footer>
    </div>
  )
}
