import { TransactionResponse, ethers } from 'ethers'
import { call, put, takeEvery } from 'redux-saga/effects'
import { isErrorWithMessage } from '../utils'
import { connectWalletFailure } from '../wallet/actions'
import { TOKEN_ABI, TOKEN_ADDRESS } from '../wallet/sagas'
import { BALANCE_REQUEST, BalanceRequestAction, balanceRequestSuccess, balanceUpdate } from './actions'
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

    yield put(balanceUpdate(String(balance)))
    yield put(balanceRequestSuccess())
  } catch (error) {
    yield put(connectWalletFailure(isErrorWithMessage(error) ? error.message : 'Unknown error'))
  }
}
