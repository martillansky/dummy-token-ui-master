import { combineReducers } from 'redux'
import { balanceReducer as balance } from './balance/reducer'
import { transferReducer as transfer } from './transfer/reducer'
import { walletReducer as wallet } from './wallet/reducer'

export const reducer = combineReducers({
  balance,
  wallet,
  transfer
})
