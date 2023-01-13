import styled from 'styled-components'

const BallLeft = styled.img`
  position: absolute;
  left: 0;
  top: 35%;
  z-index: -1;
`
const BallRight = styled.img`
  position: absolute;
  right: 0;
  top: 200px;
  z-index: -1;

  @media screen and (max-width: 900px) {
    top: 0;
  }
`
const BallBackECO = styled.img`
  position: absolute;
  left: 0;
  top: 200px;
  z-index: -1;
  background: radial-gradient(50% 50% at 50% 50%, rgba(154, 95, 255, 0.3) 0%, rgba(154, 95, 255, 0) 100%);
`

const XOXECO = styled.img`
  position: absolute;
  left: 0;
  top: 500px;
  mix-blend-mode: overlay;
`

const BackGroundLeft = styled.img`
  position: absolute;
  left: 0;
  bottom: 500px;
  z-index: -1;
  background: radial-gradient(50% 50% at 50% 50%, rgba(143, 0, 255, 0.3) 0%, rgba(204, 0, 255, 0) 100%);
`

const BackGroundRight = styled.img`
  position: absolute;
  right: 0;
  bottom: 500px;
  z-index: -1;
  background: radial-gradient(50% 50% at 50% 50%, rgba(5, 0, 255, 0.2) 0%, rgba(66, 0, 255, 0) 100%);
`

const BackgroudWatch = (): JSX.Element => {
  return (
    <>
      <XOXECO src="/images/xox_economy.svg" alt="xox_economy" />
      <BallBackECO src="/images/background_economy.svg" alt="ball_left" />
      <BallLeft src="/images/bg_meet_xox.svg" alt="ball_left" />
      <BallRight src="/images/xox_economy_right.svg" alt="ball_left" />
      <BackGroundLeft src="/images/xox_eco_left_2.svg" alt="ball_left" />
      <BackGroundRight src="/images/ref_bg_eco.svg" alt="ball_left" />
    </>
  )
}

export default BackgroudWatch
