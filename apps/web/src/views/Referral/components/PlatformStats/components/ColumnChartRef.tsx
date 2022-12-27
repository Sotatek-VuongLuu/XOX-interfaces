import useWindowSize from 'hooks/useWindowSize'
import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts'

interface IDataitem  {
  name : string
  uv: number
  pv: number
  amt: number
}
interface PropsColumnChart {
  data : IDataitem[]
}

const ColumnChartRef = (props: PropsColumnChart) => {
  const { data } = props;
  const { width } = useWindowSize()
  return (
    <ResponsiveContainer width="100%" height={121}>
      <BarChart data={data} barSize={width <= 900 ? 8 : 10}>
        <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 400, fill: 'rgba(255, 255, 255, 0.6)' }} />
        <Bar dataKey="uv" fill="#8884d8" radius={[20, 20, 20, 20]} />
      </BarChart>
    </ResponsiveContainer>
  )
}



export default ColumnChartRef
