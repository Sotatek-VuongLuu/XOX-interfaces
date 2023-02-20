import { useEffect, useState } from 'react'
import { Flex, Button, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useStableCoinSWR } from 'state/info/hooks'
import { formatUnits } from '@ethersproject/units'
import { USD_DECIMALS } from 'config/constants/exchange'
import { useWeb3React } from '@pancakeswap/wagmi'
import { ChainId } from '@pancakeswap/sdk'
// eslint-disable-next-line import/no-cycle
import { formatNumberDecimal } from './index'

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

const Earned = ({ address }: { address?: string }) => {
  const [priceUSDC, setPriceUSDC] = useState(0)
  const [priceUSDT, setPriceUSDT] = useState(0)
  const stablecoin: any = useStableCoinSWR(address)
  const { chainId } = useWeb3React()

  useEffect(() => {
    if (stablecoin?.infoUSDT || stablecoin?.infoUSDC) {
      const infopriceUSDC = stablecoin?.infoUSDC?.userInfo?.total_withdraw_earning || 0
      const infopriceUSDT = stablecoin?.infoUSDT?.userInfo?.total_withdraw_earning || 0
      setPriceUSDC(Number(formatUnits(infopriceUSDC, USD_DECIMALS[ChainId.ETHEREUM])))
      setPriceUSDT(Number(formatUnits(infopriceUSDT, USD_DECIMALS[ChainId.BSC])))
    }
  }, [stablecoin])

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" width="100%" style={{ marginBottom: 15 }}>
        <WrapText>
          <p>USDT earned</p>
          <p className="number">{priceUSDT ? formatNumberDecimal(priceUSDT) : 0}</p>
        </WrapText>
        <img src="/images/1/tokens/0xdAC17F958D2ee523a2206206994597C13D831ec7.svg" alt="icon" />
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" width="100%">
        <WrapText>
          <p>USDC earned</p>
          <p className="number">{priceUSDC ? formatNumberDecimal(priceUSDC) : 0}</p>
        </WrapText>
        <img src="/images/1/tokens/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.svg" alt="icon" />
      </Flex>
    </>
  )
}
export default Earned
