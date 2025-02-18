import { ethers } from 'ethers'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import { TOKEN_ABI } from '../wallet/sagas'
import { BALANCE_REQUEST, balanceRequestFailure, balanceRequestSuccess, balanceRequestUpdate } from './actions'
import { balanceSaga } from './sagas'
import { WindowWithEthereum } from './types'

describe('balance sagas', () => {
  const windowWithEthereum = window as unknown as WindowWithEthereum
  const mockAddress = '0x123'
  const mockBalance = '1000'

  const mockProvider = {
    getSigner: jest.fn()
  } as unknown as ethers.BrowserProvider

  const mockContract = {
    balanceOf: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle successful balance fetch', () => {
    const mockTx = { toString: () => mockBalance }
    mockContract.balanceOf.mockResolvedValue(mockTx)

    return expectSaga(balanceSaga)
      .provide([
        [matchers.call.fn(() => new ethers.BrowserProvider(windowWithEthereum.ethereum)), mockProvider],
        [matchers.call.fn(() => new ethers.Contract('0x123', TOKEN_ABI, mockProvider)), mockContract],
        [matchers.call([mockContract, 'balanceOf']), mockTx]
      ])
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

    return expectSaga(balanceSaga)
      .provide([[matchers.call.fn(() => new ethers.BrowserProvider(windowWithEthereum.ethereum)), throwError(error)]])
      .put(balanceRequestFailure('Failed to fetch balance'))
      .dispatch({
        type: BALANCE_REQUEST,
        payload: { address: mockAddress }
      })
      .silentRun()
  })
})
