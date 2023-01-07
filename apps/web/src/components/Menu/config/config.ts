import {
  MenuItemsType,
  SwapFillIcon,
  EarnFillIcon,
  EarnIcon,
  DropdownMenuItems,
  CompanyIcon,
  WhitepaperIcon,
  Tokenomics,
  TokenomicsFill,
} from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'
import { SUPPORT_ONLY_BSC } from 'config/constants/supportChains'
import SwapIcon from 'components/Svg/SwapIcon'
import BridgeIcon from 'components/Svg/BridgeIcon'
import LiquidityIcon from 'components/Svg/LiquidityIcon'
import ReferralIcon from 'components/Svg/ReferralIcon'
import AssetIcon from 'components/Svg/AssetIcon'
import StableCoinIcon from 'components/Svg/StableCoinIcon'
import FarmingIcon from 'components/Svg/FarmingIcon'

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
      label: 'Stable Coin',
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      href: '/stable-coin',
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
      icon: Tokenomics,
      fillIcon: TokenomicsFill,
      image: '/images/decorations/pe2.png',
      items: [],
    },
    {
      label: t('Whitepaper'),
      href: '#',
      icon: WhitepaperIcon,
      fillIcon: SwapFillIcon,
      showItemsOnMobile: false,
      items: [],
    },
    {
      label: t('Company'),
      icon: CompanyIcon,
      fillIcon: SwapFillIcon,
      href: '#',
      showItemsOnMobile: false,
      items: [],
    },
    {
      label: t('Product'),
      icon: CompanyIcon,
      fillIcon: SwapFillIcon,
      href: '#',
      items: [
        {
          label: t('Swap'),
          href: '/swap',
          icon: SwapIcon,
          fillIcon: SwapIcon,
        },
        {
          label: t('Bridge'),
          icon: BridgeIcon,
          fillIcon: BridgeIcon,
          href: '/bridge',
        },
        {
          label: t('Liquidity'),
          icon: LiquidityIcon,
          fillIcon: LiquidityIcon,
          href: '/liquidity',
        },
        {
          label: t('Farming'),
          href: '/pools',
          icon: FarmingIcon,
          fillIcon: FarmingIcon,
          image: '/images/decorations/pe2.png',
        },
        {
          label: t('Referral'),
          href: '/referral',
          icon: ReferralIcon,
          fillIcon: ReferralIcon,
          image: '/images/decorations/pe2.png',
        },
        {
          label: t('Asset'),
          href: '/info',
          icon: AssetIcon,
          fillIcon: AssetIcon,
          image: '/images/decorations/pe2.png',
        },
        {
          label: 'Stable Coin',
          icon: StableCoinIcon,
          fillIcon: StableCoinIcon,
          href: '/stable-coin',
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
