import { Button } from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import moment from 'moment'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IVestingTime } from 'views/Vesting'

const Wrapper = styled.div`
  .total_vested {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 16px;
  }

  .btn_connect_container {
    width: 100%;
  }
`

const Content = styled.div`
  .sale-container-bottom {
    display: grid;
    grid-template-columns: 0.5fr 0.5fr 0.75fr 1fr 0.5fr;
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
    position: absolute;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #fb8618;
    margin-bottom: 21px;
  }

  .sale_item {
    padding: 16px 24px;
    position: relative;
    gap: 10px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
  }

  .sale_item_1 {
    margin: 16px 0px;
  }
  .amount_vested {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);
  }
  .title_vested {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.6);
  }

  .next_day {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 16px;
  }

  .over_flow {
    min-width: 1300px;
  }

  overflow-x: scroll;

  @media screen and (max-width: 900px) {
    .heading-sale {
      font-size: 14px;
      line-height: 17px;
    }

    .title_vested {
      font-size: 12px;
      line-height: 15px;
    }

    .amount_vested {
      font-size: 12px;
      line-height: 15px;
      margin-bottom: 8px;
    }
    .next_day {
      font-size: 12px;
      line-height: 15px;
      margin-bottom: 12px;
    }
    .sale_item {
      padding: 16px;
    }
  }
`

const CustomButtom = styled(Button)`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  padding: 12px 30px;

  @media screen and (max-width: 900px) {
    padding: 12px 20px;
    font-size: 14px;
    line-height: 17px;
  }
`

const Img = styled.img`
  object-fit: cover;
  border-radius: 50%;
  min-width: 31px;
  min-height: 30px;
  margin-right: 16px;
`

const SaleItem = ({
  item,
  index,
  handleClaim,
}: {
  item: IVestingTime
  index: number
  handleClaim: (round: number, remainning: number) => void
}) => {
  const [reacheZero, setReachZero] = useState<boolean>(false)
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    if (reacheZero) {
      // eslint-disable-next-line no-unused-expressions
      count < item.startTime.length - 1 && setCount(count + 1)
    }
    const id = setTimeout(() => setReachZero(false), 5000)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reacheZero])

  return (
    <div className={`sale_item sale_item_${index}`}>
      <div className="heading-sale">{item.title}</div>
      <div className="sale-container-bottom ">
        <div className="sale-schedule-item ">
          <p>
            <Img src="/images/1/tokens/xox_new_style.svg" alt="icon" height={30} width={30} className="token_first" />
          </p>
          <div>
            <p className="amount_vested">{item.amountVested}</p>
            <p className="title_vested">Vested</p>
          </div>
        </div>
        <div className="sale-schedule-item">
          <p>
            <Img src="/images/1/tokens/xox_new_style.svg" alt="icon" height={30} width={30} className="token_first" />
          </p>
          <div>
            <p className="amount_vested">{item.remaining}</p>
            <p className="title_vested">Remaining</p>
          </div>
        </div>
        <div className="sale-schedule-item">
          <p>
            <Img src="/images/1/tokens/xox_new_style.svg" alt="icon" height={30} width={30} className="token_first" />
          </p>
          <div>
            <p className="amount_vested">{item.yourCurrentXOX}</p>
            <p className="title_vested">Your current XOX token</p>
          </div>
        </div>
        <div className="sale-schedule-item flex-col">
          <p className="next_day">
            Next unlocking date:{' '}
            {item.startTime.length !== 0 ? moment.unix(item.startTime[count] / 1000).format('MM/DD/YYYY') : ' -/-/-'}
          </p>
          <p>
            <CountDown startTime={item.startTime[count]} setReachZero={setReachZero} />
          </p>
        </div>
        <div className="sale-schedule-item">
          <CustomButtom
            type="button"
            onClick={() => handleClaim(item.round, item.yourCurrentXOX)}
            disabled={item.yourCurrentXOX === 0}
          >
            Claim
          </CustomButtom>
        </div>
      </div>
    </div>
  )
}

interface Props {
  startTime: any
  setReachZero?: (isReached: boolean) => void
}

