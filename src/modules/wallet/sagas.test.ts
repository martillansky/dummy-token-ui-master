import { ethers } from 'ethers'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { balanceRequest } from '../balance/actions'
import { CONNECT_WALLET_REQUEST, connectWalletFailure, connectWalletSuccess } from './actions'
import { handleConnectWalletRequest, walletSaga } from './sagas'

// Mock ethers
jest.mock('ethers', () => ({
  ethers: {
    BrowserProvider: jest.fn(),
    Contract: jest.fn()
  }
}))

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
    // Setup ethers mocks for each test
    ;(ethers.BrowserProvider as jest.Mock).mockImplementation(() => mockProvider)
    mockProvider.getSigner.mockResolvedValue(mockSigner)
    mockProvider.send.mockResolvedValue([])
    mockSigner.getAddress.mockResolvedValue(mockAddress)
  })

  it('should handle successful wallet connection', () => {
    return expectSaga(handleConnectWalletRequest)
      .provide([[matchers.call([mockSigner, 'getAddress']), mockAddress]])
      .put(balanceRequest(mockAddress))
      .put(connectWalletSuccess(mockAddress))
      .run()
  })

  it('should handle wallet connection failure', () => {
    const error = new Error('Connection failed')
    mockProvider.send.mockRejectedValue(error)

    return expectSaga(handleConnectWalletRequest).put(connectWalletFailure('Connection failed')).run()
  })

  it('should watch for wallet changes', () => {
    return expectSaga(walletSaga).dispatch({ type: CONNECT_WALLET_REQUEST }).silentRun()
  })
})
