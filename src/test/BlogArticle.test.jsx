import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import BlogArticle from '../BlogArticle'
import blogPosts from '../data/blogPosts'

function renderArticle(slug) {
  return render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogArticle />} />
        <Route path="/blog" element={<div data-testid="blog-page">Blog</div>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('BlogArticle – Rendering', () => {
  it('renders article title and excerpt', () => {
    const post = blogPosts[0]
    renderArticle(post.slug)
    expect(screen.getByText(post.title)).toBeInTheDocument()
    expect(screen.getByText(post.excerpt)).toBeInTheDocument()
  })

  it('shows category and read time', () => {
    const post = blogPosts[0]
    renderArticle(post.slug)
    expect(screen.getByText(post.category)).toBeInTheDocument()
    expect(screen.getByText(`${post.readTime} lectura`)).toBeInTheDocument()
  })

  it('renders article sections', () => {
    const post = blogPosts[0]
    renderArticle(post.slug)
    // Check that section headings appear
    post.sections
      .filter((s) => s.type === 'heading')
      .forEach((s) => {
        expect(screen.getByText(s.title)).toBeInTheDocument()
      })
  })
})

describe('BlogArticle – FAQ', () => {
  it('renders FAQ section if present', () => {
    const postWithFaq = blogPosts.find((p) => p.faq && p.faq.length > 0)
    if (!postWithFaq) return
    renderArticle(postWithFaq.slug)
    expect(screen.getByText('Intrebari frecvente')).toBeInTheDocument()
    // All questions should be rendered
    postWithFaq.faq.forEach((item) => {
      expect(screen.getByText(item.question)).toBeInTheDocument()
    })
  })

  it('toggles FAQ answer visibility on click', async () => {
    const postWithFaq = blogPosts.find((p) => p.faq && p.faq.length > 0)
    if (!postWithFaq) return
    renderArticle(postWithFaq.slug)
    const firstQuestion = screen.getByText(postWithFaq.faq[0].question)
    // Answer should not be visible initially
    expect(screen.queryByText(postWithFaq.faq[0].answer)).not.toBeInTheDocument()
    // Click to open
    await userEvent.click(firstQuestion)
    expect(screen.getByText(postWithFaq.faq[0].answer)).toBeInTheDocument()
    // Click again to close
    await userEvent.click(firstQuestion)
    expect(screen.queryByText(postWithFaq.faq[0].answer)).not.toBeInTheDocument()
  })
})

describe('BlogArticle – CTA Final', () => {
  it('renders final CTA if present', () => {
    const postWithCta = blogPosts.find((p) => p.ctaFinal)
    if (!postWithCta) return
    renderArticle(postWithCta.slug)
    expect(screen.getByText(postWithCta.ctaFinal.title)).toBeInTheDocument()
  })
})

describe('BlogArticle – Related posts', () => {
  it('shows related posts section', () => {
    const post = blogPosts[0]
    renderArticle(post.slug)
    expect(screen.getByText('Alte articole')).toBeInTheDocument()
    // Should show other posts (not the current one)
    const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3)
    relatedPosts.forEach((rp) => {
      expect(screen.getByText(rp.title)).toBeInTheDocument()
    })
  })
})

describe('BlogArticle – 404 redirect', () => {
  it('redirects to /blog for unknown slugs', () => {
    renderArticle('non-existent-slug')
    expect(screen.getByTestId('blog-page')).toBeInTheDocument()
  })
})

describe('BlogArticle – Header', () => {
  it('renders Act2Go branding', () => {
    const post = blogPosts[0]
    const { container } = renderArticle(post.slug)
    const header = container.querySelector('header')
    expect(header.textContent).toContain('Act')
    expect(header.textContent).toContain('2Go')
  })

  it('has "Inapoi la blog" link', () => {
    const post = blogPosts[0]
    renderArticle(post.slug)
    expect(screen.getByText('Inapoi la blog')).toBeInTheDocument()
  })
})
