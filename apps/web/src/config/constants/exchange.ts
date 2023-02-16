import { ChainId, JSBI, Percent, Token, WNATIVE } from '@pancakeswap/sdk'
import { BigNumber } from '@ethersproject/bignumber'
import {
  bscTokens,
  bscTestnetTokens,
  USDC,
  USDT,
  BUSD,
  WBTC_ETH,
  BNB_ETHEREUM,
  MATIC_ETHEREUM,
  UNI_ETHEREUM,
  SUSHI_ETHEREUM,
  USDC_ETHEREUM,
  SHIB_ETHEREUM,
  MATIC_BSC,
  LINK_ETHEREUM,
  WBTC_GOERLI,
  BNB_GOERLI,
  MATIC_GOERLI,
  UNI_GOERLI,
  SUSHI_GOERLI,
  USDC_GOERLI,
  LINK_GOERLI,
  SHIB_GOERLI,
  BTCB_BSC_TESTNET,
  ETH_BSC_TESTNET,
  DOGE_BSC_TESTNET,
  MATIC_BSC_TESTNET,
  CAKE_BSC_TESTNET,
  LINK_BSC_TESTNET,
  ADA_BSC_TESTNET,
  XOX_BSC_TESTNET,
  XOX_GOERLI,
  USDT_BSC_TESTNET,
} from '@pancakeswap/tokens'
import { ChainMap, ChainTokenList } from './types'

export const ROUTER_ADDRESS: ChainMap<string> = {
  [ChainId.ETHEREUM]: '0xEfF92A263d31888d860bD50809A8D171709b7b1c',
  [ChainId.RINKEBY]: '0xEfF92A263d31888d860bD50809A8D171709b7b1c',
  // [ChainId.GOERLI]: '0xEfF92A263d31888d860bD50809A8D171709b7b1c',
  [ChainId.GOERLI]: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  [ChainId.BSC]: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  [ChainId.BSC_TESTNET]: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
}
export const ROUTER_XOX: ChainMap<string> = {
  [ChainId.ETHEREUM]: '',
  [ChainId.RINKEBY]: '',
  [ChainId.GOERLI]: '0xA3d98A2a0B38AAB985d39974FD560AcBd59468a9',
  [ChainId.BSC]: '',
  [ChainId.BSC_TESTNET]: '0x7b56ec4a1D7c24357189329eEB929C435128a78D',
}

export const XOX_ADDRESS: ChainMap<string> = {
  [ChainId.ETHEREUM]: '',
  [ChainId.RINKEBY]: '',
  [ChainId.GOERLI]: '0x52487dd38f0e4EA455cE934690a18Ca873094472',
  [ChainId.BSC]: '',
  [ChainId.BSC_TESTNET]: '0xA80d0Ca5D7AEe243F20Cf9140c1A6f5181890F81',
}

export const XOX_LP: ChainMap<string> = {
  [ChainId.ETHEREUM]: '',
  [ChainId.RINKEBY]: '',
  [ChainId.GOERLI]: '0x7baAC42917dEe0B0140F6bC3DeBA3E4663161D85',
  [ChainId.BSC]: '',
  [ChainId.BSC_TESTNET]: '0x5E4cF7f5121C01e623B3454c35D018D452592226',
}

export const USD_ADDRESS: ChainMap<string> = {
  [ChainId.ETHEREUM]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  [ChainId.RINKEBY]: '',
  [ChainId.GOERLI]: '0xD22db0a69b39a9B462e70BcfEbD1344113F768a5',
  [ChainId.BSC]: '0x55d398326f99059fF775485246999027B3197955',
  [ChainId.BSC_TESTNET]: '0xd984292a4870a5C5637EC36829B69f2dEA3ec84D',
}

export const USD_DECIMALS: ChainMap<number> = {
  [ChainId.ETHEREUM]: 6,
  [ChainId.RINKEBY]: 6,
  [ChainId.GOERLI]: 6,
  [ChainId.BSC]: 18,
  [ChainId.BSC_TESTNET]: 18,
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.ETHEREUM]: [WNATIVE[ChainId.ETHEREUM], USDC[ChainId.ETHEREUM], USDT[ChainId.ETHEREUM], WBTC_ETH],
  [ChainId.GOERLI]: [WNATIVE[ChainId.GOERLI]],
  [ChainId.RINKEBY]: [WNATIVE[ChainId.RINKEBY], USDC[ChainId.RINKEBY], BUSD[ChainId.RINKEBY]],
  [ChainId.BSC]: [
    bscTokens.wbnb,
    bscTokens.cake,
    bscTokens.busd,
    bscTokens.usdt,
    bscTokens.btcb,
    bscTokens.eth,
    bscTokens.usdc,
  ],
  [ChainId.BSC_TESTNET]: [bscTestnetTokens.wbnb, bscTestnetTokens.cake, bscTestnetTokens.busd],
}

