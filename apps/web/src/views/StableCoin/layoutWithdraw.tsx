/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useMemo } from 'react'
import { Flex, Button, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useAllTokens } from 'hooks/Tokens'
import styled from 'styled-components'
import { useTreasuryXOX } from 'hooks/useContract'
import { formatUnits } from '@ethersproject/units'
import { USD_DECIMALS } from 'config/constants/exchange'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useMultiChainId } from 'state/info/hooks'
import Trans from 'components/Trans'
import Link from 'next/link'
import SwapMainBackgroundMobile from 'components/Svg/LiquidityMainBackgroundMobile'
import SwapMainBackgroundDesktop from 'components/Svg/SwapMainBackgroundDesktop'
import InfoNav from '../Info/components/InfoNav'
import HistoryTable, { TYPE_HISTORY } from './historyTable'
import TransactionTable from './transactionTable'
import WidthdrawForm from './widthdrawForm'
import Earned from './earned'

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
`

const Box = styled.div`
  padding: 17px 30px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bgBox};
  box-shadow: 0px 0px 16px #00000080;
  flex: 1;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  img {
    max-width: 60px;
  }
  &.wrap-table {
    align-items: flex-start;
    max-width: calc(50% - 15px);
  }
  &.h-190 {
    min-height: 190px;
  }
  @media (max-width: 576px) {
    &.h-190 {
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
`

const Container = styled.div`
  padding: 0px 48px;
  margin-bottom: 24px;
  color: rgba(0, 0, 0, 0.87);
  justify-content: center;
  display: flex;
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
  @media (max-width: 576px) {
    padding: 0px 24px;

    .content {
      width: unset;
    }
  }
`

const ContainerBanner = styled.div`
  display: flex;
  justify-content: center;
  padding: 28px 0px 24px;

  @media (max-width: 576px) {
    padding: 28px 24px 24px;
  }
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
const MainBackground = styled.div`
  position: absolute;
  z-index: -1;
  top: -50px;
  left: 0;
  right: 0;
  bottom: 0;
  svg {
    width: 100vw;
    height: auto;
    object-fit: cover;
  }
`

export default function WithDrawLayout() {
  const { account, chainId } = useWeb3React()
  const [widthDraw, setWidthDraw] = useState(TYPE.default)
  const allTokens = useAllTokens()
  const contractTreasuryXOX = useTreasuryXOX()
  const [currentXOX, setCurrentXOX] = useState<number | string>(0)
  const [currentReward, setCurrentReward] = useState<number | string>(0)
  const chainIdLocal: any = useMultiChainId() || chainId
  const [keyContainer, setKeyContainer] = useState(Math.random())
  const { isMobile } = useMatchBreakpoints()
  const [loadOk, setLoadOk] = useState(false)
  // eslint-disable-next-line consistent-return
  const handleCheckPendingRewardAll = async (accountId: any) => {
    if (!accountId) return null
    try {
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
        setCurrentReward(numberReward || 0)
        const totalCurrentXOXS = amountPoint + numberReward
        setCurrentXOX(totalCurrentXOXS || 0)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`error>>>>>`, error)
      setCurrentReward(0)
      setCurrentXOX(0)
    }
  }

  useEffect(() => {
    if (account) {
      handleCheckPendingRewardAll(account)
    }
  }, [account])

  useEffect(() => {
    if (!chainId || !account) return
    if (loadOk) window.location.reload()
    setLoadOk(true)
  }, [chainId, account])

  return (
    <>
      <MainBackground>{isMobile ? <SwapMainBackgroundMobile /> : <SwapMainBackgroundDesktop />}</MainBackground>
      <ContainerBanner>
        <div className="banner">
          <InfoNav
            allTokens={allTokens}
            textContentBanner="Earn USDT/USDC from your XOXS Indefinitely"
            hasPadding={false}
          />
        </div>
      </ContainerBanner>
      <Container style={{ marginBottom: 100 }} key={`container-stablecoin${chainId}`}>
        <div className="content">
          <Flex alignItems="center" style={{ gap: 10 }}>
            <Flex onClick={() => setWidthDraw(TYPE.default)} style={{ cursor: 'pointer', gap: 5 }} alignItems="center">
              <Link href="/stable-coin">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 11.9961H18"
                    stroke="#8E8E8E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 18L6 12L12 6"
                    stroke="#8E8E8E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link href="/stable-coin">
                <TextStyle>Stable coin</TextStyle>
              </Link>
            </Flex>
            <TextStyle style={{ transform: 'translateY(1px)' }}>|</TextStyle>
            <TextStyle className="primary">Withdraw reward</TextStyle>
          </Flex>
          <Row style={{ marginTop: 25 }}>
            <WrapperBorder className="border-gradient-style">
              <Box className="wrap-withdraw">
                <WidthdrawForm priceAvailable={currentReward} />
              </Box>
            </WrapperBorder>
          </Row>
        </div>
      </Container>
    </>
  )
}
