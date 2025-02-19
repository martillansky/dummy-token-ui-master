// Mock window.ethereum
Object.defineProperty(window, 'ethereum', {
  value: {
    request: jest.fn(),
    on: jest.fn(),
    removeListener: jest.fn()
  }
})

// Mock ethers
jest.mock('ethers', () => ({
  BrowserProvider: jest.fn(),
  Contract: jest.fn()
}))

// Mock the config module
jest.mock('./config')

export {}
