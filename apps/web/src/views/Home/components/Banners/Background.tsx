import styled from 'styled-components'

const BallLeft = styled.img`
  position: absolute;
  left: 0;
  top: 395px;
  z-index: -1;
`
const BallRight = styled.img`
  position: absolute;
  right: 0;
  top: 154px;
  z-index: -1;
`
const BallMoon = styled.img`
  position: absolute;
  left: 0;
  top: 637px;
  z-index: -2;
`

const Backgroud = (): JSX.Element => {
  return (
    <>
      <BallLeft src="/images/ball_left.svg" alt="ball_left" />
      <BallRight src="/images/ball_right.svg" alt="ball_left" />
      <BallMoon src="/images/xox_2.svg" alt="ball_left" />
    </>
  )
}

export default Backgroud
