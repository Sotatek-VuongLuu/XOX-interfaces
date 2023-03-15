import { Flex, Input, Select, Text } from '@pancakeswap/uikit'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import { Arrow } from 'views/Info/components/InfoTables/shared'

const Wrapper = styled.div`
  position: relative;
  padding: 24px;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);

  border-radius: 20px;
  .heading_info_vesting {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 30px;
      left: 0px;
      width: 40px;
      height: 4px;
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    }
  }

  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 1px solid #ffffff30;
    border-left: 1px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 1px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    left: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 1px solid #ffffff30;
    border-right: 1px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 1px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }
`

export const CustomTableWrapper = styled(Flex)`
  padding-top: 24px;
  flex-direction: column;
  gap: 16px;
  overflow-x: auto;

  & > div:last-child {
    margin-bottom: 16px;
  }

  & > div {
    min-width: 1300px;
  }

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #444444;
    transform: matrix(0, -1, -1, 0, 0, 0);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: none;
    border-radius: 10px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    /* width: calc(100vw - 152px); */
  }
`

export const Table = styled.div`
  display: grid;
  grid-gap: 16px 35px;
  align-items: center;
  position: relative;
  grid-template-columns: 0.15fr 1.4fr 1fr repeat(3, 0.7fr) 1fr 0.4fr;
  .table-header {
    margin-bottom: 16px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-gap: 24px 35px;

    .table-header {
      margin-bottom: 8px;
    }
  }

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 0px;
    border: 1px solid #444444;
    position: absolute;
    top: 35px;
  }
`

export const ClickableColumnHeader = styled(Text)`
  cursor: pointer;
`

export const PageButtons = styled(Flex)`
  // width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 3px;
  margin: 24px 0px;

  & > div:first-child {
    margin-bottom: 13px;
  }

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    justify-content: flex-end;

    & > div {
      margin-top: 8px;
    }

    & > div:first-child {
      margin-bottom: 0;
    }
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
    color: #fb8618;
    background: rgba(251, 134, 24, 0.1);
  }

  & .go-page {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);
    min-width: 94px;
    padding: 0 10px;
  }

  & input {
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

export const NoTransactionWrapper = styled(Flex)`
  grid-column: 1 / span 2;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-column: 1 / span 7;
  }
`

function SaleHistory() {
  const [currentTransactions, setCurrentTransactions] = useState([])
  const [perPage, setPerPage] = useState(10)
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

  return (
    <>
      <Wrapper>
        <div className="corner1" />
        <div className="edge1" />
        <div className="corner2" />
        <div className="edge2" />

        <Flex mb="16px" justifyContent="space-between">
          <Text
            className="heading_info_vesting"
            fontSize="20px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="24px"
            color="rgba(255, 255, 255, 0.87)"
            height="24px"
          >
            Sale History
          </Text>
        </Flex>
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
              Wallet Address
            </Text>
            <ClickableColumnHeader
              fontSize="16px"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="19px"
              color="rgba(255, 255, 255, 0.6)"
              className="table-header"
            >
              <Flex alignItems="center">
                <span style={{ marginRight: '12px' }}>Time</span>{' '}
              </Flex>
            </ClickableColumnHeader>
            <ClickableColumnHeader
              fontSize="16px"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="19px"
              color="rgba(255, 255, 255, 0.6)"
              className="table-header"
            >
              <Flex alignItems="center">
                <span style={{ marginRight: '12px' }}>Total Value</span>{' '}
              </Flex>
            </ClickableColumnHeader>
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
            <ClickableColumnHeader
              fontSize="16px"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="19px"
              color="rgba(255, 255, 255, 0.6)"
              className="table-header"
            >
              <Flex alignItems="center">
                <span style={{ marginRight: '12px' }}>Txh</span>
              </Flex>
            </ClickableColumnHeader>
            {currentTransactions.length === 0 ? (
              <NoTransactionWrapper justifyContent="center">
                <Text textAlign="center">No Transactions</Text>
              </NoTransactionWrapper>
            ) : undefined}
          </Table>
        </CustomTableWrapper>
      </Wrapper>

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

export default SaleHistory