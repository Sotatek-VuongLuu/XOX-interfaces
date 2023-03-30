import { Box } from '@pancakeswap/uikit'
import ReactPlayer from 'react-player'
import styled from 'styled-components'

export const StyledS = styled('div')`
  margin: 48px auto 100px auto;
  padding: 0 24px;

  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 576px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 852px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    max-width: 968px;
    padding: 0;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    max-width: 1080px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    max-width: 1200px;
  }
  @media screen and (min-width: 1400px) {
    max-width: 1400px;
  }
`

const StyledSectionText = styled('div')`
  text-align: center;
  width: 100%;

  > h3 {
    color: rgba(255, 255, 255, 0.87);
    font-weight: 700;
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 8px;
  }

  > p {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    padding: 0px;
    color: rgba(255, 255, 255, 0.6);
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    > h3 {
      line-height: 24px;
      margin-bottom: 18px;
    }
    > p {
      font-size: 18px;
      line-height: 32px;
      padding: 0px 36px;
    }
  }
`

const StyledHeader = styled('div')`
  position: relative;
  margin-bottom: 97px;

  .bg-header {
    position: relative;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 116px;
    .bg-header {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      z-index: -1;
      width: fit-content;
    }
  }
`

const StyledPreviewVideo = styled('div')`
  .player-wrapper {
    position: relative;
    padding-top: 56.25%;
    margin-bottom: 65px;
    border-radius: 20px;
    overflow: hidden;
  }

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: fit-content;
    margin-bottom: initial;

    > img:nth-child(1) {
      width: initial;
    }
  }

  @media screen and (min-width: 968px) {
    .player-wrapper {
      width: 600px;
      height: 337px;
    }
  }

  @media screen and (min-width: 1200px) {
    .player-wrapper {
      width: 600px;
      height: 337px;
    }
  }

  @media screen and (min-width: 1400px) {
    .player-wrapper {
      width: 640px;
      height: 360px;
    }
  }
`

const StyledMembers = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`

const StyledCard = styled('div')`
  position: relative;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 16px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-width: 1px;
    border-radius: inherit;
    border-color: white;
    border-style: solid;
    mask: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);
  }
`

const StyledCardMember = styled(StyledCard)`
  text-align: center;
  padding: 24px 28px;

  > img {
    margin-bottom: 24px;
  }

  > h4 {
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
  }

  > p {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.6);
  }
`

const StyledSocial = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }
`

const StyledCardSocial = styled(StyledCard)`
  text-align: center;
  padding: 22px;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  > div:nth-child(1) {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(95deg, rgba(184, 9, 181, 1) 0%, rgba(237, 28, 81, 1) 50%, rgba(255, 176, 0, 1) 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }

    > img {
      width: 33px;
      height: 33px;
    }
  }

  > div:nth-child(2) {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  h4 {
    margin-bottom: 8px;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    text-aligh: center;
    width: 100%;
  }

  p {
    position: relative;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: rgba(255, 255, 255, 0.6);
    text-aligh: center;
    width: 100%;

    > span {
      margin-right: 4px;
    }

    > img {
      width: 10px;
      transform: translateY(-5px);
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    gap: 24px;
    padding: 24px 32px;
    height: initial;

    > div:nth-child(1) {
      width: 90px;
      height: 90px;

      > img {
        width: 50px;
        height: 50px;
      }
    }

    h4 {
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 16px;
      text-align: left;
    }

    .social_name {
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: #ffffff;
    }

    p {
      font-size: 16px;
      line-height: 24px;
      text-align: left;

      > span {
        margin-left: 6px;
        margin-right: 6px;
      }

      > img {
        width: initial;
      }
    }
  }
`

const StyledTitle = styled('h1')`
  font-size: 20px;
  line-height: 32px;
  font-weight: 700;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  margin-bottom: 8px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 36px;
    line-height: 44px;
    margin-bottom: 16px;
  }
`

const StyledSubtitle = styled('p')`
  font-weight: 400;
  text-align: center;
  color: #fb8618;
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 40px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 48px;
    font-size: 16px;
    line-height: 19px;
  }
`

