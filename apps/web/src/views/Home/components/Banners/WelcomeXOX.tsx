import styled from 'styled-components'
import Spline from '@splinetool/react-spline'
import { SplineEvent } from '@splinetool/runtime'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -140px;
`

const LeftContent = styled.div``

const Title = styled.p`
  color: #ffffff;
  font-weight: 800;
  font-size: 64px;
  span {
    color:#A35AFF
`

const Feature = styled.div`
  font-weight: 700;
  font-size: 44px;
  color: #ffffff;
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
  padding: 16px 40px;
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
`

const WelcomeXOX = (): JSX.Element => {
  return (
    <Wrapper>
      <LeftContent>
        <Title>
          Welcome to <span>XOX</span>
        </Title>
        <Feature>Swap - Liquidity - Stake</Feature>
        <Description>XOX is a decentralized platform built to foster users trading and earning crypto.</Description>
        <Button>Read Documentation</Button>
      </LeftContent>

      <Spline
        scene="https://prod.spline.design/o7-ZQWkGS2tIZeP0/scene.splinecode"
        height={880}
        width={850}
        onLoad={(e) => e.setZoom(0.5)}
      />
    </Wrapper>
  )
}

export default WelcomeXOX
