import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;

  .paragraph {
    position: absolute;
    right: 31px;
    width: 513px;
    .title {
      font-weight: 700;
      font-size: 36px;
      color: rgba(255, 255, 255, 0.87);
      margin-bottom: 24px;
    }

    .description {
      font-weight: 400;
      font-size: 18px;
      color: rgba(255, 255, 255, 0.6);
    }
  }
`

const FeatureEconomy = () => {
  return (
    <Wrapper>
      <div className="paragraph">
        <p className="title">Be part of the open economy of the future.</p>
        <p className="description">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
          velit mollit.
        </p>
      </div>
      <img src="/images/token-card.svg" alt="token-card" />
    </Wrapper>
  )
}

export default FeatureEconomy
