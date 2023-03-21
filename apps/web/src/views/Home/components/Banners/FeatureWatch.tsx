import { Box, Grid } from '@mui/material'
import { Application } from '@splinetool/runtime'
import useWindowSize from 'hooks/useWindowSize'
import { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const LeftContent = styled.div`
  // display: flex;
  // justify-content: center;
  // width: 100%;
  // position: relative;
  // height: 343px;
  // @media screen and (min-width: 900px) {
  //   align-items: center;
  //   height: 100%;
  // }

  // #canvas3d_xoxs_logo_pc {
  //   position: absolute;
  //   transform: scale(1.3);

  //   @media screen and (max-width: 900px) {
  //     height: 100% !important;
  //     width: 100% !important;
  //     transform: scale(1);
  //     left: 50%;
  //     transform: translate(-53%, 0);
  //   }
  // }

  // @media screen and (max-width: 900px) {
  //   overflow-x: hidden;
  // }
`

const RightContent = styled.div`
  margin-left: 100px;

  @media (max-width: 560px) {
    margin-left: 0px;
  }
  .list {
    .main_content {
      display: flex;
      margin-bottom: 16px;
      align-items: center;
      .img-container {
        min-width: 23px;
      }
    }
  }

  .title_list_item {
    font-weight: 400;
    font-size: 18px;
    margin-left: 16px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 32px;
    @media screen and (max-width: 900px) {
      margin-left: 0px;
      font-size: 16px;
      line-height: 19px;
    }
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
  line-height: 32px;
  color: rgba(255, 255, 255, 0.6);

  @media screen and (max-width: 900px) {
    font-size: 16px;
    line-height: 24px;
  }
`

const Wrapper = styled(Box)`
  margin-bottom: 100px;

  @media screen and (max-width: 900px) {
    margin-bottom: 40px;
  }
`

const Main = styled(Grid)`
  @media screen and (max-width: 900px) {
    flex-direction: column-reverse !important;
    justify-content: center;
    align-items: center;
  }
`

const ImageWrapper = styled.video`
  width: 117%;
  height: 74vh;
  display: grid;
  place-content: center;
  transform: scale(2) translateY(-30px);

  ${({ theme }) => theme.mediaQueries.md} {
    img {
    }
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    img {
      transform: scale(5) translateY(-30px);
    }
  }
`
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
const Watch = styled.div`
  position: relative;

  .x3 {
    position: absolute;
    right: 0;
    top: 200px;
    z-index: -1;
    animation: ${floatingAnim('4px', '12px')} 3s ease-in-out infinite;
    animation-delay: 0s;
  }
  .x2 {
    position: absolute;
    top: 90px;
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
    right: 10%;
    top: -20px;
    z-index: -3;
    animation: ${floatingAnim('6px', '10px')} 3s ease-in-out infinite;
    animation-delay: 0.66s;
  }
`

const FeatureWatch = () => {
  const { width } = useWindowSize()

  // useEffect(() => {
  //   const canvas = document.getElementById('canvas3d_xoxs_logo_pc')
  //   if (canvas) {
  //     const app = new Application(canvas as any)
  //     app.load('https://prod.spline.design/eHWlbskKUlvFMGuG/scene.splinecode')
  //   }
  // }, [])

  return (
    <Wrapper style={{ overflow: 'hidden' }}>
      <Main container spacing={2}>
        <Grid item xs={12} md={5}>
          <LeftContent data-aos="fade-right">
            <Watch>
                {width > 900 ? (
                  <>
                    <img src="/images/home/meet-xoxs/x3.svg" alt="x3" className="x3" />
                    <img src="/images/home/meet-xoxs/x2.svg" alt="x2" className="x2" />
                    <img src="/images/home/meet-xoxs/x1.svg" alt="x1" className="x1" />
                  </>
                ) : (
                  <>
                    <img src="/images/home/meet-xoxs/mobile_x2.svg" alt="x3" className="x3" />
                    <img src="/images/home/meet-xoxs/mobile_x3.svg" alt="x2" className="x2" />
                    <img src="/images/meet-xoxs/mobile_x1.svg" alt="x1" className="x1" />
                  </>
                )}
              </Watch>
          </LeftContent>
        </Grid>
        <Grid item xs={12} md={7}>
          <RightContent data-aos="fade-left">
            <Title>Meet XOXS. Our Hybrid Multichain Stable Coin.</Title>
            <Paragraph style={{ margin: '24px 0' }}>
              Designed to be the staking substitute to our governance token XOX, preventing Supply Inflation & Selling
              Pressure XOXS is the result of months studding how staking works, chart behavior to high APYs followed by
              high selling pressure from stakers and Passive Income strategies generated by implementing Stable Coins
              Like USDT, USDC .... Some Facts About XOXS:
            </Paragraph>

            <div className="list">
              {listTag.map(({ title }) => {
                return (
                  <div className="main_content" key={title}>
                    <div className="img-container">
                      <img src="/images/icon-stone.svg" alt="icon-stone" className="icon_stone" />
                    </div>
                    <span className="title_list_item">{title}</span>
                  </div>
                )
              })}
            </div>
          </RightContent>
        </Grid>
      </Main>
    </Wrapper>
  )
}

const listTag = [
  {
    title: 'Only acquired by First Buying the governance token XOX then XOXS is received as a bonus. (no extra cost)',
  },
  {
    title: 'Auto staking functionalities with a flexible APY.',
  },
  {
    title: 'Earned through giveaways, finishing tasks, community activities etc',
  },
  {
    title:
      'Allow users to earn passive income through staking with no risk neither to the holders or the project long term sustainability.',
  },
]

export default FeatureWatch
