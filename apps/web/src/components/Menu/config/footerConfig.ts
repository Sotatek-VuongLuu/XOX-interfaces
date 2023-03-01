import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: 'Products',
    items: [
      {
        label: t('Swap'),
        href: '/swap',
      },
      {
        label: t('Bridge'),
        href: '/bridge-token',
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
      },
      {
        label: t('Farming'),
        href: '/pools',
      },
      {
        label: t('Referral'),
        href: '/referral',
      },
      {
        label: t('Asset'),
        href: '/info',
      },
      {
        label: t('Stable Coin'),
        href: '/stable-coin',
      },
    ],
  },
  {
    label: 'Support',
    items: [
      {
        label: t('Docs'),
        href: '/docs',
      },
      {
        label: t('Terms of Service'),
        href: '/terms-of-service',
      },
      {
        label: t('Privacy Policies'),
        href: '/privacy-policies',
      },
    ],
  },
  {
    label: 'Reach us',
    items: [
      {
        label: t('Hello@xox.co'),
        href: 'email://hello@xox.co',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9395 3C18.2805 3 19.5705 3.53 20.5195 4.481C21.4695 5.43 22.0005 6.71 22.0005 8.05V15.95C22.0005 18.74 19.7305 21 16.9395 21H7.06049C4.26949 21 2.00049 18.74 2.00049 15.95V8.05C2.00049 5.26 4.25949 3 7.06049 3H16.9395ZM18.5305 9.54L18.6105 9.46C18.8495 9.17 18.8495 8.75 18.5995 8.46C18.4605 8.311 18.2695 8.22 18.0705 8.2C17.8605 8.189 17.6605 8.26 17.5095 8.4L13.0005 12C12.4205 12.481 11.5895 12.481 11.0005 12L6.50049 8.4C6.18949 8.17 5.75949 8.2 5.50049 8.47C5.23049 8.74 5.20049 9.17 5.42949 9.47L5.56049 9.6L10.1105 13.15C10.6705 13.59 11.3495 13.83 12.0605 13.83C12.7695 13.83 13.4605 13.59 14.0195 13.15L18.5305 9.54Z" fill="url(#paint0_linear_11079_25619)"/>
        <defs>
        <linearGradient id="paint0_linear_11079_25619" x1="0.41633" y1="3" x2="26.4545" y2="5.69207" gradientUnits="userSpaceOnUse">
        <stop stop-color="#B809B5"/>
        <stop offset="0.510417" stop-color="#ED1C51"/>
        <stop offset="1" stop-color="#FFB000"/>
        </linearGradient>
        </defs>
        </svg>`,
      },
      {
        label: '+91 98765 43210',
        href: 'tel://+91 98765 43210',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.00846 10.6948C5.00846 10.0762 5.01591 9.45751 5.02339 8.836L5.02339 8.83599C5.02719 8.52089 5.03099 8.20506 5.03384 7.88813C5.03384 4.48283 7.16556 2 10.1094 2H13.8906C16.8344 2 18.9662 4.48283 18.9662 7.88813C18.9915 9.25221 19 10.6163 19 11.9902C19 13.3641 18.9915 14.7478 18.9662 16.1119C18.9662 19.5172 16.8344 22 13.8906 22H10.1094C7.16556 22 5.03384 19.5172 5.03384 16.1021C5.01692 14.8165 5 13.5015 5 12.1668L5.00846 10.6948ZM13.28 19.6402V19.8002C13.28 20.4738 12.7168 21.0002 12 21.0002C11.3003 21.0002 10.72 20.4738 10.72 19.8002V19.6402C10.72 18.9842 11.3003 18.4402 12 18.4402C12.7168 18.4402 13.28 18.9842 13.28 19.6402ZM7.01671 8.44364C7.01136 8.84763 7.00604 9.24974 7.00604 9.65186L7 10.6087C7 11.4762 7.01208 12.331 7.02417 13.1666C7.02417 15.3864 8.54683 17.0002 10.6495 17.0002H13.3505C15.4532 17.0002 16.9758 15.3864 16.9758 13.173C16.994 12.2863 17 11.3869 17 10.4939C17 9.60083 16.994 8.71418 16.9758 7.82753C16.9758 5.61408 15.4532 4.00024 13.3505 4.00024H10.6495C8.54683 4.00024 7.02417 5.61408 7.02417 7.82753C7.02214 8.03354 7.01942 8.23883 7.01671 8.44364Z" fill="url(#paint0_linear_11079_25626)"/>
        <defs>
        <linearGradient id="paint0_linear_11079_25626" x1="5" y1="23.5842" x2="8.43749" y2="-2.27536" gradientUnits="userSpaceOnUse">
        <stop stop-color="#B809B5"/>
        <stop offset="0.510417" stop-color="#ED1C51"/>
        <stop offset="1" stop-color="#FFB000"/>
        </linearGradient>
        </defs>
        </svg>`,
      },
      {
        label: '772 Lyonwood Ave',
        label2: 'Walnut, CA 91789',
        href: '/community-guildlines',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.03 2.00002C14.29 2.01002 16.45 2.91002 18.03 4.49002C19.62 6.08002 20.51 8.23002 20.5 10.46V10.51C20.44 13.54 18.74 16.33 16.62 18.51C15.42 19.74 14.09 20.83 12.64 21.75C12.25 22.08 11.68 22.08 11.29 21.75C9.14 20.35 7.24 18.59 5.7 16.54C4.35 14.76 3.58 12.62 3.5 10.39C3.52 5.74002 7.34 1.99002 12.03 2.00002ZM12.03 13.26C12.74 13.26 13.42 12.99 13.92 12.5C14.44 11.99 14.731 11.311 14.731 10.6C14.731 9.12002 13.52 7.93002 12.03 7.93002C10.54 7.93002 9.34 9.12002 9.34 10.6C9.34 12.061 10.52 13.24 12 13.26H12.03Z" fill="url(#paint0_linear_11079_25634)"/>
        <defs>
        <linearGradient id="paint0_linear_11079_25634" x1="2.15345" y1="2" x2="24.3836" y2="3.75848" gradientUnits="userSpaceOnUse">
        <stop stop-color="#B809B5"/>
        <stop offset="0.510417" stop-color="#ED1C51"/>
        <stop offset="1" stop-color="#FFB000"/>
        </linearGradient>
        </defs>
        </svg>`,
      },
    ],
  },
]
