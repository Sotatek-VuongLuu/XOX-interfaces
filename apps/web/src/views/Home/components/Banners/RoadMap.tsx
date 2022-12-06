import styled from 'styled-components'
// eslint-disable-next-line import/no-cycle
import RoadMapItem from './RoadMapItem'

export interface IRoadMapItem {
  title: string
  describeOne: string
  describeTow: string
  time: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .main {
    margin-top: 48px;
    height: 570px;
    display: flex;

    .timeline-item:nth-child(even) {
      align-self: flex-start;
      .line {
        background: linear-gradient(180deg, #000000 0%, #9072ff 100%);
        bottom: -24%;
      }
      .milestone {
        bottom: -30%;
      }

      .line_not_done {
        bottom: -26%;
      }
    }

    .timeline-item:nth-child(odd) {
      align-self: flex-end;
      .line {
        background: linear-gradient(0deg, #000000 0%, #9072ff 100%);
        top: -34%;
      }
      .milestone {
        top: -40%;
      }
      .line_not_done {
        top: -36%;
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

      <div className="main">
        {listRoadMap.map((item: IRoadMapItem, index) => {
          return <RoadMapItem item={item} index={index + 1} />
        })}
      </div>
    </Wrapper>
  )
}

const listRoadMap = [
  {
    title: '2022',
    describeOne: 'Looking for & close deal with the very first investors & backers to get initial funds for project',
    describeTow: 'Start contract for development',
    time: 'Q2',
  },
  {
    title: '2022',
    describeOne: 'Looking for & close deal with the very first investors & backers to get initial funds for project',
    describeTow: 'Start contract for development',
    time: 'Q3',
  },
  {
    title: '2022',
    describeOne: 'Looking for & close deal with the very first investors & backers to get initial funds for project',
    describeTow: 'Start contract for development',
    time: 'Q4',
  },
  {
    title: '2023',
    describeOne: 'Looking for & close deal with the very first investors & backers to get initial funds for project',
    describeTow: 'Start contract for development',
    time: 'Q1',
  },
  {
    title: '2023',
    describeOne: 'Looking for & close deal with the very first investors & backers to get initial funds for project',
    describeTow: 'Start contract for development',
    time: 'Q2',
  },
]

export default RoadMap
