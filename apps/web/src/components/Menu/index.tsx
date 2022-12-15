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
import { useAccount } from 'wagmi'

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
  const { address: account } = useAccount()

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
              {account && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="43"
                  height="44"
                  viewBox="0 0 43 44"
                  fill="none"
                  style={{ marginRight: '16px' }}
                >
                  <circle cx="21.5" cy="22" r="21.5" fill="#303030" />
                  <g clip-path="url(#clip0_7156_5352)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21 10.5C16.8579 10.5 13.5 13.8579 13.5 18V22.4208C13.5 22.4949 13.4781 22.5672 13.437 22.6289L10.8823 26.4609C10.633 26.8349 10.5 27.2742 10.5 27.7236C10.5 28.9809 11.5192 30 12.7764 30H29.2236C30.4809 30 31.5 28.9809 31.5 27.7236C31.5 27.2742 31.3669 26.8349 31.1176 26.4609L28.563 22.6289C28.5219 22.5672 28.5 22.4949 28.5 22.4208V18C28.5 13.8579 25.1421 10.5 21 10.5Z"
                      fill="#8E8E8E"
                    />
                    <path
                      d="M23.9769 31.8743C23.7927 33.3545 22.5301 34.5 21 34.5C19.4699 34.5 18.2073 33.3545 18.0231 31.8743C17.9975 31.6688 18.1679 31.5 18.375 31.5H23.625C23.8321 31.5 24.0024 31.6688 23.9769 31.8743Z"
                      fill="#8E8E8E"
                    />
                    <circle cx="27.5" cy="14.5" r="2.5" fill="#9072FF" stroke="#303030" />
                  </g>
                  <defs>
                    <clipPath id="clip0_7156_5352">
                      <rect width="24" height="24" fill="white" transform="translate(9 10.5)" />
                    </clipPath>
                  </defs>
                </svg>
              )}
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
