/* eslint-disable @typescript-eslint/no-unused-vars */
import { GraphQLClient, request, gql } from 'graphql-request'
import { ChainId } from '@pancakeswap/sdk'

export const endpointsSubGraphPreSale = 'https://api.studio.thegraph.com/query/43777/dev-xox-lab-subgraph/v0.0.9'

export const getSaleStats = async (chainId = ChainId.GOERLI) => {
  const response = await request(
    endpointsSubGraphPreSale,
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

export const getRaiseDailies = (from: number, to: number, chainId: ChainId) => {
  const requests = `{
    raiseDailies(where: { date_gte: ${from}, date_lte: ${to} }, orderBy: date, orderDirection: desc) {
      id,
      volumeUSD,
      date
    }
  }`
  return new GraphQLClient(endpointsSubGraphPreSale).request(requests)
}

export const getUserPreSaleInfo = async (chainId = ChainId.GOERLI) => {
  const response = await request(
    endpointsSubGraphPreSale,
    gql`
      query getInfoUserPreSale {
        userPreSaleDatas {
          id
          round
          amountInvestUSD
          amountBoughtXOX
          amountBoughtXOXS
          amountClaimXOX
        }
      }
    `,
  )
  return response
}

export const getDataTransaction = async (chainId = ChainId.GOERLI) => {
  const response = await request(
    endpointsSubGraphPreSale,
    gql`
      query getTransactionPreSales {
        transactionPreSales(first: 100, orderBy: timestamp, orderDirection: desc) {
          id
          blockNumber
          timestamp
          round
          sender
          amountInvestUSD
          amountBoughtXOX
          amountBoughtXOXS
          amountClaimedXOX
        }
      }
    `,
  )
  return response
}

export const getDataRoundStats = async (chainId = ChainId.GOERLI) => {
  const response = await request(
    endpointsSubGraphPreSale,
    gql`
      query getDataRoundStatsStatus {
        roundStats {
          id
          total_raised_usd
          xox_amount_bought
          xoxs_amount_reward
          total_investor
        }
      }
    `,
  )
  return response
}
