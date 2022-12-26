import { ChainId } from '@pancakeswap/sdk'
import { ENDPOINT_GRAPHQL_WITH_CHAIN } from 'config/constants/endpoints'
import { request, gql } from 'graphql-request'

export const getUerRank = async (chainId: ChainId) => {
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
      query getUserRanks {
        userRanks(orderBy: amount, orderDirection: desc) {
          id
          amount
        }
      }
    `,
  )

  return response
}
