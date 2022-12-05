import styled from 'styled-components'

const BallLeft = styled.img`
  position: absolute;
  left: 0;
  top: 650px;
  z-index: -1;
`
const BallRight = styled.img`
  position: absolute;
  right: 0;
  z-index: -1;
`

const BackgroudWatch = (): JSX.Element => {
  return (
    <>
      <BallLeft src="/images/bg_r.svg" alt="ball_left" />
      <BallRight src="/images/bg_l.svg" alt="ball_left" />
    </>
  )
}

export default BackgroudWatch
