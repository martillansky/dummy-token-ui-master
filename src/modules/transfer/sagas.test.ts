import { ethers } from 'ethers'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import { TOKEN_ABI } from '../wallet/sagas'
import { TRANSFER_TOKEN_REQUEST, transferTokenFailure, transferTokenSuccess } from './actions'
import { transferSaga } from './sagas'
import { WindowWithEthereum } from './types'

/* // Mock TOKEN_ADDRESS and TOKEN_ABI directly instead of importing
const TOKEN_ADDRESS = '0x123'
const TOKEN_ABI = [
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount)'
] */

describe('transfer sagas', () => {
  const windowWithEthereum = window as unknown as WindowWithEthereum
  const mockAddressFrom = '0x123'
  const mockAddress = '0x456'
  const mockAmount = '100'
  const mockTxHash = '0xabc'

  const mockProvider = {
    getSigner: jest.fn(),
    provider: {},
    destroy: jest.fn(),
    getBlockNumber: jest.fn(),
    getNetwork: jest.fn(),
    send: jest.fn()
  } as unknown as ethers.BrowserProvider

  const mockSigner = {
    getAddress: jest.fn(),
    provider: mockProvider
  }

  const mockContract = {
    transfer: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle successful token transfer', () => {
    const mockTx = { hash: mockTxHash }
    mockContract.transfer.mockResolvedValue(mockTx)

    return expectSaga(transferSaga)
      .provide([
        [matchers.call.fn(() => new ethers.BrowserProvider(windowWithEthereum.ethereum)), mockProvider],
        [matchers.call.fn(() => mockProvider.getSigner()), mockSigner],
        //[matchers.call.fn(() => new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, mockSigner)), mockContract],
        [matchers.call.fn(() => new ethers.Contract('0x123', TOKEN_ABI, mockSigner)), mockContract],
        [matchers.call([mockContract, 'transfer']), mockTx]
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

    return expectSaga(transferSaga)
      .provide([matchers.call.fn(() => new ethers.BrowserProvider(windowWithEthereum.ethereum)), throwError(error)])
      .put(transferTokenFailure('Transfer failed'))
      .dispatch({
        type: TRANSFER_TOKEN_REQUEST,
        payload: { addressFrom: mockAddressFrom, address: mockAddress, amount: mockAmount }
      })
      .silentRun()
  })
})
