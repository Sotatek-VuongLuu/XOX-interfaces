import { Button, Flex, Text } from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;

  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 28px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 2px solid #ffb000;
    border-left: 2px solid #ffb000;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 2px;
    height: calc(75% - 28px);
    position: absolute;
    bottom: 28px;
    left: 0;
    z-index: 1;
    background: linear-gradient(to bottom, rgba(16, 16, 16, 0.3) 15%, #ed1c51, #ffb000);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 28px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 2px solid #ffb000;
    border-right: 2px solid #ffb000;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 2px;
    height: calc(75% - 28px);
    position: absolute;
    bottom: 28px;
    right: 0;
    z-index: 1;
    background: linear-gradient(to bottom, rgba(16, 16, 16, 0.3) 15%, #ed1c51, #ffb000);
  }

  .btn_group {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 16px;

    .btn_get_eth {
      position: relative;
      cursor: pointer;

      .corner_btn_1 {
        position: absolute;
        left: 0;
        width: 40px;
        height: 100%;
        border-radius: 10px;
        z-index: 1;
        border-bottom: 2px solid #b809b5;
        border-top: 2px solid #b809b5;
        border-left: 2px solid #b809b5;
        border-bottom-right-radius: unset;
        border-top-right-radius: unset;
      }

      .edge_btn_1 {
        position: absolute;
        top: 0;
        left: 40px;
        height: 2px;
        width: calc(100% - 80px);
        background: linear-gradient(95.32deg, #b809b5, #ed1c51, #ffb000);
      }

      .corner_btn_2 {
        position: absolute;
        right: 0;
        width: 40px;
        height: 100%;
        border-radius: 10px;
        z-index: 1;
        border-bottom: 2px solid #ffb000;
        border-top: 2px solid #ffb000;
        border-right: 2px solid #ffb000;
        border-bottom-left-radius: unset;
        border-top-left-radius: unset;
      }

      .edge_btn_2 {
        position: absolute;
        bottom: 0;
        left: 40px;
        height: 2px;
        width: calc(100% - 80px);
        background: linear-gradient(95.32deg, #b809b5, #ed1c51, #ffb000);
      }

      span {
        position: absolute;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      @media screen and (max-width: 900px) {
        span {
          font-size: 16px;
          line-height: 19px;
          white-space: nowrap;
        }
      }
    }
  }
`

const Content = styled.div`
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 28px 18px;

  .title {
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.075em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.87);
  }

  @media screen and (max-width: 900px) {
    .title {
      font-size: 16px;
      line-height: 19px;
    }
  }
`

export const CustomTableWrapper = styled(Flex)`
  padding-top: 24px;
  flex-direction: column;
  gap: 16px;
  overflow-x: auto;

  & > div:last-child {
    margin-bottom: 16px;
  }

  .active {
    width: 100%;
    background: linear-gradient(
      95.32deg,
      rgba(184, 9, 181, 0.2) -7.25%,
      rgba(237, 28, 81, 0.2) 54.2%,
      rgba(255, 176, 0, 0.2) 113.13%
    );
    border-radius: 30px;
  }

  @media screen and (max-width: 900px) {
    padding-top: 12px;
  }
`

const Table = styled.div`
  padding: 16px 20px;
  display: grid;
  gap: 10px;
  align-items: center;
  position: relative;
  grid-template-columns: 0.75fr 1fr 1.2fr repeat(2, 1fr);

  .corner_active1 {
    position: absolute;
    left: 0;
    width: 40px;
    height: 100%;
    border-radius: 30px;
    z-index: 1;
    border-bottom: 2px solid #ffb000;
    border-top: 2px solid #ffb000;
    border-left: 2px solid #ffb000;
    border-bottom-right-radius: unset;
    border-top-right-radius: unset;
  }
  .corner_active2 {
    position: absolute;
    right: 0;
    width: 40px;
    height: 100%;
    border-radius: 30px;
    z-index: 1;
    border-bottom: 2px solid #b809b5;
    border-top: 2px solid #b809b5;
    border-right: 2px solid #b809b5;
    border-bottom-left-radius: unset;
    border-top-left-radius: unset;
  }

  .edge_active1 {
    position: absolute;
    top: 0;
    left: 40px;
    height: 2px;
    width: calc(100% - 80px);
    background: linear-gradient(95.32deg, #ffb000, #ed1c51, #b809b5);
  }

  .edge_active2 {
    position: absolute;
    bottom: 0;
    left: 40px;
    height: 2px;
    width: calc(100% - 80px);
    background: linear-gradient(95.32deg, #ffb000, #ed1c51, #b809b5);
  }

  .table-header_col {
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.6);
  }

  .table-header {
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.87);
  }

  .active_text {
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #64c66d;
  }

  @media screen and (max-width: 900px) {
    & {
      padding: 8px 10px;
    }
    .table-header_col {
      font-size: 12px;
      line-height: 15px;
    }

    .table-header {
      font-size: 12px;
      line-height: 15px;
    }

    .active_text {
      font-size: 12px;
      line-height: 15px;
    }
  }
`

const CustomButton = styled(Button)`
  height: 54px;

  @media screen and (max-width: 900px) {
    font-size: 16px;
    line-height: 19px;
    padding: 12px 14px;
  }
`

function PricingInfo({ onModalExchangeSale }) {
  const { account } = useActiveWeb3React()

  const dataPricing = [
    {
      status: 'Live',
      round: 'Round 1',
      xOXCoin: '100',
      price: '0.06',
      xOXBonus: '10',
    },
    {
      status: null,
      round: 'Round 2',
      xOXCoin: '100',
      price: '0.06',
      xOXBonus: '10',
    },
    {
      status: null,
      round: 'Round 3',
      xOXCoin: '100',
      price: '0.06',
      xOXBonus: '10',
    },
  ]
  return (
    <Wrapper>
      <div className="corner1" />
      <div className="edge1" />
      <div className="corner2" />
      <div className="edge2" />
      <Content>
        <p className="title">ROUNDS AND PRICING INFORMATION</p>
        <CustomTableWrapper>
          <Table>
            <Text className="table-header_col" />
            <Text className="table-header_col">Round</Text>
            <Text className="table-header_col">XOX Coins</Text>
            <Text className="table-header_col">Price</Text>
            <Text className="table-header_col">XOXS Bonus</Text>
          </Table>

          {Array.from(dataPricing).map((item) => {
            return (
              <Table className={!!item.status && `active`}>
                {!!item.status && (
                  <>
                    <div className="corner_active1" />
                    <div className="edge_active1" />
                    <div className="corner_active2" />
                    <div className="edge_active2" />
                  </>
                )}

                {item.status ? (
                  <Text
                    fontSize="16px"
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontWeight="700"
                    lineHeight="19px"
                    color="#64C66D"
                    className={!!item.status && `active_text`}
                  >
                    Live
                  </Text>
                ) : (
                  <Text className="table-header" />
                )}

                <Text className="table-header">Round 1</Text>
                <Text className="table-header">15.000 XOX</Text>
                <Text className="table-header">$0.06</Text>
                <Text className="table-header">10%</Text>
              </Table>
            )
          })}
        </CustomTableWrapper>
        {!account && <ConnectWalletButton width="100%" />}
        {account && (
          <div className="btn_group">
            <CustomButton onClick={onModalExchangeSale}>Buy with USDT</CustomButton>
            <div className="btn_get_eth">
              <div className="corner_btn_1" />
              <div className="edge_btn_1" />
              <div className="corner_btn_2" />
              <div className="edge_btn_2" />
              <span>Buy with USDC</span>
            </div>
          </div>
        )}
      </Content>
    </Wrapper>
  )
}

export default PricingInfo
