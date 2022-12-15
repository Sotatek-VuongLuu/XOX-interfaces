import styled from 'styled-components'

const Wrapper = styled.div`
  .total {
    position: absolute;
    z-index: 3;

    .img_container_chart_bg {
      display: flex;
      justify-content: center;
      position: absolute;
      background: radial-gradient(50% 50% at 50% 50%, rgba(5, 0, 255, 0.5) 0%, rgba(66, 0, 255, 0) 100%);
      top: 20px;
      left: 20%;
      z-index: 1;
    }

    .main_info_container {
      .info {
        margin-top: 90px;
        .title {
          font-weight: 700;
          font-size: 16px;
          line-height: 19px;
          text-align: center;
          color: rgba(255, 255, 255, 0.87);
          margin-top: 32px;
        }

        .amount {
          font-weight: 700;
          font-size: 36px;
          line-height: 44px;
          text-align: center;
          color: rgba(255, 255, 255, 0.87);
          margin: 22px 0px;
        }

        .guide {
          font-weight: 400;
          font-size: 16px;
          line-height: 19px;
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
        }

        .img_container {
          display: flex;
          justify-content: center;
        }
      }
    }
  }
`
const TotalEarned = (): JSX.Element => {
  return (
    <Wrapper>
      <div className="total">
        <div className="img_container_chart_bg">
          <img src="/images/ref_chart_bg.svg" alt="ref_chart_bg" className="ref_chart_bg" />
        </div>
        <div className="main_info_container">
          <div className="info">
            <div className="img_container">
              <img src="/images/ref_xox.svg" alt="ref_xox" className="ref_xox" />
            </div>
            <p className="title">Total Earned By Referrals</p>
            <p className="amount">10,000,000$</p>

            <p className="guide" style={{ width: 400 }}>
              This number represents the total value in $ earned so far by all referral users since day one till today.
              Start Earning Now.
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default TotalEarned
