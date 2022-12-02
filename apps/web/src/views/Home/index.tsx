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

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 48px 118px;
  }
`

const StyledSectionEconomy = styled(StyledHeroSection)``

const StyledSection = styled(PageSection)`
  padding-top: 16px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 48px 118px;
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
        <FeatureEconomy />
      </StyledSectionEconomy>
      <StyledHeroSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <NestedBall />
        <FeatureWatch />
      </StyledHeroSection>

      <StyledSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <FeaturePlant />
      </StyledSection>

      <StyledSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <FeatureSquare />
      </StyledSection>

      <StyledSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <RoadMap />
      </StyledSection>

      <StyledSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <Partners />
      </StyledSection>

      <StyledSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <TeamMenber />
      </StyledSection>

      <StyledSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <Community />
      </StyledSection>
    </>
  )
}

export default Home
