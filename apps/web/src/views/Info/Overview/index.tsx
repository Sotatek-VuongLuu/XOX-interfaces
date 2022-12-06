/* eslint-disable import/order */
import { useTranslation } from '@pancakeswap/localization'
import { Card, Flex } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useEffect, useMemo } from 'react'
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

export const ChartCardsContainer = styled(Flex)`
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  padding: 0;
  gap: 1em;

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

  const protocolData = useProtocolDataSWR()
  const chartData = useProtocolChartDataSWR()
  const transactions = useProtocolTransactionsSWR()

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

  const allPoolData = useAllPoolDataSWR()
  // const allPoolData = useAllPoolData()
  const poolDatas = useMemo(() => {
    return Object.values(allPoolData)
      .map((pool) => pool.data)
      .filter((pool) => pool.token1.name !== 'unknown' && pool.token0.name !== 'unknown')
  }, [allPoolData])

  const somePoolsAreLoading = useMemo(() => {
    return poolDatas.some((pool) => !pool?.token0Price)
  }, [poolDatas])

  const isStableSwap = checkIsStableSwap()
  const chainName = useGetChainName()

  useEffect(()=> {
    console.log('transactions: ', transactions)
  }, [transactions])

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
          <Card>
            <HoverableChart
              chartData={chartData}
              protocolData={protocolData}
              currentDate={currentDate}
              valueProperty="volumeUSD"
              title={t('Volume 24H')}
              ChartComponent={LineChart}
            />
          </Card>
        </ChartCardsContainer>
        {/* <Heading scale="lg" mt="40px" mb="16px">
            {t('Top Tokens')}
          </Heading>
          <TokenTable tokenDatas={formattedTokens} /> */}
        {/* <Heading scale="lg" mt="40px" mb="16px">
            {t('Top Pairs')}
          </Heading>
          <PoolTable poolDatas={poolDatas} loading={somePoolsAreLoading} /> */}
        <WalletInfoTable />
        <TransactionTable transactions={transactions} />
      </PageContainer>
    </Page>
  )
}

export default Overview
