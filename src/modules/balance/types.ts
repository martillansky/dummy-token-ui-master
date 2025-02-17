import { ethers } from 'ethers'

export type BalanceState = {
  isUpdating: boolean
  balance: string | null
  address: string | null
  error: string | null
}

export type WindowWithEthereum = Window & {
  ethereum: ethers.Eip1193Provider
}
