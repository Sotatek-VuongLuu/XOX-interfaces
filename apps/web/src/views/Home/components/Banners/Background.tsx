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

const Backgroud = (): JSX.Element => {
  const { width } = useWindowSize()
  return (
    <>
      <BallLeft src="/images/ball_left.svg" alt="ball_left" />
      <BallRight src="/images/ball_right.svg" alt="ball_left" />

      {width > 900 && <BallMoon src="/images/xox_2.svg" alt="ball_left" />}
    </>
  )
}

export default Backgroud
