import useWindowSize from 'hooks/useWindowSize'
import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts'

const ColumnChartRef = () => {
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

const data = [
  {
    name: '12 Nov',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '12 Nov',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '13 Nov',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '14 Nov',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '15 Nov',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '16 Nov',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '17 Nov',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '18 Nov',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '19 Nov',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '19 Nov',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '20 Nov',
    uv: 1290,
    pv: 400,
    amt: 1181,
  },
  {
    name: '21 Nov',
    uv: 390,
    pv: 430,
    amt: 1100,
  },
  {
    name: '22 Nov',
    uv: 300,
    pv: 400,
    amt: 2100,
  },
  {
    name: '23 Nov',
    uv: 2490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '24 Nov',
    uv: 1490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '25 Nov',
    uv: 390,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '26 Nov',
    uv: 90,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '27 Nov',
    uv: 1190,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '28 Nov',
    uv: 3290,
    pv: 100,
    amt: 1100,
  },
]

export default ColumnChartRef
