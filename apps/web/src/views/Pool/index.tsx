/* eslint-disable react/no-unknown-property */
import { Ref, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, CardFooter, Button, AddIcon, useMatchBreakpoints } from '@pancakeswap/uikit'
import LiquidityMainBackgroundDesktop from 'components/Svg/LiquidityMainBackgroundDesktop'
import LiquidityConnectWallet from 'components/Svg/LiquidityConnectWallet'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { useLPTokensWithBalanceByAccount } from 'views/Swap/StableSwap/hooks/useStableConfig'
import SwapMainBackgroundDesktop from 'components/Svg/SwapMainBackgroundDesktop'
import SwapMainBackgroundMobile from 'components/Svg/SwapMainBackgroundMobile'
import LiquidityBackgroundMobile from 'components/Svg/LiquidityBackgroundMobile'
import LiquidityBackgroundBorderMobile from 'components/Svg/LiquidityBackgroundBorderMobile'
import LiquidityBackgroundDesktop from 'components/Svg/LiquidityBackgroundDesktop'
import LiquidityBackgroundBorderDesktop from 'components/Svg/LiquidityBackgroundBorderDesktop'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { USD_ADDRESS, XOX_ADDRESS } from 'config/constants/exchange'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { CurrencyLogo } from 'views/Info/components/CurrencyLogo'

import FullPositionCard, { StableFullPositionCard } from '../../components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { usePairs, PairState } from '../../hooks/usePairs'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import Page from '../Page'

const SwapBackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: 100%;
`

const ConnectWalletButtonWrapper = styled(ConnectWalletButton)`
  width: 100%;
  height: 37px;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 43px;
  }
`

const BackgroundWrapper = styled.div`
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: calc(100% - 200px);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: #242424;
`

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

const Wrapper = styled(Flex)`
  width: 100%;
  height: fit-content;
  z-index: 0;
  align-items: center;
  justify-content: center;
`

const Body = styled.div`
  padding-top: 25px;
`

const ButtonWrapper = styled(Button)`
  height: 37px;
  width: 100%;
  border-radius: 6px;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 43px;
  }
`

const StyledCardFooter = styled(CardFooter)`
  border-top: none !important;
  padding: 24px 0;
`

const StyledLiquidityContainer = styled.div`
  flex-shrink: 0;
  height: fit-content;
  // position: absolute;
  // top: 56px;
  // left: 0px;
  margin-top: 58px;
  z-index: 9;
  padding: 0 28px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 560px;
  }
`

const Title = styled.div`
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 400;
    font-size: 18px;
    color: rgba(255, 255, 255);
    margin-bottom: 16px;
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

  height: ${({ height }) => `${height}px;`};
  z-index: -1;
  background: #242424;
`
const ConnectSub = styled.div`
  text-align: center;
  margin-top: 25px;
  color: #ffffff61;
`

const PoolWrapper = styled(Flex)`
  .pair-icon,
  .pair-balance {
    display: grid;
    grid-template-columns: 1fr 57px 1fr;
  }

  .pair-icon {
    margin-top: 24px;
    margin-bottom: 8px;
  }
