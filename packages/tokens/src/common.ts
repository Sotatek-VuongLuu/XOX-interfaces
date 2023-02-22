import { ChainId, ERC20Token } from '@pancakeswap/sdk'

export const XOX_BSC_MAINNET = new ERC20Token(
  ChainId.BSC,
  '0xA80d0Ca5D7AEe243F20Cf9140c1A6f5181890F81',
  18,
  'XOX',
  'XOX',
  'http://localhost:3001/swap?chainId=56',
)

export const XOX_BSC_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0xA80d0Ca5D7AEe243F20Cf9140c1A6f5181890F81',
  18,
  'XOX',
  'XOX',
  'http://localhost:3001/swap?chainId=97',
)

export const XOX_MAINNET = new ERC20Token(
  ChainId.ETHEREUM,
  '0x52487dd38f0e4EA455cE934690a18Ca873094472',
  18,
  'XOX',
  'XOX',
  'http://localhost:3001/swap?chainId=1',
)

export const XOX_GOERLI = new ERC20Token(
  ChainId.GOERLI,
  '0x52487dd38f0e4EA455cE934690a18Ca873094472',
  18,
  'XOX',
  'XOX',
  'http://localhost:3001/swap?chainId=5',
)

export const XOX_BUSD_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0x5E4cF7f5121C01e623B3454c35D018D452592226',
  18,
  'XOX-BUSD',
  'XOX-BUSD',
  'http://localhost:3001/pools?chainId=97',
)

export const XOX_USDC_TESTNET = new ERC20Token(
  ChainId.GOERLI,
  '0x7baAC42917dEe0B0140F6bC3DeBA3E4663161D85',
  18,
  'XOX-USDC',
  'XOX-USDC',
  'http://localhost:3001/pools?chainId=5',
)

export const XOX: Record<ChainId, ERC20Token> = {
  [ChainId.ETHEREUM]: XOX_MAINNET,
  [ChainId.RINKEBY]: XOX_GOERLI,
  [ChainId.GOERLI]: XOX_GOERLI,
  [ChainId.BSC]: XOX_BSC_MAINNET,
  [ChainId.BSC_TESTNET]: XOX_BSC_TESTNET,
}

export const XOXLP: Record<ChainId, ERC20Token> = {
  [ChainId.ETHEREUM]: XOX_USDC_TESTNET,
  [ChainId.RINKEBY]: XOX_USDC_TESTNET,
  [ChainId.GOERLI]: XOX_USDC_TESTNET,
  [ChainId.BSC]: XOX_BUSD_TESTNET,
  [ChainId.BSC_TESTNET]: XOX_BUSD_TESTNET,
}

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
  '0xD22db0a69b39a9B462e70BcfEbD1344113F768a5',
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
  '0x04CAD66eF1842A91E6cDE275E1e3A49Ee9106c56',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const USDT_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0xd984292a4870a5C5637EC36829B69f2dEA3ec84D',
  18,
  'USDT',
  'Tether USD',
  'https://tether.to/',
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
export const UNI_ETHEREUM = new ERC20Token(ChainId.ETHEREUM, '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', 18, 'UNI')
export const SUSHI_ETHEREUM = new ERC20Token(
  ChainId.ETHEREUM,
  '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
  18,
  'SUSHI',
)
export const LINK_ETHEREUM = new ERC20Token(ChainId.ETHEREUM, '0x514910771AF9Ca656af840dff83E8264EcF986CA', 18, 'LINK')
export const SHIB_ETHEREUM = new ERC20Token(ChainId.ETHEREUM, '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE', 18, 'SHIB')
export const USDC_ETHEREUM = new ERC20Token(ChainId.ETHEREUM, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 18, 'USDC')

export const WBTC_GOERLI = new ERC20Token(ChainId.GOERLI, '0x2a924bcD60450C7a354413d8b2c906A3173F9208', 8, 'WBTC')
export const BNB_GOERLI = new ERC20Token(ChainId.GOERLI, '0x013cB3419Dd78A3A24dF6F9151514752228C6960', 18, 'BNB')
export const MATIC_GOERLI = new ERC20Token(ChainId.GOERLI, '0xB4BdF7ADdeE19c35ecCa122C852103FAE0b3fe0B', 18, 'MATIC')
export const UNI_GOERLI = new ERC20Token(ChainId.GOERLI, '0x1bC4803310B723B4f0A2c27411315432b7db52Df', 18, 'UNI')
export const SUSHI_GOERLI = new ERC20Token(ChainId.GOERLI, '0x28362Cd5D11a8ce0371B4768Cd8EDF8a943CC2A9', 18, 'SUSHI')
export const LINK_GOERLI = new ERC20Token(ChainId.GOERLI, '0xCfc1B83B17084e744423Db6314B7e811729c6514', 18, 'LINK')
export const SHIB_GOERLI = new ERC20Token(ChainId.GOERLI, '0x5f933e0F9D17A4B28F229a2882e2E18dcef266c7', 18, 'SHIB')

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
export const MATIC_BSC = new ERC20Token(ChainId.BSC, '0xCC42724C6683B7E57334c4E856f4c9965ED682bD', 18, 'MATIC')
export const CAKE_BSC = new ERC20Token(ChainId.BSC, '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', 18, 'CAKE')
export const LINK_BSC = new ERC20Token(ChainId.BSC, '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD', 18, 'LINK')
export const ADA_BSC = new ERC20Token(ChainId.BSC, '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47', 18, 'ADA')

export const BTCB_BSC_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0xa3961366f8A7A5772C22A00788f1824d233B26ed',
  18,
  'BTCB',
  'Binance BTC',
  'https://bitcoin.org/',
)
export const ETH_BSC_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0x65eCB72aDEb9b5da68aA7DdD4A334546E7Cd36e2',
  18,
  'ETH',
)
export const USDT_BSC_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0xd984292a4870a5C5637EC36829B69f2dEA3ec84D',
  18,
  'USDT',
)
export const DOGE_BSC_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0xbB5a2336330C07c3b2B532210A1E5B93d747fb93',
  18,
  'DOGE',
)
export const MATIC_BSC_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0x897f93Cc7E82cC78F076C32aA45c723f84959A0D',
  18,
  'MATIC',
)
export const CAKE_BSC_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0x638666506b6875a8755884090c41Dee985aC1F6D',
  18,
  'CAKE',
)
export const LINK_BSC_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0x07bbDcd736cFc0406a3CeD96B9F2289ACBCc4c76',
  18,
  'LINK',
)
export const ADA_BSC_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0x624bcfBb991cCef8e790E58eD973D8e24cc66eCc',
  18,
  'ADA',
)
// export const XOX_BSC_TESTNET = new ERC20Token(ChainId.BSC_TESTNET, '0x798bb5B1CD7ed74654EBfD5D58a24d3D9Cc67847', 18, 'XOX')

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

export const USD = {
  [ChainId.BSC]: USDT_BSC,
  [ChainId.BSC_TESTNET]: USDT_BSC_TESTNET,
  [ChainId.ETHEREUM]: USDC_ETH,
  [ChainId.RINKEBY]: USDC_RINKEBY,
  [ChainId.GOERLI]: USDC_GOERLI,
}

export const WBTC_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  8,
  'WBTC',
  'Wrapped Bitcoin',
)
