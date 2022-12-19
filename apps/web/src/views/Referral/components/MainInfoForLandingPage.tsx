/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Grid } from '@mui/material'
import { useState } from 'react'
import styled from 'styled-components'
import HowToJoin from './HowToJoin'
// eslint-disable-next-line import/no-cycle
import LearderBoardItemForLandingPage from './LearderBoardItemForLandingPage'
import PlatformStat from './PlatformStats'
import TotalEarned from './TotalEarned'

export interface IItemLeaderBoard {
  name: string
  point: string
  avatar: string
  rank: number
}

interface IPropsTotal {
  percentPoint?: number
}

const First = styled.div`
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

    .tab_item_active {
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
      border-radius: 4px;
      padding: 10px 20px;
      cursor: pointer;
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
    }

    .total_point_bar {
      background: #444444;
      border-radius: 30px;
      padding: 3px;

      .current_point_bar {
        background: linear-gradient(90deg, #fc6d40 0%, #fa9204 100%);
        border-radius: 30px;
        height: 18px;
        width: ${({ percentPoint }) => `${percentPoint}%`};

        span {
          font-weight: 700;
          font-size: 10px;
          line-height: 12px;
          text-align: center;
          margin-left: 6px;
          color: #ffffff;
        }
      }
    }
  }
`

const WrapperLeft = styled.div``

const WrapperRight = styled.div`
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    background: #242424;
    border-radius: 10px;
    padding: 24px;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    position: relative;

    .filter {
      display: flex;
      align-items: center;
      color: #ffffff;

      .subTab_item_active {
        padding: 10px 20px;
        background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
        border-radius: 4px;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
      }

      .subTab_item {
        padding: 10px 20px;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
      }
    }
  }
`

const MainInfo = () => {
  const [tabLeaderBoard, setTabLeaderBoard] = useState(0)
  const [subTabIndex, setSubTabIndex] = useState(0)
  const [leaderBoardList, setLeaderBoardList] = useState<Array<IItemLeaderBoard>>(listLeader)
  const totalPoint = 100000
  const currentPoint = 50000
  const percentPoint = (currentPoint / totalPoint) * 100
  const filterTime = ['All Time', 'Monthly', 'Weekly', 'Daily']
  const subTab = ['Total Earned', 'Platform Stats', 'How to Join']

  return (
    <Box sx={{ marginTop: '16px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <WrapperLeft>
            <First>
              <div className="tab_filter">
                {filterTime.map((item, index) => {
                  return (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <div
                      key={item}
                      onClick={() => setTabLeaderBoard(index)}
                      className={tabLeaderBoard === index ? 'tab_item_active' : 'tab_item'}
                    >
                      {item}
                    </div>
                  )
                })}
              </div>

              <div className="learder_board">
                {Array.from(leaderBoardList).map((item: IItemLeaderBoard, index: number) => {
                  // eslint-disable-next-line react/no-array-index-key
                  return <LearderBoardItemForLandingPage item={item} key={`learder_item_${index}`} />
                })}
              </div>

              <div className="dot">
                <div className="dot_item" />
                <div className="dot_item" />
                <div className="dot_item" />
              </div>

              <LearderBoardItemForLandingPage
                item={{
                  name: 'Ha Anh Tuan',
                  point: '10293',
                  avatar: 'https://ss-images.saostar.vn/wwebp700/pc/1668184763837/saostar-zniwtnewidjz7yhb.jpg',
                  rank: 100,
                }}
                mb={false}
              />
            </First>

            <Second percentPoint={percentPoint}>
              <div className="total_point">
                <p className="title">Your current total points</p>
                <div className="total_point_bar">
                  <div className="current_point_bar">
                    <span>
                      {currentPoint}/{totalPoint}
                    </span>
                  </div>
                </div>
              </div>
            </Second>
          </WrapperLeft>
        </Grid>
        <Grid item xs={12} md={7}>
          <WrapperRight>
            <div className="container">
              <div className="filter">
                {Array.from(subTab).map((item, index) => {
                  return (
                    <div
                      key={item}
                      onClick={() => setSubTabIndex(index)}
                      className={subTabIndex === index ? 'subTab_item_active' : 'subTab_item'}
                    >
                      {item}
                    </div>
                  )
                })}
              </div>

              {subTabIndex === 0 && <TotalEarned />}
              {subTabIndex === 1 && <PlatformStat />}
              {subTabIndex === 2 && <HowToJoin />}
            </div>
          </WrapperRight>
        </Grid>
      </Grid>
    </Box>
  )
}

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
    point: '9000',
    avatar: 'https://ss-images.saostar.vn/wwebp700/pc/1668184763837/saostar-zniwtnewidjz7yhb.jpg',
    rank: 5,
  },
]

export default MainInfo
