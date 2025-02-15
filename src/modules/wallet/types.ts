import { ethers } from 'ethers'

export type WalletState = {
  address: string | null
  balance: string | null
  isConnecting: boolean
  //isUpdating: boolean
  isTransferModelOpen: boolean
  error: string | null
}

export type WindowWithEthereum = Window & {
  ethereum: ethers.Eip1193Provider
}
