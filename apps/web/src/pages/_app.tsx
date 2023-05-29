import '@pancakeswap/ui/css/reset.css'
import { ResetCSS, ToastListener, ScrollToTopButtonV2, useMatchBreakpoints } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import GlobalCheckClaimStatus from 'components/GlobalCheckClaimStatus'
import { NetworkModal } from 'components/NetworkModal'
import { FixedSubgraphHealthIndicator } from 'components/SubgraphHealthIndicator/FixedSubgraphHealthIndicator'
import { useAccountEventListener } from 'hooks/useAccountEventListener'
import useEagerConnect from 'hooks/useEagerConnect'
import useEagerConnectMP from 'hooks/useEagerConnect.bmp'
import useThemeCookie from 'hooks/useThemeCookie'
import useUserAgent from 'hooks/useUserAgent'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment, useEffect, useRef } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { AppState, persistor, useAppDispatch, useStore } from 'state'
import { usePollBlockNumber } from 'state/block/hooks'
import TransactionsDetailModal from 'components/TransactionDetailModal'
import FormReferralModal from 'components/Menu/UserMenu/FormReferralModal'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import SwapMainBackgroundDesktop from 'components/Svg/SwapMainBackgroundDesktop'
import SwapMainBackgroundMobile from 'components/Svg/SwapMainBackgroundMobile'
import NotificationBannerAirdrop from 'components/NotificationBannerAirdrop'
import { showBannerAirdrop, hideBannerAirdrop, showBannerChains, hideBannerChains } from 'state/user/actions'
import NotificationBannerChains from 'components/NotificationBannerChains'
import { useSelector } from 'react-redux'
import { Blocklist, Updaters } from '..'
import Menu from '../components/Menu'
import Providers from '../Providers'
import GlobalStyle from '../style/Global'
import { PageMeta } from 'components/Layout/Page'

const MainBackground = styled.div`
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: fit-content;
  svg,
  img {
    width: 100vw;
    /* height: auto; */
    object-fit: cover;
  }
`

const EasterEgg = dynamic(() => import('components/EasterEgg'), { ssr: false })

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

function GlobalHooks() {
  usePollBlockNumber()
  useEagerConnect()
  useUserAgent()
  useAccountEventListener()
  useThemeCookie()
  return null
}

function MPGlobalHooks() {
  usePollBlockNumber()
  useEagerConnectMP()
  useUserAgent()
  useAccountEventListener()
  return null
}

function MyApp(props: AppProps<{ initialReduxState: any }>) {
  const { pageProps, Component } = props
  const store = useStore(pageProps.initialReduxState)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#000" />
      </Head>
      <Providers store={store}>
        <PageMeta />
        <Blocklist>
          {(Component as NextPageWithLayout).mp ? <MPGlobalHooks /> : <GlobalHooks />}
          <ResetCSS />
          <GlobalStyle />
          <GlobalCheckClaimStatus excludeLocations={[]} />
          <PersistGate loading={null} persistor={persistor}>
            <Updaters />
            <App {...props} />
          </PersistGate>
        </Blocklist>
      </Providers>
      {/* <Script
        strategy="afterInteractive"
        id="google-tag"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTAG}');
          `,
        }}
      /> */}
    </>
  )
}

type NextPageWithLayout = NextPage & {
  Layout?: React.FC<React.PropsWithChildren<unknown>>
  /** render component without all layouts */
  pure?: true
  /** is mini program */
  mp?: boolean
  /**
   * allow chain per page, empty array bypass chain block modal
   * @default [ChainId.BSC]
   * */
  chains?: number[]
  isShowScrollToTopButton?: true
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const modal = useRef(null)
  const dispatch = useAppDispatch()
  const { isMobile } = useMatchBreakpoints()
  const route = useRouter()
  const currentTimestamp = () => Math.round(new Date().getTime() / 1000)
  const timeLineBannerAirdrop = { start: 1682669700, end: 1682670000 }
  const timeLineBannerChain = { start: 1682670300, end: 1682670600 }
  // Use the layout defined at the page level, if available
  const Layout = Component.Layout || Fragment
  const ShowMenu = Component.mp ? Fragment : Menu
  const isShowScrollToTopButton = Component.isShowScrollToTopButton || true

  const isShowBannerAirdrop = useSelector<AppState, AppState['user']['isShowBannerAirdrop']>(
    (state) => state.user.isShowBannerAirdrop,
  )
  const isShowBannerChains = useSelector<AppState, AppState['user']['isShowBannerChains']>(
    (state) => state.user.isShowBannerChains,
  )

  useEffect(() => {
    if (timeLineBannerAirdrop.start <= currentTimestamp() && currentTimestamp() <= timeLineBannerAirdrop.end) {
      dispatch(showBannerAirdrop())
    } else {
      dispatch(hideBannerAirdrop())
    }

    if (timeLineBannerChain.start <= currentTimestamp() && currentTimestamp() <= timeLineBannerChain.end) {
      dispatch(showBannerChains())
    } else {
      dispatch(hideBannerChains())
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (Component.pure) {
    return <Component {...pageProps} />
  }

  return (
    <>
      <MainBackground>
        {['/company', '/tokenomics', '/dex-v2', '/'].includes(route.pathname) ? (
          <></>
        ) : isMobile ? (
          <SwapMainBackgroundMobile />
        ) : (
          <SwapMainBackgroundDesktop />
        )}
      </MainBackground>
      <ShowMenu>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ShowMenu>
      {Number(route.query?.id) === 1 && ['/company'].includes(route.pathname) && <NotificationBannerAirdrop />}
      {Number(route.query?.id) === 2 && ['/company'].includes(route.pathname) && <NotificationBannerChains />}
      <EasterEgg iterations={2} />
      <ToastListener />
      <FixedSubgraphHealthIndicator />
      <NetworkModal pageSupportedChains={Component.chains} />
      <TransactionsDetailModal />
      {isShowScrollToTopButton && <ScrollToTopButtonV2 />}
      {route.pathname !== '/' && <FormReferralModal ref={modal} />}
    </>
  )
}

export default MyApp
