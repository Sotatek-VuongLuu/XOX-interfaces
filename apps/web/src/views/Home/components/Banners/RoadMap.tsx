import styled from 'styled-components'
// eslint-disable-next-line import/no-cycle
import RoadMapItem from './RoadMapItem'

export interface IRoadMapItem {
  title: string
  describe: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .main {
    margin: 48px auto 0;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    position: relative;

    &::after {
      background-color: #9072ff;
      content: '';
      position: absolute;
      left: calc(50% - 2px);
      width: 4px;
      height: 100%;
    }

    .timeline-item {
      display: flex;
      justify-content: flex-end;
      position: relative;
    }

    .timeline-item {
      .circle {
        background-color: #9072ff;
        border: 3px solid #9072ff;
        border-radius: 50%;
        position: absolute;
        top: calc(50% - 10px);
        right: -100px;
        width: 20px;
        height: 20px;
        z-index: 100;
      }
      .line {
        border: 1px dashed #9072ff;
        height: 1px;
        width: 78px;
        position: absolute;
        top: calc(50% - 2px);
        right: -100px;
        z-index: 100;
      }

      .arrow {
        border: 6px solid;
        border-color: transparent #9072ff transparent transparent;
        position: absolute;
        top: calc(50% - 7px);
        right: -20px;
        z-index: 100;
      }
    }

    .timeline-item:nth-child(even) {
      align-self: flex-end;
      justify-content: flex-start;
      padding-right: 0;
    }

    .timeline-item:nth-child(even) {
      .circle {
        right: auto;
        left: -86px;
      }

      .line {
        right: auto;
        left: -84px;
      }

      .arrow {
        right: auto;
        left: -6px;
        border-color: transparent transparent transparent #9072ff;
      }
    }
  }
`

const Description = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.87);
  text-align: center;
`

const Title = styled.div`
  font-weight: 700;
  font-size: 36px;
  color: rgba(255, 255, 255, 0.87);
  text-align: center;
  margin-bottom: 16px;
`

const RoadMap = () => {
  return (
    <Wrapper>
      <Title>Road map</Title>
      <Description>Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis.</Description>
      <div className="main_container">
        <div className="main">
          {listRoadMap.map((item: IRoadMapItem, index) => {
            return <RoadMapItem item={item} index={index + 1} />
          })}
        </div>
      </div>
    </Wrapper>
  )
}

const listRoadMap = [
  {
    title: 'Q1 2022',
    describe:
      'Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis. Morbi sed aliquet donec  facilisis. Senectus eget.',
  },
  {
    title: 'Q2 2022',
    describe:
      'Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis. Morbi sed aliquet donec  facilisis. Senectus eget.',
  },
  {
    title: 'Q3 2022',
    describe:
      'Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis. Morbi sed aliquet donec  facilisis. Senectus eget.',
  },
  {
    title: 'Q4 2022',
    describe:
      'Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis. Morbi sed aliquet donec  facilisis. Senectus eget.',
  },
]

export default RoadMap
