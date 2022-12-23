/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
import { useContext } from 'react'
import { Currency } from '@pancakeswap/sdk'
import { Flex, BottomDrawer, useMatchBreakpoints } from '@pancakeswap/uikit'
import SwapNonTrade from 'components/Svg/SwapNonTrade'
import SwapTrade from 'components/Svg/SwapTrade'
import SwapTradeMobile from 'components/Svg/SwapTradeMobile'
import SwapNonTradeMobile from 'components/Svg/SwapNonTradeMobile'
import { AppBody } from 'components/App'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import { useDerivedSwapInfo, useSwapState } from 'state/swap/hooks'
import { useCurrency } from '../../hooks/Tokens'
import { Field } from '../../state/swap/actions'
import Page from '../Page'
import PriceChartContainer from './components/Chart/PriceChartContainer'

import SwapForm from './components/SwapForm'
import StableSwapFormContainer from './StableSwap'
import { StyledInputCurrencyWrapper, StyledSwapContainer } from './styles'
import SwapTab, { SwapType } from './components/SwapTab'
import { SwapFeaturesContext } from './SwapFeaturesContext'
import { Card } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useAccount } from 'wagmi'

export default function Swap() {
  const { isMobile } = useMatchBreakpoints()
  const { address: account } = useAccount()
  const { isChartExpanded, isChartDisplayed, setIsChartDisplayed, setIsChartExpanded, isChartSupported } =
    useContext(SwapFeaturesContext)

  // swap state & price data
  const {
    typedValue,
    independentField,
    recipient,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()
  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)

  const currencies: { [field in Field]?: Currency } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined,
  }
  const { v2Trade } = useDerivedSwapInfo(independentField, typedValue, inputCurrency, outputCurrency, recipient)

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade
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
          {isMobile && (!account ? <SwapNonTradeMobile /> : <SwapTradeMobile />)}
          {!isMobile && (!trade ? <SwapNonTrade /> : <SwapTrade />)}
          <StyledSwapContainer $isChartExpanded={isChartExpanded} style={isMobile?{left:0}:{}}>
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
