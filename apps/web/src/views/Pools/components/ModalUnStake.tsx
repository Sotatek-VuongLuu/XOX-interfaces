import { InjectedModalProps, ModalContainer, ModalHeader, NumericalInput } from '@pancakeswap/uikit'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { parseUnits } from '@ethersproject/units'
import { useContractFarmingLP } from 'hooks/useContract'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

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

const Content = styled.div`
  padding: 20px;
  background: #303030;
  border-radius: 10px;
  width: 100%;
  margin-top: 24px;
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
  }
`

const ContentContainer = styled.div`
  padding: 0px 27px 27px;

  @media screen and (max-width: 576px) {
    padding: 0px 24px 24px;
  }
`
const NumericalInputStyled = styled(NumericalInput)`
  background: transparent;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: rgba(255, 255, 255, 0.38);
  width: auto;
  ${(props) => props.disabled === true && ' pointer-events: none'};
  & {
    -webkit-text-fill-color: rgba(255, 255, 255, 0.38);
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

interface Props extends InjectedModalProps {
  balanceLP: any
  totalSupply: any
  reverse: any
}

const ModalUnStake: React.FC<React.PropsWithChildren<Props>> = ({ onDismiss, balanceLP, totalSupply, reverse }) => {
  const chainIdSupport = [97, 56]
  const { chainId } = useActiveChainId()
  const listTimesPercents = ['25%', '50%', '75%', 'MAX']
  const [amount, setAmount] = useState('')
  const { account } = useActiveWeb3React()
  const [messageButton, setMessageButton] = useState('Confirm')
  const contractFarmingLP = useContractFarmingLP()
  const [amountUSD, setAmountUSD] = useState<any>()

  const handleConfirmWithdraw = async () => {
    try {
      const gasFee = await contractFarmingLP.estimateGas.withdraw(parseUnits(amount, 18))
      const txWithdraw = await contractFarmingLP.withdraw(parseUnits(amount, 18), {
        gasLimit: gasFee,
      })
      const tx = await txWithdraw.wait(1)
      if (tx?.transactionHash) {
        // eslint-disable-next-line no-console
        console.log(`tx?.transactionHash`, tx?.transactionHash)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`error>>>`, error)
    }
  }

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
    handleConfirmWithdraw()
  }

  useEffect(() => {
    if (amount === '' || Number(amount) === 0 || amount === '.') {
      setMessageButton('Enter an amount')
    } else if (
      account &&
      balanceLP &&
      // parseEther(amountInput).gt(parseEther(balanceInput?.toExact())) &&
      parseUnits(amount, 18).gt(parseUnits(balanceLP, 18))
    ) {
      setMessageButton(`Insuficient Your ${chainIdSupport.includes(chainId) ? 'XOX - BUSD' : 'XOX - USDC'} Balance`)
    } else setMessageButton('Confirm')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, balanceLP])

  useEffect(() => {
    const amountUsd = (Number(amount) * reverse) / totalSupply
    setAmountUSD(amountUsd)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount])

  return (
    <StyledModalContainer>
      <StyledModalHeader>UnStake LP Tokens</StyledModalHeader>
      <ContentContainer>
        <Content>
          <div className="flex stake">
            <p>Stake</p>
            <p>Balance: {balanceLP}</p>
          </div>
          <div className="flex token_lp">
            <NumericalInputStyled value={amount} onUserInput={(value) => setAmount(value)} placeholder="0" />
            <p>{chainIdSupport.includes(chainId) ? 'XOX - BUSD' : 'XOX - USDC'} LP</p>
          </div>
          <div className="token_usd">
            <p>~{amountUSD} USD</p>
          </div>
          <div className="percent">
            {listTimesPercents.map((item) => {
              return (
                <button className="item_percent_btn" type="button" key={item} onClick={() => handlePercent(item)}>
                  {item}
                </button>
              )
            })}
          </div>
        </Content>
        <ButtonGroup>
          <button type="button" className="btn cancel" onClick={onDismiss}>
            Cancel
          </button>
          <button type="button" className="btn confirm" disabled={!amount} onClick={handleButtonClick}>
            {messageButton}
          </button>
        </ButtonGroup>
      </ContentContainer>
    </StyledModalContainer>
  )
}

export default ModalUnStake
