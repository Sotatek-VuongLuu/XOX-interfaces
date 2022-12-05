import styled from 'styled-components'

// eslint-disable-next-line import/no-cycle
import { ISquareItem } from './FeatureSquare'

interface Iprops {
  item: ISquareItem
}

const Wrapper = styled.div`
  background: #242424;
  border-radius: 10px;
  width: 385px;
  padding: 24px 22px 32px;
`

const Title = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.87);
  margin-top: 32px;
`

const Description = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 16px 0;
  line-height: 24px;
`

const Icon = styled.div`
  background: linear-gradient(100.7deg, #6034ff 0%, #a35aff 100%);
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`

const Discover = styled.div`
  color: rgba(255, 255, 255, 0.87);
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
`

const SquareItem = ({ item }: Iprops) => {
  return (
    <Wrapper>
      <Icon>
        <img src={item.icon} alt="icon" />
      </Icon>
      <Title>{item.title}</Title>
      <Description>{item.description}</Description>

      <Discover>
        <span>Discover More</span>
        <img src="/images/next-icon.svg" alt="next-icon" style={{ marginLeft: 11 }} />
      </Discover>
    </Wrapper>
  )
}

export default SquareItem
