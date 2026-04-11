import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ServiciiPage from '../ServiciiPage'

function renderPage() {
  return render(
    <MemoryRouter>
      <ServiciiPage />
    </MemoryRouter>
  )
}

describe('ServiciiPage – Service categories', () => {
  it('renders all 6 service categories', () => {
    renderPage()
    expect(screen.getByText('Infiintare firme')).toBeInTheDocument()
    expect(screen.getByText('Modificari firma')).toBeInTheDocument()
    expect(screen.getByText('Gazduire sediu social')).toBeInTheDocument()
    expect(screen.getByText('Radiere & Dizolvare')).toBeInTheDocument()
    expect(screen.getByText('Mentiuni & Depuneri')).toBeInTheDocument()
    expect(screen.getByText('Obtinere documente')).toBeInTheDocument()
  })

  it('each category card has "Ce include" section', () => {
    renderPage()
    const headers = screen.getAllByText('Ce include')
    expect(headers.length).toBe(6)
  })

  it('shows "Solicita o oferta" link on each card', () => {
    renderPage()
    const links = screen.getAllByText('Solicita o oferta')
    expect(links.length).toBe(6)
  })
})

describe('ServiciiPage – Packages', () => {
  it('renders all 4 packages', () => {
    renderPage()
    expect(screen.getByText('Start Rapid')).toBeInTheDocument()
    expect(screen.getByText('Business Online')).toBeInTheDocument()
    expect(screen.getByText('Ride & Drive')).toBeInTheDocument()
    expect(screen.getByText('Business Complet')).toBeInTheDocument()
  })

  it('highlights Business Complet as most popular', () => {
    renderPage()
    expect(screen.getByText('Cel mai popular')).toBeInTheDocument()
  })

  it('all packages display 152 lei tax note', () => {
    renderPage()
    const noteElements = screen.getAllByText(/152 lei/)
    expect(noteElements.length).toBeGreaterThanOrEqual(4)
  })

  it('Business Complet includes free sediu social', () => {
    renderPage()
    expect(screen.getByText('Gazduire sediu social gratuit (1 an)')).toBeInTheDocument()
  })

  it('packages have correct prices', () => {
    renderPage()
    expect(screen.getByText('499')).toBeInTheDocument()
    expect(screen.getByText('699')).toBeInTheDocument()
    expect(screen.getByText('799')).toBeInTheDocument()
    expect(screen.getByText('999')).toBeInTheDocument()
  })
})

describe('ServiciiPage – Header & branding', () => {
  it('renders Act2Go branding in header', () => {
    const { container } = renderPage()
    const header = container.querySelector('header')
    // Logo renders "Act" + "2Go" in header; "Act2Go" also appears in footer
    expect(header.textContent).toContain('Act')
    expect(header.textContent).toContain('2Go')
  })

  it('hero says "Toate serviciile Act2Go"', () => {
    const { container } = renderPage()
    expect(container.textContent).toContain('Toate serviciile')
    expect(container.textContent).toContain('Act2Go')
  })

  it('has link back to homepage', () => {
    renderPage()
    expect(screen.getByText('Inapoi la pagina principala')).toBeInTheDocument()
  })
})

describe('ServiciiPage – Footer', () => {
  it('footer shows Act2Go copyright', () => {
    const { container } = renderPage()
    const footer = container.querySelector('footer')
    expect(footer.textContent).toContain('Act2Go')
    expect(footer.textContent).toContain(new Date().getFullYear().toString())
  })
})
