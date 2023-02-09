/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { formatUnits } from '@ethersproject/units'
import { Box } from '@mui/material'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import BigNumber from 'bignumber.js'
import SwapMainBackgroundMobile from 'components/Svg/LiquidityMainBackgroundMobile'
import SwapMainBackgroundDesktop from 'components/Svg/SwapMainBackgroundDesktop'
import { USD_DECIMALS } from 'config/constants/exchange'
import { useTreasuryXOX } from 'hooks/useContract'
import useWindowSize from 'hooks/useWindowSize'
import moment from 'moment'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  getUerRank,
  getUserPointDaily,
  getUserPointMonthly,
  getUserPointWeekly,
  pointDataDays,
  userAmount,
  userPoint,
} from 'services/referral'
import styled from 'styled-components'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Banner from './components/Banner'
import MainInfo from './components/MainInfo'
import ReferralFriend from './components/ReferralFriend'

export interface IItemLevel {
  icon: string
  point: number
  dollar: number
  lever: number
  isReach: boolean
}

interface IVolumnDataItem {
  volumn: string
  title: string
  svg: string
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

interface IDataFormatUnit {
  id: string
  amount: string
  address: string
}

interface IListPoint {
  reward: number
  point: number
}

const Wrapper = styled(Box)`
  padding: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  @media screen and (max-width: 1200px) {
    padding: 48px 24px;
    display: block;
  }
`

const MainBackground = styled.div`
  position: absolute;
  z-index: -1;
  top: -50px;
  left: 0;
  right: 0;
  bottom: 0;
  svg {
    width: 100vw;
    height: auto;
    object-fit: cover;
  }
`

const BoxStyled = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .content {
    width: 1400px;
    position: relative;
  }

