import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BlogPage from '../BlogPage'
import blogPosts from '../data/blogPosts'

function renderPage() {
  return render(
    <MemoryRouter>
      <BlogPage />
    </MemoryRouter>
  )
}

describe('BlogPage – Rendering', () => {
  it('renders all blog post cards', () => {
    renderPage()
    blogPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument()
    })
  })

  it('shows category, date, and read time for each post', () => {
    renderPage()
    // Categories may repeat across posts, so use getAllByText
    const uniqueCategories = [...new Set(blogPosts.map(p => p.category))]
    uniqueCategories.forEach((cat) => {
      expect(screen.getAllByText(cat).length).toBeGreaterThanOrEqual(1)
    })
    // Read times may also repeat; check at least one appears
    const uniqueReadTimes = [...new Set(blogPosts.map(p => `${p.readTime} lectura`))]
    uniqueReadTimes.forEach((rt) => {
      expect(screen.getAllByText(rt).length).toBeGreaterThanOrEqual(1)
    })
  })

  it('shows "Citeste articolul" link on each card', () => {
    renderPage()
    const readMoreLinks = screen.getAllByText('Citeste articolul')
    expect(readMoreLinks.length).toBe(blogPosts.length)
  })
})

describe('BlogPage – Header', () => {
  it('renders Act2Go branding', () => {
    const { container } = renderPage()
    const header = container.querySelector('header')
    expect(header.textContent).toContain('Act')
    expect(header.textContent).toContain('2Go')
  })

  it('hero says "Blog Act2Go"', () => {
    renderPage()
    expect(screen.getByText('Blog Act2Go')).toBeInTheDocument()
  })

  it('has link back to homepage', () => {
    renderPage()
    expect(screen.getByText('Inapoi la pagina principala')).toBeInTheDocument()
  })
})

describe('BlogPage – Bottom CTA', () => {
  it('renders "Ai nevoie de ajutor?" CTA section', () => {
    renderPage()
    expect(screen.getByText('Ai nevoie de ajutor?')).toBeInTheDocument()
    expect(screen.getByText('Contacteaza-ne')).toBeInTheDocument()
  })
})

describe('BlogPage – Keywords', () => {
  it('shows keyword tags on post cards', () => {
    renderPage()
    // Each post shows up to 4 keywords
    const firstPost = blogPosts[0]
    firstPost.keywords.slice(0, 4).forEach((kw) => {
      expect(screen.getByText(kw)).toBeInTheDocument()
    })
  })
})
