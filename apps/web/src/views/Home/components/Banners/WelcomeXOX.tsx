/* eslint-disable react/button-has-type */
import styled from 'styled-components'
import Spline from '@splinetool/react-spline'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LeftContent = styled.div`
  .btn_group {
    display: flex;
    gap: 24px;
    .get_xox {
      padding: 1px;
      border-radius: 8px;
      background-image: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);

      .boxed-child {
        width: 100%;
        height: 100%;
        background-color: black;
        padding: 16px 40px;
        border-radius: inherit;
        span {
          background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          font-weight: 700;
          font-size: 18px;
          width: 100%;
          height: 100%;
          background-color: #191a28;
          border-radius: inherit;
        }
      }
    }
  }
`

const Title = styled.p`
  font-weight: 700;
  font-size: 48px;
  line-height: 72px;
  color: rgba(255, 255, 255, 0.87);
`

const Feature = styled.div`
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  color: #9072ff;
  margin: 24px 0;
`

const Description = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 24px;
`

const Button = styled.button`
  background: linear-gradient(100.7deg, #6034ff 0%, #a35aff 100%);
  border-radius: 8px;
  border: none;
  padding: 16px 40px;
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
`

const WelcomeXOX = (): JSX.Element => {
  return (
    <Wrapper>
      <LeftContent>
        <Title>XOX The Multichain Defi Apps & Solutions for Web3 Provider</Title>
        <Feature>Revolutionary - Scalable - Multichain</Feature>
        <Description>Swap, earn, and build on the leading decentralized Web3 crypto ecosystem.</Description>
        <div className="btn_group">
          <Button>Read Documentation</Button>
          <div className="get_xox">
            <div className="boxed-child">
              <span>Get XOX</span>
            </div>
          </div>
        </div>
      </LeftContent>

      <Spline
        scene="https://prod.spline.design/o7-ZQWkGS2tIZeP0/scene.splinecode"
        height={600}
        width={600}
        onLoad={(e) => e.setZoom(0.7)}
      />
    </Wrapper>
  )
}

export default WelcomeXOX
