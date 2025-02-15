import { RootState } from '../types'

export const getState = (state: RootState) => state.wallet
export const getAddress = (state: RootState) => getState(state).address || ''
export const getBalance = (state: RootState) => getState(state).balance || ''
export const isConnected = (state: RootState) => !!getAddress(state)
export const isConnecting = (state: RootState) => getState(state).isConnecting
//export const isUpdating = (state: RootState) => getState(state).isUpdating
export const isTransferModelOpen = (state: RootState) => getState(state).isTransferModelOpen
export const getError = (state: RootState) => getState(state).error
