import { Box, Grid } from '@pancakeswap/uikit'
import React from 'react'
import styled from 'styled-components'

const WrapperItem = styled(Box)`
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
    z-index: 1;
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
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
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
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .sold {
    text-align: center;
    padding-top: 17px;
    padding-bottom: 18px;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
    border-top: 1px solid #ffffff30;
    border-radius: 0px 0px 20px 20px;
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
    background: #0d0d0d;
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

  @media screen and (max-width: 900px) {
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

const Item = ({ item }) => {
  return (
    <WrapperItem>
      <div className="corner1" />
      <div className="edge1" />
      <div className="corner2" />
      <div className="edge2" />
      <div className="name">
        <div className="corner_name_1" />
        <div className="edge_name_1" />
        <div className="corner_name_2" />
        <div className="edge_name_2" />
        {item.name}
      </div>
      <Grid gridTemplateColumns="1.25fr 0.75fr" padding="35px 34px" gridGap="22px">
        <div>
          <p className="status_name">Status</p>
          <p className="status_value">{item.status}</p>
        </div>
        <div>
          <p className="status_name">Current raise</p>
          <p className="status_value">{item.currentRaise}</p>
        </div>
        <div>
          <p className="status_name">Price</p>
          <p className="status_value">{item.price}</p>
        </div>
        <div>
          <p className="status_name">XOX for Sale</p>
          <p className="status_value">{item.xOXforSale}</p>
        </div>
        <div>
          <p className="status_name">Investors</p>
          <p className="status_value">{item.investors}</p>
        </div>
        <div>
          <p className="status_name">XOXS Rewarded</p>
          <p className="status_value">{item.xOXSRewarded}</p>
        </div>
      </Grid>
      <div className="sold">30% SOLD</div>
    </WrapperItem>
  )
}

function SaleStatus() {
  const arrStatus = [
    {
      name: 'Sale 1',
      status: 'Live',
      currentRaise: '10.000',
      price: '1 XOX',
      xOXforSale: '2.700.000',
      investors: '50',
      xOXSRewarded: '7.3247',
    },
    {
      name: 'Sale 2',
      status: 'Live',
      currentRaise: '10.000',
      price: '1 XOX',
      xOXforSale: '2.700.000',
      investors: '50',
      xOXSRewarded: '7.3247',
    },
    {
      name: 'Sale 3',
      status: 'Live',
      currentRaise: '10.000',
      price: '1 XOX',
      xOXforSale: '2.700.000',
      investors: '50',
      xOXSRewarded: '7.3247',
    },
  ]

  return (
    <CustomGrid>
      {arrStatus.map((item) => {
        return <Item item={item} />
      })}
    </CustomGrid>
  )
}

export default SaleStatus
