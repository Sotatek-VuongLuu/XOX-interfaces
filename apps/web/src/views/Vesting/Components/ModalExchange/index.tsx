import {
  Box,
  Button,
  Flex,
  Heading,
  InjectedModalProps,
  ModalBody,
  ModalCloseButton,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  NumericalInput,
  Text,
} from '@pancakeswap/uikit'
import useWindowSize from 'hooks/useWindowSize'
import React from 'react'
import styled from 'styled-components'

const StyledModalContainer = styled(ModalContainer)`
  padding: 32px 24px;
  position: relative;
  border-radius: 20px;

  .corner1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 28px;
    border-radius: 20px;
    z-index: 1;
    border-top: 2px solid #ffb000;
    border-left: 2px solid #ffb000;
    border-top-right-radius: unset;
    border-bottom-left-radius: unset;
  }

  .edge1 {
    width: 2px;
    height: calc(75% - 28px);
    position: absolute;
    top: 28px;
    left: 0;
    z-index: 1;
    background: linear-gradient(to top, rgba(16, 16, 16, 0.3) 15%, #ed1c51, #ffb000);
  }

  .corner2 {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 28px;
    border-radius: 20px;
    z-index: 1;
    border-top: 2px solid #ffb000;
    border-right: 2px solid #ffb000;
    border-top-left-radius: unset;
    border-bottom-right-radius: unset;
  }

  .edge2 {
    width: 2px;
    height: calc(75% - 28px);
    position: absolute;
    top: 28px;
    right: 0;
    z-index: 1;
    background: linear-gradient(to top, rgba(16, 16, 16, 0.3) 15%, #ed1c51, #ffb000);
  }
`

const StyledModalHeader = styled(ModalHeader)`
  padding: 0px !important;

  @media screen and (max-width: 900px) {
    margin-bottom: 16px;
  }
`

const StyledModalBody = styled(ModalBody)`
  img {
    height: 20px;
    width: 20px;
    margin-right: 8px;
    object-fit: cover;

    @media screen and (max-width: 900px) {
      height: 16px;
      width: 16px;
    }
  }

  .coin {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 12px;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
    @media screen and (max-width: 900px) {
      font-size: 12px;
      line-height: 15px;
      margin-left: 8px;
    }
  }
  .balance {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 8px;
  }

  .balance_mb {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: rgba(255, 255, 255, 0.6);
  }
  .buy_xox {
    width: 400px;
    @media screen and (max-width: 900px) {
      width: 100%;
    }
  }

  .text_mb {
    font-size: 12px;
    line-height: 15px;
  }

  @media screen and (max-width: 900px) {
    .xox_amount {
      margin: 16px 0px !important;
    }

    .xoxs_amount {
      margin-bottom: 16px;
    }

    .value {
      font-size: 14px !important;
      line-height: 17px !important;
    }
  }
`

const ButtonStyle = styled.button`
  padding: 6px 14px;
  background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
  border-radius: 6px;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: rgba(255, 255, 255, 0.87);
  border: none;
  cursor: pointer;
`

const BoxCenter = styled(Box)`
  padding: 12px 14px;
  border: 1px solid #444444;
  border-radius: 6px;
  width: 400px;
  display: flex;
  align-items: center;

  .ref_code {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.87);
    &::placeholder {
      color: rgba(255, 255, 255, 0.38);
    }
    &:focus {
      outline: none;
    }
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    padding: 10px 14px;
    margin-top: 8px;
  }
`
interface INumericalInputStyledProps {
  amount?: string
}
const NumericalInputStyled = styled(NumericalInput)<INumericalInputStyledProps>`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  background: transparent;
  color: ${({ amount }) => (amount ? `rgba(255, 255, 255, 0.87)` : `rgba(255, 255, 255, 0.38)`)};
  width: 100%;
  ${(props) => props.disabled === true && ' pointer-events: none'};
  & {
    -webkit-text-fill-color: ${({ amount }) => (amount ? `rgba(255, 255, 255, 0.87)` : `rgba(255, 255, 255, 0.38)`)};
    ::placeholder {
      -webkit-text-fill-color: rgba(255, 255, 255, 0.38);
    }
    opacity: 1;
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.38);
  }

  @media screen and (max-width: 576px) {
    font-size: 12px;
    line-height: 15px;
  }
`

