import { formatAmountNumber } from '@pancakeswap/utils/formatBalance'
import useWindowSize from 'hooks/useWindowSize'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import styled from 'styled-components'

interface IDataitem {
  name: string
  uv: number
  pv: number
  amt: number
}
interface PropsColumnChart {
  data: IDataitem[]
}

const CustomTooltipStyle = styled.div`
  background: #fff;
  padding: 5px 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: black;
`

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipStyle>
        <p className="label">
          {formatAmountNumber(payload[0].payload.uv, 2) > 1
            ? `${formatAmountNumber(payload[0].payload.uv, 2)} points`
            : `${formatAmountNumber(payload[0].payload.uv, 2)} point`}
        </p>
      </CustomTooltipStyle>
    )
  }

  return null
}

const ColumnChartRef = (props: PropsColumnChart) => {
  const { data } = props
  const { width } = useWindowSize()
  return (
    <ResponsiveContainer width="100%" height={121}>
      <BarChart data={data} barSize={width <= 900 ? 8 : 10}>
        <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
        <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 400, fill: 'rgba(255, 255, 255, 0.6)' }} />
        <Bar dataKey="uv" fill="#8884d8" radius={[20, 20, 20, 20]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ColumnChartRef
