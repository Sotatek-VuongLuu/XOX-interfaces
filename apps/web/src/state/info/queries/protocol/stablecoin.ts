import { gql } from 'graphql-request'
import { mapBurns, mapMints, mapSwaps, mapSwapsUNI, mapSwapsXOX, mapStablecoinXOX } from 'state/info/queries/helpers'
import { BurnResponse, MintResponse, SwapResponse, SwapResponseUNI } from 'state/info/queries/types'
import { Transaction, TransactionFrom } from 'state/info/types'

import axios from 'axios'
import { ChainId } from '@pancakeswap/sdk'
import {
  getMultiChainQueryEndPointWithChainId,
  getMultiChainQueryEndPointWithStableSwap,
  MultiChainName,
  multiChainQueryClientWithNR
} from '../../constant'

const QUERYTRANSACTION = `
  query overviewTransactions {
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
      from
      amount0In
      amount1In
      amount0Out
      amount1Out
      amountUSD
    }
  }
`

const QUERYWITHDRAW = (address?:string) => `
  {
    userWithdrawHistories(first: 100, orderBy: date, orderDirection: desc ${!address ? '' : `, where: { address:"${address}" }`}) {
      address,
      amount,
      date,
      id 
    }
  }
`

const QUERYSTACK = (address?:string) => `
  {
    userStakeHistories(first: 100, orderBy: date, orderDirection: desc ${!address ? '' : `, where: { address:"${address}" }`}) {
      address,
      amount,
      apy,
      date,
      id
    }
  }
`
const QUERYTOP = (address:string) => {
  return `
  {
    userInfo(id: "${address?.toLocaleLowerCase()}") {
      id,
      total_withdraw_earning
    }
  }
  `
} 

const fetchTopStableCoin = async (
  address: string,
): Promise<{ infoBUSD: any; infoUSDC: any }> => {
  const result = {infoBUSD: null,infoUSDC: null}
  await Promise.all([multiChainQueryClientWithNR.BSC.request<any>(QUERYTOP(address)), multiChainQueryClientWithNR.ETH.request<any>(QUERYTOP(address))]).then(([res1, res2]) => {
    result.infoBUSD = res1;
    result.infoUSDC = res2;
  }).catch(error => {
    console.log(error);
  })
  return result
}

export const fetchTransactionStableCoin = async (
  chainId: number,
) => {
  const result = { transactionsXOX: [] }
  const chainName = (chainId === ChainId.BSC || chainId === ChainId.BSC_TESTNET) ? 'BSC' : 'ETH';
  const dataXOX = await multiChainQueryClientWithNR[chainName].request<any>(QUERYTRANSACTION);
  if (dataXOX) {
    const swapsXOX = dataXOX.swaps.map(mapSwapsXOX)
    result.transactionsXOX = [ ...swapsXOX].sort((a, b) => {
      return parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10)
    })
  }
  return result;
}

export const fetchWithdrawStableCoin = async (
  chainId: number,
  address?: string
) => {
  const result = { transactionsXOX: [] }
  const chainName = (chainId === ChainId.BSC || chainId === ChainId.BSC_TESTNET) ? 'BSC' : 'ETH';
  const dataXOX = await multiChainQueryClientWithNR[chainName].request<any>(QUERYWITHDRAW(address));
  if (dataXOX) {
    result.transactionsXOX = dataXOX?.userWithdrawHistories?.map(item => {
      return {
        ...item,
        hash: item.id.split('-')[0],
      }
    })
  }
  return result;
}

export const fetchStakeStableCoin = async (
  chainId: number,
  address?: string
) => {
  const result = { transactionsXOX: [] }
  const chainName = (chainId === ChainId.BSC || chainId === ChainId.BSC_TESTNET) ? 'BSC' : 'ETH';
  const dataXOX = await multiChainQueryClientWithNR[chainName].request<any>(QUERYSTACK(address));
  if (dataXOX) {
    result.transactionsXOX = dataXOX?.userStakeHistories?.map(item => {
      return {
        ...item,
        hash: item.id.split('-')[0],
      }
    })
  }
  return result;
}

export default fetchTopStableCoin
