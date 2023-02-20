/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import styled from 'styled-components'
import { Box, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import useWindowSize from 'hooks/useWindowSize'
import { useEffect } from 'react'
import { Application } from '@splinetool/runtime'

const Wrapper = styled.div`
  width: 100%;

  @media screen and (max-width: 900px) {
    .title {
      font-size: 24px;
      line-height: 40px;
    }
    .feature {
      font-size: 18px;
      line-height: 22px;
    }
    .description {
      font-size: 14px;
      line-height: 24px;
    }

    .btn_read_doc {
      padding: 12px 18px;
      font-size: 16px;
    }

    width: 100%;
  }

  @media screen and (max-width: 530px) {
    margin-top: 50px;
  }

  #asset_3d {
    position: absolute;
  }
`

const LeftContent = styled.div`
  min-width: 600px;

  @media screen and (max-width: 530px) {
    min-width: unset;
  }

  z-index: 2;
  .btn_group {
    display: grid;
    gap: 19px;
    grid-template-columns: auto auto 1fr;
    .get_xox {
      padding: 2px;
      border-radius: 8px;
      background-image: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
      cursor: pointer;

      .boxed-child {
        width: 100%;
        height: 100%;
        background-color: black;
        padding: 16px 40px;
        border-radius: inherit;
        span {
          background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          font-weight: 700;
          font-size: 18px;
          width: 100%;
          height: 100%;
          background-color: #191a28;
          border-radius: inherit;
        }
      }
    }
    @media screen and (max-width: 900px) {
      min-width: unset;
      .get_xox {
        padding: 1px;
        .boxed-child {
          padding: 15px 20px;
          span {
            font-size: 15px;
          }
        }
      }
    }

    @media screen and (max-width: 530px) {
      .get_xox {
        .boxed-child {
          padding: 12px;
          span {
            font-size: 15px;
          }
        }
      }
    }
  }
`

const Title = styled.p`
  font-weight: 700;
  font-size: 48px;
  line-height: 72px;
  color: rgba(255, 255, 255, 0.87);
`

const Feature = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 44px;
  color: #9072ff;
  margin: 24px 0;
`

const Description = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 24px;
`

const Button = styled.button`
  background: linear-gradient(100.7deg, #6034ff 0%, #a35aff 100%);
  border-radius: 8px;
  border: none;
  padding: 16px 40px;
  font-weight: 700;
  height: 100%;
  font-size: 18px;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background: #5f35eb;
  }

  @media screen and (max-width: 900px) {
    font-size: 16px;
  }
`

const GridLeft = styled(Grid)`
  @media screen and (min-width: 901px) {
    align-items: center;
    display: flex;
  }
  @media screen and (max-width: 900px) {
    margin-bottom: 66px;
  }
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
  overflow-x: hidden;

  #canvas3d_mobile {
    width: 670px !important;
    height: 458px !important;
  }

  @media screen and (max-width: 786px) {
    position: relative;
    #canvas3d_mobile {
      transform: scale(1.1);
      position: absolute;
      left: 50%;
      top: 0%;
      transform: translate(-30%, -50%);
    }
  }

  @media screen and (max-width: 450px) {
    position: relative;
    #canvas3d_mobile {
      left: 45%;
      top: 15%;
      width: 528px !important;
      height: 390px !important;
    }
  }
`

const WelcomeXOX = (): JSX.Element => {
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()

  useEffect(() => {
    const canvasPC = document.getElementById('canvas3d_pc')
    const canvas = document.getElementById('canvas3d_mobile')
    if (canvasPC) {
      const app = new Application(canvasPC as any)
      app.load('https://prod.spline.design/USClwyyALgodYuZC/scene.splinecode')
    }
    if (canvas) {
      const app = new Application(canvas as any)
      app.load('https://prod.spline.design/USClwyyALgodYuZC/scene.splinecode')
    }
  }, [])

  return (
    <Wrapper>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={2} className="grid_welcome_container">
          <GridLeft item xs={12} md={6}>
            <LeftContent>
              <Title className="title">XOX: The Next Gen Multichain DeFi Dapps & Web3 Solutions Provider</Title>
              <Feature className="feature">Revolutionary - Scalable - Sustainable</Feature>
              <Description className="description">
                Swap, stake, store, bridge, refer, invest and earn with ease on the
                <br />
                leading Decentralized Blockchain Ecosystem.
              </Description>
              <div className="btn_group">
                <Button className="btn_read_doc" onClick={() => window.open('')}>
                  Read Documentation
                </Button>
                <a href="/swap" target="_blank">
                  <div className="get_xox">
                    <div className="boxed-child">
                      <span>Get XOX</span>
                    </div>
                  </div>
                </a>
              </div>
            </LeftContent>
          </GridLeft>
          <Grid item xs={12} md={5} sx={{ height: '300px', minHeight: '300px', overflow: 'visible' }}>
            {(isMobile || isTablet) && (
              <ImageWrapper>
                <canvas id="canvas3d_mobile" />
              </ImageWrapper>
            )}

            {isDesktop && <canvas id="canvas3d_pc" />}
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  )
}

export default WelcomeXOX
