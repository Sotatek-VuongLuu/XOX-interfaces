import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'

const BallLeft = styled.img`
  position: absolute;
  left: 0;
  top: 22%;
  z-index: -1;
`
const BallRight = styled.img`
  position: absolute;
  right: 0;
  top: 16%;
  z-index: -1;
`
const BallMoon = styled.img`
  position: absolute;
  left: 0;
  top: 40%;
  z-index: -2;
`

const BGMobile = styled.img`
  position: absolute;
  left: 0;
  top: 9%;
  z-index: -2;
  background: radial-gradient(50% 50% at 50% 50%, rgba(5, 0, 255, 0.3) 0%, rgba(66, 0, 255, 0) 100%);
`

const XOXMobile = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: -2;
  mix-blend-mode: overlay;
  background: linear-gradient(180.35deg, #cb60ff 0.85%, #5b3c7e 101.93%);
`

const Backgroud = (): JSX.Element => {
  const { width } = useWindowSize()
  return (
    <>
      {width > 900 ? (
        <>
          <BallLeft src="/images/ball_left.svg" alt="ball_left" />
          <BallRight src="/images/ball_right.svg" alt="ball_left" />
          <BallMoon src="/images/xox_2.svg" alt="ball_left" />
        </>
      ) : (
        <>
          <BGMobile src="/images/economy_bg.svg" alt="ball_left" />
          <XOXMobile src="/images/economy_xox.svg" alt="ball_left" />
        </>
      )}
    </>
  )
}

export default Backgroud
