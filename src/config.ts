import { ethers } from 'ethers'

export const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS
export const TOKEN_DECIMALS = ethers.toNumber(import.meta.env.VITE_TOKEN_DECIMALS)
