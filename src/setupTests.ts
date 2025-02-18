// Mock Vite's import.meta.env
const mockEnv = {
  VITE_TOKEN_ADDRESS: '0x123',
  VITE_TOKEN_DECIMALS: '18'
}

Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: mockEnv
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

export {}
