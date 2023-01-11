import styled from 'styled-components'
import PageSection from 'components/PageSection'
import { PageMeta } from 'components/Layout/Page'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import AOS from 'aos'
import Spline from '@splinetool/react-spline'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import BallPurple from './components/BallPurple'
import WelcomeXOX from './components/Banners/WelcomeXOX'
import FeatureWatch from './components/Banners/FeatureWatch'
import FeaturePlant from './components/Banners/FeaturePlant'
import RoadMap from './components/Banners/RoadMap'
import Partners from './components/Partners'
import Community from './components/Banners/Community'
import FeatureEconomy from './components/Banners/FeatureEconomy'
import Backgroud from './components/Banners/Background'
import BackgroudWatch from './components/Banners/BackgroundWatch'
import FeatureReferal from './components/Banners/FeatureReferal'
import UpComing from './components/Banners/FeatureUpComing'
import SecuredBy from './components/Banners/SecuredBy'
import BGPartner from './components/Banners/BackgroundPartner'
import FeatureSquare from './components/Banners/FeatureSquare'

const StyledSection = styled(PageSection)`
  padding-top: 16px;
  padding: 0px 21px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0px 50px;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    padding: 0px 130px;
  }
`

const Home: React.FC<React.PropsWithChildren> = () => {
  const { isMobile } = useMatchBreakpoints()
  useEffect(() => {
    AOS.init({ duration: 2000 })
  }, [])
  return (
    <>
      <PageMeta />
      <style jsx global>{`
        #home .page-bg {
          background: black;
        }
      `}</style>
      <StyledSection
        innerProps={{
          style: {
            margin: '0',
            width: '100%',
            height: '88vh',
            display: 'flex',
            alignItems: 'center',
          },
        }}
        containerProps={{
          id: 'home',
        }}
        innerClass="welcome"
        index={2}
        hasCurvedDivider={false}
      >
        <BallPurple src="/images/bg-pur.svg" css={{ right: 0 }} />
        <WelcomeXOX />

        {isMobile ? (
          <Spline
            scene="https://prod.spline.design/M4m4JHN1AfoMsH4A/scene.splinecode"
            onLoad={(e) => e.setZoom(0.35)}
            id="mobile_xox"
          />
        ) : (
          <Spline
            scene="https://prod.spline.design/M4m4JHN1AfoMsH4A/scene.splinecode"
            onLoad={(e) => e.setZoom(1)}
            id="computer_xox"
          />
        )}
      </StyledSection>

      <StyledSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home',
        }}
        index={1}
        hasCurvedDivider={false}
      >
        <Backgroud />
        <FeatureEconomy />
      </StyledSection>

      <StyledSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home',
        }}
        index={1}
        hasCurvedDivider={false}
      >
        <BackgroudWatch />
        <FeatureSquare />
        <FeatureWatch />
        <FeaturePlant />
        <FeatureReferal />
      </StyledSection>

      <StyledSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <BGPartner />
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
