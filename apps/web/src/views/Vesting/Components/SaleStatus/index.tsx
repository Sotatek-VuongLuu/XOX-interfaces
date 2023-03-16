import { formatEther } from '@ethersproject/units'
import { Box, Grid } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { RoundInfo } from 'views/Vesting'

interface IPropsWrapperItem {
  status?: boolean
  percent?: number
}

const WrapperItem = styled(Box)<IPropsWrapperItem>`
  position: relative;
  background: rgba(16, 16, 16, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 20px;

  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 10;
    border-bottom: 1px solid #ffffff30;
    border-left: 1px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 1px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    left: 0;
    z-index: 10;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 10;
    border-bottom: 1px solid #ffffff30;
    border-right: 1px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 1px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: 10;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .sold {
    position: relative;
    overflow: hidden;
    text-align: center;
    padding-top: 17px;
    padding-bottom: 18px;
    font-weight: 700;
    font-size: 16px;
    height: 54px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    border-radius: 0px 0px 20px 20px;

    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 1px;
      top: 0;
      left: 0;
      z-index: 11;
      background: rgba(255, 255, 255, 0.2);
    }

    .value {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
      z-index: 9;
      background: transparent;
      border-radius: 0px 0px 20px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .background {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: 5;
      background: ${({ percent }) =>
        percent !== 0
          ? `linear-gradient(to right, transparent ${0}% ${percent}%, black ${percent + 4}%  ${104}%)`
          : 'black'};
      backdrop-filter: blur(10px);
      border-radius: ${({ percent }) => (percent >= 100 ? '0px 0px 20px 20px' : '0px 0px 20px 20px')};
    }
  }

  .status_name {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.6);
  }
  .status_value {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
    margin-top: 5px;
  }
  .name {
    position: absolute;
    padding: 10px 20px;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    background: ${({ status }) =>
      status ? ' linear-gradient(95.32deg, #B809B5 -7.25%, #ED1C51 54.2%, #FFB000 113.13%)' : '#0d0d0d'};
    border-radius: 30px;
    left: 50%;
    transform: translate(-50%, -50%);

    .corner_name_1 {
      position: absolute;
      left: 0;
      width: 33px;
      height: 100%;
      border-radius: 30px;
      z-index: 1;
      border-left: 1px solid #ffffff30;
      border-bottom: 1px solid #ffffff30;
      border-bottom-right-radius: unset;
      transform: translateY(-10px);
    }
    .corner_name_2 {
      position: absolute;
      right: 0;
      width: 33px;
      height: 100%;
      border-radius: 30px;
      z-index: 1;
      border-right: 1px solid #ffffff30;
      border-bottom: 1px solid #ffffff30;
      border-bottom-left-radius: unset;
      transform: translateY(-10px);
    }

    .edge_name_2 {
      position: absolute;
      bottom: 0;
      left: 33px;
      height: 1px;
      width: calc(100% - 66px);
      background: #ffffff30;
    }
  }

  .corner_active_1 {
    position: absolute;
    left: 0;
    width: 40px;
    height: 100%;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 1px solid #b809b5;
    border-top: 1px solid #b809b5;
    border-left: 1px solid #b809b5;
    border-bottom-right-radius: unset;
    border-top-right-radius: unset;
  }

  .edge_active_1 {
    position: absolute;
    top: 0;
    left: 40px;
    height: 1px;
    width: calc(100% - 80px);
    background: linear-gradient(95.32deg, #b809b5, #ed1c51, #ffb000);
  }

  .corner_active_2 {
    position: absolute;
    right: 0;
    width: 40px;
    height: 100%;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 1px solid #ffb000;
    border-top: 1px solid #ffb000;
    border-right: 1px solid #ffb000;
    border-bottom-left-radius: unset;
    border-top-left-radius: unset;
  }

  .edge_active_2 {
    position: absolute;
    bottom: 0;
    left: 40px;
    height: 1px;
    width: calc(100% - 80px);
    background: linear-gradient(95.32deg, #b809b5, #ed1c51, #ffb000);
  }

  .status {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
  }

  .live {
    color: #64c66d;
  }

  .end {
    color: #ff5353;
  }

  .incoming {
    color: rgba(255, 255, 255, 0.38);
  }

  .dot_contain {
    position: relative;
  }

  .dot {
    top: -7px;
    margin-left: 5px;
    position: absolute;
    font-weight: 700;
    font-size: 36px;
    line-height: 19px;
    color: #64c66d;
    @media screen and (max-width: 900px) {
      top: -8px !important;
    }
  }

  @media screen and (max-width: 900px) {
    .mbpadding {
      padding: 35px 24px !important;
    }
    .status_name {
      font-size: 12px;
      line-height: 15px;
    }

    .status_value {
      font-size: 14px;
      line-height: 17px;
    }

    .sold {
      font-size: 14px;
      line-height: 17px;
      height: 43px;
    }
  }
`

const CustomGrid = styled(Grid)`
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 45px;
  }
`

enum StatusSale {
  LIVE = 'Live',
  END = 'End',
  INCOMING = 'Incoming',
}

