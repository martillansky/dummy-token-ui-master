import { ethers } from 'ethers'

export type TransferState = {
  address: string | null
  amount: string | null
  error: string | null
}

export type WindowWithEthereum = Window & {
  ethereum: ethers.Eip1193Provider
}
