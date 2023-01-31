import styled from 'styled-components'
import PageSection from 'components/PageSection'
import { PageMeta } from 'components/Layout/Page'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import useWindowSize from 'hooks/useWindowSize'
import Spline from '@splinetool/react-spline'
import BallPurple from './components/BallPurple'
import WelcomeXOX from './components/Banners/WelcomeXOX'
import FeatureWatch from './components/Banners/FeatureWatch'
import FeaturePlant from './components/Banners/FeaturePlant'
import RoadMap from './components/Banners/RoadMap'
import Partners from './components/Partners'
import Community from './components/Banners/Community'
import FeatureEconomy from './components/Banners/FeatureEconomy'
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
const ImageWrapper = styled.div`
  width: 100%;
  height: 74vh;
  display: grid;
  place-content: center;

  ${({ theme }) => theme.mediaQueries.md} {
    img {
      transform: scale(2) translateY(-30px);
    }
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    img {
      transform: scale(1.6) translateY(-30px);
    }
  }
`

const Home: React.FC<React.PropsWithChildren> = () => {
  const { width: innerWidth } = useWindowSize()
  const widthResize = innerWidth > 1400 ? 1400 : innerWidth > 900 ? 1200 : '100%';
  useEffect(() => {
    AOS.init({ duration: 2000 })
  }, [])
  return (
    <>
      <PageMeta />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        #home .page-bg {
          background: black;
        }
      `}</style>
      <StyledSection
        innerProps={{
          style: {
            margin: '0',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            justifyContent: innerWidth > 900 ? 'space-around' : 'unset',
            width: widthResize,
          },
        }}
        containerProps={{
          id: 'home',
        }}
        innerClass="welcome"
        index={2}
        hasCurvedDivider={false}
      >
        <BallPurple src="/images/bg-pur.svg" />
        <div>
          <WelcomeXOX />
        </div>

        {innerWidth > 967 && (
          // <Spline
          //   scene="https://prod.spline.design/M4m4JHN1AfoMsH4A/scene.splinecode"
          //   onLoad={(e) => e.setZoom(1)}
          //   id="asset_3d"
          // />
          <ImageWrapper>
            <img src="/images/xox-desktop.gif" alt="" />
          </ImageWrapper>
        )}
      </StyledSection>

      <StyledSection
        innerProps={{ style: { margin: '0' } }}
        containerProps={{
          id: 'home',
        }}
        index={1}
        hasCurvedDivider={false}
      >
        <BackgroudWatch />

        <div style={{ width: widthResize }}>
          <FeatureEconomy />
          <FeatureSquare />
          <FeatureWatch />
          <FeaturePlant />
          <FeatureReferal />
        </div>
      </StyledSection>

      <StyledSection
        innerProps={{ style: { margin: '0', width: widthResize } }}
        containerProps={{
          id: 'home',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <BGPartner />
        <div style={{ width: widthResize }}>
          <Partners />
          <SecuredBy />
          <UpComing />
          <RoadMap />
          <Community />
        </div>
      </StyledSection>
    </>
  )
}

export default Home
