import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area, CartesianGrid } from 'recharts'
import useTheme from 'hooks/useTheme'
import { formatAmount } from 'utils/formatInfoNumbers'
import { LineChartLoader } from 'views/Info/components/ChartLoaders'
import { useTranslation } from '@pancakeswap/localization'

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export type LineChartProps = {
  data: any[]
  setHoverValue: Dispatch<SetStateAction<number | undefined>> // used for value on hover
  setHoverDate: Dispatch<SetStateAction<string | undefined>> // used for label of value
  minYAxis?: number
  maxYAxis?: number
  typeXAxis?: string
  showXAxis?: boolean
} & React.HTMLAttributes<HTMLDivElement>

/**
 * Note: remember that it needs to be mounted inside the container with fixed height
 */
const LineChart = ({ data, setHoverValue, setHoverDate, minYAxis, maxYAxis, typeXAxis, showXAxis }: LineChartProps) => {

  const minGap = useMemo(() => {
    return typeXAxis === '1M' ? 2 : 10;
  }, [typeXAxis]);

  let tmpRsFormat;
  const formatDate = (time:any) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const day = time.toLocaleDateString(undefined, { day: '2-digit' });
    const hour = `${date.getHours()}:00`;
    let resultFormat:any = '';
    switch(typeXAxis) {
      case '1Y':
        resultFormat = (tmpRsFormat === monthNames[monthIndex]) ? '' : monthNames[monthIndex];
        tmpRsFormat = monthNames[monthIndex]
        break;
      case '3M':
        resultFormat = day;
        break;
      case '1M':
        resultFormat = (tmpRsFormat === day) ? '' : day;
        tmpRsFormat = day
        break;
      case '7D':
        resultFormat = (tmpRsFormat === day) ? '' : day;
        tmpRsFormat = day
        break;
      case '1D':
        resultFormat = hour;
        break;
      default:
        resultFormat = (tmpRsFormat === year) ? '' : year;
        tmpRsFormat = year
    }
    return resultFormat;
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
        <CartesianGrid vertical={false} strokeDasharray="1 1" />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={theme.colors.inputSecondary} stopOpacity={0.5} />
            <stop offset="100%" stopColor={theme.colors.secondary} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tickFormatter={(time) => formatDate(time)}
          minTickGap={minGap}
          fontSize={showXAxis ? "14px" : "0px"}
        />
        <YAxis
          dataKey="value"
          tickCount={6}
          scale="linear"
          axisLine={false}
          tickLine={false}
          fontSize="12px"
          domain={[minYAxis, maxYAxis]}
          tickFormatter={(val) => `$${val}`}
          orientation="left"
          tick={{ dx: -15, fill: theme.colors.textSubtle }}
        />
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
        <Area dataKey="value" type="monotone" stroke={theme.colors.secondary} fill="#9072FF" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default LineChart
