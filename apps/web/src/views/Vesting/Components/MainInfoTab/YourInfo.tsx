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
import TabClaimHistory from './TabClaimHistory'
import TabSaleHistory from './TabSaleHistory'

interface IProps {
  dataInfo: any[]
  dataRefInfo: any[]
}

const Wrapper = styled.div``

const Content = styled.div`
  .your_amount {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
    .item {
      padding: 16px;
      position: relative;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;

      .item_amount {
        font-weight: 700;
        font-size: 24px;
        line-height: 29px;
        color: #fb8618;
        margin-bottom: 8px;
      }
      .item_title {
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: rgba(255, 255, 255, 0.87);
      }
    }
  }

  .your_ref {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;

    .my_code {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: rgba(255, 255, 255, 0.6);
    }

    .code {
      padding: 16px;
      margin-top: 16px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
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
      position: relative;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;

      .item_your-ref_amount {
        font-weight: 700;
        font-size: 24px;
        line-height: 29px;
        color: #fb8618;
      }
      .item_your-ref_title {
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: rgba(255, 255, 255, 0.87);
      }
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
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    }
  }

  .heading_info_vesting_tab {
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
  }

  .heading_info_vesting_tab.vesting_info_active {
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
  }

  .corner_1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 20px;
    border-radius: 10px;
    z-index: 1;
    border-bottom: 2px solid #ffffff30;
    border-left: 2px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge_1 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 20px;
    left: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner_2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 20px;
    border-radius: 10px;
    z-index: 1;
    border-bottom: 2px solid #ffffff30;
    border-right: 2px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge_2 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 20px;
    right: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }
`

function YourInfo({ dataInfo, dataRefInfo }: IProps) {
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
    <Wrapper>
      <Content>
        <div className="your_amount">
          {Array.from(dataInfo).map((item) => {
            return (
              <div className="item">
                <div className="corner_1" />
                <div className="edge_1" />
                <div className="corner_2" />
                <div className="edge_2" />
                <p className="item_amount">{item.amount}</p>
                <p className="item_title">{item.title}</p>
              </div>
            )
          })}
        </div>

        <div className="table_your_info">
          <Flex mb="16px">
            <Text
              className={tab === 0 ? `heading_info_vesting_tab vesting_info_active` : `heading_info_vesting_tab`}
              fontSize="14px"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="24px"
              color="rgba(255, 255, 255, 0.87)"
              onClick={() => setTab(0)}
            >
              Sale History
            </Text>

            <Text
              className={tab === 1 ? `heading_info_vesting_tab vesting_info_active` : `heading_info_vesting_tab`}
              fontSize="14px"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="24px"
              color="rgba(255, 255, 255, 0.87)"
              onClick={() => setTab(1)}
            >
              Claim History
            </Text>
          </Flex>
        </div>

        {tab === 0 && <TabSaleHistory />}
        {tab === 1 && <TabClaimHistory />}

        <>
          <Flex mb="16px" mt="24px" justifyContent="space-between">
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
                  <div className="corner_1" />
                  <div className="edge_1" />
                  <div className="corner_2" />
                  <div className="edge_2" />
                  <p className="item_your-ref_amount">{item.amount}</p>
                  <p className="item_your-ref_title">{item.title}</p>
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