`

export default function Pool() {
  const { address: account } = useAccount()
  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()
  const { chainId } = useActiveChainId()
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
      tokenPairsWithLiquidityTokens.filter(
        ({ liquidityToken, tokens }) =>
          v2PairsBalances[liquidityToken.address]?.greaterThan('0') &&
          ((tokens[0].address === USD_ADDRESS[chainId] && tokens[1].address === XOX_ADDRESS[chainId]) ||
            (tokens[0].address === XOX_ADDRESS[chainId] && tokens[1].address === USD_ADDRESS[chainId])),
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
      return (
        <>
          <Title>
            <div className="flex">
              <span>Your Liquidity</span>
              <span>
                <img src="/images/liquidity/question-icon.svg" alt="" />
              </span>
            </div>
          </Title>
          {positionCards}
        </>
      )
    }

    return (
      <PoolWrapper flexDirection="column">
        <Text
          fontWeight="400"
          fontSize={['14px', , '18px']}
          lineHeight={['17px', , '22px']}
          color="rgba(255, 255, 255, 0.87)"
        >
          Pool
        </Text>
        <div className="pair-icon">
          <Flex
            flexDirection="row"
            alignItems="center"
            px="16px"
            py="12px"
            border="1px solid #444444"
            borderRadius="8px"
          >
            <CurrencyLogo address={USD_ADDRESS[chainId]} chainName={chainId === 1 || chainId === 5 ? 'ETH' : 'BSC'} />
            <Text
              fontWeight="400"
              fontSize={['16px', , '18px']}
              lineHeight={['19px', , '22px']}
              color="rgba(255, 255, 255, 0.87)"
              ml="8px"
            >
              {chainId === 1 || chainId === 5 ? 'USDC' : 'BUSD'}
            </Text>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <AddIcon />
          </Flex>
          <Flex
            flexDirection="row"
            alignItems="center"
            px="16px"
            py="12px"
            border="1px solid #444444"
            borderRadius="8px"
          >
            <CurrencyLogo address={XOX_ADDRESS[chainId]} chainName={chainId === 1 || chainId === 5 ? 'ETH' : 'BSC'} />
            <Text
              fontWeight="400"
              fontSize={['16px', , '18px']}
              lineHeight={['19px', , '22px']}
              color="rgba(255, 255, 255, 0.87)"
              ml="8px"
            >
              XOX
            </Text>
          </Flex>
        </div>
        <div className="pair-balance">
          <Flex flexDirection="row" justifyContent="space-between">
            <Text fontWeight="400" fontSize="12px" lineHeight="15px" color="rgba(255, 255, 255, 0.6)">
              Balance
            </Text>
            <Flex flexDirection="column" alignItems="flex-end">
              <Text fontWeight="400" fontSize="12px" lineHeight="15px" color="rgba(255, 255, 255, 0.87)">
                0
              </Text>
              <Text fontWeight="400" fontSize="12px" lineHeight="15px" color="rgba(255, 255, 255, 0.6)" mt="8px">
                ~$0.00
              </Text>
            </Flex>
          </Flex>
          <div />
          <Flex flexDirection="row" justifyContent="space-between">
            <Text fontWeight="400" fontSize="12px" lineHeight="15px" color="rgba(255, 255, 255, 0.6)">
              Balance
            </Text>
            <Flex flexDirection="column" alignItems="flex-end">
              <Text fontWeight="400" fontSize="12px" lineHeight="15px" color="rgba(255, 255, 255, 0.87)">
                0
              </Text>
              <Text fontWeight="400" fontSize="12px" lineHeight="15px" color="rgba(255, 255, 255, 0.6)" mt="8px">
                ~$0.00
              </Text>
            </Flex>
          </Flex>
        </div>
        <Flex flexDirection="row" justifyContent="space-between" mt="24px">
          <Text
            fontWeight="400"
            fontSize={['14px', , '16px']}
            lineHeight={['17px', , '19px']}
            color="rgba(255, 255, 255, 0.87)"
          >
            LP reward APR
          </Text>
          <Text
            fontWeight="700"
            fontSize={['14px', , '16px']}
            lineHeight={['17px', , '19px']}
            color="rgba(255, 255, 255, 0.87)"
          >
            {chainId === 1 || chainId === 5 ? 1.3 : 1.25}%
          </Text>
        </Flex>
      </PoolWrapper>
    )
  }

  return (
    <Page>
      <MainBackground>{isMobile ? <SwapMainBackgroundMobile /> : <SwapMainBackgroundDesktop />}</MainBackground>
      <Flex
        width={['328px', , '559px']}
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
              <SwapBackgroundWrapper>
                <LiquidityBackgroundMobile />
              </SwapBackgroundWrapper>

              <SwapBackgroundWrapper>
                <LiquidityBackgroundBorderMobile />
              </SwapBackgroundWrapper>
            </>
          ) : (
            <>
              <SwapBackgroundWrapper>
                <LiquidityBackgroundDesktop />
              </SwapBackgroundWrapper>

              <SwapBackgroundWrapper>
                <LiquidityBackgroundBorderDesktop />
              </SwapBackgroundWrapper>
            </>
          )}
          <BackgroundWrapper />

          <StyledLiquidityContainer>
            <Header>
              <div>
                <p className="title">Liquidity</p>
                <p className="sub_title">Add liquidity to receive LP tokens</p>
              </div>
              <div style={{ display: 'flex' }}>
                <span style={{ marginRight: '8px' }}>
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
                  <ButtonWrapper id="join-pool-button" width="100%">
                    {t('Add Liquidity')}
                  </ButtonWrapper>
                </Link>
              ) : (
                <ConnectWalletButtonWrapper />
              )}
            </StyledCardFooter>
          </StyledLiquidityContainer>
        </Wrapper>
      </Flex>
    </Page>
  )
}