const FlexCustom = styled(Flex)`
  align-items: center;

  .title_ref {
    color: rgba(255, 255, 255, 0.6);
    font-weight: 700;
    font-size: 12px;
    margin-right: 20px;
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .title_ref {
      font-weight: 700;
      font-size: 12px;
      line-height: 15px;
      color: rgba(255, 255, 255, 0.6);
    }
  }
`

interface Props extends InjectedModalProps {
  amount: any
  setAmount: any
}

function ModalSaleExchange({ onDismiss, amount, setAmount }: Props) {
  const { width } = useWindowSize()
  return (
    <StyledModalContainer>
      <div className="corner1" />
      <div className="edge1" />
      <div className="corner2" />
      <div className="edge2" />
      <StyledModalHeader>
        <ModalTitle>
          <Text color="rgba(255, 255, 255, 0.87)" fontWeight={700} fontSize="24px" textAlign="center">
            EXCHANGE
          </Text>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </StyledModalHeader>
      <StyledModalBody>
        {width > 900 && (
          <>
            <p style={{ textAlign: 'right', paddingRight: '83px' }} className="balance">
              Balance:
            </p>
            <Flex alignItems="center">
              <Text color="rgba(255, 255, 255, 0.6)" fontWeight={700} fontSize="12px" marginRight="53px">
                Amount
              </Text>
              <BoxCenter>
                <NumericalInputStyled
                  value={amount}
                  amount={amount}
                  onUserInput={(value) => setAmount(value)}
                  placeholder="0.00"
                />
                <ButtonStyle>All</ButtonStyle>
              </BoxCenter>
              <Text className="coin">
                <img src="/images/1/tokens/0xdAC17F958D2ee523a2206206994597C13D831ec7.svg" alt="logo" />
                <span>USDT</span>
              </Text>
            </Flex>
          </>
        )}

        {width <= 900 && (
          <>
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="rgba(255, 255, 255, 0.6)" fontWeight={700} className="text_mb">
                Amount
              </Text>
              <p className="balance_mb">Balance:</p>
              <Text className="coin">
                <img src="/images/1/tokens/0xdAC17F958D2ee523a2206206994597C13D831ec7.svg" alt="logo" />
                <span>USDT</span>
              </Text>
            </Flex>
            <BoxCenter>
              <NumericalInputStyled
                value={amount}
                amount={amount}
                onUserInput={(value) => setAmount(value)}
                placeholder="0.00"
              />
              <ButtonStyle>All</ButtonStyle>
            </BoxCenter>
          </>
        )}

        <Flex alignItems="center" margin="26px 0px" className="xox_amount">
          <Text color="rgba(255, 255, 255, 0.6)" fontWeight={700} fontSize="12px" marginRight="25px">
            XOX Amount
          </Text>
          <Text color="rgba(255, 255, 255, 0.87)" fontWeight={400} fontSize="16px" className="value">
            - XOX
          </Text>
        </Flex>
        <Flex alignItems="center" marginBottom="26px" className="xoxs_amount">
          <Text color="rgba(255, 255, 255, 0.6)" fontWeight={700} fontSize="12px" marginRight="20px">
            XOXS Reward
          </Text>
          <Text color="rgba(255, 255, 255, 0.87)" fontWeight={400} fontSize="16px" className="value">
            - XOXS
          </Text>
        </Flex>

        <FlexCustom>
          <Text className="title_ref">Referral Code</Text>
          <BoxCenter>
            <input placeholder="Optional" className="ref_code" />
          </BoxCenter>
        </FlexCustom>

        <Flex
          alignItems="center"
          justifyContent="center"
          paddingLeft={width <= 900 ? 0 : 19}
          marginTop={width <= 900 ? 16 : 48}
        >
          <Button className="buy_xox">Buy XOX</Button>
        </Flex>
      </StyledModalBody>
    </StyledModalContainer>
  )
}

export default ModalSaleExchange
