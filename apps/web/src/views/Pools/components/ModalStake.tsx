/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { InjectedModalProps, ModalContainer, ModalHeader, NumericalInput } from '@pancakeswap/uikit'
import tryParseAmount from '@pancakeswap/utils/tryParseAmount'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { getContractFarmingLPAddress } from 'utils/addressHelpers'
import { USD_ADDRESS, XOX_ADDRESS, XOX_LP } from 'config/constants/exchange'
import { XOXLP } from '@pancakeswap/tokens'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { parseUnits } from '@ethersproject/units'
import { useContractFarmingLP } from 'hooks/useContract'
import { Tooltip } from '@mui/material'
import ModalBase from 'views/Referral/components/Modal/ModalBase'
import { NETWORK_LABEL } from 'views/BridgeToken/networks'
import { GridLoader } from 'react-spinners'
import { linkTransactionTx } from '..'
import { Content } from './style'
import { NumericalInputStyled } from './ModalUnStake'

const StyledModalContainer = styled(ModalContainer)`
  position: relative;
  width: fit-content;
`
const StyledModalHeader = styled(ModalHeader)`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  width: 100%;
  margin-bottom: 15px;
`

const ContentStake = styled.div`
  padding: 20px;
  background: #303030;
  border-radius: 10px;
  width: 100%;
  margin-top: 24px;

  .balance_container {
    text-align: right;
    display: flex;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
  }

  .balanceLP {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100px;
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  .stake {
    p:first-child {
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: rgba(255, 255, 255, 0.6);
    }
    p:last-child {
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: rgba(255, 255, 255, 0.87);
    }

    @media screen and (max-width: 576px) {
      p {
        font-size: 12px;
        line-height: 15px;
      }
    }
  }

  .token_lp {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    p:first-child {
      color: rgba(255, 255, 255, 0.38);
    }
    p:last-child {
      color: rgba(255, 255, 255, 0.87);
      @media screen and (max-width: 576px) {
        min-width: fit-content;
      }
    }
    @media screen and (max-width: 576px) {
      p {
        font-size: 12px;
        line-height: 15px;
      }
    }
  }

  .token_usd {
    p {
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: rgba(255, 255, 255, 0.38);
    }
    @media screen and (max-width: 576px) {
      p {
        font-size: 12px;
        line-height: 15px;
      }
    }
  }

  .percent {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
    .item_percent_btn {
      padding: 6px 24px;
      border: 1px solid #9072ff;
      border-radius: 40px;
      background: transparent;
      font-weight: 700;
      font-size: 12px;
      line-height: 15px;
      color: #9072ff;
      margin-left: 8px;
      cursor: pointer;
      @media screen and (max-width: 576px) {
        padding: 8px 16px;
        font-size: 12px;
        line-height: 15px;
        margin-left: 5px;
      }
    }
  }
`

const ButtonGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 24px;

  .btn {
    background: #313131;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    flex: 1;
    width: 100%;
    padding: 12px 0px;
    @media screen and (max-width: 576px) {
      font-size: 14px;
      line-height: 17px;
    }
  }
  .cancel {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
  }
  .confirm {
    background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
  }
  button:disabled,
  button[disabled] {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    background: #313131;
    color: rgba(255, 255, 255, 0.38);
    cursor: not-allowed;
  }
`

const GetLP = styled.div`
  margin-top: 25px;
  p {
    display: flex;
    justify-content: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #9072ff;
    align-items: center;
    @media screen and (max-width: 576px) {
      font-size: 14px;
      line-height: 17px;
    }
  }
`
const ContentContainer = styled.div`
  padding: 0px 27px 27px;

  .mes_error {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #f44336;
    margin-top: 8px;
  }
  @media screen and (max-width: 576px) {
    padding: 0px 24px 24px;
    .mes_error {
      font-size: 12px;
      line-height: 15px;
    }
  }
