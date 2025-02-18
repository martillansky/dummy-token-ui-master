import { transferTokenFailure, transferTokenRequest, transferTokenSuccess } from './actions'
import { transferReducer } from './reducer'
import { TransferState } from './types'

describe('transfer reducer', () => {
  const initialState: TransferState = {
    addressFrom: '',
    address: '',
    amount: '',
    error: null,
    txHash: null,
    status: 'idle'
  }

  it('should return the initial state', () => {
    expect(transferReducer(undefined, { type: 'UNKNOWN' })).toEqual(initialState)
  })

  it('should handle TRANSFER_TOKEN_REQUEST', () => {
    const addressFrom = '0x123'
    const address = '0x456'
    const amount = '100'
    const expectedState = {
      ...initialState,
      addressFrom,
      address,
      amount,
      status: 'pending',
      error: null
    }
    expect(transferReducer(initialState, transferTokenRequest(addressFrom, address, amount))).toEqual(expectedState)
  })

  it('should handle TRANSFER_TOKEN_SUCCESS', () => {
    const txHash = '0xabc'
    const currentState: TransferState = {
      addressFrom: '0x123',
      address: '',
      amount: '',
      status: 'pending',
      error: null,
      txHash: null
    }
    const expectedState = {
      ...currentState,
      txHash,
      status: 'success' as const,
      error: null
    }
    expect(transferReducer(currentState, transferTokenSuccess(txHash))).toEqual(expectedState)
  })

  it('should handle TRANSFER_TOKEN_FAILURE', () => {
    const error = 'Transfer failed'
    const currentState: TransferState = {
      ...initialState,
      addressFrom: '0x123',
      address: '0x456',
      amount: '100',
      status: 'pending'
    }
    const expectedState = {
      ...currentState,
      status: 'error',
      error
    }
    expect(transferReducer(currentState, transferTokenFailure(error))).toEqual(expectedState)
  })
})
