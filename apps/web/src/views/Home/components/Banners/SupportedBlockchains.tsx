import styled from 'styled-components'
// eslint-disable-next-line import/no-cycle

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { spawn } from 'child_process'
import React, { useState } from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional
import { Box, Grid } from '@mui/material'
import { useRouter } from 'next/router'

// eslint-disable-next-line import/no-cycle
interface ItemProps {
  item: CoinItem
}

interface DataItemProps {
  item: DataItem
}

export interface CoinItem {
  icon: string
}

export interface DataItem {
  currency: string,
  data: string,
  description: string
}

const WrapperI = styled.div`
  height: 100%;
  // padding: 24px 22px 32px;
  // background: rgba(16, 16, 16, 0.3);
  // backdrop-filter: blur(10px);
  // border-radius: 20px;

  .main_container {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;

    .get_xox {
      padding: 1px;
      width: fit-content;
      margin-top: 40px;
      border-radius: 8px;
      background: linear-gradient(95.32deg, #B809B5 -7.25%, #ED1C51 54.2%, #FFB000 113.13%);
      cursor: pointer;

      .boxed-child {
        width: 100%;
        height: 100%;
        background: rgba(16, 16, 16, 1);
        padding: 10px 20px;
        border-radius: inherit;
        span {
          background: linear-gradient(95.32deg, #B809B5 -7.25%, #ED1C51 54.2%, #FFB000 113.13%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          font-weight: 700;
          font-size: 14px;
          width: 100%;
          height: 100%;
          background-color: #191a28;
          border-radius: inherit;
        }
      }
    }

    .expand {
      color: #FB8618;
      font-size: 14px;
      font-weight: 600;
    }

    .data-item {
      padding: 32px 68px;
      gap: 10px;
      margin-bottom: 32px;
      border-radius: 10px;
      background: rgba(16, 16, 16, 0.3);
      backdrop-filter: blur(10px);

      .data-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border-radius: inherit;

        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
      }
    }
  }
`

const Title = styled.p`
  font-weight: bold;
  font-size: 40px;
  color: rgba(255, 255, 255, 0.87);
  line-height: 48px;

  :before {
    content: '$';
    font-size: 20px;
    line-height: 24px;
    vertical-align: top;
    color: rgba(255, 255, 255, 0.6)
  }

  @media screen and (max-width: 900px) {
    font-size: 18px;
    line-height: 22px;
    margin-top: 24px;
  }

  @media screen and (max-width: 576px) {
    font-size: 40px;
    line-height: 48px;
  }
`

const Description = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 16px 0 0;
  line-height: 24px;

  @media screen and (max-width: 576px) {
    font-size: 16px;
    line-height: 24px;
  }
`

const Icon = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 34px;

  @media screen and (min-width: 500px) and (max-width: 576px) {
    width: 48px;
    height: 48px;
  }

  @media screen and (max-width: 499px) {
    width: 32px;
    height: 32px;
  }
`

const DataItemDisplay = ({ item }: DataItemProps) => {
  return (
    <WrapperI className="item list-coin">
      <div className="main_container">
        <div className="data-item">
          <div className='data-box'>
            <Title>{item.data}</Title>
            <Description>
            {item.description}
            </Description>
          </div>
        </div>
      </div>
    </WrapperI>
  )
}

const CoinItemDisplay = ({ item }: ItemProps) => {
  return (
    <WrapperI className="item list-coin">
      <div className="main_container">
        <Icon>
          <img src={item.icon} alt="icon" />
        </Icon>
      </div>
    </WrapperI>
  )
}