/**
 * Additional bases for specific tokens
 * @example { [WBTC.address]: [renBTC], [renBTC.address]: [WBTC] }
 */
export const ADDITIONAL_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.BSC]: {
    // SNFTS-SFUND
    [bscTokens.snfts.address]: [bscTokens.sfund],
  },
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 * @example [AMPL.address]: [DAI, WNATIVE[ChainId.BSC]]
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.BSC]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  [ChainId.ETHEREUM]: [
    WBTC_ETH,
    BNB_ETHEREUM,
    MATIC_ETHEREUM,
    UNI_ETHEREUM,
    SUSHI_ETHEREUM,
    USDC_ETHEREUM,
    LINK_ETHEREUM,
    SHIB_ETHEREUM,
  ],
  [ChainId.RINKEBY]: [USDC[ChainId.RINKEBY], WNATIVE[ChainId.RINKEBY], BUSD[ChainId.RINKEBY]],
  [ChainId.GOERLI]: [
    WBTC_GOERLI,
    BNB_GOERLI,
    MATIC_GOERLI,
    UNI_GOERLI,
    SUSHI_GOERLI,
    USDC_GOERLI,
    LINK_GOERLI,
    SHIB_GOERLI,
    XOX_GOERLI,
  ],
  [ChainId.BSC]: [
    bscTokens.btcb,
    bscTokens.eth,
    bscTokens.usdt,
    bscTokens.doge,
    MATIC_BSC,
    bscTokens.cake,
    bscTokens.link,
    bscTokens.ada,
  ],
  [ChainId.BSC_TESTNET]: [
    BTCB_BSC_TESTNET,
    ETH_BSC_TESTNET,
    USDT_BSC_TESTNET,
    DOGE_BSC_TESTNET,
    MATIC_BSC_TESTNET,
    CAKE_BSC_TESTNET,
    LINK_BSC_TESTNET,
    ADA_BSC_TESTNET,
    XOX_BSC_TESTNET,
  ],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  [ChainId.ETHEREUM]: [USDC[ChainId.ETHEREUM], WNATIVE[ChainId.ETHEREUM], USDT[ChainId.ETHEREUM], WBTC_ETH],
  [ChainId.RINKEBY]: [USDC[ChainId.RINKEBY], WNATIVE[ChainId.RINKEBY], BUSD[ChainId.RINKEBY]],
  [ChainId.GOERLI]: [USDC[ChainId.GOERLI], WNATIVE[ChainId.GOERLI], BUSD[ChainId.GOERLI]],
  [ChainId.BSC]: [bscTokens.wbnb, bscTokens.dai, bscTokens.busd, bscTokens.usdt, bscTokens.cake],
  [ChainId.BSC_TESTNET]: [bscTestnetTokens.wbnb, bscTestnetTokens.cake, bscTestnetTokens.busd],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.ETHEREUM]: [
    [WNATIVE[ChainId.ETHEREUM], USDC[ChainId.ETHEREUM]],
    [WBTC_ETH, WNATIVE[ChainId.ETHEREUM]],
    [WNATIVE[ChainId.ETHEREUM], USDT[ChainId.ETHEREUM]],
  ],
  [ChainId.BSC]: [
    [bscTokens.cake, bscTokens.wbnb],
    [bscTokens.busd, bscTokens.usdt],
    [bscTokens.dai, bscTokens.usdt],
  ],
}

export const BIG_INT_ZERO = JSBI.BigInt(0)
export const BIG_INT_TEN = JSBI.BigInt(10)

// one basis point
export const BIPS_BASE = JSBI.BigInt(10000)
export const ONE_BIPS = new Percent(JSBI.BigInt(1), BIPS_BASE)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much BNB so they end up with <.01
export const MIN_BNB: JSBI = JSBI.exponentiate(BIG_INT_TEN, JSBI.BigInt(16)) // .01 BNB
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), BIPS_BASE)

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

export const BASE_FEE_BSC = new Percent(JSBI.BigInt(25), BIPS_BASE)
export const BASE_FEE_ETH = new Percent(JSBI.BigInt(30), BIPS_BASE)
export const INPUT_FRACTION_AFTER_FEE_BSC = ONE_HUNDRED_PERCENT.subtract(BASE_FEE_BSC)
export const INPUT_FRACTION_AFTER_FEE_ETH = ONE_HUNDRED_PERCENT.subtract(BASE_FEE_ETH)
export const INPUT_FRACTION_AFTER_FEE: ChainMap<Percent> = {
  [ChainId.ETHEREUM]: INPUT_FRACTION_AFTER_FEE_ETH,
  [ChainId.RINKEBY]: INPUT_FRACTION_AFTER_FEE_ETH,
  [ChainId.GOERLI]: INPUT_FRACTION_AFTER_FEE_ETH,
  [ChainId.BSC]: INPUT_FRACTION_AFTER_FEE_BSC,
  [ChainId.BSC_TESTNET]: INPUT_FRACTION_AFTER_FEE_BSC,
}

