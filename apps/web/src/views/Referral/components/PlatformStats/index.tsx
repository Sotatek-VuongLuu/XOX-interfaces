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
import { height } from '@mui/system'
import { useState } from 'react'
import styled from 'styled-components'
import ChartRef from './components/ChartRef'
import ColumnChartRef from './components/ColumnChartRef'

interface IVolumnDataItem {
  volumn: number
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
      gap: 20px;
    }

    .info_volumn {
      display: flex;
      gap: 16px;

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
  }

  .second {
    margin-top: 20px;
  }

  .third {
    .range_volumn {
      display: flex;
      justify-content: space-between;
      margin: 19px 0 8px;
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
      margin-top: 5px;
      span {
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.87);
      }
    }
  }
`

const PlatformStat = (): JSX.Element => {
  const [volumnData, setVolumnData] = useState<Array<IVolumnDataItem>>(listData)

  function createData(no: number, avatar: string, name: string, time: string, point: number, claim: number) {
    return { no, avatar, name, time, point, claim }
  }

  const rows = [
    createData(
      1,
      'https://ss-images.saostar.vn/wwebp700/pc/1668184763837/saostar-zniwtnewidjz7yhb.jpg',
      'Ha Anh Tuan',
      '24/11/2022 10:30:00',
      10293,
      100,
    ),
  ]

  return (
    <Wrapper sx={{}}>
      <div className="first">
        <div className="chart_container">
          <ChartRef name="Claim" percent={25} />
          <ChartRef name="Claim" percent={25} />
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
        <TableContainer component={Paper} sx={{ height: 190, background: '#303030' }}>
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
              {rows.map((row) => (
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
          <span className="min">123456</span>
          <span className="middle">654321</span>
          <span className="max">678910</span>
        </div>
        <ColumnChartRef />
      </div>

      <div className="fourth">
        <p className="noted">
          <span>1234</span> Daily reward generated by users
        </p>
      </div>
    </Wrapper>
  )
}

const listData = [
  {
    volumn: 1234,
    title: 'Number of Referral Participants',
    svg: '/images/claim_up.svg',
  },
  {
    volumn: 124,
    title: 'Total Money Unclaimed',
    svg: '/images/claim_down.svg',
  },
  {
    volumn: 3211,
    title: 'Total Money Claimed',
    svg: '/images/claim_up.svg',
  },
]

export default PlatformStat
