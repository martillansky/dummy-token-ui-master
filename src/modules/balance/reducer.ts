import { AnyAction } from 'redux'
import { BALANCE_REQUEST, BALANCE_REQUEST_SUCCESS, BALANCE_UPDATE, BalanceRequestAction, BalanceUpdateAction } from './actions'
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

    case BALANCE_UPDATE: {
      const { balance } = action.payload as BalanceUpdateAction['payload']
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
