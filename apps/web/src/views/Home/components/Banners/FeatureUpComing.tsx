/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Box, Grid } from '@mui/material'
import useWindowSize from 'hooks/useWindowSize'
import { useState } from 'react'
import styled from 'styled-components'

interface IPropsWI {
  isShowReadMore?: boolean
}

const Wrapper = styled.div`
  margin-bottom: 100px;
  .title {
    text-align: center;
    font-weight: 700;
    font-size: 36px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 16px;
  }

  .decoration {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 48px;
  }

  @media screen and (max-width: 900px) {
    .title {
      font-size: 20px;
      line-height: 32px;
    }

    .decoration {
      font-size: 14px;
      line-height: 24px;
    }

    margin-bottom: 64px;
  }
`

const WrapperItem = styled.div<IPropsWI>`
  height: 100%;
  padding: 24px 22px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  position: relative;

  .get_xox {
    padding: 1px;
    width: fit-content;
    margin-top: 26px;
    border-radius: 8px;
    background-image: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
    cursor: pointer;

    .boxed-child {
      width: 100%;
      height: 100%;
      background-color: #242424;
      padding: 10px 20px;
      border-radius: inherit;
      border-radius: 8px;
      span {
        background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        font-weight: 700;
        font-size: 14px;
        width: 100%;
        height: 100%;
        background-color: #191a28;
        border-radius: inherit;
        border-radius: 8px;
      }
    }

    @media screen and (min-width: 900px) {
      position: absolute;
      left: 22px;
      bottom: 24px;
    }
  }

  .container_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${({ isShowReadMore }) => isShowReadMore && 'margin-bottom: 16px'};
    .title_item {
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.87);
    }
  }
  .describe {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.87);

    @media screen and (min-width: 900px) {
      margin-bottom: 55px;
    }
  }
  .expand {
    color: #9072ff;
    font-size: 14px;
    font-weight: 600;
  }

  @media screen and (max-width: 900px) {
    .title_item {
      font-size: 18px;
      line-height: 22px;
    }
  }
`

const UpComingItem = ({ title, describe, link }) => {
  const [isShowReadMore, setIsShow] = useState(false)
  const [readMore, setIsShowReadMore] = useState(describe.length > 260)
  const { width } = useWindowSize()

  return (
    <WrapperItem isShowReadMore={isShowReadMore}>
      <div className="container_title">
        <div className="title_item">{title}</div>
        {width <= 900 ? (
          isShowReadMore ? (
            <img
              src="/images/up_coming.svg"
              alt="down_coming"
              className="up_coming"
              onClick={() => setIsShow(!isShowReadMore)}
            />
          ) : (
            <img src="/images/down_coming.svg" alt="down_coming" onClick={() => setIsShow(!isShowReadMore)} />
          )
        ) : null}
      </div>

      {width <= 900 ? (
        isShowReadMore ? (
          <>
            <p className="describe">{describe}</p>
            <a href={link} target="_blank" rel="noreferrer">
              <div className="get_xox">
                <div className="boxed-child">
                  <span>Discover More</span>
                </div>
              </div>
            </a>
          </>
        ) : null
      ) : (
        <>
          <p className="describe" style={{ marginTop: 16 }}>
            {readMore ? `${describe.slice(0, 260)}...` : describe}{' '}
            {describe.length > 260 ? (
              <span onClick={() => setIsShowReadMore(!readMore)} style={{ cursor: 'pointer' }}>
                {readMore ? <span className="expand">Read more</span> : <span className="expand">Read less</span>}
              </span>
            ) : null}
          </p>
          <div className="get_xox box_absolute">
            <a href={link} target="_blank" rel="noreferrer">
              <div className="boxed-child">
                <span>Discover More</span>
              </div>
            </a>
          </div>
        </>
      )}
    </WrapperItem>
  )
}

const UpComing = () => {
  return (
    <Wrapper>
      <div className="title" data-aos="fade-up">
        Upcoming Developments
      </div>
      <p className="decoration" data-aos="fade-up" data-aos-duration="2300">
        Every utility is current under development and they are gonna be gradually implemented once ready. Adding
        massive value to the Ecosystem overtime.
      </p>

      <Box sx={{ flexGrow: 1, display: 'flex' }} data-aos="fade-up">
        <Grid container spacing={2}>
          {listItem.map(({ title, describe, link }) => {
            return (
              <Grid item xs={12} md={3} key={title}>
                <UpComingItem describe={describe} title={title} link={link} />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Wrapper>
  )
}

const linkWhitepaper = '#'

const listItem = [
  {
    title: 'XOX Mobile App/Wallet',
    describe: `After the recent downfall of Centralized Exchanges, crypto investors have finally realized that "Not your Keys not your Crypto", and Decentralized wallets like Trust Wallet & Metamask now more important than ever. The XOX Decentralized Wallet bring innovative Multi-chain features for users to enjoy while being sure that their funds are safe.`,
    link: linkWhitepaper,
  },
  {
    title: 'XOX Multi-chain Launchpad',
    describe: `Investing in ICOs, Fair Launches and Pre-sales could be very profitable if you find the right projects. We have set the task to Develop The Best Web3 Multi-Chain Launchpad on the Space and after studying over 50 Launchpads we have a pretty good idea of what works and what does not.`,
    link: linkWhitepaper,
  },
  {
    title: 'XOX Coin Listing/Rating Site',
    describe:
      'Multiple Studies have shown that at least 80% of crypto holders check CoinMarketCap once a day. The problem is that there is no accurate ranking system dedicated to a specific community. So we will create our own one, fully dedicated and targeted towards the needs of the XOX Community. No more searching around multiple platforms.',
    link: linkWhitepaper,
  },
  {
    title: 'XOX Super Dex 2.0',
    describe:
      'Swap, Stake, Cross-chain Bridge, stake, borrow, lend, earn crypto through the most advance gamified referral system in the space, earn stable coins and passive income out of the stable coin holdings, add liquidity and earn lp tokens, yield farming, enjoy of a wide range of tools for crypto traders (charting, portfolio checker, buy limit-sell limit...) and get access to a wide range of other Defi services.',
    link: linkWhitepaper,
  },
]

export default UpComing