const StyledLearnMore = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: linear-gradient(95deg, rgba(184, 9, 181, 1) 0%, rgba(237, 28, 81, 1) 50%, rgba(255, 176, 0, 1) 100%);
  padding: 24px;
  border-radius: 20px;

  > h1 {
    max-width: 490px;
    font-weight: 700;
    font-size: 16px;
    line-height: 32px;
    letter-spacing: 0.075em;
    text-transform: uppercase;
    color: #ffffff;
    margin-bottom: 32px;
  }

  > a {
    padding: 12px 30px;
    background: #ffffff;
    border-radius: 12px;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    text-transform: uppercase;
    color: #000000;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 40px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    > h1 {
      font-size: 20px;
      line-height: 32px;
      margin-bottom: initial;
    }

    > a {
      padding: 16px 40px;
      font-size: 18px;
      line-height: 22px;
    }
  }
`

const StyledBG = styled('div')`
  position: relative;
  z-index: -1;

  > div {
    position: absolute;
    top: 0;
    left: 0;
  }

  > div:nth-child(1) {
    width: 414px;
    height: 414px;
    left: -60px;
    top: 210px;
    background: radial-gradient(50% 50% at 50% 50%, rgba(237, 28, 81, 0.2) 0%, rgba(237, 28, 81, 0) 100%);
  }

  > div:nth-child(2) {
    width: 841px;
    height: 841px;
    top: 1510px;
    left: -430px;
    background: radial-gradient(50% 50% at 50% 50%, rgba(237, 28, 81, 0.2) 0%, rgba(237, 28, 81, 0) 100%);
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    > div:nth-child(1) {
      width: 607px;
      height: 607px;
      left: 860px;
      top: initial;
    }
    > div:nth-child(2) {
      width: 841px;
      height: 841px;
      top: 1510px;
      left: -430px;
    }
  }
