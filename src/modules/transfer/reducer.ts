import { AnyAction } from 'redux'
import {
  TRANSFER_TOKEN_FAILURE,
  TRANSFER_TOKEN_REQUEST,
  TRANSFER_TOKEN_SUCCESS,
  TransferTokenFailureAction,
  TransferTokenRequestAction,
  TransferTokenSuccessAction
} from './actions'
import { TransferState } from './types'

const INITIAL_STATE: TransferState = {
  addressFrom: '',
  address: '',
  amount: '',
  error: null,
  txHash: null,
  status: 'idle'
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
        error: null,
        status: 'pending'
      }
    }

    case TRANSFER_TOKEN_SUCCESS: {
      const { txHash } = action.payload as TransferTokenSuccessAction['payload']
      return {
        ...state,
        txHash,
        status: 'success',
        address: '',
        amount: '',
        error: null
      }
    }

    case TRANSFER_TOKEN_FAILURE: {
      const { error } = action.payload as TransferTokenFailureAction['payload']
      return {
        ...state,
        error,
        status: 'error'
      }
    }

    default:
      return state
  }
}
