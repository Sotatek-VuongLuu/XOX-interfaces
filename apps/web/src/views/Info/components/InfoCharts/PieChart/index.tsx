import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

export default function InfoPieChart({ data, colors, total }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      {total > 0 ? (
        <PieChart>
          <Pie
            data={[100, 100, 100, 100]}
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
