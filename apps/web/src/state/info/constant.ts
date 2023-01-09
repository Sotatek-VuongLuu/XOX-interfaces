import {
  BLOCKS_CLIENT,
  BLOCKS_CLIENT_ETH,
  INFO_CLIENT,
  INFO_CLIENT_ETH,
  INFO_NR_CLIENT,
} from 'config/constants/endpoints'
import {
  infoClient,
  infoClientETH,
  infoClientETH_UNI,
  infoClientETH_XOX,
  infoClientPANCAKE,
  infoClientXOX,
  infoNRClient,
  infoNRClientPANCAKE,
  infoNRClientXOX,
  infoStableSwapClient,
} from 'utils/graphql'

import { ChainId } from '@pancakeswap/sdk'
import {
  ETH_TOKEN_BLACKLIST,
  PCS_ETH_START,
  PCS_V2_START,
  TOKEN_BLACKLIST,
  INFO_BUCKETS_COOKIES,
} from 'config/constants/info'
import Cookies from 'js-cookie'
import { GraphQLClient } from 'graphql-request'
import { TransactionFrom } from './types'

export type MultiChainName = 'BSC' | 'ETH'

export const multiChainQueryMainToken = {
  BSC: 'BNB',
  ETH: 'ETH',
}

export const multiChainBlocksClient = {
  BSC: BLOCKS_CLIENT,
  ETH: BLOCKS_CLIENT_ETH,
}

export const multiChainStartTime = {
  BSC: PCS_V2_START,
  ETH: PCS_ETH_START,
}

export const multiChainId = {
  BSC: ChainId.BSC,
  ETH: ChainId.ETHEREUM,
}

export const multiChainPaths = {
  [ChainId.BSC]: '',
  [ChainId.ETHEREUM]: '/eth',
}

export const multiChainQueryClient = {
  BSC: infoClient,
  ETH: infoClientETH,
}

export const multiChainQueryClientWithFrom = {
  [TransactionFrom.XOX]: {
    BSC: infoClientXOX,
    ETH: infoClientETH_XOX,
  },
  [TransactionFrom.UNI]: {
    ETH: infoClientETH_UNI,
    BSC: new GraphQLClient(''),
  },
  [TransactionFrom.PANCAKE]: {
    ETH: new GraphQLClient(''),
    BSC: infoClientPANCAKE,
  },
}

export const multiChainQueryClientWithNR = {
  BSC: infoNRClient,
  ETH: infoClientETH,
}

export const multiChainQueryClientWithNRWithFrom = {
  [TransactionFrom.XOX]: {
    BSC: infoNRClientXOX,
    ETH: infoClientETH_XOX,
  },
  [TransactionFrom.UNI]: {
    ETH: infoClientETH_UNI,
    BSC: new GraphQLClient(''),
  },
  [TransactionFrom.PANCAKE]: {
    ETH: new GraphQLClient(''),
    BSC: infoNRClientPANCAKE,
  },
}

export const multiChainQueryEndPoint = {
  BSC: INFO_CLIENT,
  ETH: INFO_CLIENT_ETH,
}

export const multiChainQueryEndPointWithNR = {
  BSC: INFO_NR_CLIENT,
  ETH: INFO_CLIENT_ETH,
}

export const multiChainScan = {
  BSC: 'BscScan',
  ETH: 'EtherScan',
}

export const multiChainTokenBlackList = {
  BSC: TOKEN_BLACKLIST,
  ETH: ETH_TOKEN_BLACKLIST,
}

export const getMultiChainQueryEndPointWithStableSwap = (
  chainName: MultiChainName,
  transactionFrom?: TransactionFrom,
) => {
  const isStableSwap = checkIsStableSwap()
  const bucketInfo = Cookies.get(INFO_BUCKETS_COOKIES) // sf or nr
  if (isStableSwap) return infoStableSwapClient
  return bucketInfo === 'sf'
    ? transactionFrom
      ? multiChainQueryClientWithFrom[transactionFrom][chainName]
      : multiChainQueryClient[chainName]
    : transactionFrom
    ? multiChainQueryClientWithNRWithFrom[transactionFrom][chainName]
    : multiChainQueryClientWithNR[chainName]
}

export const checkIsStableSwap = () => window.location.href.includes('stableSwap')