  @media screen and (max-width: 1200px) {
    display: block;
    .content {
      width: unset;
    }
  }
`

interface IPropsConnectBox {
  hasListUserRanks?: boolean
}

const ConnectBox = styled.div<IPropsConnectBox>`
  position: absolute;
  height: ${({ hasListUserRanks }) => (hasListUserRanks ? '445px' : '375px')};
  width: 456px;
  left: 0;
  bottom: 0;
  background: #242424;
  z-index: 10;
  border-radius: 10px;
  .content {
    height: ${({ hasListUserRanks }) => (hasListUserRanks ? '445px' : '375px')};
    width: 456px;
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;

    .group_btn {
      p {
        text-align: center;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        color: rgba(255, 255, 255, 0.87);
      }
      div {
        display: flex;
        justify-content: center;
        margin-top: 32px;
        button {
          border: none;
          padding: 10px 20px;
          background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
          font-weight: 700;
          font-size: 14px;
          line-height: 17px;
          color: #ffffff;
          border-radius: 4px;
        }
      }
    }
  }
`

const ConnectWalletButtonWraper = styled(ConnectWalletButton)``

const filterTime = ['All Time', 'Monthly', 'Weekly', 'Daily'] as const
type FilterTime = typeof filterTime[number]

const defaultIMappingFormat = {
  address: '',
  amount: '',
  avatar: '',
  id: '',
  point: null,
  rank: null,
  username: '',
}

export default function Refferal() {
  const { account, chainId } = useWeb3React()
  const contractTreasuryXOX = useTreasuryXOX()
  const [userCurrentPoint, setUserCurrentPoint] = useState<number>(0)
  const [currentLevelReach, setCurrentLevelReach] = useState<number>(0)
  const [listLevelMustReach, setListLevelMustReach] = useState<IItemLevel[]>(listLever)
  const [isClaimAll, setIsClaimAll] = useState<boolean>(true)
  const [volumnTotalEarn, setVolumnTotalEarn] = useState<string>('')
  const [totalAmountUnClaimOfUser, setTotalAmountUnClaimOfUser] = useState<number | string>(0)
  const { isMobile } = useMatchBreakpoints()
  const { width } = useWindowSize()
  const [tabLeaderBoard, setTabLeaderBoard] = useState<FilterTime>('All Time')
  const [listUserRanks, setListUserRanks] = useState<IMappingFormat[]>([])
  const [listUserRanksDaily, setListUserRanksDaily] = useState<IMappingFormat[]>([])
  const [listUserRanksWeekly, setListUserRanksWeekly] = useState<IMappingFormat[]>([])
  const [listUserRanksMonthly, setListUserRanksMonthly] = useState<IMappingFormat[]>([])
  const [listUserRanksAllTime, setListUserRanksAllTime] = useState<IMappingFormat[]>([])
  const [loadOk, setLoadOk] = useState(false)
  const [rankOfUser, setRankOfUser] = useState<IMappingFormat>(defaultIMappingFormat)
  const [rankOfUserDaily, setRankOfUserDaily] = useState<IMappingFormat>(defaultIMappingFormat)
  const [rankOfUserWeekly, setRankOfUserWeekly] = useState<IMappingFormat>(defaultIMappingFormat)
  const [rankOfUserMonthly, setRankOfUserMonthly] = useState<IMappingFormat>(defaultIMappingFormat)
  const [rankOfUserAllTime, setRankOfUserAllTime] = useState<IMappingFormat>(defaultIMappingFormat)
  const startOfDay = moment().startOf('days').toString()
  const startOfMonth = moment().startOf('month').toString()
  const startOfWeek = moment().startOf('isoWeek').toString()
  const [volumnData, setVolumnData] = useState<Array<IVolumnDataItem>>(listData)
  const [dataChart, setDataChart] = useState([])
  const [minAmount, setMinAmount] = useState('')
  const [middleAmount, setMiddleAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')
  const [listPoint, setListPoint] = useState<IListPoint[]>([])

  // eslint-disable-next-line consistent-return
  const handleGetCurrentPoint = async () => {
    let currentPoint
    try {
      const infosUser: any[] = await contractTreasuryXOX.userInfo(account)
      const dataParse: any[] = infosUser.map((item) => {
        return formatUnits(item, USD_DECIMALS[chainId])
      })
      setUserCurrentPoint(Number(dataParse[0]))
      currentPoint = Number(dataParse[0])
      return currentPoint
    } catch (error) {
      console.warn(error)
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

  // eslint-disable-next-line consistent-return
  const handleCheckPendingRewardAll = async (accountId: string) => {
    try {
      const txPendingReward = await contractTreasuryXOX.pendingRewardAll(accountId)
      setIsClaimAll(Number(formatUnits(txPendingReward._hex, USD_DECIMALS[chainId])) === 0)
      setTotalAmountUnClaimOfUser(Number(formatUnits(txPendingReward._hex, USD_DECIMALS[chainId])))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`error>>>>>`, error)
    }
  }

  const handleCheckReachLevel = async (currentPoint: number) => {
    const arrAddIsReach: IItemLevel[] = listLevelMustReach.map((item: IItemLevel) => {
      const reached = currentPoint >= item.point
      return {
        ...item,
        isReach: reached,
        isClaimed: false,
      }
    })

    if (currentPoint < listLevelMustReach[0].point) {
      setCurrentLevelReach(0)
    } else {
      const findLastReach = arrAddIsReach.filter((item) => {
        return item.isReach === true
      })
      const currentLever = findLastReach.pop()?.lever
      setCurrentLevelReach(currentLever)
    }

    const arrCheckClaimed: IItemLevel[] = await Promise.all(
      arrAddIsReach?.map(async (item: IItemLevel): Promise<any> => {
        try {
          if (item.isReach) {
            const txPendingReward = await contractTreasuryXOX.pendingRewardByLevel(account, item.lever)
            if (Number(formatUnits(txPendingReward._hex, USD_DECIMALS[chainId])) === 0) {
              return {
                ...item,
                isClaimed: true,
              }
            }
            return {
              ...item,
              isClaimed: false,
            }
          }
          return item
        } catch (error) {
          console.log(`error >>>>`, error)
        }
      }),
    )
    setListLevelMustReach([...arrCheckClaimed])
  }

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

  const getUserVolumn = async () => {
    try {
      const result = await userAmount(chainId)
      if (result) {
        const volumn = formatUnits(result.analysisDatas[0]?.total_claimed_amount, USD_DECIMALS[chainId])
        setVolumnTotalEarn(volumn)
      }
    } catch (error) {
      console.log(`error >>>>`, error)
    }
  }

  function createDataChartDay(name: string, uv: number) {
    return { name, uv }
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

  const handleReCallGetCurrentPoint = async () => {
    const currentPoint = await handleGetCurrentPoint()
    handleCheckReachLevel(currentPoint)
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
    if (!chainId || !account) return
    if (loadOk) window.location.reload()
    setLoadOk(true)
    handleGetUserRanks('All Time', setListUserRanksAllTime, setRankOfUserAllTime)
    handleGetUserRanks('Monthly', setListUserRanksMonthly, setRankOfUserMonthly)
    handleGetUserRanks('Weekly', setListUserRanksWeekly, setRankOfUserWeekly)
    handleGetUserRanks('Daily', setListUserRanksDaily, setRankOfUserDaily)
    getListPointConfig()
    getUserPoint()
    getPointDataDays()
  }, [chainId, account])

  useEffect(() => {
    const fetchMyAPI = async () => {
      const currentPoint = await handleGetCurrentPoint()
      handleCheckReachLevel(currentPoint)
    }
    fetchMyAPI()
  }, [account, chainId])

  useEffect(() => {
    if (!chainId) return
    getUserVolumn()
  }, [chainId])

  useEffect(() => {
    if (account) {
      handleCheckPendingRewardAll(account)
    }
  }, [account])

  return (
    <>
      <MainBackground>{isMobile ? <SwapMainBackgroundMobile /> : <SwapMainBackgroundDesktop />}</MainBackground>
      <Wrapper>
        <BoxStyled>
          <div className="content">
            <Banner />
            <MainInfo
              userCurrentPoint={userCurrentPoint}
              currentLevelReach={currentLevelReach}
              listLever={listLever}
              volumnTotalEarn={volumnTotalEarn}
              filterTime={filterTime}
              handleOnChangeRankTab={handleOnChangeRankTab}
              tabLeaderBoard={tabLeaderBoard}
              listUserRanks={listUserRanks}
              rankOfUser={rankOfUser}
              volumnData={volumnData}
              dataChart={dataChart}
              minAmount={minAmount}
              middleAmount={middleAmount}
              maxAmount={maxAmount}
              listPoint={listPoint}
            />
            <ReferralFriend
              currentLevelReach={currentLevelReach}
              isClaimAll={isClaimAll}
              listLevelMustReach={listLevelMustReach}
              volumnTotalEarn={volumnTotalEarn}
              getUserPoint={getUserPoint}
              handleCheckReachLevel={handleReCallGetCurrentPoint}
              handleCheckPendingRewardAll={handleCheckPendingRewardAll}
              totalUnClaimed={totalAmountUnClaimOfUser}
            />

            {!account && width > 1200 && (
              <ConnectBox className="border-gradient-style" hasListUserRanks={listUserRanks.length > 0}>
                <div className="content">
                  <div className="group_btn">
                    <p>Please connect wallet to view your referral information</p>
                    <div>
                      <ConnectWalletButtonWraper type="button">Connect Wallet</ConnectWalletButtonWraper>
                    </div>
                  </div>
                </div>
              </ConnectBox>
            )}
          </div>
        </BoxStyled>
      </Wrapper>
    </>
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

export const listLever: IItemLevel[] = [
  {
    icon: '/images/lever_1.svg',
    point: 100,
    dollar: 10,
    lever: 1,
    isReach: false,
  },
  {
    icon: '/images/lever_2.svg',
    point: 500,
    dollar: 50,
    lever: 2,
    isReach: false,
  },
  {
    icon: '/images/lever_3.svg',
    point: 1000,
    dollar: 100,
    lever: 3,
    isReach: false,
  },
  {
    icon: '/images/lever_4.svg',
    point: 5000,
    dollar: 300,
    lever: 4,
    isReach: false,
  },
  {
    icon: '/images/lever_5.svg',
    point: 10000,
    dollar: 500,
    lever: 5,
    isReach: false,
  },
  {
    icon: '/images/lever_6.svg',
    point: 50000,
    dollar: 2000,
    lever: 6,
    isReach: false,
  },
  {
    icon: '/images/lever_7.svg',
    point: 100000,
    dollar: 5000,
    lever: 7,
    isReach: false,
  },
  {
    icon: '/images/lever_8.svg',
    point: 500000,
    dollar: 10000,
    lever: 8,
    isReach: false,
  },
  {
    icon: '/images/lever_9.svg',
    point: 1000000,
    dollar: 20000,
    lever: 9,
    isReach: false,
  },
]
