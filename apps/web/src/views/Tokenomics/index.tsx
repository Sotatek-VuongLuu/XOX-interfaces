import { useMemo } from 'react'
import useWindowSize from 'hooks/useWindowSize'
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
  ContainnerStyledF2,
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
  const { width } = useWindowSize()
  const { asset, logo, name, address, text } = addr
  const prefixAddress = address?.substring(0, 4) || ''
  const suffixAddress = address?.substring(address.length - 21, address.length) || ''

  const suffixAddressMobile = address?.substring(address.length - 8, address.length) || ''

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
            <div style={{ textDecoration: 'underline' }}>
              <p>{prefixAddress}</p>
              <p>...</p>
              {width < 490 ? <p>{suffixAddressMobile}</p> : <p>{suffixAddress}</p>}
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
  amount: number
  id?: number
}

export default function TokenomicsPage() {
  const { width } = useWindowSize()
  const LAUNCH_APP_TIME = 1679850000 /// (seconds) can change

  const handleRenderXAxis = (): IDataOBJReturn[] => {
    const data = []
    for (let i = 0; i < 17; i++) {
      const time = moment
        .unix(LAUNCH_APP_TIME)
        .add(6 * i, 'months')
        .unix()
      const title = moment.unix(time).format('MMM DD YYYY')
      data.push({ time, title, amount: 0 })
    }
    return data
  }

  /// 0% at TGE and yearly
  const getDataYearly = (totalAmount: number, percentPerYear: number, inYear: number) => {
    const mileStone: IDataOBJReturn[] = handleRenderXAxis()
    const dataAmount: IDataOBJReturn[] = []
    const period = (totalAmount * percentPerYear) / 100
    for (let i = 1; i <= inYear; i++) {
      const time = moment.unix(LAUNCH_APP_TIME).add(i, 'year').unix()
      const amount = period * i
      dataAmount.push({
        time,
        title: moment.unix(time).format('MMM DD YY'),
        amount,
      })
    }
    const dataMapping = handleMapping(mileStone, dataAmount)
    const indexOfHasAmountField = handleRetunId(dataMapping)
    const finalData = handleformatData(dataMapping, indexOfHasAmountField)
    return finalData
  }

  const handleRetunId = (dataMapping: IDataOBJReturn[]): IDataOBJReturn[] => {
    const indexOfHasAmountField = []
    dataMapping.forEach((item, index) => {
      if (item.amount > 0) {
        indexOfHasAmountField.push({ id: index, ...item })
      }
    })
    return indexOfHasAmountField
  }

  const handleMapping = (mileStone: IDataOBJReturn[], dataAmountMapping: IDataOBJReturn[]): IDataOBJReturn[] => {
    const cloneData = [...mileStone]
    for (let i = 0; i < cloneData.length; i++) {
      const itemTime = cloneData[i].time
      for (let index = 0; index < dataAmountMapping.length; index++) {
        if (itemTime === dataAmountMapping[index].time) {
          cloneData[i] = dataAmountMapping[index]
        }
      }
    }
    return cloneData
  }

  const handleformatData = (mileStone: IDataOBJReturn[], indexOfHasAmountField: IDataOBJReturn[]) => {
    const cloneData = [...mileStone]
    for (let index = 0; index < indexOfHasAmountField.length; index++) {
      const { id, amount: amountReal } = indexOfHasAmountField[index]
      for (let i = id; i < cloneData.length; i++) {
        cloneData[i].amount = amountReal
      }
    }
    return cloneData
  }

  const handleRenderSeedSale = () => {
    const dataSeedSale: number[] = [360000]
    for (let index = 0; index < 16; index++) {
      const element = 3240000
      dataSeedSale.push(element)
    }
    return dataSeedSale
  }

  ///  percent at TGE and release percent monthly
  const getDataMonthly = (totalAmount: number, percentPerHalfYear: number, percentInit: number) => {
    const mileStone: IDataOBJReturn[] = handleRenderXAxis()
    const initReleaseAtTGE = (totalAmount * percentInit) / 100
    mileStone[0].amount = initReleaseAtTGE
    const dataAmount: IDataOBJReturn[] = []
    const percentRest = 100 - percentInit
    const isNOTindivisible = percentRest % percentPerHalfYear === 0
    const everySixMonths = Math.ceil(percentRest / percentPerHalfYear)
    const period = (totalAmount * percentPerHalfYear) / 100
    let plus = initReleaseAtTGE

    if (isNOTindivisible) {
      for (let i = 1; i <= everySixMonths; i++) {
        const time = moment
          .unix(LAUNCH_APP_TIME)
          .add(i * 6, 'months')
          .unix()
        const amountPerHalfYear = period + plus
        plus = amountPerHalfYear
        dataAmount.push({
          time,
          title: moment.unix(time).format('MMM DD YY'),
          amount: amountPerHalfYear,
        })
      }
    }
    if (!isNOTindivisible) {
      for (let i = 1; i <= everySixMonths; i++) {
        const time = moment
          .unix(LAUNCH_APP_TIME)
          .add(i * 6, 'months')
          .unix()
        const amountPerHalfYear = period + plus
        if (i % 2 === 0) {
          dataAmount.push({
            time,
            title: moment.unix(time).format('MMM DD YY'),
            amount: totalAmount,
          })
        } else {
          dataAmount.push({
            time,
            title: moment.unix(time).format('MMM DD YY'),
            amount: amountPerHalfYear,
          })
        }
      }
    }
    const dataMapping = handleMapping(mileStone, dataAmount)
    const indexOfHasAmountField = handleRetunId(dataMapping)
    const finalData = handleformatData(dataMapping, indexOfHasAmountField)
    return finalData
  }

  const getLiquidityPool = (totalAmount: number) => {
    const mileStone: IDataOBJReturn[] = handleRenderXAxis()
    const dataAmount: IDataOBJReturn[] = []
    const time = moment.unix(LAUNCH_APP_TIME).add(60, 'months').unix()
    dataAmount.push({
      time,
      title: moment.unix(time).format('MMM DD YY'),
      amount: totalAmount,
    })

    const dataMapping = handleMapping(mileStone, dataAmount)
    const indexOfHasAmountField = handleRetunId(dataMapping)
    const finalData = handleformatData(dataMapping, indexOfHasAmountField)
    return finalData
  }
  /// percent% at TGE and yearly
  const getDataYearlyWithTEG = (totalAmount: number, percentPerYear: number, percentInit: number) => {
    const mileStone: IDataOBJReturn[] = handleRenderXAxis()
    const dataAmount: IDataOBJReturn[] = []
    const initReleaseAtTGE = (totalAmount * percentInit) / 100
    mileStone[0].amount = initReleaseAtTGE
    const period = (totalAmount * percentPerYear) / 100
    const percentRest = 100 - percentInit
    const everyYear = Math.ceil(percentRest / percentPerYear)

    let plus = initReleaseAtTGE

    for (let i = 1; i <= everyYear; i++) {
      const time = moment.unix(LAUNCH_APP_TIME).add(i, 'year').unix()
      const amountPerYear = period + plus
      plus = amountPerYear
      dataAmount.push({
        time,
        title: moment.unix(time).format('MMM DD YY'),
        amount: amountPerYear,
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
      if (item.amount > 0) {
        indexOfHasAmountField.push({ id: index, ...item })
      }
    })

    for (let index = 0; index < indexOfHasAmountField.length; index++) {
      const { id, amount: amountReal } = indexOfHasAmountField[index]
      for (let i = id; i < mileStone.length; i++) {
        mileStone[i].amount = amountReal
      }
    }
    return mileStone
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

  const controllBottom = useMemo(() => {
    let defaultBottom = 100

    if (width < 968) {
      defaultBottom = 150
    }

    if (width < 852) {
      defaultBottom = 300
    }

    return defaultBottom
  }, [width])

  const controllTop = useMemo(() => {
    let defaultTop = 340

    if (width < 968) {
      defaultTop = 260
    }

    if (width < 852) {
      defaultTop = 230
    }

    return defaultTop
  }, [width])

  const handleExpandXAxis = () => {
    const newXAxis: string[] = handleRenderXAxis().map((item) => item.title)
    newXAxis[16] = ''
    return newXAxis
  }

  const TVS_CHART_OPTION: EChartsOption = {
    title: { show: false },
    legend: {
      type: 'plain',
      top: controllTop,
      align: 'left',
      itemGap: 16,
      itemWidth: 20,
      itemHeight: 2,
      textStyle: { color: '#FFFFFFDE', fontSize: 14, fontWeight: 'normal' },
      icon: 'roundRect',
    },
    color: [
      '#D8D8D8',
      '#969696',
      '#BAFFBF',
      '#86B6FF',
      '#50817C',
      '#64C6BA',
      '#FFB547',
      '#FB8618',
      '#FF5353',
      '#C20DA3',
      '#A964C9',
      '#3D8AFF',
      'pink',
    ],
    tooltip: {
      trigger: 'axis',
      position: width < 900 && ['10%', '41%'],
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
    grid: { top: 0, left: -30, right: 0, bottom: controllBottom, containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: handleExpandXAxis(),
      nameTextStyle: {
        fontSize: 8,
        color: 'red',
      },
    },
    yAxis: { type: 'value', show: false },
    series: [
      {
        ...defaultOptionTVS,
        name: 'Team allocation',
        data: getDataYearly(12600000, 20, 5).map((item) => item.amount),
        areaStyle: { color: '#D8D8D8' },
      },
      {
        ...defaultOptionTVS,
        name: 'Company Reserve',
        data: getDataYearly(27000000, 25, 4).map((item) => item.amount),
        areaStyle: { color: '#969696' },
      },
      {
        ...defaultOptionTVS,
        name: 'Strategic Partnership',
        data: getDataYearly(9000000, 20, 5).map((item) => item.amount),
        areaStyle: { color: '#BAFFBF' },
      },
      {
        ...defaultOptionTVS,
        name: 'Ecosystem Growth',
        data: getDataYearly(36000000, 25, 4).map((item) => item.amount),
        areaStyle: { color: '#86B6FF' },
      },
      {
        ...defaultOptionTVS,
        name: 'Community Rewards',
        data: getDataYearly(1800000, 20, 5).map((item) => item.amount),
        areaStyle: { color: '#50817C' },
      },
      {
        ...defaultOptionTVS,
        name: 'XOX labs Foundation',
        data: getDataYearly(5400000, 20, 5).map((item) => item.amount),
        areaStyle: { color: '#64C6BA' },
      },
      {
        ...defaultOptionTVS,
        name: 'LP Farming',
        data: getDataYearlyWithTEG(18000000, 10, 20).map((item) => item.amount),
        areaStyle: { color: '#FFB547' },
      },
      {
        ...defaultOptionTVS,
        name: 'Seed Sale',
        data: handleRenderSeedSale(),
        areaStyle: { color: '#FB8618' },
      },
      {
        ...defaultOptionTVS,
        name: 'Partners Sale',
        data: getDataMonthly(5400000, 30, 10).map((item) => item.amount),
        areaStyle: { color: '#FF5353' },
      },
      {
        ...defaultOptionTVS,
        name: 'Private Sale',
        data: getDataMonthly(10800000, 60, 10).map((item) => item.amount),
        areaStyle: { color: '#C20DA3' },
      },
      {
        ...defaultOptionTVS,
        name: 'Public Sale',
        data: getDataMonthly(18000000, 60, 40).map((item) => item.amount),
        areaStyle: { color: '#A964C9' },
      },
      {
        ...defaultOptionTVS,
        name: 'Liquidity Pools DEX',
        data: getLiquidityPool(14400000).map((item) => item.amount),
        areaStyle: { color: '#3D8AFF' },
      },
      {
        ...defaultOptionTVS,
        name: 'CEX Listing',
        data: getDataMonthly(18000000, 60, 40).map((item) => item.amount),
        areaStyle: { color: 'pink' },
      },
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
            <div className="divide" />
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
            <div className="divide" />
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

        <ContainnerStyledF2>
          <StyledF2>
            {ADDRESS.map((item, index) => (
              <Address addr={item} key={String(item.asset + index)} />
            ))}
          </StyledF2>
        </ContainnerStyledF2>

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