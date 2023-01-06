/* eslint-disable react/no-unknown-property */
import { createRef, Ref, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, CardBody, CardFooter, Button, AddIcon } from '@pancakeswap/uikit'
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

const Body = styled.div`
  padding-top: 25px;
`

const StyledCardFooter = styled(CardFooter)`
  border-top: none !important;
`

const StyledLiquidityContainer = styled.div`
  flex-shrink: 0;
  height: fit-content;
  position: absolute;
  top: 56px;
  left: 0px;
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
  text-align:center;
  margin-top:25px;
  color:#FFFFFF61;
`

export default function Pool() {
  const { address: account } = useAccount()
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
              <img src='/images/liquidity/question-icon.svg' alt='' />
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
    <>
      <Flex width={['328px', , '100%']} height="100%" justifyContent="center" position="relative" padding='220px 0'>
        <Flex position="relative" flexDirection="column">
          <Background height={divHeight + 25} />
          <div>
            <svg width="560" height="319" viewBox="0 0 560 319" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.00348 286.008V286.011V308.5C2.00348 313.194 5.80906 317 10.5035 317H46.404H513.599H549.5C554.194 317 558 313.194 558 308.5V286.014V286.011L557.507 37.6526C557.502 34.9005 556.164 32.3214 553.918 30.7315L514.826 3.06207C513.39 2.04578 511.675 1.5 509.915 1.5H49.0814C47.3223 1.5 45.6065 2.04578 44.1707 3.06207L5.09956 30.717C2.84354 32.3138 1.50481 34.9078 1.5103 37.6718L2.00348 286.008Z"
                fill="#242424"
                stroke="url(#paint0_linear_1_4)"
                strokeWidth="3"
              />

              <defs>
                <linearGradient
                  id="paint0_linear_1_4"
                  x1="238.501"
                  y1="2.39769e-06"
                  x2="237.03"
                  y2="516.001"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#6437FF" />
                  <stop offset="0.442708" stopColor="#9F59FF" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <StyledLiquidityContainer ref={divRef}>
            <Header>
              <div>
                <p className="title">Liquidity</p>
                <p className="sub_title">Add liquidity to receive LP tokens</p>
              </div>
              <div>
                <span style={{marginRight:'16px'}}>
                <img src='/images/liquidity/setting-icon.svg' alt='' />
                </span>
                <span>
                  <img src='/images/liquidity/history-icon.svg' alt='' />
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
        </Flex>
      </Flex>
    </>
  )
}
