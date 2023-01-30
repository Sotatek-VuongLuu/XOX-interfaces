import { InjectedModalProps, ModalContainer, ModalHeader, NumericalInput } from '@pancakeswap/uikit'
import { useState } from 'react'
import styled from 'styled-components'

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

const GetLP = styled.div`
  margin-top: 25px;
  p {
    display: flex;
    justify-content: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #9072ff;
    @media screen and (max-width: 576px) {
      font-size: 14px;
      line-height: 17px;
    }
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

const ModalStake: React.FC<React.PropsWithChildren<InjectedModalProps>> = ({ onDismiss }) => {
  const listTimesPercents = ['25%', '50%', '75%', 'MAX']
  const [amount, setAmount] = useState('')

  return (
    <StyledModalContainer>
      <StyledModalHeader>Stake LP Tokens</StyledModalHeader>
      <ContentContainer>
        <Content>
          <div className="flex stake">
            <p>Stake</p>
            <p>Balance: 0.0345678913678</p>
          </div>
          <div className="flex token_lp">
            <NumericalInputStyled value={amount} onUserInput={(value) => setAmount(value)} placeholder="0" />
            <p>XOX-BNB LP</p>
          </div>
          <div className="token_usd">
            <p>~0.00 USD</p>
          </div>
          <div className="percent">
            {listTimesPercents.map((item) => {
              return (
                <button className="item_percent_btn" type="button">
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
          <button type="button" className="btn confirm" disabled={!amount}>
            Confirm
          </button>
        </ButtonGroup>
        <GetLP className="get_lp">
          <p>
            <span>Get XOX-BNB LP</span>
            <span style={{ marginLeft: 8 }}>
              <img src="/images/external-icon.svg" alt="external-icon" />
            </span>
          </p>
        </GetLP>
      </ContentContainer>
    </StyledModalContainer>
  )
}

export default ModalStake
