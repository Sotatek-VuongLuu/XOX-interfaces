import { getAddress } from '@ethersproject/address'
import memoize from 'lodash/memoize'
import { ChainId, Token } from '@pancakeswap/sdk'

const mapping = {
  [ChainId.BSC]: 'smartchain',
  [ChainId.ETHEREUM]: 'ethereum',
  [ChainId.GOERLI]: 'goerli',
  [ChainId.BSC_TESTNET]: 'bsc_testnet',
}

const getTokenLogoURL = memoize(
  (token?: Token) => {
    if (token && token.symbol.toLocaleUpperCase() === 'XOX') {
      return `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/tokens/xox-icon.svg`
    }
    if (token && token.symbol.toLocaleUpperCase() === 'XOXS') {
      return `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/tokens/xoxs-icon.svg`
    }
    if (token && token.address && mapping[token.chainId]) {
      return `https://assets-cdn.trustwallet.com/blockchains/${mapping[token.chainId]}/assets/${getAddress(
        token.address,
      )}/logo.png`
    }
    return null
  },
  (t) => `${t.chainId}#${t.address}`,
)

export default getTokenLogoURL
