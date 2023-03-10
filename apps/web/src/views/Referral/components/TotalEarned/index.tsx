import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'

interface IProps {
  volumnTotalEarn?: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 65px;

  .title {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
    margin-top: 32px;
  }

  .amount {
    margin: 16px 0;
    position: relative;
    display: flex;
    .dollar {
      font-size: 20px;
      color: #c20da3;
      margin-right: 2px;
      margin-top: 2px;
    }
    .value {
      font-weight: 700;
      font-size: 36px;
      line-height: 44px;
      text-align: center;
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  .guide {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    width: 496px;
  }

  .img_container {
    position: relative;
  }

  .ref_xox {
    position: relative;
    z-index: 1;
  }

  .ref_chart_bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 596.82px;
    height: 485px;
    z-index: 0;
  }

  .ref_round {
    position: absolute;
    background: radial-gradient(50% 50% at 50% 50%, rgba(5, 0, 255, 0.5) 0%, rgba(66, 0, 255, 0) 100%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 596.82px;
    height: 485px;
    z-index: 0;
  }

  @media screen and (max-width: 900px) {
    .title {
      font-size: 14px;
      line-height: 17px;
    }
    .amount {
      .dollar {
        font-size: 16px;
        line-height: 19px;
      }
      .value {
        font-size: 24px;
        line-height: 29px;
      }
    }
    .guide {
      font-size: 14px;
      line-height: 17px;
      width: 100%;
    }
  }
`
const TotalEarned = ({ volumnTotalEarn }: IProps): JSX.Element => {
  const { width } = useWindowSize()
  return (
    <Wrapper>
      <div className="img_container">
        {/* ref_xox_mb */}
        {width <= 900 ? (
          <img src="/images/ref_xox_mb.svg" alt="ref_xox" className="ref_xox" />
        ) : (
          <>
            <img src="/images/ref_xox.svg" alt="ref_xox" className="ref_xox" />
            <img src="/images/ref_chart_bg.svg" alt="ref_chart_bg" className="ref_chart_bg" />
          </>
        )}
      </div>
      <p className="title">Total Earned By Referrals</p>

      <p className="amount">
        <span className="dollar">$</span>
        <p className="value">{Number(volumnTotalEarn)}</p>
      </p>

      <p className="guide">
        This number represents the total value in $ earned so far by all referral users since day one till today. Start
        Earning Now.
      </p>
    </Wrapper>
  )
}

export default TotalEarned
