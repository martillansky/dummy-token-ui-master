// Transfer Token
export const TRANSFER_TOKEN_REQUEST = '[Request] Transfer Token'
export const TRANSFER_TOKEN_FAILURE = '[Failure] Transfer Token'

export function transferTokenRequest(addressFrom: string, address: string, amount: string) {
  return {
    type: TRANSFER_TOKEN_REQUEST,
    payload: {
      addressFrom,
      address,
      amount
    }
  }
}

export function transferTokenFailure(error: string) {
  return {
    type: TRANSFER_TOKEN_FAILURE,
    payload: {
      error
    }
  }
}

export type TransferTokenRequestAction = ReturnType<typeof transferTokenRequest>
export type TransferTokenFailureAction = ReturnType<typeof transferTokenFailure>
