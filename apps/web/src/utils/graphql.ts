import {
  BIT_QUERY,
  INFO_CLIENT,
  STABLESWAP_SUBGRAPH_CLIENT,
  INFO_CLIENT_ETH,
  INFO_NR_CLIENT,
  INFO_CLIENT_XOX_BSC,
  INFO_CLIENT_XOX_BSC_TESTNET,
  INFO_NR_CLIENT_XOX_BSC,
  INFO_NR_CLIENT_XOX_BSC_TESTNET,
  INFO_CLIENT_XOX_ETH,
  INFO_CLIENT_XOX_GOERLI,
  INFO_CLIENT_UNI,
  ENDPOINT_GRAPHQL_STABLE_COIN,
  ENDPOINT_GRAPHQL_WITH_CHAIN
} from 'config/constants/endpoints'
import { GraphQLClient } from 'graphql-request'
import { INFO_CLIENT_WITH_CHAIN } from '../config/constants/endpoints'

// Extra headers
// Mostly for dev environment
// No production env check since production preview might also need them
export const getGQLHeaders = (endpoint: string) => {
  if (endpoint === INFO_CLIENT) {
    return {
      'X-Sf':
        process.env.NEXT_PUBLIC_SF_HEADER ||
        // hack for inject CI secret on window
        (typeof window !== 'undefined' &&
          // @ts-ignore
          window.sfHeader),
    }
  }
  return undefined
}

export const infoClient = new GraphQLClient(INFO_CLIENT, { headers: getGQLHeaders(INFO_CLIENT) })
export const infoClientXoxBsc = new GraphQLClient(INFO_CLIENT_XOX_BSC, { headers: getGQLHeaders(INFO_CLIENT_XOX_BSC) })
export const infoClientXoxBscTestnet = new GraphQLClient(INFO_CLIENT_XOX_BSC_TESTNET, {
  headers: getGQLHeaders(INFO_CLIENT_XOX_BSC_TESTNET),
})


export const infoNRClient = new GraphQLClient(INFO_NR_CLIENT)
export const infoNRClientXoxBsc = new GraphQLClient(INFO_NR_CLIENT_XOX_BSC)
export const infoNRClientXoxBscTestnet = new GraphQLClient(INFO_NR_CLIENT_XOX_BSC_TESTNET)

export const infoClientWithChain = (chainId: number) => {
  return new GraphQLClient(INFO_CLIENT_WITH_CHAIN[chainId], { headers: getGQLHeaders(INFO_CLIENT_WITH_CHAIN[chainId]) })
}

export const infoClientETH = new GraphQLClient(INFO_CLIENT_ETH)
export const infoClientXoxEth = new GraphQLClient(INFO_CLIENT_XOX_ETH)
export const infoClientXoxGoerli = new GraphQLClient(INFO_CLIENT_XOX_GOERLI)
export const infoClientETHUNI = new GraphQLClient(INFO_CLIENT_UNI)

export const stableCoinClientWithChain = (chainId: number) => {
  return new GraphQLClient(ENDPOINT_GRAPHQL_WITH_CHAIN[chainId])
}

export const stableCoinClient = new GraphQLClient(ENDPOINT_GRAPHQL_STABLE_COIN)
export const stableCoinClientBSCTestNet = new GraphQLClient(ENDPOINT_GRAPHQL_STABLE_COIN)
export const stableCoinClientGoerli = new GraphQLClient(INFO_CLIENT_ETH)
export const stableCoinClientEth = new GraphQLClient(INFO_CLIENT_ETH)

export const infoStableSwapClient = new GraphQLClient(STABLESWAP_SUBGRAPH_CLIENT)

export const infoServerClient = new GraphQLClient(INFO_CLIENT, {
  headers: {
    'X-Sf': process.env.SF_HEADER,
  },
  timeout: 5000,
})

export const stableSwapClient = new GraphQLClient(STABLESWAP_SUBGRAPH_CLIENT, {
  headers: getGQLHeaders(STABLESWAP_SUBGRAPH_CLIENT),
})

export const bitQueryServerClient = new GraphQLClient(BIT_QUERY, {
  headers: {
    // only server, no `NEXT_PUBLIC` not going to expose in client
    'X-API-KEY': process.env.BIT_QUERY_HEADER,
  },
  timeout: 5000,
})