const Item = ({ item }) => {
  const percent = new BigNumber(
    new BigNumber(formatEther(item?.xox_amount_bought || '0')).multipliedBy(100).dividedBy(item.xOXforSale),
  ).toFixed(4, 1)
  return (
    <WrapperItem status={item.status === StatusSale.LIVE} percent={parseFloat(percent)}>
      {item.status === StatusSale.LIVE && (
        <>
          <div className="corner_active_1" />
          <div className="edge_active_1" />
          <div className="corner_active_2" />
          <div className="edge_active_2" />
        </>
      )}

      {item.status !== StatusSale.LIVE && (
        <>
          <div className="corner1" />
          <div className="edge1" />
          <div className="corner2" />
          <div className="edge2" />
        </>
      )}

      <div className="name">
        {item.status !== StatusSale.LIVE && (
          <>
            <div className="corner_name_1" />
            <div className="edge_name_1" />
            <div className="corner_name_2" />
            <div className="edge_name_2" />
          </>
        )}
        {item.name}
      </div>
      <Grid gridTemplateColumns="1.25fr 0.75fr" padding="35px 34px" gridGap="22px" className="mbpadding">
        <div>
          <p className="status_name">Status</p>
          <p className={`status_value ${String(item.status).toLocaleLowerCase()} status`}>
            {item.status === StatusSale.LIVE ? (
              <span className="dot_contain">
                <span>{item.status}</span> <span className="dot">.</span>
              </span>
            ) : (
              `${item.status}`
            )}
          </p>
        </div>
        <div>
          <p className="status_name">Current raise</p>
          <p className="status_value">
            {item?.total_raised_usd
              ? new BigNumber(item?.total_raised_usd).div(10 ** 6).toString()
              : item?.currentRaise}
          </p>
        </div>
        <div>
          <p className="status_name">Price</p>
          <p className="status_value">{item.price}</p>
        </div>
        <div>
          <p className="status_name">XOX for Sale</p>
          <p className="status_value">{item.xOXforSale.toLocaleString()}</p>
        </div>
        <div>
          <p className="status_name">Investors</p>
          <p className="status_value">{item?.total_investor ? item?.total_investor : item.investors}</p>
        </div>
        <div>
          <p className="status_name">XOXS Rewarded</p>
          <p className="status_value">
            {item?.xox_amount_bought
              ? new BigNumber(new BigNumber(item?.xoxs_amount_reward).div(10 ** 6).toString()).toFixed(2, 1)
              : item.xOXSRewarded}
          </p>
        </div>
      </Grid>
      <div className="sold">
        <div className="background" />
        <div className="value">
          <span>
            {`${parseFloat(percent)}% `}
            SOLD
          </span>
        </div>
      </div>
    </WrapperItem>
  )
}

interface IProps {
  isInTimeRangeSale?: boolean
  dataStatus: any[]
  infoRoundOne: RoundInfo
  infoRoundTow: RoundInfo
  infoRoundThree: RoundInfo
}

const now = new Date()
const timeStampOfNow = now.getTime()

function SaleStatus({ dataStatus, infoRoundOne, infoRoundTow, infoRoundThree }: IProps) {
  const [dataFormat, setDataFormat] = useState<any[]>([])

  const arrStatus = [
    {
      name: 'Sale 1',
      status: infoRoundOne.startDate
        ? infoRoundOne.startDate <= timeStampOfNow && timeStampOfNow <= infoRoundOne.endDate
          ? StatusSale.LIVE
          : StatusSale.END
        : StatusSale.INCOMING,
      currentRaise: '-',
      price: '$0.044',
      xOXforSale: 2700000,
      investors: '-',
      xOXSRewarded: '-',
    },
    {
      name: 'Sale 2',
      status: infoRoundTow.startDate
        ? infoRoundTow.startDate <= timeStampOfNow && timeStampOfNow <= infoRoundTow.endDate
          ? StatusSale.LIVE
          : StatusSale.END
        : StatusSale.INCOMING,
      currentRaise: '-',
      price: '$0.045',
      xOXforSale: 3600000,
      investors: '-',
      xOXSRewarded: '-',
    },
    {
      name: 'Sale 3',
      status: infoRoundThree.startDate
        ? infoRoundThree.startDate <= timeStampOfNow && timeStampOfNow <= infoRoundThree.endDate
          ? StatusSale.LIVE
          : StatusSale.END
        : StatusSale.INCOMING,
      currentRaise: '-',
      price: '$0.046',
      xOXforSale: 4500000,
      investors: '-',
      xOXSRewarded: '-',
    },
  ]

  const handleFormatData = (roundArr: any[]) => {
    const newDataFormat = []
    let temp: any
    if (roundArr.length === 0) {
      setDataFormat(arrStatus)
    }
    for (let i = 0; i < 3; i++) {
      if (roundArr[i]) {
        temp = { ...roundArr[i], ...arrStatus[i] }
        newDataFormat.push(temp)
      } else {
        temp = arrStatus[i]
        newDataFormat.push(temp)
      }
    }
    if (newDataFormat) {
      setDataFormat(newDataFormat)
    }
  }

  useEffect(() => {
    handleFormatData(dataStatus)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataStatus, infoRoundOne, infoRoundTow, infoRoundThree])

  return (
    <CustomGrid>
      {dataFormat.map((item, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <Item key={index} item={item} />
      })}
    </CustomGrid>
  )
}

export default SaleStatus
