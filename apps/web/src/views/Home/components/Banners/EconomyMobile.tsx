import styled from 'styled-components'

const Wrapper = styled.div`
  .title_container {
    .title {
      font-weight: 700;
      font-size: 20px;
      line-height: 32px;
      color: rgba(255, 255, 255, 0.87);
    }

    .description {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.87);
      margin-bottom: 40px;
      margin-top: 16px;
    }
  }
  .main {
    display: flex;
    justify-content: center;
    gap: 19px;
    .couple {
      display: flex;
      flex-direction: column;
      gap: 19px;
    }
    .mt {
      margin-top: 80px;
    }
  }
`

const EconomyMobile = () => {
  return (
    <Wrapper>
      <div className="title_container">
        <p className="title">Built and Available on every leading blockchain.</p>
        <p className="description">
          Creating A Truly Decentralized Multichain Ecosystem with Unlimited possibilities. Supporting Defi and Web3
          global adoption for a better future.
        </p>
      </div>
      <div className="chain_container">
        <div className="main">
          <div className="couple mt">
            <img src="/images/eth_mobile.svg" alt="eth_mobile" />
            <img src="/images/poly_mobile.svg" alt="poly_mobile" />
          </div>

          <div className="couple">
            <img src="/images/bsc_mobile.svg" alt="poly_mobile" />
            <img src="/images/sol_mobile.svg" alt="poly_mobile" />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default EconomyMobile