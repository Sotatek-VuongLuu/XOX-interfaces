// TODO PCS refactor ternaries
/* eslint-disable no-nested-ternary */
import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'
import truncateHash from '@pancakeswap/utils/truncateHash'
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  Box,
  Flex,
  LinkExternal,
  Skeleton,
  Text,
  Button,
} from '@pancakeswap/uikit'
import { ITEMS_PER_INFO_TABLE_PAGE } from 'config/constants/info'
import { formatDistanceToNowStrict } from 'date-fns'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useGetChainName } from 'state/info/hooks'
import { Transaction, TransactionType } from 'state/info/types'
import styled from 'styled-components'
import { getBlockExploreLink } from 'utils'

import { formatAmount } from 'utils/formatInfoNumbers'
import { Arrow, Break, ClickableColumnHeader, PageButtons, TableWrapper } from './shared'

const Wrapper = styled.div`
  width: 100%;
  grid-column: 1 / span 2;
  background: #242424;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 24px;

  & .heading {
    position: relative;
  }

  & .heading:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
  }

  .btn-filter button {
    height: 37px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    margin-right: 8px;
    padding: 10px 16px;
  }

  .btn-filter button.inactive {
    background: transparent;
    border: none;
    box-shadow: none;
  }
`

const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 35px;
  align-items: center;
  grid-template-columns: 0.15fr 1fr 1fr repeat(3, 0.7fr) 1fr 0.6fr;
  padding: 0 24px;
  @media screen and (max-width: 940px) {
    grid-template-columns: 2fr repeat(4, 1fr);
    & > *:nth-child(5) {
      display: none;
    }
  }
  @media screen and (max-width: 800px) {
    grid-template-columns: 2fr repeat(2, 1fr);
    & > *:nth-child(5) {
      display: none;
    }
    & > *:nth-child(3) {
      display: none;
    }
    & > *:nth-child(4) {
      display: none;
    }
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: 2fr 1fr;
    & > *:nth-child(5) {
      display: none;
    }
    & > *:nth-child(3) {
      display: none;
    }
    & > *:nth-child(4) {
      display: none;
    }
    & > *:nth-child(2) {
      display: none;
    }
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
      <Skeleton />
      <Skeleton />
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
      <LinkExternal
        href={getBlockExploreLink(transaction.hash, 'transaction', chainName === 'ETH' && ChainId.ETHEREUM)}
      >
        <Text>
          {transaction.type === TransactionType.MINT
            ? t('Add %token0% and %token1%', { token0: transaction.token0Symbol, token1: transaction.token1Symbol })
            : transaction.type === TransactionType.SWAP
            ? t('Swap %token0% for %token1%', { token0: inputTokenSymbol, token1: outputTokenSymbol })
            : t('Remove %token0% and %token1%', { token0: transaction.token0Symbol, token1: transaction.token1Symbol })}
        </Text>
      </LinkExternal>
      <Text>${formatAmount(transaction.amountUSD)}</Text>
      <Text>
        <Text>{`${formatAmount(abs0)} ${transaction.token0Symbol}`}</Text>
      </Text>
      <Text>
        <Text>{`${formatAmount(abs1)} ${transaction.token1Symbol}`}</Text>
      </Text>
      <LinkExternal href={getBlockExploreLink(transaction.sender, 'address', chainName === 'ETH' && ChainId.ETHEREUM)}>
        {truncateHash(transaction.sender)}
      </LinkExternal>
      <Text>{formatDistanceToNowStrict(parseInt(transaction.timestamp, 10) * 1000)}</Text>
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

  const IconSort = useMemo(() => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="17" viewBox="0 0 13 17" fill="none">
        <path d="M4.66675 2.22168V8.33279V2.22168Z" fill="#8E8E8E" />
        <path
          d="M4.66675 2.22168V8.33279"
          stroke="#8E8E8E"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 4.66667L4.66667 1L8.33333 4.66667"
          stroke="#8E8E8E"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8.33276 14.666V8.5549V14.666Z" fill="#8E8E8E" />
        <path
          d="M8.33276 14.666V8.55491"
          stroke="#8E8E8E"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.6665 12.222L8.33317 15.8887L11.9998 12.222"
          stroke="#8E8E8E"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }, [])

  return (
    <Wrapper>
      <Flex mb="16px" justifyContent="space-between">
        <Text
          className="heading"
          fontSize="20px"
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="24px"
          color="rgba(255, 255, 255, 0.87)"
          marginRight="5px"
          height="24px"
        >
          Transactions History
        </Text>
        <Flex flexDirection="column" alignItems="flex-end">
          <Flex className="btn-filter" mb="8px">
            <Button onClick={() => handleFilter(undefined)} className={undefined === txFilter ? 'active' : 'inactive'}>
              All
            </Button>
            <Button
              onClick={() => handleFilter(TransactionType.SWAP)}
              className={TransactionType.SWAP === txFilter ? 'active' : 'inactive'}
            >
              Swaps
            </Button>
            <Button
              onClick={() => handleFilter(TransactionType.MINT)}
              className={TransactionType.MINT === txFilter ? 'active' : 'inactive'}
            >
              Adds
            </Button>
            <Button
              onClick={() => handleFilter(TransactionType.BURN)}
              className={TransactionType.BURN === txFilter ? 'active' : 'inactive'}
            >
              Removes
            </Button>
          </Flex>
          <Text
            fontSize="14px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="17px"
            color="rgba(255, 255, 255, 0.6)"
            marginRight="5px"
          >
            Total: 100 transactions
          </Text>
        </Flex>
      </Flex>
      <TableWrapper>
        <ResponsiveGrid>
          <Text
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
          >
            No
          </Text>
          <Text
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
          >
            Action
          </Text>
          <ClickableColumnHeader
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
            onClick={() => handleSort(SORT_FIELD.amountUSD)}
          >
            <Flex alignItems="center">
              <span style={{ marginRight: '12px' }}>Excution Time</span> {IconSort}
            </Flex>
          </ClickableColumnHeader>
          <ClickableColumnHeader
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
            onClick={() => handleSort(SORT_FIELD.amountToken0)}
          >
            <Flex alignItems="center">
              <span style={{ marginRight: '12px' }}>Total Value</span> {IconSort}
            </Flex>
          </ClickableColumnHeader>
          <Text
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
          >
            Token Amount
          </Text>
          <Text
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
          >
            Token Amount
          </Text>
          <ClickableColumnHeader
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
            onClick={() => handleSort(SORT_FIELD.timestamp)}
          >
            <Flex alignItems="center">
              <span style={{ marginRight: '12px' }}>Stable Coin Staked</span> {IconSort}
            </Flex>
          </ClickableColumnHeader>
          <Text
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
          >
            Maker
          </Text>
        </ResponsiveGrid>
        <Break />

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
