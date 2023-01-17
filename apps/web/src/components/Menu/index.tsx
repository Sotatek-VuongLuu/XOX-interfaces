import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Menu as UikitMenu,
  ModalV2,
  ModalWrapper,
  NextLinkFromReactRouter,
  NotificationIcon,
  Text,
  useMatchBreakpoints,
} from '@pancakeswap/uikit'
import { useTranslation, languageList } from '@pancakeswap/localization'
import { NetworkSwitcher } from 'components/NetworkSwitcher'
import useTheme from 'hooks/useTheme'
import { useCakeBusdPrice } from 'hooks/useBUSDPrice'
import { useActiveChainId } from 'hooks/useActiveChainId'
import styled from 'styled-components'
import MenuItems from '@pancakeswap/uikit/src/components/MenuItems/MenuItems'
import { useAccount } from 'wagmi'
import UserMenu from './UserMenu'
import { useMenuItems } from './hooks/useMenuItems'
// import GlobalSettings from './GlobalSettings'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'
import { footerLinks } from './config/footerConfig'
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

const HamburgerButton = styled.div`
  margin-left: 11px;

  @media (min-width: 1200px) {
    display: none;
  }
`

const ModalV2Wrapper = styled(ModalV2)`
  & > div:first-child {
    background: transparent;
  }
`

const CustomModalWrapper = styled(ModalWrapper)`
  border-radius: 0;
  top: 73px;
  left: 0;
  width: 100%;
  max-width: unset !important;
  padding-bottom: 0;
`

const MenuItemsWrapper = styled(MenuItems)`
  flex-direction: column;

  & > div {
    margin-right: 24px;
    margin-left: 24px;
    border-bottom: 1px solid #444444;
  }

  & > div:last-child {
    border-bottom: none;
  }
`

