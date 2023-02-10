/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Grid } from '@mui/material'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import Trans from 'components/Trans'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useEffect, useMemo, useState } from 'react'
import { formatAmountNumber } from '@pancakeswap/utils/formatBalance'
import styled, { keyframes } from 'styled-components'
import useWindowSize from 'hooks/useWindowSize'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { USD_DECIMALS } from 'config/constants/exchange'
import { getUserFriend } from 'services/referral'
import { formatUnits } from '@ethersproject/units'
import axios from 'axios'
import HowToJoin from './HowToJoin'
// eslint-disable-next-line import/no-cycle
import LeaderBoardItem from './LearderBoardItem'
import PlatformStat from './PlatformStats'
import TotalEarned from './TotalEarned'

const floatingAnim = (x: string, y: string) => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(${x}, ${y});
  }
  to {
    transform: translate(0, 0px);
  }
`

export interface IItemLeaderBoard {
  name: string
  point: string
  avatar: string
  rank: number
}

interface IItemLevel {
  icon: string
  point: number
  dollar: number
  lever: number
  isReach?: boolean
}

interface IPropsTotal {
  percentPoint?: number
  account?: string
  chainid?: number
  totalPoint?: number
  isMobileOrTablet?: boolean
}

interface IPropsContainer {
  subTabIndex?: number
}

export interface IMappingFormat {
  address: string
  amount: string
  avatar: string
  id: string
  point: number | null
  rank: number | null
  username: string
}

const First = styled.div<IPropsTotal>`
  width: 100%;
  height: 100%;
  background: #242424;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 24px;

  .tab_filter {
    display: grid;
    grid-template-columns: repeat(4, auto) 1fr;
    gap: 8px;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    align-items: center;
    color: #ffffff;

    .tab_item {
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 4px;
      &:hover {
        background: #5f35eb;
      }

      @media screen and (min-width: 1200px) and (max-width: 1401px) {
        padding: 10px 14px !important;
      }
    }

    .tab_item.active {
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
      &:hover {
        background: #5f35eb;
      }
    }
  }

  .learder_board {
    margin-top: 16px;
  }

  .dot {
    display: flex;
    justify-content: center;
    gap: 3px;
    margin-bottom: ${({ account }) => (account ? '18px' : '')};

    .dot_item {
      background: #9072ff;
      border: 2px solid #9072ff;
      border-radius: 50%;
    }
  }

  @media screen and (max-width: 900px) {
    padding: 22px;

    .tab_filter {
      font-size: 12px;
      line-height: 15px;

      .tab_item {
        padding: 10px;
      }
    }
  }
