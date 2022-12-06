import styled from 'styled-components'
import PageSection from 'components/PageSection'
import { PageMeta } from 'components/Layout/Page'
import BallPurple from './components/BallPurple'
import WelcomeXOX from './components/Banners/WelcomeXOX'
import NestedBall from './components/NestBallPruple'
import FeatureWatch from './components/Banners/FeatureWatch'
import FeaturePlant from './components/Banners/FeaturePlant'
import FeatureSquare from './components/Banners/FeatureSquare'
import RoadMap from './components/Banners/RoadMap'
import TeamMenber from './components/Banners/TeamMenber'
import Partners from './components/Partners'
import Community from './components/Banners/Community'
import FeatureEconomy from './components/Banners/FeatureEconomy'
import Backgroud from './components/Banners/Background'
import BackgroudWatch from './components/Banners/BackgroundWatch'
import FeatureReferal from './components/Banners/FeatureReferal'
import UpComing from './components/Banners/FeatureUpComing'
import SecuredBy from './components/Banners/SecuredBy'

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 48px 300px;
  }
`

const StyledSectionEconomy = styled(StyledHeroSection)``

const StyledSection = styled(PageSection)`
  padding-top: 16px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 48px 300px;
  }
`

const Home: React.FC<React.PropsWithChildren> = () => {
  return (
    <>
      <PageMeta />
      <style jsx global>{`
        #home .page-bg {
          background: black;
        }
      `}</style>
      <StyledSectionEconomy
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <BallPurple src="/images/bg-pur.svg" css={{ right: 0 }} />
        <WelcomeXOX />
      </StyledSectionEconomy>

      <StyledSectionEconomy
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <Backgroud />
        <FeatureEconomy />
        <FeatureSquare />
      </StyledSectionEconomy>

      <StyledSectionEconomy
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <BackgroudWatch />
        <FeatureWatch />
        <FeaturePlant />
        <FeatureReferal />
      </StyledSectionEconomy>

      <StyledSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <Partners />
        <SecuredBy />
        <UpComing />
        <RoadMap />
        <Community />
      </StyledSection>
    </>
  )
}

export default Home
