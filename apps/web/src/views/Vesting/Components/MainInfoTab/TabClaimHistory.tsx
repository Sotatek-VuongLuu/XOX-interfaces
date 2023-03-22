import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'
import { Box, Flex, Input, LinkExternal, Select, Text } from '@pancakeswap/uikit'
import truncateHash from '@pancakeswap/utils/truncateHash'
import BigNumber from 'bignumber.js'
import TableLoader from 'components/TableLoader'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import moment from 'moment'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import styled from 'styled-components'
import { linkTransaction } from 'views/BridgeToken'
import { Arrow } from 'views/Info/components/InfoTables/shared'
import { ClickableColumnHeader, CustomTableWrapper, NoTransactionWrapper, PageButtons, Table } from './SaleHistory'

const CustomTable = styled(Table)`
  grid-template-columns: 0.15fr 1fr 1fr repeat(2, 0.7fr) 1fr;
`

const DataRow: React.FC<
  React.PropsWithChildren<{
    transaction: any
    index: number
    page: number
    perPage: number
  }>
> = ({ transaction, index, page, perPage }) => {
  return (
    <>
      <Text
        fontSize={['14px', , '16px']}
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        lineHeight={['17px', , '19px']}
        color="rgba(255, 255, 255, 0.87)"
      >
        {index + 1 + (page - 1) * perPage}
      </Text>

      <Text
        fontSize={['14px', , '16px']}
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        lineHeight={['17px', , '19px']}
        color="rgba(255, 255, 255, 0.87)"
      >
        {moment.unix(transaction?.timestamp).format('DD/MM/YYYY HH:mm:ss')}
      </Text>
      <Text
        fontSize={['14px', , '16px']}
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        lineHeight={['17px', , '19px']}
        color="rgba(255, 255, 255, 0.87)"
      >
        {new BigNumber(transaction.amountClaimedXOX).div(10 ** 18).toString()}
      </Text>
      <Text
        fontSize={['14px', , '16px']}
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        lineHeight={['17px', , '19px']}
        color="rgba(255, 255, 255, 0.87)"
      >
        {new BigNumber(transaction.amountBoughtXOX).div(10 ** 18).toFixed(2)}
      </Text>
      <Text
        fontSize={['14px', , '16px']}
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="400"
        lineHeight={['17px', , '19px']}
        color="rgba(255, 255, 255, 0.87)"
      >
        {transaction?.round}
      </Text>
      <LinkExternal
        href={`${linkTransaction(ChainId.GOERLI)}${transaction.id}`}
        className="link_external"
        target="_blank"
        color="#fb8618"
      >
        <Text
          fontSize={['14px', , '16px']}
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="400"
          lineHeight={['17px', , '19px']}
          color="rgba(255, 255, 255, 0.87)"
        >
          {truncateHash(transaction.id, 5, 6)}
        </Text>
      </LinkExternal>
    </>
  )
}

function TabClaimHistory({ currentTransactions }) {
  const [perPage, setPerPage] = useState(5)
  const [tempPage, setTempPage] = useState('1')
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

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

  const handleChangeTempPage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^[\d]*$/.test(e.target.value)) setTempPage(e.target.value)
  }, [])

  const handleSelectPerPage = useCallback(
    (value: any) => {
      setPerPage(value)
    },
    [perPage],
  )

  const sortedTransactions = useMemo(() => {
    if (!currentTransactions) return []
    return currentTransactions ? currentTransactions.slice(perPage * (page - 1), page * perPage) : []
  }, [currentTransactions, page, perPage])

  useEffect(() => {
    if (!currentTransactions) return
    if (currentTransactions.length % perPage === 0) {
      setMaxPage(Math.floor(currentTransactions.length / perPage))
    } else {
      setMaxPage(Math.floor(currentTransactions.length / perPage) + 1)
    }
  }, [currentTransactions, perPage])

  useEffect(() => {
    setTempPage(page.toString())
  }, [page])

  useEffect(() => {
    setPage(1)
  }, [perPage])

  return (
    <>
      <CustomTableWrapper>
        <CustomTable>
          <Text
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
            className="table-header"
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
            className="table-header"
          >
            Time
          </Text>
          <Text
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
            className="table-header"
          >
            XOX claimed
          </Text>
          <Text
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
            className="table-header"
          >
            XOX Bought
          </Text>
          <Text
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
            className="table-header"
          >
            Sale
          </Text>
          <Text
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
            className="table-header"
          >
            Txh
          </Text>
          {currentTransactions ? (
            <>
              {sortedTransactions.map((transaction, index) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <Fragment key={index}>
                    <DataRow transaction={transaction} index={index} page={page} perPage={perPage} />
                  </Fragment>
                )
              })}
              {sortedTransactions.length === 0 ? (
                <NoTransactionWrapper justifyContent="center">
                  <Text textAlign="center">No Transactions</Text>
                </NoTransactionWrapper>
              ) : undefined}
            </>
          ) : (
            <>
              <TableLoader />
              {/* spacer */}
              <Box />
            </>
          )}
        </CustomTable>
      </CustomTableWrapper>
      {currentTransactions && currentTransactions.length > 0 && (
        <PageButtons>
          <div>
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
                    key={_}
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
                      <button type="button" key={_} onClick={() => setPagePagination(i + 1)} className="page">
                        {i + 1}
                      </button>
                    ))
                  ) : (
                    <>
                      {!isMobile && (
                        <>
                          <button type="button" className="page" onClick={() => setPagePagination(1)}>
                            1
                          </button>
                          <button type="button" className="page" onClick={() => setPagePagination(page - 3)}>
                            ...
                          </button>
                        </>
                      )}
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
                      <button type="button" key={_} className="page" onClick={() => setPagePagination(page + i + 1)}>
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
                      {!isMobile && (
                        <>
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
                  stroke={page === maxPage ? 'white' : '#FB8618'}
                  strokeOpacity={page === maxPage ? '0.38' : '1'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Arrow>
          </div>
          <div>
            <Select
              options={[
                {
                  value: 5,
                  label: '5/Page',
                },
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
              onOptionChange={(option: any) => handleSelectPerPage(option.value)}
              className="select-page"
            />
            <Text className="go-page">Go to page</Text>
            <Input
              value={tempPage}
              onChange={handleChangeTempPage}
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
          </div>
        </PageButtons>
      )}
    </>
  )
}

export default TabClaimHistory
