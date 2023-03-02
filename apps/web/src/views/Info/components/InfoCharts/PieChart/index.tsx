import { isAddress } from '@ethersproject/address'
import { USD_ADDRESS, XOX_ADDRESS } from 'config/constants/exchange'
import { useActiveChainId } from 'hooks/useActiveChainId'
import React from 'react'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import styled from 'styled-components'
import { formatAmount } from 'utils/formatInfoNumbers'
import { CurrencyLogo } from '../../CurrencyLogo'

// const RADIAN = Math.PI / 180

const CustomTooltipStyle = styled.div`
  position: relative;
  .content {
    width: 132px;
    height: 38px;
    padding: 7px;
    background: #242424;
    border-radius: 10px;

    .symbol {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.87);
      position: relative;
    }

    .label {
      font-weight: 400;
      font-size: 12px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.6);
    }

    img {
      display: inline-block;
      margin-bottom: -10px;
    }
  }

  .border {
    width: 134px;
    height: 40px;
    background: linear-gradient(180deg, rgba(220, 96, 50, 0.3) 0%, rgba(254, 64, 57, 0.3) 100%);
    position: absolute;
    left: -1px;
    top: -1px;
    z-index: -1;
    border-radius: 10px;
  }
`

const PieWrapper = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  color: rgba(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin-bottom: 16px;
  position: relative;

  .recharts-wrapper {
    cursor: pointer !important;
  }

  .circle {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    z-index: -1;
  }

  .icon {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    z-index: -1;
  }
`

const CustomTooltip = ({ active, payload }: any) => {
  const { chainId } = useActiveChainId()

  const icon = () => {
    if (!active || !payload || !payload.length) return null

    const chainName = chainId === 1 || chainId === 5 ? 'ETH' : 'BSC'

    switch (payload[0].name) {
      case 'ETH':
      case 'BNB':
        return <CurrencyLogo address={payload[0].name} size="24" chainName={chainName} />
      case 'Others':
        return null
      case 'XOX':
        return <CurrencyLogo address={XOX_ADDRESS[chainId]} size="24" chainName={chainName} />
      default:
        return <CurrencyLogo address={USD_ADDRESS[chainId]} size="24" chainName={chainName} />
    }
  }

  if (active && payload && payload.length) {
    return (
      <CustomTooltipStyle>
        <div className="border"></div>
        <div className="content">
          {icon()}
          <span className="symbol">{payload[0].name}</span>
          <span className="label">{payload[0].value}%</span>
        </div>
      </CustomTooltipStyle>
    )
  }

  return null
}

export default function InfoPieChart({ data, colors, total }) {
  return (
    <PieWrapper>
      {total > 0 ? (
        // <Chart chartType="PieChart" data={data} options={options} width="100%" height="200px" />
        //         <PieChart width={730} height={250}>
        //   <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
        // </PieChart>
        <>
          <PieChart width={250} height={250}>
            <defs>
              {data.map((entry, index) => (
                <linearGradient id={`myGradient${index}`}>
                  <stop offset="0%" stopColor={colors[index % colors.length].start} />
                  <stop offset="100%" stopColor={colors[index % colors.length].end} />
                </linearGradient>
              ))}
            </defs>
            <Pie
              data={data}
              outerRadius={95}
              dataKey="value"
              nameKey="name"
              startAngle={90}
              endAngle={-270}
              innerRadius={85}
              cornerRadius={40}
              paddingAngle={5}
              // onMouseOver={renderCustomizedLabel}
            >
              {data.map((_: any, index: number) => (
                <Cell
                  key={colors[index % colors.length]}
                  style={{
                    filter: `drop-shadow(0px 0px 10px ${colors[index % colors.length].start}`,
                  }}
                  stroke="none"
                  fill={`url(#myGradient${index})`}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: 'none' }} />
          </PieChart>
          <svg height="160" width="160" className="circle">
            <circle cx="80" cy="80" r="75" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="56"
            viewBox="0 0 48 56"
            fill="none"
            className="icon"
          >
            <path
              d="M22.8217 0.633371C21.9236 1.16343 20.9076 1.75239 17.3739 3.78429C15.0401 5.13153 12.3677 6.67018 11.5947 7.11926C11.072 7.42846 10.38 7.81864 10.0708 7.99533C9.75425 8.17202 9.49658 8.33398 9.49658 8.34871C9.49658 8.37079 10.196 8.78306 11.7052 9.65177C12.088 9.87263 12.9567 10.3732 13.634 10.7634C14.3113 11.161 14.8782 11.4775 14.9003 11.4775C14.9223 11.4775 15.1138 11.3745 15.3273 11.2493C15.5408 11.1168 16.7776 10.4027 18.0733 9.65913C19.369 8.90821 21.2315 7.83337 22.2107 7.2665L23.9996 6.23582L24.7506 6.67018C25.1702 6.91312 26.8487 7.87754 28.4904 8.82723C30.1322 9.76956 31.8254 10.7487 32.2671 11.0064C32.7015 11.264 33.0696 11.4775 33.0917 11.4775C33.1653 11.4775 38.5027 8.38552 38.5027 8.34871C38.5027 8.33398 38.3113 8.21619 38.0831 8.08368C37.1334 7.54625 30.8315 3.90944 29.926 3.37938C29.6021 3.18797 28.7407 2.68736 28.0119 2.27509C27.2831 1.85546 26.0978 1.17816 25.3837 0.758525C24.6696 0.338893 24.0365 -0.00711918 23.9849 0.000242233C23.9334 0.000242233 23.4107 0.287359 22.8217 0.633371Z"
              fill="white"
            />
            <path
              d="M3.05521 12.0518C1.67117 12.8469 0.419632 13.5757 0.272393 13.6641L0 13.826V16.7561V19.6861L1.4135 20.496C2.1865 20.9377 3.40123 21.6444 4.11534 22.0567L5.41104 22.8076L5.43313 19.8702L5.44785 16.9401L7.5681 15.7254C10.6601 13.9512 10.9914 13.7524 10.9178 13.6861C10.8589 13.6346 5.59509 10.5941 5.573 10.6015C5.56564 10.6015 4.4319 11.2567 3.05521 12.0518Z"
              fill="white"
            />
            <path
              d="M39.6886 12.1622C37.0751 13.6714 37.0089 13.7156 37.1782 13.826C37.2666 13.8923 38.5107 14.6138 39.9316 15.4309L42.5156 16.9254L42.5524 19.8628L42.5892 22.8076L43.885 22.0567C44.5991 21.6444 45.8138 20.9377 46.5868 20.496L48.0003 19.6861L47.9782 16.7487L47.9635 13.8039L47.5954 13.5904C46.5058 12.95 42.4052 10.5941 42.3905 10.6015C42.3758 10.6015 41.161 11.3082 39.6886 12.1622Z"
              fill="white"
            />
            <path
              d="M22.0123 11.8452C20.9816 12.4489 19.8258 13.1188 19.443 13.3397L18.7583 13.7372L19.1485 13.9581C19.3693 14.0759 20.5325 14.7458 21.7325 15.4378C22.9325 16.1372 23.9558 16.7041 24.0074 16.7041C24.0516 16.7041 25.1779 16.0783 26.4957 15.3127C27.8135 14.547 28.9767 13.8845 29.0724 13.8329C29.2417 13.7446 29.227 13.7372 28.7043 13.428C26.4515 12.1102 24.0368 10.7409 23.9706 10.7483C23.9264 10.7483 23.043 11.2489 22.0123 11.8452Z"
              fill="white"
            />
            <path
              d="M13.5461 16.7331C12.8394 17.1527 11.5952 17.8742 10.7854 18.3454L9.31299 19.1993V22.1294V25.0595L11.3375 26.23C12.4492 26.8705 14.5253 28.0631 15.9388 28.8803L18.5154 30.3674L18.5375 35.9331L18.5522 41.4987L20.0099 42.3306C20.805 42.7871 22.0197 43.4865 22.697 43.884C23.3817 44.2815 23.9633 44.6055 23.9927 44.6055C24.0295 44.6055 24.6111 44.2815 25.2958 43.884C25.9805 43.4865 27.1952 42.7871 27.9903 42.3306L29.448 41.4987L29.4627 35.9331L29.4848 30.3748L31.8406 29.0128C33.1363 28.2619 35.205 27.0693 36.4418 26.3552L38.6872 25.0595V22.1294V19.1993L35.897 17.5797L33.1068 15.9674L32.5473 16.2914C32.2381 16.4681 30.832 17.2852 29.4111 18.1024C27.9976 18.9196 26.2087 19.9503 25.4504 20.392C24.6921 20.8337 24.0369 21.1944 24.0001 21.1944C23.9633 21.1944 23.4111 20.8926 22.7707 20.5171C22.1302 20.149 21.2909 19.6631 20.9081 19.4423C20.5253 19.2214 19.0455 18.3674 17.6173 17.5429C16.1964 16.7184 14.9817 16.0263 14.9302 16.0116C14.8786 15.9969 14.2529 16.3208 13.5461 16.7331Z"
              fill="white"
            />
            <path
              d="M0 32.872C0 37.6647 0.0294478 41.5886 0.0588957 41.5886C0.0883435 41.5886 0.44908 41.78 0.853987 42.0156C1.25153 42.2512 2.37791 42.9064 3.34969 43.4659C5.88221 44.9236 9.46012 46.9923 12.1693 48.5604C13.4503 49.3039 14.5546 49.9297 14.6135 49.9518C14.7092 49.9886 14.7239 49.6131 14.7239 46.8745V43.7604L14.0098 43.3407C13.6123 43.1125 12.0294 42.1996 10.4908 41.3162C8.95214 40.4254 7.18527 39.4095 6.57423 39.0561L5.44785 38.4082L5.43313 32.8426L5.41104 27.2769L3.7546 26.3273C2.84172 25.8046 1.62699 25.1052 1.05276 24.7665L0 24.1555V32.872Z"
              fill="white"
            />
            <path
              d="M47.485 24.4492C47.2199 24.6112 46.0126 25.3105 44.7978 26.0099L42.5892 27.2762L42.5524 32.8492L42.5156 38.4222L39.5708 40.1228C37.9512 41.0578 35.8751 42.2578 34.9549 42.7878L33.2764 43.7522V46.8664C33.2764 48.5817 33.2985 49.9805 33.3205 49.9805C33.35 49.9805 34.4837 49.34 35.8457 48.5522C42.2359 44.8492 47.8972 41.5878 47.9488 41.5731C47.9782 41.5584 47.9929 37.6418 47.9856 32.8565L47.9635 24.1694L47.485 24.4492Z"
              fill="white"
            />
            <path
              d="M9.29069 32.8643L9.31278 36.1551L10.5275 36.8545C13.7815 38.7392 14.6428 39.2324 14.687 39.2324C14.7091 39.2324 14.7238 37.7527 14.7238 35.9343V32.6435L12.0956 31.1343C10.6527 30.3024 9.43057 29.6177 9.37168 29.603C9.29069 29.5809 9.27597 30.1183 9.29069 32.8643Z"
              fill="white"
            />
            <path
              d="M35.9119 31.1192L33.2837 32.6432L33.2764 35.9487C33.2764 38.5548 33.2985 39.2395 33.3721 39.21C33.4162 39.1953 34.6383 38.4959 36.0739 37.664L38.6874 36.1475L38.7095 32.8714C38.7242 30.2653 38.7095 29.588 38.6359 29.5953C38.5843 29.5953 37.3549 30.2873 35.9119 31.1192Z"
              fill="white"
            />
            <path
              d="M18.5518 49.1264V52.2479L20.1567 53.1681C21.0327 53.6761 22.1665 54.3313 22.6745 54.6258C23.1824 54.9202 23.683 55.2147 23.7935 55.2736C23.9849 55.3841 24.0143 55.3841 24.3162 55.2074C24.4929 55.1043 25.7149 54.3975 27.0401 53.6319L29.4475 52.2479V49.1264C29.4475 47.411 29.4327 46.0049 29.418 46.0049C29.4033 46.0049 28.7775 46.3583 28.034 46.7853C27.2978 47.2123 26.083 47.9117 25.3468 48.3387L24.007 49.1117L22.6597 48.3387C21.9162 47.9117 20.7088 47.2123 19.9653 46.7853C19.2217 46.3583 18.6033 46.0049 18.5812 46.0049C18.5665 46.0049 18.5518 47.411 18.5518 49.1264Z"
              fill="white"
            />
          </svg>
        </>
      ) : (
        'No data'
      )}
    </PieWrapper>
  )
}