`

interface Props extends InjectedModalProps {
  balanceLP: any
  totalSupply: any
  reverse: any
  handleCallbackAfterSuccess?: () => void
  handleConfirm?: any
  amount?: any
  setAmount?: any
}

const ModalStake: React.FC<React.PropsWithChildren<Props>> = ({
  onDismiss,
  balanceLP,
  totalSupply,
  reverse,
  handleConfirm,
  amount,
  setAmount,
}) => {
  const chainIdSupport = [97, 56]
  const { chainId } = useActiveChainId()
  const { account } = useActiveWeb3React()
  const listTimesPercents = ['25%', '50%', '75%', 'MAX']
  const [messageError, setMessageError] = useState('')
  const [amountUSD, setAmountUSD] = useState<any>()

  const handlePercent = (item: string) => {
    switch (item) {
      case '25%':
        setAmount((Number(balanceLP) * 0.25).toString())
        break
      case '50%':
        setAmount((Number(balanceLP) * 0.5).toString())
        break
      case '75%':
        setAmount((Number(balanceLP) * 0.75).toString())
        break
      case 'MAX':
        setAmount(balanceLP)
        break
      default:
        break
    }
  }

  const handleButtonClick = () => {
    handleConfirm()
  }

  useEffect(() => {
    const amountUsd = (Number(amount) * reverse) / totalSupply
    setAmountUSD(amountUsd)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount])

  useEffect(() => {
    if (Number(balanceLP)) {
      if (amount !== '' && Number(amount) !== 0 && amount !== '.') {
        if (account && balanceLP && parseUnits(amount, 18).gt(parseUnits(balanceLP, 18))) {
          setMessageError(`Insuficient Your ${chainIdSupport.includes(chainId) ? 'XOX - BUSD' : 'XOX - USDC'} Balance`)
        } else {
          setMessageError('')
        }
      }
    } else {
      setMessageError(`No tokens to stake: Get ${chainIdSupport.includes(chainId) ? 'XOX - BUSD' : 'XOX - USDC'} LP`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, balanceLP])

  return (
    <>
      <StyledModalContainer>
        <StyledModalHeader>Stake LP Tokens</StyledModalHeader>
        <ContentContainer>
          <ContentStake>
            <div className="flex stake">
              <p>Stake</p>
              <Tooltip title={balanceLP} placement="top">
                <span aria-hidden="true" className="balance_container">
                  Balance:&nbsp;
                  <span className="balanceLP">{balanceLP}</span>
                </span>
              </Tooltip>
            </div>
            <div className="flex token_lp">
              <NumericalInputStyled
                value={amount}
                amount={amount}
                onUserInput={(value) => setAmount(value)}
                placeholder="0"
              />
              <p>{chainIdSupport.includes(chainId) ? 'XOX - BUSD' : 'XOX - USDC'} LP</p>
            </div>
            <div className="token_usd">
              <Tooltip title={`${amountUSD}USD`} placement="top-start">
                <p style={{ display: 'flex' }}>
                  <span className="balanceLP">~{amountUSD}</span>
                  <span>USD</span>
                </p>
              </Tooltip>
            </div>
            <div className="percent">
              {listTimesPercents.map((item) => {
                return (
                  <button
                    className="item_percent_btn"
                    type="button"
                    key={item}
                    onClick={() => handlePercent(item)}
                    disabled={!Number(balanceLP)}
                  >
                    {item}
                  </button>
                )
              })}
            </div>
          </ContentStake>

          {messageError && <p className="mes_error">{messageError}</p>}
          <ButtonGroup>
            <button type="button" className="btn cancel" onClick={onDismiss}>
              Cancel
            </button>
            <button
              type="button"
              className="btn confirm"
              disabled={
                amount === '' || Number(amount) === 0 || amount === '.' || Number(balanceLP) === 0 || !!messageError
              }
              onClick={handleButtonClick}
            >
              Confirm
            </button>
          </ButtonGroup>
          <GetLP className="get_lp">
            <a
              href={`/add/${XOX_ADDRESS[chainId]}/${USD_ADDRESS[chainId]}?step=1&chainId=${chainId}`}
              target="_blank"
              rel="noreferrer"
            >
              <p>
                <span>Get {chainIdSupport.includes(chainId) ? 'XOX - BUSD' : 'XOX - USDC'} LP</span>
                <span style={{ marginLeft: 8 }}>
                  <img src="/images/stake_external_link.svg" alt="external-icon" />
                </span>
              </p>
            </a>
          </GetLP>
        </ContentContainer>
      </StyledModalContainer>
    </>
  )
}

export default ModalStake
