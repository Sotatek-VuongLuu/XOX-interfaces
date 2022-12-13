import { ChainId, ERC20Token } from '@pancakeswap/sdk'

export const CAKE_MAINNET = new ERC20Token(
  ChainId.BSC,
  '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
  18,
  'CAKE',
  'PancakeSwap Token',
  'https://pancakeswap.finance/',
)

export const CAKE_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0xFa60D973F7642B748046464e165A65B7323b0DEE',
  18,
  'CAKE',
  'PancakeSwap Token',
  'https://pancakeswap.finance/',
)

export const USDC_BSC = new ERC20Token(
  ChainId.BSC,
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  18,
  'USDC',
  'Binance-Peg USD Coin',
  'https://www.centre.io/usdc',
)

export const USDC_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0x64544969ed7EBf5f083679233325356EbE738930',
  18,
  'USDC',
  'Binance-Peg USD Coin',
  'https://www.centre.io/usdc',
)

export const USDC_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD Coin',
)

export const USDC_RINKEBY = new ERC20Token(
  ChainId.RINKEBY,
  '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b',
  6,
  'tUSDC',
  'test USD Coin',
)

export const USDC_GOERLI = new ERC20Token(
  ChainId.GOERLI,
  '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
  6,
  'tUSDC',
  'test USD Coin',
)

export const USDT_BSC = new ERC20Token(
  ChainId.BSC,
  '0x55d398326f99059fF775485246999027B3197955',
  18,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const USDT_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  6,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const BUSD_BSC = new ERC20Token(
  ChainId.BSC,
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0xaB1a4d4f1D656d2450692D237fdD6C7f9146e814',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_RINKEBY = new ERC20Token(
  ChainId.RINKEBY,
  '0x4e2442A6f7AeCE64Ca33d31756B5390860BF973E',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_GOERLI = new ERC20Token(
  ChainId.GOERLI,
  '0xb809b9B2dc5e93CB863176Ea2D565425B03c0540',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BNB_ETHEREUM = new ERC20Token(ChainId.ETHEREUM, '0xB8c77482e45F1F44dE1745F52C74426C631bDD52', 18, 'BNB')

export const MATIC_ETHEREUM = new ERC20Token(
  ChainId.ETHEREUM,
  '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
  18,
  'MATIC',
)

export const UNI_ETHEREUM = new ERC20Token(ChainId.ETHEREUM, '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', 18, 'UNI')

export const SUSHI_ETHEREUM = new ERC20Token(
  ChainId.ETHEREUM,
  '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
  18,
  'SUSHI',
)

export const USDT_ETHEREUM = new ERC20Token(ChainId.ETHEREUM, '0xdac17f958d2ee523a2206206994597c13d831ec7', 18, 'USDT')

export const LINK_ETHEREUM = new ERC20Token(ChainId.ETHEREUM, '0x514910771af9ca656af840dff83e8264ecf986ca', 18, 'LINK')

export const SHIB_ETHEREUM = new ERC20Token(ChainId.ETHEREUM, '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce', 18, 'SHIB')

export const BTCB_BSC = new ERC20Token(
  ChainId.BSC,
  '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
  18,
  'BTCB',
  'Binance BTC',
  'https://bitcoin.org/',
)
export const ETH_BSC = new ERC20Token(ChainId.BSC, '0x2170Ed0880ac9A755fd29B2688956BD959F933F8', 18, 'ETH')
export const DOGE_BSC = new ERC20Token(ChainId.BSC, '0xbA2aE424d960c26247Dd6c32edC70B295c744C43', 18, 'DOGE')
export const MATIC_BSC = new ERC20Token(ChainId.BSC, '0xcc42724c6683b7e57334c4e856f4c9965ed682bd', 18, 'MATIC')
export const CAKE_BSC = new ERC20Token(ChainId.BSC, '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', 18, 'CAKE')
export const LINK_BSC = new ERC20Token(ChainId.BSC, '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd', 18, 'LINK')
export const ADA_BSC = new ERC20Token(ChainId.BSC, '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47', 18, 'ADA')

export const BUSD: Record<ChainId, ERC20Token> = {
  [ChainId.ETHEREUM]: BUSD_ETH,
  [ChainId.RINKEBY]: BUSD_RINKEBY,
  [ChainId.GOERLI]: BUSD_GOERLI,
  [ChainId.BSC]: BUSD_BSC,
  [ChainId.BSC_TESTNET]: BUSD_TESTNET,
}

export const CAKE = {
  [ChainId.BSC]: CAKE_MAINNET,
  [ChainId.BSC_TESTNET]: CAKE_TESTNET,
}

export const USDC = {
  [ChainId.BSC]: USDC_BSC,
  [ChainId.BSC_TESTNET]: USDC_TESTNET,
  [ChainId.ETHEREUM]: USDC_ETH,
  [ChainId.RINKEBY]: USDC_RINKEBY,
  [ChainId.GOERLI]: USDC_GOERLI,
}

export const USDT = {
  [ChainId.BSC]: USDT_BSC,
  [ChainId.ETHEREUM]: USDT_ETH,
}

export const WBTC_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  8,
  'WBTC',
  'Wrapped BTC',
)
