import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { TOKENS_SUPPORT } from "../tokensSupport";

// images
export const TokenStandLogo = "/icons/tokenstand_circle_logo.png";

const ChevronDownIcon:any = <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg" className="Svg-sc-4ba21b47-0 GjBIu">
  <path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z" />
</svg>

const ChevronUpIcon: any = <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg" className="Svg-sc-4ba21b47-0 GjBIu">
  <path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z" />
</svg>

const FullyContainer = styled.div`
  width: 111px;
  position: relative;
  margin-left: 10px;
  @media screen and (min-width: 576px) {
    width: 136px;
  }
  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  width: 111px;
  ${({ theme }) =>
    `background: #f5f5f5;
    border: 1px solid #ccc`};
  .nested {
    width: 100%;
    align-items: center;
    text-align: left;
    padding: 7px 6px;
  }

  @media screen and (min-width: 576px) {
    .nested {
      padding: 10px 12px;
    }
    border-radius: 8px;
    font-size: 16px;
    width: 100%;
  }

  span {
    white-space: nowrap;
    margin-left: 8px;
    font-weight: 600;
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
const ChevronUpIconStyled = styled.div`
  stroke: #ccc;
  width: 16px;
  height: 16px;
  margin-left: auto;

  @media screen and (min-width: 576px) {
    width: 18px;
    height: 18px;
  }
`;
const Select = styled.div`
  width: 100%;
  background: #0b0b0d;
  background: #f5f5f5;
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 11px;
  position: absolute;
  top: 90%;
  left: 0;
  right: 0;
  transition: all 0.2s linear;
  button {
    width: 100%;
    height: 48px;
  }

  .title-token {
    color: #999;
    font-weight: 600;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (min-width: 576px) {
      font-size: 16px;
    }
  }
  .active {
    background: #333;
    pointer-events: none;
  }
  div:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  div:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const Option = styled.div`
  padding: 10px 0px;
  cursor: pointer;
`;
type Props = {
  tokenSymbol?: any;
  switchToken?: any;
  isTokenFrom?: any;
  inputChainId?: any;
  isShowDrop?: any;
  handleShowDrop?: any;
};

const SelectTokenButton: React.FC<Props> = ({
  tokenSymbol,
  switchToken,
  isTokenFrom,
  inputChainId,
  isShowDrop,
  handleShowDrop,
}) => {
  const [listTokens, setListTokens] = useState(TOKENS_SUPPORT[inputChainId]);

  useEffect(() => {
    setListTokens(TOKENS_SUPPORT[inputChainId]);
  }, [inputChainId]);

  return (
    <>
      <FullyContainer>
        <Wrapper onClick={() => handleShowDrop()}>
          <div className="flex nested" style={{ zIndex: 8 }}>
            <ImageWrapper>
              <Image
                className="rounded-full"
                src={`/images/tokens/${tokenSymbol?.toLowerCase()}-square.jpg`}
                alt="TokenStand Logo"
                layout="fill"
                objectFit="contain"
              />
            </ImageWrapper>
            <span>{tokenSymbol}</span>
            {isShowDrop ? <ChevronUpIconStyled /> : <ChevronDownIconStyled />}
          </div>
        </Wrapper>

        {isShowDrop && (
          <>
            <div
              className="overlay "
              style={{ zIndex: 7 }}
              onClick={() => {
                handleShowDrop();
              }}
              aria-hidden="true"
             />
            <Select className="option" style={{ zIndex: 9 }}>
              {listTokens.map((token, index:any) => {
                return (
                  <Option
                    className={`flex ${
                      tokenSymbol === token.symbol && "active"
                    } `}
                    onClick={() => {
                      switchToken(index);
                      handleShowDrop();
                    }}
                  >
                    <Image src="/images/xox_planet.svg"  width={72} height={72} />
                    <div className="title-token flex items-center">
                      {token.symbol}
                    </div>
                  </Option>
                );
              })}
            </Select>
          </>
        )}
      </FullyContainer>
    </>
  );
};

export default SelectTokenButton;
