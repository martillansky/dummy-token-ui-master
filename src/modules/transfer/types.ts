import { ethers } from 'ethers'

export type TransferState = {
  addressFrom: string | null
  address: string | null
  amount: string | null
  error: string | null
  txHash: string | null
  status: 'idle' | 'pending' | 'success' | 'error'
}

export type WindowWithEthereum = Window & {
  ethereum: ethers.Eip1193Provider
}
