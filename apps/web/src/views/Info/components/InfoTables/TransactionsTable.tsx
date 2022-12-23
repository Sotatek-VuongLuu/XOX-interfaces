// TODO PCS refactor ternaries
/* eslint-disable no-nested-ternary */
import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'
import truncateHash from '@pancakeswap/utils/truncateHash'
import { Box, Flex, LinkExternal, Skeleton, Text, Button, Link, Select, Input } from '@pancakeswap/uikit'
import { formatISO9075 } from 'date-fns'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useGetChainName } from 'state/info/hooks'
import { Transaction, TransactionType } from 'state/info/types'
import styled from 'styled-components'
import { getBlockExploreLink } from 'utils'
import { formatAmount } from 'utils/formatInfoNumbers'
import { Arrow, Break, ClickableColumnHeader } from './shared'

const Wrapper = styled.div`
  width: 100%;
  grid-column: 1;
  background: #242424;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 18px;
  margin-bottom: 50px;

  & > div {
    max-width: calc(100vw - 96px);
  }

  & > div:first-child {
    display: flex;
    flex-direction: column;

    & > div {
      align-items: flex-start;
    }

    & > div:first-child {
      margin-bottom: 28px;
    }
  }

  & .heading {
    position: relative;
  }

  & .heading:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 4px;
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

  ${({ theme }) => theme.mediaQueries.md} {
    grid-column: 1 / span 2;
    padding: 24px;

    .btn-filter button {
      margin-right: 0;
      margin-left: 8px;
    }

    & > div:first-child {
      display: flex;
      flex-direction: row;

      & > div {
        align-items: flex-end;
      }

      & > div:first-child {
        margin-bottom: 28px;
      }
    }
  }
`

const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 35px;
  align-items: center;
  grid-template-columns: 0.15fr 1fr 1fr repeat(3, 0.7fr) 0.8fr 0.4fr;
  @media screen and (max-width: 940px) {
    grid-template-columns: 0.15fr 1fr 1fr repeat(3, 0.7fr) 0.8fr 0.4fr;
  }
  @media screen and (max-width: 800px) {
    grid-template-columns: 0.15fr 1fr 1fr repeat(3, 0.7fr) 0.8fr 0.4fr;
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: 0.15fr 1fr 1fr repeat(3, 0.7fr) 0.8fr 0.4fr;
  }
`

export const CustomTableWrapper = styled(Flex)`
  width: calc(100vw - 96px);
  padding-top: 24px;
  flex-direction: column;
  gap: 24px;
  overflow: hidden;

  &:hover {
    overflow-x: auto;
  }

  & > div {
    min-width: 1200px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: calc(100vw - 144px);
  }
