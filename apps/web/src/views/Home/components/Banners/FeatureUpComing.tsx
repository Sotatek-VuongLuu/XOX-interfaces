/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Box, Grid } from '@mui/material'
import { useState } from 'react'
import styled from 'styled-components'
import TeamMenber from './TeamMenber'

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
  }
`

const WrapperItem = styled.div`
  height: 100%;
  padding: 24px 22px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 20px;

  .title_item {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 16px;
  }

  .describe {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.6);

    // height: 240px;
    // overflow: hidden;

    // &:hover {
    //   overflow: auto;
    // }

    // &::-webkit-scrollbar {
    //   width: 5px;
    // }

    // &::-webkit-scrollbar-track {
    //   border-radius: 10px;
    // }

    // &::-webkit-scrollbar-thumb {
    //   background: #d5c9ff;
    //   border-radius: 10px;
    // }

    // &::-webkit-scrollbar-thumb:hover {
    //   background: #bcaaff;
    // }
  }

  @media screen and (max-width: 900px) {
    .title_item {
      font-size: 18px;
      line-height: 22px;
    }
  }
`

const UpComingItem = ({ title, describe }) => {
  const [isShowReadMore, setIsShow] = useState(describe.length > 450)

  return (
    <WrapperItem>
      <p className="title_item">{title}</p>
      <p className="describe">
        {isShowReadMore ? `${describe.slice(0, 450)}...` : describe}{' '}
        {describe.length > 450 ? (
          <span onClick={() => setIsShow(!isShowReadMore)} style={{ cursor: 'pointer' }}>
            {isShowReadMore ? <span className="expand"> Read more</span> : <span className="expand">Read less</span>}
          </span>
        ) : null}
      </p>
    </WrapperItem>
  )
}

const UpComing = () => {
  return (
    <Wrapper>
      <div className="title">Upcoming Utilities</div>
      <p className="decoration">
        Every utility is current under development and they are gonna be gradually implemented once ready. Adding
        massive value to the Ecosystem overtime.
      </p>

      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Grid container spacing={2}>
          {listItem.map(({ title, describe }) => {
            return (
              <Grid item xs={12} md={3}>
                <UpComingItem describe={describe} title={title} />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Wrapper>
  )
}

const listItem = [
  {
    title: 'Decentralized Wallet',
    describe:
      'With the downfall of Centralized Exchanges, crypto investors finally realized that "Not your Keys not your Crypto", and Decentralized wallets like Trust Wallet & Metamask now more important than ever. The XOX Decentralized Wallet bring inovative features like.',
  },
  {
    title: 'Multichain Launchpad',
    describe:
      'Investing in ICOs, Fair Launches and Pre-sales could be very profitable if you find the right projects. We have set the task to Develop The Best Web3 Multi-Chain Launchpad on the Space and after studying over 50 Launchpads we have a pretty good idea of what works and what does not. The XOX Multi-Chain Launchpad will.',
  },
  {
    title: 'Coin Listing/Ranking Site',
    describe:
      'Multiple Studies have shown that at least 80% of crypto holders check CoinMarketCap once a day. The problem is that there is no accurate ranking system dedicated to a specific community. So we will create our own one, fully dedicated and targeted towards the needs of the XOX Community. No more searching around multiple platforms. Here is what we got in mind.',
  },
  {
    title: 'Advance Trading Station',
    describe:
      'The XOX Multi-Chain Trading Station will transform the way you trade tokens in a decentralized way, mainly targeted for traders that need more than a simple Swapping Platform, by just connecting your wallet to our Trading Station you will be able to take advantage of a set of features and tools that will take your trading skills and success to the Next Level.',
  },
]

export default UpComing
