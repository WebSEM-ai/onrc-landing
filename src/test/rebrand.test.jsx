import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import ServiciiPage from '../ServiciiPage'
import BlogPage from '../BlogPage'
import BlogArticle from '../BlogArticle'
import blogPosts from '../data/blogPosts'

/* ─── Helpers ─── */
function renderWithRouter(ui, { route = '/' } = {}) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>)
}

/**
 * Verify the ONRC Express → Act2Go rebrand left no stale references.
 *
 * Allowed "ONRC" occurrences:
 *   - "ONRC" alone refers to the Romanian Trade Register (a government institution)
 *     and appears in legal/procedural copy (e.g. "taxele ONRC", "depunere la ONRC").
 *
 * Forbidden strings (old brand):
 *   - "ONRC Express" — old brand name
 *   - "ONRC.ro"       — old domain
 *   - "onrc.ro"        — old domain lowercase
 *   - "Echipa ONRC"   — old team attribution
 */

const STALE_BRAND_PATTERNS = [
  /ONRC Express/i,
  /ONRC\.ro/,
  /onrc\.ro/,
  /Echipa ONRC/i,
]

function assertNoBrandLeaks(container) {
  const text = container.textContent
  STALE_BRAND_PATTERNS.forEach((pattern) => {
    expect(text).not.toMatch(pattern)
  })
}

describe('Rebrand: no stale ONRC Express / ONRC.ro references', () => {
  it('App (homepage) contains only Act2Go branding', () => {
    const { container } = renderWithRouter(<App />)
    assertNoBrandLeaks(container)
    // Positive: Act2Go must appear
    expect(container.textContent).toContain('Act')
    expect(container.textContent).toContain('2Go')
  })

  it('ServiciiPage contains only Act2Go branding', () => {
    const { container } = renderWithRouter(<ServiciiPage />)
    assertNoBrandLeaks(container)
    expect(container.textContent).toContain('Act2Go')
  })

  it('BlogPage contains only Act2Go branding', () => {
    const { container } = renderWithRouter(<BlogPage />)
    assertNoBrandLeaks(container)
    expect(container.textContent).toContain('Act2Go')
  })

  it('BlogArticle pages contain only Act2Go branding', () => {
    // BlogArticle uses useParams() so needs Routes/Route wrapper
    const post = blogPosts[0]
    const { container } = render(
      <MemoryRouter initialEntries={[`/blog/${post.slug}`]}>
        <Routes>
          <Route path="/blog/:slug" element={<BlogArticle />} />
        </Routes>
      </MemoryRouter>
    )
    assertNoBrandLeaks(container)
    expect(container.textContent).toContain('Act2Go')
  })

  it('blogPosts data uses "Echipa Act2Go" author', () => {
    blogPosts.forEach((post) => {
      expect(post.author).toBe('Echipa Act2Go')
    })
  })
})

describe('Rebrand: updated contact info', () => {
  it('App shows the new phone number 0755 058 162', () => {
    const { container } = renderWithRouter(<App />)
    expect(container.textContent).toContain('0755 058 162')
  })

  it('App shows the new email contact@act2go.ro', () => {
    const { container } = renderWithRouter(<App />)
    expect(container.textContent).toContain('contact@act2go.ro')
  })

  it('App shows the new address Str. Licurg nr. 8', () => {
    const { container } = renderWithRouter(<App />)
    expect(container.textContent).toContain('Str. Licurg nr. 8')
  })

  it('WhatsApp links use the new number', () => {
    const { container } = renderWithRouter(<App />)
    const waLinks = container.querySelectorAll('a[href*="wa.me"]')
    waLinks.forEach((link) => {
      expect(link.getAttribute('href')).toContain('40755058162')
    })
  })

  it('tel: links use the new number', () => {
    const { container } = renderWithRouter(<App />)
    const telLinks = container.querySelectorAll('a[href^="tel:"]')
    telLinks.forEach((link) => {
      expect(link.getAttribute('href')).toContain('0755058162')
    })
  })
})

describe('Rebrand: updated pricing (tax = 152 lei)', () => {
  it('ServiciiPage packages reference 152 lei tax', () => {
    const { container } = renderWithRouter(<ServiciiPage />)
    const text = container.textContent
    expect(text).toContain('152 lei')
    // Must NOT reference old 155 lei tax
    expect(text).not.toMatch(/155 lei/)
  })

  it('ServiceWizard tax note says 152 lei', () => {
    // ServiceWizard is embedded in App
    const { container } = renderWithRouter(<App />)
    expect(container.textContent).toContain('152 lei')
    expect(container.textContent).not.toMatch(/155 lei/)
  })
})

describe('Rebrand: footer copyright uses Act2Go across all pages', () => {
  it('App footer says Act2Go', () => {
    const { container } = renderWithRouter(<App />)
    const footer = container.querySelector('footer')
    expect(footer.textContent).toContain('Act2Go')
    assertNoBrandLeaks(footer)
  })

  it('ServiciiPage footer says Act2Go', () => {
    const { container } = renderWithRouter(<ServiciiPage />)
    const footer = container.querySelector('footer')
    expect(footer.textContent).toContain('Act2Go')
    assertNoBrandLeaks(footer)
  })

  it('BlogPage footer says Act2Go', () => {
    const { container } = renderWithRouter(<BlogPage />)
    const footer = container.querySelector('footer')
    expect(footer.textContent).toContain('Act2Go')
    assertNoBrandLeaks(footer)
  })

  it('BlogArticle footer says Act2Go', () => {
    const post = blogPosts[0]
    const { container } = render(
      <MemoryRouter initialEntries={[`/blog/${post.slug}`]}>
        <Routes>
          <Route path="/blog/:slug" element={<BlogArticle />} />
        </Routes>
      </MemoryRouter>
    )
    const footer = container.querySelector('footer')
    expect(footer.textContent).toContain('Act2Go')
    assertNoBrandLeaks(footer)
  })
})
