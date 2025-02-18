import { createSelector } from 'reselect'
import { RootState } from '../types'

export const getState = (state: RootState) => state.transfer
//export const getAddress = (state: RootState) => getState(state).address
export const getAddress = createSelector([getState], transfer => transfer.address)
//export const getAmount = (state: RootState) => getState(state).amount
export const getAmount = createSelector([getState], transfer => transfer.amount)
export const getAddressFrom = createSelector([getState], transfer => transfer.addressFrom)
export const getError = (state: RootState) => getState(state).error
export const getTransferStatus = createSelector([getState], transfer => transfer.status)
export const getTransactionHash = createSelector([getState], transfer => transfer.txHash)
