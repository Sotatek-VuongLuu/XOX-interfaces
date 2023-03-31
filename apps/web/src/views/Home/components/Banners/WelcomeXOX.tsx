/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import styled from 'styled-components'
import { Box, Grid, Popover } from '@mui/material'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import React from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { USD_ADDRESS, XOX_ADDRESS } from 'config/constants/exchange'
import { CopyButton } from '@pancakeswap/uikit'

const Wrapper = styled.div`
  width: 100%;

  .video-container {
    position: relative;
    border-radius: 5px;
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(249, 124, 29, 0.5) 0%,
      rgba(246, 99, 42, 0.5) 0.01%,
      rgba(249, 124, 29, 0) 100%
    );
  }

  .video-container video {
    position: absolute;
    z-index: -1;
    top: 0;
    left: -90px;
    width: 50vw;
    height: 48vh;

    @media screen and (max-width: 900px) {
      width: 100%;
      height: auto;
      left: unset;
    }

    @media screen and (max-width: 576px) {
      left: unset;
      width: 100%;
      height: 280px;
      top: 0;
      position: absolute;

      transform: scale(1.5);
    }
  }

  .video-container .overlay {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 2;
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(249, 124, 29, 0.5) 0%,
      rgba(246, 99, 42, 0.5) 0.01%,
      rgba(249, 124, 29, 0) 100%
    );
    // opacity: 0.5;
  }

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

  @media screen and (max-width: 400px) {
    .btn_read_doc {
      padding: 12px 18px;
      font-size: 14px;
    }
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
      border-radius: 12px;
      cursor: pointer;

      .boxed-child {
        width: 100%;
        height: 100%;
        background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
        padding: 17px 23.5px;
        border-radius: inherit;
        span {
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          font-weight: 700;
          font-size: 18px;
          width: 100%;
          height: 100%;
          background-color: #ffffff;
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
          padding: 13px;
          span {
            font-size: 15px;
          }
        }
      }
    }

    @media screen and (max-width: 400px) {
      .get_xox {
        .boxed-child {
          padding: 12px;
          span {
            font-size: 14px;
          }
        }
      }
    }

    @media screen and (max-width: 375px) {
      .btn_read_doc {
        font-size: 13px;
      }
    }
  }

  .grid-button {
    display: grid;
    grid-template-columns: 0.5fr 0.25fr;
    grid-template-rows: repeat(3, 0.25fr);
    grid-column-gap: 26px;
    grid-row-gap: 0px;

    .get_xox {
      border-radius: 12px;
      cursor: pointer;

      .boxed-child {
        width: 100%;
        background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
        padding: 17px 0px;
        border-radius: inherit;
        text-align: center;

        span {
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          font-weight: 700;
          font-size: 18px;
          width: 100%;
          background-color: #ffffff;
          border-radius: inherit;
        }

        @media screen and (max-width: 400px) {
          padding: 13px 0px;

          span {
            font-size: 16px;
          }
        }
      }
    }

    .icon-box {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding: 10.5px 0px;
      margin-top: 22px;
    }

    .chart {
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      padding: 15.5px 0px;
      border-radius: 12px;
      position: relative;
      text-align: center;
      margin-top: 22px;
      cursor: pointer;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        padding: 1px;
        background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        -webkit-mask-composite: exclude;
        mask-composite: exclude;
      }

      p {
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;

        @media screen and (max-width: 400px) {
          font-size: 16px;
          line-height: 19px;
        }
      }

      @media screen and (max-width: 400px) {
        padding: 11.5px 0px;
      }
    }

    @media screen and (max-width: 576px) {
      grid-template-columns: 0.75fr 0.4fr;
      margin-bottom: 12px;
    }

    @media screen and (max-width: 400px) {
      grid-template-columns: 0.9fr 0.4fr;
      grid-column-gap: 12px;
    }

    .more-btn {
      display: flex;
      flex-direction: row;
      position: relative;

      .bg-btn {
        padding: 12px 0px;
        border-radius: 12px;
        position: relative;
        text-align: center;
        margin-top: 22px;
        display: flex;
        position: relative;
        width: 100%;
        justify-content: space-evenly;
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.87);
        font-size: 14px;
        line-height: 17px;
        font-weight: 700;
        cursor: pointer;
        align-items: center;

        @media screen and (max-width: 400px) {
          margin-top: 24px;
        }
      }

      button {
        background: transparent;
      }
    }

    .eth-box {
      width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 6px;
      position: relative;
      display: flex;
      padding: 9px 6px;
      margin-top: 24px;
      justify-content: space-around;
      align-items: center;

      span {
        color: rgba(255, 255, 255, 0.87);
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
      }

      input {
        background: transparent;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        border: 0;
        outline: none;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: rgba(255, 255, 255, 0.87);
        font-weight: 400;
        max-width: 150px;
      }

      @media screen and (max-width: 576px) {
        span {
          color: rgba(255, 255, 255, 0.87);
          font-weight: 400;
          font-size: 14px;
          line-height: 21px;
        }

        input {
          max-width: 70px;
          font-size: 14px;
          line-height: 17px;
        }
      }
    }
  }
`

