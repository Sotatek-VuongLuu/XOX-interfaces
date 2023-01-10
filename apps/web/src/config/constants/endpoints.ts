import { ChainId } from '@pancakeswap/sdk'

export const GRAPH_API_PROFILE = 'https://api.thegraph.com/subgraphs/name/pancakeswap/profile'
export const GRAPH_API_PREDICTION_BNB = 'https://api.thegraph.com/subgraphs/name/pancakeswap/prediction-v2'
export const GRAPH_API_PREDICTION_CAKE = 'https://api.thegraph.com/subgraphs/name/pancakeswap/prediction-cake'

export const GRAPH_API_LOTTERY = 'https://api.thegraph.com/subgraphs/name/pancakeswap/lottery'
export const SNAPSHOT_BASE_URL = process.env.NEXT_PUBLIC_SNAPSHOT_BASE_URL
export const API_PROFILE = 'https://profile.pancakeswap.com'
export const API_NFT = 'https://nft.pancakeswap.com/api/v1'
export const SNAPSHOT_API = `${SNAPSHOT_BASE_URL}/graphql`
export const SNAPSHOT_HUB_API = `${SNAPSHOT_BASE_URL}/api/message`
export const GRAPH_API_POTTERY = 'https://api.thegraph.com/subgraphs/name/pancakeswap/pottery'

/**
 * V1 will be deprecated but is still used to claim old rounds
 */
export const GRAPH_API_PREDICTION_V1 = 'https://api.thegraph.com/subgraphs/name/pancakeswap/prediction'

export const INFO_CLIENT = 'https://dev-graph-node.xoxnet.io/subgraphs/name/subgraph2'
export const INFO_CLIENT_XOX = 'https://dev-graph-node.xoxnet.io/subgraphs/name/subgraph2'
export const INFO_CLIENT_PANCAKE =
  'https://api.studio.thegraph.com/query/40341/xox-subgraph/v0.0.15'

export const INFO_NR_CLIENT = 'https://dev-graph-node.xoxnet.io/subgraphs/name/subgraph2'
export const INFO_NR_CLIENT_XOX = 'https://dev-graph-node.xoxnet.io/subgraphs/name/subgraph2'
export const INFO_NR_CLIENT_PANCAKE =
  'https://api.studio.thegraph.com/query/40341/xox-subgraph/v0.0.15'

export const INFO_CLIENT_ETH = 'https://api.studio.thegraph.com/query/40341/xox-subgraph/v0.0.15'
export const INFO_CLIENT_ETH_XOX = 'https://api.studio.thegraph.com/query/40341/xox-subgraph/v0.0.15'
export const INFO_CLIENT_ETH_UNI = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'

export const BLOCKS_CLIENT = 'https://api.thegraph.com/subgraphs/name/pancakeswap/blocks'
export const BLOCKS_CLIENT_ETH = 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks'
export const STABLESWAP_SUBGRAPH_CLIENT = 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-stableswap'
export const GRAPH_API_NFTMARKET = 'https://api.thegraph.com/subgraphs/name/pancakeswap/nft-market'
export const GRAPH_HEALTH = 'https://api.thegraph.com/index-node/graphql'

export const TC_MOBOX_SUBGRAPH = 'https://api.thegraph.com/subgraphs/name/pancakeswap/trading-competition-v3'
export const TC_MOD_SUBGRAPH = 'https://api.thegraph.com/subgraphs/name/pancakeswap/trading-competition-v4'

export const FARM_API = 'https://farms.pancake-swap.workers.dev'

export const BIT_QUERY = 'https://graphql.bitquery.io'

export const ACCESS_RISK_API = 'https://red.alert.pancakeswap.com/red-api'

export const CELER_API = 'https://api.celerscan.com/scan'

export const INFO_CLIENT_WITH_CHAIN = {
  [ChainId.BSC]: 'https://pancakeswap.nodereal.io/graphql/',
  [ChainId.ETHEREUM]: INFO_CLIENT_ETH,
}

export const BLOCKS_CLIENT_WITH_CHAIN = {
  [ChainId.BSC]: BLOCKS_CLIENT,
  [ChainId.ETHEREUM]: BLOCKS_CLIENT_ETH,
}

export const ENDPOINT_GRAPHQL_WITH_CHAIN = {
  [ChainId.BSC]: 'https://dev-graph-node.xoxnet.io/subgraphs/name/subgraph2',
  [ChainId.ETHEREUM]: 'https://api.studio.thegraph.com/query/40341/xox-subgraph/v0.0.15',
  [ChainId.BSC_TESTNET]: 'https://dev-graph-node.xoxnet.io/subgraphs/name/subgraph2',
  [ChainId.GOERLI]: 'https://api.studio.thegraph.com/query/40341/xox-subgraph/v0.0.15',
}
