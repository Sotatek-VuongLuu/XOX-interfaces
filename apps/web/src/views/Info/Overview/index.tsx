/* eslint-disable import/order */
import { useTranslation } from '@pancakeswap/localization'
import { Card, Flex } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useEffect, useMemo, useState } from 'react'
import { checkIsStableSwap } from 'state/info/constant'
import {
  useAllPoolDataSWR,
  useAllTokenDataSWR,
  useGetChainName,
  useProtocolChartDataSWR,
  useProtocolDataSWR,
  useProtocolTransactionsSWR,
} from 'state/info/hooks'
import styled from 'styled-components'
// import BarChart from 'views/Info/components/InfoCharts/BarChart'
import LineChart from 'views/Info/components/InfoCharts/LineChart'
// import PoolTable from 'views/Info/components/InfoTables/PoolsTable'
// import TokenTable from 'views/Info/components/InfoTables/TokensTable'
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
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const native = useNativeCurrency()
  const [coinGeckoIds, setCoinGeckoIds] = useState<string | undefined>()
  const [coinGeckoId, setCoinGeckoId] = useState<string | undefined>()
  const [filter, setFilter] = useState<any>({ days: 1 })
  const protocolData = useProtocolDataSWR()
  const [chartData, setChardData] = useState<Array<any> | undefined>()
  const [currencyDatas, setCurrencyDatas] = useState<Array<any> | undefined>()
  const transactions = useProtocolTransactionsSWR()
  const { chainId } = useActiveChainId()

  const currentDate = useMemo(
    () => new Date().toLocaleString(locale, { month: 'short', year: 'numeric', day: 'numeric' }),
    [locale],
  )

  const allTokens = useAllTokenDataSWR()

  const formattedTokens = useMemo(() => {
    return Object.values(allTokens)
      .map((token) => token.data)
      .filter((token) => token.name !== 'unknown')
  }, [allTokens])

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
    const ids = SUGGESTED_BASES[chainId]
      .concat([native])
      .map((token: any) => {
        const [t] = tokens.filter((t) => t.symbol.toLowerCase() === token?.symbol?.toLowerCase())

        return t?.id
      })
      .filter((e: any) => e !== undefined)

    setCoinGeckoIds(ids.join(','))

    const [token] = tokens.filter((t) => t.symbol.toLowerCase() === native.symbol.toLowerCase())

    setCoinGeckoId(token?.id)
  }, [])

  useEffect(() => {
    if (!coinGeckoId) return
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coinGeckoId}/market_chart`, {
        params: { vs_currency: 'usd', days: filter.days },
      })
      .then((result) => {
        const data = result.data.prices.map((d) => {
          return {
            date: d[0],
            priceUSD: d[1],
          }
        })
        setChardData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [filter, coinGeckoId])

  useEffect(() => {
    if (!coinGeckoIds) return
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets', { params: { vs_currency: 'usd', ids: coinGeckoIds } })
      .then((result) => {
        setCurrencyDatas(result.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [coinGeckoIds])

  return (
    <Page>
      <PageContainer>
        {/* {chainName === 'BSC' && !isStableSwap && (
            <Message variant="warning" mb="10px">
              <MessageText fontSize={16}>
                {t('PancakeSwap Info is currently under maintenance. Data may not be accurate or up-to-date.')}
              </MessageText>
            </Message>
          )} */}
        {/* <Heading scale="lg" mb="16px" id="info-overview-title">
            {t('PancakeSwap Info & Analytics')}
          </Heading> */}
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
        {/* <Heading scale="lg" mt="40px" mb="16px">
            {t('Top Tokens')}
          </Heading>
          <TokenTable tokenDatas={formattedTokens} /> */}
        {/* <Heading scale="lg" mt="40px" mb="16px">
            {t('Top Pairs')}
          </Heading>
          <PoolTable poolDatas={poolDatas} loading={somePoolsAreLoading} /> */}
        <WalletInfoTable currencyDatas={currencyDatas} native={native} />
        <TransactionTable transactions={transactions} />
      </PageContainer>
    </Page>
  )
}

export default Overview
