import { useTranslation } from '@pancakeswap/localization'
import { Box } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { CardSocial, StyledS, StyledSubtitle } from 'views/Company'
import { StyledTitle } from 'views/Tokenomics/styled'
import BackedBy from 'views/Vesting/Components/BackedBy'

const StyledContainer = styled(StyledS)`
  .hight-light {
    color: rgba(255, 255, 255, 0.87) !important;
  }

  .describe {
    color: rgba(255, 255, 255, 0.6) !important;
  }
`
const StyledHeader = styled.div`
  > h1 {
    font-weight: 700;
    font-size: 64px;
    text-align: center;
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

const StyledSaleAndReliable = styled(Box)`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }
`

const StyledCardSafeReliable = styled.div`
  padding: 24px;
  position: relative;
  border-radius: 20px;
  > h3 {
    font-weight: 700;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.87);
    margin-top: 24px;
    margin-bottom: 16px;
  }

  > img {
    max-width: 100%;
    margin: auto;
    display: block;
  }

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

  > p {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.6);
  }
`

const ReStyledSubtitle = styled(StyledSubtitle)`
  color: rgba(255, 255, 255, 0.62);
`

interface ISocial {
  icon: string
  name: string
  link: string
  heft: string
}

interface ISafeReliable {
  icon: string
  name: string
  describe: string
}

const StyledLearMore = styled.div`
  width: 100%;

  > div {
    display: flex;
    align-items: center;

    > span {
      font-weight: 500;
      font-size: 18px;
      text-decoration-line: underline;
      color: rgba(255, 255, 255, 0.6);
      margin-right: 7px;
    }
  }
`

const StyledBLock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 80px 0px;

  > div:nth-child(1) {
    > h3 {
      font-weight: 700;
      font-size: 36px;
      line-height: 48px;
      color: rgba(255, 255, 255, 0.87);
      margin-bottom: 24px;
    }
    > p {
      font-weight: 400;
      font-size: 18px;
      line-height: 32px;
      color: rgba(255, 255, 255, 0.6);
    }
  }

  > div:nth-child(2) {
    display: flex;
    position: relative;
    width: 100%;

    > video {
      margin: 0 auto;
      width: 725px;
      max-width: 100%;
    }

    ${({ theme }) => theme.mediaQueries.xl} {
      min-width: 500px !important;
    }
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: row;
    justify-content: space-between;
  }
`

const StyledReferralProgram = styled(StyledBLock)`
  > div:nth-child(1) {
    > h3 {
      color: rgba(255, 255, 255, 0.6);
    }
    > p:nth-child(3) {
      margin-top: 40px !important;
    }

    > div {
      margin-top: 24px;
    }
  }
`

const CardSafeReliable = ({ safe }: { safe: ISafeReliable }) => {
  return (
    <StyledCardSafeReliable>
      <img src={safe.icon} alt="icon" />
      <h3>{safe.name}</h3>
      <p>{safe.describe}</p>
    </StyledCardSafeReliable>
  )
}

const BtnLearMore = ({ href }: { href?: string }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <StyledLearMore>
        <div>
          <span>Learn more</span>
          <img src="/images/dex-v2/ArrowUpRight.png" alt="ArrowUpRight" />
        </div>
      </StyledLearMore>
    </a>
  )
}

const StyledEcosystem = styled.div`
  > p {
    text-align: center;
  }

  > p:nth-child(1) {
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 80px;
    margin-bottom: 24px;
  }

  p:nth-child(2) {
    font-weight: 400;
    font-size: 18px;
    line-height: 32px;
    color: rgba(255, 255, 255, 0.6);
  }
`

const StyledTabEcosystem = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  > div {
    display: flex;
    align-items: center;
    background: #101010;
    border-radius: 30px;

    > div {
      padding: 15px 23px;
      font-weight: 500;
      font-size: 18px;
      color: rgba(255, 255, 255, 0.87);
    }
    > div:nth-child(2) {
      margin: 0px 12px;
    }
    > div:nth-child(3) {
      margin-right: 12px;
    }
  }
`

const StyledDexes = styled.div`
  width: 1100px;
  height: 520px;
  overflow-y: scroll;
  display: grid;
  margin: auto;
  margin-top: 32px;
  grid-template-columns: repeat(14, minmax(0, 1fr));
  grid-row-gap: 32px;

  > img {
    display: block;
    margin: auto;
  }
