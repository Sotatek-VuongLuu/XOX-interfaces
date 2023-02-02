/* eslint-disable import/no-cycle */
import React, { useState } from 'react'
import { ChainId } from '@pancakeswap/sdk'
import styled from 'styled-components'
import { Tooltip } from '@mui/material'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { NumericalInput, useMatchBreakpoints } from '@pancakeswap/uikit'
import SelectNetworkButton from './SelectNetworkButton'
import SelectTokenButton from './SelectTokenButton'
import { NETWORK_LABEL } from '../networks'
import { getChainIdToByChainId } from '..'
import { formatAmountNumber } from '@pancakeswap/utils/formatBalance'

const Wrapper = styled.div`
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.dark3};
  padding: 12px;

  @media screen and (min-width: 576px) {
    border-radius: 15px;
    padding: 16px 24px;
  }
`

interface IPropsTextRow {
  isMobile?: boolean
}

const TextRow = styled.div<IPropsTextRow>`
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.textSubtle};

  .label {
    min-width: ${({ isMobile }) => isMobile && '60px'};
  }

  .balance_container {
    font-weight: 400;
    text-align: right;
    display: flex;
    white-space: nowrap;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
    align-items: ${({ isMobile }) => (isMobile ? 'flex-end' : 'center')};
    cursor: pointer;
  }

  .balance_pool_container {
    font-weight: 400;
    text-align: right;
    display: flex;
    white-space: nowrap;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
    align-items: ${({ isMobile }) => (isMobile ? 'flex-end' : 'center')};
  }

  @media (max-width: 576px) {
    font-size: 14px;
  }
`

const AmountRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;

  .tooltip {
    background: transparent;
    padding: 7px 0 7px 0;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.textSubTitle};
    font-weight: 400;
    width: calc(100%);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    @media screen and (min-width: 576px) {
      padding: 10px 0 10px 0;
      font-size: 18px;
      width: calc(100%);
    }
  }

  .buttons-group {
    display: flex;
    // z-index: 1;

    > button:not(:last-child) {
      margin-right: 10px;

      @media screen and (min-width: 576px) {
        margin-right: 8px;
      }
    }
    @media (max-width: 576px) {
      flex-direction: column;
      align-items: flex-end;
      gap: 5px;
    }
  }
`

const NumericalInputStyled = styled(NumericalInput)`
  background: transparent;
  padding: 10px 8px 10px 0;
  font-size: 18px;
  width: auto;
  color: ${({ theme }) => theme.colors.textSubTitle};
  font-weight: 400;
  ${(props) => props.disabled === true && ' pointer-events: none'};
  & {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.textSubTitle};
    ::placeholder {
      -webkit-text-fill-color: ${({ theme }) => theme.colors.textSubTitle};
    }
    opacity: 1;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSubTitle};
  }
  @media (max-width: 576px) {
    font-size: 16px;
  }
`

type Props = {
  isTokenFrom: boolean
  inputChainId: ChainId
  balance?: any
  amount: any
  handleUserInput?: any
  handleBalanceMax?: any
  switchNetwork?: any
  tokenSymbol?: string
  switchToken?: any
  isShowDrop?: any
  handleShowDrop?: any
}

const AmountInput: React.FC<Props> = ({
  isTokenFrom,
  inputChainId,
  balance,
  amount,
  handleUserInput,
  handleBalanceMax,
  switchNetwork,
  tokenSymbol,
  switchToken,
  isShowDrop,
  handleShowDrop,
}) => {
  const { chainId } = useActiveChainId()
  const getInputLabel = () => {
    return (isTokenFrom && 'From') || 'To (est)'
  }
  const { isMobile } = useMatchBreakpoints()

  return (
    <Wrapper>
      <TextRow isMobile={isMobile}>
        <span className="label">{getInputLabel()}</span>
        {isTokenFrom && (
          <span
            aria-hidden="true"
            className="balance_container"
            onClick={() => balance !== '-' && handleBalanceMax(balance)}
          >
            Balance
            {isMobile ? '' : ':'}
            <span className="balance">&nbsp;{formatAmountNumber(balance, 6)}</span>
          </span>
        )}

        {!isTokenFrom && (
          <span aria-hidden="true" className="balance_pool_container">
            {NETWORK_LABEL[getChainIdToByChainId(chainId)]} Pool balance
            {isMobile ? '' : ':'}
            <span className="balance_pool">&nbsp;{formatAmountNumber(balance, 6)}</span>
          </span>
        )}
      </TextRow>

      <AmountRow>
        {isTokenFrom ? (
          <NumericalInputStyled
            value={amount}
            disabled={!isTokenFrom}
            onUserInput={(value) => handleUserInput(value)}
          />
        ) : (
          <div className="tooltip">{amount || <span>0.0</span>}</div>
        )}

        <div className="buttons-group">
          <SelectTokenButton
            tokenSymbol={tokenSymbol}
            switchToken={switchToken}
            isTokenFrom={isTokenFrom}
            inputChainId={inputChainId}
            isShowDrop={isShowDrop}
            handleShowDrop={handleShowDrop}
          />
          <SelectNetworkButton inputChainId={inputChainId} switchNetwork={switchNetwork} />
        </div>
      </AmountRow>
    </Wrapper>
  )
}

export default AmountInput
