/* eslint-disable @next/next/no-img-element */
import {
  Avatar,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { userPoint, userClaimedHistories, pointDataDays } from 'services/referral'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { formatBigNumber } from '@pancakeswap/utils/formatBalance'
import { BigNumber } from '@ethersproject/bignumber'
import moment from 'moment'
import styled from 'styled-components'
import ColumnChartRef from './components/ColumnChartRef'

interface IVolumnDataItem {
  volumn: string
  title: string
  svg: string
}

const Wrapper = styled(Box)`
  .first {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 20px;

    .chart_container {
      display: flex;
      & > div:first-child {
        margin-right: 20px;
      }
    }

    .info_volumn {
      display: flex;
      width: 100%;
      justify-content: space-between;
      gap: 17px;
      .info_volumn_item {
        padding: 16px 17px;
        background: #303030;
        border-radius: 6px;
        width: 100%;
        // height: 126px;

        .volumn {
          font-weight: 700;
          font-size: 20px;
          line-height: 24px;
          color: rgba(255, 255, 255, 0.87);
          margin: 14px 0 8px;
        }

        .title {
          font-weight: 400;
          font-size: 12px;
          line-height: 15px;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
    @media screen and (max-width: 900px) {
      flex-direction: column;
      .chart_container {
        width: 100%;
        justify-content: space-between;
      }
      .info_volumn {
        flex-direction: column;
        width: 100%;

        .info_volumn_item {
          margin: 16px 0px;
          width: 100%;
          display: grid;
          grid-template-columns: auto;
          height: fit-content;
          .volumn {
            font-size: 18px;
            line-height: 22px;
          }
          .title {
            font-size: 12px;
            line-height: 15px;
          }
        }
      }
    }
  }

  .second {
    margin-top: 20px;
  }

  .third {
    .range_volumn {
      display: flex;
      justify-content: space-between;
      margin: 19px 0 5px;
      span {
        font-weight: 400;
        font-size: 10px;
        line-height: 12px;
        text-align: center;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  .fourth {
    .noted {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      color: rgba(255, 255, 255, 0.6);

      span {
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.87);
      }

      @media screen and (max-width: 900px) {
        text-align: center;

        span {
          font-size: 18px;
          line-height: 22px;
        }
      }
    }
  }
`

const PlatformStat = (props: any): JSX.Element => {
  const { listPoint } = props
  const { chainId } = useActiveWeb3React()
  const [volumnData, setVolumnData] = useState<Array<IVolumnDataItem>>(listData)
  const [userClaimHistories, setUserClaimHistories] = useState([])
  const [dataChart, setDataChart] = useState([])
  const [minAmount, setMinAmount] = useState('')
  const [middleAmount, setMiddleAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')

  const getUserPoint = async () => {
    const result = await userPoint(chainId)
    if (result && result.analysisDatas && result.analysisDatas.length > 0) {
      const totalReward = formatBigNumber(BigNumber.from(result.analysisDatas[0]?.total_reward))
      const totalClaimedAmount = formatBigNumber(BigNumber.from(result.analysisDatas[0]?.total_claimed_amount))
      const totalUnClaimed = Number(totalReward) - Number(totalClaimedAmount)
      listData[0].volumn = result.analysisDatas[0]?.number_of_referral
      listData[1].volumn = totalUnClaimed.toFixed(1)
      listData[2].volumn = formatBigNumber(BigNumber.from(result.analysisDatas[0]?.total_claimed_amount))
      listData[3].volumn = result.analysisDatas[0]?.total_transactions.toString()
      listData[4].volumn = formatBigNumber(BigNumber.from(result.analysisDatas[0]?.total_reward))
      setVolumnData(listData)
    }
  }
  const getUserClaimedHistories = async () => {
    const result = await userClaimedHistories(chainId)
    if (result) {
      const histories = result.userClaimedHistories.map(async (item: any, idx: number) => {
        const mappingUser = await mapingHistories(item.address)
        const userAvatar = mappingUser.avatar
        return createData(
          idx + 1,
          userAvatar,
          mappingUser?.username,
          moment(item.date * 1000).format('DD/MM/YYYY hh:mm:ss'),
          mapPoint(formatBigNumber(BigNumber.from(item.amount))),
          formatBigNumber(BigNumber.from(item.amount)),
        )
      })
      const lastResponse = await Promise.all(histories)
      setUserClaimHistories(lastResponse)
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
      const chartData =  createArray(startDate, endDate, arr)
      const data = chartData.map((item: any) => {
        return createDataChartDay(
          moment(item.date*1000).format('DD MMM'),
          parseFloat(formatBigNumber(BigNumber.from(item.amount))),
        )
      })
      setMinAmount(data[0].uv.toString())
      setMiddleAmount(data[Math.floor(data.length / 2)].uv.toString())
      setMaxAmount(data[data.length - 1].uv.toString())
      setDataChart(data)
    }
  }
  const createArray = (from : Date, to : Date, subGraphData: any) => {
    const start = new Date(moment(from).format('MM/DD/YYYY'));
    const end = new Date(moment(to).format('MM/DD/YYYY'));
    const chartData = [];
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        const loopDay = new Date(d);
        loopDay.setHours(23);
        loopDay.setMinutes(59)
        loopDay.setSeconds(59);
        const dataByDay = {date: moment(loopDay).unix() , amount: 0};
        const dateInterger = Math.ceil(moment(loopDay).unix() / 86400);

        const findData = subGraphData.find(x =>  {
          return x.id === dateInterger.toString()
        });
        dataByDay.amount = findData ? findData.amount : 0;
        chartData.push(dataByDay);
    }
    return chartData;
  }

  const mapPoint = (amount: string) => {
    for (let i = 0; i <= listPoint.length; i++) {
      if (Number(amount) <= listPoint[i].reward && Number(amount) < listPoint[i + 1].reward) {
        return listPoint[i].point
      }
    }
    return ''
  }
  const mapingHistories = async (address: string) => {
    const payload = {
      wallets: [`${address}`],
    }
    const result: any = await axios
      .post(`${process.env.NEXT_PUBLIC_API}/users/address/mapping`, payload)
      .catch((error) => {
        console.warn(error)
      })
    const data = result?.data[0]
    return data
  }
  function createData(no: number, avatar: string, name: string, time: string, point: string, claim: string) {
    return { no, avatar, name, time, point, claim }
  }
  function createDataChartDay(name: string, uv: number) {
    return { name, uv }
  }

  useEffect(() => {
    getUserPoint()
    getUserClaimedHistories()
    getPointDataDays()
  }, [])
  return (
    <Wrapper sx={{}}>
      <div className="first">
        <div className="info_volumn">
          {Array.from(volumnData).map((item) => {
            return (
              <div className="info_volumn_item" key={item.title}>
                <div>
                  <img src={item.svg} alt="item" />
                </div>
                <div className="volumn">{item.volumn}</div>
                <div className="title">{item.title}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="second">
        <TableContainer component={Paper} sx={{ height: 160, background: '#303030' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ position: 'sticky', top: 0, zIndex: 1, background: '#303030' }}>
              <TableRow
                sx={{
                  '& td, & th': {
                    borderBottom: '1px solid #444444',
                    fontWeight: 700,
                    fontSize: 14,
                    color: ' rgba(255, 255, 255, 0.6)',
                  },
                }}
              >
                <TableCell>No</TableCell>
                <TableCell align="left">User Name</TableCell>
                <TableCell align="left">Time</TableCell>
                <TableCell align="left">Point Level</TableCell>
                <TableCell align="right">Claimed Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userClaimHistories.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    '& td, & th': { border: 0, fontWeight: 400, fontSize: 14, color: ' rgba(255, 255, 255, 0.87)' },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.no}
                  </TableCell>
                  <TableCell align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={row.avatar}
                      sx={{ marginRight: '8px', height: '24px', width: '24px' }}
                    />
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.time}</TableCell>
                  <TableCell align="left">{row.point} points</TableCell>
                  <TableCell align="right">{row.claim}$</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="third">
        <div className="range_volumn">
          <span className="min">{minAmount}</span>
          <span className="middle">{middleAmount}</span>
          <span className="max">{maxAmount}</span>
        </div>
        <ColumnChartRef data={dataChart} />
      </div>

      <div className="fourth">
        <p className="noted">Daily reward generated by users</p>
      </div>
    </Wrapper>
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

export default PlatformStat
