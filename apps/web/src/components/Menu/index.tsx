import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { Menu as UikitMenu, NextLinkFromReactRouter } from '@pancakeswap/uikit'
import { useTranslation, languageList } from '@pancakeswap/localization'
import PhishingWarningBanner from 'components/PhishingWarningBanner'
import { NetworkSwitcher } from 'components/NetworkSwitcher'
import useTheme from 'hooks/useTheme'
import { useCakeBusdPrice } from 'hooks/useBUSDPrice'
import { usePhishingBannerManager } from 'state/user/hooks'
import { useActiveChainId } from 'hooks/useActiveChainId'
import styled from 'styled-components'
import UserMenu from './UserMenu'
import { useMenuItems } from './hooks/useMenuItems'
// import GlobalSettings from './GlobalSettings'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'
import { footerLinks } from './config/footerConfig'
import { SettingsMode } from './GlobalSettings/types'
import { configLanding } from './config/config'

const BTNLaunchApp = styled.button`
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  padding: 12px 30px;
  background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
  border-radius: 6px;
  border: none;
  cursor: pointer;
`

const Menu = (props) => {
  const { isDark, setTheme } = useTheme()
  const cakePriceUsd = useCakeBusdPrice({ forceMainnet: true })
  const { currentLanguage, setLanguage, t } = useTranslation()
  const route = useRouter()
  const [showPhishingWarningBanner] = usePhishingBannerManager()
  const menuItems = useMenuItems()

  const { chainId } = useActiveChainId()

  const menuItemsLanding = useMemo(() => {
    return configLanding(t, isDark, currentLanguage.code, chainId)
  }, [t, isDark, currentLanguage.code, chainId])

  const activeMenuItem = getActiveMenuItem({ menuConfig: menuItems, pathname: route.pathname })

  const activeMenuItemLanding = getActiveMenuItem({ menuConfig: menuItemsLanding, pathname: route.pathname })

  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname: route.pathname })

  const toggleTheme = useMemo(() => {
    return () => setTheme(isDark ? 'light' : 'dark')
  }, [setTheme, isDark])

  const getFooterLinks = useMemo(() => {
    return footerLinks(t)
  }, [t])

  return (
    <>
      <UikitMenu
        linkComponent={(linkProps) => {
          return <NextLinkFromReactRouter to={linkProps.href} {...linkProps} prefetch={false} />
        }}
        rightSide={
          route.pathname === '/' ? (
            <a href="/swap">
              <BTNLaunchApp>Launch App</BTNLaunchApp>
            </a>
          ) : (
            <>
              {/* <GlobalSettings mode={SettingsMode.GLOBAL} /> */}
              <NetworkSwitcher />
              <UserMenu />
            </>
          )
        }
        // banner={showPhishingWarningBanner && typeof window !== 'undefined' && <PhishingWarningBanner />}
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentLang={currentLanguage.code}
        langs={languageList}
        setLang={setLanguage}
        cakePriceUsd={cakePriceUsd}
        links={route.pathname === '/' ? menuItemsLanding : menuItems}
        subLinks={activeMenuItem?.hideSubNav || activeSubMenuItem?.hideSubNav ? [] : activeMenuItem?.items}
        footerLinks={getFooterLinks}
        activeItem={route.pathname === '/' ? activeMenuItemLanding?.href : activeMenuItem?.href}
        activeSubItem={activeSubMenuItem?.href}
        buyCakeLabel={t('Buy CAKE')}
        isLanding={route.pathname === '/'}
        {...props}
      />
    </>
  )
}

export default Menu
