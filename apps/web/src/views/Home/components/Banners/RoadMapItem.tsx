import styled from 'styled-components'
// eslint-disable-next-line import/no-cycle
import { IRoadMapItem } from './RoadMap'

interface Iprops {
  item: IRoadMapItem
  index: number
}

interface IpropHightlight {
  isEven: boolean
}

const ContainerItem = styled.div`
  width: fit-content;
  position: relative;
  margin-bottom: 50px;
`

const BorderHightLight = styled.div<IpropHightlight>`
  width: 180px;
  height: fit-content;
  position: absolute;
  height: 168px;
  top: -15px;
  border-top: 6px solid #a35aff;
  border-bottom: 6px solid #a35aff;
  ${({ isEven }) =>
    !isEven
      ? `
  right: -14px;
  border-right: 6px solid #a35aff;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  border-image: repeating-linear-gradient(to right, black 0%, #a35aff 70%, #6034ff 100%) 10;
  `
      : `
  left: 0;
  border-left: 6px solid #a35aff;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  border-image: repeating-linear-gradient(to left, black 0%, #a35aff 70%, #6034ff 100%) 10;
  `}
`

const Item = styled.div<IpropHightlight>`
  padding: 23px 25px;
  width: 510px;
  background: #242424;
  border-radius: 8px;
  border: 1px solid #a35aff;

  ${({ isEven }) => isEven && `margin-left: 14px`};

  .title {
    font-weight: 700;
    font-size: 24px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 16px;
  }

  .describe {
    font-weight: 400;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
  }
`

const RoadMapItem = ({ item, index }: Iprops) => {
  function isEven(n: number) {
    return n % 2 === 0
  }

  return (
    <ContainerItem className="timeline-item">
      <BorderHightLight className="hightlight" isEven={isEven(index)} />
      <Item isEven={isEven(index)}>
        <div className="title">{item.title}</div>
        <div className="describe">{item.describe}</div>
      </Item>
      <span className="circle" />
      <span className="line" />
      <span className="arrow" />
    </ContainerItem>
  )
}

export default RoadMapItem
