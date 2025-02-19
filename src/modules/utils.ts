import { ethers } from 'ethers'
import { TOKEN_DECIMALS } from '../config'

export function isErrorWithMessage(error: unknown): error is Error {
  return error !== undefined && error !== null && typeof error === 'object' && 'message' in error
}

export const formatBalance = (balanceWei: string | null) => {
  if (!balanceWei) return '0'
  try {
    return ethers.formatUnits(balanceWei, TOKEN_DECIMALS)
  } catch (error) {
    console.error('Error formatting balance:', error)
    return '0'
  }
}
