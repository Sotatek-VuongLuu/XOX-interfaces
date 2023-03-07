import { useWeb3React } from '@pancakeswap/wagmi'
import BigNumber from 'bignumber.js'
import { USD_DECIMALS } from 'config/constants/exchange'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { pointDataDays } from 'services/referral'
import styled from 'styled-components'
import ChartColumnSale from './ChartColumnSale'

const Wrapper = styled.div`
  position: relative;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin-bottom: 40px;
  padding: 28px 64px;
  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 2px solid #ffffff30;
    border-left: 2px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    left: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 2px solid #ffffff30;
    border-right: 2px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .title {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.075em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.87);
    text-align: center;
    margin-bottom: 40px;
  }
`

interface IListPoint {
  reward: number
  point: number
}

function ChartSalePage() {
  const [dataChart, setDataChart] = useState([])
  const { account, chainId } = useWeb3React()

  function createDataChartDay(name: string, uv: number) {
    return { name, uv }
  }

  const getPointDataDays = async () => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 14)
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date()
    endDate.setHours(23, 59, 59, 999)
    const time = {
      from: moment(startDate).unix(),
      to: moment(endDate).unix(),
    }
    const result = await pointDataDays(time.from, time.to, chainId)
    if (result && result.pointDataDays && result.pointDataDays.length > 0) {
      const arr = result.pointDataDays
      const chartData = createArray(startDate, endDate, arr)
      const data = chartData.map((item: any) => {
        const amount = new BigNumber(item.amount).div(10 ** USD_DECIMALS[chainId]).toNumber()
        return createDataChartDay(moment(item.date * 1000).format('DD MMM'), amount)
      })
      setDataChart(data)
    }
  }

  const createArray = (from: Date, to: Date, subGraphData: any) => {
    const start = new Date(moment(from).format('MM/DD/YYYY'))
    const end = new Date(moment(to).format('MM/DD/YYYY'))
    const chartData = []
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      const loopDay = new Date(d)
      loopDay.setHours(23)
      loopDay.setMinutes(59)
      loopDay.setSeconds(59)
      const dataByDay = { date: moment(loopDay).unix(), amount: 0 }
      const dateInterger = Math.trunc(moment(loopDay).unix() / 86400)

      const findData = subGraphData.find((x) => {
        return x.id === dateInterger.toString()
      })
      dataByDay.amount = findData ? findData.amount : 0
      chartData.push(dataByDay)
    }
    return chartData
  }

  useEffect(() => {
    if (!chainId || !account) return
    getPointDataDays()
  }, [chainId, account])

  return (
    <Wrapper>
      <div className="corner1" />
      <div className="edge1" />
      <div className="corner2" />
      <div className="edge2" />
      <p className="title">Daily Raise (USDT)</p>
      <ChartColumnSale data={dataChart} />
    </Wrapper>
  )
}

export default ChartSalePage
