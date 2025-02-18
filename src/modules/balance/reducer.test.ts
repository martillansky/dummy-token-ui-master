import { balanceRequest, balanceRequestFailure, balanceRequestSuccess, balanceRequestUpdate } from './actions'
import { balanceReducer } from './reducer'
import { BalanceState } from './types'

describe('balance reducer', () => {
  const initialState: BalanceState = {
    isUpdating: false,
    balance: '',
    address: '',
    error: null
  }

  it('should return the initial state', () => {
    expect(balanceReducer(undefined, { type: 'UNKNOWN' })).toEqual(initialState)
  })

  it('should handle BALANCE_REQUEST', () => {
    const address = '0x123'
    const expectedState = {
      ...initialState,
      isUpdating: true,
      address,
      error: null
    }
    expect(balanceReducer(initialState, balanceRequest(address))).toEqual(expectedState)
  })

  it('should handle BALANCE_REQUEST_SUCCESS', () => {
    const currentState = {
      ...initialState,
      isUpdating: true
    }
    const expectedState = {
      ...currentState,
      isUpdating: false,
      error: null
    }
    expect(balanceReducer(currentState, balanceRequestSuccess())).toEqual(expectedState)
  })

  it('should handle BALANCE_REQUEST_UPDATE', () => {
    const balance = '1000'
    const expectedState = {
      ...initialState,
      balance,
      error: null
    }
    expect(balanceReducer(initialState, balanceRequestUpdate(balance))).toEqual(expectedState)
  })

  it('should handle BALANCE_REQUEST_FAILURE', () => {
    const error = 'Failed to fetch balance'
    const expectedState = {
      ...initialState,
      isUpdating: false,
      error
    }
    expect(balanceReducer(initialState, balanceRequestFailure(error))).toEqual(expectedState)
  })
})
