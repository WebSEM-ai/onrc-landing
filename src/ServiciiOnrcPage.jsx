import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/* ─── DATA: 11 sectiuni ONRC ─── */
const sections = [
  {
    id: 'operatiuni-prealabile',
    num: '1',
    title: 'Operațiuni prealabile',
    lead: 'Înainte de înmatricularea oricărui profesionist, legea impune o serie de verificări și rezervări. Acestea se efectuează fie la ghișeu, fie online, prin portalul ONRC.',
    card: {
      heading: 'Servicii disponibile',
      items: [
        'Verificarea disponibilității și rezervarea denumirii firmei (pentru SRL, SA, SNC etc.)',
        'Verificarea disponibilității și rezervarea denumirii pentru PFA, II, IF',
        'Verificarea unicității calității de titular PFA / titular întreprindere individuală / reprezentant întreprindere familială',
        'Obținerea informațiilor din cazierul fiscal (prin grija personalului ORCT)',
        'Consultarea Nomenclatorului CAEN și conversia CAEN Rev.2 – CAEN Rev.3',
      ],
    },
  },
  {
    id: 'inmatriculari-pf',
    num: '2',
    title: 'Înmatriculări persoane fizice',
    lead: 'Persoanele fizice care doresc să desfășoare activități economice se pot înregistra la ONRC în una din cele trei forme reglementate de OUG nr. 44/2008.',
    grid: [
      { bold: 'Persoană Fizică Autorizată (PFA)', text: 'Înregistrare PFA cu obiect de activitate unic sau multiplu, conform CAEN Rev.3.' },
      { bold: 'Întreprindere Individuală (II)', text: 'Formă de organizare fără personalitate juridică, cu unic titular.' },
      { bold: 'Întreprindere Familială (IF)', text: 'Formă compusă din membrii unei familii, cu reprezentant desemnat.' },
    ],
    list: {
      heading: 'Operațiuni de înmatriculare persoane fizice',
      items: [
        'Cerere de înregistrare PFA / II / IF',
        'Anexa privind înregistrarea fiscală',
        'Declarația-tip pe propria răspundere privind îndeplinirea condițiilor de funcționare',
        'Înregistrarea sediului profesional și a punctelor de lucru',
        'Declararea activităților autorizate la sediu / la terți / fără sediu',
      ],
    },
  },
  {
    id: 'inmatriculari-pj',
    num: '3',
    title: 'Înmatriculări persoane juridice',
    lead: 'Societățile comerciale se înființează în baza Legii nr. 31/1990 privind societățile. Dosarul de înmatriculare cuprinde actele constitutive, dovezile privind sediul, aporturile la capital și declarațiile asociaților.',
    card: {
      heading: 'Forme juridice care se înmatriculează la ONRC',
      items: [
        'Societate cu Răspundere Limitată (SRL) – inclusiv SRL cu asociat unic',
        'Societate pe Acțiuni (SA)',
        'Societate în Nume Colectiv (SNC)',
        'Societate în Comandită Simplă (SCS)',
        'Societate în Comandită pe Acțiuni (SCA)',
        'Societate Europeană (SE)',
        'Societate Cooperativă (SC) și Societate Cooperativă Europeană',
        'Grupuri de Interes Economic (GIE) și Grupuri Europene de Interes Economic (GEIE)',
        'Regii autonome și companii / societăți naționale',
        'Organizații cooperatiste',
      ],
    },
  },
  {
    id: 'sucursale',
    num: '4',
    title: 'Înregistrare sucursale',
    lead: 'Sucursalele sunt dezmembrăminte fără personalitate juridică ale unei societăți mamă. Se înregistrează separat la registrul comerțului din raza teritorială a sediului.',
    list: {
      items: [
        'Înmatricularea sucursalelor societăților române',
        'Înmatricularea sucursalelor societăților străine în România',
        'Mențiuni privind sucursalele (modificare, suspendare, radiere)',
        'Interconectarea cu sistemul european de registre (BRIS)',
      ],
    },
  },
  {
    id: 'mentiuni-pf',
    num: '5',
    title: 'Mențiuni persoane fizice',
    lead: 'Orice modificare intervenită în activitatea unei PFA, II sau IF trebuie înregistrată la registrul comerțului, conform Legii nr. 265/2022.',
    card: {
      items: [
        'Modificarea / actualizarea obiectului de activitate (inclusiv conversia CAEN Rev.3)',
        'Schimbarea sediului profesional',
        'Înființarea, mutarea sau desființarea punctelor de lucru',
        'Schimbarea titularului / reprezentantului',
        'Modificarea datelor de identificare (nume, adresă, act de identitate)',
        'Suspendarea temporară a activității (maximum 3 ani)',
        'Reluarea activității după suspendare',
        'Schimbarea formei de organizare (PFA ↔ II ↔ IF)',
        'Modificarea componenței întreprinderii familiale',
      ],
    },
  },
  {
    id: 'mentiuni-pj',
    num: '6',
    title: 'Mențiuni persoane juridice',
    lead: 'Pentru societăți, lista de mențiuni este mai amplă, fiind aliniată la Legea societăților nr. 31/1990 și Legea nr. 265/2022.',
    subgroups: [
      {
        heading: 'Modificări privind societatea',
        items: [
          'Schimbarea denumirii firmei',
          'Schimbarea sediului social',
          'Prelungirea duratei sediului social',
          'Modificarea / extinderea / restrângerea obiectului de activitate (CAEN)',
          'Actualizarea activităților conform CAEN Rev.3',
          'Schimbarea formei juridice (ex. SRL în SA)',
          'Fuziuni și divizări',
          'Transformarea societății',
        ],
      },
      {
        heading: 'Modificări privind capitalul',
        items: [
          'Majorarea capitalului social (aport numerar, în natură, prin conversie)',
          'Reducerea capitalului social',
          'Reîntregirea capitalului social',
        ],
      },
      {
        heading: 'Modificări privind asociații / acționarii',
        items: [
          'Cesiunea părților sociale / acțiunilor',
          'Intrarea / retragerea asociaților',
          'Moștenirea părților sociale',
          'Modificarea datelor de identificare ale asociaților',
        ],
      },
      {
        heading: 'Modificări privind administrarea',
        items: [
          'Numirea / revocarea administratorilor sau directorilor',
          'Prelungirea mandatului organelor de conducere',
          'Schimbarea puterilor de reprezentare',
          'Modificarea cenzorilor / auditorilor',
        ],
      },
      {
        heading: 'Alte mențiuni',
        items: [
          'Înființarea / mutarea / desființarea punctelor de lucru',
          'Autorizarea funcționării punctelor de lucru',
          'Suspendarea activității societății (până la 3 ani)',
          'Reluarea activității',
          'Depunerea situațiilor financiare anuale',
          'Depunerea hotărârilor AGA și a actelor adiționale',
          'Înscrierea mandatelor de ipotecă mobiliară / imobiliară pe părți sociale',
          'Modificarea tipului de administrare (unitar / dualist)',
        ],
      },
    ],
  },
  {
    id: 'depunere-acte',
    num: '7',
    title: 'Depunere de acte și îndreptare erori materiale',
    list: {
      items: [
        'Depunere situații financiare anuale și semestriale',
        'Depunere hotărâri ale adunării generale (AGA)',
        'Depunere acte adiționale și acte constitutive actualizate',
        'Depunere specimene de semnătură',
        'Îndreptarea erorilor materiale din registrul comerțului',
        'Depunere documente aferente procedurilor de insolvență',
      ],
    },
  },
  {
    id: 'beneficiari-reali',
    num: '8',
    title: 'Registrul Beneficiarilor Reali (RBR)',
    lead: 'Conform Legii nr. 129/2019, modificată prin Legea nr. 86/2025, toate persoanele juridice au obligația de a declara beneficiarii reali la ONRC.',
    card: {
      items: [
        'Depunerea declarației privind beneficiarii reali – la înmatriculare',
        'Depunerea declarației anuale de beneficiari reali',
        'Mențiuni privind modificarea beneficiarilor reali',
        'Obținerea informațiilor din RBR (pentru persoanele cu interes legitim)',
        'Eliberarea de copii certificate din RBR',
      ],
    },
  },
  {
    id: 'dizolvari',
    num: '9',
    title: 'Dizolvări, lichidări și radieri',
    lead: 'Închiderea unei activități se realizează printr-o procedură etapizată, reglementată de Legea nr. 31/1990 și OUG nr. 44/2008.',
    subgroups: [
      {
        heading: 'Pentru persoane fizice (PFA, II, IF)',
        items: [
          'Radierea PFA',
          'Radierea Întreprinderii Individuale',
          'Radierea Întreprinderii Familiale',
          'Radierea ca urmare a decesului titularului',
        ],
      },
      {
        heading: 'Pentru persoane juridice',
        items: [
          'Dizolvarea voluntară a societății (hotărâre AGA)',
          'Dizolvarea și lichidarea simultană (art. 235 din Legea nr. 31/1990)',
          'Numirea / revocarea lichidatorului',
          'Depunerea bilanțului de lichidare',
          'Radierea societății din registrul comerțului',
          'Radierea sucursalelor',
          'Radiere ca urmare a hotărârii judecătorești',
        ],
      },
    ],
    note: {
      title: 'De reținut',
      text: 'Pentru operațiunile de radiere din registrul comerțului a PFA, II și IF nu se percep taxe și tarife, conform informațiilor publicate pe onrc.ro.',
    },
  },
  {
    id: 'informatii',
    num: '10',
    title: 'Informații și certificate',
    lead: 'ONRC eliberează o gamă largă de documente oficiale, atât pentru persoanele înregistrate, cât și pentru terții cu interes legitim.',
    subgroups: [
      {
        heading: 'Certificate',
        items: [
          'Certificat constatator pentru sediul social',
          'Certificat constatator pentru punctele de lucru',
          'Certificat constatator de conformitate',
          'Certificat de înregistrare (CUI) – emitere și duplicat',
          'Certificat privind depunerea situațiilor financiare',
          'Certificat privind starea firmei (activă / suspendată / radiată)',
        ],
      },
      {
        heading: 'Copii și extrase',
        items: [
          'Copii certificate de pe actele depuse la registrul comerțului',
          'Extrase din registrul comerțului',
          'Copii certificate din Registrul Beneficiarilor Reali',
        ],
      },
      {
        heading: 'Informații specializate',
        items: [
          'Informații de bază (Recom online – gratuit)',
          'Informații extinse despre profesioniști',
          'Informații statistice',
          'Informații istorice privind firma',
          'Verificări privind interdicțiile administratorilor',
        ],
      },
      {
        heading: 'Buletinul Procedurilor de Insolvență (BPI)',
        items: [
          'Publicarea procedurilor de insolvență',
          'Copii și extrase din BPI',
          'Abonamente la BPI',
        ],
      },
    ],
  },
  {
    id: 'servicii-online',
    num: '11',
    title: 'Servicii online și portalul ONRC',
    lead: 'Portalul de servicii online al ONRC este disponibil la adresa portal.onrc.ro și permite depunerea majorității cererilor fără deplasare la ghișeu. Pentru semnarea documentelor este necesar un certificat digital calificat emis de un furnizor acreditat.',
    card: {
      heading: 'Ce se poate face online',
      items: [
        'Crearea contului de utilizator (gratuit)',
        'Verificarea și rezervarea denumirii firmei',
        'Depunerea cererilor de înmatriculare, mențiune, radiere',
        'Achitarea online a tarifelor',
        'Urmărirea stadiului cererilor (secțiunea „Cererile mele")',
        'Primirea documentelor în format electronic, semnate cu semnătură electronică calificată sau sigiliu electronic',
        'Solicitarea de certificate constatatoare și informații',
        'Accesul la Buletinul Electronic al Registrului Comerțului (BERC)',
      ],
    },
  },
]

