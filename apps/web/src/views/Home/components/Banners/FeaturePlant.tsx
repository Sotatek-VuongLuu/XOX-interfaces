/* eslint-disable react/no-unescaped-entities */
import { Box, Grid } from '@mui/material'
import useWindowSize from 'hooks/useWindowSize'
import styled, { keyframes } from 'styled-components'

const floatingAnim = (x: string, y: string) => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(${x}, ${y});
  }
  to {
    transform: translate(0, 0px);
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
    grid-template-columns: 370px 241px;
    column-gap: 40px;
    row-gap: 16px;

    .icon_stone {
      // margin-right: 16px;
    }

    p {
      display: flex;
      align-items: center;
    }

    @media screen and (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }
  .title_list_item {
    font-weight: 400;
    font-size: 18px;
    margin-left: 16px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 32px;
    @media screen and (max-width: 900px) {
      font-size: 16px;
      line-height: 19px;
    }
  }
`

const RightContent = styled.div`
  .video-container {
    position: relative;
    border-radius: 5px;
  }
  .video-container video {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 50vw;
    height: 50vh;
  }
  .video-container .overlay {
    // height: 100%;
    // width: 100%;
    // position: absolute;
    // top: 0px;
    // left: 0px;
    // z-index: 2;
    // background: #0A0A0A;
    // opacity: 0.5;
  }
`

const Title = styled.p`
  font-weight: 700;
  font-size: 36px;
  line-height: 48px;
  color: rgba(255, 255, 255, 0.87);

  @media screen and (max-width: 900px) {
    font-size: 20px;
    line-height: 32px;
  }
`

const Paragraph = styled.p`
  font-weight: 400;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
  line-height: 32px;

  @media screen and (max-width: 900px) {
    font-size: 16px;
    line-height: 24px;
  }
`

const Watch = styled.div`
  position: relative;

  .x3 {
    position: absolute;
    right: 0;
    z-index: -1;
    animation: ${floatingAnim('4px', '12px')} 3s ease-in-out infinite;
    animation-delay: 0s;
  }
  .x2 {
    position: absolute;
    top: 50px;
    left: 20%;
    z-index: -2;
    animation: ${floatingAnim('5px', '10px')} 3s ease-in-out infinite;
    animation-delay: 0.33s;

    @media screen and (max-width: 900px) {
      left: 0;
    }
  }
  .x1 {
    position: absolute;
    left: 30%;
    top: -30px;
    z-index: -3;
    animation: ${floatingAnim('6px', '10px')} 3s ease-in-out infinite;
    animation-delay: 0.66s;
  }
`

const FeaturePlant = () => {
  const { width } = useWindowSize()
  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
      <Grid container spacing={2} style={{ overflow: 'hidden' }}>
        <Grid item xs={12} md={6}>
          <LeftContent data-aos="fade-right">
            <Title>XOX Dapp - An All-IN-One Solution.</Title>
            <Paragraph style={{ margin: '24px 0' }}>
              Primarily design to provide simple solutions to its users and XOX Holders, the XOX Dapp already provides
              and will keep implementing more robuts functionalities which will eventually make it a truly One Stop
              Solution for Crypto Traders. What's ready:
            </Paragraph>

            <div className="list">
              {listTag.map(({ title }) => {
                return (
                  <p key={title}>
                    <span>
                      <img src="/images/icon-stone.svg" alt="icon-stone" className="icon_stone" />
                    </span>
                    <span className="title_list_item">{title}</span>
                  </p>
                )
              })}
            </div>
          </LeftContent>
        </Grid>
        {/* <Grid item xs={12} md={5} style={{ height: 300 }}>
          <RightContent data-aos="fade-left">
            <Watch>
              {width > 900 ? (
                <>
                  <img src="/images/x3.svg" alt="x3" className="x3" />
                  <img src="/images/x2.svg" alt="x2" className="x2" />
                  <img src="/images/x1.svg" alt="x1" className="x1" />
                </>
              ) : (
                <>
                  <img src="/images/xox_plant_mobile_2.svg" alt="x3" className="x3" />
                  <img src="/images/xox_plant_mobile_3.svg" alt="x2" className="x2" />
                  <img src="/images/xox_plant_mobile_1.svg" alt="x1" className="x1" />
                </>
              )}
            </Watch>
          </RightContent>
        </Grid> */}
        <Grid item xs={12} md={5}>
          <RightContent data-aos="fade-left">
            <div className="video-container">
              <div className="overlay"></div>
              <video autoPlay loop muted width="613" height="345">
                <source src="/videos/home/3d_xox_utilities.mp4" type="video/mp4"></source>
              </video>
            </div>
          </RightContent>
        </Grid>
      </Grid>
    </Box>
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
  {
    title: 'Lottery',
  },
]

export default FeaturePlant
