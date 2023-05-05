/* eslint-disable react-hooks/exhaustive-deps */
import NotificationBanner from 'components/NotificationBanner'
import { log } from 'console'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const currentTimestamp = () => Math.round(new Date().getTime() / 1000)

interface ITimeLineArr {
  id: number
  name: string
  discription: string
  start: number
  end: number
  show?: boolean
  btnText: string
  href?: string
}

export function useNotificationHandle() {
  const [bannerAllowed, setBannerAllowed] = useState<ITimeLineArr[]>([])
  const route = useRouter()

  const bannerTimeLineArr = () => {
    const checkTimeAllow: ITimeLineArr[] = TIMELINEARRAY.map((item) => {
      if (item.start <= currentTimestamp() && currentTimestamp() <= item.end) {
        return {
          ...item,
          show: true,
        }
      }
      return item
    })
    const bannerTimeAllow: ITimeLineArr[] = checkTimeAllow.filter((item) => item.show === true)
    setBannerAllowed(bannerTimeAllow)
    return bannerTimeAllow
  }

  const onRemove = (id: number) => {
    const bannerTimeAllow = bannerTimeLineArr()
    const bannerTimeAllowFilter: ITimeLineArr[] = bannerTimeAllow.filter((item) => item.id !== id)
    setBannerAllowed(bannerTimeAllowFilter)
  }

  useEffect(() => {
    bannerTimeLineArr()
  }, [])

  if (route.query?.id && Number(route.query?.id) !== 0) {
    const id = Number(route.query?.id) < 10 ? Number(route.query?.id) : 9
    return (
      <NotificationBanner
        title={TIMELINEARRAY[id - 1].name}
        description={TIMELINEARRAY[id - 1].discription}
        id={TIMELINEARRAY[id - 1].id}
        btnText={TIMELINEARRAY[id - 1].btnText}
        href={TIMELINEARRAY[id - 1].href}
      />
    )
  }

  if (bannerAllowed.length) {
    return bannerAllowed.map((item) => {
      return (
        <NotificationBanner
          title={item.name}
          description={item.discription}
          onRemove={onRemove}
          id={item.id}
          btnText={item.btnText}
          href={item.href}
        />
      )
    })
  }

  return null
}

const TIMELINEARRAY: ITimeLineArr[] = [
  {
    id: 1,
    name: '$20K in XOX Tokens Airdrop + 20K XOXS Giveaway is Live!',
    discription: 'Total Prize $40,000',
    btnText: 'Participate Now',
    href: '/#',
    start: 0,
    end: 0,
  },
  {
    id: 2,
    name: 'How to invest in Pre-sale.',
    discription: 'Step-by-Step Tutorial.',
    btnText: 'Watch Now',
    href: '/#',
    start: 0,
    end: 0,
  },
  {
    id: 3,
    name: 'Partners Sale is Live!',
    discription: '$130k Raised on Seed-sale. Min.entry: 20,000 USDT - 10% XOXS Bonus.',
    btnText: 'Participate',
    href: '/#',
    start: 0,
    end: 0,
  },
  {
    id: 4,
    name: 'Pre-sale is Coming!',
    discription: '$130k Raised on Seed-sale. Min.entry: 50 USDT',
    btnText: 'Learn More',
    href: '/#',
    start: 0,
    end: 0,
  },
  {
    id: 5,
    name: 'Pre-sale Round 1 is live',
    discription: '$130k Raised on Seed-sale. Min.entry: 50 USDT - 8% XOXS Bonus',
    btnText: 'Participate',
    href: '/vesting',
    start: 0,
    end: 0,
  },
  {
    id: 6,
    name: 'Pre-sale Round 2 is live',
    discription: '$118k Raised on Round 1. Min.entry: 50 USDT - 6% XOXS Bonus',
    btnText: 'Participate',
    href: '/vesting',
    start: 0,
    end: 0,
  },
  {
    id: 7,
    name: 'Pre-sale Round 3 is live',
    discription: '$162k Raised on Round 2. Min.entry: 50 USDT - 4% XOXS Bonus',
    btnText: 'Participate',
    href: '/vesting',
    start: 0,
    end: 0,
  },
  {
    id: 8,
    name: 'Public ICO is Live!',
    discription: '$487k Raised on Pre-sales.',
    btnText: 'Participate',
    href: '/#',
    start: 0,
    end: 0,
  },
  {
    id: 9,
    name: 'Public Launch Incoming!',
    discription: '$2,683,800 Already Raised. Launching on 6 chains (ETH,BSC,ARB,POLYGON,OPT,zkSync)',
    btnText: 'Learn More',
    href: '/#',
    start: 0,
    end: 0,
  },
]
