import styled from 'styled-components'

const BallLeft = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: -1;
`
const BallRight = styled.img`
  position: absolute;
  right: 0;
  z-index: -1;
`
const BallMoon = styled.img`
  position: absolute;
  right: 0;
  top: 358px;
  z-index: -1;
`

const Backgroud = (): JSX.Element => {
  return (
    <>
      <BallLeft src="/images/ball_left.svg" alt="ball_left" />
      <BallRight src="/images/ball_right.svg" alt="ball_left" />
      <BallMoon src="/images/monmon.svg" alt="ball_left" />
    </>
  )
}

export default Backgroud
