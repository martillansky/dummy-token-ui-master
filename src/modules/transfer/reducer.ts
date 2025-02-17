import { AnyAction } from 'redux'
import { TRANSFER_TOKEN_FAILURE, TRANSFER_TOKEN_REQUEST, TransferTokenFailureAction, TransferTokenRequestAction } from './actions'
import { TransferState } from './types'

const INITIAL_STATE: TransferState = {
  addressFrom: '',
  address: '',
  amount: '',
  error: null
}

export function transferReducer(state: TransferState = INITIAL_STATE, action: AnyAction): TransferState {
  switch (action.type) {
    case TRANSFER_TOKEN_REQUEST: {
      const { addressFrom, address, amount } = action.payload as TransferTokenRequestAction['payload']
      return {
        ...state,
        addressFrom,
        address,
        amount,
        error: null
      }
    }

    case TRANSFER_TOKEN_FAILURE: {
      const { error } = action.payload as TransferTokenFailureAction['payload']
      return {
        ...state,
        error
      }
    }

    default:
      return state
  }
}
