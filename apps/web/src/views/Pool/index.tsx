/* eslint-disable react/no-unknown-property */
import { createRef, Ref, useContext, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, CardBody, CardFooter, Button, AddIcon, useMatchBreakpoints } from '@pancakeswap/uikit'
import LiquidityMainBackgroundDesktop from 'components/Svg/LiquidityMainBackgroundDesktop'
import LiquidityConnectWallet from 'components/Svg/LiquidityConnectWallet'
import SwapMainBackgroundMobile from 'components/Svg/SwapMainBackgroundMobile'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { useLPTokensWithBalanceByAccount } from 'views/Swap/StableSwap/hooks/useStableConfig'
import FullPositionCard, { StableFullPositionCard } from '../../components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { usePairs, PairState } from '../../hooks/usePairs'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'

import Dots from '../../components/Loader/Dots'
import { AppHeader, AppBody } from '../../components/App'
import Page from '../Page'

const MainBackground = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  svg {
    width: 100vw;
  }
`
const FlexBoxContainer = styled(Flex)`
  margin-top:81px;
`
const Wrapper = styled(Flex)`
  width: 100%;
  max-width: 591px;
  height: fit-content;
  z-index: 0;
  align-items: center;
  justify-content: center;
`
const SwapbackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`
const Body = styled.div`
  padding-top: 25px;
`

const StyledCardFooter = styled(CardFooter)`
  border-top: none !important;
`

const StyledLiquidityContainer = styled.div`
  flex-shrink: 0;
  height: fit-content;
  // position: absolute;
  // top: 56px;
  // left: 0px;
  margin-top:58px;
  z-index:9;
  padding: 0 28px;
  width: 560px;
`

const Title = styled.div`
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 400;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.87);
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #444444;

  .title {
    font-weight: 700;
    font-size: 24px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 8px;
  }

  .sub_title {
    font-weight: 400;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
  }
`

interface I {
  height?: number
}

const Background = styled.div<I>`
  position: absolute;
  top: 56px;
  left: 2px;
  padding: 0 28px;
  width: 556px;
  // height: 500px;


  height: ${({ height }) => `${height}px;`}
  z-index: -1;
  background: #242424;
`
const ConnectSub = styled.div`
  text-align: center;
  margin-top: 25px;
  color: #ffffff61;
`

export default function Pool() {
  const { address: account } = useAccount()
  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()
  const [divHeight, setDivHeight] = useState(0)
  const divRef: Ref<HTMLDivElement> = useRef(null)
  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()

  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens,
  )

  const stablePairs = useLPTokensWithBalanceByAccount(account)

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances ||
    v2Pairs?.length < liquidityTokensWithBalances.length ||
    (v2Pairs?.length && v2Pairs.every(([pairState]) => pairState === PairState.LOADING))
  const allV2PairsWithLiquidity = v2Pairs
    ?.filter(([pairState, pair]) => pairState === PairState.EXISTS && Boolean(pair))
    .map(([, pair]) => pair)

  useEffect(() => {
    setDivHeight(divRef.current.offsetHeight)
  }, [])

  const renderBody = () => {
    if (!account) {
      return (
        <>
          <Title>
            <div className="flex">
              <span>Your Liquidity</span>
              <span>
                <img src="/images/liquidity/question-icon.svg" alt="" />
              </span>
            </div>
            <ConnectSub>Connect to a wallet to view your liquidity</ConnectSub>
          </Title>
        </>
      )
    }
    // if (v2IsLoading) {
    //   return (
    //     <Text color="textSubtle" textAlign="center">
    //       <Dots>{t('Loading')}</Dots>
    //     </Text>
    //   )
    // }

    let positionCards = []

    if (allV2PairsWithLiquidity?.length > 0) {
      positionCards = allV2PairsWithLiquidity.map((v2Pair, index) => (
        <FullPositionCard
          key={v2Pair.liquidityToken.address}
          pair={v2Pair}
          mb={Boolean(stablePairs?.length) || index < allV2PairsWithLiquidity.length - 1 ? '16px' : 0}
        />
      ))
    }

    if (stablePairs?.length > 0) {
      positionCards = [
        ...positionCards,
        ...stablePairs?.map((stablePair, index) => (
          <StableFullPositionCard
            key={`stable-${stablePair.liquidityToken.address}`}
            pair={stablePair}
            mb={index < stablePairs.length - 1 ? '16px' : 0}
          />
        )),
      ]
    }

    if (positionCards?.length > 0) {
      return positionCards
    }

    return (
      <>
        <Text color="textSubtle" textAlign="center">
          {t('No liquidity found.')}
        </Text>
      </>
    )
  }

  return (
    <Page>
      <MainBackground>{isMobile ? <SwapMainBackgroundMobile /> : <LiquidityMainBackgroundDesktop />}</MainBackground>
      <FlexBoxContainer position="relative" flexDirection="column">
        <Wrapper flex="column" position="relative">
          <SwapbackgroundWrapper>
            <LiquidityConnectWallet />
          </SwapbackgroundWrapper>
        </Wrapper>
        <StyledLiquidityContainer ref={divRef}>
          <Header>
            <div>
              <p className="title">Liquidity</p>
              <p className="sub_title">Add liquidity to receive LP tokens</p>
            </div>
            <div>
              <span style={{ marginRight: '16px' }}>
                <img src="/images/liquidity/setting-icon.svg" alt="" />
              </span>
              <span>
                <img src="/images/liquidity/history-icon.svg" alt="" />
              </span>
            </div>
          </Header>

          <Body>
            {renderBody()}
            {/* {account && !v2IsLoading && (
                <Flex flexDirection="column" alignItems="center" mt="24px">
                  <Text color="textSubtle" mb="8px">
                    {t("Don't see a pool you joined?")}
                  </Text>
                  <Link href="/find" passHref>
                    <Button id="import-pool-link" variant="secondary" scale="sm" as="a">
                      {t('Find other LP tokens')}
                    </Button>
                  </Link>
                </Flex>
              )} */}
          </Body>
          <StyledCardFooter style={{ textAlign: 'center' }}>
            {account ? (
              <Link href="/add" passHref>
                <Button id="join-pool-button" width="100%" startIcon={<AddIcon color="invertedContrast" />}>
                  {t('Add Liquidity')}
                </Button>
              </Link>
            ) : (
              <Button id="join-pool-button" width="100%" startIcon={null}>
                Connect Wallet
              </Button>
            )}
          </StyledCardFooter>
        </StyledLiquidityContainer>
      </FlexBoxContainer>
    </Page>
  )
}
