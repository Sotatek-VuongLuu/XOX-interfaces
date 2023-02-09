import { getAddress } from '@ethersproject/address'
import { ChainId, Token } from '@pancakeswap/sdk'
import { XOX_ADDRESS } from 'config/constants/exchange'

const mapping = {
  [ChainId.BSC]: 'smartchain',
  [ChainId.ETHEREUM]: 'ethereum',
  [ChainId.GOERLI]: 'goerli',
  [ChainId.BSC_TESTNET]: 'bsc_testnet',
}

const getTokenLogoURL = (token?: Token) => {
  if (token && token.symbol.toLocaleUpperCase() === 'XOX') {
    return `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/tokens/xox-icon.svg`
  }
  if (token && token.address.toLowerCase() === XOX_ADDRESS[token.chainId].toLowerCase()) {
    return `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/tokens/xox-icon.svg`
  }
  if (token && token.symbol.toLocaleUpperCase() === 'XOXS') {
    return `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/tokens/xoxs-icon.svg`
  }
  if (token && token.chainId === 97 && token.symbol.toLocaleUpperCase() === 'BUSD') {
    return `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/1/tokens/BUSD.png`
  }
  if (token && token.chainId === 5 && token.symbol.toLocaleUpperCase() === 'TUSDC') {
    return `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/1/tokens/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.svg`
  }
  if (token && token.address && mapping[token.chainId]) {
    return `https://assets-cdn.trustwallet.com/blockchains/${mapping[token.chainId]}/assets/${getAddress(
      token.address,
    )}/logo.png`
  }

  return null
}

export default getTokenLogoURL
