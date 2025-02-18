import { ethers } from 'ethers'

export type EthereumProvider = ethers.Eip1193Provider & {
  on(event: 'accountsChanged', handler: (accounts: string[]) => void): void
  removeListener(event: 'accountsChanged', handler: (accounts: string[]) => void): void
}

export type WalletState = {
  address: string | null
  isConnecting: boolean
  error: string | null
}

export type WindowWithEthereum = Window & {
  ethereum: EthereumProvider
}
