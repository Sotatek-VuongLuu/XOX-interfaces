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
  margin: 25px 0px;
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
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.9966 21C17.9671 21 21.9966 16.9706 21.9966 12C21.9966 7.02944 17.9671 3 12.9966 3C8.02602 3 3.99658 7.02944 3.99658 12C3.99658 16.9706 8.02602 21 12.9966 21Z"
                    stroke="#8E8E8E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.9966 14.25V13.5C13.5899 13.5 14.1699 13.3241 14.6633 12.9944C15.1566 12.6648 15.5412 12.1962 15.7682 11.6481C15.9953 11.0999 16.0547 10.4967 15.9389 9.91473C15.8232 9.33279 15.5375 8.79824 15.1179 8.37868C14.6983 7.95912 14.1638 7.6734 13.5819 7.55765C12.9999 7.44189 12.3967 7.5013 11.8485 7.72836C11.3004 7.95543 10.8318 8.33994 10.5022 8.83329C10.1725 9.32664 9.99658 9.90666 9.99658 10.5"
                    stroke="#8E8E8E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.9966 18.375C13.6179 18.375 14.1216 17.8713 14.1216 17.25C14.1216 16.6287 13.6179 16.125 12.9966 16.125C12.3753 16.125 11.8716 16.6287 11.8716 17.25C11.8716 17.8713 12.3753 18.375 12.9966 18.375Z"
                    fill="#8E8E8E"
                  />
                </svg>
              </span>
            </div>

            <p>p</p>
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
          dákjdas đâsdasdasdas dá d ád á dsa da sd a dá
        </Text>
        <Text color="textSubtle" textAlign="center">
          {t('No liquidity found.')}
          dákjdas đâsdasdasdas dá d ád á dsa da sd a dá
        </Text>
        <Text color="textSubtle" textAlign="center">
          {t('No liquidity found.')}
          dákjdas đâsdasdasdas dá d ád á dsa da sd a dá
        </Text>{' '}
        <Text color="textSubtle" textAlign="center">
          {t('No liquidity found.')}
          dákjdas đâsdasdasdas dá d ád á dsa da sd a dá
        </Text>
        <Text color="textSubtle" textAlign="center">
          {t('No liquidity found.')}
          dákjdas đâsdasdasdas dá d ád á dsa da sd a dá
        </Text>
        <Text color="textSubtle" textAlign="center">
          {t('No liquidity found.')}
          dákjdas đâsdasdasdas dá d ád á dsa da sd a dá
        </Text>
        <Text color="textSubtle" textAlign="center">
          {t('No liquidity found.')}
          dákjdas đâsdasdasdas dá d ád á dsa da sd a dá
        </Text>
        <Text color="textSubtle" textAlign="center">
          {t('No liquidity found.')}
          dákjdas đâsdasdasdas dá d ád á dsa da sd a dá
        </Text>
        <Text color="textSubtle" textAlign="center">
          {t('No liquidity found.')}
          dákjdas đâsdasdasdas dá d ád á dsa da sd a dá
        </Text>
        <Text color="textSubtle" textAlign="center">
          {t('No liquidity found.')}
          dákjdas đâsdasdasdas dá d ád á dsa da sd a dá
        </Text>
        <Text color="textSubtle" textAlign="center">
          {t('No liquidity found.')}
          dákjdas đâsdasdasdas dá d ád á dsa da sd a dá
        </Text>
        <Text color="textSubtle" textAlign="center">
          {t('No liquidity found.')}
          dákjdas đâsdasdasdas dá d ád á dsa da sd a dá
        </Text>
        <Text color="textSubtle" textAlign="center">
          {t('No liquidity found.')}
          dákjdas đâsdasdasdas dá d ád á dsa da sd a dá
        </Text>
        <Text color="textSubtle" textAlign="center">
          {t('No liquidity found.')}
          dákjdas đâsdasdasdas dá d ád á dsa da sd a dá
        </Text>
      </>
    )
  }

  return (
    <>
      <Flex width={['328px', , '100%']} height="100%" justifyContent="center" position="relative">
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
                  <stop stop-color="#6437FF" />
                  <stop offset="0.442708" stop-color="#9F59FF" stop-opacity="0" />
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
                <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.1419 21.5855C7.46635 21.0867 5.9749 20.1605 4.79393 18.9334C5.2345 18.4112 5.5 17.7366 5.5 16.9999C5.5 15.3431 4.15685 13.9999 2.5 13.9999C2.39977 13.9999 2.3007 14.0048 2.203 14.0144C2.0699 13.3637 2 12.69 2 11.9999C2 10.9546 2.16039 9.94679 2.4579 8.99964C2.47191 8.99984 2.48594 8.99994 2.5 8.99994C4.15685 8.99994 5.5 7.65679 5.5 5.99994C5.5 5.52429 5.3893 5.07449 5.1923 4.67494C6.34875 3.59963 7.76025 2.79489 9.32605 2.36145C9.8222 3.33398 10.8333 3.99994 12 3.99994C13.1667 3.99994 14.1778 3.33398 14.674 2.36145C16.2398 2.79489 17.6512 3.59963 18.8077 4.67494C18.6107 5.07449 18.5 5.52429 18.5 5.99994C18.5 7.65679 19.8432 8.99994 21.5 8.99994C21.5141 8.99994 21.5281 8.99984 21.5421 8.99964C21.8396 9.94679 22 10.9546 22 11.9999C22 12.69 21.9301 13.3637 21.797 14.0144C21.6993 14.0048 21.6002 13.9999 21.5 13.9999C19.8432 13.9999 18.5 15.3431 18.5 16.9999C18.5 17.7366 18.7655 18.4112 19.2061 18.9334C18.0251 20.1605 16.5336 21.0867 14.8581 21.5855C14.4714 20.3758 13.338 19.4999 12 19.4999C10.662 19.4999 9.5286 20.3758 9.1419 21.5855Z"
                      stroke="#8E8E8E"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z"
                      stroke="#8E8E8E"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3.90576 3.36365V7H7.54214"
                      stroke="#8E8E8E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.99658 12C2.99658 17.5229 7.47373 22 12.9966 22C18.5194 22 22.9966 17.5229 22.9966 12C22.9966 6.47715 18.5194 2 12.9966 2C9.29558 2 6.06413 4.01056 4.33497 6.99905"
                      stroke="#8E8E8E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.9991 6L12.9985 12.0044L17.2382 16.2441"
                      stroke="#8E8E8E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
