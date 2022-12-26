import useWindowSize from 'hooks/useWindowSize'
import { useMemo } from 'react'
import ReactPlayer from 'react-player'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  .container_video {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    padding: 7px;
    border-radius: 20px;
    margin-top: 40px;
    width: 654px;
    height: 373px;
    .player-wrapper {
      position: relative;
      padding-top: 50%;
      border-radius: 10px;
      width: 100%;
      height: 100%;
    }

    .react-player {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 17px;
      overflow: hidden;
    }

    @media screen and (max-width: 742px) {
      width: 534px;
      height: 373px;
    }
    @media screen and (max-width: 634px) {
      width: 414px;
      height: 316px;
      margin-top: 70px;
    }
    @media screen and (max-width: 510px) {
      width: 364px;
      height: 315px;
      margin-top: 20%;
    }
    @media screen and (max-width: 457px) {
      width: 314px;
      height: 216px;
      margin-top: 38%;
    }
  }
`
const HowToJoin = (): JSX.Element => {
  const { width } = useWindowSize()
  const controlSize = useMemo(() => {
    let w = 640
    let h = 360

    if (width < 900) {
      w = 640
      h = 360
    }

    if (width < 742) {
      w = 520
      h = 360
    }
    if (width < 634) {
      w = 400
      h = 300
    }
    if (width < 510) {
      w = 350
      h = 300
    }
    if (width < 457) {
      w = 300
      h = 200
    }
    return { w, h }
  }, [width])

  return (
    <Wrapper>
      <div className="container_video">
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
            playing
            controls
            light
            height={controlSize.h}
            width={controlSize.w}
          />
        </div>
      </div>
    </Wrapper>
  )
}

export default HowToJoin
