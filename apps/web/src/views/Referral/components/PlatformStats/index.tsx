/* eslint-disable react/no-array-index-key */
/* eslint-disable @next/next/no-img-element */
import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import styled from 'styled-components'
import ColumnChartRef from './components/ColumnChartRef'

interface IVolumnDataItem {
  volumn: string
  title: string
  svg: string
}
interface IPropsItem {
  volumnData?: IVolumnDataItem[]
  userClaimHistories?: any[]
  dataChart?: any[]
  minAmount?: string
  middleAmount?: string
  maxAmount?: string
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
const Line = styled.div`
  position: absolute;
  top: 56px;
  background: #444444;
  width: 99%;
  height: 1px;
  z-index: 99;
  @media screen and (max-width: 425px) {
    width: 97%;
  }
`
const PlatformStat = (props: IPropsItem): JSX.Element => {
  const { isMobile } = useMatchBreakpoints()
  const { volumnData, userClaimHistories, dataChart, minAmount, middleAmount, maxAmount } = props

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

      <div className="second" style={{ position: 'relative' }}>
        <TableContainer
          component={Paper}
          sx={isMobile ? { height: '300px', background: '#303030' } : { height: '160px', background: '#303030' }}
        >
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
                <TableCell style={{ minWidth: '190px' }} align="left">
                  Time
                </TableCell>
                <TableCell style={{ minWidth: '120px' }} align="left">
                  Point Level
                </TableCell>
                <TableCell style={{ minWidth: '155px' }} align="right">
                  Claimed Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userClaimHistories.map((row, index) => (
                <TableRow
                  key={`${row.name}_${index}`}
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
                    <Tooltip title={row?.name}>
                      <p>
                        {row.name?.length > 9
                          ? `${row.name.substring(0, 7)}...${row.name.substring(row.name.length - 2)}`
                          : row.name}
                      </p>
                    </Tooltip>
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

export default PlatformStat
