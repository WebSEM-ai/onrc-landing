import '@testing-library/jest-dom'

// Mock IntersectionObserver (not available in jsdom, required by framer-motion whileInView)
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback
    this.entries = []
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = IntersectionObserverMock

// Mock window.scrollTo (not implemented in jsdom)
window.scrollTo = () => {}
