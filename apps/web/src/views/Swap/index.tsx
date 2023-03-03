/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
import { useContext, useEffect, useState } from 'react'
import { Currency } from '@pancakeswap/sdk'
import { Flex, useMatchBreakpoints } from '@pancakeswap/uikit'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { useDerivedSwapInfo, useSwapState } from 'state/swap/hooks'
import { useCurrency } from '../../hooks/Tokens'
import { Field } from '../../state/swap/actions'
import Page from '../Page'

import SwapForm from './components/SwapForm'
import { StyledInputCurrencyWrapper, StyledSwapContainer } from './styles'
import { SwapFeaturesContext } from './SwapFeaturesContext'
import { useAccount } from 'wagmi'
import { useRouterNormal } from 'hooks/useApproveCallback'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import styled from 'styled-components'
import SwapbackgroundDesktop from 'components/Svg/SwapBackgroundDesktop'
import SwapbackgroundDesktopNone from 'components/Svg/SwapBackgroundDesktopNone'
import SwapbackgroundMobile from 'components/Svg/SwapBackgroundMobile'
import SwapbackgroundMobileNone from 'components/Svg/SwapBackgroundMobileNone'
import SwapbackgroundMobileNone2 from 'components/Svg/SwapBackgroundMobileNone2'
import SwapbackgroundDesktopNone2 from 'components/Svg/SwapBackgroundDesktopNone2'
import SwapMainBackgroundDesktop from 'components/Svg/SwapMainBackgroundDesktop'
import SwapMainBackgroundMobile from 'components/Svg/SwapMainBackgroundMobile'

const SwapbackgroundNoneWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
`
const SwapbackgroundNone2Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
`

const SwapbackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`

const Wrapper = styled(Flex)`
  width: 100%;
  max-width: 591px;
  height: fit-content;
  z-index: 0;
  align-items: center;
  justify-content: center;
`

const MainBackground = styled.div`
  position: absolute;
  z-index: 0;
  top: -50px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #0a0a0a;
  svg {
    width: 100vw;
    height: auto;
    object-fit: cover;
  }
`

export default function Swap() {
  const { isMobile } = useMatchBreakpoints()
  const { address: account } = useAccount()
  const { chainId } = useActiveWeb3React()
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
  const isRouterNormal = useRouterNormal(inputCurrency, outputCurrency, chainId)
  const { v2Trade } = useDerivedSwapInfo(
    independentField,
    typedValue,
    inputCurrency,
    outputCurrency,
    recipient,
    isRouterNormal,
  )

  const {
    wrapType,
    execute: onWrap,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade

  const [loadOk, setLoadOk] = useState(false)
  useEffect(() => {
    if (!chainId || !account) return
    if (loadOk) window.location.reload()
    setLoadOk(true)
  }, [chainId, account])

  return (
    <Page removePadding={isChartExpanded} hideFooterOnDesktop={isChartExpanded}>
      <MainBackground>{isMobile ? <SwapMainBackgroundMobile /> : <SwapMainBackgroundDesktop />}</MainBackground>
      <Flex
        width={['328px', , '100%']}
        marginTop="100px"
        marginBottom="100px"
        height="100%"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <Wrapper flex="column" position="relative">
          {isMobile ? (
            <>
              <SwapbackgroundWrapper>
                <SwapbackgroundMobile />
              </SwapbackgroundWrapper>
              <SwapbackgroundNoneWrapper>
                <SwapbackgroundMobileNone />
              </SwapbackgroundNoneWrapper>
              <SwapbackgroundNone2Wrapper>
                <SwapbackgroundMobileNone2 />
              </SwapbackgroundNone2Wrapper>
            </>
          ) : (
            <>
              <SwapbackgroundWrapper>
                <SwapbackgroundDesktop />
              </SwapbackgroundWrapper>
              <SwapbackgroundNoneWrapper>
                <SwapbackgroundDesktopNone />
              </SwapbackgroundNoneWrapper>
              <SwapbackgroundNone2Wrapper>
                <SwapbackgroundDesktopNone2 />
              </SwapbackgroundNone2Wrapper>
            </>
          )}
          <StyledSwapContainer
            $isChartExpanded={isChartExpanded}
            style={isMobile ? { left: 0, padding: '15px 0' } : {}}
          >
            <StyledInputCurrencyWrapper mt={isChartExpanded ? '24px' : '0'}>
              {/* <SwapTab>
                  {(swapTypeState) =>
                    swapTypeState === SwapType.STABLE_SWAP ? <StableSwapFormContainer /> : 
                  }
                </SwapTab> */}
              <SwapForm />
            </StyledInputCurrencyWrapper>
          </StyledSwapContainer>
        </Wrapper>
      </Flex>
    </Page>
  )
}
