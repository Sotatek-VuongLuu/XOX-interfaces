import { ERC20Token } from './entities/token'

export enum ChainId {
  ETHEREUM = 1,
  RINKEBY = 4,
  GOERLI = 5,
  BSC = 56,
  BSC_TESTNET = 97,
  ARBITRUM = 42161,
  ARBITRUM_TESTNET = 421613,
  POLYGON = 137,
  POLYGON_TESTNET = 80001,
  ZKSYNC = 324,
  ZKSYNC_TESTNET = 280,
  OPTIMISM = 10,
  OPTIMISM_TESTNET = 420,
}

export const FACTORY_ADDRESS = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'

const FACTORY_ADDRESS_ETH = '0x9C1B26D5edBB2BA5697EBE01DA48f8CC0cF45C03'

export const FACTORY_ADDRESS_MAP: Record<number, string> = {
  [ChainId.ETHEREUM]: FACTORY_ADDRESS_ETH,
  [ChainId.RINKEBY]: FACTORY_ADDRESS_ETH,
  [ChainId.GOERLI]: FACTORY_ADDRESS_ETH,
  [ChainId.BSC]: FACTORY_ADDRESS,
  [ChainId.BSC_TESTNET]: '0xb058aaA0E02054b778C456135F9b1Db87229a597',
}

export const PAIR_XOX_BUSD: Record<number, string> = {
  // [ChainId.ETHEREUM]: FACTORY_ADDRESS_ETH,
  // [ChainId.RINKEBY]: FACTORY_ADDRESS_ETH,
  [ChainId.GOERLI]: '0xE8D6f48CE1beCeCa40a848bEb177BcD17C25303B',
  // [ChainId.BSC]: FACTORY_ADDRESS,
  [ChainId.BSC_TESTNET]: '0x1cee830b7f20cefb4dcff3b3e9e7859923827248',
}

export const XOX_ADDRESS: Record<number, string> = {
  // [ChainId.ETHEREUM]: '',
  // [ChainId.RINKEBY]: '',
  [ChainId.GOERLI]: '0x92b3d85b4589bBEE8e3a04114C217Aa497B44aDD',
  // [ChainId.BSC]: '',
  [ChainId.BSC_TESTNET]: '0xC82f6DF626787D0FD686Ed211A232Fe8Cd1EF42d',
  // [ChainId.BSC]: '',
  [ChainId.ARBITRUM_TESTNET]: '0xCc7283a00481de9AdBE379c3c2459691a6ee274a',
  // [ChainId.BSC]: '',
  [ChainId.POLYGON_TESTNET]: '0xCc7283a00481de9AdBE379c3c2459691a6ee274a',
  // [ChainId.BSC]: '',
  [ChainId.ZKSYNC_TESTNET]: '0xCc7283a00481de9AdBE379c3c2459691a6ee274a',
  // [ChainId.BSC]: '',
  [ChainId.OPTIMISM_TESTNET]: '0xCc7283a00481de9AdBE379c3c2459691a6ee274a',
}

export const USD_ADDRESS: Record<number, string> = {
  [ChainId.ETHEREUM]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  [ChainId.RINKEBY]: '',
  [ChainId.GOERLI]: '0x8E96c0aC1ABd86ba1652D843CA024FD0939b3760',
  [ChainId.BSC]: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  [ChainId.BSC_TESTNET]: '0xc60a52351918c13eF3B27F72e5E71877ca3cB13A',
}
export const INIT_CODE_HASH = '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5'

const INIT_CODE_HASH_ETH = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'
export const INIT_CODE_HASH_MAP: Record<number, string> = {
  [ChainId.ETHEREUM]: INIT_CODE_HASH_ETH,
  [ChainId.RINKEBY]: INIT_CODE_HASH_ETH,
  [ChainId.GOERLI]: INIT_CODE_HASH_ETH,
  [ChainId.BSC]: INIT_CODE_HASH,
  [ChainId.BSC_TESTNET]: '0xd0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66',
}

export const WETH9 = {
  [ChainId.ETHEREUM]: new ERC20Token(
    ChainId.ETHEREUM,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
  [ChainId.RINKEBY]: new ERC20Token(
    ChainId.RINKEBY,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
  [ChainId.GOERLI]: new ERC20Token(
    ChainId.GOERLI,
    '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
}

export const WBNB = {
  [ChainId.ETHEREUM]: new ERC20Token(
    ChainId.ETHEREUM,
    '0x418D75f65a02b3D53B2418FB8E1fe493759c7605',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.org'
  ),
  [ChainId.BSC]: new ERC20Token(
    ChainId.BSC,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.org'
  ),
  [ChainId.BSC_TESTNET]: new ERC20Token(
    ChainId.BSC_TESTNET,
    '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.org'
  ),
}

export const WNATIVE: Record<number, ERC20Token> = {
  [ChainId.ETHEREUM]: WETH9[ChainId.ETHEREUM],
  [ChainId.RINKEBY]: WETH9[ChainId.RINKEBY],
  [ChainId.GOERLI]: WETH9[ChainId.GOERLI],
  [ChainId.BSC]: WBNB[ChainId.BSC],
  [ChainId.BSC_TESTNET]: WBNB[ChainId.BSC_TESTNET],
}

export const NATIVE: Record<
  number,
  {
    name: string
    symbol: string
    decimals: number
  }
> = {
  [ChainId.ETHEREUM]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [ChainId.RINKEBY]: { name: 'Rinkeby Ether', symbol: 'RIN', decimals: 18 },
  [ChainId.GOERLI]: { name: 'Goerli Ether', symbol: 'GOR', decimals: 18 },
  [ChainId.BSC]: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
  [ChainId.BSC_TESTNET]: {
    name: 'Binance Chain Native Token',
    symbol: 'tBNB',
    decimals: 18,
  },
  [ChainId.ARBITRUM]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [ChainId.ARBITRUM_TESTNET]: { name: 'AGOR', symbol: 'AGOR', decimals: 18 },
  [ChainId.POLYGON]: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  [ChainId.POLYGON_TESTNET]: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  [ChainId.ZKSYNC]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [ChainId.ZKSYNC_TESTNET]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [ChainId.OPTIMISM]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [ChainId.OPTIMISM_TESTNET]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
}
