import { connectWalletFailure, connectWalletRequest, connectWalletSuccess } from './actions'
import { walletReducer } from './reducer'
import { WalletState } from './types'

describe('wallet reducer', () => {
  const initialState: WalletState = {
    address: null,
    isConnecting: false,
    error: null
  }

  it('should return the initial state', () => {
    expect(walletReducer(undefined, { type: 'UNKNOWN' })).toEqual(initialState)
  })

  it('should handle CONNECT_WALLET_REQUEST', () => {
    const expectedState = {
      ...initialState,
      isConnecting: true,
      error: null
    }
    expect(walletReducer(initialState, connectWalletRequest())).toEqual(expectedState)
  })

  it('should handle CONNECT_WALLET_SUCCESS', () => {
    const address = '0x123'
    const expectedState = {
      ...initialState,
      address,
      isConnecting: false,
      error: null
    }
    expect(walletReducer(initialState, connectWalletSuccess(address))).toEqual(expectedState)
  })

  it('should handle CONNECT_WALLET_FAILURE', () => {
    const error = 'Connection failed'
    const expectedState = {
      ...initialState,
      isConnecting: false,
      error
    }
    expect(walletReducer(initialState, connectWalletFailure(error))).toEqual(expectedState)
  })
})
