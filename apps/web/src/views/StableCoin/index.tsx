/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useMemo } from 'react'
import { Flex, Button, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useAllTokens } from 'hooks/Tokens'
import styled from 'styled-components'
import { useTreasuryXOX } from 'hooks/useContract'
import { formatUnits } from '@ethersproject/units'
import { USD_DECIMALS } from 'config/constants/exchange'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useStableCoinSWR, useMultiChainId } from 'state/info/hooks'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Trans from 'components/Trans'
import Link from 'next/link'
import SwapMainBackgroundMobile from 'components/Svg/LiquidityMainBackgroundMobile'
import SwapMainBackgroundDesktop from 'components/Svg/SwapMainBackgroundDesktop'
import InfoNav from '../Info/components/InfoNav'
import HistoryTable, { TYPE_HISTORY } from './historyTable'
import TransactionTable from './transactionTable'
// eslint-disable-next-line import/no-cycle
import Earned from './earned'
import { useRouter } from 'next/router'

const TYPE = {
  default: 'DEFAULT',
  history: 'HISTORY',
  withdraw: 'WITHDRAW',
}

const Row = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  & .btn-back {
    cursor: pointer;
  }
  @media (max-width: 576px) {
    flex-direction: column;
  }
`

const WrapperBorder = styled.div`
  border-radius: 10px;
  box-shadow: 0px 0px 16px #00000080;
  flex: 1;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  @media (min-width: 577px) {
    &.flex-50 {
      flex: 0 0 calc(50% - 15px);
      max-width: calc(50% - 15px);
      > div {
        width: 100%;
      }
    }
  }
  @media (max-width: 576px) {
    width: 100%;
  }
