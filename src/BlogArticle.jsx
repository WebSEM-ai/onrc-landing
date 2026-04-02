import { useParams, Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import blogPosts from './data/blogPosts'

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })
}

/* ─── SECTION RENDERERS ─── */
function SectionIntro({ section }) {
  return (
    <div className="space-y-4">
      {section.content.map((p, i) => (
        <p key={i} className="text-gray-700 leading-relaxed">{p}</p>
      ))}
    </div>
  )
}

function SectionHeading({ section }) {
  return (
    <h2
      className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-4"
      style={{ fontFamily: "'Lora', serif" }}
    >
      {section.title}
    </h2>
  )
}

function SectionSubheading({ section }) {
  return (
    <h3
      className="text-lg font-bold text-gray-800 mt-8 mb-3"
      style={{ fontFamily: "'Lora', serif" }}
    >
      {section.title}
    </h3>
  )
}

function SectionParagraph({ section }) {
  return <p className="text-gray-700 leading-relaxed">{section.content}</p>
}

function SectionList({ section }) {
  if (section.variant === 'detailed' || section.variant === 'numbered') {
    return (
      <ol className="space-y-3 my-4">
        {section.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-700">
            {section.variant === 'numbered' ? (
              <span className="w-6 h-6 rounded-full bg-[#1E40AF] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
            ) : (
              <svg className="w-5 h-5 text-[#1E40AF] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            <span><strong className="text-gray-900">{item.bold}</strong> — {item.text}</span>
          </li>
        ))}
      </ol>
    )
  }
  return (
    <ul className="space-y-2 my-4">
      {section.items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-gray-700">
          <svg className="w-5 h-5 text-[#1E40AF] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function SectionHighlight({ section }) {
  return (
    <div className="my-6 bg-amber-50 border-l-4 border-[#F59E0B] rounded-r-xl px-6 py-4">
      <p className="text-gray-800 font-medium leading-relaxed">{section.content}</p>
    </div>
  )
}

function SectionCtaInline({ section }) {
  return (
    <div className="my-8 bg-blue-50 border border-blue-200 rounded-2xl p-6 md:p-8">
      <h3 className="text-lg font-bold text-[#1E40AF] mb-2" style={{ fontFamily: "'Lora', serif" }}>
        {section.title}
      </h3>
      <p className="text-gray-600 mb-4">{section.content}</p>
      <Link
        to="/#contact"
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1E40AF] text-white rounded-full text-sm font-semibold hover:bg-[#1E3A8A] transition-colors"
      >
        Contacteaza-ne
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  )
}

function renderSection(section, index) {
  switch (section.type) {
    case 'intro': return <SectionIntro key={index} section={section} />
    case 'heading': return <SectionHeading key={index} section={section} />
    case 'subheading': return <SectionSubheading key={index} section={section} />
    case 'paragraph': return <SectionParagraph key={index} section={section} />
    case 'list': return <SectionList key={index} section={section} />
    case 'highlight': return <SectionHighlight key={index} section={section} />
    case 'cta-inline': return <SectionCtaInline key={index} section={section} />
    default: return null
  }
}

/* ─── FAQ ITEM ─── */
function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 text-sm md:text-base">{item.question}</span>
        <svg
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-0">
          <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  )
}

/* ─── MAIN COMPONENT ─── */
export default function BlogArticle() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)
  const [openFaq, setOpenFaq] = useState(null)

  if (!post) return <Navigate to="/blog" replace />

  // Find related posts
  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Sora', sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-[#1E40AF] flex items-center justify-center">
              <span className="text-white font-bold text-sm">ON</span>
            </div>
            <span className="text-lg font-bold text-gray-900 group-hover:text-[#1E40AF] transition-colors">ONRC<span className="text-[#F59E0B]">.ro</span></span>
          </Link>
          <Link to="/blog" className="text-sm text-[#1E40AF] font-medium hover:underline flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Inapoi la blog
          </Link>
        </div>
      </header>

      {/* Article Header */}
      <section className="bg-gradient-to-br from-[#1E40AF] via-[#1E3A8A] to-[#172554] text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#F59E0B] rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm">
                {post.category}
              </span>
              <span className="text-blue-200 text-sm">{formatDate(post.date)}</span>
              <span className="text-blue-200 text-sm">{post.readTime} lectura</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4" style={{ fontFamily: "'Lora', serif" }}>
              {post.title}
            </h1>
            <p className="text-blue-200 text-base md:text-lg">{post.excerpt}</p>
          </motion.div>
        </div>
      </section>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        {post.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 rounded-2xl overflow-hidden shadow-lg"
          >
            <img src={post.image} alt={post.title} className="w-full h-64 md:h-80 object-cover" />
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose-custom space-y-4"
        >
          {post.sections.map((section, i) => renderSection(section, i))}
        </motion.div>

        {/* FAQ */}
        {post.faq && post.faq.length > 0 && (
          <div className="mt-14">
            <h2
              className="text-xl md:text-2xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Intrebari frecvente
            </h2>
            <div className="space-y-3">
              {post.faq.map((item, i) => (
                <FaqItem
                  key={i}
                  item={item}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Final CTA */}
        {post.ctaFinal && (
          <div className="mt-14 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] rounded-2xl p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F59E0B] rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ fontFamily: "'Lora', serif" }}>
                {post.ctaFinal.title}
              </h3>
              <p className="text-blue-200 mb-6">{post.ctaFinal.content}</p>
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#F59E0B] text-gray-900 rounded-full text-base font-bold hover:bg-[#FCD34D] transition-colors shadow-lg"
              >
                Solicita consultanta gratuita
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        )}

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-14 pt-10 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6" style={{ fontFamily: "'Lora', serif" }}>
              Alte articole
            </h3>
            <div className="grid gap-4">
              {relatedPosts.map(rp => (
                <Link
                  key={rp.id}
                  to={`/blog/${rp.slug}`}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#1E40AF]/30 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#1E40AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#1E40AF] transition-colors leading-tight">
                      {rp.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(rp.date)} — {rp.readTime} lectura</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ONRC.ro — Servicii profesionale Registrul Comertului</p>
          <p className="mt-1 text-gray-500">Toate serviciile sunt oferite de echipa noastra de specialisti autorizati.</p>
        </div>
      </footer>
    </div>
  )
}