const Title = styled.p`
  font-weight: 700;
  font-size: 40px;
  line-height: 72px;
  color: rgba(255, 255, 255, 0.87);
`

const Feature = styled.div`
  font-weight: 700;
  font-size: 28px;
  line-height: 44px;
  background: linear-gradient(
    89deg,
    rgba(155, 243, 203, 1) 0%,
    rgba(62, 192, 166, 1) 25%,
    rgba(244, 66, 52, 1) 50%,
    rgba(159, 58, 131, 1) 75%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
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
  background: #ffffff;
  border-radius: 12px;
  border: none;
  // padding: 16px 92.5px;
  font-weight: 700;
  // height: 100%;
  font-size: 18px;
  color: #000000;
  cursor: pointer;
  padding: 16px 0px;
  width: 100%;

  &:hover {
    background: #ffffff;
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

const CustomPopover = styled(Popover)`
  .MuiPopover-paper {
    background: #1d1c1c;
    border-radius: 10px;
    min-width: 250px;
    margin-top: 2px;

    .popover-coin {
      display: flex;
      background: #1d1c1c;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
      flex-direction: row;
      justify-content: space-between;

      .coin-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 8px 12px 8px 12px;
        gap: 8px;

        .coin-data {
          justify-content: center;
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          .title {
            font-size: 16px;
            line-height: 19px;
            text-align: center;
            color: rgba(255, 255, 255, 0.87);
          }

          .description {
            font-weight: 400;
            font-size: 12px;
            line-height: 15px;
            color: rgba(255, 255, 255, 0.87);
          }
        }
      }

      .coin-buttons {
        justify-content: center;
        display: flex;
        flex-direction: row;
        padding: 8px 12px 8px 12px;
        gap: 8px;
      }
    }
  }
