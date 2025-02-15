import { all } from '@redux-saga/core/effects'
import { balanceSaga } from './balance/sagas'
import { transferSaga } from './transfer/sagas'
import { walletSaga } from './wallet/sagas'

export function* sagas() {
  yield all([balanceSaga(), walletSaga(), transferSaga()])
}
