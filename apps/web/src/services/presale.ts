import { ENDPOINT_GRAPHQL_WITH_CHAIN } from 'config/constants/endpoints'
import { GraphQLClient, request, gql } from 'graphql-request'
import { ChainId } from '@pancakeswap/sdk'

export const getSaleStats = async (chainId = ChainId.GOERLI) => {
  const response = await request(
    'https://api.studio.thegraph.com/query/43777/dev-xox-lab-subgraph/v0.0.7',
    gql`
      query getStatsSale {
        saleStats {
          id
          total_raised_usd
          xox_amount_bought
          total_investor
          xoxs_amount_reward
        }
      }
    `,
  )

  return response
}
