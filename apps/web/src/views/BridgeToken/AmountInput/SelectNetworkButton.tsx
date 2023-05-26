import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { ChainId } from '@pancakeswap/sdk'
import { useModal } from '@pancakeswap/uikit'
import { NETWORK_ICON, NETWORK_LABEL } from '../networks'
import SwitchNetworkModal from '../ModalSwitch'

const NETWORK_LABEL_BRIDGE: { [chainId in ChainId]?: string } = {
  [ChainId.GOERLI]: 'Ethereum',
  [ChainId.ETHEREUM]: 'Ethereum',
  [ChainId.BSC_TESTNET]: 'BSC',
  [ChainId.BSC]: 'BSC',
}

const Wrapper = styled.button`
  padding: 7px 6px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  ${({ theme }) =>
    `background: none;
    border: 1px solid ${theme.colors.hr}`};
  width: 176px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 16px;
  margin-left: 10px;
  position: relative;
  cursor: pointer;
  span {
    white-space: nowrap;
    margin: 0 10px;
    color: ${({ theme }) => theme.colors.textSubTitle};
  }
  @media (max-width: 576px) {
    font-size: 12px;
    padding: 8px 35px 8px 12px;
    width: inherit;
    img {
      width: 20px;
    }
  }
`

const IconDown = styled.span`
  position: absolute;
  right: 0;
  top: 10px;
`

type Props = {
  inputChainId: ChainId
  switchNetwork: any
}

const SelectNetworkButton: React.FC<Props> = ({ inputChainId, switchNetwork }) => {
  const [isOpen, setIsOpen] = useState(false)

  const [onModalSwitch] = useModal(
    <SwitchNetworkModal switchNetwork={switchNetwork} currentChainId={inputChainId} />,
    true,
    true,
    `selectCurrencyModal${inputChainId}`,
  )

  return (
    <Wrapper onClick={() => onModalSwitch()}>
      <img src={NETWORK_ICON[inputChainId]} alt={`${NETWORK_LABEL_BRIDGE[inputChainId]} Logo`} width={24} />
      <span>{NETWORK_LABEL_BRIDGE[inputChainId] === 'BSC' ? 'BNB Chain' : NETWORK_LABEL_BRIDGE[inputChainId]}</span>
      <IconDown>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.6458 1.625L5.89575 6.375L1.14575 1.625"
            stroke="#8E8E8E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </IconDown>
    </Wrapper>
  )
}

export default SelectNetworkButton
