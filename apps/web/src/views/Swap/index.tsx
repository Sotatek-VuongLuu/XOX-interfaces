/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
import { useContext } from 'react'
import { Currency } from '@pancakeswap/sdk'
import { Flex, BottomDrawer, useMatchBreakpoints } from '@pancakeswap/uikit'
import { AppBody } from 'components/App'

import { useCurrency } from '../../hooks/Tokens'
import { Field } from '../../state/swap/actions'
import { useSwapState, useSingleTokenSwapInfo } from '../../state/swap/hooks'
import Page from '../Page'
import PriceChartContainer from './components/Chart/PriceChartContainer'

import SwapForm from './components/SwapForm'
import StableSwapFormContainer from './StableSwap'
import { StyledInputCurrencyWrapper, StyledSwapContainer } from './styles'
import SwapTab, { SwapType } from './components/SwapTab'
import { SwapFeaturesContext } from './SwapFeaturesContext'
import { Card } from '@pancakeswap/uikit'
import styled from 'styled-components'

export default function Swap() {
  const { isMobile } = useMatchBreakpoints()
  const { isChartExpanded, isChartDisplayed, setIsChartDisplayed, setIsChartExpanded, isChartSupported } =
    useContext(SwapFeaturesContext)

  // swap state & price data
  const {
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()
  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)

  const currencies: { [field in Field]?: Currency } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined,
  }

  return (
    <Page removePadding={isChartExpanded} hideFooterOnDesktop={isChartExpanded}>
      <Flex width={['328px', , '100%']} height="100%" justifyContent="center" position="relative">
        {/* {!isMobile && isChartSupported && (
          <PriceChartContainer
            inputCurrencyId={inputCurrencyId}
            inputCurrency={currencies[Field.INPUT]}
            outputCurrencyId={outputCurrencyId}
            outputCurrency={currencies[Field.OUTPUT]}
            isChartExpanded={isChartExpanded}
            setIsChartExpanded={setIsChartExpanded}
            isChartDisplayed={isChartDisplayed}
            currentSwapPrice={singleTokenPrice}
          />
        )}
        {isChartSupported && (
          <BottomDrawer
            content={
              <PriceChartContainer
                inputCurrencyId={inputCurrencyId}
                inputCurrency={currencies[Field.INPUT]}
                outputCurrencyId={outputCurrencyId}
                outputCurrency={currencies[Field.OUTPUT]}
                isChartExpanded={isChartExpanded}
                setIsChartExpanded={setIsChartExpanded}
                isChartDisplayed={isChartDisplayed}
                currentSwapPrice={singleTokenPrice}
                isMobile
              />
            }
            isOpen={isChartDisplayed}
            setIsOpen={setIsChartDisplayed}
          />
        )} */}
        <Flex flexDirection="column" position="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="591" height="548" viewBox="0 0 591 548" fill="none">
            <g filter="url(#filter0_d_5810_3573)">
              <path
                d="M570.777 45.4999L531.696 17.8377C530.007 16.6421 527.988 16 525.919 16H65.0849C63.0154 16 60.9968 16.6421 59.3076 17.8377L20.2262 45.4999C17.5777 47.3745 16.0035 50.3447 16.0034 53.5894L16.0002 499.511V522C16.0002 527.523 20.4773 532 26.0002 532H61.9007H529.096H564.997C570.52 532 574.997 527.523 574.997 522V499.511L575 53.6622C575 50.4175 573.426 47.3745 570.777 45.4999Z"
                fill="#242424"
              />
              <path
                d="M569.911 46.7242L530.829 19.0621C529.393 18.0458 527.678 17.5 525.919 17.5H65.0849C63.3258 17.5 61.61 18.0458 60.1742 19.0621L21.0928 46.7242C18.8317 48.3246 17.5035 50.8434 17.5034 53.5894L17.5002 499.511V522C17.5002 526.694 21.3058 530.5 26.0002 530.5H61.9007H529.096H564.997C569.691 530.5 573.497 526.694 573.497 522V499.511L573.5 53.6622C573.5 50.9042 572.162 48.3176 569.911 46.7242Z"
                stroke="url(#paint0_linear_5810_3573)"
                strokeWidth="3"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_5810_3573"
                x="0"
                y="0"
                width="591"
                height="548"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="8" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5810_3573" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5810_3573" result="shape" />
              </filter>
              <linearGradient
                id="paint0_linear_5810_3573"
                x1="254.5"
                y1="16"
                x2="253.029"
                y2="532"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#6437FF" />
                <stop offset="0.442708" stopColor="#9F59FF" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <StyledSwapContainer $isChartExpanded={isChartExpanded}>
            <StyledInputCurrencyWrapper mt={isChartExpanded ? '24px' : '0'}>
              {/* <SwapTab>
                  {(swapTypeState) =>
                    swapTypeState === SwapType.STABLE_SWAP ? <StableSwapFormContainer /> : 
                  }
                </SwapTab> */}
              <SwapForm />
            </StyledInputCurrencyWrapper>
          </StyledSwapContainer>
        </Flex>
      </Flex>
    </Page>
  )
}
