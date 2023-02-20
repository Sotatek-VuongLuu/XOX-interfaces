import { useTranslation } from '@pancakeswap/localization'
import { CopyButton, Flex, Input, Select, Text } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallback, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import styled from 'styled-components'
import { Arrow } from 'views/Info/components/InfoTables/shared'
import { ClickableColumnHeader, CustomTableWrapper, NoTransactionWrapper, PageButtons, Table } from './SaleHistory'

interface IProps {
  dataInfo: any[]
  dataRefInfo: any[]
}

const Wrapper = styled.div``

const Content = styled.div`
  .your_amount {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    .item {
      padding: 16px;
    }
  }

  .your_ref {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    .my_code {
      font-weight: 700;
      font-size: 24px;
      line-height: 29px;
      color: rgba(255, 255, 255, 0.87);
    }

    .code {
      padding: 16px;
      margin-top: 16px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      .content_code_number {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .code_number {
          font-weight: 400;
          font-size: 18px;
          line-height: 22px;
          color: #ffffff;
        }
      }
    }

    .item_your-ref {
      padding: 16px;
    }
  }

  .heading_info_vesting {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 30px;
      left: 0px;
      width: 40px;
      height: 4px;
      background: linear-gradient(100.7deg, rgb(100, 115, 255) 0%, rgb(163, 90, 255) 100%);
    }
  }
`

function YourInfo({ dataInfo, dataRefInfo }: IProps) {
  const [currentTransactions, setCurrentTransactions] = useState([])
  const [perPage, setPerPage] = useState(10)
  const [tempPage, setTempPage] = useState('1')
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const userProfile = useSelector<AppState, AppState['user']['userProfile']>((state) => state.user.userProfile)

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
    <Wrapper>
      <Content>
        <div className="your_amount">
          {Array.from(dataInfo).map((item) => {
            return (
              <div className="item">
                <p>{item.amount}</p>
                <p>{item.title}</p>
              </div>
            )
          })}
        </div>

        <div className="table_your_info">
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
                          <button
                            type="button"
                            key={_}
                            className="page"
                            onClick={() => setPagePagination(page + i + 1)}
                          >
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
        </div>

        <>
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
              Referral
            </Text>
          </Flex>
          <div className="your_ref">
            {Array.from(dataRefInfo).map((item) => {
              return (
                <div className="item_your-ref">
                  <p>{item.amount}</p>
                  <p>{item.title}</p>
                </div>
              )
            })}
            <div>
              <p className="my_code">My Referral Code</p>
              <div className="code">
                <div className="content_code_number">
                  {account && (
                    <>
                      <span className="code_number">{userProfile?.referralCode}</span>
                      <span>
                        <CopyButton
                          width="24px"
                          text={userProfile?.referralCode}
                          tooltipMessage={t('Copied')}
                          button={<img src="/images/CopySimple.svg" alt="CopySimple" />}
                        />
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      </Content>
    </Wrapper>
  )
}

export default YourInfo
