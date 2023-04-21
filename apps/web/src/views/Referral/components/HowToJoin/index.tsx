import useWindowSize from 'hooks/useWindowSize'
import { useMemo, useState } from 'react'
import ReactPlayer from 'react-player'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 500px;

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    position: relative;
    margin-top: 32px;

    &:before {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background: #d9d9d9;
      opacity: 0.3;
      position: absolute;
      top: 14px;
      left: 0;
    }

    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 30%;
    }

    span {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
      color: #ffffff;
    }

    button {
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      border-radius: 50%;
      width: 30px;
      height: 30px;
      border: none;
      outline: none;
      position: relative;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      text-align: center;
      color: #ffffff;
      margin-bottom: 8px;
      cursor: pointer;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    button svg {
      position: absolute;
      transform: translate(-50%, -50%);
      left: 50%;
      top: 50%;
    }
  }

  .container_video {
    margin: auto;
    padding: 7px;
    border-radius: 20px;
    width: 660px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;

    .player-wrapper {
      position: relative;
      border-radius: 10px;
      width: fit-content;
      height: fit-content;
    }

    .react-player {
      border-radius: 10px;
      border: 4px solid #ffffff;
      overflow: hidden;
      .react-player__preview {
        .react-player__shadow {
          background: #ffffff !important;
          .react-player__play-icon {
            border-color: transparent transparent transparent #fb8618 !important;
          }
        }
      }
    }

    @media screen and (max-width: 900px) {
      width: 654px;
    }
    @media screen and (max-width: 742px) {
      width: 534px;
    }
    @media screen and (max-width: 634px) {
      width: 414px;
    }
    @media screen and (max-width: 510px) {
      width: 364px;
    }
    @media screen and (max-width: 457px) {
      width: 314px;
    }
  }
`

const HowToJoin = (): JSX.Element => {
  const { width } = useWindowSize()
  const [currentVideo, setCurrentVideo] = useState(1)

  const controlSize = useMemo(() => {
    let w = 646
    let h = 373

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

  const RoundIcon = useMemo(() => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
        <circle cx="19" cy="19" r="18.5" stroke="url(#paint0_linear_14013_73060)" />
        <defs>
          <linearGradient
            id="paint0_linear_14013_73060"
            x1="-665"
            y1="19"
            x2="-664.165"
            y2="-13.5525"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#B809B5" />
            <stop offset="0.510417" stop-color="#ED1C51" />
            <stop offset="1" stop-color="#FFB000" />
          </linearGradient>
        </defs>
      </svg>
    )
  }, [])

  return (
    <Wrapper>
      <div className="container_video">
        {currentVideo === 1 && (
          <div className="player-wrapper">
            <ReactPlayer
              className="react-player"
              url="videos/referrals/video1.mp4"
              playing
              controls
              light
              height={controlSize.h}
              width={controlSize.w}
            />
          </div>
        )}
        {currentVideo === 2 && (
          <div className="player-wrapper">
            <ReactPlayer
              className="react-player"
              url="videos/referrals/video2.mp4"
              playing
              controls
              light
              height={controlSize.h}
              width={controlSize.w}
            />
          </div>
        )}
        {currentVideo === 3 && (
          <div className="player-wrapper">
            <ReactPlayer
              className="react-player"
              url="videos/referrals/video3.mp4"
              playing
              controls
              light
              height={controlSize.h}
              width={controlSize.w}
            />
          </div>
        )}
        <div className="buttons">
          <div>
            <button onClick={() => setCurrentVideo(1)}>1{currentVideo === 1 && RoundIcon}</button>
            <span>Connect Wallet</span>
          </div>
          <div>
            <button onClick={() => setCurrentVideo(2)}>2{currentVideo === 2 && RoundIcon}</button>
            <span>Share Ref Code</span>
          </div>
          <div>
            <button onClick={() => setCurrentVideo(3)}>3{currentVideo === 3 && RoundIcon}</button>
            <span>Use Ref Code and Claim</span>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default HowToJoin
