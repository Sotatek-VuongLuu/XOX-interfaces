/* eslint-disable react/button-has-type */
import { Box, Text, Skeleton } from '@pancakeswap/uikit'
import { fromUnixTime } from 'date-fns'
import { useState, useMemo, memo, useEffect, useRef, useCallback } from 'react'
import { ChartEntry, ProtocolData } from 'state/info/types'
import styled from 'styled-components'
import { formatAmount } from 'utils/formatInfoNumbers'
import BarChart from './BarChart'
import LineChart from './LineChart'
import { ChartContent, TitleChart } from './style'
import SelectTokenModal from './SelectTokenModal'
import { USDC, USDT, WBTC_ETH } from '@pancakeswap/tokens'
import { Currency, NativeCurrency } from '@pancakeswap/sdk'
import currencyId from 'utils/currencyId'
import { tokens } from 'tokens'
import { CurrencyLogo } from 'components/Logo'

interface HoverableChartProps {
  chartData: any[]
  valueProperty: string
  ChartComponent: typeof BarChart | typeof LineChart
  filter: any
  setFilter: (n: any) => void
  currencyDatas: Array<any>
  setCoinGeckoId: (id: string) => void
  chainId: number
  native: NativeCurrency
}

const HoverableChart = ({
  chartData,
  currencyDatas,
  valueProperty,
  ChartComponent,
  filter,
  setFilter,
  setCoinGeckoId,
  native,
  chainId,
}: HoverableChartProps) => {
  const [hover, setHover] = useState<number | undefined>()
  const [isOpen, setOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(native)
  const [dateHover, setDateHover] = useState<string | undefined>()
  const [currencyData, setCurrencyData] = useState<any>()
  const modal = useRef()

  // Getting latest data to display on top of chart when not hovered
  useEffect(() => {
    setHover(null)
  }, [chartData])

  useEffect(() => {
    if (hover == null && chartData) {
      setHover(chartData[valueProperty])
    }
  }, [chartData, hover, valueProperty])

  const minValue = Math.min(...(chartData || []).map((o) => o[valueProperty]))
  const maxValue = Math.max(...(chartData || []).map((o) => o[valueProperty]))
  const minYAxis = minValue - (maxValue - minValue) * 0.2 > 0 ? minValue - (maxValue - minValue) * 0.2 : 0
  const maxYAxis = maxValue + (maxValue - minValue) * 0.2

  const formattedData = useMemo(() => {
    if (chartData) {
      return chartData.map((day) => {
        return {
          time: fromUnixTime(day.date),
          value: day[valueProperty],
        }
      })
    }
    return []
  }, [chartData, valueProperty])

  const handleSelectTokenClicked = useCallback(() => {
    setOpen(true)
  }, [])

  useEffect(() => {
    const token = tokens.find((element) => {
      return element.symbol.toLowerCase() === selectedCurrency.symbol.toLowerCase()
    })

    if (token) setCoinGeckoId(token.id)

    if (!currencyDatas) return
    const [dataCurrency] = currencyDatas.filter(
      (data) => data.symbol.toLowerCase() === selectedCurrency.symbol.toLowerCase(),
    )

    if (dataCurrency) setCurrencyData(dataCurrency)
  }, [selectedCurrency, currencyDatas])

  return (
    <Box p={['16px', '16px', '24px']}>
      <TitleChart>
        <div className="title_chart_container">
          <p className="title_chart">Token Price</p>
          <div className="line" />
        </div>
        <button className="btn_select_token" onClick={handleSelectTokenClicked}>
          Select Token
        </button>
      </TitleChart>

      <ChartContent>
        <div className="container">
          <div className="token">
            <CurrencyLogo currency={selectedCurrency} size="30px" />
            {selectedCurrency.symbol}
          </div>
          {currencyData && (
            <>
              <div className="liquidity">
                <p>Current price: ${currencyData.current_price} </p>
                <p>
                  Price change (in last 24 hours): <img src="/images/up.svg" alt="up" />{' '}
                  <span>{currencyData.price_change_24h}%</span>
                </p>
              </div>
              <div className="volume">
                <p>
                  Volume 24h <img src="/images/up.svg" alt="up" /> <span>$45.56</span>
                </p>
                <p>
                  Volume 24h <img src="/images/up.svg" alt="up" /> <span>${currencyData.total_volume}</span>
                </p>
              </div>
            </>
          )}
        </div>

        <p className="filter">
          <div />
          <div>
            <span onClick={() => setFilter({ days: 'max' })} className={filter.days === 'max' ? 'active' : ''}>
              All
            </span>
            <span onClick={() => setFilter({ days: 365 })} className={filter.days === 365 ? 'active' : ''}>
              1y
            </span>
            <span onClick={() => setFilter({ days: 90 })} className={filter.days === 90 ? 'active' : ''}>
              3M
            </span>
            <span onClick={() => setFilter({ days: 30 })} className={filter.days === 30 ? 'active' : ''}>
              1M
            </span>
            <span onClick={() => setFilter({ days: 7 })} className={filter.days === 7 ? 'active' : ''}>
              7d
            </span>
            <span onClick={() => setFilter({ days: 1 })} className={filter.days === 1 ? 'active' : ''}>
              1d
            </span>
          </div>
        </p>
      </ChartContent>

      {/* <Text bold color="secondary">
        {title}
      </Text>
      {hover > -1 ? ( // sometimes data is 0
        <Text bold fontSize="24px">
          ${formatAmount(hover)}
        </Text>
      ) : (
        <Skeleton width="128px" height="36px" />
      )}
      <Text>{dateHover ?? currentDate}</Text> */}
      <Box height="250px">
        <ChartComponent
          data={formattedData}
          setHoverValue={setHover}
          setHoverDate={setDateHover}
          minYAxis={minYAxis}
          maxYAxis={maxYAxis}
        />
      </Box>
      <SelectTokenModal
        isOpen={isOpen}
        setOpen={setOpen}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        native={native}
        chainId={chainId}
        ref={modal}
      ></SelectTokenModal>
    </Box>
  )
}

export default memo(HoverableChart)
