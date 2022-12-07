import { MenuItemsType, SwapIcon, SwapFillIcon, EarnFillIcon, EarnIcon, DropdownMenuItems } from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'
import { SUPPORT_ONLY_BSC } from 'config/constants/supportChains'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    {
      label: t('Asset'),
      href: '/info',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      image: '/images/decorations/pe2.png',
      items: [],
    },
    {
      label: t('Swap'),
      href: '/swap',
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      showItemsOnMobile: false,
      items: [],
    },
    {
      label: t('Liquidity'),
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      href: '/liquidity',
      showItemsOnMobile: false,
      items: [],
    },
    {
      label: t('Farming'),
      href: '/pools',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      image: '/images/decorations/pe2.png',
      supportChainIds: SUPPORT_ONLY_BSC,
      items: [],
    },
    {
      label: t('Referral'),
      href: '/referral',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      image: '/images/decorations/pe2.png',
      items: [],
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export const configLanding: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    {
      label: t('Tokenomics'),
      href: '/',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      image: '/images/decorations/pe2.png',
      items: [],
    },
    {
      label: t('Whitepaper'),
      href: '#',
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      showItemsOnMobile: false,
      items: [],
    },
    {
      label: t('Company'),
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      href: '#',
      showItemsOnMobile: false,
      items: [],
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
