import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import blogPosts from './data/blogPosts'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })
}

function PostCard({ post, index }) {
  return (
    <motion.article
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={fadeUp}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        {/* Image or color bar */}
        {post.image ? (
          <div className="h-48 md:h-56 overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
        ) : (
          <div className="h-1.5 bg-gradient-to-r from-[#1E40AF] to-[#F59E0B]" />
        )}

        <div className="p-6 md:p-8">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1E40AF] text-xs font-semibold">
              {post.category}
            </span>
            <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
            <span className="text-xs text-gray-400">{post.readTime} lectura</span>
          </div>

          {/* Title */}
          <h2
            className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#1E40AF] transition-colors leading-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-5">
            {post.excerpt}
          </p>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.keywords.slice(0, 4).map((kw, i) => (
              <span key={i} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-lg">
                {kw}
              </span>
            ))}
          </div>

          {/* Read more */}
          <div className="flex items-center gap-2 text-sm font-semibold text-[#1E40AF] group-hover:gap-3 transition-all">
            Citeste articolul
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" style={{ fontFamily: "'Sora', sans-serif" }}>
      {/* Header */}
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

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E40AF] via-[#1E3A8A] to-[#172554] text-white py-16 md:py-20 relative overflow-hidden">
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
              Blog ONRC Express
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Lora', serif" }}>
              Noutati si <span className="text-[#F59E0B]">informatii utile</span>
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Articole despre legislatie, obligatii legale si tot ce trebuie sa stii pentru administrarea corecta a firmei tale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="space-y-8">
          {blogPosts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">Niciun articol inca. Revino curand!</p>
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F59E0B] rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Lora', serif" }}>
              Ai nevoie de ajutor?
            </h2>
            <p className="text-blue-200 mb-6 max-w-lg mx-auto">
              Contacteaza-ne pentru consultanta gratuita. Te ajutam sa alegi solutia potrivita.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#F59E0B] text-gray-900 rounded-full text-base font-bold hover:bg-[#FCD34D] transition-colors shadow-lg"
            >
              Contacteaza-ne
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
          <p>&copy; {new Date().getFullYear()} ONRC.ro — Servicii profesionale Registrul Comertului</p>
          <p className="mt-1 text-gray-500">Toate serviciile sunt oferite de echipa noastra de specialisti autorizati.</p>
        </div>
      </footer>
    </div>
  )
}