const Wrapper = styled.div`
  margin-bottom: 100px;
  margin-top: 48px;
  .title {
    display: flex;
    justify-content: center;
    margin-bottom: 48px;

    .describe {
      font-size: 18px;
      line-height: 24px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.6);
    }
  }
  
  .coin-item:last-child {
    .main_container div {
      border: 2px dashed orange;
    }
  }

  @media screen and (max-width: 900px) {
    margin-bottom: unset;
    margin-top: 150px;
    .title {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .heart {
        font-size: 20px;
        line-height: 32px;
      }
      .describe {
        font-size: 14px;
        line-height: 24px;
        width: unset;
      }
    }
  }

  @media screen and (max-width: 576px) {
    margin-bottom: unset;
  }

  .coin-block {
    display: flex;
    justify-content: center;

    .coin-box {
      display: grid;
      grid-template-columns: repeat(14, 1fr);
      grid-template-rows: repeat(5, 0.4fr);
      grid-column-gap: 16px;
      grid-row-gap: 0px;
      align-items: center;
      width: 95%;

      @media screen and (min-width: 500px) and (max-width: 576px) {
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(14, 0.4fr);
        width: 100%;

        img {
          width: 26px;
          height: auto;
          object-fit: contain;
        }
      }

      @media screen and (max-width: 499px) {
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(14, 0.4fr);
        width: 105%;

        img {
          width: 16px;
          height: auto;
          object-fit: contain;
        }
      }
    }
  }
`

const SupportedBlockchains = () => {
  return (
    <Wrapper>
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Grid container spacing={2}>
          {dataCollected.map((item: DataItem, index) => {
            return (
              <Grid item xs={12} md={3} key={index} data-aos="fade-up">
                <DataItemDisplay item={item} />
              </Grid>
            )
          })}
        </Grid>
      </Box>

      <div className="title" style={{ overflow: 'hidden' }}>
        <p className="describe" data-aos="fade-left">
          Supported blockchains
        </p>
      </div>

      {/* <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Grid container spacing={{ xs: 1, md: 2 }}>
          {listCoin.map((item: CoinItem, index) => {
            return (
              <Grid item xs={1.71428571429} md={0.85714285714} key={index+1} data-aos="fade-up" className="coin-item">
                <CoinItemDisplay item={item} />
              </Grid>
            )
          })}
        </Grid>
      </Box> */}

      <Box>
        <div className="coin-block">
          <div className="coin-box">
            {listCoin.map((item: CoinItem, index) => {
              return (
                <Grid item xs={1.71428571429} md={0.85714285714} key={index+1} data-aos="fade-up" className="coin-item">
                  <CoinItemDisplay item={item} />
                </Grid>
              )
            })}
          </div>
        </div>
      </Box>
    </Wrapper>
  )
}

