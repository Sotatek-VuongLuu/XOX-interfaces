/* eslint-disable react/button-has-type */
import styled from 'styled-components'
import Spline from '@splinetool/react-spline'
import { Box, Grid } from '@mui/material'
import useWindowSize from 'hooks/useWindowSize'
import { useMemo } from 'react'

const Wrapper = styled.div`
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
  }
`

const LeftContent = styled.div`
  .btn_group {
    display: flex;
    gap: 24px;
    .get_xox {
      padding: 1px;
      border-radius: 8px;
      background-image: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);

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
      .get_xox {
        .boxed-child {
          padding: 17px 22px;
          span {
            font-size: 16px;
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
  font-size: 36px;
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
  font-size: 18px;
  color: #ffffff;

  @media screen and (max-width: 900px) {
    font-size: 16px;
  }
`

const GridLeft = styled(Grid)`
  @media screen and (max-width: 900px) {
    margin-bottom: 66px;
  }
`

const WelcomeXOX = (): JSX.Element => {
  const { width } = useWindowSize()

  const controlWidth = useMemo(() => {
    let size = 600
    if (width < 1380) {
      size = 600
    }

    if (width < 632) {
      size = 380
    }

    if (width <= 576) {
      size = 342
    }

    if (width <= 374) {
      size = 300
    }

    if (width < 334) {
      size = 210
    }
    return size
  }, [width])

  // const el = document.getElementById('my-spline')
  // el.addEventListener('wheel', function stopWheel(e) {
  //   e.preventDefault()
  // })

  return (
    <Wrapper>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={2} className="grid_welcome_container">
          <GridLeft xs={12} md={7}>
            <LeftContent>
              <Title className="title">XOX The Multichain Defi Apps & Solutions for Web3 Provider</Title>
              <Feature className="feature">Revolutionary - Scalable - Multichain</Feature>
              <Description className="description">
                Swap, earn, and build on the leading decentralized Web3 crypto ecosystem.
              </Description>
              <div className="btn_group">
                <Button className="btn_read_doc">Read Documentation</Button>
                <div className="get_xox">
                  <div className="boxed-child">
                    <span>Get XOX</span>
                  </div>
                </div>
              </div>
            </LeftContent>
          </GridLeft>

          <Grid xs={12} md={5} style={{ justifyContent: 'center', display: 'flex' }}>
            <Spline
              scene="https://prod.spline.design/o7-ZQWkGS2tIZeP0/scene.splinecode"
              height={342}
              width={342}
              onLoad={(e) => e.setZoom(0.4)}
              id="my-spline"
              onWheel={(e) => console.log(e.target.id)}
            />
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  )
}

export default WelcomeXOX
