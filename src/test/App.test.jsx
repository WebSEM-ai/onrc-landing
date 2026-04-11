import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

function renderApp() {
  return render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )
}

describe('App – Navigation', () => {
  it('renders the Act2Go navbar logo', () => {
    const { container } = renderApp()
    // Logo text is split across two spans: "Act" and "2Go"
    const nav = container.querySelector('nav')
    expect(nav).toBeInTheDocument()
    expect(nav.textContent).toContain('Act')
    expect(nav.textContent).toContain('2Go')
  })

  it('renders nav links in menu overlay when hamburger is clicked', async () => {
    renderApp()
    const hamburger = screen.getByLabelText('Deschide meniul')
    await userEvent.click(hamburger)
    // Nav links may also appear in footer, so use getAllByText
    expect(screen.getAllByText('Servicii').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Blog').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Despre noi').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Contact').length).toBeGreaterThanOrEqual(1)
  })

  it('closes menu overlay when close button is clicked', async () => {
    renderApp()
    await userEvent.click(screen.getByLabelText('Deschide meniul'))
    // Menu overlay should be open - close button should exist
    expect(screen.getByLabelText('Închide meniul')).toBeInTheDocument()
    // Click close
    await userEvent.click(screen.getByLabelText('Închide meniul'))
    // The AnimatePresence wraps the overlay so the close button should be removed
    await waitFor(() => {
      expect(screen.queryByLabelText('Închide meniul')).not.toBeInTheDocument()
    })
  })
})

describe('App – Hero section', () => {
  it('renders hero slide content', () => {
    const { container } = renderApp()
    // First slide should be visible (slide index 0)
    expect(container.textContent).toContain('Act2Go')
    expect(container.textContent).toContain('rapid, sigur')
  })

  it('renders trust badges', () => {
    renderApp()
    expect(screen.getByText('5.000+ firme asistate')).toBeInTheDocument()
    expect(screen.getByText('Termen rapid garantat')).toBeInTheDocument()
    expect(screen.getByText('Suport dedicat')).toBeInTheDocument()
  })
})

describe('App – Search', () => {
  it('shows search results when typing a query', async () => {
    renderApp()
    const searchInput = screen.getByPlaceholderText('Caută orice serviciu...')
    await userEvent.type(searchInput, 'SRL')
    // Should show results containing SRL (may appear multiple times in results)
    await waitFor(() => {
      const results = screen.getAllByText(/Înființare SRL/)
      expect(results.length).toBeGreaterThan(0)
    })
  })

  it('filters search by category', async () => {
    renderApp()
    // Open category dropdown
    const catButton = screen.getByText('Toate')
    await userEvent.click(catButton)
    // Click "Radiere" category
    const raderieOption = screen.getAllByText('Radiere')[0]
    await userEvent.click(raderieOption)
    // Now search
    const searchInput = screen.getByPlaceholderText('ex: radiere SRL, suspendare...')
    await userEvent.type(searchInput, 'SRL')
    await waitFor(() => {
      const results = screen.getAllByText(/Radiere SRL/)
      expect(results.length).toBeGreaterThan(0)
    })
  })
})

describe('App – Contact form', () => {
  it('renders all form fields', () => {
    renderApp()
    expect(screen.getByPlaceholderText('Ion Popescu')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('07XX XXX XXX')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('email@exemplu.ro')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('ex: Înființare SRL, Schimbare sediu social')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Descrie pe scurt ce ai nevoie...')).toBeInTheDocument()
  })

  it('shows success message on form submit', async () => {
    renderApp()
    const nameInput = screen.getByPlaceholderText('Ion Popescu')
    const phoneInput = screen.getByPlaceholderText('07XX XXX XXX')
    const emailInput = screen.getByPlaceholderText('email@exemplu.ro')

    await userEvent.type(nameInput, 'Test User')
    await userEvent.type(phoneInput, '0700000000')
    await userEvent.type(emailInput, 'test@example.com')

    const submitButton = screen.getByText('Trimite mesajul')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Mesajul a fost trimis cu succes/)).toBeInTheDocument()
    })
  })

  it('clears form fields after submit', async () => {
    renderApp()
    const nameInput = screen.getByPlaceholderText('Ion Popescu')
    const phoneInput = screen.getByPlaceholderText('07XX XXX XXX')
    const emailInput = screen.getByPlaceholderText('email@exemplu.ro')

    await userEvent.type(nameInput, 'Test User')
    await userEvent.type(phoneInput, '0700000000')
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.click(screen.getByText('Trimite mesajul'))

    await waitFor(() => {
      expect(nameInput).toHaveValue('')
      expect(phoneInput).toHaveValue('')
      expect(emailInput).toHaveValue('')
    })
  })
})

describe('App – Footer', () => {
  it('renders footer with correct contact details', () => {
    const { container } = renderApp()
    const footer = container.querySelector('footer')
    expect(footer.textContent).toContain('Act')
    expect(footer.textContent).toContain('2Go')
    expect(footer.textContent).toContain('Str. Licurg nr. 8')
    expect(footer.textContent).toContain('0755 058 162')
    expect(footer.textContent).toContain('contact@act2go.ro')
  })

  it('has service category links in footer', () => {
    const { container } = renderApp()
    const footer = container.querySelector('footer')
    expect(footer.textContent).toContain('Înființare firme')
    expect(footer.textContent).toContain('Modificări firmă')
    expect(footer.textContent).toContain('Radiere & Dizolvare')
  })
})

describe('App – Mobile sticky bar', () => {
  it('renders call and WhatsApp buttons', () => {
    const { container } = renderApp()
    // Mobile sticky bar has tel and wa.me links
    const telLink = container.querySelector('a[href="tel:0755058162"]')
    expect(telLink).toBeInTheDocument()
    const waLink = container.querySelector('a[href="https://wa.me/40755058162"]')
    expect(waLink).toBeInTheDocument()
  })
})
