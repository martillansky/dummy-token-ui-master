import { RootState } from '../types'
import { getAddress, getBalance, getError, getState, isUpdating } from './selectors'

describe('balance selectors', () => {
  const mockState: Partial<RootState> = {
    balance: {
      address: '0x123',
      balance: '1000',
      isUpdating: false,
      error: null
    }
  }

  it('should select the balance state', () => {
    expect(getState(mockState as RootState)).toEqual(mockState.balance)
  })

  it('should select the address', () => {
    expect(getAddress(mockState as RootState)).toBe('0x123')
  })

  it('should select isUpdating status', () => {
    expect(isUpdating(mockState as RootState)).toBe(false)
  })

  it('should select the balance', () => {
    expect(getBalance(mockState as RootState)).toBe('1000')
  })

  it('should select the error', () => {
    expect(getError(mockState as RootState)).toBe(null)
  })

  it('should handle error state', () => {
    const stateWithError = {
      balance: {
        ...mockState.balance!,
        error: 'Failed to fetch balance'
      }
    }
    expect(getError(stateWithError as RootState)).toBe('Failed to fetch balance')
  })
})
