import {
  CONNECT_WALLET_FAILURE,
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
  connectWalletFailure,
  connectWalletRequest,
  connectWalletSuccess
} from './actions'

describe('wallet actions', () => {
  it('should create an action to request wallet connection', () => {
    const expectedAction = {
      type: CONNECT_WALLET_REQUEST,
      payload: {}
    }
    expect(connectWalletRequest()).toEqual(expectedAction)
  })

  it('should create an action for wallet connection success', () => {
    const address = '0x123'
    const expectedAction = {
      type: CONNECT_WALLET_SUCCESS,
      payload: { address }
    }
    expect(connectWalletSuccess(address)).toEqual(expectedAction)
  })

  it('should create an action for wallet connection failure', () => {
    const error = 'Connection failed'
    const expectedAction = {
      type: CONNECT_WALLET_FAILURE,
      payload: { error }
    }
    expect(connectWalletFailure(error)).toEqual(expectedAction)
  })
})
