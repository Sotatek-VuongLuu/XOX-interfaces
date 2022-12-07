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

  .main_content {
    display: flex;
    gap: 24px;
  }
`

const WrapperItem = styled.div`
  padding: 24px 22px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  width: 300px;

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
  }
`

const UpComingItem = ({ title, describe }) => {
  return (
    <WrapperItem>
      <p className="title_item">{title}</p>
      <p className="describe">{describe}</p>
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

      <div className="main_content">
        {listItem.map(({ title, describe }) => {
          return <UpComingItem describe={describe} title={title} />
        })}
      </div>
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
