import Image from "next/image";
import { ChainId } from '@pancakeswap/sdk'
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import { useActiveChainId, useLocalNetworkChain } from 'hooks/useActiveChainId'
import {
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalBackButton,
  ModalCloseButton,
  ModalBody,
  InjectedModalProps,
  Heading,
  Button,
  useMatchBreakpoints,
  MODAL_SWIPE_TO_CLOSE_VELOCITY,
} from '@pancakeswap/uikit'
import { NETWORK_ICON, NETWORK_LABEL } from "./networks";

const StyledModalContainer = styled(ModalContainer)`
  width: 448px;
  padding-bottom: 20px;
  max-width: calc(100vw - 48px) !important;
  max-height: 90vh;
  position: relative;
  background: #242424;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    min-height: auto;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
  }
  @media screen and (max-width: 450px) {
    position: fixed;
    top: 20%;
  }
`

const StyledModalHeader = styled(ModalHeader)`
  padding-top: 20px;
  padding-bottom: 0;
  border: none;
  & > div {
    display: block;
  }
  & > div button {
    left: 17px;

    svg {
      fill: #8e8e8e;
    }
  }

  h2 {
    text-align: center;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.87);
  }

  button {
    position: absolute;
    top: 17px;
    right: 17px;
    background: 0;
    padding: 0;
    width: 20px;
    height: 20px;
  }

  button:hover {
    background: none !important;
  }
`

const ListNetWork = styled.div`
  padding: 0 20px;
  display: flex;
  gap: 15px;
  margin-top: 20px;
  flex-direction: column;
  button {
    border: 1px solid ${({theme}) => theme.colors.hr};
    box-sizing: border-box;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: none;
    cursor: pointer;
    &:hover{
      background-color: #1d1d1d;
    }
  }
  button.active {
    border: 1px solid ${({theme}) => theme.colors.secondary80};
    cursor: auto;
    &:hover {
      background: transparent;
    }
  }
  .title-network {
    font-style: normal;
    font-weight: 400;
    font-size: ${isMobile ? "14px" : "18px"};
    padding-left: ${isMobile ? "5px" : "12px"} !important;
    color: ${({theme}) => theme.colors.textSubTitle};
  }
  img {
    border-radius: 50%;
  }
  .image-network {
    margin-right: ${isMobile ? "5px" : "12px"} !important;
  }
  .gap-4{
    gap: 16px;
  }
`;

export default function SwitchNetworkModal(props: any): JSX.Element {
  const { switchNetwork, currentChainId, onDismiss } = props;
  const { chainId } = useActiveChainId();
  if (!chainId) return null;
  const arrNetwork = [ChainId.GOERLI, ChainId.BSC_TESTNET]

  const handleSwitchNetwork = (key) => {
    switchNetwork(key);
  };

  return (
    <StyledModalContainer>
      <StyledModalHeader>
        <h2>Switch to</h2>
        <ModalCloseButton onDismiss={onDismiss} />
      </StyledModalHeader>
      <ListNetWork
        className={`${
          isMobile ? "gap-4" : "gap-6"
        } grid grid-flow-row-dense grid-cols-1 overflow-y-auto md:grid-cols-1 magin`}
      >
        {arrNetwork.map((key: ChainId, i: number) => {
          return (
            // eslint-disable-next-line react/button-has-type
            <button
              onClick={() => {
                // eslint-disable-next-line no-unused-expressions
                currentChainId !== Number(key) &&
                  handleSwitchNetwork(
                    currentChainId !== chainId ? currentChainId : key
                  );
              }}
              style={isMobile ? { height: "60px" } : { height: "60px" }}
              className={`${currentChainId === Number(key) && "active"}`}
              // eslint-disable-next-line react/no-array-index-key
              key={i}
            >
              <div className="title-network">{NETWORK_LABEL[key]}</div>
              <div className="image-network">
                <img
                  src={NETWORK_ICON[key]}
                  alt="Network Icon"
                  className=""
                  width={isMobile ? "32px" : "36px"}
                  height={isMobile ? "32px" : "36px"}
                />
              </div>
            </button>
          );
        })}
      </ListNetWork>
    </StyledModalContainer>
  );
}
