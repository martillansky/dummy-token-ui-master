import { RootState } from '../types'
import { getTransferStatus } from './selectors'

describe('transfer selectors', () => {
  const mockState: Partial<RootState> = {
    transfer: {
      addressFrom: '0x123',
      address: '0x456',
      amount: '100',
      error: null,
      txHash: null,
      status: 'idle'
    }
  }

  it('should select transfer status', () => {
    expect(getTransferStatus(mockState as RootState)).toBe('idle')
  })
})