`

const Second = styled.div<IPropsTotal>`
  margin-top: 16px;
  .total_point {
    padding: 24px;
    position: relative;
    background: #242424;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
    border-radius: 10px;

    .title {
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.87);
      margin-bottom: 27px;
      @media screen and (max-width: 900px) {
        font-size: 14px;
        line-height: 17px;
        margin-bottom: 16px;
      }
    }

    .total_point_bar {
      background: #444444;
      border-radius: 30px;
      padding: 3px;

      .current_point_bar {
        background: ${({ account, chainid, totalPoint }) =>
          account && chainid && totalPoint ? 'linear-gradient(90deg, #fc6d40 0%, #fa9204 100%)' : 'transparent'};
        border-radius: 30px;
        height: 18px;
        width: ${({ percentPoint }) => `${percentPoint}%`};

        span {
          font-weight: 700;
          font-size: 10px;
          line-height: 12px;
          text-align: center;
          margin-left: 6px;
          color: ${({ account }) => (account ? '#ffffff' : 'transparent')};
        }
      }
    }

    @media screen and (max-width: 900px) {
      padding: 22px;
      font-size: 14px;
      line-height: 17px;
    }
  }
  .unconnect {
    position: relative;
    .content_connect {
      position: absolute !important;
      top: 80%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`

const WrapperRight = styled.div<IPropsContainer>`
  /* height: 100%; */

  .container {
    width: 100%;
    height: 600px;
    background: #242424;
    border-radius: 10px;
    padding: 27px;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    position: relative;

    .filter {
      display: grid;
      grid-template-columns: auto auto auto 1fr;
      gap: 8px;
      align-items: center;
      color: #ffffff;
      position: relative;
      z-index: 2;
      overflow: hidden;

      .subTab_item.active {
        background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
        &:hover {
          background: #5f35eb;
        }
      }

      .subTab_item {
        padding: 10px 20px;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
        cursor: pointer;
        white-space: nowrap;
        border-radius: 4px;
        &:hover {
          background: #5f35eb;
        }
      }
    }

    @media screen and (max-width: 900px) {
      padding: 22px;
      overflow: hidden;
      height: ${({ subTabIndex }) => (subTabIndex !== 1 ? '540px' : 'fit-content')};
      .filter {
        .subTab_item {
          padding: 8px;
          font-size: 12px;
          line-height: 15px;
        }
      }
    }
    @media screen and (max-width: 398px) {
      .filter {
        gap: 4px;
        .subTab_item {
          padding: 6px 5px;
          font-size: 10px;
        }
      }
    }
  }
`

const FakeSwiper = styled.div`
  margin-top: 0 !important;
  position: relative;

  .item {
    position: relative;
    background-size: 192px 172px;
    background-repeat: no-repeat;
    background-position: center;
    height: auto;
    width: 100%;
    /* background: url(/images/item.svg); */
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
    margin: auto;
    &:hover {
      transform: scale(1.11);
      .jewellery {
        animation: ${floatingAnim('0px', '10px')} 3s ease-in-out infinite !important;
      }
      .main-img .sec-img {
        opacity: 1;
      }
    }
  }
  .main-img {
    width: calc(100% + 20px);
    margin-left: -10px;
    position: relative;
    img {
      width: 100%;
      height: auto;
    }
    .sec-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      opacity: 0;
    }
  }
  .item > div.inner-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    top: -7px;

    .shadow {
      width: 110px;
      height: 17px;
      background: radial-gradient(50% 50% at 50% 50%, #000000 0%, rgba(48, 48, 48, 0) 100%);
    }

    .title {
      font-weight: 700;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      color: rgba(255, 255, 255, 0.87);
      margin-top: 8px;
      white-space: nowrap;
    }

    .btn {
      background: transparent;
      border: none;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: rgba(255, 255, 255, 0.38);
      margin-top: 12px;
      cursor: pointer;
    }

    button:disabled,
    button[disabled] {
      cursor: not-allowed;
    }

    .jewellery {
      animation: ${floatingAnim('0px', '5px')} 3s ease-in-out infinite;
    }
  }

  .current {
    & > div {
      .btn {
        background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      button:disabled,
      button[disabled] {
        cursor: not-allowed;
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.384) 0%, rgba(255, 255, 255, 0.384) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
  }

  .swiper-button-next {
    z-index: 999;
    background-image: url(/images/next.svg);
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
    border-radius: 50%;
    @media screen and (max-width: 555px) {
      margin-right: -14px;
    }
  }

  .swiper-button-next::after {
    display: none;
  }

  .swiper-button-prev {
    background-image: url(/images/prev.svg);
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
  }

  .swiper-button-prev::after {
    display: none;
  }

  .swiper.swiper-initialized {
    padding-top: 16px;
  }

  .claim_total {
    display: flex;
    justify-content: center;
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
      border-radius: 4px;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
      padding: 8px 20px;
      &:hover {
        background: #5f35eb;
      }
    }

    button:disabled,
    button[disabled] {
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.38);
      cursor: not-allowed;
    }

    .unclaim_reward_container {
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
      padding: 2px;
      border-radius: 4px;
      margin-right: 16px;

      .unclaim_reward {
        width: 100%;
        height: 100%;
        background: black;
        border-radius: 4px;
        div {
          font-weight: 700;
          font-size: 14px;
          line-height: 17px;
          padding: 8px 20px;
          background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          /* text-fill-color: transparent; */
        }
      }
    }

    @media screen and (max-width: 900px) {
      flex-direction: column;
      .unclaim_reward_container {
        width: 100%;
        margin-bottom: 16px;
        .unclaim_reward {
          div {
            text-align: center;
          }
        }
      }
    }
  }

  .claim {
    background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`

const ConnectBoxContainer = styled.div`
  margin-top: 20px;
  height: 100%;

  .total_point_content {
    display: grid;
    place-content: center;
  }
`

const NoDataWraper = styled.div`
  width: 100%;
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
`
const ConnectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const ConnectWalletButtonWraper = styled(ConnectWalletButton)`
  padding: 10px;
  margin: 0 auto;
  width: 100%;
  max-width: 146px;
  margin-top: 16px;
  height: 37px;
`
const BoxWrapper = styled(Box)`
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  align-items: center;

  button {
    max-width: 146px;
    font-size: 14px;
    font-weight: 700;
    border-radius: 6px;
  }
`
const SubTitle = styled.div`
  color: #ffffffde;
  text-align: center;
  max-width: 242px;
  margin: 0 auto;
`

interface IPropsWrapperLeft {
  account?: boolean
}

const WrapperLeft = styled.div<IPropsWrapperLeft>`
  display: flex;
  flex-direction: column;
  height: 100%;
`

interface IProps {
  userCurrentPoint: number
  currentLevelReach: number
  listLever: IItemLevel[]
  volumnTotalEarn: string
  filterTime?: any
  handleOnChangeRankTab: any
  tabLeaderBoard: any
  listUserRanks: any
  rankOfUser: any
  volumnData: any
  dataChart: any
  minAmount: any
  middleAmount: any
  maxAmount: any
  listPoint: any
  listLevelMustReach: any
}

const MainInfo = ({
  userCurrentPoint,
  currentLevelReach,
  listLever,
  volumnTotalEarn,
  filterTime,
  handleOnChangeRankTab,
  tabLeaderBoard,
  listUserRanks,
  rankOfUser,
  volumnData,
  dataChart,
  minAmount,
  middleAmount,
  maxAmount,
  listPoint,
  listLevelMustReach,
}: IProps) => {
  const [subTabIndex, setSubTabIndex] = useState(0)
  const [loadNetWork, setLoadNetWork] = useState(false)
  const { account, chainId, isWrongNetwork } = useActiveWeb3React()
  const totalPoint = listLever[currentLevelReach]?.point
  const currentPoint = userCurrentPoint
  const percentPoint = (currentPoint / totalPoint) * 100
  const { width } = useWindowSize()
  const subTab = ['Total Earned', 'Platform Stats', 'How to Join']
  const [listFriends, setListFriends] = useState([])

  const controlWidth = useMemo(() => {
    let slidesPerView = 5
    if (width < 1600) {
      slidesPerView = 5
    }
    if (width < 1400) {
      slidesPerView = 4
    }
    if (width < 1200) {
      slidesPerView = 4
    }
    if (width < 900) {
      slidesPerView = 3
    }
    if (width < 698) {
      slidesPerView = 3
    }
    if (width < 534) {
      slidesPerView = 2
    }
    if (width < 376) {
      slidesPerView = 2
    }
    if (width < 368) {
      slidesPerView = 1
    }
    return slidesPerView
  }, [width])

  const dataFriend = async (accountId: string) => {
    try {
      setListFriends([])
      const { userInfos } = await getUserFriend(chainId, accountId)
      const sortByPoints = userInfos[0]?.friends?.sort(function (a: any, b: any) {
        return Number(b.amount) - Number(a.amount)
      })
      // console.log('sortByPoints', sortByPoints)
      if (Array.from(userInfos).length !== 0) {
        const dataUserFormatAmount = sortByPoints.map((item: any) => {
          return {
            ...item,
            id: item?.ref_address,
            point: Number(formatUnits(item.amount, USD_DECIMALS[chainId])),
          }
        })

        const dataMapping = await Promise.all(
          dataUserFormatAmount?.map(async (item: any): Promise<any> => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/users/address/mapping`, {
              wallets: [`${item.ref_address}`],
            })
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/users/${item.ref_address}`)
            const dataMap = response?.data[0]
            return {
              ...item,
              ...dataMap,
              name: dataMap?.username ?? null,
              avatar: dataMap?.avatar ?? null,
              refCode: data?.referralCode,
            }
          }),
        )
        setListFriends(dataMapping)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`error >>>>`, error)
    }
  }

  useEffect(() => {
    if (account && chainId) {
      dataFriend(account)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account])

  useEffect(() => {
    if (isWrongNetwork === undefined) return
    if (loadNetWork) window.location.reload()
    setLoadNetWork(true)
  }, [isWrongNetwork])

  return (
    <Box sx={{ marginTop: '16px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <WrapperLeft>
            <div className="border-gradient-style">
              <First account={account}>
                <div className="tab_filter">
                  {filterTime.map((item) => {
                    return (
                      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                      <div
                        key={item}
                        onClick={() => handleOnChangeRankTab(item)}
                        className={tabLeaderBoard === item ? 'tab_item active' : 'tab_item'}
                      >
                        {item}
                      </div>
                    )
                  })}
                </div>

                <div className="learder_board">
                  {listUserRanks &&
                    listUserRanks.length > 0 &&
                    listUserRanks?.slice(0, 5)?.map((item: IMappingFormat, index: number) => {
                      // eslint-disable-next-line react/no-array-index-key
                      return <LeaderBoardItem item={item} key={`learder_item_${index}`} />
                    })}
                  {listUserRanks.length === 0 && <NoDataWraper>No data</NoDataWraper>}
                </div>

                {!rankOfUser.rank ? null : rankOfUser.rank <= 6 ? null : (
                  <div className="dot">
                    <div className="dot_item" />
                    <div className="dot_item" />
                    <div className="dot_item" />
                  </div>
                )}

                {account ? (
                  rankOfUser.rank ? (
                    [1, 2, 3, 4, 5].includes(rankOfUser.rank) ? null : (
                      <LeaderBoardItem item={rankOfUser} mb={false} />
                    )
                  ) : null
                ) : null}
              </First>
            </div>

            {account && (
              <Second
                percentPoint={percentPoint}
                account={account}
                chainid={chainId}
                totalPoint={totalPoint}
                className="border-gradient-style"
              >
                <div className="total_point">
                  <p className="title">Your current total points</p>
                  <div className="total_point_bar">
                    <div className="current_point_bar">
                      {totalPoint ? (
                        <span>
                          {formatAmountNumber(userCurrentPoint, 2)}/
                          {currentLevelReach === 9
                            ? listLever[currentLevelReach - 1]?.point
                            : listLever[currentLevelReach]?.point}
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </div>
                </div>
              </Second>
            )}
            {!account && width > 1200 && (
              <ConnectBoxContainer className="border-gradient-style">
                <div className="total_point_content " style={{ height: '100%', padding: '58px 0' }}>
                  <SubTitle className="please-connec">Please connect wallet to view your referral information</SubTitle>
                  <ConnectBox>
                    <ConnectWalletButtonWraper scale="sm">
                      <BoxWrapper display={['flex', , , 'flex']}>
                        <Trans>Connect Wallet</Trans>
                      </BoxWrapper>
                    </ConnectWalletButtonWraper>
                  </ConnectBox>
                </div>
              </ConnectBoxContainer>
            )}

            {!account && width <= 1200 && (
              <Second
                percentPoint={percentPoint}
                account={account}
                chainid={chainId}
                totalPoint={totalPoint}
                className={`border-gradient-style ${width > 1200 && `border-gradient-style_expand`}`}
              >
                <div className="total_point " style={{ height: '203px', padding: '58px 0' }}>
                  <SubTitle className="please-connec">Please connect wallet to view your referral information</SubTitle>
                  <ConnectBox>
                    <ConnectWalletButtonWraper scale="sm">
                      <BoxWrapper display={['flex', , , 'flex']}>
                        <Trans>Connect Wallet</Trans>
                      </BoxWrapper>
                    </ConnectWalletButtonWraper>
                  </ConnectBox>
                </div>
              </Second>
            )}
          </WrapperLeft>
        </Grid>
        <Grid item xs={12} lg={8}>
          <WrapperRight subTabIndex={subTabIndex} className="border-gradient-style">
            <div className="container">
              <div className="filter">
                {subTab.map((item, index) => {
                  return (
                    <div
                      key={item}
                      onClick={() => setSubTabIndex(index)}
                      className={subTabIndex === index ? 'subTab_item active' : 'subTab_item'}
                    >
                      {item}
                    </div>
                  )
                })}
              </div>

              {subTabIndex === 0 && <TotalEarned volumnTotalEarn={volumnTotalEarn} />}
              {subTabIndex === 1 && (
                <PlatformStat
                  volumnData={volumnData}
                  dataChart={dataChart}
                  minAmount={minAmount}
                  middleAmount={middleAmount}
                  maxAmount={maxAmount}
                  listPoint={listPoint}
                />
              )}
              {subTabIndex === 2 && <HowToJoin />}
            </div>
          </WrapperRight>

          {!account && width > 1200 && (
            <FakeSwiper>
              <Swiper
                slidesPerView={controlWidth}
                modules={[Navigation, Pagination, A11y]}
                navigation
                scrollbar={{ draggable: true }}
              >
                {listLevelMustReach.map((item: IItemLevel) => {
                  return (
                    <SwiperSlide key={item.icon}>
                      <div
                        className={`item ${item.isReach && item.lever === currentLevelReach ? 'current' : ''}`}
                        key={item.icon}
                      >
                        <div className="main-img">
                          <img
                            className="first-img"
                            src={item.lever === currentLevelReach ? '/images/current_item.svg' : 'images/item.svg'}
                            alt="images"
                          />
                          <img className="sec-img" src="/images/current_item.svg" alt="images" />
                        </div>
                        <div className="inner-text">
                          <img src={item.icon} alt="icons" className="jewellery" />

                          <div className="shadow" />

                          <p className="title">
                            {item.point.toLocaleString()} points
                            <br />
                            ~${item.dollar.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </FakeSwiper>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default MainInfo
