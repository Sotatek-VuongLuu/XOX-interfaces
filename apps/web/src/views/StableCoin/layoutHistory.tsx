/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useMemo } from 'react'
import { Flex, Button, Text } from '@pancakeswap/uikit'
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

const Box = styled.div`
  padding: 17px 30px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bgBox};
  box-shadow: 0px 0px 16px #00000080;
  flex: 1;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  img {
    max-width: 60px;
  }
  &.wrap-table {
    align-items: flex-start;
    max-width: calc(50% - 15px);
  }
  &.h-190{
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
  @media (max-width: 576px) {
    padding: 0px 24px;
  }
`

const WrapText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  p {
    margin-bottom: 0;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.87);
    &.number {
      color: ${({ theme }) => theme.colors.violet};
      font-size: 36px;
      font-weight: 700;
    }
  }
  @media (max-width: 576px) {
    p {
      font-size: 16px;
      &.number {
        font-size: 24px;
      }
    }
  }
`

const TextConnectWallet = styled.div`
  text-align: center;
  line-height: 1.3;
  br{
    display: none;
  }
  @media (max-width: 576px) {
    br{
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

export default function LayoutHistory() {
  const { account, chainId } = useWeb3React()
  const [widthDraw, setWidthDraw] = useState(TYPE.default)
  const allTokens = useAllTokens()
  const contractTreasuryXOX = useTreasuryXOX()
  const [currentXOX, setCurrentXOX] = useState<number | string>(0)
  const [currentReward, setCurrentReward] = useState<number | string>(0)
  const chainIdLocal:any = useMultiChainId() || chainId;
  const [keyContainer, setKeyContainer] = useState(Math.random());

  return (
    <>
      <InfoNav allTokens={allTokens} textContentBanner="Earn BUSD/USDC from Your  XOXS" />
      <Container style={{marginBottom: 100}} key={`container-stablecoin${chainId}`}>
        <Flex alignItems="center" style={{ gap: 10 }}>
            <Flex
            onClick={() => setWidthDraw(TYPE.default)}
            style={{ cursor: 'pointer', gap: 5 }}
            alignItems="center"
            >
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
            <Link href="/stable-coin">
                <TextStyle>Stable coin</TextStyle>
            </Link>
            </Flex>
            <TextStyle>|</TextStyle>
            <TextStyle className="primary">History</TextStyle>
        </Flex>
        <Row style={{ marginTop: 24 }}>
            <Box className="wrap-table">
                {
                    account && <HistoryTable typePage={TYPE_HISTORY.stake} />
                }
            </Box>
            <Box className="wrap-table">
            {
                account && <HistoryTable typePage={TYPE_HISTORY.myWidthDraw} />
            }
            </Box>
        </Row>
      </Container>
    </>
  )
}
