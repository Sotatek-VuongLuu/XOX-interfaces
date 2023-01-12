/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import BigNumber from 'bignumber.js'
import { Box, Grid } from '@mui/material'
import { ChainId } from '@pancakeswap/sdk'
import { USD_DECIMALS } from 'config/constants/exchange'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getUerRank, getUserPointDaily, getUserPointMonthly, getUserPointWeekly } from 'services/referral'
import styled from 'styled-components'
import axios from 'axios'

import LeaderBoardItemLP from 'views/Referral/components/LearderBoardItemForLandingPage'

export interface IItemLeaderBoard {
  name: string
  point: string
  avatar: string
  rank: number
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

const Wrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 64px;
  margin-top: 100px;

  .leader_board {
    width: 689px;
    height: 529px;
    background: linear-gradient(100.7deg, rgba(96, 52, 255, 0.1) 0%, rgba(163, 90, 255, 0.1) 100%);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid #a35aff;
    padding: 32px;
  }

  .title_ref {
    font-weight: 700;
    font-size: 36px;
    color: rgba(255, 255, 255, 0.87);

    @media screen and (max-width: 900px) {
      font-size: 20px;
      line-height: 32px;
    }
  }

  .ref_container {
  }

  .list {
    margin-bottom: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 40px;
    row-gap: 16px;

    .icon_stone {
      margin-right: 16px;
    }

    p {
      display: flex;
      align-items: center;
    }

    @media screen and (max-width: 900px) {
      grid-template-columns: 0.75fr 1fr;
    }

    @media screen and (max-width: 370px) {
      grid-template-columns: 1fr;
    }
  }
  .title_list_item {
    font-weight: 400;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.87);
    @media screen and (max-width: 900px) {
      font-size: 16px;
    }
  }

  .btn_join {
    padding: 16px 40px;
    font-weight: 700;
    font-size: 18px;
    color: #ffffff;
    border: none;
    background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
    border-radius: 8px;
    cursor: pointer;

    @media screen and (max-width: 900px) {
      padding: 12px 30px;
      font-size: 16px;
    }
  }

  .lead_board_container {
    @media screen and (max-width: 900px) {
      display: flex;
      justify-content: center;
    }
  }

  @media screen and (max-width: 900px) {
    margin-top: 64px;
  }
`

const Paragraph = styled.p`
  font-weight: 400;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.87);
  font-weight: 400;
  line-height: 32px;
  margin: 24px 0px;

  @media screen and (max-width: 900px) {
    font-size: 16px;
    line-height: 24px;
  }
`

const First = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(100.7deg, rgba(96, 52, 255, 0.1) 0%, rgba(163, 90, 255, 0.1) 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 24px;

  @media screen and (max-width: 900px) {
    padding: 19px;
  }

  .tab_filter {
    display: flex;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    align-items: center;
    color: #ffffff;

    .tab_item {
      padding: 10px 20px;
    }

    .tab_item_active {
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
      border-radius: 4px;
      padding: 10px 20px;
    }

    @media screen and (max-width: 900px) {
      font-size: 12px;
      line-height: 15px;
      .tab_item {
        padding: 8px;
      }

      .tab_item_active {
        padding: 8px;
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
    margin-bottom: 18px;

    .dot_item {
      background: #9072ff;
      border: 2px solid #9072ff;
      border-radius: 50%;
    }
  }
`

const WrapperLeft = styled.div``

const Container = styled(Box)`
  background: linear-gradient(#6034ff, #a35aff, #111111);
  padding: 1px;
  border-radius: 20px;
`

