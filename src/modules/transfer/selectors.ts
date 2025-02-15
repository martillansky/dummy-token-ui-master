import { RootState } from '../types'

export const getState = (state: RootState) => state.transfer
export const getAddress = (state: RootState) => getState(state).address
export const getAmount = (state: RootState) => getState(state).amount
export const getError = (state: RootState) => getState(state).error
