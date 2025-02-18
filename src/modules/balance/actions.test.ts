import {
  BALANCE_REQUEST,
  BALANCE_REQUEST_FAILURE,
  BALANCE_REQUEST_SUCCESS,
  BALANCE_UPDATE,
  balanceRequest,
  balanceRequestFailure,
  balanceRequestSuccess,
  balanceRequestUpdate
} from './actions'

describe('balance actions', () => {
  it('should create an action to request balance', () => {
    const address = '0x123'
    const expectedAction = {
      type: BALANCE_REQUEST,
      payload: { address }
    }
    expect(balanceRequest(address)).toEqual(expectedAction)
  })

  it('should create an action for successful balance request', () => {
    const expectedAction = {
      type: BALANCE_REQUEST_SUCCESS,
      payload: {}
    }
    expect(balanceRequestSuccess()).toEqual(expectedAction)
  })

  it('should create an action to update balance', () => {
    const balance = '1000'
    const expectedAction = {
      type: BALANCE_UPDATE,
      payload: { balance }
    }
    expect(balanceRequestUpdate(balance)).toEqual(expectedAction)
  })

  it('should create an action for failed balance request', () => {
    const error = 'Failed to fetch balance'
    const expectedAction = {
      type: BALANCE_REQUEST_FAILURE,
      payload: { error }
    }
    expect(balanceRequestFailure(error)).toEqual(expectedAction)
  })
})
