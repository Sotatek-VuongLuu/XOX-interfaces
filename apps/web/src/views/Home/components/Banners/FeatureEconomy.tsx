import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 100px;

  .paragraph {
    position: absolute;
    right: 31px;
    width: 513px;
    .title {
      font-weight: 700;
      font-size: 36px;
      color: rgba(255, 255, 255, 0.87);
      margin-bottom: 24px;
      line-height: 48px;
    }

    .description {
      font-weight: 400;
      font-size: 18px;
      color: rgba(255, 255, 255, 0.6);
      line-height: 32px;
    }
  }
`

const FeatureEconomy = () => {
  return (
    <Wrapper>
      <div className="paragraph">
        <p className="title">Built and Available on every leading blockchain.</p>
        <p className="description">
          Creating A Truly Decentralized Multichain Ecosystem with Unlimited possibilities. Supporting Defi and Web3
          global adoption for a better future.
        </p>
      </div>
      <img src="/images/token-card.svg" alt="token-card" />
    </Wrapper>
  )
}

export default FeatureEconomy
