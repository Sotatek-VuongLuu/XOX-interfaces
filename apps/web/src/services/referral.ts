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

export const getUserFriend = async (chainId: ChainId, account: string) => {
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
      query getUserFriends {
        userInfos(where: { id: "${account?.toLocaleLowerCase()}" }) {
          id
          total_amount
          total_claimed_amount
          rank {
            amount
          }
          friends {
            ref_address
            amount
          }
        }
      }
    `,
  )
  return response
}

export const getUserPointDaily = async (chainId: ChainId, payload?: any) => {
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
      {
        userPointDailies(where: {date_gte: ${payload.date_gte}, date_lte: ${payload.date_lte} },orderDirection: desc) {
          id
          address
          amount
          date
        }
      }
    `,
  )
  return response
}

export const getUserPointMonthly = async (chainId: ChainId, payload?: any) => {
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
      {
        userPointMonthlies(where: { date_gte: ${payload.date_gte}, date_lte: ${payload.date_lte}},orderDirection: desc) {
          id
          address
          amount
          date
        }
      }
    `,
  )
  return response
}

export const getUserPointWeekly = async (chainId: ChainId, payload?: any) => {
  const response = await request(
    ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
    gql`
      {
        userPointWeeklies(where: { date_gte: ${payload.date_gte}, date_lte: ${payload.date_lte} }, orderDirection: desc) {
          id
          address
          amount
          date
        }
      }
    `,
  )
  return response
}
