import { AnyAction } from 'redux'
import { BALANCE_REQUEST, BALANCE_REQUEST_SUCCESS, BalanceRequestAction } from './actions'
import { BalanceState } from './types'

const INITIAL_STATE: BalanceState = {
  isUpdating: false,
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

    default:
      return state
  }
}
