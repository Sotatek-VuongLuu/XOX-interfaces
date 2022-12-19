/* eslint-disable react/button-has-type */
import { Box, useModal } from '@pancakeswap/uikit'
import { fromUnixTime } from 'date-fns'
import { useState, useMemo, memo, useEffect } from 'react'
import { formatAmount } from 'utils/formatInfoNumbers'
import { Currency, NativeCurrency } from '@pancakeswap/sdk'
import { tokens } from 'tokens'
import { CurrencyLogo } from 'components/Logo'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
import BarChart from './BarChart'
import LineChart from './LineChart'
import { ChartContent, TitleChart } from './style'

interface HoverableChartProps {
  chartData: any[]
  valueProperty: string
  ChartComponent: typeof BarChart | typeof LineChart
  filter: any
  setFilter: (n: any) => void
  currencyDatas: any
  setCoinmarketcapId: (id: number) => void
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
  setCoinmarketcapId,
  native,
  chainId,
}: HoverableChartProps) => {
  const [hover, setHover] = useState<number | undefined>()
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(native)
  const [dateHover, setDateHover] = useState<string | undefined>()
  const [currencyData, setCurrencyData] = useState<any>()

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

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal onCurrencySelect={setSelectedCurrency} selectedCurrency={selectedCurrency} />,
    true,
    true,
    'selectCurrencyModal',
  )

  useEffect(() => {
    const token = tokens.find((element) => {
      return element.symbol.toLowerCase() === selectedCurrency.symbol.toLowerCase()
    })

    if (token) setCoinmarketcapId(token?.id)
  }, [selectedCurrency])

  useEffect(() => {
    if (!currencyDatas) return
    const dataCurrency = currencyDatas.find(
      (data) => data?.symbol?.toLowerCase() === selectedCurrency.symbol.toLowerCase(),
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
        <button className="btn_select_token" onClick={onPresentCurrencyModal}>
          Select Token
        </button>
      </TitleChart>

      <ChartContent>
        <div className="container">
          <div className="token">
            <CurrencyLogo currency={selectedCurrency} size="30px" />
            {selectedCurrency.symbol}
          </div>
          <>
            <div className="liquidity">
              <p>Current price: ${formatAmount(currencyData?.price)} </p>
              <p>
                Price change (in last 24 hours):{' '}
                {currencyData?.percent_change_24h > 0 ? (
                  <>
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.80361 11.2498C6.80361 11.6916 6.44544 12.0498 6.00361 12.0498C5.56179 12.0498 5.20361 11.6916 5.20361 11.2498V3.67776L1.81588 7.06549C1.50346 7.37791 0.996929 7.37791 0.68451 7.06549C0.37209 6.75307 0.37209 6.24654 0.68451 5.93412L5.43451 1.18412C5.74693 0.871699 6.25346 0.871699 6.56588 1.18412L11.3159 5.93412C11.6283 6.24654 11.6283 6.75307 11.3159 7.06549C11.0035 7.37791 10.4969 7.37791 10.1845 7.06549L6.80361 3.68459V11.2498Z"
                        fill="#6BB372"
                      />
                    </svg>
                    <span style={{ color: '#6BB372' }}>{currencyData?.percent_change_24h?.toFixed(2)}%</span>
                  </>
                ) : currencyData?.percent_change_24h < 0 ? (
                  <>
                    <svg
                      width="12"
                      height="13"
                      viewBox="0 0 12 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="rotate(180)"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.80361 11.2498C6.80361 11.6916 6.44544 12.0498 6.00361 12.0498C5.56179 12.0498 5.20361 11.6916 5.20361 11.2498V3.67776L1.81588 7.06549C1.50346 7.37791 0.996929 7.37791 0.68451 7.06549C0.37209 6.75307 0.37209 6.24654 0.68451 5.93412L5.43451 1.18412C5.74693 0.871699 6.25346 0.871699 6.56588 1.18412L11.3159 5.93412C11.6283 6.24654 11.6283 6.75307 11.3159 7.06549C11.0035 7.37791 10.4969 7.37791 10.1845 7.06549L6.80361 3.68459V11.2498Z"
                        fill="#FF0000"
                      />
                    </svg>
                    <span style={{ color: '#FF0000' }}>{currencyData?.percent_change_24h?.toFixed(2)}%</span>
                  </>
                ) : (
                  <span>{currencyData?.percent_change_24h?.toFixed(2)}%</span>
                )}
              </p>
            </div>
            <div className="volume">
              <p>Volume 24h {currencyData && <span>${formatAmount(currencyData?.volume_24h)}</span>}</p>
              <p>Market cap: {currencyData && <span>${formatAmount(currencyData?.volume_24h)}</span>}</p>
            </div>
          </>
        </div>

        <div className="filter">
          <div>
            <button type="button" onClick={() => setFilter('ALL')} className={filter === 'ALL' ? 'active' : ''}>
              All
            </button>
            <button type="button" onClick={() => setFilter('1Y')} className={filter === 'Y' ? 'active' : ''}>
              1Y
            </button>
            <button type="button" onClick={() => setFilter('3M')} className={filter === '3M' ? 'active' : ''}>
              3M
            </button>
            <button type="button" onClick={() => setFilter('1M')} className={filter === '1M' ? 'active' : ''}>
              1M
            </button>
            <button type="button" onClick={() => setFilter('7D')} className={filter === '7D' ? 'active' : ''}>
              7D
            </button>
            <button type="button" onClick={() => setFilter('1D')} className={filter === '1D' ? 'active' : ''}>
              24H
            </button>
          </div>
        </div>
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
    </Box>
  )
}

export default memo(HoverableChart)
