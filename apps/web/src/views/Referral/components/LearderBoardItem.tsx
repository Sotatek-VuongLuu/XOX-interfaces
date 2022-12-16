import { Avatar, Box } from '@mui/material'
import { useCallback } from 'react'
import styled from 'styled-components'
// eslint-disable-next-line import/no-cycle
import { IItemLeaderBoard } from './MainInfo'

interface IProps {
  item: IItemLeaderBoard
  mb?: boolean
}

const Wrapper = styled(Box)`
  .item_ranking {
    display: flex;
    align-items: center;
    gap: 16px;
    .ranking_top {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 52px;
    }

    .ranking {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      font-size: 12px;
      line-height: 15px;
      color: #ffffff;
      min-width: 52px;
    }

    .user_info {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 6px 40px 6px 6px;
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
        }
        .name {
          font-weight: 700;
          font-size: 14px;
          line-height: 17px;
          color: rgba(255, 255, 255, 0.87);
          margin-left: 8px;
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

  const renderRanking = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (rank: number) => {
      if (ranking.includes(rank)) {
        return (
          <div className="ranking_top">
            <img src={`/images/ranking_${rank}.svg`} alt="ranking" />
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
            <Avatar alt="Remy Sharp" src={item.avatar} />
            <p className={`${ranking.includes(item.rank) ? `ranking_name` : `name`}`}>{item.name}</p>
          </div>

          <div className="point">{item.point}</div>
        </div>
      </div>
    </Wrapper>
  )
}

export default LeaderBoardItem
