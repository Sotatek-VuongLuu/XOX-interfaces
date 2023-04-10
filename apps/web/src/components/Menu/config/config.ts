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
import SwapIcon from 'components/Svg/SwapIcon'
import BridgeIcon from 'components/Svg/BridgeIcon'
import LiquidityIcon from 'components/Svg/LiquidityIcon'
import ReferralIcon from 'components/Svg/ReferralIcon'
import AssetIcon from 'components/Svg/AssetIcon'
import StableCoinIcon from 'components/Svg/StableCoinIcon'
import FarmingIcon from 'components/Svg/FarmingIcon'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean; showTooltip?: boolean }
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
      label: t('Trade'),
      href: ['/swap', '/bridge-token'],
      icon: CompanyIcon,
      fillIcon: SwapFillIcon,
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
          href: '/bridge-token',
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Earn'),
      href: ['/liquidity', '/add', '/remove', '/pools'],
      icon: CompanyIcon,
      fillIcon: SwapFillIcon,
      items: [
        {
          label: t('Liquidity'),
          href: '/liquidity',
          icon: LiquidityIcon,
          fillIcon: LiquidityIcon,
        },
        {
          label: t('Farming'),
          href: '/pools',
          icon: FarmingIcon,
          fillIcon: FarmingIcon,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    // {
    //   label: t('Bridge'),
    //   href: '/bridge-token',
    //   icon: SwapIcon,
    //   fillIcon: SwapFillIcon,
    //   showItemsOnMobile: false,
    //   items: [],
    // },
    // {
    //   label: t('Liquidity'),
    //   icon: SwapIcon,
    //   fillIcon: SwapFillIcon,
    //   href: '/liquidity',
    //   activeHref: ['/liquidity', '/add', '/remove'],
    //   showItemsOnMobile: false,
    //   items: [],
    // },
    {
      label: t('Stable Coin'),
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      href: '/stable-coin',
      showItemsOnMobile: false,
      items: [],
    },
    // {
    //   label: t('Farming'),
    //   href: '/pools',
    //   icon: EarnIcon,
    //   fillIcon: EarnFillIcon,
    //   image: '/images/decorations/pe2.png',
    //   // supportChainIds: SUPPORT_ONLY_BSC,
    //   items: [],
    // },
    {
      label: t('Referral'),
      href: '/referral',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      image: '/images/decorations/pe2.png',
      items: [],
    },
    {
      label: t('Pre-sales'),
      href: '/vesting',
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
      href: '/tokenomics',
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
      href: '/company',
      showItemsOnMobile: false,
      items: [],
    },
    {
      label: t('Products'),
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
          href: '/bridge-token',
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
        {
          label: 'XOX Super DEX 2.0',
          icon: '',
          fillIcon: '',
          href: '/#',
          showTooltip: true,
        },
        {
          label: 'XOX Mobile App/Wallet',
          icon: '',
          fillIcon: '',
          href: '/stable-coin',
          showTooltip: true,
        },
        {
          label: 'XOX Multi-Chain Launchpad',
          icon: '',
          fillIcon: 'StableCoinIcon',
          href: '/stable-coin',
          showTooltip: true,
        },
        {
          label: 'XOX Coin Listing/Ranking Site',
          icon: '',
          fillIcon: 'StableCoinIcon',
          href: '/stable-coin',
          showTooltip: true,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Dex V2'),
      href: '/dex-v2',
      icon: WhitepaperIcon,
      fillIcon: SwapFillIcon,
      showItemsOnMobile: false,
      items: [],
    },
    {
      label: t('Dex V2'),
      href: '/dex-v2',
      icon: WhitepaperIcon,
      fillIcon: SwapFillIcon,
      showItemsOnMobile: true,
      items: [
        {
          label: t('Swap'),
          href: '/swap',
          icon: SwapIcon,
          fillIcon: SwapIcon,
        },
      ],
      mobileOnly: true,
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