`

export const PageButtons = styled(Flex)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: flex-start;
  }

  & .page {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);
    width: 37px;
    height: 37px;
    border: none;
    outline: none;
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
  }

  & .page.current {
    color: #9072ff;
    background: rgba(110, 70, 255, 0.1);
  }

  & div[class*='Select__DropDownContainer'] {
    width: 132px;
    height: 37px;
    background: transparent;
  }

  & div[class*='Select__DropDownHeader'] {
    height: 37px;
    border-radius: 4px;
    border: 1px solid #444444;
    background: transparent;

    & > div {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: rgba(255, 255, 255, 0.87);
    }
  }

  & div[class*='Select__DropDownListContainer'] {
    bottom: 100%;
    border-radius: 0;
    z-index: 10000;
  }

  & li[class*='Select__ListItem'] > div {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);
  }

  & li[class*='Select__ListItem']:hover {
    background-color: #9072ff;
  }

  & .go-page {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);
    min-width: 74px;
    padding: 0 10px;
  }

  & input {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);
    width: 70px;
    height: 37px;
    border: 1px solid #444444;
    border-radius: 4px;
    background: transparent;
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

const DataRow: React.FC<
  React.PropsWithChildren<{ transaction: Transaction; index: number; page: number; perPage: number }>
> = ({ transaction, index, page, perPage }) => {
  const { t } = useTranslation()
  const abs0 = Math.abs(transaction.amountToken0)
  const abs1 = Math.abs(transaction.amountToken1)
  const outputTokenSymbol = transaction.amountToken0 < 0 ? transaction.token0Symbol : transaction.token1Symbol
  const inputTokenSymbol = transaction.amountToken1 < 0 ? transaction.token0Symbol : transaction.token1Symbol
  const chainName = useGetChainName()
  return (
    <ResponsiveGrid>
      <Text
        fontSize="16px"
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="19px"
        color="rgba(255, 255, 255, 0.87)"
      >
        {index + 1 + (page - 1) * perPage}
      </Text>
      <LinkExternal
        color="#9072FF"
        href={getBlockExploreLink(transaction.hash, 'transaction', chainName === 'ETH' && ChainId.ETHEREUM)}
      >
        <Text
          fontSize="16px"
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="19px"
          color="rgba(255, 255, 255, 0.87)"
        >
          {transaction.type === TransactionType.MINT
            ? t('Add %token0% and %token1%', { token0: transaction.token0Symbol, token1: transaction.token1Symbol })
            : transaction.type === TransactionType.SWAP
            ? t('Swap %token0% for %token1%', { token0: inputTokenSymbol, token1: outputTokenSymbol })
            : t('Remove %token0% and %token1%', { token0: transaction.token0Symbol, token1: transaction.token1Symbol })}
        </Text>
      </LinkExternal>
      <Text
        fontSize="16px"
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="19px"
        color="rgba(255, 255, 255, 0.87)"
      >
        {formatISO9075(parseInt(transaction.timestamp, 10) * 1000)}
      </Text>
      <Text
        fontSize="16px"
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="19px"
        color="rgba(255, 255, 255, 0.87)"
      >
        ${formatAmount(transaction.amountUSD)}
      </Text>
      <Text
        fontSize="16px"
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="19px"
        color="rgba(255, 255, 255, 0.87)"
      >{`${formatAmount(abs0)} ${transaction.token0Symbol}`}</Text>
      <Text
        fontSize="16px"
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="19px"
        color="rgba(255, 255, 255, 0.87)"
      >{`${formatAmount(abs1)} ${transaction.token1Symbol}`}</Text>
      <Text
        fontSize="16px"
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="19px"
        color="rgba(255, 255, 255, 0.87)"
      >{`${formatAmount(abs1)} Stable coin`}</Text>
      <Link
        width="100%"
        fontSize="16px"
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="19px"
        color="#3D8AFF"
        style={{ justifySelf: 'right' }}
        href={getBlockExploreLink(transaction.sender, 'address', chainName === 'ETH' && ChainId.ETHEREUM)}
      >
        {truncateHash(transaction.sender, 4, 5)}
      </Link>
    </ResponsiveGrid>
  )
}

const TransactionsTable: React.FC<
  React.PropsWithChildren<{
    transactions: Transaction[]
  }>
> = ({ transactions }) => {
  const [sortField, setSortField] = useState(SORT_FIELD.timestamp)
  const [sortDirection, setSortDirection] = useState<boolean>(true)
  const [perPage, setPerPage] = useState(10)
  const [tempPage, setTempPage] = useState('1')

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
          .slice(perPage * (page - 1), page * perPage)
      : []
  }, [transactions, page, sortField, sortDirection, txFilter, perPage])

  // Update maxPage based on amount of items & applied filtering
  useEffect(() => {
    if (transactions) {
      const filteredTransactions = transactions
        .filter((tx) => {
          return txFilter === undefined || tx.type === txFilter
        })
        .slice(0, 100)
      if (filteredTransactions.length % perPage === 0) {
        setMaxPage(Math.floor(filteredTransactions.length / perPage))
      } else {
        setMaxPage(Math.floor(filteredTransactions.length / perPage) + 1)
      }
    }
  }, [transactions, txFilter, perPage])

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

  const setPagePagination = useCallback(
    (p: number) => {
      if (p < 1) {
        setPage(1)
        return
      }
      if (p > maxPage) {
        setPage(maxPage)
        return
      }
      setPage(p)
    },
    [maxPage],
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

  useEffect(() => {
    setTempPage(page.toString())
  }, [page])

  useEffect(() => {
    setPage(1)
  }, [perPage])

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
          >
            Total: 100 transactions
          </Text>
        </Flex>
      </Flex>
      <CustomTableWrapper>
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
            style={{ justifySelf: 'right' }}
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
                    <DataRow transaction={transaction} index={index} page={page} perPage={perPage} />
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
                  setPagePagination(page === 1 ? page : page - 1)
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11" viewBox="0 0 7 11" fill="none">
                  <path
                    d="M5.97949 1.25L1.72949 5.5L5.97949 9.75"
                    stroke={page === 1 ? 'white' : '#9072FF'}
                    strokeOpacity={page === 1 ? '0.38' : '1'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Arrow>

              <Flex>
                {maxPage <= 7 ? (
                  [...Array(maxPage)].map((_, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setPagePagination(i + 1)}
                      className={`page ${page === i + 1 ? 'current' : ''}`}
                    >
                      {i + 1}
                    </button>
                  ))
                ) : (
                  <>
                    {page - 2 <= 1 ? (
                      [...Array(page - 1)].map((_, i) => (
                        <button type="button" key={i} onClick={() => setPagePagination(i + 1)} className="page">
                          {i + 1}
                        </button>
                      ))
                    ) : (
                      <>
                        <button type="button" className="page" onClick={() => setPagePagination(1)}>
                          1
                        </button>
                        <button type="button" className="page" onClick={() => setPagePagination(page - 3)}>
                          ...
                        </button>
                        <button type="button" className="page" onClick={() => setPagePagination(page - 2)}>
                          {page - 2}
                        </button>
                        <button type="button" className="page" onClick={() => setPagePagination(page - 1)}>
                          {page - 1}
                        </button>
                      </>
                    )}
                    <button type="button" className="page current">
                      {page}
                    </button>
                    {page + 2 >= maxPage - 1 ? (
                      [...Array(maxPage - page)].map((_, i) => (
                        <button type="button" key={i} className="page" onClick={() => setPagePagination(page + i + 1)}>
                          {page + i + 1}
                        </button>
                      ))
                    ) : (
                      <>
                        <button type="button" className="page" onClick={() => setPagePagination(page + 1)}>
                          {page + 1}
                        </button>
                        <button type="button" className="page" onClick={() => setPagePagination(page + 2)}>
                          {page + 2}
                        </button>
                        <button type="button" className="page" onClick={() => setPagePagination(page + 3)}>
                          ...
                        </button>
                        <button type="button" className="page" onClick={() => setPagePagination(maxPage)}>
                          {maxPage}
                        </button>
                      </>
                    )}
                  </>
                )}
              </Flex>

              <Arrow
                onClick={() => {
                  setPagePagination(page === maxPage ? page : page + 1)
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11" viewBox="0 0 7 11" fill="none">
                  <path
                    d="M1.72949 1.25L5.97949 5.5L1.72949 9.75"
                    stroke={page === maxPage ? 'white' : '#9072FF'}
                    strokeOpacity={page === maxPage ? '0.38' : '1'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Arrow>
              <Select
                options={[
                  {
                    value: 10,
                    label: '10/Page',
                  },
                  {
                    value: 20,
                    label: '20/Page',
                  },
                  {
                    value: 50,
                    label: '50/Page',
                  },
                  {
                    value: 100,
                    label: '100/Page',
                  },
                ]}
                onOptionChange={(option: any) => setPerPage(option.value)}
                className="select-page"
              />
              <Text className="go-page">Go to page</Text>
              <Input
                value={tempPage}
                onChange={(e) => setTempPage(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    const p = parseInt(tempPage) || 1
                    if (p >= maxPage) {
                      setPagePagination(maxPage)
                      setTempPage(maxPage.toString())
                    } else {
                      setPagePagination(p)
                    }
                  }
                }}
              />
            </PageButtons>
          </>
        ) : (
          <>
            <TableLoader />
            {/* spacer */}
            <Box />
          </>
        )}
      </CustomTableWrapper>
    </Wrapper>
  )
}

export default TransactionsTable
