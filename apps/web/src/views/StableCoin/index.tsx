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

export default function StableCoin() {
  const { account, chainId } = useWeb3React()
  const [widthDraw, setWidthDraw] = useState(TYPE.default)
  const allTokens = useAllTokens()
  const contractTreasuryXOX = useTreasuryXOX()
  const [currentXOX, setCurrentXOX] = useState<number | string>(0)
  const [currentReward, setCurrentReward] = useState<number | string>(0)
  const [keyContainer, setKeyContainer] = useState(Math.random());

  // eslint-disable-next-line consistent-return
  const handleCheckPendingRewardAll = async (accountId: any) => {
    if(!accountId) return null;
    try {
      const paramsString = window.location.search;
      const searchParams = new URLSearchParams(paramsString);
      const chainIdLocal = searchParams.get("chainId") || chainId;
      const [infosUser, res2] = await Promise.all([
        contractTreasuryXOX.userInfo(accountId),
        contractTreasuryXOX.pendingReward(accountId),
      ])
      const txPendingReward: any = res2
      const dataParse: any[] = infosUser.map((item) => {
        return formatUnits(item, USD_DECIMALS[chainIdLocal])
      })
      const amountPoint = Number(dataParse[1]);
      const rewardPoint = Number(dataParse[2]);
      if(rewardPoint === 0 || rewardPoint){
        const numberReward = Number(formatUnits(txPendingReward._hex, USD_DECIMALS[chainIdLocal])) + rewardPoint;
        setCurrentReward(numberReward ? numberReward?.toFixed(6) : 0);
        const totalCurrentXOXS = amountPoint+numberReward;
        setCurrentXOX(totalCurrentXOXS ? totalCurrentXOXS.toFixed(6) : 0);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`error>>>>>`, error);
      setCurrentReward(0);
      setCurrentXOX(0);
    }
  }

  useEffect(() => {
    if(account){
      handleCheckPendingRewardAll(account);
    }
  }, [account]);

  return (
    <>
      <InfoNav allTokens={allTokens} textContentBanner="Earn BUSD/USDC from Your  XOXS" />
      <Container style={{marginBottom: 100}} key={`container-stablecoin${chainId}`}>
          <>
            {
              account && <Row>
                <Box className="h-190">
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
                    <img src="/images/1/tokens/XOX.png" alt="icon" />
                  </Flex>
                </Box>
                <Box className="h-190">
                  <Earned address={account} />
                </Box>
                <Box className="h-190">
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
                    <img src="/images/1/tokens/XOX.png" alt="icon" />
                  </Flex>
                </Box>
              </Row>
            }
            {
              !account && <Row>
                <Box className="h-190">
                  <Flex flexDirection="column" justifyContent="center" alignItems="center" style={{width: "100%",padding: '10px 0'}}>
                    <TextConnectWallet style={{color: 'rgba(255, 255, 255, 0.87)'}}>Please connect wallet to <br/>view your information</TextConnectWallet>
                    <ConnectWalletButtonWraper scale="sm" style={{whiteSpace: 'nowrap'}}>
                      <Trans>Connect Wallet</Trans>
                    </ConnectWalletButtonWraper>
                  </Flex>
                </Box>
              </Row>
            }
            <Row style={{ marginTop: 24 }}>
              <Box className="wrap-table">
                <HistoryTable typePage={TYPE_HISTORY.widthDraw} key="withdraw" />
              </Box>
              <Box className="wrap-table">
                <TransactionTable />
              </Box>
            </Row>
          </>
      </Container>
    </>
  )
}
