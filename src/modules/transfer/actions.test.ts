import {
  TRANSFER_TOKEN_FAILURE,
  TRANSFER_TOKEN_REQUEST,
  TRANSFER_TOKEN_SUCCESS,
  transferTokenFailure,
  transferTokenRequest,
  transferTokenSuccess
} from './actions'

describe('transfer actions', () => {
  it('should create an action to request token transfer', () => {
    const addressFrom = '0x123'
    const address = '0x456'
    const amount = '100'
    const expectedAction = {
      type: TRANSFER_TOKEN_REQUEST,
      payload: { addressFrom, address, amount }
    }
    expect(transferTokenRequest(addressFrom, address, amount)).toEqual(expectedAction)
  })

  it('should create an action for successful token transfer', () => {
    const txHash = '0xabc'
    const expectedAction = {
      type: TRANSFER_TOKEN_SUCCESS,
      payload: { txHash }
    }
    expect(transferTokenSuccess(txHash)).toEqual(expectedAction)
  })

  it('should create an action for failed token transfer', () => {
    const error = 'Transfer failed'
    const expectedAction = {
      type: TRANSFER_TOKEN_FAILURE,
      payload: { error }
    }
    expect(transferTokenFailure(error)).toEqual(expectedAction)
  })
})
