import { ChainId } from '@pancakeswap/sdk'

const Bsc = '/images/networks/bsc-network.png'
const Goerli = '/images/networks/goerli-network.jpg'
const Polygon = '/images/networks/eth-network.png'
const Rinkeby = '/images/networks/eth-network.png'

export const NETWORK_ICON = {
  [ChainId.BSC]: Bsc,
  [ChainId.BSC_TESTNET]: Bsc,
  [ChainId.ETHEREUM]: Polygon,
  [ChainId.GOERLI]: Polygon,
  [ChainId.RINKEBY]: Rinkeby,
}

export const NETWORK_LABEL: { [chainId in ChainId]?: string } = {
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.BSC_TESTNET]: 'BSC',
  [ChainId.BSC]: 'BSC',
  [ChainId.ETHEREUM]: 'Ethereum',
  [ChainId.GOERLI]: 'Ethereum',
}

export const NETWORK_LINK: { [chainId in ChainId]?: any } = {
  [ChainId.RINKEBY]: 'https://rinkeby.etherscan.io',
  [ChainId.GOERLI]: 'https://goerli.etherscan.io',
  [ChainId.BSC]: 'https://bscscan.com',
  [ChainId.BSC_TESTNET]: 'https://testnet.bscscan.com',
}

export const CONTRACT_BRIDGE_POOL: { [chainId in ChainId]?: any } = {
  [ChainId.GOERLI]: '0x90fded525b5E613c9dc0fE600d9b52a648386e2E',
  [ChainId.BSC]: '',
  [ChainId.BSC_TESTNET]: '0x90fded525b5E613c9dc0fE600d9b52a648386e2E',
  [ChainId.ETHEREUM]: '',
}
