import { useEffect, useState } from 'react'
import styled from 'styled-components'

const CountDownWrapper = styled.div`
  display: flex;
  justify-content: center;

  div {
    color: white;
  }
`

interface Props {
  startTime: any
}

const handleTime = (time: number) => {
  return time < 10 ? `0 ${time}` : time
}

// const timeStart = 1665892723
const CountDown = ({ startTime }: Props) => {
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
    if (Math.floor(periodTime) > 0) {
      const refreshInterval = setInterval(handleCountDown, 1000)
      return () => clearInterval(refreshInterval)
    }
  }, [timeList, timeStart])

  return (
    <CountDownWrapper>
      <div>
        <div>{handleTime(timeList.days)}</div>
        <div>Days</div>
      </div>

      <div>
        <div>{handleTime(timeList.hours)}</div>
        <div>hours</div>
      </div>

      <div>
        <div>{handleTime(timeList.minutes)}</div>
        <div>mins</div>
      </div>

      <div>
        <div>{handleTime(timeList.seconds)}</div>
        <div>secs</div>
      </div>
    </CountDownWrapper>
  )
}

export default CountDown
