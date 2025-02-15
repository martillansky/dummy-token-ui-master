import { AnyAction } from 'redux'
import {
  BALANCE_UPDATE,
  BalanceUpdateAction,
  CONNECT_WALLET_FAILURE,
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
  ConnectWalletFailureAction,
  ConnectWalletSuccessAction,
  TRANSFER_MODAL_CLOSE,
  TRANSFER_MODAL_OPEN
} from './actions'
import { WalletState } from './types'

const INITIAL_STATE: WalletState = {
  address: null,
  balance: '0',
  isConnecting: false,
  //isUpdating: false,
  isTransferModelOpen: false,
  error: null
}

export function walletReducer(state: WalletState = INITIAL_STATE, action: AnyAction): WalletState {
  switch (action.type) {
    case CONNECT_WALLET_REQUEST: {
      return {
        ...state,
        isConnecting: true,
        error: null
      }
    }
    case CONNECT_WALLET_SUCCESS: {
      const { address } = action.payload as ConnectWalletSuccessAction['payload']
      return {
        ...state,
        isConnecting: false,
        //isUpdating: true,
        address,
        error: null
      }
    }

    case CONNECT_WALLET_FAILURE: {
      const { error } = action.payload as ConnectWalletFailureAction['payload']
      return {
        ...state,
        isConnecting: false,
        //isUpdating: false,
        error
      }
    }

    case TRANSFER_MODAL_OPEN: {
      return {
        ...state,
        isTransferModelOpen: true,
        error: null
      }
    }

    case TRANSFER_MODAL_CLOSE: {
      return {
        ...state,
        isTransferModelOpen: false,
        error: null
      }
    }

    case BALANCE_UPDATE: {
      const { balance } = action.payload as BalanceUpdateAction['payload']
      return {
        ...state,
        isConnecting: false,
        //isUpdating: false,
        balance,
        error: null
      }
    }

    default:
      return state
  }
}
