import styled from 'styled-components'
// eslint-disable-next-line import/no-cycle

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { spawn } from 'child_process'
import React, { useState } from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional
import { Box, Grid } from '@mui/material'

// eslint-disable-next-line import/no-cycle

interface Iprops {
  item: ISquareItem
}

export interface ISquareItem {
  icon: string
  title: string
  description: string
  link: string
}

const WrapperI = styled.div`
  height: 100%;
  background: #242424;
  border-radius: 10px;
  padding: 24px 22px 32px;

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
      background-image: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);

      .boxed-child {
        width: 100%;
        height: 100%;
        background-color: #242424;
        padding: 10px 20px;
        border-radius: inherit;
        span {
          background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
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
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      font-weight: 400;
      font-size: 16px;
      width: 100%;
      height: 100%;
      background-color: #191a28;
      border-radius: inherit;
    }
  }
`

const Title = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.87);
  line-height: 25px;

  @media screen and (max-width: 900px) {
    font-size: 18px;
    line-height: 22px;
    margin-top: 24px;
  }
`

const Description = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 16px 0 0;
  line-height: 24px;
  @media screen and (max-width: 900px) {
    font-size: 14px;
    line-height: 24px;
  }
`

const Icon = styled.div`
  background: linear-gradient(100.7deg, #6034ff 0%, #a35aff 100%);
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-bottom: 32px;
`

const SquareItem = ({ item }: Iprops) => {
  const [isShowReadMore, setIsShow] = useState(item.description.length > 450)
  return (
    <WrapperI className="item">
      <div className="main_container">
        <div>
          <Icon>
            <img src={item.icon} alt="icon" />
          </Icon>
          <Title>{item.title}</Title>
          <Description>
            {/* {item.description} */}
            {isShowReadMore ? `${item.description.slice(0, 450)}...` : item.description}{' '}
            {item.description.length > 450 ? (
              <span onClick={() => setIsShow(!isShowReadMore)} style={{ cursor: 'pointer' }}>
                {isShowReadMore ? <span className="expand">Read more</span> : <span className="expand">Read less</span>}
              </span>
            ) : null}
          </Description>
        </div>
        <div className="get_xox">
          <div className="boxed-child">
            <span>Discover More</span>
          </div>
        </div>
      </div>
    </WrapperI>
  )
}

const Wrapper = styled.div`
  margin-bottom: 100px;
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 48px;

    .heart {
      font-weight: 700;
      font-size: 36px;
      line-height: 48px;
      color: rgba(255, 255, 255, 0.87);
    }

    .describe {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.6);
      width: 409px;
    }
  }

  @media screen and (max-width: 900px) {
    .title {
      flex-direction: column;
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
`

const FeatureSquare = () => {
  return (
    <Wrapper>
      <div className="title">
        <p className="heart">The Heart of the XOX Ecosystem</p>
        <p className="describe">
          Wide range of apps, utilities and solutions powering the protocol creating a True One-Stop Ecosystem for all
          your DeFi needs.
        </p>
      </div>

      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Grid container spacing={2}>
          {listSquare.map((item: ISquareItem) => {
            return (
              <Grid item xs={12} md={4}>
                <SquareItem item={item} />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Wrapper>
  )
}

const listSquare = [
  {
    icon: '/images/exchange.svg',
    title: 'Revolutionary Multichain DEX',
    description:
      'Not just swap for free, but get dual cash back for doing so. Our multi token ecosystem & revolutionary referral program is designed to reward you twice on every transaction you perform in our DEX, receiving XOXS Stable Coins & BUSD or USDC not just from your transactions but from every user transactions using your Referral Code.',
    link: '',
  },
  {
    icon: '/images/wallet.svg',
    title: 'Add liquidity & Earn rewards',
    description:
      'Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis. Morbi sed aliquet donec  facilisis. Senectus eget. Lorem ipsum dolor sit amet consectetur.',
    link: '',
  },
  {
    icon: '/images/refferal.svg',
    title: 'First Ever Gamified Referral Program With Dual BUSD/USDC Rewards',
    description:
      'The XOX Gamified Referral Program is designed to give you cash-back like BUSD/USDC rewards from every transaction that you or any other user applying your referral code perform in our DEX. To make it fun and interactive we have designed a level system based on points where the more points you get the more you earn. Basically you just need to earn points, level up, reach milestones and claim your rewards on BUSD or USDC.',
    link: '',
  },
]

export default FeatureSquare