const listCoin = [
  {
    icon: '/images/home/coins/1_eth.svg'
  },
  {
    icon: '/images/home/coins/2_bsc.svg'
  },
  {
    icon: '/images/home/coins/3_arbitrum.svg'
  },
  {
    icon: '/images/home/coins/4_solana.svg'
  },
  {
    icon: '/images/home/coins/5_polygon.svg'
  },
  {
    icon: '/images/home/coins/6_optimism.svg'
  },
  {
    icon: '/images/home/coins/7_avalanche.svg'
  },
  {
    icon: '/images/home/coins/8_fantom.svg'
  },
  {
    icon: '/images/home/coins/9_cronos.svg'
  },
  {
    icon: '/images/home/coins/10_ethereumPOW.svg'
  },
  {
    icon: '/images/home/coins/11_kava.svg'
  },
  {
    icon: '/images/home/coins/12_algorand.svg'
  },
  {
    icon: '/images/home/coins/13_klaytn.svg'
  },
  {
    icon: '/images/home/coins/14_bitgert.svg'
  },
  {
    icon: '/images/home/coins/15_aptos.svg'
  },
  {
    icon: '/images/home/coins/16_acala.svg'
  },
  {
    icon: '/images/home/coins/17_canto.svg'
  },
  {
    icon: '/images/home/coins/18_osmosis.svg'
  },
  {
    icon: '/images/home/coins/19_hedera.svg'
  },
  {
    icon: '/images/home/coins/20_near.svg'
  },
  {
    icon: '/images/home/coins/21_thorchain.svg'
  },
  {
    icon: '/images/home/coins/22_bittorent.svg'
  },
  {
    icon: '/images/home/coins/23_wave.svg'
  },
  {
    icon: '/images/home/coins/24_aurora.svg'
  },
  {
    icon: '/images/home/coins/25_celo.svg'
  },
  {
    icon: '/images/home/coins/26_bitcoin.svg'
  },
  {
    icon: '/images/home/coins/27_gnosis.svg'
  },
  {
    icon: '/images/home/coins/28_moonbeam.svg'
  },
  {
    icon: '/images/home/coins/29_eos.svg'
  },
  {
    icon: '/images/home/coins/30_cardano.svg'
  },
  {
    icon: '/images/home/coins/31_elrond.svg'
  },
  {
    icon: '/images/home/coins/32_heco.svg'
  },
  {
    icon: '/images/home/coins/33_neo.svg'
  },
  {
    icon: '/images/home/coins/34_astar.svg'
  },
  {
    icon: '/images/home/coins/35_kucoin.svg'
  },
  {
    icon: '/images/home/coins/36_OKExchain.svg'
  },
  {
    icon: '/images/home/coins/37_Metis.svg'
  },
  {
    icon: '/images/home/coins/38_Tezos.svg'
  },
  {
    icon: '/images/home/coins/39_stella.svg'
  },
  {
    icon: '/images/home/coins/40_velas.svg'
  },
  {
    icon: '/images/home/coins/41.svg'
  },
  {
    icon: '/images/home/coins/42_fusion.svg'
  },
  {
    icon: '/images/home/coins/43_terra2.svg'
  },
  {
    icon: '/images/home/coins/44_cosmos.svg'
  },
  {
    icon: '/images/home/coins/45_kadena.svg'
  },
  {
    icon: '/images/home/coins/46_telos.svg'
  },
  {
    icon: '/images/home/coins/47_vechain.svg'
  },
  {
    icon: '/images/home/coins/48.svg'
  },
  {
    icon: '/images/home/coins/49_ronin.svg'
  },
  {
    icon: '/images/home/coins/50_icon.svg'
  },
  {
    icon: '/images/home/coins/51_moonriver.svg'
  },
  {
    icon: '/images/home/coins/52_iotex.svg'
  },
  {
    icon: '/images/home/coins/53.svg'
  },
  {
    icon: '/images/home/coins/54_ontology.svg'
  },
  {
    icon: '/images/home/coins/55_boba.svg'
  },
  {
    icon: '/images/home/coins/56_polkadot.svg'
  },
  {
    icon: '/images/home/coins/57_ICP.svg'
  },
  {
    icon: '/images/home/coins/58_tomochain.svg'
  },
  {
    icon: '/images/home/coins/59_shiden.svg'
  },
  {
    icon: '/images/home/coins/60_evmos.svg'
  },
  {
    icon: '/images/home/coins/61_mixin.svg'
  },
  {
    icon: '/images/home/coins/62_DefiChain.svg'
  },
  {
    icon: '/images/home/coins/63_subtract.svg'
  },
  {
    icon: '/images/home/coins/64_Vision.svg'
  },
  {
    icon: '/images/home/coins/65_TLchain.svg'
  },
  {
    icon: '/images/home/coins/66_conflux.svg'
  },
  {
    icon: '/images/home/coins/67_everscale.svg'
  },
  {
    icon: '/images/home/coins/68_zilliqa.svg'
  },
  {
    icon: '/images/home/coins/69_rootstock.svg'
  },
  {
    icon: '/images/home/coins/plus.svg'
  }
]

const dataCollected = [
  {
    currency: '/images/home/coins/1_eth.svg',
    data: "22.09M",
    description: "Market Cap"
  },
  {
    currency: '/images/home/coins/1_eth.svg',
    data: "22.09M",
    description: "Total Volume"
  },
  {
    currency: '/images/home/coins/1_eth.svg',
    data: "22.09M",
    description: "Holders"
  },
  {
    currency: '/images/home/coins/1_eth.svg',
    data: "22.09M",
    description: "XOXS Staked"
  }
]

export default SupportedBlockchains
