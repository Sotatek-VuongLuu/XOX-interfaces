/* eslint-disable react/button-has-type */
import styled from 'styled-components'
import Spline from '@splinetool/react-spline'
import { SplineEvent } from '@splinetool/runtime'

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
  color: #ffffff;
  font-weight: 800;
  font-size: 64px;
  width: 754px;
  span {
    color:#A35AFF
`

const Feature = styled.div`
  font-weight: 700;
  font-size: 44px;
  color: #9072ff;
  margin: 32px 0;
`

const Description = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #ffffff;
  margin-bottom: 32px;
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
        <Description>XOX is a decentralized platform built to foster users trading and earning crypto.</Description>
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
        onLoad={(e) => e.setZoom(0.8)}
      />
    </Wrapper>
  )
}

export default WelcomeXOX
