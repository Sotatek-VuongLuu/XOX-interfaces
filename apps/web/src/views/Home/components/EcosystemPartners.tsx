/* eslint-disable react/no-unknown-property */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'
import React, { useState } from 'react'
import { Button, Popover } from '@mui/material'
import { useTranslation } from '@pancakeswap/localization'
import { useTooltip } from '@pancakeswap/uikit'

interface SecureProps {
  item: SecureItem
}

export interface SecureItem {
  imagePathDesktop: string
  imagePathMobile: string
  name: string
}

const Wrapper = styled.div`
  margin-bottom: 24px;
  margin-top: 32px;
  .title {
    font-weight: 700;
    font-size: 36px;
    line-height: 44px;
    color: rgba(255, 255, 255, 0.87);
    text-align: center;

    @media screen and (max-width: 900px) {
      font-size: 20px;
      margin-top: 36px;
    }
  }

  .description {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #fb8618;
    margin-top: 16px;
    margin-bottom: 40px;

    @media screen and (max-width: 900px) {
      font-size: 14px;
      margin-top: 8px;
      margin-bottom: 20px;
    }
  }

  .imgs {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    margin-bottom: 100px;

    .box {
      position: relative;
      display: grid;
      place-content: center;
    }

    .box-3 {
      grid-template-columns: repeat(3, 1fr);
    }

    .box-4 {
      grid-template-columns: repeat(4, 1fr);
    }

    .box img {
      cursor: pointer;
      width: 200px;
      padding: 0 25px;
      box-sizing: content-box;
    }

    @media screen and (max-width: 900px) {
      margin-bottom: 40px;
    }

    @media screen and (max-width: 560px) {
      .box img {
        width: 55px;
        padding: 0 8px;
      }
    }
  }
`

export const partnersList = [
  [
    {
      image_name: 'BNBChain_logo',
      href: 'https://www.bnbchain.org/en',
    },
    {
      image_name: 'zksync_logo',
      href: 'https://zksync.io/',
    },
    {
      image_name: 'Syncswap_logo',
      href: 'https://syncswap.xyz/',
    },
    {
      image_name: 'OKX_logo',
      href: 'https://www.okx.com',
    },
  ],
  [
    {
      image_name: 'Quickswap_logo',
      href: 'https://quickswap.exchange/',
    },
    {
      image_name: 'Wombat_logo',
      href: 'https://www.wombat.exchange/',
    },
    {
      image_name: 'KyberNetwork_logo',
      href: 'https://kyberswap.com',
    },
    {
      image_name: 'ElkFinance_logo',
      href: 'https://elk.finance/',
    },
  ],
  [
    {
      image_name: 'Dexalot_logo',
      href: 'https://dexalot.com/',
    },
    {
      image_name: 'Bitgert_logo',
      href: 'https://bitgert.com',
    },
    {
      image_name: 'KingPad_logo',
      href: 'https://kingpad.co',
    },
    {
      image_name: 'iZumi_logo',
      href: 'https://izumi.finance/home',
    },
  ],
  [
    {
      image_name: 'Coin98_logo',
      href: 'https://coin98.com',
    },
    {
      image_name: 'Velocore_logo',
      href: 'https://app.velocore.xyz/swap',
    },
    {
      image_name: 'Xodex_logo',
      href: 'https://www.xo-dex.com',
    },
    {
      image_name: 'Orion_logo',
      href: 'https://trade.orionprotocol.io/swap/ORN-USDT',
    },
  ],
]

const EcosystemPartners = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <p className="title" data-aos="fade-up">
        {t('Ecosystem Partners & Backers')}
      </p>
      <p className="description" data-aos="fade-up" data-aos-duration="2300">
        {t('Backed by the Best to Deliver the Best.')}
      </p>

      <div className="imgs">
        {partnersList.map((partnerGroup) => {
          return (
            <div className={`box box-${partnerGroup.length}`}>
              {partnerGroup.map((partner) => {
                return (
                  <a href={partner.href} target="_blank">
                    <img
                      src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/audit/${partner.image_name}.svg`}
                      alt={partner.image_name}
                    />
                  </a>
                )
              })}
            </div>
          )
        })}
      </div>
    </Wrapper>
  )
}

export default EcosystemPartners
