import { ethers } from 'ethers'

export type BalanceState = {
  isUpdating: boolean
  address: string | null
  error: string | null
}

export type WindowWithEthereum = Window & {
  ethereum: ethers.Eip1193Provider
}
