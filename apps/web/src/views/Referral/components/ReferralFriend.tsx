import { Avatar, Box, Grid, Paper } from '@mui/material'
import React, { useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import useWindowSize from 'hooks/useWindowSize'

const WrapperLeft = styled(Box)`
  padding: 24px;
  background: #242424;
  border-radius: 10px;

  .title {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.87);

    @media screen and (max-width: 900px) {
      font-size: 18px;
      line-height: 24px;
    }
  }
`

const WrapperRight = styled(Box)`
  margin-top: 0 !important;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    width: 117px;
    height: 157px;
    left: 0px;
    top: 16px;
    background: linear-gradient(90deg, #121212 16.15%, rgba(18, 18, 18, 0) 100%);
  }

  &:after {
    content: '';
    position: absolute;
    width: 117px;
    height: 157px;
    right: 0;
    top: 16px;
    background: linear-gradient(90deg, #121212 15.1%, rgba(18, 18, 18, 0) 100%);
    transform: matrix(-1, 0, 0, 1, 0, 0);
  }

  .item {
    position: relative;
    background-size: 192px 172px;
    background-repeat: no-repeat;
    background-position: center;
    height: 172px;
    width: 192px;
    background: url(/images/item.svg);
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  }
  .item > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    top: -7px;

    .shadow {
      width: 110px;
      height: 17px;
      background: radial-gradient(50% 50% at 50% 50%, #000000 0%, rgba(48, 48, 48, 0) 100%);
    }

    .title {
      font-weight: 700;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      color: rgba(255, 255, 255, 0.87);
      margin-top: 8px;
      white-space: nowrap;
    }

    .btn {
      background: transparent;
      border: none;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: rgba(255, 255, 255, 0.38);
      margin-top: 16px;
    }
  }

  .swiper-slide-active item {
    background: url(/images/current_item.svg);
  }

  .swiper-button-next {
    background-image: url(/images/next.svg);
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
    border-radius: 50%;
  }

  .swiper-button-next::after {
    display: none;
  }

  .swiper-button-prev {
    background-image: url(/images/prev.svg);
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
  }

  .swiper-button-prev::after {
    display: none;
  }

  .swiper.swiper-initialized {
    padding-top: 16px;
  }

  .claim_total {
    display: flex;
    justify-content: center;
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
      border-radius: 4px;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
      padding: 10px 20px;
    }
    .unclaim_reward_container {
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
      padding: 1px;
      border-radius: 4px;
      margin-right: 16px;

      .unclaim_reward {
        width: 100%;
        height: 100%;
        background: black;
        border-radius: 4px;
        div {
          font-weight: 700;
          font-size: 14px;
          line-height: 17px;
          padding: 10px 20px;
          background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
      }
    }

    @media screen and (max-width: 900px) {
      flex-direction: column;
      .unclaim_reward_container {
        width: 100%;
        margin-bottom: 16px;
        .unclaim_reward {
          div {
            text-align: center;
          }
        }
      }
    }
  }
`

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 16px;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #444444;

  div:last-child {
    text-align: right;
  }
`
const TableBody = styled.div`
  & > div {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);
    align-items: center;
    margin-top: 16px;
  }

  & > div div:first-child {
    display: grid;
    grid-template-columns: 24px 1fr;
    gap: 8px;
    align-items: center;

    img {
      border-radius: 50%;
      width: 24px;
      height: 24px;
      object-fit: cover;
    }
  }

  & > div div:nth-child(2) {
    display: flex;
    align-items: center;
  }

  & > div div:last-child {
    text-align: right;
  }
`

const ReferralFriend = () => {
  const { width } = useWindowSize()

  function createData(avatar: string, name: string, point: number, code: number) {
    return { avatar, name, point, code }
  }

  const rows = [
    createData(
      'https://ss-images.saostar.vn/wwebp700/pc/1668184763837/saostar-zniwtnewidjz7yhb.jpg',
      'Ha Anh Tuan',
      100,
      10293,
    ),
    createData(
      'https://ss-images.saostar.vn/wwebp700/pc/1668184763837/saostar-zniwtnewidjz7yhb.jpg',
      'Kristin Watson',
      100,
      10293,
    ),
    createData(
      'https://ss-images.saostar.vn/wwebp700/pc/1668184763837/saostar-zniwtnewidjz7yhb.jpg',
      'Brooklyn Simmons',
      100,
      10293,
    ),
  ]

  const controlWidth = useMemo(() => {
    let slidesPerView = 5
    if (width < 900) {
      slidesPerView = 4
    }

    if (width < 698) {
      slidesPerView = 3
    }
    if (width < 534) {
      slidesPerView = 2
    }
    if (width < 376) {
      slidesPerView = 2
    }
    if (width < 368) {
      slidesPerView = 1
    }
    return slidesPerView
  }, [width])

  return (
    <Box sx={{ marginTop: '16px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <WrapperLeft>
            <p className="title">Referral friends</p>

            <div>
              <TableHeader>
                <div>User Name</div>
                <div>Referral Code</div>
                <div>Total Points</div>
              </TableHeader>
              <TableBody>
                {rows.map((row) => {
                  return (
                    <div key={row.name}>
                      <div>
                        <img src={row.avatar} alt={row.name} />
                        {row.name}
                      </div>
                      <div>
                        {row.code}
                        <img
                          src="/images/copy_purple.svg"
                          alt="copy_purple"
                          style={{ marginBottom: '-2px', marginLeft: '8px' }}
                        />
                      </div>
                      <div>{row.point}</div>
                    </div>
                  )
                })}
              </TableBody>
            </div>
          </WrapperLeft>
        </Grid>
        <Grid item xs={12} md={8}>
          <WrapperRight sx={{ marginTop: '16px' }}>
            <Swiper
              slidesPerView={controlWidth}
              modules={[Navigation, Pagination, A11y]}
              navigation
              scrollbar={{ draggable: true }}
            >
              {listLever.map((item) => {
                return (
                  <SwiperSlide key={item.icon}>
                    <div className="item" key={item.icon}>
                      <div>
                        <img src={item.icon} alt="icons" className="jewellery" />

                        <div className="shadow" />

                        <p className="title">{item.point}</p>
                        <button type="button" className="btn">
                          Claim
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>

            <div className="claim_total">
              <div className="unclaim_reward_container">
                <div className="unclaim_reward">
                  <div>10,000$ Unclaimed Rewards</div>
                </div>
              </div>

              <button type="button">Claim All</button>
            </div>
          </WrapperRight>
        </Grid>
      </Grid>
    </Box>
  )
}

const listLever = [
  {
    icon: '/images/lever_1.svg',
    point: '100 points ~ 10$',
  },
  {
    icon: '/images/lever_2.svg',
    point: '500 points ~ 50$',
  },
  {
    icon: '/images/lever_3.svg',
    point: '1,000 points ~ 100$',
  },
  {
    icon: '/images/lever_4.svg',
    point: '5,000 points ~ 300$',
  },
  {
    icon: '/images/lever_5.svg',
    point: '10,000 points ~ 1,000$',
  },
  {
    icon: '/images/lever_6.svg',
    point: '50,000 points ~ 2,000$',
  },
  {
    icon: '/images/lever_7.svg',
    point: '100,000 points ~ 5,000$',
  },
  {
    icon: '/images/lever_8.svg',
    point: '100,000 points ~ 5,000$',
  },
  {
    icon: '/images/lever_9.svg',
    point: '100,000 points ~ 5,000$',
  },
]

export default ReferralFriend
