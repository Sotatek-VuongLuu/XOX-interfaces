import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { ChainId } from '@pancakeswap/sdk'
import { formatUnits, parseEther, parseUnits } from 'ethers/lib/utils'
import { fetchBridgeTokenFee } from '../../context/globalData'
import debounce from 'lodash/debounce'

const Wrapper = styled.div`
  border-radius: 8px;
  padding: 16px;
  margin-top: 25px;
  background: ${({ theme }) => theme.colors.dark3};
`

const Heading = styled.h5`
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  margin-bottom: 10px;
  @media (max-width: 576px) {
    font-size: 14px;
  }
`

const ReminderList = styled.ul`
  color: rgba(255, 255, 255, 0.87);
  font-size: 14px;
  line-height: 1.4;
  li {
    display: flex;
    margin-bottom: 8px;
    &::before {
      content: '-';
      display: block;
      margin-right: 5px;
    }
  }
  @media (max-width: 576px) {
    font-size: 12px;
  }
`

type Props = {
  chainId: ChainId
  amount: string
  onBridgeTokenFeeChange: (minAmount: string, maxAmount: string) => void
  setAmountTo: React.Dispatch<React.SetStateAction<string>>
  tokenInput: any
  tokenOutput: any
}

type BridgeTokenFee = {
  gasFee: string
  minCrossChainFee: string
  minAmount: string
  maxAmount: string
}

const initialBridgeTokenFee: BridgeTokenFee = {
  gasFee: '0.00',
  minCrossChainFee: '0.00',
  minAmount: '0.00',
  maxAmount: '0.00',
}

const Reminder: React.FC<Props> = ({
  chainId,
  amount,
  onBridgeTokenFeeChange,
  setAmountTo,
  tokenInput,
  tokenOutput,
}) => {
  const [bridgeTokenFee, setBridgeTokenFee] = useState<BridgeTokenFee>(initialBridgeTokenFee)
  const addressTokenOutput = tokenOutput?.address

  const debounceFn = useCallback(debounce(fetchData, 1000), [])

  useEffect(() => {
    debounceFn(amount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, amount, addressTokenOutput])

  async function fetchData(amountBri) {
    try {
      if (!chainId) {
        setBridgeTokenFee(initialBridgeTokenFee)
        setAmountTo('')
        return
      }
      
      const res = await fetchBridgeTokenFee(chainId, amountBri && amountBri !== ('.' || '') ? amountBri : '0')
      const bridgeTokenFeeCurrent: BridgeTokenFee = res?.data || bridgeTokenFee
      // const bridgeTokenFee: BridgeTokenFee = {
      //   gasFee: '0.13681800000000000014',
      //   minCrossChainFee: '0.01',
      //   minAmount: '0.15681800000000000014',
      //   maxAmount: '2000000',
      // }
      if (bridgeTokenFeeCurrent) {
        setBridgeTokenFee((prev) => ({
          ...prev,
          ...bridgeTokenFeeCurrent,
        }))
        const amountTo = await getAmountTo(
          bridgeTokenFeeCurrent.gasFee,
          bridgeTokenFeeCurrent.minCrossChainFee,
          bridgeTokenFeeCurrent.minAmount,
          amountBri
        )
        setAmountTo(amountTo)
        onBridgeTokenFeeChange(bridgeTokenFeeCurrent.minAmount, bridgeTokenFeeCurrent.maxAmount)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error>>', error)
    }
  }
  const formatNumberStr = (numberStr: string) => {
    if (!numberStr) {
      return '0.000'
    }

    return Number(numberStr).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    })
  }

  const getAmountTo = async (gasFee: string, crosschainFee: string, minAmount: string, amountBri: any) => {
    if (
      amountBri &&
      amountBri !== ('.' || '') &&
      parseUnits(amountBri, tokenInput.decimals).lt(parseUnits(Number(minAmount).toFixed(3), tokenInput.decimals))
    ) {
      return '0'
    }
    // const decimals = Math.max(gasFee.split('.')[1]?.length || 0, crosschainFee.split('.')[1]?.length || 0)
    const decimals = 18
    const totalFeeParsed = parseUnits(gasFee, decimals).add(parseUnits(crosschainFee, decimals))
    const amountToParsed = amountBri && amountBri !== ('.' || '') && parseUnits(amountBri, decimals).sub(totalFeeParsed)
    return amountBri && amountBri !== ('.' || '') && !amountToParsed.isNegative()
      ? Number(formatUnits(amountToParsed, decimals)).toFixed(6)
      : amountBri && amountBri !== ('.' || '')
      ? '0'
      : ''
  }

  return (
    <Wrapper>
      <Heading>Reminder:</Heading>
      <ReminderList>
        <li>
          Gas Fee is {formatNumberStr(bridgeTokenFee?.gasFee)} {tokenInput?.symbol}
        </li>
        <li>
          Minimum Crosschain Amount is {formatNumberStr(bridgeTokenFee?.minAmount)} {tokenInput?.symbol}
        </li>
        {/* <li>Maximum Crosschain Amount is {formatNumberStr(bridgeTokenFee?.maxAmount)} STAND</li> */}
        <li>Estimated Time of Crosschain Arrival is 10-30 min</li>
        {/* <li>
          Crosschain amount larger than {bridgeTokenFee?.maxAmount}{" "}
          {tokenInput?.symbol} could take up to 24 hours
        </li> */}
      </ReminderList>
    </Wrapper>
  )
}

export default Reminder
