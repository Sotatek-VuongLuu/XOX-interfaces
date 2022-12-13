import useWindowSize from 'hooks/useWindowSize'
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
  top: -18%;
  z-index: -1;
`

const BackgroudWatch = (): JSX.Element => {
  const { width } = useWindowSize()
  return (
    <>
      <BallLeft src="/images/bg_meet_xox.svg" alt="ball_left" />
      <BallRight src="/images/bg_l.svg" alt="ball_left" />
    </>
  )
}

export default BackgroudWatch