`

function DevV2() {
  const { t } = useTranslation()

  const handleRange = (start: number, end: number, step = 1) => {
    const range = []
    const typeofStart = typeof start
    const typeofEnd = typeof end

    if (step === 0) {
      throw TypeError('Step cannot be zero.')
    }

    if (typeofStart === 'undefined' || typeofEnd === 'undefined') {
      throw TypeError('Must pass start and end arguments.')
    } else if (typeofStart !== typeofEnd) {
      throw TypeError('Start and end arguments must be of same type.')
    }

    if (end < start) {
      // eslint-disable-next-line no-param-reassign
      step = -step
    }

    if (typeofStart === 'number') {
      while (step > 0 ? end >= start : end <= start) {
        range.push(start)
        // eslint-disable-next-line no-param-reassign
        start += step
      }
    } else {
      throw TypeError('Only string and number types are supported')
    }
    return range
  }

  const SOCIALS: Array<ISocial> = [
    { icon: '/images/company/1.svg', name: t('XOX Dex V1'), link: t('Trade Now'), heft: '/swap' },
    { icon: '/images/company/2.svg', name: t('Referral Program'), link: t('Earn Now'), heft: '/referral' },
    { icon: '/images/company/3.svg', name: t('Bridge'), link: t('Bridge Now'), heft: '/bridge-token' },
    { icon: '/images/company/4.svg', name: t('Stable Coin'), link: t('Stake Now'), heft: '/stable-coin' },
    { icon: '/images/company/5.svg', name: t('Liquidity Mining'), link: t('Earn Now'), heft: '/liquidity' },
    { icon: '/images/company/6.svg', name: t('Yield farming'), link: t('Earn Now'), heft: '/pools' },
    { icon: '/images/company/7.svg', name: t('Assets Manager'), link: t('Explore Now'), heft: '/info' },
    { icon: '/images/company/1.svg', name: t('XOX Dex V2'), link: t('Best Rates on DeFi'), heft: '#' },
    { icon: '/images/company/8.svg', name: t('XOX Mobile App'), link: t('Your Defi Key'), heft: '#' },
    { icon: '/images/company/9.svg', name: t('XOX Launchpad'), link: t('Invest Now'), heft: '/vesting' },
    { icon: '/images/company/10.svg', name: t('Coin Listing Site'), link: t('Don’t Miss Out'), heft: '#' },
    { icon: '/images/company/11.svg', name: t('Lottery Game'), link: t('Risk Small - Earn Big'), heft: '#' },
  ]

  const TABECOSYSTEM: Array<string> = ['DEXes', 'Aggregators', 'Blockchains', 'Bridges']

  const SAFERELIABLE: Array<any> = [
    {
      icon: '/images/dex-v2/non-custodial.png',
      name: 'Non-custodial',
      describe: 'XOX Dex V2 is a Permissionless and Non-custodial Decentralized Protocol.',
    },
    {
      icon: '/images/dex-v2/anonymus.png',
      name: 'Anonymous',
      describe: 'No KYC or Sign Up required. Just connect your wallets and start trading.',
    },
    {
      icon: '/images/dex-v2/transparent.png',
      name: 'Transparent',
      describe:
        'Check every single transaction or smart contract before allowing it to access your funds, track the whole chain of events happening in every blockchain.',
    },
    {
      icon: '/images/dex-v2/permission.png',
      name: 'Permissionless',
      describe:
        'Every  supported Blockchains is public and open for everyone to trade and own assets without the supervision of governments or financial institutions.',
    },
    {
      icon: '/images/dex-v2/audited.png',
      name: 'Audited',
      describe: `XOX Labs' smart contracts and platforms are fully audited by top-tier auditors to ensure the security of the users.`,
    },
    {
      icon: '/images/dex-v2/tested.png',
      name: 'Tested',
      describe:
        'Every new feature and protocol integration is heavily tested in every possible situation before making it accessible to the users to ensure performance and safety. ',
    },
  ]

  return (
    <StyledContainer>
      <StyledHeader>
        <h1>
          Multi-Chain{' '}
          <span className="hight-light">
            Decentralized Trading <br /> Solution{' '}
          </span>{' '}
          Powering Web3.
        </h1>
      </StyledHeader>

      <StyledEcosystem>
        <p>
          <span className="hight-light">XOX Dex V2</span> Ecosystem
        </p>
        <p>
          Why trade in a single Dex when you can Trade in all DEXs at Once? XOX Dex V2 finds you the best prices across
          <br />
          60+ Chains & 150+ DEXes and combines them into a single trade, all while giving you many other trade
          <br />
          options to choose from, Ranking them by Lowest Fees, Best Rates, and Higher Liquidity.
        </p>
      </StyledEcosystem>

      <StyledTabEcosystem>
        <div>
          {TABECOSYSTEM.map((item, i) => (
            <div key={String(i + item)}>{item}</div>
          ))}
        </div>
      </StyledTabEcosystem>

      <StyledDexes>
        {handleRange(1, 149).map((item, i) => (
          <img src={`/images/dex-v2/dexes/${item}.png`} key={String(i + item)} alt="dex" />
        ))}
      </StyledDexes>

      <StyledBLock>
        <div>
          <h3>How it works.</h3>
          <p>
            <span className="hight-light">XOX Dex V2</span> is more than just another aggregator. We have taken a{' '}
            <span className="hight-light">revolutionary approach</span> by aggregating from all{' '}
            <span className="hight-light">DEXs</span>, <span className="hight-light">aggregators</span>, and{' '}
            <span className="hight-light">bridges</span> to provide users with the{' '}
            <span className="hight-light">most advanced and efficient aggregator service available</span> .{' '}
            <span className="hight-light">The XOX Dex V2</span> platform saves users both{' '}
            <span className="hight-light">Time and Money</span> , while also providing them with access to the most
            complex <span className="hight-light">in-chain and cross-chain</span> swap capabilities available on the
            <span>Defi Market.</span>
          </p>
        </div>

        <div>
          <video
            loop
            playsInline
            autoPlay
            controls={false}
            preload="auto"
            style={{ pointerEvents: 'none' }}
            controlsList="nodownload"
            muted
          >
            <source src="/images/dex-v2/how_it_work.mp4" type="video/mp4" />
          </video>
        </div>
      </StyledBLock>

      <StyledReferralProgram>
        <div>
          <h3>
            Next Gen <span className="hight-light">Referral Program </span>
          </h3>
          <p>
            <span className="hight-light">XOX Dex V1</span> has already one of the most advanced referral programs in
            the space, allowing <span className="hight-light">Dual Cash Back</span> and referral earning on every
            transaction that the code has been applied for both the (<span className="hight-light">referee</span> &{' '}
            <span className="hight-light">referrer</span>). It is also gamified, implements leader-boards and milestones
            and users can withdraw their earnings in <span className="hight-light">USDT/USDC</span>.
          </p>

          <p>
            <span className="hight-light">But</span>, in <span className="hight-light">XOX Dex V2</span> we are
            upgrading it by making it <span className="hight-light">Multi-Chain</span> and
            <span className="hight-light">Multi Token</span>. It&lsquo;s simple, just{' '}
            <span className="hight-light">Share Your Code</span> and <span className="hight-light">Earn</span> some
            <span className="hight-light">Free Cash</span> as <span className="hight-light">Passive Income</span>.
          </p>

          <div>
            <BtnLearMore />
          </div>
        </div>

        <div>
          <video
            loop
            playsInline
            autoPlay
            controls={false}
            preload="auto"
            style={{ pointerEvents: 'none' }}
            controlsList="nodownload"
            muted
          >
            <source src="/images/dex-v2/referral.mp4" type="video/mp4" />
          </video>
        </div>
      </StyledReferralProgram>

      <StyledTitle style={{ marginBottom: 48 }}>Safe and Reliable.</StyledTitle>
      <StyledSaleAndReliable>
        {SAFERELIABLE.map((safe, i) => (
          <CardSafeReliable safe={safe} key={String(i + safe.name)} />
        ))}
      </StyledSaleAndReliable>
      <div style={{ marginTop: 48, marginBottom: 80, display: 'flex', justifyContent: 'center' }}>
        <BtnLearMore />
      </div>

      <StyledTitle>{t('XOX Labs Ecosystem Products')}</StyledTitle>
      <ReStyledSubtitle style={{ marginBottom: 48 }}>
        {t('A true one Multi-chain stop for all your Defi Needs.')}
      </ReStyledSubtitle>

      <StyledSocial marginBottom={[64, null, null, 80]}>
        {SOCIALS.map((social, i) => (
          <CardSocial social={social} key={String(i + social.name)} />
        ))}
      </StyledSocial>

      <BackedBy />
    </StyledContainer>
  )
}

export default DevV2
