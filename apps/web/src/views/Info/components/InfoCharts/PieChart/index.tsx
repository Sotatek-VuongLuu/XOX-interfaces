import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, LabelList, Tooltip } from 'recharts'
import styled from 'styled-components'
import { formatAmount } from 'utils/formatInfoNumbers'

const RADIAN = Math.PI / 180

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
    console.log(payload[0], 'payload[0]')
    return (
      <CustomTooltipStyle>
        <p className="label">{`${payload[0].name}: $${formatAmount(payload[0].value, {displayThreshold: 2})}`}</p>
      </CustomTooltipStyle>
    )
  }

  return null
}

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
        <PieChart
        // onMouseEnter={renderCustomizedLabel}
        >
          <Pie
            data={data}
            outerRadius={95}
            fill="#8884d8"
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            onMouseOver={renderCustomizedLabel}
          >
            {data.map((_: any, index: number) => (
              <Cell key={colors[index % colors.length]} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
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
