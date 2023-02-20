import styled from 'styled-components'
import CountDown from '../CountDown'

const Wrapper = styled.div``

const Content = styled.div`
  .sale-container-bottom {
    display: grid;
    grid-template-columns: 0.5fr 0.5fr 0.5fr 1fr 0.5fr;
    gap: 30px;
    .sale-schedule-item {
      display: flex;
      align-items: center;
    }
    .sale-schedule-item.flex-col {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .heading-sale {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 20px;
      left: 0px;
      width: 40px;
      height: 4px;
      background: linear-gradient(100.7deg, rgb(100, 115, 255) 0%, rgb(163, 90, 255) 100%);
    }
  }
`

const Img = styled.img`
  object-fit: cover;
  border-radius: 50%;
`

const SaleItem = ({ item }) => {
  return (
    <div>
      <div className="heading-sale">{item.title}</div>
      <div className="sale-container-bottom">
        <div className="sale-schedule-item">
          <p>
            <Img src="/images/1/tokens/xox_token_pair.svg" alt="icon" height={30} width={30} className="token_first" />
          </p>
          <div>
            <p>{item.amountVested}</p>
            <p>Vested</p>
          </div>
        </div>
        <div className="sale-schedule-item">
          <p>
            <Img src="/images/1/tokens/xox_token_pair.svg" alt="icon" height={30} width={30} className="token_first" />
          </p>
          <div>
            <p>{item.remaining}</p>
            <p>Remaining</p>
          </div>
        </div>
        <div className="sale-schedule-item">
          <p>
            <Img src="/images/1/tokens/xox_token_pair.svg" alt="icon" height={30} width={30} className="token_first" />
          </p>
          <div>
            <p>{item.remaining}</p>
            <p>Your current XOX token</p>
          </div>
        </div>
        <div className="sale-schedule-item flex-col">
          <p>Next unlocking date: 02/15/2023</p>
          <p>
            <CountDown startTime={item.startTime} />
          </p>
        </div>
        <div className="sale-schedule-item">
          <button type="button">Claim</button>
        </div>
      </div>
    </div>
  )
}

const vestingTiming: any[] = [
  {
    title: 'Sale 1',
    amountVested: 0,
    remaining: 0,
    yourCurrentXOX: 0,
    startTime: 1679276974000,
    statusClaim: false,
  },
  {
    title: 'Sale 2',
    amountVested: 0,
    remaining: 0,
    yourCurrentXOX: 0,
    startTime: 1679276974000,
    statusClaim: false,
  },
  {
    title: 'Sale 3',
    amountVested: 0,
    remaining: 0,
    yourCurrentXOX: 0,
    startTime: 1679276974000,
    statusClaim: false,
  },
]
function VestingSchedule() {
  return (
    <Wrapper>
      <Content>
        <div>Total vested at this time: 2,000</div>

        {Array.from(vestingTiming).map((item) => {
          return <SaleItem item={item} />
        })}
      </Content>
    </Wrapper>
  )
}

export default VestingSchedule
