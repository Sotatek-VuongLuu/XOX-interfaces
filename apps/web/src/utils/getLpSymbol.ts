import { WNATIVE, NATIVE } from '@pancakeswap/sdk'

export const getLPSymbol = (token0Symbol: string, token1Symbol: string, chainId: number) => {
  if (token0Symbol === WNATIVE[chainId].symbol) {
    return `${NATIVE[chainId].symbol}-${token1Symbol} LP`
  }
  if (token1Symbol === WNATIVE[chainId].symbol) {
    return `${token0Symbol}-${NATIVE[chainId].symbol} LP`
  }
  return `${token0Symbol}-${token1Symbol} LP`
}

export const getLPSymbol2 = (token0Symbol: string, token1Symbol: string, chainId: number) => {
  if (token0Symbol === WNATIVE[chainId].symbol) {
    return `${NATIVE[chainId].symbol}/${token1Symbol} Pool Tokens`
  }
  if (token1Symbol === WNATIVE[chainId].symbol) {
    return `${token0Symbol}/${NATIVE[chainId].symbol} Pool Tokens`
  }
  return `${token0Symbol}/${token1Symbol} Pool Tokens`
}
