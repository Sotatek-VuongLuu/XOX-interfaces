import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area, CartesianGrid } from 'recharts'
import useTheme from 'hooks/useTheme'
import { formatAmount } from 'utils/formatInfoNumbers'
import { LineChartLoader } from 'views/Info/components/ChartLoaders'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const CustomTooltipStyle = styled.div`
  background: #fff;
  padding: 5px 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: black;
`

export type LineChartProps = {
  data: any[]
  setHoverValue: Dispatch<SetStateAction<number | undefined>> // used for value on hover
  setHoverDate: Dispatch<SetStateAction<string | undefined>> // used for label of value
  minYAxis?: number
  maxYAxis?: number
  typeXAxis?: string
  showXAxis?: boolean
  hoverableChart?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipStyle>
        <p className="label">{new Date(label).toLocaleString()}</p>
        <p className="intro">{`Price: ${formatAmount(payload[0].payload.value)}`}</p>
        <p className="desc">{`Volume: ${formatAmount(payload[0].payload.vol)}`}</p>
      </CustomTooltipStyle>
    )
  }

  return null
}

/**
 * Note: remember that it needs to be mounted inside the container with fixed height
 */
const LineChart = ({
  data,
  setHoverValue,
  setHoverDate,
  minYAxis,
  maxYAxis,
  typeXAxis,
  showXAxis,
  hoverableChart,
}: LineChartProps) => {
  const minGap = useMemo(() => {
    return typeXAxis === '1M' ? 2 : 10
  }, [typeXAxis])

  let tmpRsFormat
  const formatDate = (time: any) => {
    const date = new Date(time)
    const year = date.getFullYear()
    const monthIndex = date.getMonth()
    const day = time.toLocaleDateString(undefined, { day: '2-digit' })
    const hour = `${date.getHours()}:00`
    let resultFormat: any = ''
    switch (typeXAxis) {
      case '1Y':
        resultFormat = tmpRsFormat === monthNames[monthIndex] ? '' : monthNames[monthIndex]
        tmpRsFormat = monthNames[monthIndex]
        break
      case '3M':
        resultFormat = day
        break
      case '1M':
        resultFormat = tmpRsFormat === day ? '' : day
        tmpRsFormat = day
        break
      case '7D':
        resultFormat = tmpRsFormat === day ? '' : day
        tmpRsFormat = day
        break
      case '1D':
        resultFormat = hour
        break
      default:
        resultFormat = tmpRsFormat === year ? '' : year
        tmpRsFormat = year
    }
    return resultFormat
  }

  const formatMonth = (month: any) => {
    return monthNames[month]
  }

  const intToString = (num: any) => {
    if (num < 1000) {
      return num
    }
    const si = [
      { v: 1e3, s: 'K' },
      { v: 1e6, s: 'M' },
      { v: 1e9, s: 'B' },
      { v: 1e12, s: 'T' },
      { v: 1e15, s: 'P' },
      { v: 1e18, s: 'E' },
    ]
    let index
    for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
        break
      }
    }
    return (num / si[index].v).toFixed(1).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[index].s
  }

  const {
    currentLanguage: { locale },
  } = useTranslation()
  const { theme } = useTheme()

  if (!data || data.length === 0) {
    return <LineChartLoader />
  }

  return (
    <ResponsiveContainer>
      <AreaChart
        data={data}
        width={300}
        height={308}
        margin={{
          top: 5,
          right: 15,
          left: 0,
          bottom: 5,
        }}
        onMouseLeave={() => {
          if (setHoverDate) setHoverDate(undefined)
          if (setHoverValue) setHoverValue(undefined)
        }}
      >
        <CartesianGrid vertical={false} stroke="#FFFFFF20" />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={theme.colors.inputSecondary} stopOpacity={0.5} />
            <stop offset="100%" stopColor={theme.colors.secondary} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          xAxisId="0"
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tickFormatter={(time) => formatDate(time)}
          minTickGap={minGap}
          fontSize={showXAxis ? '14px' : '0px'}
        />
        {hoverableChart && typeXAxis === '3M' && (
          <XAxis
            xAxisId="1"
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tickFormatter={(month) => formatMonth(month)}
            fontSize={showXAxis ? '14px' : '0px'}
            allowDuplicatedCategory={false}
          />
        )}
        <YAxis
          dataKey="value"
          tickCount={6}
          scale="linear"
          axisLine={false}
          tickLine={false}
          fontSize="12px"
          domain={[minYAxis, maxYAxis]}
          tickFormatter={(val) => `$${intToString(val)}`}
          orientation="left"
          tick={{ dx: 0, fill: theme.colors.textSubtle }}
        />
        {hoverableChart ? (
          <Tooltip content={<CustomTooltip />} />
        ) : (
          <Tooltip
            cursor={{ stroke: theme.colors.secondary }}
            contentStyle={{ display: 'none' }}
            formatter={(tooltipValue, name, props) => {
              setHoverValue(props.payload.value)
              setHoverDate(
                props.payload.time.toLocaleString(locale, {
                  year: 'numeric',
                  day: 'numeric',
                  month: 'short',
                }),
              )
              return null
            }}
          />
        )}
        <Area dataKey="value" type="monotone" stroke={theme.colors.secondary} fill="#9072FF" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default LineChart