// BNB
export const DEFAULT_INPUT_CURRENCY = 'BNB'
// CAKE
export const DEFAULT_OUTPUT_CURRENCY = '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82'

// Handler string is passed to Gelato to use PCS router
export const GELATO_HANDLER = 'pancakeswap'
export const GENERIC_GAS_LIMIT_ORDER_EXECUTION = BigNumber.from(500000)

export const LIMIT_ORDERS_DOCS_URL = 'https://docs.xoxnet.io/products/pancakeswap-exchange/limit-orders'

export const EXCHANGE_PAGE_PATHS = ['/swap', '/limit-orders', 'liquidity', '/add', '/find', '/remove']

export const SUGGESTED_BASES_ID = {
  //ETHEREUM
  ETH: 1027,
  '0XB8C77482E45F1F44DE1745F52C74426C631BDD52': 1839, // BNB
  '0X2260FAC5E5542A773AA44FBCFEDF7C193BC2C599': 3717, // WBTC
  '0X7D1AFA7B718FB893DB30A3ABC0CFC608AACFEBB0': 3890, // MATIC
  '0X1F9840A85D5AF5BF1D1762F925BDADDC4201F984': 7083, // UNI
  '0X6B3595068778DD592E39A122F4F5A5CF09C90FE2': 6758, // SUSHI
  '0XA0B86991C6218B36C1D19D4A2E9EB0CE3606EB48': 3408, // USDC
  '0X514910771AF9CA656AF840DFF83E8264ECF986CA': 1975, // LINK
  '0X95AD61B0A150D79219DCF64E1E6CC01F0B64C4CE': 5994, // SHIB

  // BSC
  BNB: 1839,
  '0X2170ED0880AC9A755FD29B2688956BD959F933F8': 1027, // ETH
  '0X7130D2A12B9BCBFAE4F2634D864A1EE1CE3EAD9C': 4023, // BTCB
  '0X55D398326F99059FF775485246999027B3197955': 825, // USDT
  '0XBA2AE424D960C26247DD6C32EDC70B295C744C43': 74, // DOGE
  '0XCC42724C6683B7E57334C4E856F4C9965ED682BD': 3890, // MATIC BSC
  '0X0E09FABB73BD3ADE0A17ECC321FD13A19E81CE82': 7186, // CAKE
  '0XF8A0BF9CF54BB92F17374D9E9A321E6A111A51BD': 1975, // LINK BSC
  '0X3EE2200EFB3400FABB9AACF31297CBDD1D435D47': 2010, // ADA

  // GOERLI
  '0X013CB3419DD78A3A24DF6F9151514752228C6960': 1839, // BNB
  '0X2A924BCD60450C7A354413D8B2C906A3173F9208': 3717, // WBTC TESTNET
  '0XB4BDF7ADDEE19C35ECCA122C852103FAE0B3FE0B': 3890, // MATIC TESTNET
  '0X1BC4803310B723B4F0A2C27411315432B7DB52DF': 7083, // UNI TESTNET
  '0X28362CD5D11A8CE0371B4768CD8EDF8A943CC2A9': 6758, // SUSHI TESTNET
  '0XD22DB0A69B39A9B462E70BCFEBD1344113F768A5': 3408, // USDC TESTNET
  '0XCFC1B83B17084E744423DB6314B7E811729C6514': 1975, // LINK TESTNET
  '0X5F933E0F9D17A4B28F229A2882E2E18DCEF266C7': 5994, // SHIB TESTNET

  // BSC TESTNET
  '0XA3961366F8A7A5772C22A00788F1824D233B26ED': 4023, // BTCB  BSC TESTNET
  '0X65ECB72ADEB9B5DA68AA7DDD4A334546E7CD36E2': 1027, // ETH BSC TESTNET
  '0XD984292A4870A5C5637EC36829B69F2DEA3EC84D': 825, // USDT  BSC TESTNET
  '0XBB5A2336330C07C3B2B532210A1E5B93D747FB93': 74, // DOGE  BSC TESTNET
  '0X897F93CC7E82CC78F076C32AA45C723F84959A0D': 3890, // MATIC BSC TESTNET
  '0X638666506B6875A8755884090C41DEE985AC1F6D': 7186, // CAKE  BSC TESTNET
  '0X07BBDCD736CFC0406A3CED96B9F2289ACBCC4C76': 1975, // LINK BSC TESTNET
  '0X624BCFBB991CCEF8E790E58ED973D8E24CC66ECC': 2010, // ADA  BSC TESTNET
}
