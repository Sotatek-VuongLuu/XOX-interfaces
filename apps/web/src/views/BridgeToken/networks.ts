import { ChainId } from '@pancakeswap/sdk'

const Bsc = `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/networks/bsc-network.png`
const Goerli = `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/networks/goerli-network.jpg`
const Polygon = `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/networks/eth-network.png`
const Rinkeby = `${process.env.NEXT_PUBLIC_ASSETS_URI}/images/networks/eth-network.png`

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
  [ChainId.GOERLI]: '0x9CD56295c4CFCDEA7062c1348b464c75E9Afa5b8',
  [ChainId.BSC]: '',
  [ChainId.BSC_TESTNET]: '0xA62C197248BD66Eb6CFF15Bd51F560D546d88443',
  [ChainId.ETHEREUM]: '',
}