`

const WelcomeXOX = (): JSX.Element => {
  const { t } = useTranslation()
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()
  const { chainId } = useActiveChainId()

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  // useEffect(() => {
  //   const canvasPC = document.getElementById('canvas3d_pc')
  //   const canvas = document.getElementById('canvas3d_mobile')
  //   if (canvasPC) {
  //     const app = new Application(canvasPC as any)
  //     app.load('https://prod.spline.design/USClwyyALgodYuZC/scene.splinecode').catch((error) => console.log(error))
  //   }
  //   if (canvas) {
  //     const app = new Application(canvas as any)
  //     app.load('https://prod.spline.design/USClwyyALgodYuZC/scene.splinecode').catch((error) => console.log(error))
  //   }
  // }, [])

  return (
    <Wrapper>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={2} className="grid_welcome_container">
          <GridLeft item xs={12} md={6}>
            <LeftContent>
              <Title className="title">
                XOX<span style={{ color: '#FB8618' }}>: </span>
                {t('The Next Gen Multichain DeFi Dapps & Web3 Solutions Provider')}
              </Title>
              <Feature className="feature">{t('Revolutionary - Scalable - Sustainable')}</Feature>
              <Description className="description">
                {t('Swap, stake, store, bridge, refer, invest and earn with ease on the')}
                <br />
                {t('leading Decentralized Blockchain Ecosystem.')}
              </Description>
              <div className="grid-button">
                <div>
                  <Button className="btn_read_doc" onClick={() => window.open('/whitepaper')}>
                    {t('Read Documentation')}
                  </Button>
                </div>
                <div>
                  <a
                    href={`/swap?chainId=${chainId}&outputCurrency=${XOX_ADDRESS[chainId]}&inputCurrency=${USD_ADDRESS[chainId]}`}
                    target="_blank"
                  >
                    <div className="get_xox">
                      <div className="boxed-child">
                        <span>{t('Get %symbol%', { symbol: 'XOX' })}</span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="icon-box">
                  <div className="single-icon">
                    <img src="/images/home/hero/twitter.svg"></img>
                  </div>
                  <div className="single-icon">
                    <img src="/images/home/hero/speaker.svg"></img>
                  </div>
                  <div className="single-icon">
                    <img src="/images/home/hero/telegram.svg"></img>
                  </div>
                  <div className="single-icon">
                    <img src="/images/home/hero/discord.svg"></img>
                  </div>
                  <div className="single-icon">
                    <img src="/images/home/hero/youtube.svg"></img>
                  </div>
                </div>

                <div>
                  <a href="/info" target="_blank">
                    <div className="chart">
                      <div className="bg-button">
                        <p>{t('Chart')}</p>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="">
                  <div className="eth-box">
                    <img src="/images/home/hero/eth.svg" alt="email" className="email-icon" />
                    {(isMobile || isTablet) && (
                      <>
                        <span>ETH:</span>
                        <input type="text" id="email" name="email" placeholder="" value="0xA...d7f" required />
                      </>
                    )}

                    {isDesktop && (
                      <>
                        <span style={{ display: 'flex', alignItems: 'center' }}>ETH:</span>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          placeholder=""
                          value={`${XOX_ADDRESS[chainId == 5 ? chainId : 1].substring(0, 8)}...${XOX_ADDRESS[
                            chainId == 5 ? chainId : 1
                          ].substring(XOX_ADDRESS[chainId == 5 ? chainId : 1].length - 4)}`}
                          required
                        />
                      </>
                    )}
                    <CopyButton
                      text={XOX_ADDRESS[chainId == 5 ? chainId : 1]}
                      tooltipMessage={t('Copied')}
                      button={<img src="/images/home/hero/copy.svg" alt="copy" style={{ marginTop: '3px' }} />}
                    />
                    <button
                      style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
                      onClick={() => {
                        window.ethereum.request({
                          method: 'wallet_watchAsset',
                          params: {
                            type: 'ERC20',
                            options: {
                              address: XOX_ADDRESS[chainId == 5 ? chainId : 1],
                              symbol: 'XOX',
                              decimals: 18,
                              image: `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/tokens/xox-icon.svg`,
                            },
                          },
                        })
                      }}
                    >
                      <img src="/images/home/hero/shield.svg" alt="shield" />
                    </button>
                    <button
                      style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
                      onClick={() => {
                        window.ethereum.request({
                          method: 'wallet_watchAsset',
                          params: {
                            type: 'ERC20',
                            options: {
                              address: XOX_ADDRESS[chainId == 5 ? chainId : 1],
                              symbol: 'XOX',
                              decimals: 18,
                              image: `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/tokens/xox-icon.svg`,
                            },
                          },
                        })
                      }}
                    >
                      <img src="/images/home/hero/wolf.svg" alt="wolf" />
                    </button>
                  </div>
                </div>
                {/* <div className="more-btn">
                  <div className="bg-btn" aria-describedby={id} variant='contained' onClick={handleClick}>
                    <img src="/images/home/hero/checklist.svg" alt="checklist" />
                    <p>More</p>
                    <img src="/images/home/hero/down.svg" alt="down" />
                  </div>
                </div> */}
                <div className="more-btn">
                  <Button aria-describedby={id} onClick={handleClick} className="bg-btn">
                    <img src="/images/home/hero/checklist.svg" alt="checklist" />
                    {t('More')}
                    <img src="/images/home/hero/down.svg" alt="down" />
                  </Button>
                </div>
                <CustomPopover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <div className="popover-coin">
                    <div className="coin-info">
                      <img src="/images/home/hero/bsc.svg" alt="bsc" />
                      <div className="coin-data">
                        <p className="title">Binance Smart Chain (BSC)</p>
                        <p className="description">{`${XOX_ADDRESS[chainId == 97 ? chainId : 56].substring(
                          0,
                          8,
                        )}...${XOX_ADDRESS[chainId == 97 ? chainId : 56].substring(
                          XOX_ADDRESS[chainId == 97 ? chainId : 56].length - 4,
                        )}`}</p>
                      </div>
                    </div>
                    <div className="coin-buttons">
                      <CopyButton
                        text={XOX_ADDRESS[chainId == 97 ? chainId : 56]}
                        tooltipMessage={t('Copied')}
                        button={<img src="/images/home/hero/copy.svg" alt="copy" style={{ marginTop: '7px' }} />}
                      />
                      <button
                        style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
                        onClick={() => {
                          window.ethereum.request({
                            method: 'wallet_watchAsset',
                            params: {
                              type: 'ERC20',
                              options: {
                                address: XOX_ADDRESS[chainId == 97 ? chainId : 56],
                                symbol: 'XOX',
                                decimals: 18,
                                image: `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/tokens/xox-icon.svg`,
                              },
                            },
                          })
                        }}
                      >
                        <img src="/images/home/hero/shield.svg" alt="shield" />
                      </button>
                      <button
                        style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
                        onClick={() => {
                          window.ethereum.request({
                            method: 'wallet_watchAsset',
                            params: {
                              type: 'ERC20',
                              options: {
                                address: XOX_ADDRESS[chainId == 97 ? chainId : 56],
                                symbol: 'XOX',
                                decimals: 18,
                                image: `${process.env.NEXT_PUBLIC_FULL_SITE_DOMAIN}/images/tokens/xox-icon.svg`,
                              },
                            },
                          })
                        }}
                      >
                        <img src="/images/home/hero/wolf.svg" alt="wolf" />
                      </button>
                    </div>
                  </div>
                </CustomPopover>
              </div>
            </LeftContent>
          </GridLeft>
          <Grid item xs={12} md={5} sx={{ height: '300px', minHeight: '300px', overflow: 'visible' }}>
            {/* {(isMobile || isTablet) && (
              <ImageWrapper>
                <canvas id="canvas3d_mobile" />
              </ImageWrapper>
            )} */}

            {/* {isDesktop && <canvas id="canvas3d_pc" />} */}

            <div className="video-container">
              <div className="overlay" />
              <video loop playsInline autoPlay controls={false} preload="auto" style={{ pointerEvents: 'none' }}>
                <source src="/videos/home/3d_xox_utilities.mp4" type="video/mp4" />
              </video>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  )
}

export default WelcomeXOX
