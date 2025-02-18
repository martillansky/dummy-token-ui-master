import { ethers } from 'ethers'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import { balanceRequest } from '../balance/actions'
import { CONNECT_WALLET_REQUEST, connectWalletFailure, connectWalletSuccess } from './actions'
import { handleConnectWalletRequest, walletSaga } from './sagas'
import { WindowWithEthereum } from './types'

// Mock window.ethereum
const mockEthereum = {
  request: jest.fn(),
  on: jest.fn(),
  removeListener: jest.fn()
}

// Mock window object
global.window = {
  ...window,
  ethereum: mockEthereum
} as any

describe('wallet sagas', () => {
  const windowWithEthereum = window as unknown as WindowWithEthereum
  const mockAddress = '0x123'
  const mockProvider = {
    send: jest.fn(),
    getSigner: jest.fn()
  }
  const mockSigner = {
    getAddress: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle successful wallet connection', () => {
    mockSigner.getAddress.mockResolvedValue(mockAddress)
    mockProvider.getSigner.mockResolvedValue(mockSigner)

    return expectSaga(handleConnectWalletRequest)
      .provide([
        [matchers.call.fn(() => new ethers.BrowserProvider(windowWithEthereum.ethereum)), mockProvider],
        [matchers.call([mockProvider, 'send']), undefined],
        [matchers.call([mockProvider, 'getSigner']), mockSigner],
        [matchers.call([mockSigner, 'getAddress']), mockAddress]
      ])
      .put(connectWalletSuccess(mockAddress))
      .put(balanceRequest(mockAddress))
      .run()
  })

  it('should handle wallet connection failure', () => {
    const error = new Error('Connection failed')

    return expectSaga(handleConnectWalletRequest)
      .provide([[matchers.call.fn(() => new ethers.BrowserProvider(windowWithEthereum.ethereum)), throwError(error)]])
      .put(connectWalletFailure('Connection failed'))
      .run()
  })

  it('should watch for wallet changes', () => {
    return expectSaga(walletSaga).dispatch({ type: CONNECT_WALLET_REQUEST }).silentRun()
  })
})
