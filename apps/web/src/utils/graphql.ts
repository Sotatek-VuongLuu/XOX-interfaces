import {
  BIT_QUERY,
  INFO_CLIENT,
  STABLESWAP_SUBGRAPH_CLIENT,
  INFO_CLIENT_ETH,
  INFO_NR_CLIENT,
  INFO_CLIENT_XOX,
  INFO_CLIENT_PANCAKE,
  INFO_NR_CLIENT_XOX,
  INFO_NR_CLIENT_PANCAKE,
  INFO_CLIENT_ETH_XOX,
  INFO_CLIENT_ETH_UNI,
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
export const infoClientXOX = new GraphQLClient(INFO_CLIENT_XOX, { headers: getGQLHeaders(INFO_CLIENT_XOX) })
export const infoClientPANCAKE = new GraphQLClient(INFO_CLIENT_PANCAKE, { headers: getGQLHeaders(INFO_CLIENT_PANCAKE) })

export const infoNRClient = new GraphQLClient(INFO_NR_CLIENT)
export const infoNRClientXOX = new GraphQLClient(INFO_NR_CLIENT_XOX)
export const infoNRClientPANCAKE = new GraphQLClient(INFO_NR_CLIENT_PANCAKE)

export const infoClientWithChain = (chainId: number) => {
  return new GraphQLClient(INFO_CLIENT_WITH_CHAIN[chainId], { headers: getGQLHeaders(INFO_CLIENT_WITH_CHAIN[chainId]) })
}

export const infoClientETH = new GraphQLClient(INFO_CLIENT_ETH)
export const infoClientETHXOX = new GraphQLClient(INFO_CLIENT_ETH_XOX)
export const infoClientETHUNI = new GraphQLClient(INFO_CLIENT_ETH_UNI)

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
