/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import axios from 'axios'
import { Box, Grid } from '@mui/material'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import moment from 'moment'
import Trans from 'components/Trans'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useCallback, useEffect, useState } from 'react'
import { formatAmountNumber } from '@pancakeswap/utils/formatBalance'
import styled from 'styled-components'
import { USD_DECIMALS } from 'config/constants/exchange'
import BigNumber from 'bignumber.js'
import HowToJoin from './HowToJoin'
// eslint-disable-next-line import/no-cycle
import LeaderBoardItem from './LearderBoardItem'
import PlatformStat from './PlatformStats'
import TotalEarned from './TotalEarned'

import {
  getUerRank,
  getUserPointDaily,
  getUserPointMonthly,
  getUserPointWeekly,
  userPoint,
  pointDataDays,
} from '../../../services/referral'

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
interface IListPoint {
  reward: number
  point: number
}
interface IPropsTotal {
  percentPoint?: number
  account?: string
  chainid?: number
  totalPoint?: number
}

interface IPropsContainer {
  subTabIndex?: number
}

interface IDataFormatUnit {
  id: string
  amount: string
  address: string
}

interface IProps {
  userCurrentPoint: number
  currentLevelReach: number
  listLever: IItemLevel[]
  volumnTotalEarn: string
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
interface IVolumnDataItem {
  volumn: string
  title: string
  svg: string
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
    }

