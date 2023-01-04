import React, { useState } from "react";
import { ChainId } from '@pancakeswap/sdk'
import styled from "styled-components";
import { NumericalInput } from '@pancakeswap/uikit';
import SelectNetworkButton from "./SelectNetworkButton";
import SelectTokenButton from "./SelectTokenButton";

const Wrapper = styled.div`
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.dark3};
  padding: 12px;

  @media screen and (min-width: 576px) {
    border-radius: 15px;
    padding: 16px 24px;
  }
`;

const TextRow = styled.div`
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 7px;

  .balance {
    width: 120px;
    cursor: pointer;
    text-align: right;
    div {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  @media screen and (min-width: 576px) {
    font-weight: 500;
    margin-bottom: 5px;
  }
`;

const AmountRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;

  .tooltip {
    background: transparent;
    padding: 7px 10px 7px 0;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    width: calc(100% - 250px);
    span {
      color: #fff;
    }
    div {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    @media screen and (min-width: 576px) {
      padding: 10px 8px 10px 0;
      font-size: 24px;
      width: calc(100% - 322px);
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
  }
`;

const NumericalInputStyled = styled(NumericalInput)`
  background: transparent;
  padding: 7px 10px 7px 0;
  font-size: 16px;
  width: 50px;
  color: #fff;
  ${(props) => props.disabled === true && " pointer-events: none"};

  @media screen and (min-width: 576px) {
    padding: 10px 8px 10px 0;
    font-size: 24px;
    width: auto;
  }
  & {
    -webkit-text-fill-color: #fff;
    ::placeholder {
      -webkit-text-fill-color: #fff;
    }
    opacity: 1;
  }
  &::placeholder {
    color: #fff;
  }
`;

type Props = {
  isTokenFrom: boolean;
  inputChainId: ChainId;
  balance?: any;
  amount: any;
  handleUserInput?: any;
  handleBalanceMax?: any;
  switchNetwork?: any;
  tokenSymbol?: string;
  switchToken?: any;
  isShowDrop?: any;
  handleShowDrop?: any;
};

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
  const getInputLabel = () => {
    return (isTokenFrom && "From:") || "To (est):";
  };

  return (
    <Wrapper>
      <TextRow>
        <span>{getInputLabel()}</span>
        {isTokenFrom && (
          <span
            className="balance"
            onClick={() => balance !== "-" && handleBalanceMax(balance)}
            aria-hidden="true"
          >
            Balance: ${balance}
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
          <div className="tooltip">
            {amount || (
              <span>0.0</span>
            )}
          </div>
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
          <SelectNetworkButton
            inputChainId={inputChainId}
            switchNetwork={switchNetwork}
          />
        </div>
      </AmountRow>
    </Wrapper>
  );
};

export default AmountInput;
