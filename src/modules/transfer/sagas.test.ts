import { ethers } from 'ethers'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { TRANSFER_TOKEN_REQUEST, transferTokenFailure, transferTokenSuccess } from './actions'
import { transferSaga } from './sagas'

// Mock ethers
jest.mock('ethers', () => ({
  ethers: {
    BrowserProvider: jest.fn(),
    Contract: jest.fn(),
    getAddress: jest.fn(addr => addr),
    parseUnits: jest.fn(amount => amount)
  }
}))

describe('transfer sagas', () => {
  const mockAddressFrom = '0x123'
  const mockAddress = '0x456'
  const mockAmount = '100'
  const mockTxHash = '0xabc'

  const mockProvider = {
    getSigner: jest.fn(),
    send: jest.fn()
  }

  const mockSigner = {
    getAddress: jest.fn()
  }

  const mockTx = {
    hash: mockTxHash,
    wait: jest.fn()
  }

  const mockContract = {
    transfer: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Setup ethers mocks for each test
    ;(ethers.BrowserProvider as jest.Mock).mockImplementation(() => mockProvider)
    ;(ethers.Contract as jest.Mock).mockImplementation(() => mockContract)
    mockProvider.getSigner.mockResolvedValue(mockSigner)
    mockProvider.send.mockResolvedValue([])
    mockTx.wait.mockResolvedValue({})
  })

  it('should handle successful token transfer', () => {
    mockContract.transfer.mockResolvedValue(mockTx)

    return expectSaga(transferSaga)
      .provide([
        [matchers.call([mockContract, 'transfer'], mockAddress, mockAmount), mockTx],
        [matchers.call([mockTx, mockTx.wait]), {}]
      ])
      .put(transferTokenSuccess(mockTxHash))
      .dispatch({
        type: TRANSFER_TOKEN_REQUEST,
        payload: { addressFrom: mockAddressFrom, address: mockAddress, amount: mockAmount }
      })
      .silentRun()
  })

  it('should handle token transfer failure', () => {
    const error = new Error('Transfer failed')
    mockContract.transfer.mockRejectedValue(error)

    return expectSaga(transferSaga)
      .put(transferTokenFailure('Transfer failed'))
      .dispatch({
        type: TRANSFER_TOKEN_REQUEST,
        payload: { addressFrom: mockAddressFrom, address: mockAddress, amount: mockAmount }
      })
      .silentRun()
  })
})
