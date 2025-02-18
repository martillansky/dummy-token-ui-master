import { RootState } from '../types'
import { getAddress, getError, isConnected, isConnecting } from './selectors'

describe('wallet selectors', () => {
  const mockState: Partial<RootState> = {
    wallet: {
      address: '0x123',
      isConnecting: false,
      error: null
    }
  }

  it('should select wallet address', () => {
    expect(getAddress(mockState as RootState)).toBe('0x123')
  })

  it('should determine if wallet is connected', () => {
    expect(isConnected(mockState as RootState)).toBe(true)
  })

  it('should determine if wallet is connecting', () => {
    expect(isConnecting(mockState as RootState)).toBe(false)
  })

  it('should select error message', () => {
    expect(getError(mockState as RootState)).toBe(null)
  })
})
