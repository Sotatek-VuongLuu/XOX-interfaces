/* eslint-disable react/no-unescaped-entities */
import styled, { keyframes } from 'styled-components'

const spin = () => keyframes`
from {
  transform:rotate(0deg);
}
to {
  transform:rotate(360deg);
}
`

const revertSpin = () => keyframes`
from {
  transform:rotate(360deg);
}
to {
  transform:rotate(0deg);
}
`

const Wrapper = styled.div`
  display: flex;
  gap: 64px;
  margin-top: 100px;
`

const LeftContent = styled.div`
  .list {
    display: grid;
    grid-template-columns: 358px 241px;
    column-gap: 40px;
    row-gap: 16px;

    .icon_stone {
      margin-right: 16px;
    }

    p {
      display: flex;
    }
  }
  .title_list_item {
    font-weight: 400;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.87);
  }
`

const RightContent = styled.div`
  width: fit-content;
  position: relative;
  .overlay_watch {
    position: absolute;
    top: 0;
    z-index: 3;
  }
`

const Title = styled.p`
  font-weight: 700;
  font-size: 36px;
  color: rgba(255, 255, 255, 0.87);
  font-weight: 400;
`

const Paragraph = styled.p`
  font-weight: 400;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.87);
  font-weight: 400;
  line-height: 32px;
`

const Watch = styled.div`
  width: 495px;
  height: 362px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #411ad8;
  border-radius: 24px;
  z-index: 4;

  .big_circle {
    position: relative;
    z-index: 5;
    width: 279.53px;
    height: 279.53px;
    border-radius: 50%;
    border: 6px solid rgba(255, 255, 255, 0.3);
    animation: ${spin} 5s infinite linear;

    .candy_4 {
      position: absolute;
      bottom: 0;
      right: 0;
    }
    .candy_3 {
      position: absolute;
      bottom: 10%;
      left: -8%;
    }

    .candy_2 {
      position: absolute;
      right: 15%;
      top: -10%;
    }
  }

  .small_circle {
    position: absolute;
    width: 202.34px;
    height: 202.34px;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.6);
    animation: ${revertSpin} 4s infinite linear;

    .candy_5 {
      position: absolute;
      left: 45%;
      bottom: -10%;
    }

    .candy_6 {
      position: absolute;
      right: -10%;
      top: 40%;
    }
  }

  .xox_planet {
    position: absolute;
  }
`

const FeaturePlant = () => {
  return (
    <Wrapper>
      <LeftContent>
        <Title>XOX Dapp - An All-IN-One Solution.</Title>
        <Paragraph style={{ margin: '24px 0' }}>
          Primarily design to provide simple solutions to its users and XOX Holders, the XOX Dapp already provides and
          will keep implementing more robuts functionalities which will eventually make it a truly One Stop Solution for
          Crypto Traders. What's ready:
        </Paragraph>

        <div className="list">
          {listTag.map(({ title }) => {
            return (
              <p>
                <span>
                  <img src="/images/icon-stone.svg" alt="icon-stone" className="icon_stone" />
                </span>
                <span className="title_list_item">{title}</span>
              </p>
            )
          })}
        </div>
      </LeftContent>

      <RightContent>
        <img src="/images/overlay_watch.svg" alt="overlay_watch" className="overlay_watch" />
        <Watch>
          <div className="big_circle">
            <img src="/images/candy_1.svg" alt="candy" className="candy_1" />
            <img src="/images/candy_2.svg" alt="candy" className="candy_2" />
            <img src="/images/candy_3.svg" alt="candy" className="candy_3" />
            <img src="/images/candy_4.svg" alt="candy" className="candy_4" />
          </div>

          <div className="small_circle">
            <img src="/images/candy_5.svg" alt="candy" className="candy_5" />
            <img src="/images/candy_6.svg" alt="candy" className="candy_6" />
          </div>

          <img src="/images/xox_planet.svg" alt="" className="xox_planet" />
        </Watch>
      </RightContent>
    </Wrapper>
  )
}

const listTag = [
  {
    title: 'Multi Chain Hybrid Swap',
  },
  {
    title: 'XOXS Staking',
  },
  {
    title: 'Gamified Stable Coin Referral Program',
  },
  {
    title: 'Assets/Portfolio Tracker',
  },
  {
    title: 'Liquidity Farming',
  },
  {
    title: 'Bridge',
  },
]

export default FeaturePlant
