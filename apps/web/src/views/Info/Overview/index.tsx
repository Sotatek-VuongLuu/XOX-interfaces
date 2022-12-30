/* eslint-disable import/order */
import { Flex } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useCallback, useEffect, useState } from 'react'
import { useProtocolTransactionsSWR } from 'state/info/hooks'
import styled from 'styled-components'
import LineChart from 'views/Info/components/InfoCharts/LineChart'
import TransactionTable from 'views/Info/components/InfoTables/TransactionsTable'
import WalletInfoTable from 'views/Info/components/InfoTables/WalletInfoTable'
import axios from 'axios'
import { SUGGESTED_BASES_ID } from 'config/constants/exchange'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { useAllTokens } from 'hooks/Tokens'
import HoverableChart from '../components/InfoCharts/HoverableChart'
import InfoNav from '../components/InfoNav'

export const ChartCardsContainer = styled(Flex)`
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  padding: 0;
  background: #242424;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  border-radius: 10px;

  & > * {
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  } ;
`

export const PageContainer = styled(Flex)`
  display: flex;
  flex-direction: column;
  padding: 24px;

  & > div {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 48px;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    padding: 48px;
    & > div {
      flex-direction: row;
    }
  }
`

const Overview: React.FC<React.PropsWithChildren> = () => {
  const native = useNativeCurrency()
  const [coinmarketcapIds, setCoinmarketcapIds] = useState<any>()
  const [coinmarketcapId, setCoinmarketcapId] = useState<number | undefined>()
  const [filter, setFilter] = useState('ALL')
  const [chartData, setChardData] = useState<Array<any> | undefined>()
  const [currencyDatas, setCurrencyDatas] = useState<Array<any> | undefined>()
  const transactions = useProtocolTransactionsSWR()
  const { chainId } = useActiveChainId()
  const allTokens = useAllTokens()

  // const allPoolData = useAllPoolDataSWR()
  // const allPoolData = useAllPoolData()

  // const somePoolsAreLoading = useMemo(() => {
  //   return poolDatas.some((pool) => !pool?.token0Price)
  // }, [poolDatas])

  // const isStableSwap = checkIsStableSwap()
  // const chainName = useGetChainName()

  const loadChartData = useCallback(() => {
    if (!coinmarketcapIds || Object.keys(coinmarketcapIds).length === 0) return

    const tempIds = Object.values(coinmarketcapIds)
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/coin-market-cap/pro/v2/cryptocurrency/quotes/latest`, {
        params: {
          id: tempIds.filter((id, index) => tempIds.indexOf(id) === index).join(','),
        },
      })
      .then((response) => {
        const data = response.data?.data
        if (!data) return
        const result = Object.keys(data).map((key) => {
          return {
            id: data[key]?.id,
            symbol: data[key]?.symbol,
            price: data[key]?.quote?.USD?.price,
            percent_change_24h: data[key]?.quote?.USD?.percent_change_24h,
            volume_24h: data[key]?.quote?.USD?.volume_24h,
            market_cap: data[key]?.quote?.USD?.market_cap,
          }
        })
        setCurrencyDatas(result)
      })
      .catch((err) => {
        console.warn(err)
      })
  }, [coinmarketcapIds])

  useEffect(() => {
    const _tokenList = JSON.parse(localStorage.getItem('coinmarketcapIds')) || SUGGESTED_BASES_ID
    const tokenListNotHaveIds = Object.keys(allTokens)
      .map((key: any) => {
        const token = allTokens[key]
        const { address } = token
        if (token.symbol.toUpperCase() === native.symbol.toUpperCase() || _tokenList[address.toUpperCase()]) {
          return undefined
        }
        return token
      })
      .filter((e) => e !== undefined)
    Promise.all(
      tokenListNotHaveIds.map(async (token: any) => {
        return axios
          .get(`${process.env.NEXT_PUBLIC_API}/coin-market-cap/pro/v2/cryptocurrency/info`, {
            params: { address: token.address.toUpperCase() },
          })
          .then((response) => {
            const tokenInfos = response.data.data
            const tokenInfo = Object.keys(tokenInfos).map((key) => tokenInfos[key])?.[0]
            const res = {}
            res[token.address.toUpperCase()] = tokenInfo.id
            return res
          })
          .catch(() => {
            return {}
          })
      }),
    ).then((values) => {
      let tokenIds = { ..._tokenList }
      values.forEach((value) => {
        tokenIds = { ...tokenIds, ...value }
      })
      setCoinmarketcapIds(tokenIds)
    })
  }, [allTokens])

  useEffect(() => {
    if (!coinmarketcapId) return

    axios
      .get(`${process.env.NEXT_PUBLIC_API}/coin-market-cap/data-api/v3/cryptocurrency/detail/chart`, {
        params: { id: coinmarketcapId, range: filter },
      })
      .then((result) => {
        // if(result.status.error_code !== 0) return;
        const points = result.data?.data?.points
        if (!points) return
        const pointKeys = Object.keys(points)
        const data = pointKeys.map((key) => {
          return {
            date: key,
            priceUSD: points[key]?.v?.[0],
          }
        })
        setChardData(data)
      })
      .catch((err) => {
        console.warn(err)
      })
  }, [filter, coinmarketcapId])

  useEffect(() => {
    if (!coinmarketcapIds || Object.keys(coinmarketcapIds).length === 0) return
    localStorage.setItem('coinmarketcapIds', JSON.stringify(coinmarketcapIds))
    loadChartData()
  }, [coinmarketcapIds, coinmarketcapId])

  useEffect(() => {
    const id = setInterval(loadChartData, 10000)

    // eslint-disable-next-line consistent-return
    return () => clearInterval(id)
  }, [currencyDatas])

  return (
    <Page>
      <InfoNav allTokens={allTokens} />
      <PageContainer>
        <div>
          <ChartCardsContainer>
            <HoverableChart
              chartData={chartData}
              valueProperty="priceUSD"
              ChartComponent={LineChart}
              filter={filter}
              setFilter={setFilter}
              currencyDatas={currencyDatas}
              setCoinmarketcapId={setCoinmarketcapId}
              chainId={chainId}
              native={native}
              allTokens={allTokens}
            />
          </ChartCardsContainer>
          <WalletInfoTable currencyDatas={currencyDatas} native={native} allTokens={allTokens} />
        </div>
        <div>
          <TransactionTable transactions={transactions} />
        </div>
      </PageContainer>
    </Page>
  )
}

export default Overview