const Menu = (props) => {
  const { isDark, setTheme } = useTheme()
  const cakePriceUsd = useCakeBusdPrice({ forceMainnet: true })
  const { currentLanguage, setLanguage, t } = useTranslation()
  const route = useRouter()
  const menuItems = useMenuItems()
  const { address: account } = useAccount()
  const { isDesktop } = useMatchBreakpoints()
  const { chainId } = useActiveChainId()
  const [openHeader, setOpenHeader] = useState<boolean>(false)

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

  const handleHambergerBtnClicked = () => {
    return setOpenHeader(true)
  }

  const handleCloseHeaderMenu = () => {
    return setOpenHeader(false)
  }

  return (
    <>
      <ModalV2Wrapper closeOnOverlayClick isOpen={openHeader} onDismiss={handleCloseHeaderMenu}>
        <CustomModalWrapper onDismiss={handleCloseHeaderMenu} style={{ overflow: 'visible', border: 'none' }}>
          <MenuItemsWrapper
            items={route.pathname === '/' ? menuItemsLanding : menuItems}
            activeItem={route.pathname === '/' ? activeMenuItemLanding?.href : activeMenuItem?.href}
            activeSubItem={activeSubMenuItem?.href}
          />
        </CustomModalWrapper>
      </ModalV2Wrapper>
      <UikitMenu
        linkComponent={(linkProps) => {
          return <NextLinkFromReactRouter to={linkProps.href} {...linkProps} prefetch={false} />
        }}
        rightSide={
          route.pathname === '/' ? (
            <>
              <a href="/swap" style={{ marginRight: '11px' }} target="_blank">
                <BTNLaunchApp>Launch App</BTNLaunchApp>
              </a>

              {openHeader ? (
                <HamburgerButton>
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" viewBox="0 0 14 15" fill="none">
                    <path
                      d="M7.0977 8.8998L2.1977 13.7998C2.01437 13.9831 1.78104 14.0748 1.4977 14.0748C1.21437 14.0748 0.981038 13.9831 0.797705 13.7998C0.614371 13.6165 0.522705 13.3831 0.522705 13.0998C0.522705 12.8165 0.614371 12.5831 0.797705 12.3998L5.69771 7.4998L0.797705 2.5998C0.614371 2.41647 0.522705 2.18314 0.522705 1.8998C0.522705 1.61647 0.614371 1.38314 0.797705 1.1998C0.981038 1.01647 1.21437 0.924805 1.4977 0.924805C1.78104 0.924805 2.01437 1.01647 2.1977 1.1998L7.0977 6.0998L11.9977 1.1998C12.181 1.01647 12.4144 0.924805 12.6977 0.924805C12.981 0.924805 13.2144 1.01647 13.3977 1.1998C13.581 1.38314 13.6727 1.61647 13.6727 1.8998C13.6727 2.18314 13.581 2.41647 13.3977 2.5998L8.4977 7.4998L13.3977 12.3998C13.581 12.5831 13.6727 12.8165 13.6727 13.0998C13.6727 13.3831 13.581 13.6165 13.3977 13.7998C13.2144 13.9831 12.981 14.0748 12.6977 14.0748C12.4144 14.0748 12.181 13.9831 11.9977 13.7998L7.0977 8.8998Z"
                      fill="#9072FF"
                    />
                  </svg>
                </HamburgerButton>
              ) : (
                <HamburgerButton onClick={handleHambergerBtnClicked}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="13" viewBox="0 0 19 13" fill="none">
                    <path
                      d="M1.09766 12.5C0.814323 12.5 0.57699 12.404 0.385656 12.212C0.193656 12.0207 0.0976562 11.7833 0.0976562 11.5C0.0976562 11.2167 0.193656 10.9793 0.385656 10.788C0.57699 10.596 0.814323 10.5 1.09766 10.5H17.0977C17.381 10.5 17.6183 10.596 17.8097 10.788C18.0017 10.9793 18.0977 11.2167 18.0977 11.5C18.0977 11.7833 18.0017 12.0207 17.8097 12.212C17.6183 12.404 17.381 12.5 17.0977 12.5H1.09766ZM1.09766 7.5C0.814323 7.5 0.57699 7.404 0.385656 7.212C0.193656 7.02067 0.0976562 6.78333 0.0976562 6.5C0.0976562 6.21667 0.193656 5.979 0.385656 5.787C0.57699 5.59567 0.814323 5.5 1.09766 5.5H17.0977C17.381 5.5 17.6183 5.59567 17.8097 5.787C18.0017 5.979 18.0977 6.21667 18.0977 6.5C18.0977 6.78333 18.0017 7.02067 17.8097 7.212C17.6183 7.404 17.381 7.5 17.0977 7.5H1.09766ZM1.09766 2.5C0.814323 2.5 0.57699 2.40433 0.385656 2.213C0.193656 2.021 0.0976562 1.78333 0.0976562 1.5C0.0976562 1.21667 0.193656 0.979 0.385656 0.787C0.57699 0.595667 0.814323 0.5 1.09766 0.5H17.0977C17.381 0.5 17.6183 0.595667 17.8097 0.787C18.0017 0.979 18.0977 1.21667 18.0977 1.5C18.0977 1.78333 18.0017 2.021 17.8097 2.213C17.6183 2.40433 17.381 2.5 17.0977 2.5H1.09766Z"
                      fill="#9072FF"
                    />
                  </svg>
                </HamburgerButton>
              )}
            </>
          ) : (
            <>
              {/* <GlobalSettings mode={SettingsMode.GLOBAL} /> */}
              {account ? isDesktop ? <NotificationIcon /> : <NotificationIcon size={25} /> : <></>}
              <NetworkSwitcher />
              <UserMenu />
              {openHeader ? (
                <HamburgerButton>
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" viewBox="0 0 14 15" fill="none">
                    <path
                      d="M7.0977 8.8998L2.1977 13.7998C2.01437 13.9831 1.78104 14.0748 1.4977 14.0748C1.21437 14.0748 0.981038 13.9831 0.797705 13.7998C0.614371 13.6165 0.522705 13.3831 0.522705 13.0998C0.522705 12.8165 0.614371 12.5831 0.797705 12.3998L5.69771 7.4998L0.797705 2.5998C0.614371 2.41647 0.522705 2.18314 0.522705 1.8998C0.522705 1.61647 0.614371 1.38314 0.797705 1.1998C0.981038 1.01647 1.21437 0.924805 1.4977 0.924805C1.78104 0.924805 2.01437 1.01647 2.1977 1.1998L7.0977 6.0998L11.9977 1.1998C12.181 1.01647 12.4144 0.924805 12.6977 0.924805C12.981 0.924805 13.2144 1.01647 13.3977 1.1998C13.581 1.38314 13.6727 1.61647 13.6727 1.8998C13.6727 2.18314 13.581 2.41647 13.3977 2.5998L8.4977 7.4998L13.3977 12.3998C13.581 12.5831 13.6727 12.8165 13.6727 13.0998C13.6727 13.3831 13.581 13.6165 13.3977 13.7998C13.2144 13.9831 12.981 14.0748 12.6977 14.0748C12.4144 14.0748 12.181 13.9831 11.9977 13.7998L7.0977 8.8998Z"
                      fill="#9072FF"
                    />
                  </svg>
                </HamburgerButton>
              ) : (
                <HamburgerButton onClick={handleHambergerBtnClicked}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="13" viewBox="0 0 19 13" fill="none">
                    <path
                      d="M1.09766 12.5C0.814323 12.5 0.57699 12.404 0.385656 12.212C0.193656 12.0207 0.0976562 11.7833 0.0976562 11.5C0.0976562 11.2167 0.193656 10.9793 0.385656 10.788C0.57699 10.596 0.814323 10.5 1.09766 10.5H17.0977C17.381 10.5 17.6183 10.596 17.8097 10.788C18.0017 10.9793 18.0977 11.2167 18.0977 11.5C18.0977 11.7833 18.0017 12.0207 17.8097 12.212C17.6183 12.404 17.381 12.5 17.0977 12.5H1.09766ZM1.09766 7.5C0.814323 7.5 0.57699 7.404 0.385656 7.212C0.193656 7.02067 0.0976562 6.78333 0.0976562 6.5C0.0976562 6.21667 0.193656 5.979 0.385656 5.787C0.57699 5.59567 0.814323 5.5 1.09766 5.5H17.0977C17.381 5.5 17.6183 5.59567 17.8097 5.787C18.0017 5.979 18.0977 6.21667 18.0977 6.5C18.0977 6.78333 18.0017 7.02067 17.8097 7.212C17.6183 7.404 17.381 7.5 17.0977 7.5H1.09766ZM1.09766 2.5C0.814323 2.5 0.57699 2.40433 0.385656 2.213C0.193656 2.021 0.0976562 1.78333 0.0976562 1.5C0.0976562 1.21667 0.193656 0.979 0.385656 0.787C0.57699 0.595667 0.814323 0.5 1.09766 0.5H17.0977C17.381 0.5 17.6183 0.595667 17.8097 0.787C18.0017 0.979 18.0977 1.21667 18.0977 1.5C18.0977 1.78333 18.0017 2.021 17.8097 2.213C17.6183 2.40433 17.381 2.5 17.0977 2.5H1.09766Z"
                      fill="#9072FF"
                    />
                  </svg>
                </HamburgerButton>
              )}
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
