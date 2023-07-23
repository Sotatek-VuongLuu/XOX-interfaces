import { request, gql } from 'graphql-request'
import { ChainId } from '@pancakeswap/sdk'
import { ENDPOINT_GRAPHQL_WITH_CHAIN } from 'config/constants/endpoints'

export const getTransactionVestingSalesOfUser = async (account: string, chainId = ChainId.GOERLI) => {
    const response = await request(
      ENDPOINT_GRAPHQL_WITH_CHAIN[chainId],
      gql`
        query getTransactionVestingSalesOfUser {
          transactionSeedPartnerSales (where: {sender: "${account?.toLowerCase()}"},first: 100, orderBy: timestamp) {
            id
            blockNumber
            timestamp
            amountBonusXOXS
            amountClaimedXOX
          }
        }
      `,
    )
    return response
}