`

interface IMember {
  avatar: string
  name: string
  position: string
}

interface ISocial {
  icon: string
  name: string
  link: string
  heft: string
}

function CardMember({ member, ...props }: { member: IMember }) {
  return (
    <StyledCardMember {...props}>
      <img src={member.avatar} alt="" draggable="false" loading="lazy" />
      <h4>{member.name}</h4>
      <p>{member.position}</p>
    </StyledCardMember>
  )
}

function CardSocial({ social, ...props }: { social: ISocial }) {
  return (
    <a href={social.heft} target="_blank" rel="noreferrer" style={{ display: 'inline-block' }}>
      <StyledCardSocial {...props}>
        <div>
          <img src={social.icon} alt="" draggable="false" loading="lazy" />
        </div>
        <div>
          <h4 className="social_name">{social.name}</h4>
          <p>
            <span>•</span>
            {social.link} <img src="/images/company/ArrowUpRight.svg" alt="" draggable="false" loading="lazy" />
          </p>
        </div>
      </StyledCardSocial>
    </a>
  )
}

export function BTNLearnMore() {
  return (
    <StyledLearnMore>
      <h1>Learn More about the XOX labs Multi-chain Ecosystem.</h1>

      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#" target="_blank" rel="noreferrer">
        Learn More
      </a>
    </StyledLearnMore>
  )
}

export default function CompanyPage() {
  const MEMBERS: Array<IMember> = [
    { avatar: '/images/company/Livan G.M.png', name: 'Livan G.M', position: 'Chief Operating Officer' },
    { avatar: '/images/company/Zayn.png', name: 'Zayn', position: 'Chief Marketing Officer' },
    { avatar: '/images/company/Marcos.png', name: 'Marcos', position: 'Chief Legal Officer' },
    { avatar: '/images/company/Edward.png', name: 'Edward', position: 'Lead Designer' },
    { avatar: '/images/company/Ralph Edwards.png', name: 'Ralph Edwards', position: 'SC Developer' },
    { avatar: '/images/company/Floyd Miles.png', name: 'Floyd Miles', position: 'Front-end Developer' },
    { avatar: '/images/company/Albert Flores.png', name: 'Albert Flores', position: 'Front-end Developer' },
    { avatar: '/images/company/Eleanor Pena.png', name: 'Eleanor Pena', position: 'Back-end Developer' },
    { avatar: '/images/company/Ronald Richards.png', name: 'Ronald Richards', position: 'Tester' },
    { avatar: '/images/company/Courtney Henry.png', name: 'Courtney Henry', position: 'Product Manager' },
  ]

  const SOCIALS: Array<ISocial> = [
    { icon: '/images/company/1.svg', name: 'XOX Dex V1', link: 'Trade Now', heft: '#' },
    { icon: '/images/company/2.svg', name: 'Referral Program ', link: 'Earn Now', heft: '#' },
    { icon: '/images/company/3.svg', name: 'Bridge', link: 'Bridge Now', heft: '#' },
    { icon: '/images/company/4.svg', name: 'Stable Coin', link: 'Stake Now', heft: '#' },
    { icon: '/images/company/5.svg', name: 'Liquidity Mining', link: 'Earn Now', heft: '#' },
    { icon: '/images/company/6.svg', name: 'Yield farming', link: 'Earn Now', heft: '#' },
    { icon: '/images/company/7.svg', name: 'Assets Manager', link: 'Explore Now ', heft: '#' },
    { icon: '/images/company/1.svg', name: 'XOX Dex V2', link: 'Best Rates on DeFi', heft: '#' },
    { icon: '/images/company/8.svg', name: 'XOX Mobile App', link: 'Your Defi Key ', heft: '#' },
    { icon: '/images/company/9.svg', name: 'XOX Launchpad', link: 'Invest Now', heft: '#' },
    { icon: '/images/company/10.svg', name: 'Coin Listing Site', link: 'Don’t Miss Out', heft: '#' },
    { icon: '/images/company/11.svg', name: 'Lottery Game ', link: 'Risk Small - Earn Big ', heft: '#' },
  ]

  return (
    <StyledS>
      <StyledBG>
        <div />
        <div />
      </StyledBG>

      <StyledHeader>
        <StyledPreviewVideo>
          <div className="player-wrapper">
            <ReactPlayer
              className="react-player"
              url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
              playing
              controls
              light
              width="100%"
              height="100%"
            />
          </div>
        </StyledPreviewVideo>

        <img src="/images/company/bg-header.png" alt="" draggable="false" loading="lazy" className="bg-header" />
      </StyledHeader>

      <StyledSectionText style={{ marginBottom: 40 }}>
        <h3>Build to Inspire</h3>
        <p>
          XOX Protocol is The Next Generation Multi-chain DeFi Dapps & Web3 Solutions Provider. An Ecosystem Built to
          Provide Sustainability, Decentralization, Scalability & Transparency to the Space.
        </p>
      </StyledSectionText>

      <Box marginBottom={[64, null, null, 100]}>
        <img src="/images/company/bg-team.png" alt="" draggable="false" loading="lazy" style={{ width: '100%' }} />
      </Box>

      <StyledSectionText style={{ marginBottom: 40 }}>
        <h3>XOX Labs Core Team</h3>
        <p>
          A highly qualified and professional team built to deliver top class DeFi products and support Web 3.0 mass
          adoption. Our mission and vision is to create a self sustainable decentralized ecosystem with multiple revenue
          sources in every leading Blockchain.
        </p>
      </StyledSectionText>

      <StyledMembers marginBottom={[64, null, null, 100]}>
        {MEMBERS.map((member, i) => (
          <CardMember member={member} key={String(i + member.name)} />
        ))}
      </StyledMembers>

      <StyledTitle>XOX Labs Ecosystem Products</StyledTitle>
      <StyledSubtitle style={{ marginBottom: 48 }}>A true one Multi-chain stop for all your Defi Needs.</StyledSubtitle>

      <StyledSocial marginBottom={[64, null, null, 100]}>
        {SOCIALS.map((social, i) => (
          <CardSocial social={social} key={String(i + social.name)} />
        ))}
      </StyledSocial>

      <BTNLearnMore />
    </StyledS>
  )
}