    .tab_item.active {
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
      border-radius: 4px;
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
  .total_point {
    margin-top: 16px;
    padding: 24px;
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
`

const WrapperRight = styled.div<IPropsContainer>`
  height: 100%;

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
      overflow: auto;

      .subTab_item.active {
        background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
        border-radius: 4px;
      }

      .subTab_item {
        padding: 10px 20px;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
        cursor: pointer;
        white-space: nowrap;
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
        .subTab_item {
          padding: 6px 5px;
        }
      }
    }
  }
`
const NoDataWraper = styled.div`
  width:100%;
  height:360px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:700;
  font-size:18px;
  color:rgba(255,255,255,0.6);
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
const defaultIMappingFormat = {
  address: '',
  amount: '',
  avatar: '',
  id: '',
  point: null,
  rank: null,
  username: '',
}
const filterTime = ['All Time', 'Monthly', 'Weekly', 'Daily'] as const
type FilterTime = typeof filterTime[number]

const MainInfo = ({ userCurrentPoint, currentLevelReach, listLever, volumnTotalEarn }: IProps) => {
  const startOfDay = moment().startOf('days').toString()
  const startOfMonth = moment().startOf('month').toString()
  const startOfWeek = moment().startOf('isoWeek').toString()
  const [volumnData, setVolumnData] = useState<Array<IVolumnDataItem>>(listData)
  const [dataChart, setDataChart] = useState([])
  const [minAmount, setMinAmount] = useState('')
  const [middleAmount, setMiddleAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')
  const [tabLeaderBoard, setTabLeaderBoard] = useState<FilterTime>('All Time')
  const [subTabIndex, setSubTabIndex] = useState(0)
  const [listUserRanks, setListUserRanks] = useState<IMappingFormat[]>([])
  const [listUserRanksDaily, setListUserRanksDaily] = useState<IMappingFormat[]>([])
  const [listUserRanksWeekly, setListUserRanksWeekly] = useState<IMappingFormat[]>([])
  const [listUserRanksMonthly, setListUserRanksMonthly] = useState<IMappingFormat[]>([])
  const [listUserRanksAllTime, setListUserRanksAllTime] = useState<IMappingFormat[]>([])
  const [listPoint, setListPoint] = useState<IListPoint[]>([])
  const { account, chainId } = useActiveWeb3React()
  const totalPoint = listLever[currentLevelReach]?.point
  const currentPoint = userCurrentPoint
  const percentPoint = (currentPoint / totalPoint) * 100

  const subTab = ['Total Earned', 'Platform Stats', 'How to Join']
  const [rankOfUser, setRankOfUser] = useState<IMappingFormat>(defaultIMappingFormat)
  const [rankOfUserDaily, setRankOfUserDaily] = useState<IMappingFormat>(defaultIMappingFormat)
  const [rankOfUserWeekly, setRankOfUserWeekly] = useState<IMappingFormat>(defaultIMappingFormat)
  const [rankOfUserMonthly, setRankOfUserMonthly] = useState<IMappingFormat>(defaultIMappingFormat)
  const [rankOfUserAllTime, setRankOfUserAllTime] = useState<IMappingFormat>(defaultIMappingFormat)

  const payloadPostForDaily = {
    date_gte: moment(startOfDay).unix(),
    date_lte: moment().unix(),
  }
  const payloadPostForMonth = {
    date_gte: moment(startOfMonth).unix(),
    date_lte: moment().unix(),
  }

  const payloadPostForWeek = {
    date_gte: moment(startOfWeek).unix(),
    date_lte: moment().unix(),
  }

  const handleGetUserRanks = async (
    typeFilter: FilterTime,
    setList: (arr: IMappingFormat[]) => void,
    setRank: (rank: IMappingFormat) => void,
  ) => {
    try {
      let data = []
      let res
      switch (typeFilter) {
        case 'All Time':
          res = await getUerRank(chainId)
          data = res.userPoints
          break
        case 'Monthly':
          res = await getUserPointMonthly(chainId, payloadPostForMonth)
          data = res.userPointMonthlies
          break
        case 'Weekly':
          res = await getUserPointWeekly(chainId, payloadPostForWeek)
          data = res.userPointWeeklies
          break
        default:
          res = await getUserPointDaily(chainId, payloadPostForDaily)
          data = res.userPointDailies
          break
      }

      const dataUserFormatAmount: IDataFormatUnit[] = data.map((item) => {
        return {
          ...item,
          id: item.id,
          point: new BigNumber(item.amount).div(10 ** USD_DECIMALS[chainId]).toNumber(),
        }
      })

      const listAddress = dataUserFormatAmount.map((item) => item.address)

      if (listAddress.length > 0) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/users/address/mapping`, {
          wallets: listAddress,
        })
        const dataMapping: IMappingFormat[] = dataUserFormatAmount.map((item, index) => {
          const dataUserInfos = response.data
          const userInfo = dataUserInfos?.find((user) => item.address === user.address)

          return {
            ...item,
            ...userInfo,
            rank: index + 1,
            username: userInfo?.username ?? null,
            avatar: userInfo?.avatar ?? null,
          }
        })

        setList([...dataMapping])
        if (tabLeaderBoard === typeFilter) setListUserRanks([...dataMapping])

        const levelOfUSer: IMappingFormat[] = dataMapping.slice(0, 101).filter((item: any) => {
          return item.address === account?.toLowerCase()
        })

        if (levelOfUSer.length !== 0) {
          setRank(levelOfUSer[0])
          if (tabLeaderBoard === typeFilter) setRankOfUser(levelOfUSer[0])
        }
      }
    } catch (error) {
      console.log(`error >>>`, error)
    }
  }

  const getListPointConfig = async () => {
    const res: any = await axios.get(`${process.env.NEXT_PUBLIC_API}/point/config`).catch((error) => {
      console.warn(error)
    })
    if (res && res.data) {
      setListPoint(res.data)
    }
  }
  const getUserPoint = async () => {
    const result = await userPoint(chainId)
    if (result && result.analysisDatas && result.analysisDatas.length > 0) {
      const totalReward = new BigNumber(result.analysisDatas[0]?.total_reward)
        .div(10 ** USD_DECIMALS[chainId])
        .toNumber()
      const totalClaimedAmount = new BigNumber(result.analysisDatas[0]?.total_claimed_amount)
        .div(10 ** USD_DECIMALS[chainId])
        .toNumber()
      const totalUnClaimed = Number(totalReward) - Number(totalClaimedAmount)
      listData[0].volumn = result.analysisDatas[0]?.number_of_referral
      listData[1].volumn = totalUnClaimed.toString()
      listData[2].volumn = totalClaimedAmount.toString()
      listData[3].volumn = result.analysisDatas[0]?.total_transactions.toString()
      listData[4].volumn = totalReward.toString()
      setVolumnData(listData)
    }
  }

  const getPointDataDays = async () => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 14)
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date()
    endDate.setHours(23, 59, 59, 999)
    const time = {
      from: moment(startDate).unix(),
      to: moment(endDate).unix(),
    }
    const result = await pointDataDays(time.from, time.to, chainId)
    if (result && result.pointDataDays && result.pointDataDays.length > 0) {
      const arr = result.pointDataDays
      const chartData = createArray(startDate, endDate, arr)
      const data = chartData.map((item: any) => {
        const amount = new BigNumber(item.amount).div(10 ** USD_DECIMALS[chainId]).toNumber()
        return createDataChartDay(moment(item.date * 1000).format('DD MMM'), amount)
      })
      setMinAmount(data[0].uv.toString())
      setMiddleAmount(data[Math.floor(data.length / 2)].uv.toString())
      setMaxAmount(data[data.length - 1].uv.toString())
      setDataChart(data)
    }
  }
  const createArray = (from: Date, to: Date, subGraphData: any) => {
    const start = new Date(moment(from).format('MM/DD/YYYY'))
    const end = new Date(moment(to).format('MM/DD/YYYY'))
    const chartData = []
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      const loopDay = new Date(d)
      loopDay.setHours(23)
      loopDay.setMinutes(59)
      loopDay.setSeconds(59)
      const dataByDay = { date: moment(loopDay).unix(), amount: 0 }
      const dateInterger = Math.trunc(moment(loopDay).unix() / 86400)

      const findData = subGraphData.find((x) => {
        return x.id === dateInterger.toString()
      })
      dataByDay.amount = findData ? findData.amount : 0
      chartData.push(dataByDay)
    }
    return chartData
  }

  function createDataChartDay(name: string, uv: number) {
    return { name, uv }
  }

  const handleOnChangeRankTab = (item: FilterTime) => {
    setTabLeaderBoard(item)
    switch (item) {
      case 'All Time':
        setListUserRanks(listUserRanksAllTime)
        setRankOfUser(rankOfUserAllTime)
        break
      case 'Monthly':
        setListUserRanks(listUserRanksMonthly)
        setRankOfUser(rankOfUserMonthly)
        break
      case 'Weekly':
        setListUserRanks(listUserRanksWeekly)
        setRankOfUser(rankOfUserWeekly)
        break
      default:
        setListUserRanks(listUserRanksDaily)
        setRankOfUser(rankOfUserDaily)
        break
    }
  }

  useEffect(() => {
    handleGetUserRanks('All Time', setListUserRanksAllTime, setRankOfUserAllTime)
    handleGetUserRanks('Monthly', setListUserRanksMonthly, setRankOfUserMonthly)
    handleGetUserRanks('Weekly', setListUserRanksWeekly, setRankOfUserWeekly)
    handleGetUserRanks('Daily', setListUserRanksDaily, setRankOfUserDaily)
    getListPointConfig()
    getUserPoint()
    getPointDataDays()
  }, [chainId, account])
  return (
    <Box sx={{ marginTop: '16px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <div>
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
                {listUserRanks && listUserRanks.length > 0 && 
                  listUserRanks?.slice(0, 5)?.map((item: IMappingFormat, index: number) => {
                    // eslint-disable-next-line react/no-array-index-key
                    return <LeaderBoardItem item={item} key={`learder_item_${index}`} />
                  })
                }
                {listUserRanks.length === 0 &&
                <NoDataWraper>
                  No data
                </NoDataWraper>
                }
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

            {account && (
              <Second percentPoint={percentPoint} account={account} chainid={chainId} totalPoint={totalPoint}>
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
            {!account && (
              <Second percentPoint={percentPoint} account={account} chainid={chainId} totalPoint={totalPoint}>
                <div className="total_point" style={{ height: '203px', padding: '58px 0' }}>
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
          </div>
        </Grid>
        <Grid item xs={12} lg={8}>
          <WrapperRight subTabIndex={subTabIndex}>
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
        </Grid>
      </Grid>
    </Box>
  )
}

const listData = [
  {
    volumn: '',
    title: 'Number of Referral Participants',
    svg: '/images/referral/icon-user.svg',
  },
  {
    volumn: '',
    title: 'Total Money Unclaimed',
    svg: '/images/referral/icon-unclaimed-money.svg',
  },
  {
    volumn: '',
    title: 'Total Money Claimed',
    svg: '/images/referral/icon-total-claim-money.svg',
  },
  {
    volumn: '0',
    title: 'Number of referral transactions',
    svg: '/images/referral/icon-number-of-referral.svg',
  },
  {
    volumn: '0',
    title: 'Total reward earned',
    svg: '/images/referral/icon-reward-earn.svg',
  },
]

export default MainInfo
