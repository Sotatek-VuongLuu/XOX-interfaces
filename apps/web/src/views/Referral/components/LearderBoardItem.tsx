import { Avatar, Box } from '@mui/material'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import useWindowSize from 'hooks/useWindowSize'
import { useCallback } from 'react'
import styled from 'styled-components'
import { shortenAddress } from 'utils/shortenAddress'
// eslint-disable-next-line import/no-cycle
import { IItemLeaderBoard } from './MainInfoForLandingPage'

interface IProps {
  item: IItemLeaderBoard
  mb?: boolean
}

const Wrapper = styled(Box)`
  .item_ranking {
    display: flex;
    align-items: center;

    .ranking_top {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 42px;
      margin-right: 16px;

      @media screen and (max-width: 900px) {
        width: 40px;
        height: 40px;
        min-width: 40px;
        margin-right: 8px;
      }
    }

    .ranking {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      font-size: 12px;
      line-height: 15px;
      color: #ffffff;
      min-width: 42px;
      margin-right: 16px;

      @media screen and (max-width: 900px) {
        font-size: 12px;
        line-height: 15px;
        margin-right: 8px;
      }
    }

    .user_info {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 6px 17px 6px 6px;
      border-radius: 60px;
      align-items: center;

      .user_avatar_name {
        display: flex;
        align-items: center;

        .ranking_name {
          font-weight: 700;
          font-size: 14px;
          line-height: 17px;
          color: #424242;
          margin-left: 8px;

          @media screen and (max-width: 900px) {
            font-size: 12px;
            line-height: 15px;
          }
        }
        .name {
          font-weight: 700;
          font-size: 14px;
          line-height: 17px;
          color: rgba(255, 255, 255, 0.87);
          margin-left: 8px;

          @media screen and (max-width: 900px) {
            font-size: 12px;
            line-height: 15px;
          }
        }
      }

      .point {
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        text-align: right;
        background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;

        @media screen and (max-width: 900px) {
          font-size: 12px;
          line-height: 15px;
        }
      }

      @media screen and (max-width: 900px) {
        padding: 6px 17px 6px 6px;
      }
    }

    .bg_white {
      background: #ffffff;
    }

    .bg_rba {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`

const LeaderBoardItem = (props: IProps): JSX.Element => {
  const { item, mb = true } = props
  const ranking: Array<number> = [1, 2, 3]
  const { width } = useWindowSize()
  const renderRanking = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (rank: number) => {
      if (ranking.includes(rank)) {
        return (
          <div className="ranking_top">
            {width <= 900 ? (
              <img src={`/images/r_mb_${rank}.svg`} alt="ranking" />
            ) : (
              <img src={`/images/rank_ref_pc_${rank}.svg`} alt="ranking" />
            )}
          </div>
        )
      }

      return <div className="ranking">{rank}</div>
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <Wrapper sx={{ marginBottom: `${mb ? `16px` : ''}` }}>
      <div className="item_ranking">
        {renderRanking(item.rank)}

        <div className={`${ranking.includes(item.rank) ? `bg_white` : `bg_rba`} user_info`}>
          <div className="user_avatar_name">
            <Avatar alt="Remy Sharp" src={item.avatar} sx={{ height: 30, width: 30 }} />
            <p className={`${ranking.includes(item.rank) ? `ranking_name` : `name`}`}>
              {item.name ? item.name : shortenAddress(item.address)}
            </p>
          </div>

          <div className="point">{item.point}</div>
        </div>
      </div>
    </Wrapper>
  )
}

export default LeaderBoardItem
