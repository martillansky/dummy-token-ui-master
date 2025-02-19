import { ethers } from 'ethers'
import { eventChannel, EventChannel } from 'redux-saga'
import { call, fork, put, take, takeEvery } from 'redux-saga/effects'
import { TOKEN_ADDRESS } from '../../config'
import { balanceRequest } from '../balance/actions'
import { isErrorWithMessage } from '../utils'
import { CONNECT_WALLET_REQUEST, connectWalletFailure, connectWalletSuccess } from './actions'
import { WindowWithEthereum } from './types'
// The regular `window` object with `ethereum` injected by MetaMask
const windowWithEthereum = window as unknown as WindowWithEthereum

/* This is the Dummy Token address, it identifies the token contract once deployed */
//export const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS
if (!TOKEN_ADDRESS) {
  console.error(`Missing env variable VITE_TOKEN_ADDRESS`)
}

/* This is the Dummy Token ABI (application binary interface)
  You will need this to interact with the deployed contract, ie:

  const provider = new.ethers.providers.Web3Provider(window.ethereum)
  const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider)
  const balance = await token.balanceOf(walletAddress) // --> returns the balance of DummyToken of the walletAddress
*/
export const TOKEN_ABI = [
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount)'
]
//'function transfer(address to, uint amount) public returns (bool)'

function createWalletChannel(): EventChannel<{ address: string | null }> {
  return eventChannel(emit => {
    const handleAccountsChanged = (accounts: string[]) => {
      const address = accounts[0] || null
      emit({ address })
    }

    windowWithEthereum.ethereum.on('accountsChanged', handleAccountsChanged)

    return () => {
      windowWithEthereum.ethereum.removeListener('accountsChanged', handleAccountsChanged)
    }
  })
}

function* watchWalletChanges(): Generator<any, void, any> {
  const channel = yield call(createWalletChannel)

  try {
    while (true) {
      const { address } = yield take(channel)
      if (address) {
        yield put(connectWalletSuccess(address))
        yield put(balanceRequest(address))
      } else {
        yield put(connectWalletFailure('Wallet disconnected'))
      }
    }
  } catch (error) {
    yield put(connectWalletFailure(isErrorWithMessage(error) ? error.message : 'Unknown error'))
  }
}

export function* handleConnectWalletRequest() {
  // For testing purposes
  try {
    const provider = new ethers.BrowserProvider(windowWithEthereum.ethereum)
    yield call([provider, 'send'], 'eth_requestAccounts', []) as Awaited<ReturnType<typeof provider.send>>
    const signer = (yield call([provider, 'getSigner'])) as Awaited<ReturnType<typeof provider.getSigner>>
    const address = (yield call([signer, 'getAddress'])) as Awaited<ReturnType<typeof signer.getAddress>>

    yield put(balanceRequest(address))
    yield put(connectWalletSuccess(address))
  } catch (error) {
    yield put(connectWalletFailure(isErrorWithMessage(error) ? error.message : 'Unknown error'))
  }
}

export function* walletSaga() {
  yield fork(watchWalletChanges)
  yield takeEvery(CONNECT_WALLET_REQUEST, handleConnectWalletRequest)
}
