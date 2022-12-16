import ReactPlayer from 'react-player'
import styled from 'styled-components'

const Wrapper = styled.div`
  .container_video {
    background-color: #ffffff;
    padding: 7px;
    border-radius: 20px;
    margin-top: 40px;
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
  }
`
const HowToJoin = (): JSX.Element => {
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
            height="100%"
            width="100%"
          />
        </div>
      </div>
    </Wrapper>
  )
}

export default HowToJoin
