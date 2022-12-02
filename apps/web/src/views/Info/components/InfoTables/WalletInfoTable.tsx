// TODO PCS refactor ternaries
/* eslint-disable no-nested-ternary */
import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'
import truncateHash from '@pancakeswap/utils/truncateHash'
import { ArrowBackIcon, ArrowForwardIcon, Box, Flex, LinkExternal, Radio, Skeleton, Text } from '@pancakeswap/uikit'
import { ITEMS_PER_INFO_TABLE_PAGE } from 'config/constants/info'
import { formatDistanceToNowStrict } from 'date-fns'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useGetChainName } from 'state/info/hooks'
import { Transaction, TransactionType } from 'state/info/types'
import styled from 'styled-components'
import { getBlockExploreLink } from 'utils'

import { formatAmount } from 'utils/formatInfoNumbers'
import { Arrow, Break, ClickableColumnHeader, PageButtons, TableWrapper } from './shared'
import InfoPieChart from '../InfoCharts/PieChart'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;
  grid-template-columns: 2fr 4fr;
  padding: 0 24px;
  @media screen and (max-width: 940px) {
    grid-template-columns: 2fr 4fr;
  }
`

const SORT_FIELD = {
  amountUSD: 'amountUSD',
  timestamp: 'timestamp',
  sender: 'sender',
  amountToken0: 'amountToken0',
  amountToken1: 'amountToken1',
}

const TableLoader: React.FC<React.PropsWithChildren> = () => {
  const loadingRow = (
    <ResponsiveGrid>
      <Skeleton />
      <Skeleton />
    </ResponsiveGrid>
  )
  return (
    <>
      {loadingRow}
      {loadingRow}
      {loadingRow}
    </>
  )
}

const DataRow: React.FC<React.PropsWithChildren<{ transaction: Transaction }>> = ({ transaction }) => {
  const { t } = useTranslation()
  const abs0 = Math.abs(transaction.amountToken0)
  const abs1 = Math.abs(transaction.amountToken1)
  const outputTokenSymbol = transaction.amountToken0 < 0 ? transaction.token0Symbol : transaction.token1Symbol
  const inputTokenSymbol = transaction.amountToken1 < 0 ? transaction.token0Symbol : transaction.token1Symbol
  const chainName = useGetChainName()
  return (
    <ResponsiveGrid>
      <Text>${formatAmount(transaction.amountUSD)}</Text>
      <Text>
        <Text>{`${formatAmount(abs0)} ${transaction.token0Symbol}`}</Text>
      </Text>
    </ResponsiveGrid>
  )
}

const TransactionTable: React.FC<
  React.PropsWithChildren<{
    transactions: Transaction[]
  }>
> = ({ transactions }) => {
  const [sortField, setSortField] = useState(SORT_FIELD.timestamp)
  const [sortDirection, setSortDirection] = useState<boolean>(true)

  const { t } = useTranslation()

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  const [txFilter, setTxFilter] = useState<TransactionType | undefined>(undefined)

  const sortedTransactions = useMemo(() => {
    const toBeAbsList = [SORT_FIELD.amountToken0, SORT_FIELD.amountToken1]
    return transactions
      ? transactions
          .slice()
          .sort((a, b) => {
            if (a && b) {
              const firstField = a[sortField as keyof Transaction]
              const secondField = b[sortField as keyof Transaction]
              const [first, second] = toBeAbsList.includes(sortField)
                ? [Math.abs(firstField as number), Math.abs(secondField as number)]
                : [firstField, secondField]
              return first > second ? (sortDirection ? -1 : 1) * 1 : (sortDirection ? -1 : 1) * -1
            }
            return -1
          })
          .filter((x) => {
            return txFilter === undefined || x.type === txFilter
          })
          .slice(ITEMS_PER_INFO_TABLE_PAGE * (page - 1), page * ITEMS_PER_INFO_TABLE_PAGE)
      : []
  }, [transactions, page, sortField, sortDirection, txFilter])

  // Update maxPage based on amount of items & applied filtering
  useEffect(() => {
    if (transactions) {
      const filteredTransactions = transactions.filter((tx) => {
        return txFilter === undefined || tx.type === txFilter
      })
      if (filteredTransactions.length % ITEMS_PER_INFO_TABLE_PAGE === 0) {
        setMaxPage(Math.floor(filteredTransactions.length / ITEMS_PER_INFO_TABLE_PAGE))
      } else {
        setMaxPage(Math.floor(filteredTransactions.length / ITEMS_PER_INFO_TABLE_PAGE) + 1)
      }
    }
  }, [transactions, txFilter])

  const handleFilter = useCallback(
    (newFilter: TransactionType) => {
      if (newFilter !== txFilter) {
        setTxFilter(newFilter)
        setPage(1)
      }
    },
    [txFilter],
  )

  const handleSort = useCallback(
    (newField: string) => {
      setSortField(newField)
      setSortDirection(sortField !== newField ? true : !sortDirection)
    },
    [sortDirection, sortField],
  )

  const arrow = useCallback(
    (field: string) => {
      const directionArrow = !sortDirection ? '↑' : '↓'
      return sortField === field ? directionArrow : ''
    },
    [sortDirection, sortField],
  )

  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ]

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <Wrapper>
      <TableWrapper style={{ height: '100%' }}>
        <h2>Token asset</h2>
        <div>
          <Text color="secondary" fontSize="12px">
            0x42r...fg567
          </Text>
        </div>
        <InfoPieChart data={data} colors={colors} />
        {transactions ? (
          <>
            {sortedTransactions.map((transaction, index) => {
              if (transaction) {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <Fragment key={index}>
                    <DataRow transaction={transaction} />
                    <Break />
                  </Fragment>
                )
              }
              return null
            })}
            {sortedTransactions.length === 0 ? (
              <Flex justifyContent="center">
                <Text>{t('No Transactions')}</Text>
              </Flex>
            ) : undefined}
            <PageButtons>
              <Arrow
                onClick={() => {
                  setPage(page === 1 ? page : page - 1)
                }}
              >
                <ArrowBackIcon color={page === 1 ? 'textDisabled' : 'primary'} />
              </Arrow>

              <Text>{t('Page %page% of %maxPage%', { page, maxPage })}</Text>
              <Arrow
                onClick={() => {
                  setPage(page === maxPage ? page : page + 1)
                }}
              >
                <ArrowForwardIcon color={page === maxPage ? 'textDisabled' : 'primary'} />
              </Arrow>
            </PageButtons>
          </>
        ) : (
          <>
            <TableLoader />
            {/* spacer */}
            <Box />
          </>
        )}
      </TableWrapper>
    </Wrapper>
  )
}

export default TransactionTable
