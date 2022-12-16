import { PieChart, Pie, Cell, Label, ResponsiveContainer } from 'recharts'

interface IProps {
  percent: number
  name: string
  cx?: number
  cy?: number
}

function CustomLabel({ view, percent, name }) {
  const { cx, cy } = view

  return (
    <>
      <text
        x={85}
        y={85}
        fill=" rgba(255, 255, 255, 0.87)"
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan alignmentBaseline="middle" fontSize="24">
          {percent}
        </tspan>
      </text>
      <text
        x={cx}
        y={cy}
        fill="rgba(255, 255, 255, 0.6)"
        className="recharts-text recharts-label"
        textAnchor="bottom"
        dominantBaseline="bottom"
      >
        <tspan alignmentBaseline="text-after-edge" fontSize="12" fontWeight="400">
          {name}
        </tspan>
      </text>
    </>
  )
}

const ChartRef: React.FC<IProps> = ({ percent = 0, name = '', cx = 70, cy = 151 }) => {
  const COLORS = ['#cbc2ec', '#8e82ba', 'rgba(255, 255, 255, 0.1)']
  const data = [
    { name: 'Group A', value: percent - 2 },
    { name: 'Group B', value: 2 },
    { name: 'Group C', value: 100 - percent },
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
        <Label
          width={30}
          position="center"
          content={<CustomLabel view={{ cx, cy }} percent={`${percent}%`} name={name} />}
        />
        {data.map((entry, index) => (
          <Cell key={`cell-${COLORS.length}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  )
}

export default ChartRef
