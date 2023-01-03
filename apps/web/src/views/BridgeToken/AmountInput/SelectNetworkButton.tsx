import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { ChainId } from '@pancakeswap/sdk'
import { NETWORK_ICON, NETWORK_LABEL } from "../networks";
import SwitchNetworkModal from "../ModalSwitch";

const NETWORK_LABEL_BRIDGE: { [chainId in ChainId]?: string } = { [ChainId.RINKEBY]: "Rinkeby", [ChainId.BSC_TESTNET]: "BSC" }

const ChevronDownIcon:any = <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg" className="Svg-sc-4ba21b47-0 GjBIu">
  <path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z" />
</svg>

const Wrapper = styled.button`
  padding: 7px 6px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  border-radius: 4px;
  font-size: 12px;
  width: 118px;
  margin-left: 10px;
  ${({ theme }) =>
    `background: #f5f5f5;
    border: 1px solid #ccc`};

  @media screen and (min-width: 576px) {
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 16px;
    width: 166px;
    margin-left: 10px;
  }

  span {
    white-space: nowrap;
    margin: 0 8px;
    font-weight: 600;
  }
`;

const ChevronDownIconStyled = styled.div`
  stroke: #ccc;
  width: 16px;
  height: 16px;
  margin-left: auto;

  @media screen and (min-width: 576px) {
    width: 18px;
    height: 18px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 20px;
  height: 20px;

  @media screen and (min-width: 576px) {
    width: 28px;
    height: 28px;
  }

  img {
    border-radius: 50%;
  }
`;

type Props = {
  inputChainId: ChainId;
  switchNetwork: any;
};

const SelectNetworkButton: React.FC<Props> = ({
  inputChainId,
  switchNetwork,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Wrapper onClick={() => setIsOpen(true)}>
      <ImageWrapper>
        <Image
          src={NETWORK_ICON[inputChainId]}
          alt={`${NETWORK_LABEL_BRIDGE[inputChainId]} Logo`}
          layout="fill"
          objectFit="contain"
        />
      </ImageWrapper>
      <span>{NETWORK_LABEL_BRIDGE[inputChainId]}</span>
      <ChevronDownIconStyled />
      <SwitchNetworkModal
        switchNetwork={switchNetwork}
        currentChainId={inputChainId}
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
      />
    </Wrapper>
  );
};

export default SelectNetworkButton;