const handleTime = (time: number) => {
  return time < 10 ? `0${time}` : time
}

const WrapperTime = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 12px;
  .item_time {
    position: relative;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 10px;
    width: 81px;
    height: 65px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .name_time {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: rgba(255, 255, 255, 0.6);
    }

    .number_time {
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.87);
    }
    .corner1 {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50%;
      height: 20px;
      border-radius: 10px;
      z-index: 1;
      border-bottom: 2px solid #ffffff30;
      border-left: 2px solid #ffffff30;
      border-bottom-right-radius: unset;
      border-top-left-radius: unset;
    }

    .edge1 {
      width: 2px;
      height: calc(100% - 26px);
      position: absolute;
      bottom: 20px;
      left: 0;
      z-index: 1;
      background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
    }

    .corner2 {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 50%;
      height: 20px;
      border-radius: 10px;
      z-index: 1;
      border-bottom: 2px solid #ffffff30;
      border-right: 2px solid #ffffff30;
      border-bottom-left-radius: unset;
      border-top-right-radius: unset;
    }

    .edge2 {
      width: 2px;
      height: calc(100% - 26px);
      position: absolute;
      bottom: 20px;
      right: 0;
      z-index: 1;
      background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
    }

    @media screen and (max-width: 900px) {
      width: 66px;
      height: 59px;
      gap: 8px;

      .number_time {
        font-size: 20px;
        line-height: 24px;
      }

      .name_time {
        font-size: 12px;
        line-height: 15px;
      }
    }
  }
  @media screen and (max-width: 900px) {
    gap: 8px;
  }
`

const CountDown = ({ startTime, setReachZero }: Props) => {
  const [timeList, setTimeList] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const timeStart = Math.floor(new Date(startTime).getTime()) / 1000

  const NOW = Date.now() / 1000

  const periodTime = Math.floor(timeStart - NOW)

  const handleCountDown = () => {
    const days = Math.floor(periodTime / (3600 * 24))
    const hours = Math.floor((periodTime - days * 3600 * 24) / 3600)
    const minutes = Math.floor((periodTime % 3600) / 60)
    const seconds = periodTime - days * 3600 * 24 - hours * 3600 - minutes * 60
    setTimeList({ ...timeList, days, hours, minutes, seconds })
  }

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (Math.floor(periodTime) >= 0) {
      const refreshInterval = setInterval(handleCountDown, 1000)
      return () => clearInterval(refreshInterval)
    }
    if (setReachZero) {
      const ngu = Date.now()
      if (ngu >= startTime) {
        setReachZero(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeList, timeStart, setReachZero])

  const renderTitleTime = (key: any) => {
    switch (key) {
      case 0:
        return 'Days'
      case 1:
        return 'Hours'
      case 2:
        return 'Minutes'
      default:
        return 'Seconds'
    }
  }

  return (
    <WrapperTime>
      {Array.from(Object.values(timeList)).map((item, index) => {
        return (
          <div className="item_time">
            <div className="corner1" />
            <div className="edge1" />
            <div className="corner2" />
            <div className="edge2" />
            <div className="number_time">{handleTime(item)}</div>
            <div className="name_time">{renderTitleTime(index)}</div>
          </div>
        )
      })}
    </WrapperTime>
  )
}

function VestingSchedule({
  dataVesting,
  handleClaim,
}: {
  dataVesting: IVestingTime[]
  handleClaim: (round: number, remainning: number) => void
}) {
  const { account } = useActiveWeb3React()

  return (
    <Wrapper>
      {!account && (
        <div className="btn_connect_container">
          <ConnectWalletButton scale="sm" style={{ whiteSpace: 'nowrap' }}>
            <span>Connect Wallet</span>
          </ConnectWalletButton>
        </div>
      )}
      {account && (
        <>
          <div className="total_vested">Total vested at this time: 2,000</div>
          <Content>
            <div className="over_flow">
              {Array.from(dataVesting).map((item: IVestingTime, index) => {
                return <SaleItem item={item} index={index} handleClaim={handleClaim} />
              })}
            </div>
          </Content>
        </>
      )}
    </Wrapper>
  )
}

export default VestingSchedule
