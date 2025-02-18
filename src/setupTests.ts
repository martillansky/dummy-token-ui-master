// Mock Vite's import.meta.env
Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        VITE_TOKEN_ADDRESS: '0x1234567890123456789012345678901234567890',
        VITE_TOKEN_DECIMALS: '4'
      }
    }
  }
})

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

export {}
