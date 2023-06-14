import { ChainId } from '@pancakeswap/sdk'

const Bsc = `/images/chains/56.svg`
const Ethereum = `/images/chains/1.svg`
const Arbitrum = `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/Arbitrum.svg`
const Polygon = `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/Polygon.svg`
const zkSync = `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/zkSync.svg`
const Optimism = `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/Optimism.svg`

export const NETWORK_ICON = {
  [ChainId.BSC]: Bsc,
  [ChainId.BSC_TESTNET]: Bsc,
  [ChainId.ETHEREUM]: Ethereum,
  [ChainId.GOERLI]: Ethereum,
  [ChainId.RINKEBY]: Ethereum,
  [ChainId.ARBITRUM]: Arbitrum,
  [ChainId.ARBITRUM_TESTNET]: Arbitrum,
  [ChainId.POLYGON]: Polygon,
  [ChainId.POLYGON_TESTNET]: Polygon,
  [ChainId.ZKSYNC]: zkSync,
  [ChainId.ZKSYNC_TESTNET]: zkSync,
  [ChainId.OPTIMISM]: Optimism,
  [ChainId.OPTIMISM_TESTNET]: Optimism,
}

export const DAPP_CHAINS = [
  ChainId.BSC,
  ChainId.ETHEREUM,
  ChainId.BSC_TESTNET,
  ChainId.GOERLI,
]

export const MAINNET_CHAINS = [
  ChainId.BSC,
  ChainId.ETHEREUM,
  ChainId.ARBITRUM,
  ChainId.POLYGON,
  ChainId.ZKSYNC,
  ChainId.OPTIMISM,
]

export const TESTNET_CHAINS = [
  ChainId.BSC_TESTNET,
  ChainId.GOERLI,
  ChainId.ARBITRUM_TESTNET,
  ChainId.POLYGON_TESTNET,
  ChainId.ZKSYNC_TESTNET,
  ChainId.OPTIMISM_TESTNET,
]

export const BRIDGE_CHAINS_ONLY = [
  ChainId.ARBITRUM,
  ChainId.POLYGON,
  ChainId.ZKSYNC,
  ChainId.OPTIMISM,
  ChainId.ARBITRUM_TESTNET,
  ChainId.POLYGON_TESTNET,
  ChainId.ZKSYNC_TESTNET,
  ChainId.OPTIMISM_TESTNET,
]

export const NETWORK_LABEL: { [chainId in ChainId]?: string } = {
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.BSC_TESTNET]: 'BSC Testnet',
  [ChainId.BSC]: 'BSC',
  [ChainId.ETHEREUM]: 'Ethereum',
  [ChainId.GOERLI]: 'Goerli',
  [ChainId.ARBITRUM]: 'Arbitrum',
  [ChainId.ARBITRUM_TESTNET]: 'ArbitrumTest',
  [ChainId.POLYGON]: 'Polygon',
  [ChainId.POLYGON_TESTNET]: 'PolygonTest',
  [ChainId.ZKSYNC]: 'zkSync',
  [ChainId.ZKSYNC_TESTNET]: 'zkSyncTest',
  [ChainId.OPTIMISM]: 'Optimism',
  [ChainId.OPTIMISM_TESTNET]: 'OptimismTest',
}

export const NETWORK_LINK: { [chainId in ChainId]?: any } = {
  [ChainId.RINKEBY]: 'https://rinkeby.etherscan.io',
  [ChainId.GOERLI]: 'https://goerli.etherscan.io',
  [ChainId.BSC]: 'https://bscscan.com',
  [ChainId.BSC_TESTNET]: 'https://testnet.bscscan.com',
  [ChainId.ARBITRUM]: 'https://arbiscan.io',
  [ChainId.ARBITRUM_TESTNET]: 'https://goerli-rollup-explorer.arbitrum.io',
  [ChainId.POLYGON]: 'https://polygonscan.com',
  [ChainId.POLYGON_TESTNET]: 'https://mumbai.polygonscan.com',
  [ChainId.ZKSYNC]: 'https://zkscan.io',
  [ChainId.ZKSYNC_TESTNET]: 'https://goerli.explorer.zksync.io',
  [ChainId.OPTIMISM]: 'https://optimistic.etherscan.io',
  [ChainId.OPTIMISM_TESTNET]: 'https://optimism.io',
}

export const SITE_NAME: { [chainId in ChainId]?: any } = {
  [ChainId.RINKEBY]: 'Etherscan',
  [ChainId.GOERLI]: 'Etherscan',
  [ChainId.BSC]: 'Bscscan',
  [ChainId.BSC_TESTNET]: 'Bscscan',
  [ChainId.ARBITRUM]: 'Arbiscan',
  [ChainId.ARBITRUM_TESTNET]: 'Arbiscan',
  [ChainId.POLYGON]: 'Polygonscan',
  [ChainId.POLYGON_TESTNET]: 'Polygonscan',
  [ChainId.ZKSYNC]: 'Zkscan',
  [ChainId.ZKSYNC_TESTNET]: 'Zkscan',
  [ChainId.OPTIMISM]: 'Optimismscan',
  [ChainId.OPTIMISM_TESTNET]: 'Optimismscan',
}

export const CONTRACT_BRIDGE_POOL = {
  [ChainId.GOERLI]: '0x27D2ec949C4D93D6246E538eBCACf1A76d7A899E',
}
