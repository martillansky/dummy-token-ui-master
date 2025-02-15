// Update Balance Request
export const BALANCE_REQUEST = '[Request] Balance'
export const BALANCE_REQUEST_SUCCESS = '[Success] Balance'

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

export type BalanceRequestAction = ReturnType<typeof balanceRequest>
export type BalanceRequestSuccessAction = ReturnType<typeof balanceRequestSuccess>
