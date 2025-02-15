// Connect Wallet
export const CONNECT_WALLET_REQUEST = '[Request] Connect Wallet'
export const CONNECT_WALLET_SUCCESS = '[Success] Connect Wallet'
export const CONNECT_WALLET_FAILURE = '[Failure] Connect Wallet'
export const TRANSFER_MODAL_OPEN = '[Open] Transfer Modal'
export const TRANSFER_MODAL_CLOSE = '[Close] Transfer Modal'
export const BALANCE_UPDATE = '[Update] Balance'

export function connectWalletRequest() {
  return {
    type: CONNECT_WALLET_REQUEST,
    payload: {}
  }
}

export function connectWalletSuccess(address: string) {
  return {
    type: CONNECT_WALLET_SUCCESS,
    payload: {
      address
    }
  }
}

export function connectWalletFailure(error: string) {
  return {
    type: CONNECT_WALLET_FAILURE,
    payload: {
      error
    }
  }
}

export function transferModalOpen() {
  return {
    type: TRANSFER_MODAL_OPEN,
    payload: {}
  }
}

export function transferModalClose() {
  return {
    type: TRANSFER_MODAL_CLOSE,
    payload: {}
  }
}

export function balanceUpdate(balance: string) {
  return {
    type: BALANCE_UPDATE,
    payload: {
      balance
    }
  }
}

export type ConnectWalletRequestAction = ReturnType<typeof connectWalletRequest>
export type ConnectWalletSuccessAction = ReturnType<typeof connectWalletSuccess>
export type ConnectWalletFailureAction = ReturnType<typeof connectWalletFailure>
export type TransferModalOpenAction = ReturnType<typeof transferModalOpen>
export type TransferModalCloseAction = ReturnType<typeof transferModalClose>
export type BalanceUpdateAction = ReturnType<typeof balanceUpdate>
