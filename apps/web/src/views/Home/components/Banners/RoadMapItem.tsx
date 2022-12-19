import { useEffect, useState } from 'react'
import styled from 'styled-components'
// eslint-disable-next-line import/no-cycle
import { IRoadMapItem } from './RoadMap'

interface Iprops {
  item: IRoadMapItem
  index: number
}

const ContainerItem = styled.div`
  width: 326px;
  height: fit-content;

  .title {
    font-weight: 700;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 16px;
  }

  .describe {
    font-weight: 400;
    font-size: 16px;
    line-height: 160%;
    color: #f2f2f2;
    overflow-wrap: break-word;
    width: 220px;
  }

  .item_main_content {
    display: flex;
    gap: 15px;
  }

  .icon_stone {
    margin-top: 6px;
  }

  .time {
    color: #9072ff;
  }

  .margin_top {
    margin-top: 30px;
  }

  .milestone {
    position: absolute;
    left: 0;
    z-index: 9;
  }
`

const Line = styled.div`
  width: 2px;
  height: 270px;
  position: absolute;
  left: 0;
  transform: translateX(-50%);
`

const LineNotDone = styled.div`
  height: 8px;
  width: 100%;
  transform: translateY(50%);
  left: 0;
  position: absolute;
  background: #5F35EB;
`

const LineDash = styled.div`
  border: none;
  width: 100%;
  height: 3px;
  left: 0;
  position: absolute;
  background-image: linear-gradient(to left, #9072ff 50%, black 50%);
  background-position: top;
  background-size: 30px 3px;
  background-repeat: repeat-x;
`

const Wrapper = styled.div`
  position: relative;
  height: 285px;
`

const RoadMapItem = ({ item, index }: Iprops) => {
  return (
    <Wrapper className={`timeline-item timeline-item-${index}`}>
      <ContainerItem>
        {item.status === 'done' ? <LineDash className="line_status" /> : <LineNotDone className="line_status" />}
        {item.status === 'done' ? (
          <img src="/images/mile_stone_done.svg" alt="milestone" className="milestone" />
        ) : item.status === 'processing' ? (
          <img src="/images/mile_stone_now.svg" alt="milestone" className="milestone" />
        ) : (
          <img src="/images/milestone.svg" alt="milestone" className="milestone" />
        )}
        <Line className="line" />
        <div className="item__main-content">
          <div className="title">
            {item.year} <span className="time">{item.quater}</span>
          </div>

          <div className="item_main_content">
            <div>
              <img src="/images/icon-stone.svg" alt="icon-stone" className="icon_stone" />
            </div>
            <div className="describe">{item.describeOne}</div>
          </div>

          <div className="item_main_content margin_top">
            <div>
              <img src="/images/icon-stone.svg" alt="icon-stone" className="icon_stone" />
            </div>
            <div className="describe">{item.describeTow}</div>
          </div>
        </div>
      </ContainerItem>
    </Wrapper>
  )
}

export default RoadMapItem
