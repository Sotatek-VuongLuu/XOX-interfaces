import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: 'Company',
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
        label: t('Terms & Privacy'),
        href: '/terms-privacy',
      },
      {
        label: t('Disclaimer'),
        href: '/disclaimer',
      },
    ],
  },
  {
    label: 'Reach us',
    items: [
      {
        label: t('hello@xox.co'),
        href: 'email://hello@xox.co',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9395 3C18.2805 3 19.5705 3.53 20.5195 4.481C21.4695 5.43 22.0005 6.71 22.0005 8.05V15.95C22.0005 18.74 19.7305 21 16.9395 21H7.06049C4.26949 21 2.00049 18.74 2.00049 15.95V8.05C2.00049 5.26 4.25949 3 7.06049 3H16.9395ZM18.5305 9.54L18.6105 9.46C18.8495 9.17 18.8495 8.75 18.5995 8.46C18.4605 8.311 18.2695 8.22 18.0705 8.2C17.8605 8.189 17.6605 8.26 17.5095 8.4L13.0005 12C12.4205 12.481 11.5895 12.481 11.0005 12L6.50049 8.4C6.18949 8.17 5.75949 8.2 5.50049 8.47C5.23049 8.74 5.20049 9.17 5.42949 9.47L5.56049 9.6L10.1105 13.15C10.6705 13.59 11.3495 13.83 12.0605 13.83C12.7695 13.83 13.4605 13.59 14.0195 13.15L18.5305 9.54Z" fill="url(#paint0_linear_5984_9736)"/>
        <defs>
        <linearGradient id="paint0_linear_5984_9736" x1="2.00049" y1="3" x2="24.7749" y2="7.77929" gradientUnits="userSpaceOnUse">
        <stop stop-color="#6473FF"/>
        <stop offset="1" stop-color="#A35AFF"/>
        </linearGradient>
        </defs>
        </svg>`,
      },
      {
        label: '+91 98765 43210',
        href: 'tel://+91 98765 43210',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="20" viewBox="0 0 14 20" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.00845931 8.69458C0.00845931 8.07594 0.015909 7.4573 0.0233933 6.83578L0.0233934 6.83577C0.0271878 6.52068 0.030991 6.20485 0.0338368 5.88791C0.0338368 2.48261 2.16556 -0.000213623 5.10936 -0.000213623H8.89063C11.8344 -0.000213623 13.9662 2.48261 13.9662 5.88791C13.9915 7.25199 14 8.61608 14 9.98997C14 11.3639 13.9915 12.7476 13.9662 14.1117C13.9662 17.517 11.8344 19.9998 8.89063 19.9998H5.10936C2.16556 19.9998 0.0338368 17.517 0.0338368 14.1018C0.0169184 12.8163 0 11.5013 0 10.1666L0.00845931 8.69458ZM8.28 17.64V17.8C8.28 18.4736 7.7168 19 7 19C6.30027 19 5.72 18.4736 5.72 17.8V17.64C5.72 16.984 6.30027 16.44 7 16.44C7.7168 16.44 8.28 16.984 8.28 17.64ZM2.01671 6.44343C2.01136 6.84741 2.00604 7.24953 2.00604 7.65165L2 8.60847C2 9.47599 2.01208 10.3307 2.02417 11.1664C2.02417 13.3862 3.54683 15 5.64955 15H8.35045C10.4532 15 11.9758 13.3862 11.9758 11.1727C11.994 10.2861 12 9.38668 12 8.49365C12 7.60062 11.994 6.71397 11.9758 5.82731C11.9758 3.61387 10.4532 2.00003 8.35045 2.00003H5.64955C3.54683 2.00003 2.02417 3.61387 2.02417 5.82731C2.02214 6.03333 2.01942 6.23862 2.01671 6.44343Z" fill="url(#paint0_linear_5984_9744)"/>
        <defs>
        <linearGradient id="paint0_linear_5984_9744" x1="0" y1="19.9998" x2="5.98008" y2="-2.16408" gradientUnits="userSpaceOnUse">
        <stop stop-color="#6473FF"/>
        <stop offset="1" stop-color="#A35AFF"/>
        </linearGradient>
        </defs>
        </svg>`,
      },
      {
        label: '772 Lyonwood Ave',
        label2: 'Walnut, CA 91789',
        href: '/community-guildlines',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.03 3.98276e-05C11.29 0.0100398 13.45 0.91004 15.03 2.49004C16.62 4.08004 17.51 6.23004 17.5 8.46004V8.51004C17.44 11.54 15.74 14.33 13.62 16.51C12.42 17.74 11.09 18.83 9.64 19.75C9.25 20.08 8.68 20.08 8.29 19.75C6.14 18.35 4.24 16.59 2.7 14.54C1.35 12.76 0.58 10.62 0.5 8.39004C0.52 3.74004 4.34 -0.00996017 9.03 3.98276e-05ZM9.03 11.26C9.74 11.26 10.42 10.99 10.92 10.5C11.44 9.99004 11.731 9.31104 11.731 8.60004C11.731 7.12004 10.52 5.93004 9.03 5.93004C7.54 5.93004 6.34 7.12004 6.34 8.60004C6.34 10.061 7.52 11.24 9 11.26H9.03Z" fill="url(#paint0_linear_5984_9752)"/>
        <defs>
        <linearGradient id="paint0_linear_5984_9752" x1="0.5" y1="0" x2="20.203" y2="3.16351" gradientUnits="userSpaceOnUse">
        <stop stop-color="#6473FF"/>
        <stop offset="1" stop-color="#A35AFF"/>
        </linearGradient>
        </defs>
        </svg>`,
      },
    ],
  },
]
