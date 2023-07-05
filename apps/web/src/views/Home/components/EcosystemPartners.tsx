/* eslint-disable react/no-unknown-property */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import styled from 'styled-components'
import React from 'react'
import { useTranslation } from '@pancakeswap/localization'

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
    gap-y: -20px;
    margin-bottom: 100px;

    .box {
      position: relative;
      display: grid;
      place-content: center;
    }

    .box-5 {
      grid-template-columns: repeat(5, 1fr);
    }

    .box-6 {
      grid-template-columns: repeat(6, 1fr);
    }

    .box-7 {
      grid-template-columns: repeat(7, 1fr);
    }

    .box img {
      cursor: pointer;
      width: 170px;
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

export const partnersList = [
  [
    {
      image_name: 'BNBChain_logo',
      href: 'https://bnbchain.org/',
    },
    {
      image_name: 'zksync_logo',
      href: 'https://zksync.io/',
    },
    {
      image_name: 'Linea_logo',
      href: 'https://linea.build/',
    },
    {
      image_name: 'KyberNetwork_logo',
      href: 'https://kyber.network/',
    },
    {
      image_name: 'OKX_logo',
      href: 'https://www.okx.com/',
    },
    {
      image_name: 'Level_logo',
      href: 'https://level.finance/',
    },
  ],
  [
    {
      image_name: 'Syncswap_logo',
      href: 'https://syncswap.xyz/',
    },
    {
      image_name: 'Symbiosis_logo',
      href: 'https://symbiosis.finance/',
    },
    {
      image_name: 'Pangolin_logo',
      href: 'https://www.pangolin.exchange/',
    },
    {
      image_name: 'MummyFinance_logo',
      href: 'https://www.mummy.finance/',
    },
    {
      image_name: 'Orion_logo',
      href: 'https://www.orionprotocol.io/',
    },
    {
      image_name: 'Quickswap_logo',
      href: 'https://quickswap.exchange/',
    },
    {
      image_name: 'Wombat_logo',
      href: 'https://www.wombat.exchange/',
    },
  ],
  [
    {
      image_name: 'Rubic_logo',
      href: 'https://rubic.exchange/',
    },
    {
      image_name: 'Swing_logo',
      href: 'https://swing.xyz/',
    },
    {
      image_name: 'Chainge_logo',
      href: 'https://www.chainge.finance/',
    },
    {
      image_name: 'iZumi_logo',
      href: 'https://izumi.finance/home',
    },
    {
      image_name: 'Dexalot_logo',
      href: 'https://dexalot.com/',
    },
    {
      image_name: 'ODOS_logo',
      href: 'https://odos.xyz/',
    },
  ],
  [
    {
      image_name: 'Orbiter_logo',
      href: 'https://www.orbiter.finance/',
    },
    {
      image_name: 'ElkFinance_logo',
      href: 'https://elk.finance/',
    },
    {
      image_name: 'Velocore_logo',
      href: 'https://app.velocore.xyz/',
    },
    {
      image_name: 'debridge_logo',
      href: 'https://debridge.finance/',
    },
    {
      image_name: 'Bitgert_logo',
      href: 'https://bitgert.com/',
    },
    {
      image_name: 'KingPad_logo',
      href: 'https://kingpad.finance/',
    },
    {
      image_name: 'Xodex_logo',
      href: 'https://www.xo-dex.com/',
    },
  ],
]

export default EcosystemPartners
