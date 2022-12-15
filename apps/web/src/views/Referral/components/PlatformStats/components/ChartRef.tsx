import { PieChart, Pie, Cell } from 'recharts'

interface IProps {
  percent?: number
}

const ChartRef: React.FC<IProps> = ({ percent = 25 }) => {
  const COLORS = ['#cbc2ec', '#8e82ba', 'rgba(255, 255, 255, 0.1)']
  const data = [
    { name: 'Group A', value: percent - 2 },
    { name: 'Group B', value: 2 },
    { name: 'Group C', value: 100 - 2 - percent },
  ]

  return (
    <PieChart width={170} height={150}>
      <Pie
        data={data}
        cx={80}
        cy={80}
        startAngle={220}
        endAngle={-40}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${COLORS.length}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  )
}

export default ChartRef
