import { useTranslation } from '@pancakeswap/localization'
import { Flex, Input, Select, Text } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React, { useCallback, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { Arrow } from 'views/Info/components/InfoTables/shared'
import { ClickableColumnHeader, CustomTableWrapper, NoTransactionWrapper, PageButtons, Table } from './SaleHistory'

function TabSaleHistory() {
  const [currentTransactions, setCurrentTransactions] = useState([])
  const [perPage, setPerPage] = useState(5)
  const [tempPage, setTempPage] = useState('1')
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const userProfile = useSelector<AppState, AppState['user']['userProfile']>((state) => state.user.userProfile)
  const [tab, setTab] = useState(0)

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

  return (
    <>
      <CustomTableWrapper>
        <Table>
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
            Total Value
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
            XOXS Received
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
          {currentTransactions.length === 0 ? (
            <NoTransactionWrapper justifyContent="center">
              <Text textAlign="center">No Transactions</Text>
            </NoTransactionWrapper>
          ) : undefined}
        </Table>
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
                  stroke={page === maxPage ? 'white' : '#9072FF'}
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
              onOptionChange={(option: any) => setPerPage(option.value)}
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

export default TabSaleHistory
