import { TransactionResponse, ethers } from 'ethers'
import { call, put, takeEvery } from 'redux-saga/effects'
import { isErrorWithMessage } from '../utils'
import { TOKEN_ABI, TOKEN_ADDRESS } from '../wallet/sagas'
import { BALANCE_REQUEST, BalanceRequestAction, balanceRequestFailure, balanceRequestSuccess, balanceRequestUpdate } from './actions'
import { WindowWithEthereum } from './types'

// The regular `window` object with `ethereum` injected by MetaMask
const windowWithEthereum = window as unknown as WindowWithEthereum

export function* balanceSaga() {
  yield takeEvery(BALANCE_REQUEST, handleBalanceRequest)
}

function* handleBalanceRequest(action: BalanceRequestAction): Generator<any, void, any> {
  try {
    const { address } = action.payload
    const provider = new ethers.BrowserProvider(windowWithEthereum.ethereum)

    // Getting DUMMY balance from connected account
    const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider)
    const balance: TransactionResponse = yield call([contract, contract.balanceOf], address)

    const balanceString = balance.toString()
    yield put(balanceRequestUpdate(balanceString))
    yield put(balanceRequestSuccess())
  } catch (error) {
    // I need to consider adding BALANCE_REQUEST_FAILURE action instead of using wallet failure
    yield put(balanceRequestFailure(isErrorWithMessage(error) ? error.message : 'Unknown error'))
  }
}
