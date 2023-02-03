import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";
import { TwitterIcon, TelegramIcon, FacebookIcon, DiscordIcon, TelegramGroup, YoutubeIcon, TiktokIcon } from "../Svg";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Contact",
        href: "https://docs.xoxnet.io/contact-us",
      },
      {
        label: "Blog",
        href: "https://medium.com/xoxnet",
      },
      {
        label: "Community",
        href: "https://docs.xoxnet.io/contact-us/telegram",
      },
      {
        label: "CAKE",
        href: "https://docs.xoxnet.io/tokenomics/cake",
      },
      {
        label: "—",
      },
      {
        label: "Online Store",
        href: "https://xoxnet.creator-spring.com/",
        isHighlighted: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer",
        href: "Support https://docs.xoxnet.io/contact-us/customer-support",
      },
      {
        label: "Troubleshooting",
        href: "https://docs.xoxnet.io/help/troubleshooting",
      },
      {
        label: "Guides",
        href: "https://docs.xoxnet.io/get-started",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "https://github.com/xoxnet",
      },
      {
        label: "Documentation",
        href: "https://docs.xoxnet.io",
      },
      {
        label: "Bug Bounty",
        href: "https://app.gitbook.com/@xoxnet-1/s/xoxnet/code/bug-bounty",
      },
      {
        label: "Audits",
        href: "https://docs.xoxnet.io/help/faq#is-xoxnet-safe-has-xoxnet-been-audited",
      },
      {
        label: "Careers",
        href: "https://docs.xoxnet.io/hiring/become-a-chef",
      },
    ],
  },
];

export const socials = [
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: "https://twitter.com",
  },
  {
    label: "Telegram Group",
    icon: TelegramGroup,
    href: "https://reddit.com/r/",
  },
  {
    label: "Telegram",
    icon: TelegramIcon,
  },
  {
    label: "Discord",
    icon: DiscordIcon,
    href: "https://discord.gg/",
  },
  {
    label: "Youtube",
    icon: YoutubeIcon,
    href: "https://discord.gg/",
  },
  {
    label: "Tiktok",
    icon: TiktokIcon,
    href: "https://discord.gg/",
  },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
