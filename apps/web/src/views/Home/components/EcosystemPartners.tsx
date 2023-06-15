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

    .box-4 {
      grid-template-columns: repeat(3, 1fr);
    }

    .box-5 {
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
        <div className="box box-4">
          <a href="https://bitgert.com/" target="_blank">
            <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/Bitgert-full.svg`} alt="Bitgert-full" />
          </a>
          <a href="https://kingpad.co/" target="_blank">
            <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/KingPad-full.svg`} alt="KingPad-full" />
          </a>
          <a href="https://kyberswap.com/" target="_blank">
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/KyberNetwork-full.svg`}
              alt="KyberNetwork-full"
            />
          </a>
          {/* <a href="https://coin98.com/" target="_blank">
                <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/Coin98-full.svg`} alt="Coin98-full" />
              </a> */}
        </div>
        <div className="box box-5">
          <a href="https://www.xo-dex.com" target="_blank">
            <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/Xodex-full.svg`} alt="Xodex-full" />
          </a>
          <a href="https://app.velocore.xyz/swap" target="_blank">
            <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/Velocore-full.svg`} alt="Velocore-full" />
          </a>
          <a href="https://app.velocore.xyz/swap" target="_blank">
            <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/Syncswap-full.svg`} alt="Syncswap-full" />
          </a>
          <a href="https://app.velocore.xyz/swap" target="_blank">
            <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/BNBChain-full.svg`} alt="BNBChain-full" />
          </a>
          {/* <a href="https://coin98.com/" target="_blank">
                <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/Coin98-full.svg`} alt="Coin98-full" />
              </a> */}
        </div>
        {/* <div className="box box-4">
          <a href="https://bitgert.com/" target="_blank">
            <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/Bitgert-full.svg`} alt="Bitgert-full" />
          </a>
          <a href="https://kingpad.co/" target="_blank">
            <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/KingPad-full.svg`} alt="KingPad-full" />
          </a>
          <a href="https://kyberswap.com/" target="_blank">
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/KyberNetwork-full.svg`}
              alt="KyberNetwork-full"
            />
          </a>
          <a href="https://www.xo-dex.com" target="_blank">
            <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/Xodex-full.svg`} alt="Xodex-full" />
          </a>
          <a href="https://coin98.com/" target="_blank">
                <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/Coin98-full.svg`} alt="Coin98-full" />
              </a>
        </div> */}
      </div>
    </Wrapper>
  )
}

export default EcosystemPartners
