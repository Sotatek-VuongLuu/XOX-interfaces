import { BTNLearnMore } from 'views/Company'
import ReactECharts from 'echarts-for-react'
import { EChartsOption, SeriesOption } from 'echarts'
import moment from 'moment'
import {
  StyledBG,
  StyledCard1,
  StyledCard2,
  StyledContainer,
  StyledDescription,
  StyledF,
  StyledHeader,
  StyledTitle,
  Dot,
  StyledF2,
  StyledAddress,
  StyledCertik,
  StyledTVS,
} from './styled'
import ADDComponent from './ADDComponent'

interface IAddress {
  asset: string
  name: string
  text?: string
  address?: string
  logo: string
}

function BG() {
  return (
    <StyledBG>
      <div />
      <div />
      <div />
    </StyledBG>
  )
}

function Address({ addr, ...props }: { addr: IAddress }) {
  const { asset, logo, name, address, text } = addr
  const prefixAddress = address?.substring(0, address.length - 5) || ''
  const suffixAddress = address?.substring(address.length - 5, address.length) || ''

  function copy() {
    if (text || !address) return
    navigator.clipboard.writeText(address)
  }

  return (
    <StyledAddress {...props}>
      <div>
        <img src={logo} alt="" draggable="false" loading="lazy" />
        <div>
          <p>{asset}:</p>
          <p>{name}:</p>
          {!text && !address && <p>...</p>}
          {text && !address && <p>{text}</p>}
          {!text && address && (
            <div>
              <p>{prefixAddress}</p>
              <p>{suffixAddress}</p>
            </div>
          )}
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
        <img src="/images/tokenomics/CopySimple.svg" alt="" draggable="false" loading="lazy" onClick={copy} />
      </div>

      <a href="/#" target="_blank" rel="noreferrer">
        Get XOX
      </a>
    </StyledAddress>
  )
}

interface IDataOBJReturn {
  time: number
  title: string
  amountPerYear: number
  id?: number
}

