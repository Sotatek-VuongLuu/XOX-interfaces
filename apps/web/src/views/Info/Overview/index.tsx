/* eslint-disable import/order */
import { useTranslation } from '@pancakeswap/localization'
import { Flex } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useEffect, useState } from 'react'
import { useProtocolDataSWR, useProtocolTransactionsSWR } from 'state/info/hooks'
import styled from 'styled-components'
import LineChart from 'views/Info/components/InfoCharts/LineChart'
import TransactionTable from 'views/Info/components/InfoTables/TransactionsTable'
import HoverableChart from '../components/InfoCharts/HoverableChart'
import WalletInfoTable from 'views/Info/components/InfoTables/WalletInfoTable'
import axios from 'axios'
import { SUGGESTED_BASES } from 'config/constants/exchange'
import { tokens } from 'tokens'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { useAllTokens } from 'hooks/Tokens'

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
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding-left: 24px;
  padding-right: 24px;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 5fr 2fr;
    padding-left: 48px;
    padding-right: 48px;
  } ;
`

const Overview: React.FC<React.PropsWithChildren> = () => {
  const native = useNativeCurrency()
  const [coinmarketcapIds, setCoinmarketcapIds] = useState<string | undefined>()
  const [coinmarketcapId, setCoinmarketcapId] = useState<number | undefined>()
  const [filter, setFilter] = useState('1D')
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

  useEffect(() => {
    console.log(allTokens, 'allTokens')
    const ids = Object.keys(allTokens).map((key: any) => {
        const token = allTokens[key]
        const [filterToken] = tokens.filter((t) => {
          return (
            t.symbol.toLowerCase() === token.symbol.toLowerCase() &&
            (t.platform ? t.platform.token_address.toLowerCase() === token.address.toLowerCase() : true)
          )
        })

        return filterToken?.id
      })
      .filter((t) => t !== undefined)
    setCoinmarketcapIds(ids.join(','))

    const [token] = tokens.filter(
      (t) =>
        t.symbol.toLowerCase() === native.symbol.toLowerCase() &&
        (t.platform ? t.platform.token_address.toLowerCase() === token.address.toLowerCase() : true),
    )
    setCoinmarketcapId(token?.id)
    // } else {
    //   const ids = SUGGESTED_BASES[chainId]
    //     .concat([native])
    //     .map((token: any) => {
    //       const [filterToken] = tokens.filter((t) => {
    //         return (
    //           t.symbol.toLowerCase() === token.symbol.toLowerCase() &&
    //           (t.platform ? t.platform.symbol.toLowerCase() === token.symbol.toLowerCase() : true)
    //         )
    //       })

    //       return filterToken?.id
    //     })
    //     .filter((t) => t != undefined)
    //   setCoinmarketcapIds(ids.join(','))

    //   const [token] = tokens.filter(
    //     (t) =>
    //       t.symbol.toLowerCase() === native.symbol.toLowerCase() &&
    //       (t.platform ? t.platform.symbol.toLowerCase() === token.symbol.toLowerCase() : true),
    //   )
    //   setCoinmarketcapId(token?.id)
    // }
  }, [allTokens])

  useEffect(() => {
    if (!coinmarketcapId) return

    axios
      .get(`${process.env.NEXT_PUBLIC_API}/coin-market-cap/data-api/v3/cryptocurrency/detail/chart`, {
        params: { id: coinmarketcapId, range: '1D' },
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
    if (!coinmarketcapIds) return

    axios
      .get(`${process.env.NEXT_PUBLIC_API}/coin-market-cap/pro/v2/cryptocurrency/quotes/latest`, {
        params: { id: coinmarketcapIds },
      })
      .then((response) => {
        const data = response.data?.data
        if (!data) return
        const result = Object.keys(data).map((key) => {
          return {
            symbol: data[key]?.symbol,
            price: data[key]?.quote?.USD?.price,
            percent_change_24h: data[key]?.quote?.USD?.percent_change_24h,
            volume_24h: data[key]?.quote?.USD?.volume_24h,
          }
        })
        setCurrencyDatas(result)
      })
      .catch((err) => {
        console.warn(err)
      })
  }, [coinmarketcapIds, coinmarketcapId])

  return (
    <Page>
      <PageContainer>
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
          />
        </ChartCardsContainer>
        <WalletInfoTable currencyDatas={currencyDatas} native={native} allTokens={allTokens} />
        <TransactionTable transactions={transactions} />
      </PageContainer>
    </Page>
  )
}

export default Overview
