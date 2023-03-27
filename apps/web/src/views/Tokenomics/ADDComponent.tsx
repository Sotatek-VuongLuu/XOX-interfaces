import ReactECharts from 'echarts-for-react'
import { Ref, useEffect, useRef, useState } from 'react'
import { BTNLearnMore } from 'views/Company'
import { EChartsOption, SeriesOption } from 'echarts'
import { StyledAAD, StyledItemAAD, StyledTitle } from './styled'

interface IAAD {
  title: string
  content: Array<string>
  color?: string
  highLight?: boolean
  value?: number
}

function AADItem({
  data,
  className,
  onMouseEnter,
  onMouseLeave,
  active,
  ...props
}: {
  data: IAAD
  className?: string
  onMouseEnter: () => void
  onMouseLeave: () => void
  active?: boolean
}) {
  const { highLight, content, title, color } = data
  return (
    <StyledItemAAD
      {...props}
      id="AADItem"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${className || ''} ${highLight ? 'highLight' : ''} ${active ? 'active' : ''}`}
      style={{ ...(props as any).style, '--color': color }}
    >
      <h3>{title}</h3>
      {content.map((text, i) => (
        <p key={String(`${i}`)}>{text}</p>
      ))}
    </StyledItemAAD>
  )
}

export default function ADDComponent() {
  const AADChart = useRef<ReactECharts>()

  const AAD_DATA_L: Array<IAAD> = [
    { title: 'XOX Token Metrics', content: ['TGE (19%) - 34.200.000 Tokens'], highLight: true },
    { title: 'Liquidity Pool', content: ['14,400,000 Tokens', '100% lock 5 years'], color: '#D8D8D8' },
    {
      title: 'Public Sale',
      content: ['18,000,000 Tokens', '40% realease at TGE, 10% release Monthly'],
      color: '#969696',
    },
    {
      title: 'Private Sale',
      content: ['10,800,000 Tokens', '10% release at TGE, 10% release Monthly'],
      color: '#BAFFBF',
    },
    {
      title: 'CEX Listing',
      content: ['18,000,000 Tokens', '20% at Launch then 10% unlocked Yearly'],
      color: '#86B6FF',
    },
    {
      title: 'CEX Listing',
      content: ['18,000,000 Tokens', '20% at Launch then 10% unlocked Yearly'],
      color: '#50817C',
    },
    {
      title: 'CEX Listing',
      content: ['18,000,000 Tokens', '20% at Launch then 10% unlocked Yearly'],
      color: '#64C6BA',
    },
  ]
  const AAD_DATA_R: Array<IAAD> = [
    {
      title: 'CEX Listing',
      content: ['18,000,000 Tokens', '20% at Launch then 10% unlocked Yearly'],
      color: '#FFB547',
    },
    {
      title: 'CEX Listing',
      content: ['18,000,000 Tokens', 'TGE = 40% then 10% Monthly Release'],
      color: '#FB8618',
    },
    {
      title: 'CEX Listing',
      content: ['18,000,000 Tokens', 'TGE = 40% then 10% Monthly Release'],
      color: '#FF5353',
    },
    {
      title: 'CEX Listing',
      content: ['18,000,000 Tokens', 'TGE = 40% then 10% Monthly Release'],
      color: '#C20DA3',
    },
    {
      title: 'CEX Listing',
      content: ['18,000,000 Tokens', 'TGE = 40% then 10% Monthly Release'],
      color: '#A964C9',
    },
    {
      title: 'CEX Listing',
      content: ['18,000,000 Tokens', 'TGE = 40% then 10% Monthly Release'],
      color: '#3D8AFF',
    },
    {
      title: 'CEX Listing',
      content: ['18,000,000 Tokens', 'TGE = 40% then 10% Monthly Release'],
      color: '#3D8AFF',
    },
  ]

  const AAD_CHART_OPTION: EChartsOption = {
    tooltip: { show: false },
    legend: { show: false },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['35%', '74%'],
        // itemStyle: { borderWidth: 3, borderColor: '#fff' },
        label: { formatter: (param) => `${param.percent}%`, color: '#ffffff', fontSize: 14 },
        data: [...AAD_DATA_L, ...AAD_DATA_R].map((item) => ({
          name: item.title,
          value: Math.floor(Math.random() * 100000) + 100,
          itemStyle: {
            color: item.color
              ? item.color
              : item.highLight
              ? {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: '#B809B5' },
                    { offset: 0.5, color: '#ED1C51' },
                    { offset: 1, color: '#FFB000' },
                  ],
                }
              : '#00000000',
          },
        })),
        emphasis: { focus: 'self' },
      },
    ],
  }

  function itemHandleChart(id: string, highLight: boolean) {
    const a = AADChart.current.getEchartsInstance()
    a.dispatchAction({ type: highLight ? 'highlight' : 'downplay', dataIndex: id })
  }
  function chartHandleItem(params: any, highLight: boolean) {
    const items = document.querySelectorAll('#AADItem')
    if (highLight) {
      items[params.dataIndex].classList.add('active')
    } else {
      items[params.dataIndex].classList.remove('active')
    }
  }

  return (
    <>
      <StyledTitle>Allocation and Distribution</StyledTitle>

      <StyledAAD>
        <div className="l">
          {AAD_DATA_L.map((item, i) => (
            <AADItem
              data={item}
              key={String(`a${i}`)}
              onMouseEnter={() => itemHandleChart(`${i}`, true)}
              onMouseLeave={() => itemHandleChart(`${i}`, false)}
            />
          ))}
        </div>
        <div className="c">
          <div>
            <ReactECharts
              option={AAD_CHART_OPTION}
              style={{ height: 'inherit' }}
              ref={AADChart}
              onEvents={{
                mouseover: (eve) => chartHandleItem(eve, true),
                mouseout: (eve) => chartHandleItem(eve, false),
              }}
            />
            <div>
              <h1>Total Supply</h1>
              <p>
                180.000.000
                <br />
                Tokens
              </p>
            </div>
          </div>
          {/* <img src="/images/tokenomics/Group 48098890.png" alt="" draggable="false" loading="lazy" /> */}
        </div>
        <div className="r">
          {AAD_DATA_R.map((item, i) => (
            <AADItem
              data={item}
              key={String(`a${i}`)}
              className="b-l"
              onMouseEnter={() => itemHandleChart(`${i + AAD_DATA_L.length}`, true)}
              onMouseLeave={() => itemHandleChart(`${i + AAD_DATA_L.length}`, false)}
            />
          ))}
        </div>
        <div className="bg">
          <div />
          <div />
          <div />
          <div />
        </div>
      </StyledAAD>
    </>
  )
}