const Overlay = styled(Box)`
  background: #111111;
  border-radius: 20px;
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

const filterTime = ['All Time', 'Monthly', 'Weekly', 'Daily'] as const
type FilterTime = typeof filterTime[number]

const FeatureReferal = () => {
  const startOfDay = moment().startOf('days').toString()
  const startOfMonth = moment().startOf('month').toString()
  const startOfWeek = moment().startOf('isoWeek').toString()
  const [tabLeaderBoard, setTabLeaderBoard] = useState<FilterTime>('All Time')
  const route = useRouter()
  const [listUserRanks, setListUserRanks] = useState<IMappingFormat[]>([])
  const [listUserRanksDaily, setListUserRanksDaily] = useState<IMappingFormat[]>([])
  const [listUserRanksWeekly, setListUserRanksWeekly] = useState<IMappingFormat[]>([])
  const [listUserRanksMonthly, setListUserRanksMonthly] = useState<IMappingFormat[]>([])
  const [listUserRanksAllTime, setListUserRanksAllTime] = useState<IMappingFormat[]>([])

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

  const handleGetUserRanks = async (typeFilter: FilterTime, setList: (arr: IMappingFormat[]) => void) => {
    try {
      let data = []
      let res
      switch (typeFilter) {
        case 'All Time':
          res = await getUerRank(ChainId.BSC_TESTNET)
          data = res.userPoints
          break
        case 'Monthly':
          res = await getUserPointMonthly(ChainId.BSC_TESTNET, payloadPostForMonth)
          data = res.userPointMonthlies
          break
        case 'Weekly':
          res = await getUserPointWeekly(ChainId.BSC_TESTNET, payloadPostForWeek)
          data = res.userPointWeeklies
          break
        default:
          res = await getUserPointDaily(ChainId.BSC_TESTNET, payloadPostForDaily)
          data = res.userPointDailies
          break
      }

      const dataUserFormatAmount: IDataFormatUnit[] = data.map((item) => {
        return {
          ...item,
          id: item.id,
          point: new BigNumber(item.amount).div(10 ** USD_DECIMALS[ChainId.BSC_TESTNET]).toNumber(),
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
        break
      case 'Monthly':
        setListUserRanks(listUserRanksMonthly)

        break
      case 'Weekly':
        setListUserRanks(listUserRanksWeekly)
        break
      default:
        setListUserRanks(listUserRanksDaily)
        break
    }
  }

  useEffect(() => {
    handleGetUserRanks('All Time', setListUserRanksAllTime)
    handleGetUserRanks('Monthly', setListUserRanksMonthly)
    handleGetUserRanks('Weekly', setListUserRanksWeekly)
    handleGetUserRanks('Daily', setListUserRanksDaily)
  }, [])

  useEffect(() => {
    if (!listUserRanksAllTime) return
    handleOnChangeRankTab('All Time')
  }, [listUserRanksAllTime])

  return (
    <Wrapper sx={{ flexGrow: 1, display: 'flex' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <WrapperLeft data-aos="fade-right">
            <Container>
              <Overlay>
                <First>
                  <div className="tab_filter">
                    {Array.from(filterTime).map((item) => {
                      return (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                        <div
                          key={item}
                          onClick={() => handleOnChangeRankTab(item)}
                          className={tabLeaderBoard === item ? 'tab_item_active' : 'tab_item'}
                          style={{ cursor: 'pointer' }}
                        >
                          {item}
                        </div>
                      )
                    })}
                  </div>

                  <div className="learder_board">
                    {listUserRanks &&
                      listUserRanks.length > 0 &&
                      listUserRanks?.slice(0, 5).map((item: IMappingFormat, index: number) => {
                        // eslint-disable-next-line react/no-array-index-key
                        return <LeaderBoardItemLP item={item} key={`learder_item_${index}`} />
                      })}
                    {listUserRanks.length === 0 && <NoDataWraper>No data</NoDataWraper>}
                  </div>
                </First>
              </Overlay>
            </Container>
          </WrapperLeft>
        </Grid>
        <Grid item xs={12} md={1} />
        <Grid item xs={12} md={6}>
          <div className="ref_container" data-aos="fade-left">
            <p className="title_ref">Gamified Referral Program</p>
            <Paragraph className="description">
              Built to give back, the XOX Gamified Referral Program rewards both "The Referee" & "The Referrer" Earn
              Points that's are redeemable for BUSD/USDC after reaching different levels & milestones.
            </Paragraph>
            <div className="list">
              {listTag.map(({ title }) => {
                return (
                  <p key={title}>
                    <span>
                      <img src="/images/icon-stone.svg" alt="icon-stone" className="icon_stone" />
                    </span>
                    <span className="title_list_item">{title}</span>
                  </p>
                )
              })}
            </div>

            <button className="btn_join" onClick={() => route.push('#')}>
              Join Now
            </button>
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  )
}

const listTag = [
  {
    title: 'Connect',
  },
  {
    title: 'Refer',
  },
  {
    title: 'Earn Points',
  },
  {
    title: 'Level Up',
  },
  {
    title: 'Claim',
  },
  {
    title: 'Get BUSD/USDC',
  },
]

const listLeader = [
  {
    name: 'Ha Anh Tuan',
    point: '10293',
    avatar: 'https://ss-images.saostar.vn/wwebp700/pc/1668184763837/saostar-zniwtnewidjz7yhb.jpg',
    rank: 1,
  },
  {
    name: 'My Tam',
    point: '10200',
    avatar: 'https://danviet.mediacdn.vn/296231569849192448/2022/12/13/hen-uoc-tu-hu-vo-16709038452871766603715.jpg',
    rank: 2,
  },
  {
    name: 'Wade Warren',
    point: '10110',
    avatar: 'https://newsmd2fr.keeng.net/tiin/archive/images/296/202104/20210408/tinngan_115312_856826867_0.jpg',
    rank: 3,
  },
  {
    name: 'Wade Warren',
    point: '9000',
    avatar: 'https://ss-images.saostar.vn/wwebp700/pc/1668184763837/saostar-zniwtnewidjz7yhb.jpg',
    rank: 4,
  },
  {
    name: 'Wade Warren',
    point: '900',
    avatar: 'https://ss-images.saostar.vn/wwebp700/pc/1668184763837/saostar-zniwtnewidjz7yhb.jpg',
    rank: 5,
  },
]

export default FeatureReferal