/* ─── COMPONENTS ─── */
function CheckList({ items }) {
  return (
    <ul className="space-y-2 my-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-gray-700 text-sm md:text-base leading-relaxed">
          <svg className="w-5 h-5 text-[#1E40AF] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Section({ section, index }) {
  return (
    <motion.section
      id={section.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.05 }}
      className="scroll-mt-24"
    >
      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-[#F59E0B] font-bold text-sm md:text-base tracking-wider">{section.num.padStart(2, '0')}</span>
        <h2 className="text-xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: "'Lora', serif" }}>
          {section.title}
        </h2>
      </div>

      {section.lead && (
        <p className="text-gray-600 leading-relaxed mb-5 max-w-3xl">{section.lead}</p>
      )}

      {section.grid && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">
          {section.grid.map((g, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <strong className="block text-[#1E40AF] text-sm mb-1">{g.bold}</strong>
              <p className="text-sm text-gray-600 leading-relaxed">{g.text}</p>
            </div>
          ))}
        </div>
      )}

      {section.card && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 my-4">
          {section.card.heading && (
            <h3 className="text-base font-bold text-gray-900 mb-2" style={{ fontFamily: "'Lora', serif" }}>
              {section.card.heading}
            </h3>
          )}
          <CheckList items={section.card.items} />
        </div>
      )}

      {section.list && (
        <div className="my-4">
          {section.list.heading && (
            <h3 className="text-base font-bold text-gray-900 mb-2" style={{ fontFamily: "'Lora', serif" }}>
              {section.list.heading}
            </h3>
          )}
          <CheckList items={section.list.items} />
        </div>
      )}

      {section.subgroups && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 my-4 space-y-5">
          {section.subgroups.map((sg, i) => (
            <div key={i}>
              <h3 className="text-base font-bold text-[#1E40AF] mb-1" style={{ fontFamily: "'Lora', serif" }}>
                {sg.heading}
              </h3>
              <CheckList items={sg.items} />
            </div>
          ))}
        </div>
      )}

      {section.note && (
        <div className="my-5 bg-amber-50 border-l-4 border-[#F59E0B] rounded-r-xl px-5 py-4">
          <p className="text-gray-800 text-sm md:text-base leading-relaxed">
            <strong className="text-[#B45309]">{section.note.title}:</strong> {section.note.text}
          </p>
        </div>
      )}
    </motion.section>
  )
}

