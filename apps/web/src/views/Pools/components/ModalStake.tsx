/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Button, InjectedModalProps, ModalContainer, ModalHeader } from '@pancakeswap/uikit'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { USD_ADDRESS, XOX_ADDRESS } from 'config/constants/exchange'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { parseEther } from '@ethersproject/units'
import { Tooltip } from '@mui/material'
import BigNumber from 'bignumber.js'
import { formatNumber } from '@pancakeswap/utils/formatBalance'
import { NumericalInputStyled, ShowBalance } from './ModalUnStake'

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
    /* text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100px; */
    /* + span {
      margin-left: 5px;
    } */
    /* @media screen and (max-width: 576px) {
      max-width: 90px;
    } */
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
    line-height: 13px;
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
  a:hover {
    text-decoration: underline;
    text-decoration-color: #9072ff;
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
const CustomButton = styled(Button)`
  height: 37px;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 43px;
  }
`

interface Props extends InjectedModalProps {
  balanceLP: any
  totalSupply: any
  reverse: any
  handleCallbackAfterSuccess?: () => void
  handleConfirm?: any
  amount?: string
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
  const [amountActive, setAmountActive] = useState<any>(null)

  const handleButtonClick = () => {
    handleConfirm()
  }

  useEffect(() => {
    if (amount && reverse && totalSupply) {
      const amountUsd = (Number(amount) * reverse) / totalSupply
      setAmountUSD(amountUsd)
    } else {
      setAmountUSD(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount])

  useEffect(() => {
    if (Number(balanceLP)) {
      if (amount !== '' && Number(amount) !== 0 && amount !== '.') {
        if (
          account &&
          balanceLP &&
          parseEther(Number(amount).toFixed(18)).gt(parseEther(Number(balanceLP).toFixed(18)))
        ) {
          setMessageError(`Insuficient Your ${chainIdSupport.includes(chainId) ? 'XOX - BUSD' : 'XOX - USDC'} Balance`)
        } else {
          setMessageError('')
        }
      } else {
        setMessageError('')
      }
    } else {
      setMessageError(`No tokens to stake: Get ${chainIdSupport.includes(chainId) ? 'XOX - BUSD' : 'XOX - USDC'} LP`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, balanceLP])

  const handlePercent = (item: string) => {
    switch (item) {
      case '25%':
        setAmount(new BigNumber(balanceLP).multipliedBy(0.25).toFixed(18).toString())
        setAmountActive({ ...amountActive, '25%': new BigNumber(balanceLP).multipliedBy(0.25).toFixed(18).toString() })
        break
      case '50%':
        setAmount(new BigNumber(balanceLP).multipliedBy(0.5).toFixed(18).toString())
        setAmountActive({ ...amountActive, '50%': new BigNumber(balanceLP).multipliedBy(0.5).toFixed(18).toString() })
        break
      case '75%':
        setAmount(new BigNumber(balanceLP).multipliedBy(0.75).toFixed(18).toString())
        setAmountActive({ ...amountActive, '75%': new BigNumber(balanceLP).multipliedBy(0.75).toFixed(18).toString() })
        break
      case 'MAX':
        setAmount(balanceLP)
        setAmountActive({ ...amountActive, MAX: balanceLP })
        break
      default:
        break
    }
  }

  return (
    <>
      <StyledModalContainer>
        <StyledModalHeader>Stake LP Tokens</StyledModalHeader>
        <ContentContainer>
          <ContentStake>
            <div className="flex stake">
              <p>Stake</p>
              <ShowBalance balance={balanceLP} />
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
              <Tooltip title={`${amountUSD ? formatNumber(amountUSD) : ''}USD`} placement="top-start">
                <p style={{ display: 'flex' }}>
                  <span className="balanceLP">~{amountUSD ? formatNumber(amountUSD) : ''}</span>&nbsp;
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
                    onClick={() => {
                      handlePercent(item)
                    }}
                    style={{
                      background: amountActive?.[`${item}`] === amount ? '#9072ff' : 'none',
                      color: amountActive?.[`${item}`] === amount ? '#fff' : '#9072ff',
                    }}
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
            <CustomButton
              type="button"
              className="btn confirm"
              disabled={
                amount === '' || Number(amount) === 0 || amount === '.' || Number(balanceLP) === 0 || !!messageError
              }
              onClick={handleButtonClick}
            >
              Confirm
            </CustomButton>
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
