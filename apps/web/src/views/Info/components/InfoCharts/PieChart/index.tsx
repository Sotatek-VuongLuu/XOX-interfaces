import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const RADIAN = Math.PI / 180

export default function InfoPieChart({ data, colors, total }) {
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      {total > 0 ? (
        <PieChart>
          <Pie
            data={data}
            labelLine={false}
            // label={renderCustomizedLabel}
            outerRadius={95}
            fill="#8884d8"
            dataKey="value"
            startAngle={90}
            endAngle={450}
          >
            {data.map((_: any, index: number) => (
              <Cell key={colors[index % colors.length]} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      ) : (
        <div
          style={{
            fontSize: '16px',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '500',
            lineHeight: '19px',
            color: 'rgba(255, 255, 255)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          No data
        </div>
      )}
    </ResponsiveContainer>
  )
}
