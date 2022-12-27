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
import { formatBigNumber } from '@pancakeswap/utils/formatBalance'
import { BigNumber } from '@ethersproject/bignumber'
import moment from 'moment'
import styled from 'styled-components'
import ChartRef from './components/ChartRef'
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
      & > div:nth-child(2) {
        margin: 0 20px;
      }

      .info_volumn_item {
        padding: 16px 17px;
        background: #303030;
        border-radius: 6px;
        width: 142px;
        height: 126px;

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
        & > div:nth-child(2) {
          margin: 16px 0px;
        }
        .info_volumn_item {
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

const PlatformStat = (): JSX.Element => {
  const chainId = 97
  const [volumnData, setVolumnData] = useState<Array<IVolumnDataItem>>([])
  const [userClaimHistories, setUserClaimHistories] = useState([])
  const [dataChart, setDataChart] = useState([])
  const [minAmount, setMinAmount] = useState('')
  const [middleAmount, setMiddleAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')

  const getUserPoint = async () => {
    const result = await userPoint(chainId)
    if (result) {
      listData[0].volumn = result.analysisDatas[0]?.number_of_referral
      listData[1].volumn = formatBigNumber(BigNumber.from(result.analysisDatas[0]?.total_amount))
      listData[2].volumn = formatBigNumber(BigNumber.from(result.analysisDatas[0]?.total_claimed_amount))

      setVolumnData(listData)
    }
  }
  const getUserClaimedHistories = async () => {
    const result = await userClaimedHistories(chainId)
    if (result) {
      const histories = result.userClaimedHistories.map(async (item: any, idx: number) => {
        const mappingUser = await mapingHistories(item.id)
        return createData(
          idx + 1,
          mappingUser.avatar ?? 'https://ss-images.saostar.vn/wwebp700/pc/1668184763837/saostar-zniwtnewidjz7yhb.jpg',
          mappingUser.username,
          moment(item.data).format('DD/MM/YYYY hh:mm:ss'),
          100,
          formatBigNumber(BigNumber.from(item.amount)),
        )
      })
      const lastResponse = await Promise.all(histories)
      setUserClaimHistories(lastResponse)
    }
  }
  const getPointDataDays = async () => {
    const result = await pointDataDays(chainId)
    if (result) {
      const arr = result.pointDataDays;
      setMinAmount(formatBigNumber(BigNumber.from(arr[0].amount)))
      setMiddleAmount(formatBigNumber(BigNumber.from(arr[Math.floor(arr.length/2)].amount)))
      setMaxAmount(formatBigNumber(BigNumber.from(arr[arr.length-1].amount)))
      const data = arr.map((item: any) => {
          return createDataChartDay(
            moment(item.date * 1000).format('DD MMM'),
            formatBigNumber(BigNumber.from(item.amount)),
          )
        })
      setDataChart(data)
    }
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
  function createData(no: number, avatar: string, name: string, time: string, point: number, claim: string) {
    return { no, avatar, name, time, point, claim }
  }
  function createDataChartDay(name: string, uv: string) {
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
        <div className="chart_container">
          <ChartRef name="Claim" percent={25} />
          <ChartRef
            name="UnClaimed"
            percent={25}
            cx={35}
            color={['rgba(255, 189, 60, 0.5)', '#FFBD3C', 'rgba(255, 255, 255, 0.1)']}
          />
        </div>

        <div className="info_volumn">
          {Array.from(volumnData).map((item, index) => {
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
            <TableHead>
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
        <p className="noted">
           Daily reward generated by users
        </p>
      </div>
    </Wrapper>
  )
}

const listData = [
  {
    volumn: '',
    title: 'Number of Referral Participants',
    svg: '/images/claim_up.svg',
  },
  {
    volumn: '',
    title: 'Total Money Unclaimed',
    svg: '/images/claim_down.svg',
  },
  {
    volumn: '',
    title: 'Total Money Claimed',
    svg: '/images/claim_up.svg',
  },
]

export default PlatformStat
