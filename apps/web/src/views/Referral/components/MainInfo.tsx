/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { formatUnits } from '@ethersproject/units'
import { MAPPING_DECIMAL_WITH_CHAIN } from 'config/constants/mappingDecimals'
import axios from 'axios'
import { Box, Grid } from '@mui/material'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import moment from 'moment'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import HowToJoin from './HowToJoin'
// eslint-disable-next-line import/no-cycle
import LeaderBoardItem from './LearderBoardItem'
import PlatformStat from './PlatformStats'
import TotalEarned from './TotalEarned'
import { getUerRank, getUserPointDaily, getUserPointMonthly, getUserPointWeekly } from '../../../services/referral'

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
        background: ${({ account }) => (account ? 'linear-gradient(90deg, #fc6d40 0%, #fa9204 100%)' : 'transparent')};
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
    height: 594px;
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

const MainInfo = ({ userCurrentPoint, currentLevelReach, listLever, volumnTotalEarn }: IProps) => {
  const yesterday = moment().subtract(1, 'days')
  const startOfDay = yesterday.startOf('day').toString()
  const endOfDay = yesterday.endOf('day').toString()
  const startOfMonth = moment().startOf('month').toString()
  const startOfWeek = moment().startOf('isoWeek').toString()
  const [tabLeaderBoard, setTabLeaderBoard] = useState('All Time')
  const [subTabIndex, setSubTabIndex] = useState(0)
  const [listUserRanks, setListUserRanks] = useState<IMappingFormat[]>([])
  const [listPoint, setListPoint] = useState([])
  const { account, chainId } = useActiveWeb3React()
  const totalPoint = listLever[currentLevelReach]?.point
  const currentPoint = userCurrentPoint
  const percentPoint = (currentPoint / totalPoint) * 100
  const filterTime = ['All Time', 'Monthly', 'Weekly', 'Daily']
  const subTab = ['Total Earned', 'Platform Stats', 'How to Join']
  const [rankOfUser, setRankOfUser] = useState<IMappingFormat>({
    address: '',
    amount: '',
    avatar: '',
    id: '',
    point: null,
    rank: null,
    username: '',
  })
  const payloadPostForDaily = {
    date_gte: moment(startOfDay).unix(),
    date_lte: moment(endOfDay).unix(),
  }

  const payloadPostForMonth = {
    date_gte: moment(startOfMonth).unix(),
    date_lte: moment().unix(),
  }

  const payloadPostForWeek = {
    date_gte: moment(startOfWeek).unix(),
    date_lte: moment().unix(),
  }

  const handleGetUserRanks = async (typeFilter: string) => {
    try {
      let data = []
      if (typeFilter === filterTime[0]) {
        const res = await getUerRank(chainId)
        data = res.userPoints
      } else if (typeFilter === filterTime[3]) {
        const res = await getUserPointDaily(chainId, payloadPostForDaily)
        data = res.userPointDailies
      } else if (typeFilter === filterTime[1]) {
        const res = await getUserPointMonthly(chainId, payloadPostForMonth)
        data = res.userPointMonthlies
      } else {
        const res = await getUserPointWeekly(chainId, payloadPostForWeek)
        data = res.userPointWeeklies
      }

      const dataUserFormatAmount: IDataFormatUnit[] = data.map((item) => {
        return {
          ...item,
          id: item.id,
          point: Number(formatUnits(item.amount, MAPPING_DECIMAL_WITH_CHAIN[chainId])),
        }
      })

      const dataMapping: IMappingFormat[] = await Promise.all(
        dataUserFormatAmount.map(async (item: IDataFormatUnit, index: number): Promise<any> => {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/users/address/mapping`, {
            wallets: [`${item.address}`],
          })
          const dataMap = response?.data[0]
          return {
            ...item,
            ...dataMap,
            rank: index + 1,
            username: dataMap?.username ?? null,
            avatar: dataMap?.avatar ?? null,
          }
        }),
      )

      setListUserRanks([...dataMapping])
      const levelOfUSer: IMappingFormat[] = dataMapping.slice(0, 100).filter((item: any) => {
        return item.address === account.toLowerCase()
      })
      if (levelOfUSer.length !== 0) {
        setRankOfUser(levelOfUSer[0])
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

  useEffect(() => {
    getListPointConfig()
    handleGetUserRanks('All Time')
  }, [chainId])

  return (
    <Box sx={{ marginTop: '16px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <div>
            <First account={account}>
              <div className="tab_filter">
                {filterTime.map((item) => {
                  return (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <div
                      key={item}
                      onClick={() => {
                        setTabLeaderBoard(item)
                        handleGetUserRanks(item)
                        setListUserRanks([])
                      }}
                      className={tabLeaderBoard === item ? 'tab_item active' : 'tab_item'}
                    >
                      {item}
                    </div>
                  )
                })}
              </div>

              <div className="learder_board">
                {listUserRanks?.slice(0, 5)?.map((item: IMappingFormat, index: number) => {
                  // eslint-disable-next-line react/no-array-index-key
                  return <LeaderBoardItem item={item} key={`learder_item_${index}`} />
                })}
              </div>

              {rankOfUser.rank && rankOfUser.rank !== 6 ? null : (
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

            <Second percentPoint={percentPoint} account={account}>
              <div className="total_point">
                <p className="title">Your current total points</p>
                <div className="total_point_bar">
                  <div className="current_point_bar">
                    <span>
                      {userCurrentPoint}/
                      {currentLevelReach === 9
                        ? listLever[currentLevelReach - 1]?.point
                        : listLever[currentLevelReach]?.point}
                    </span>
                  </div>
                </div>
              </div>
            </Second>
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
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
              {subTabIndex === 1 && <PlatformStat listPoint={listPoint} />}
              {subTabIndex === 2 && <HowToJoin />}
            </div>
          </WrapperRight>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MainInfo
