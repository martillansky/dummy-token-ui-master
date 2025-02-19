// Mock window.ethereum
Object.defineProperty(window, 'ethereum', {
  value: {
    request: jest.fn(),
    on: jest.fn(),
    removeListener: jest.fn()
  }
})

// Mock canvas context
const mockContext = {
  clearRect: jest.fn(),
  fillRect: jest.fn(),
  drawImage: jest.fn(),
  canvas: document.createElement('canvas'),
  getContextAttributes: jest.fn(),
  globalAlpha: 1,
  globalCompositeOperation: 'source-over'
} as unknown as CanvasRenderingContext2D

const getContextMock = jest.fn((contextId: string) => {
  if (contextId === '2d') return mockContext
  return null
})

HTMLCanvasElement.prototype.getContext = getContextMock as any

// Mock ethers
jest.mock('ethers', () => ({
  BrowserProvider: jest.fn(),
  Contract: jest.fn(),
  formatUnits: jest.fn(val => val),
  getAddress: jest.fn(addr => addr),
  ethers: {
    formatUnits: jest.fn(val => val),
    getAddress: jest.fn(addr => addr)
  }
}))

// Mock the config module
jest.mock('./config')

export {}
