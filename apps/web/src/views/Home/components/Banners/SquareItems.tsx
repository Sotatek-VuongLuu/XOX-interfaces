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

  .main_container {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;

    .get_xox {
      padding: 1px;
      width: fit-content;
      border-radius: 8px;
      background-image: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);

      .boxed-child {
        width: 100%;
        height: 100%;
        background-color: #242424;
        padding: 10px 20px;
        border-radius: inherit;
        span {
          background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          font-weight: 700;
          font-size: 14px;
          width: 100%;
          height: 100%;
          background-color: #191a28;
          border-radius: inherit;
        }
      }
    }
  }
`

const Title = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.87);
  margin-top: 32px;
  line-height: 25px;
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
      <div className="main_container">
        <div>
          <Icon>
            <img src={item.icon} alt="icon" />
          </Icon>
          <Title>{item.title}</Title>
          <Description>{item.description}</Description>
        </div>

        <div className="get_xox">
          <div className="boxed-child">
            <span>Discover More</span>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default SquareItem
