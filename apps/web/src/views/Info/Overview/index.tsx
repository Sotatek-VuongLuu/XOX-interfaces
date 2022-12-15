/* eslint-disable import/order */
import { useTranslation } from '@pancakeswap/localization'
import { Flex } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useEffect, useMemo, useState } from 'react'
import { useAllTokenDataSWR, useProtocolDataSWR, useProtocolTransactionsSWR } from 'state/info/hooks'
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
  gap: 1em;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 5fr 2fr;
  } ;
`

const Overview: React.FC<React.PropsWithChildren> = () => {
  const native = useNativeCurrency()
  const [coinmarketcapSymbols, setCoinmarketcapSymbols] = useState<string | undefined>()
  const [coinGeckoId, setCoinGeckoId] = useState<string | undefined>()
  const [filter, setFilter] = useState('1D')
  const protocolData = useProtocolDataSWR()
  const [chartData, setChardData] = useState<Array<any> | undefined>()
  const [currencyDatas, setCurrencyDatas] = useState<Array<any> | undefined>()
  const transactions = useProtocolTransactionsSWR()
  const { chainId } = useActiveChainId()

  useEffect(() => {
    console.log(protocolData, 'protocolData')
  }, [protocolData])

  // const allPoolData = useAllPoolDataSWR()
  // const allPoolData = useAllPoolData()

  // const somePoolsAreLoading = useMemo(() => {
  //   return poolDatas.some((pool) => !pool?.token0Price)
  // }, [poolDatas])

  // const isStableSwap = checkIsStableSwap()
  // const chainName = useGetChainName()

  useEffect(() => {
    const symbols = SUGGESTED_BASES[chainId].concat([native]).map((token: any) => token.symbol)
    setCoinmarketcapSymbols(symbols.join(','))

    const [token] = tokens.filter((t) => t.symbol.toLowerCase() === native.symbol.toLowerCase())

    setCoinGeckoId(token?.id)
  }, [])

  useEffect(() => {
    if (!coinGeckoId) return

    axios
      .get(`https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail/chart`, {
        params: { id: 1, range: '1D' },
      })
      .then((result) => {
        // if(result.status.error_code !== 0) return;
        const points = result.data?.data?.points
        if (!points) return
        console.log(points, 'setChardData')
        const pointKeys = Object.keys(points)
        const data = pointKeys.map((key) => {
          return {
            date: key,
            priceUSD: points[key]?.v?.[0],
          }
        })
        const lastValue = points[pointKeys.length - 1]
        setChardData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [filter, coinGeckoId])

  useEffect(() => {
    if (!coinmarketcapSymbols) return

    axios
      .get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest', {
        params: { symbol: coinmarketcapSymbols },
      })
      .then((response) => {
        const data = response.data?.data
        if (!data) return

        const result = Object.keys(data).map((key) => {
          return data[key]
        })
        setCurrencyDatas(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [coinmarketcapSymbols, coinGeckoId])

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
            setCoinGeckoId={setCoinGeckoId}
            chainId={chainId}
            native={native}
          />
        </ChartCardsContainer>
        <WalletInfoTable currencyDatas={currencyDatas} native={native} />
        <TransactionTable transactions={transactions} />
      </PageContainer>
    </Page>
  )
}

export default Overview
