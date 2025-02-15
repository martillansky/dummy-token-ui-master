import { RootState } from '../types'

export const getState = (state: RootState) => state.balance
export const getAddress = (state: RootState) => getState(state).address || ''
export const isUpdating = (state: RootState) => getState(state).isUpdating
export const getError = (state: RootState) => getState(state).error
