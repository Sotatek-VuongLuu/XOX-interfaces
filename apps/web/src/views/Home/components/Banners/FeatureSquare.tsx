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
import { useTranslation } from '@pancakeswap/localization'

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
  padding: 24px 22px 32px;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
  }

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
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      cursor: pointer;

      .boxed-child {
        width: 100%;
        height: 100%;
        background: rgba(16, 16, 16, 1);
        padding: 10px 20px;
        border-radius: inherit;
        cursor: pointer;

        span {
          background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
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

      @media screen and (max-width: 576px) {
        margin-top: 16px;
      }
    }

    .expand {
      color: #fb8618;
      font-size: 14px;
      font-weight: 600;
    }
  }
`

const Title = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.87);
  line-height: 32px;

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
`

const Icon = styled.div`
  background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-bottom: 32px;
`

const SquareItem = ({ item }: Iprops) => {
  const { t } = useTranslation()
  const [isShowReadMore, setIsShow] = useState(item.description.length > 330)

  return (
    <WrapperI className="item">
      <div className="main_container">
        <div>
          <Icon>
            <img src={item.icon} alt="icon" />
          </Icon>
          <Title>{t(item.title)}</Title>
          <Description>
            {/* {item.description} */}
            {isShowReadMore ? `${t(item.description).slice(0, 330)}...` : t(item.description)}{' '}
            {t(item.description).length > 330 ? (
              <span onClick={() => setIsShow(!isShowReadMore)} style={{ cursor: 'pointer' }}>
                {isShowReadMore ? (
                  <span className="expand">{t('Read more')}</span>
                ) : (
                  <span className="expand">{t('Read less')}</span>
                )}
              </span>
            ) : null}
          </Description>
        </div>
        <a href={item.link} target="_blank" rel="noreferrer">
          <div className="get_xox">
            <div className="boxed-child">
              <span>{t('Discover More')}</span>
            </div>
          </div>
        </a>
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
      color: #fb8618;
      width: 409px;
    }
  }

  @media screen and (max-width: 900px) {
    margin-bottom: 70px;
    // margin-top: 32px;
    .title {
      flex-direction: column;
      .heart {
        font-size: 20px;
        line-height: 32px;
        text-align: center;
        font-style: normal;
        font-weight: 700;
        font-size: 19px;
        line-height: 32px;
      }
      .describe {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        width: unset;
        text-align: center;
      }
    }
  }
`

const FeatureSquare = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <div className="title" style={{ overflow: 'hidden' }}>
        <p className="heart" data-aos="fade-right">
          {t('The Heart of the XOX Ecosystem')}
          <span style={{ color: '#FB8618' }}>.</span>
        </p>
        <p className="describe" data-aos="fade-left">
          {t(
            'Wide range of apps, utilities and solutions powering the protocol creating a True One-Stop Ecosystem for all your DeFi needs.',
          )}
        </p>
      </div>

      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Grid container spacing={2}>
          {listSquare.map((item: ISquareItem) => {
            return (
              <Grid item xs={12} md={4} key={item.title} data-aos="fade-up">
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
      'Not just swap for free, but get dual cash back for doing so. Our multi token ecosystem & revolutionary referral program is designed to reward you twice on every transaction you perform in our DEX, receiving XOXS Stable Coins & USDT or USDC not just from your transactions but from every user transactions using your Referral Code.',
    link: '/swap',
  },
  {
    icon: '/images/wallet.svg',
    title: 'Add liquidity & Earn rewards',
    description:
      'By adding liquidity to a Liquidity Pool you will receive Liquidity Provider (LP) tokens and share in the fees generated by traders. This way you are not just earning while holding but also supporting the project. You can also redeem your funds at any time by removing your liquidity.',
    link: '/liquidity',
  },
  {
    icon: '/images/refferal.svg',
    title: 'First Ever Gamified Referral Program With Dual USDT/USDC Rewards',
    description:
      'The XOX Gamified Referral Program is designed to give you cash-back like USDT/USDC rewards from every transaction that you or any other user applying your referral code perform in our DEX. To make it fun and interactive we have designed a level system based on points where the more points you get the more you earn. Basically you just need to earn points, level up, reach milestones and claim your rewards on USDT or USDC.',
    link: 'referral',
  },
]

export default FeatureSquare