`

const WrapBorder = styled.div`
  background: linear-gradient(95.32deg, #B809B5 -7.25%, #ED1C51 54.2%, #FFB000 113.13%), linear-gradient(0deg, rgba(16, 16, 16, 0.3), rgba(16, 16, 16, 0.3));
  padding: 1px;
  flex: 1;
  border-radius: 20px;
  height: 100%;
  > div {
    background: #0d0d0d;
  }
`

const Box = styled.div` 
  flex: 1;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  padding: 33px 30px 33px 29px;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  position: relative;
  height: 100%;
  img {
    max-width: 60px;
  }
  &.wrap-table {
    align-items: flex-start;
  }
  &.h-186 {
    min-height: 186px;
  }
  &.border {
    border-image-source: linear-gradient(95.32deg, #B809B5 -7.25%, #ED1C51 54.2%, #FFB000 113.13%);
    border: 1px solid linear-gradient(95.32deg, #B809B5 -7.25%, #ED1C51 54.2%, #FFB000 113.13%);
  }
  @media (max-width: 576px) {
    &.h-186 {
      min-height: 193px;
    }
    img {
      max-width: 50px;
    }
    &.wrap-table {
      padding: 18px;
      max-width: 100%;
    }
    &.wrap-withdraw {
      padding: 18px;
    }
  }

  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: -1;
    border-bottom: 2px solid #ffffff30;
    border-left: 2px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    left: 0;
    z-index: -1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: -1;
    border-bottom: 2px solid #ffffff30;
    border-right: 2px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: -1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }
`

const Container = styled.div`
  padding: 0px 48px;
  margin-bottom: 24px;
  color: rgba(0, 0, 0, 0.87);

  display: flex;
  justify-content: center;

  @media (min-width: 1200px) {
    .content {
      width: 1200px;
    }
  }
  @media (min-width: 1400px) {
    .content {
      width: 1400px;
    }
  }

  @media screen and (max-width: 1400px) {
    padding: 24px;
    .content {
      width: 1200px;
    }
  }

  @media screen and (max-width: 1200px) {
    padding: 0px 24px;
    .content {
      width: 100%;
    }
  }
`

const WrapText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.6);
    &.number {
      color: ${({ theme }) => theme.colors.violet};
      margin-bottom: 12px;
      font-weight: 700;
      font-size: 24px;
      line-height: 29px;
      color: rgba(255, 255, 255, 0.87);
    }
  }
  @media (max-width: 576px) {
    p {
      font-size: 16px;
      line-height: 19px;
      &.number {
        font-size: 24px;
        line-height: 24px;
      }
    }
  }
`

const TextConnectWallet = styled.div`
  text-align: center;
  line-height: 1.3;
  br {
    display: none;
  }
  @media (max-width: 576px) {
    br {
      display: block;
    }
  }
`

const TextStyle = styled(Text)`
  font-size: 14px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.6);
  line-height: 20px;
  &.primary {
    color: ${({ theme }) => theme.colors.violet};
  }
`

const ConnectWalletButtonWraper = styled(ConnectWalletButton)`
  padding: 10px;
  margin: 0 auto;
  width: 100%;
  max-width: 146px;
  margin-top: 16px;
  height: 37px;
`
const BoxWrapper = styled(Box)`
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  align-items: center;

  button {
    max-width: 146px;
    font-size: 14px;
    font-weight: 700;
    border-radius: 6px;
  }
`

const MainBackground = styled.div`
  position: absolute;
  z-index: -1;
  top: -50px;
  left: 0;
  right: 0;
  bottom: 0;
  svg {
    width: 100vw;
    /* height: auto; */
    object-fit: cover;
  }
`

const ContainerBanner = styled.div`
  display: flex;
  justify-content: center;
  padding: 28px 0px 24px;
  @media (min-width: 1200px) {
    .banner {
      width: 1200px;
    }
  }
  @media (min-width: 1400px) {
    .banner {
      width: 1400px;
    }
  }

  @media screen and (max-width: 1400px) {
    padding: 24px;
    .banner {
      width: 1200px;
    }
  }

  @media screen and (max-width: 1200px) {
    padding: 28px 24px 24px;
    .banner {
      width: 100%;
    }
  }
`

const CustomRow = styled(Row)`
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: calc(50% - 12px) calc(50% - 12px);
  }
`

const FullWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

export const formatNumberDecimal = (n: any, decimal?: number) => {
  const nString = parseFloat(n).toFixed(15).toString()
  const nSlice = decimal || 6
  return `${nString.split('.')[0]}.${nString.split('.')[1].slice(0, nSlice)}`
}

export default function StableCoin() {
  const { account, chainId } = useWeb3React()
  const [widthDraw, setWidthDraw] = useState(TYPE.default)
  const allTokens = useAllTokens()
  const [loadOk, setLoadOk] = useState(false)
  const contractTreasuryXOX = useTreasuryXOX()
  const [currentXOX, setCurrentXOX] = useState<number | string>(0)
  const [currentReward, setCurrentReward] = useState<number | string>(0)
  const [keyContainer, setKeyContainer] = useState(Math.random())
  const { isMobile } = useMatchBreakpoints()
  const [isLoadingData, setIsLoadingData] = useState(false)

  // eslint-disable-next-line consistent-return
  const handleCheckPendingRewardAll = async (accountId: any) => {
    if (!accountId) return null
    try {
      const paramsString = window.location.search
      const searchParams = new URLSearchParams(paramsString)
      const chainIdLocal = searchParams.get('chainId') || chainId
      const [infosUser, res2] = await Promise.all([
        contractTreasuryXOX.userInfo(accountId),
        contractTreasuryXOX.pendingReward(accountId),
      ])
      const txPendingReward: any = res2
      const dataParse: any[] = infosUser.map((item) => {
        return formatUnits(item, USD_DECIMALS[chainIdLocal])
      })
      const amountPoint = Number(dataParse[1])
      const rewardPoint = Number(dataParse[2])
      if (rewardPoint === 0 || rewardPoint) {
        const numberReward = Number(formatUnits(txPendingReward._hex, USD_DECIMALS[chainIdLocal])) + rewardPoint
        setCurrentReward(numberReward ? formatNumberDecimal(numberReward) : 0)
        const totalCurrentXOXS = amountPoint + numberReward
        setCurrentXOX(totalCurrentXOXS ? formatNumberDecimal(totalCurrentXOXS) : 0)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`error>>>>>`, error)
      setCurrentReward(0)
      setCurrentXOX(0)
    }
  }

  useEffect(() => {
    let id
    if (account) {
      handleCheckPendingRewardAll(account)
      id = setInterval(() => {
        handleCheckPendingRewardAll(account)
      }, 5000)
    }
    return () => clearInterval(id)
  }, [account])

  useEffect(() => {
    if (!chainId || !account) return
    if (loadOk) window.location.reload()
    setLoadOk(true)
  }, [chainId, account])

  return (
    <>
      <MainBackground>{isMobile ? <SwapMainBackgroundMobile /> : <SwapMainBackgroundDesktop />}</MainBackground>

      <FullWrapper>
        <ContainerBanner>
          <div className="banner">
            <InfoNav
              allTokens={allTokens}
              textContentBanner="Earn USDT/USDC from your XOXS Indefinitely"
              hasPadding={false}
            />
          </div>
        </ContainerBanner>
        <Container style={{ marginBottom: 59 }} key={`container-stablecoin${chainId}`}>
          <div className="content">
            {account && (
              <Row>
                <WrapperBorder>
                  <Box className="h-186">
                    <div className="corner1" />
                    <div className="edge1" />
                    <div className="corner2" />
                    <div className="edge2" />
                    <Flex justifyContent="space-between" alignItems="center" width="100%">
                      <WrapText>
                        <p>Your current XOXS</p>
                        <p className="number">{currentXOX}</p>
                        <Link href="/stable-coin/history">
                          <Button height={37} style={{ fontSize: 14 }} onClick={() => setWidthDraw(TYPE.history)}>
                            View your history
                          </Button>
                        </Link>
                      </WrapText>
                      <img src="/images/1/tokens/XOX.svg" alt="icon" />
                    </Flex>
                  </Box>
                </WrapperBorder>
                <WrapperBorder>
                  <Box className="h-186">
                    <div className="corner1" />
                    <div className="edge1" />
                    <div className="corner2" />
                    <div className="edge2" />
                    <Earned address={account} />
                  </Box>
                </WrapperBorder>
                <WrapperBorder>
                  <WrapBorder>
                    <Box className="h-186">
                      <Flex justifyContent="space-between" alignItems="center" width="100%">
                        <WrapText>
                          <p>Your current reward</p>
                          <p className="number">{currentReward}</p>
                          <Link href="/stable-coin/withdraw">
                            <Button height={37} style={{ fontSize: 14 }}>
                              Withdraw reward
                            </Button>
                          </Link>
                        </WrapText>
                        <img src="/images/1/tokens/XOX.svg" alt="icon" />
                      </Flex>
                    </Box>
                  </WrapBorder>
                </WrapperBorder>
              </Row>
            )}
            {!account && (
              <Row>
                <WrapperBorder>
                  <Box className="h-186">
                    <div className="corner1" />
                    <div className="edge1" />
                    <div className="corner2" />
                    <div className="edge2" />
                    <Flex
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      style={{ width: '100%', padding: '10px 0' }}
                    >
                      <TextConnectWallet style={{ color: 'rgba(255, 255, 255, 0.87)' }}>
                        Please connect wallet to <br />
                        view your information
                      </TextConnectWallet>
                      <ConnectWalletButtonWraper scale="sm" style={{ whiteSpace: 'nowrap' }}>
                        <Trans>Connect Wallet</Trans>
                      </ConnectWalletButtonWraper>
                    </Flex>
                  </Box>
                </WrapperBorder>
              </Row>
            )}
            <CustomRow>
              <WrapperBorder style={{ height: '100%' }}>
                <Box className="wrap-table" style={{ height: '100%', maxWidth: '100%', overflow: 'visible' }}>
                  <div className="corner1" />
                  <div className="edge1" />
                  <div className="corner2" />
                  <div className="edge2" />
                  <HistoryTable typePage={TYPE_HISTORY.widthDraw} key="withdraw" />
                </Box>
              </WrapperBorder>
              <WrapperBorder style={{ height: '100%' }}>
                <Box className="wrap-table" style={{ height: '100%', maxWidth: '100%', overflow: 'visible' }}>
                  <div className="corner1" />
                  <div className="edge1" />
                  <div className="corner2" />
                  <div className="edge2" />
                  <TransactionTable />
                </Box>
              </WrapperBorder>
            </CustomRow>
          </div>
        </Container>
      </FullWrapper>
    </>
  )
}
