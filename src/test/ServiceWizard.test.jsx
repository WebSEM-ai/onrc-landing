import { describe, it, expect, vi } from 'vitest'
import { render, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ServiceWizard from '../ServiceWizard'

const servicesData = [
  { id: 'infiintare', category: 'Înființare firme', icon: '🏢', color: 'blue', services: [
    { name: 'Înființare SRL', price: '450 lei', duration: '3-5 zile', popular: true },
    { name: 'Înființare PFA', price: '350 lei', duration: '2-3 zile', popular: true },
  ]},
  { id: 'modificari', category: 'Modificări firmă', icon: '✏️', color: 'purple', services: [
    { name: 'Schimbare sediu social', price: '450 lei', duration: '3-5 zile', popular: true },
    { name: 'Adăugare administrator', price: '400 lei', duration: '3-5 zile' },
    { name: 'Modificare CAEN', price: '450 lei', duration: '3-5 zile', popular: true },
  ]},
  { id: 'radiere', category: 'Radiere & Dizolvare', icon: '📁', color: 'red', services: [
    { name: 'Radiere SRL', price: '450 lei', duration: '7-14 zile' },
  ]},
  { id: 'mentiuni', category: 'Mențiuni & Depuneri', icon: '📋', color: 'green', services: [
    { name: 'Depunere situații financiare', price: '300 lei', duration: '1-2 zile' },
  ]},
  { id: 'documente', category: 'Obținere documente', icon: '🔍', color: 'orange', services: [
    { name: 'Certificat constatator', price: '300 lei', duration: '1-2 zile', popular: true },
  ]},
  { id: 'gazduire', category: 'Găzduire sediu social', icon: '🏠', color: 'teal', services: [
    { name: 'Găzduire sediu social — 12 luni', price: '550 lei', duration: '1-2 zile', popular: true },
  ]},
]

/**
 * Helper: renders wizard and returns the desktop grid container.
 * The wizard renders both desktop (hidden md:grid) and mobile (md:hidden) views,
 * so we scope queries to the desktop grid to avoid duplicate element issues.
 */
function renderWizard(onRequestQuote = vi.fn()) {
  const result = render(
    <MemoryRouter>
      <ServiceWizard servicesData={servicesData} onRequestQuote={onRequestQuote} />
    </MemoryRouter>
  )
  const desktop = result.container.querySelector('.hidden.md\\:grid')
  return { ...result, desktop, within: within(desktop) }
}

/** Walk up from a label element to find the closest container with a + button, then click it. */
async function clickServicePlus(label, container) {
  let el = label
  while (el && el !== container) {
    const btn = el.querySelector && el.querySelector('button path[d="M12 4v16m8-8H4"]')
    if (btn) {
      await userEvent.click(btn.closest('button'))
      return
    }
    el = el.parentElement
  }
  throw new Error(`Could not find + button for label: ${label.textContent}`)
}

describe('ServiceWizard – Entity selection (Panel 1)', () => {
  it('renders all entity type buttons in desktop view', () => {
    const { within: w } = renderWizard()
    expect(w.getByText('SRL')).toBeInTheDocument()
    expect(w.getByText('SA')).toBeInTheDocument()
    expect(w.getByText('PFA')).toBeInTheDocument()
    expect(w.getByText('Întreprindere Individuală (II)')).toBeInTheDocument()
    expect(w.getByText('Firmă')).toBeInTheDocument()
  })

  it('toggles entity selection on click', async () => {
    const { within: w } = renderWizard()
    await userEvent.click(w.getByText('SRL'))
    expect(w.getByText('1 selectat')).toBeInTheDocument()
  })

  it('allows multi-select of entity types', async () => {
    const { within: w } = renderWizard()
    await userEvent.click(w.getByText('SRL'))
    await userEvent.click(w.getByText('PFA'))
    expect(w.getByText('2 selectate')).toBeInTheDocument()
  })

  it('"Firmă" (oricare) deselects other entities', async () => {
    const { within: w } = renderWizard()
    await userEvent.click(w.getByText('SRL'))
    expect(w.getByText('1 selectat')).toBeInTheDocument()
    await userEvent.click(w.getByText('Firmă'))
    expect(w.getByText('1 selectat')).toBeInTheDocument()
  })
})

describe('ServiceWizard – Category selection (Panel 2)', () => {
  it('renders all category options', () => {
    const { within: w } = renderWizard()
    expect(w.getByText('Înființare')).toBeInTheDocument()
    expect(w.getByText('Modificări firmă')).toBeInTheDocument()
    expect(w.getByText('Radiere & Dizolvare')).toBeInTheDocument()
    expect(w.getByText('Mențiuni & Depuneri')).toBeInTheDocument()
    expect(w.getByText('Obținere documente')).toBeInTheDocument()
  })

  it('selects a category on click and shows services', async () => {
    const { within: w } = renderWizard()
    await userEvent.click(w.getByText('Înființare'))
    expect(w.getByText('Înființare SRL')).toBeInTheDocument()
  })
})

describe('ServiceWizard – Services (Panel 3) & Cart (Panel 4)', () => {
  it('shows services when entity and category are selected', async () => {
    const { within: w } = renderWizard()
    await userEvent.click(w.getByText('SRL'))
    await userEvent.click(w.getByText('Înființare'))
    expect(w.getByText('Înființare SRL')).toBeInTheDocument()
  })

  it('adds a service to cart using the + button', async () => {
    const { within: w, desktop } = renderWizard()
    await userEvent.click(w.getByText('Firmă'))
    await userEvent.click(w.getByText('Înființare'))
    await clickServicePlus(w.getByText('Înființare SRL'), desktop)
    expect(w.getByText('Total estimat:')).toBeInTheDocument()
    const totalEl = desktop.querySelector('.text-lg.font-bold')
    expect(totalEl.textContent).toBe('450 lei')
  })

  it('shows empty cart message when no items', () => {
    const { within: w } = renderWizard()
    expect(w.getByText('Coșul tău e gol')).toBeInTheDocument()
  })
})

describe('ServiceWizard – Pricing logic', () => {
  it('computes total price correctly for single item', async () => {
    const { within: w, desktop } = renderWizard()
    await userEvent.click(w.getByText('Firmă'))
    await userEvent.click(w.getByText('Înființare'))
    await clickServicePlus(w.getByText('Înființare PFA'), desktop)
    const totalEl = desktop.querySelector('.text-lg.font-bold')
    expect(totalEl.textContent).toBe('350 lei')
  })

  it('applies 250 lei discount on 2nd+ modificări items', async () => {
    const { within: w, desktop } = renderWizard()
    await userEvent.click(w.getByText('Firmă'))
    await userEvent.click(w.getByText('Modificări firmă'))
    await clickServicePlus(w.getByText('Schimbare sediu social'), desktop)
    await clickServicePlus(w.getByText('Adăugare administrator'), desktop)
    // Total: 450 (first, full price) + 250 (second, discounted) = 700
    const totalEl = desktop.querySelector('.text-lg.font-bold')
    expect(totalEl.textContent).toBe('700 lei')
  })
})

describe('ServiceWizard – Request quote', () => {
  it('calls onRequestQuote with selected service names', async () => {
    const mockQuote = vi.fn()
    const { within: w, desktop } = renderWizard(mockQuote)
    await userEvent.click(w.getByText('Firmă'))
    await userEvent.click(w.getByText('Înființare'))
    await clickServicePlus(w.getByText('Înființare SRL'), desktop)
    await userEvent.click(w.getByText('Solicită ofertă gratuită'))
    expect(mockQuote).toHaveBeenCalledTimes(1)
    expect(mockQuote).toHaveBeenCalledWith(expect.stringContaining('Înființare'))
  })

  it('disables quote button when cart is empty', () => {
    const { within: w } = renderWizard()
    const quoteButton = w.getByText('Solicită ofertă gratuită')
    expect(quoteButton).toBeDisabled()
  })
})

describe('ServiceWizard – ONRC tax note', () => {
  it('shows tax note with 152 lei', () => {
    const { container } = renderWizard()
    expect(container.textContent).toContain('152 lei')
    expect(container.textContent).toContain('Taxele ONRC nu sunt incluse')
  })
})

describe('ServiceWizard – Panel search filters', () => {
  it('filters entity types by search input', async () => {
    const { within: w } = renderWizard()
    const searchInput = w.getByPlaceholderText('Caută tip...')
    await userEvent.type(searchInput, 'PFA')
    expect(w.getByText('PFA')).toBeInTheDocument()
    expect(w.queryByText('SA')).not.toBeInTheDocument()
  })

  it('filters categories by search input', async () => {
    const { within: w } = renderWizard()
    const searchInput = w.getByPlaceholderText('Caută categorie...')
    await userEvent.type(searchInput, 'Radiere')
    expect(w.getByText('Radiere & Dizolvare')).toBeInTheDocument()
    expect(w.queryByText('Înființare')).not.toBeInTheDocument()
  })
})
