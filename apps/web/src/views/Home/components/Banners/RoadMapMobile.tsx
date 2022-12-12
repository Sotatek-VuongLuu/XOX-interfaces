/* eslint-disable import/no-cycle */
import styled from 'styled-components'
import { listRoadMap } from './RoadMap'

const Wrapper = styled.div`
  margin: 40px auto 0;
  .item_container {
    display: flex;
    position: relative;
    .line_milestone {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .title {
      font-weight: 700;
      font-size: 24px;
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

    .title_content {
      margin-left: 40px;
      margin-bottom: 40px;
    }

    .margin_top {
      margin-top: 30px;
    }

    &::before {
      content: '';
      height: 2px;
      width: 36px;
      background: linear-gradient(-120deg, #000000 0%, #290c46 38.1%, #9072ff 100%);
      position: absolute;
      left: 7%;
      top: 4%;
    }
  }

  .child_1_th {
    margin-left: -10px;
    .title_content {
      margin-top: 10px;
    }
    &::before {
      top: 8%;
      left: 11%;
    }
  }

  .child_2_th {
    margin-left: -10px;
    .title_content {
      margin-top: 10px;
    }
    &::before {
      top: 8%;
      left: 11%;
    }
  }

  .child_3_th {
    margin-left: -16px;
    .title_content {
      margin-top: 20px;
    }
    &::before {
      top: 10%;
      left: 12.5%;
    }
  }
`

const LineDash = styled.div`
  height: 100%;
  border-left: 4px dashed #9072ff;
`

const LineNotDash = styled.div`
  height: 100%;
  border-left: 4px solid #9072ff;
`

const RoadMapMobile = () => {
  return (
    <Wrapper>
      <div className="main_content">
        {listRoadMap.map((item, index) => {
          return (
            <div className={`item_container child_${index + 1}_th`}>
              <div className="line_milestone">
                {item.status === 'done' ? (
                  <img src="/images/mile_stone_done.svg" alt="milestone" />
                ) : item.status === 'processing' ? (
                  <img src="/images/mile_stone_now.svg" alt="milestone" />
                ) : (
                  <img src="/images/milestone.svg" alt="milestone" />
                )}

                {item.status === 'done' ? <LineDash className="line_status" /> : <LineNotDash />}
              </div>

              <div className="title_content">
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
            </div>
          )
        })}
      </div>
    </Wrapper>
  )
}

export default RoadMapMobile
