// Update Balance Request
export const BALANCE_REQUEST = '[Request] Balance'
export const BALANCE_REQUEST_SUCCESS = '[Success] Balance'
export const BALANCE_UPDATE = '[Update] Balance'
export const BALANCE_REQUEST_FAILURE = '[Failure] Balance'

export function balanceRequest(address: string) {
  return {
    type: BALANCE_REQUEST,
    payload: {
      address
    }
  }
}

export function balanceRequestSuccess() {
  return {
    type: BALANCE_REQUEST_SUCCESS,
    payload: {}
  }
}

export function balanceRequestUpdate(balance: string) {
  return {
    type: BALANCE_UPDATE,
    payload: {
      balance
    }
  }
}

export function balanceRequestFailure(error: string) {
  return {
    type: BALANCE_REQUEST_FAILURE,
    payload: { error }
  }
}

export type BalanceRequestAction = ReturnType<typeof balanceRequest>
export type BalanceRequestSuccessAction = ReturnType<typeof balanceRequestSuccess>
export type BalanceRequestUpdateAction = ReturnType<typeof balanceRequestUpdate>
export type BalanceRequestFailureAction = ReturnType<typeof balanceRequestFailure>
