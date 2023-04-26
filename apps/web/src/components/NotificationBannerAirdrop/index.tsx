import { useAppDispatch } from 'state'
import { hideBannerAirdrop } from 'state/user/actions'
import styled from 'styled-components'
import CountDown from './components/CountDown'
import XClose from './components/XClose'

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000000;
  z-index: 100;

  .line {
    height: 4px;
    width: 100%;
    background: linear-gradient(89.21deg, #9bf3cb 0.16%, #3ec0a6 35.42%, #f44234 65.49%, #9f3a83 99.71%);
  }

  .outer {
    padding: 46px 24px 19px 24px;

    > .svg {
      position: absolute;
      top: 13px;
      right: 24px;
      cursor: pointer;
    }

    ${({ theme }) => theme.mediaQueries.lg} {
      padding-top: 34px;
      padding-bottom: 43px;
      > .svg {
        top: 15px;
        right: 15px;
      }
    }
  }
`

const InterOuter = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  > div:nth-child(2) {
    text-align: center;
    margin-bottom: 30px;
    > h5,
    h6 {
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      text-align: center;
      color: #ffffff;
    }
    > h6 {
      font-weight: 400 !important;
    }
    > p:nth-child(3) {
      margin-top: 17px;
      > span:nth-child(1) {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: rgba(255, 255, 255, 0.6);
        text-align: center;
      }
      > span:nth-child(2) {
        font-weight: 700;
        font-size: 10px;
        line-height: 12px;
        text-align: center;
        color: #ffffff;
        padding: 4px 10px;
        background: #fb8618;
        border-radius: 30px;
      }
    }
    > a {
      display: block;
      margin: auto;
      max-width: 100%;
      width: 327px;
      height: 43px;
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      border-radius: 10px;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      padding: 12px 0px;
      margin-top: 20px;
    }
  }

  > div:nth-child(3) {
    > p {
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.62);
      text-align: center;
      margin-bottom: 14px;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: 1fr 1fr 1fr;
    > div:nth-child(2) {
      margin-bottom: 0px;
      > h5,
      h6 {
        font-weight: 700;
        font-size: 17px;
        line-height: 21px;
      }
      > p {
        margin-top: 10px;
      }

      a {
        width: 414px;
        height: 43px;
        padding: 12px 142px;
        margin-top: 13px;
      }
    }

    > div:nth-child(3) {
      > p {
        font-size: 20px;
        line-height: 24px;
      }
    }
  }
`

function NotificationBannerAirdrop() {
  const dispatch = useAppDispatch()

  const hideBanner = () => {
    dispatch(hideBannerAirdrop())
  }
  return (
    <>
      <Container>
        <div className="line" />
        <div className="outer">
          <InterOuter>
            <div />
            <div>
              <h5>$20K in XOX Tokens Airdrop + 20K XOXS Giveaway is Live!</h5>
              <h6>Total Prize $40,000</h6>
              <p>
                <span>XOX Token will be launching on ETH-BSC-ARB-POLY-SOL-OPT.&nbsp;</span>
                <span>Soon</span>
              </p>
              <a href="/#">
                <span>Participate Now!</span>
              </a>
            </div>
            <div>
              <p>Airdrop ending in:</p>
              <CountDown startTime={1682508561000} />
            </div>
          </InterOuter>
          <span className="svg" onClick={hideBanner} aria-hidden="true">
            <XClose />
          </span>
        </div>
      </Container>
    </>
  )
}

export default NotificationBannerAirdrop
