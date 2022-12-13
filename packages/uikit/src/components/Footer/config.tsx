import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";
import { TwitterIcon, TelegramIcon, FacebookIcon, DiscordIcon, TelegramGroup, YoutubeIcon, TiktokIcon } from "../Svg";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Contact",
        href: "https://docs.pancakeswap.finance/contact-us",
      },
      {
        label: "Blog",
        href: "https://medium.com/pancakeswap",
      },
      {
        label: "Community",
        href: "https://docs.pancakeswap.finance/contact-us/telegram",
      },
      {
        label: "CAKE",
        href: "https://docs.pancakeswap.finance/tokenomics/cake",
      },
      {
        label: "—",
      },
      {
        label: "Online Store",
        href: "https://pancakeswap.creator-spring.com/",
        isHighlighted: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer",
        href: "Support https://docs.pancakeswap.finance/contact-us/customer-support",
      },
      {
        label: "Troubleshooting",
        href: "https://docs.pancakeswap.finance/help/troubleshooting",
      },
      {
        label: "Guides",
        href: "https://docs.pancakeswap.finance/get-started",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "https://github.com/pancakeswap",
      },
      {
        label: "Documentation",
        href: "https://docs.pancakeswap.finance",
      },
      {
        label: "Bug Bounty",
        href: "https://app.gitbook.com/@pancakeswap-1/s/pancakeswap/code/bug-bounty",
      },
      {
        label: "Audits",
        href: "https://docs.pancakeswap.finance/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited",
      },
      {
        label: "Careers",
        href: "https://docs.pancakeswap.finance/hiring/become-a-chef",
      },
    ],
  },
];

export const socials = [
  {
    label: "Twitter",
    icon: TwitterIcon,
    // href: "https://twitter.com/pancakeswap",
  },
  {
    label: "Telegram Group",
    icon: TelegramGroup,
    // href: "https://reddit.com/r/pancakeswap",
  },
  {
    label: "Telegram",
    icon: TelegramIcon,
    items: [
      {
        label: "English",
        // href: "https://t.me/pancakeswap",
      },
      {
        label: "Announcements",
        // href: "https://t.me/PancakeSwapAnn",
      },
    ],
  },
  {
    label: "Discord",
    icon: DiscordIcon,
    // href: "https://discord.gg/pancakeswap",
  },
  {
    label: "Youtube",
    icon: YoutubeIcon,
    // href: "https://discord.gg/pancakeswap",
  },
  {
    label: "Tiktok",
    icon: TiktokIcon,
    // href: "https://discord.gg/pancakeswap",
  },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
