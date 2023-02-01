import { ENDPOINT_GRAPHQL_WITH_CHAIN } from 'config/constants/endpoints'
import { request, gql } from 'graphql-request'
import { ChainId } from '@pancakeswap/sdk'

export const getUserFarmingData = async (chainId: ChainId, account: string) => {
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
        query getDataFarming {
            userFarmingDatas(where: { id: "${account?.toLocaleLowerCase()}" }) {
                id,
                address,
                amount
          }
        }
      `,
  )
  return response
}