export default function TokenomicsPage() {
  const LAUNCH_APP_TIME = 1679850000 /// (seconds) can change

  const handleRenderXAxis = (): IDataOBJReturn[] => {
    const data = []
    for (let i = 0; i < 16; i++) {
      const time = moment
        .unix(LAUNCH_APP_TIME)
        .add(6 * i, 'months')
        .unix()
      const title = moment.unix(time).format('MMM DD YY')
      data.push({ time, title, amountPerYear: 0 })
    }
    return data
  }

  /// 0% at TGE and yearly
  const getDataYearly = (totalAmount: number, percentPerYear: number, inYear: number) => {
    const mileStone: IDataOBJReturn[] = handleRenderXAxis()
    const dataAmount = []
    const period = (totalAmount * percentPerYear) / 100
    for (let i = 1; i <= inYear; i++) {
      const time = moment.unix(LAUNCH_APP_TIME).add(i, 'year').unix()
      const amountPerYear = period * i
      dataAmount.push({
        time,
        title: moment.unix(time).format('MMM DD YY'),
        amountPerYear,
      })
    }
    for (let i = 0; i < mileStone.length; i++) {
      const itemTime = mileStone[i].time
      for (let index = 0; index < dataAmount.length; index++) {
        if (itemTime === dataAmount[index].time) {
          mileStone[i] = dataAmount[index]
        }
      }
    }
    const indexOfHasAmountField = []
    mileStone.forEach((item, index) => {
      if (item.amountPerYear > 0) {
        indexOfHasAmountField.push({ id: index, ...item })
      }
    })
    const finalData = handleformatData(mileStone, indexOfHasAmountField)
    return finalData
  }

  const handleformatData = (mileStone: IDataOBJReturn[], indexOfHasAmountField: IDataOBJReturn[]) => {
    const cloneData = [...mileStone]
    for (let index = 0; index < indexOfHasAmountField.length; index++) {
      const { id, amountPerYear: amountPerYearReal } = indexOfHasAmountField[index]
      for (let i = id; i < cloneData.length; i++) {
        cloneData[i].amountPerYear = amountPerYearReal
      }
    }
    return cloneData
  }

  const ADDRESS: Array<IAddress> = [
    {
      asset: 'ETH',
      name: 'Ethereum',
      address: '0xa2dD817c2fDc3a2996f1A5174CF8f1AaED466E82',
      logo: '/images/tokenomics/ETH.png',
    },
    {
      asset: 'BSC',
      name: 'BSC',
      address: '0xa2dD817c2fDc3a2996f1A5174CF8f1AaED466E82',
      logo: '/images/tokenomics/BSC.png',
    },
    {
      asset: 'ARB',
      name: 'Arbitrum',
      address: '0xa2dD817c2fDc3a2996f1A5174CF8f1AaED466E82',
      logo: '/images/tokenomics/ARB.png',
    },
    {
      asset: 'MATIC',
      name: 'Polygon',
      address: '0xa2dD817c2fDc3a2996f1A5174CF8f1AaED466E82',
      logo: '/images/tokenomics/MATIC.png',
    },
    {
      asset: 'SOL',
      name: 'Solana',
      logo: '/images/tokenomics/SOL.png',
      text: 'Deployment  Coming',
    },
    {
      asset: 'OP',
      name: 'Optimism',
      logo: '/images/tokenomics/OP.png',
      text: 'Deployment  Coming',
    },
  ]

  const defaultOptionTVS: SeriesOption = {
    type: 'line',
    stack: 'Total',
    symbol: 'none',
    label: { show: false },
    lineStyle: { width: 0 },
    emphasis: { focus: 'self' },
  }
  const TVS_CHART_OPTION: EChartsOption = {
    title: { show: false },
    legend: {
      type: 'scroll',
      bottom: 0,
      align: 'left',
      itemGap: 16,
      itemWidth: 20,
      itemHeight: 2,
      textStyle: { color: '#FFFFFFDE', fontSize: 14, fontWeight: 'normal' },
      icon: 'roundRect',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          color: '#ffffff',
          backgroundColor: '#1E2127',
        },
      },
      className: 'tvs-chart',
      textStyle: { color: '#FFFFFFDE' },
    },
    toolbox: { feature: { saveAsImage: { show: false } } },
    grid: { top: 0, left: 0, right: 0, containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: handleRenderXAxis().map((item) => item.title),
    },
    yAxis: { type: 'value', show: false },
    series: [
      {
        ...defaultOptionTVS,
        name: 'Seed Round',
        data: getDataYearly(12600000, 20, 5).map((item) => item.amountPerYear),
        areaStyle: { color: '#BAFFBF' },
      },
      {
        ...defaultOptionTVS,
        name: 'Round 1 Sale',
        data: getDataYearly(27000000, 25, 4).map((item) => item.amountPerYear),
        areaStyle: { color: '#86B6FF' },
      },
      {
        ...defaultOptionTVS,
        name: 'Round 2 Sale',
        data: getDataYearly(9000000, 20, 5).map((item) => item.amountPerYear),
        areaStyle: { color: '#64C6BA' },
      },
      {
        ...defaultOptionTVS,
        name: 'Team Fund',
        data: getDataYearly(36000000, 25, 4).map((item) => item.amountPerYear),
        areaStyle: { color: '#3D8AFF' },
      },
      {
        ...defaultOptionTVS,
        name: 'Marketing Fund',
        data: getDataYearly(1800000, 20, 5).map((item) => item.amountPerYear),
        areaStyle: { color: '#A964C9' },
      },
      {
        ...defaultOptionTVS,
        name: 'Reserve Fund',
        data: getDataYearly(5400000, 20, 5).map((item) => item.amountPerYear),
        areaStyle: { color: '#C20DA3' },
      },
      // {
      //   ...defaultOptionTVS,
      //   name: 'Staking Rewards',
      //   data: [220, 302, 181, 234, 210, 290, 150],
      //   areaStyle: { color: '#FF5353' },
      // },
      // {
      //   ...defaultOptionTVS,
      //   name: 'Ecosystem',
      //   data: [220, 302, 181, 234, 210, 290, 150],
      //   areaStyle: { color: '#FB8618' },
      // },
      // {
      //   ...defaultOptionTVS,
      //   name: 'Liquidity Allocation',
      //   data: [220, 302, 181, 234, 210, 290, 150],
      //   areaStyle: { color: '#FFB547' },
      // },
    ],
  }

  return (
    <>
      <BG />
      <StyledContainer>
        <StyledHeader>
          <div>
            <h1>
              Everything
              <br />
              about our
              <br />
              Tokenomics
            </h1>
            <p>
              XOX is the native token that powers the XOX Labs Cross-Chain Defi Ecosystem. XOX is built on Ethereum but
              XOX Labs is a multi-chain Protocol so XOX Token can be acquired in other chains like (BSC, Solana,
              Polygon, Arbitrum, Optimism..) through liquidity pools created by XOX Labs.
            </p>
          </div>

          <div>
            <div />
            <img src="/images/tokenomics/Untitled@5-1397x721 1.png" alt="" draggable="false" loading="lazy" />
          </div>
        </StyledHeader>

        <StyledTitle>About XOX Tokenomics</StyledTitle>
        <StyledDescription>
          XOX Labs is building a the next-gen multi-chain decentralized ecosystem focused on revenue sharing,
          sustainability, transparency and cross-chain integration leverage for mass exposure. And the $XOX Token is the
          currency that brings it all together.
        </StyledDescription>

        <StyledF>
          <StyledCard1>
            <h1>Token Name</h1>
            <p>XOX</p>
          </StyledCard1>
          <StyledCard1>
            <h1>Token Supply</h1>
            <p>180.000.000</p>
          </StyledCard1>
          <StyledCard1>
            <h1>Networks</h1>
            <p>ETH - BSC - ARB - Polygon - SOL - OP</p>
          </StyledCard1>
        </StyledF>

        <StyledTitle>Transaction Tax</StyledTitle>
        <StyledDescription>
          Good Tokenomics are crucial to creating sustainability, and scalability to ensure the constant growth of the
          ecosystem in the long run.
        </StyledDescription>

        <StyledF>
          <StyledCard2>
            <h1>Buy Tax</h1>
            <h2>0% Buy Tax</h2>
            <p className="center">On any DEX or CEX (Decentralized or Centralized Exchanges)</p>
            <hr />
            <h2>10% Buy Tax</h2>
            <p className="center">
              In the XOX Dex V1. Only applicable for <span className="hl">XOX-USDT</span> and{' '}
              <span className="hl">XOX-USDC</span> pairs. The 10% is given back to the buyers in the form of XOXS which
              is the staking currency, so it is still a 0% Buy Tax since 1 XOXS = $1.
            </p>
            <p className="center">
              <Dot /> The Full <span className="hl">USDT</span> & <span className="hl">USDC</span> collected from buy
              tax is later given back to the stakers as Stable Coin (XOXS) Staking Rewards <Dot />
            </p>
          </StyledCard2>

          <StyledCard2>
            <h1>Sell Tax</h1>
            <h2>10% Sell Tax On Every DEX</h2>
            <p className="center">The 10% sell tax is allocated as follows:</p>
            <hr />
            <p>
              <Dot /> <span className="white">4%</span> - Stable Coin (XOXS) Staking Rewards
              <br />
              <Dot /> <span className="white">2%</span> - Marketing
              <br />
              <Dot /> <span className="white">2%</span> - Development
              <br />
              <Dot /> <span className="white">1%</span> - Added to the Lottery Fund/ Used to Buy Back & Burn
              <br />
              <Dot /> <span className="white">1%</span> - Team
            </p>
          </StyledCard2>
        </StyledF>

        <StyledTitle>Contract Address</StyledTitle>

        <StyledF2>
          {ADDRESS.map((item, index) => (
            <Address addr={item} key={String(item.asset + index)} />
          ))}
        </StyledF2>

        <StyledCertik>
          <img src="/images/tokenomics/certik.svg" alt="" draggable="false" loading="lazy" />
          <img src="/images/tokenomics/certik.svg" alt="" draggable="false" loading="lazy" />
          <img src="/images/tokenomics/certik.svg" alt="" draggable="false" loading="lazy" />
        </StyledCertik>

        <ADDComponent />

        <StyledTitle>XOX Token Vesting Schedule</StyledTitle>

        <StyledTVS>
          {/* <div> */}
          <ReactECharts option={TVS_CHART_OPTION} />
          {/* </div> */}
          {/* <div>
            {(TVS_CHART_OPTION.series as Array<any>).map((tvs, i) => (
              <div key={String(i + 0)} style={{ '--color': tvs.areaStyle.color } as any}>
                {tvs.name}
              </div>
            ))}
          </div> */}
        </StyledTVS>

        <BTNLearnMore />
      </StyledContainer>
    </>
  )
}
