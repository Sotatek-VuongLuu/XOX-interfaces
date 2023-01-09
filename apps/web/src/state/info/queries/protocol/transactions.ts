import { gql } from 'graphql-request'
import { mapBurns, mapMints, mapSwaps } from 'state/info/queries/helpers'
import { BurnResponse, MintResponse, SwapResponse } from 'state/info/queries/types'
import { Transaction, TransactionFrom } from 'state/info/types'
import { getMultiChainQueryEndPointWithStableSwap, MultiChainName } from '../../constant'

/**
 * Transactions for Transaction table on the Home page
 */
const GLOBAL_TRANSACTIONS = gql`
  query overviewTransactions {
    mints: mints(first: 100, orderBy: timestamp, orderDirection: desc) {
      id
      timestamp
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      to
      amount0
      amount1
      amountUSD
    }
    swaps: swaps(first: 100, orderBy: timestamp, orderDirection: desc) {
      id
      timestamp
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      sender
      amount0In
      amount1In
      amount0Out
      amount1Out
      amountUSD
    }
    burns: burns(first: 100, orderBy: timestamp, orderDirection: desc) {
      id
      timestamp
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      sender
      amount0
      amount1
      amountUSD
    }
  }
`

interface TransactionResults {
  mints: MintResponse[]
  swaps: SwapResponse[]
  burns: BurnResponse[]
}

const fetchTopTransactions = async (
  chainName: MultiChainName,
): Promise<{ transactionsXOX: Transaction[] | undefined; transactionsOther: Transaction[] | undefined }> => {
  try {
    const dataXOX = await getMultiChainQueryEndPointWithStableSwap(
      chainName,
      TransactionFrom.XOX,
    ).request<TransactionResults>(GLOBAL_TRANSACTIONS)
    let transactionsXOX:any
    let transactionsOther:any
    if (dataXOX) {
      const mintsXOX = dataXOX.mints.map(mapMints)
      const burnsXOX = dataXOX.burns.map(mapBurns)
      const swapsXOX = dataXOX.swaps.map(mapSwaps)

      transactionsXOX = [...mintsXOX, ...burnsXOX, ...swapsXOX].sort((a, b) => {
        return parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10)
      })
    }

    if (chainName === 'ETH') {
      const dataUNI = await getMultiChainQueryEndPointWithStableSwap(
        chainName,
        TransactionFrom.UNI,
      ).request<TransactionResults>(GLOBAL_TRANSACTIONS)

      if (dataUNI) {
        const mintsUNI = dataUNI.mints.map(mapMints)
        const burnsUNI = dataUNI.burns.map(mapBurns)
        const swapsUNI = dataUNI.swaps.map(mapSwaps)

        transactionsOther = [...swapsUNI].sort((a, b) => {
          return parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10)
        })
      }
    } else {
      const dataPANCAKE = await getMultiChainQueryEndPointWithStableSwap(
        chainName,
        TransactionFrom.PANCAKE,
      ).request<TransactionResults>(GLOBAL_TRANSACTIONS)
      if (dataPANCAKE) {
        const mintsPANCAKE = dataPANCAKE.mints.map(mapMints)
        const burnsPANCAKE = dataPANCAKE.burns.map(mapBurns)
        const swapsPANCAKE = dataPANCAKE.swaps.map(mapSwaps)

        transactionsOther = [...swapsPANCAKE].sort((a, b) => {
          return parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10)
        })
      }
    }
    return {
      transactionsXOX,
      transactionsOther
    }
  } catch {
    return {
      transactionsXOX: undefined,
      transactionsOther: undefined,
    }
  }
}

export default fetchTopTransactions