/* ─── MAIN ─── */
export default function ServiciiOnrcPage() {
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
          <Link to="/servicii" className="text-sm text-[#1E40AF] font-medium hover:underline flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Inapoi la Servicii
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E40AF] via-[#1E3A8A] to-[#172554] text-white py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#F59E0B] rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Ghid informativ · Actualizat 2026
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "'Lora', serif" }}>
              Lista completă cu serviciile <span className="text-[#F59E0B]">Oficiului Național al Registrului Comerțului</span>
            </h1>
            <p className="text-blue-200 text-base md:text-lg max-w-3xl">
              Toate operațiunile pe care un profesionist, antreprenor sau persoană interesată le poate efectua prin Registrul Comerțului din România – structurate pe categorii oficiale, conform Legii nr. 265/2022.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="prose-custom space-y-4 text-gray-700"
        >
          <p className="leading-relaxed">
            Oficiul Național al Registrului Comerțului (ONRC) funcționează în subordinea Ministerului Justiției și este instituția responsabilă cu înregistrarea și evidența profesioniștilor din România – societăți comerciale, persoane fizice autorizate, întreprinderi individuale și familiale. Registrul Comerțului este organizat pe două niveluri: cel național, reprezentat de ONRC, și cel local, reprezentat de cele 42 de oficii teritoriale de pe lângă tribunale.
          </p>
          <p className="leading-relaxed">
            Pagina aceasta prezintă informativ, pentru scop educativ și de orientare, lista completă a serviciilor publice oferite prin ONRC, așa cum sunt structurate oficial pe <a className="text-[#1E40AF] font-medium hover:underline" href="https://www.onrc.ro" rel="nofollow noopener" target="_blank">onrc.ro</a> și pe portalul de servicii online <a className="text-[#1E40AF] font-medium hover:underline" href="https://portal.onrc.ro" rel="nofollow noopener" target="_blank">portal.onrc.ro</a>.
          </p>
        </motion.div>

        {/* TOC */}
        <nav aria-label="Cuprins" className="my-10 bg-blue-50 border-l-4 border-[#1E40AF] rounded-r-xl px-6 py-5">
          <h2 className="text-base font-bold text-gray-900 mb-3" style={{ fontFamily: "'Lora', serif" }}>Cuprins</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 list-decimal list-inside text-sm">
            {sections.map(s => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-[#1E40AF] hover:underline">{s.title}</a>
              </li>
            ))}
            <li>
              <Link to="/intrebari-frecvente" className="text-[#1E40AF] hover:underline">Întrebări frecvente</Link>
            </li>
          </ol>
        </nav>

        {/* Sections */}
        <div className="space-y-12 md:space-y-14">
          {sections.map((s, i) => <Section key={s.id} section={s} index={i} />)}
        </div>

        {/* FAQ teaser */}
        <div className="my-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 md:p-8 text-center">
          <h3 className="text-lg md:text-xl font-bold text-[#1E40AF] mb-2" style={{ fontFamily: "'Lora', serif" }}>
            Ai nelămuriri despre serviciile ONRC?
          </h3>
          <p className="text-gray-600 mb-5 max-w-xl mx-auto">
            Am pregătit o pagină dedicată cu cele mai frecvente întrebări despre durate, taxe, reprezentare și portalul online.
          </p>
          <Link
            to="/intrebari-frecvente"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E40AF] text-white rounded-full text-sm font-semibold hover:bg-[#1E3A8A] transition-colors"
          >
            Vezi întrebările frecvente
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 pt-8 border-t border-gray-200 text-sm text-gray-500 space-y-3">
          <p>
            <strong className="text-gray-700">Notă:</strong> Această pagină are caracter exclusiv informativ și nu reprezintă o sursă oficială. Pentru documente, formulare și tarife actualizate, consultați întotdeauna sursa oficială <a className="text-[#1E40AF] hover:underline" href="https://www.onrc.ro" rel="nofollow noopener" target="_blank">www.onrc.ro</a> sau portalul de servicii <a className="text-[#1E40AF] hover:underline" href="https://portal.onrc.ro" rel="nofollow noopener" target="_blank">portal.onrc.ro</a>. Informațiile pot suferi modificări legislative.
          </p>
          <p>
            Temei legal de referință: Legea nr. 265/2022 privind registrul comerțului, Legea nr. 31/1990 privind societățile, OUG nr. 44/2008 privind PFA, II și IF, Legea nr. 129/2019 privind prevenirea spălării banilor (modificată prin Legea nr. 86/2025).
          </p>
        </div>

        {/* Final CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] rounded-2xl p-8 md:p-10 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F59E0B] rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ fontFamily: "'Lora', serif" }}>
              Ai nevoie de asistență pentru o operațiune la Registrul Comerțului?
            </h3>
            <p className="text-blue-200 mb-6 max-w-xl mx-auto">
              Echipa Act2Go te poate ghida prin procedurile ONRC, de la rezervarea denumirii și înființarea firmei până la mențiuni sau radieri.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#F59E0B] text-gray-900 rounded-full text-base font-bold hover:bg-[#FCD34D] transition-colors shadow-lg"
            >
              Contactează-ne
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </article>

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
