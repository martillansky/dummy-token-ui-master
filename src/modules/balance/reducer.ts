import { AnyAction } from 'redux'
import {
  BALANCE_REQUEST,
  BALANCE_REQUEST_FAILURE,
  BALANCE_REQUEST_SUCCESS,
  BALANCE_UPDATE as BALANCE_REQUEST_UPDATE,
  BalanceRequestAction,
  BalanceRequestUpdateAction
} from './actions'
import { BalanceState } from './types'

const INITIAL_STATE: BalanceState = {
  isUpdating: false,
  balance: '',
  address: '',
  error: null
}

export function balanceReducer(state: BalanceState = INITIAL_STATE, action: AnyAction): BalanceState {
  switch (action.type) {
    case BALANCE_REQUEST: {
      const { address } = action.payload as BalanceRequestAction['payload']
      return {
        ...state,
        isUpdating: true,
        address,
        error: null
      }
    }

    case BALANCE_REQUEST_SUCCESS: {
      return {
        ...state,
        isUpdating: false,
        error: null
      }
    }

    case BALANCE_REQUEST_FAILURE: {
      const { error } = action.payload
      return {
        ...state,
        isUpdating: false,
        error
      }
    }

    case BALANCE_REQUEST_UPDATE: {
      const { balance } = action.payload as BalanceRequestUpdateAction['payload']
      return {
        ...state,
        balance,
        error: null
      }
    }
    default:
      return state
  }
}
