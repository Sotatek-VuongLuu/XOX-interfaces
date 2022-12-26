import { ENDPOINT_GRAPHQL_WITH_CHAIN } from 'config/constants/endpoints'
import { GraphQLClient, request, gql } from 'graphql-request'
import { ChainId } from '@pancakeswap/sdk'

export const userPointHourDatas = (chainId: number, payload: any) => {
  const requests = `{
    userPointHourDatas(where: { date_gte: ${payload.date_gte}, date_lte: ${payload.date_lte} }){
      id,
      date,
      amount
    }
  }`

  return new GraphQLClient(ENDPOINT_GRAPHQL_WITH_CHAIN[chainId]).request(requests)
}

export const getUerRank = async (chainId: ChainId) => {
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
      query getUserRanks {
        userPoints(first: 100, skip: 0, orderBy: amount, orderDirection: desc) {
          id
          amount
        }
      }
    `,
  )

  return response
}
