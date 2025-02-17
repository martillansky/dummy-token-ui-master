import { TransactionResponse, ethers } from 'ethers'
import { call, put, takeEvery } from 'redux-saga/effects'
import { balanceRequest } from '../balance/actions'
import { isErrorWithMessage } from '../utils'
import { TOKEN_ABI, TOKEN_ADDRESS } from '../wallet/sagas'
import { TRANSFER_TOKEN_REQUEST, TransferTokenRequestAction, transferTokenFailure } from './actions'
import { WindowWithEthereum } from './types'

// The regular `window` object with `ethereum` injected by MetaMask
const windowWithEthereum = window as unknown as WindowWithEthereum

export function* transferSaga() {
  yield takeEvery(TRANSFER_TOKEN_REQUEST, handleTransferTokenRequest)
}

function* handleTransferTokenRequest(action: TransferTokenRequestAction): Generator<any, void, any> {
  try {
    // Getting signer
    const providerWrite = new ethers.BrowserProvider(windowWithEthereum.ethereum)
    yield call([providerWrite, 'send'], 'eth_requestAccounts', []) as Awaited<ReturnType<typeof providerWrite.send>>
    const signer = (yield call([providerWrite, 'getSigner'])) as Awaited<ReturnType<typeof providerWrite.getSigner>>

    // Getting contract with signer instead of provider to allow changing its state
    const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer)

    const { addressFrom, address, amount } = action.payload

    const formattedAddressTo = ethers.getAddress(address)

    const tx: TransactionResponse = yield call([contract, contract.transfer], formattedAddressTo, amount) as Awaited<
      ReturnType<typeof contract.transfer>
    >
    // Wait for transaction confirmation
    yield call([tx, tx.wait])
    const result = tx.hash

    console.log('[call] Transfer Sagas TXHash: ', result)

    // Dispatch success action
    //yield put(transferSuccess(tx.hash))

    yield put(balanceRequest(addressFrom))
  } catch (error) {
    yield put(transferTokenFailure(isErrorWithMessage(error) ? error.message : 'Unknown error'))
  }
}
