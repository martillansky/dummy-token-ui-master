import { ethers } from 'ethers'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { BALANCE_REQUEST, balanceRequestFailure, balanceRequestSuccess, balanceRequestUpdate } from './actions'
import { balanceSaga } from './sagas'

// Mock ethers
jest.mock('ethers', () => ({
  ethers: {
    BrowserProvider: jest.fn(),
    Contract: jest.fn()
  }
}))

describe('balance sagas', () => {
  const mockAddress = '0x123'
  const mockBalance = '1000'

  const mockProvider = {
    getSigner: jest.fn()
  }

  const mockContract = {
    balanceOf: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Setup ethers mocks for each test
    ;(ethers.BrowserProvider as jest.Mock).mockImplementation(() => mockProvider)
    ;(ethers.Contract as jest.Mock).mockImplementation(() => mockContract)
  })

  it('should handle successful balance fetch', () => {
    const mockTx = { toString: () => mockBalance }
    mockContract.balanceOf.mockResolvedValue(mockTx)

    return expectSaga(balanceSaga)
      .provide([[matchers.call([mockContract, 'balanceOf'], mockAddress), mockTx]])
      .put(balanceRequestUpdate(mockBalance))
      .put(balanceRequestSuccess())
      .dispatch({
        type: BALANCE_REQUEST,
        payload: { address: mockAddress }
      })
      .silentRun()
  })

  it('should handle balance fetch failure', () => {
    const error = new Error('Failed to fetch balance')
    mockContract.balanceOf.mockRejectedValue(error)

    return expectSaga(balanceSaga)
      .put(balanceRequestFailure('Failed to fetch balance'))
      .dispatch({
        type: BALANCE_REQUEST,
        payload: { address: mockAddress }
      })
      .silentRun()
  })
})
