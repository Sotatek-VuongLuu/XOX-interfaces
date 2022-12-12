/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-boolean-value */
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import SwiperCore, { Autoplay } from 'swiper'
import { useState } from 'react'
import useWindowSize from 'hooks/useWindowSize'

SwiperCore.use([Autoplay])

const Wrapper = styled.div`
  .main {
    display: flex;
    justify-content: center;
    overflow: hidden;
  }

  .swiper-wrapper {
    transition-timing-function: linear;
  }

  .title {
    text-align: center;
    font-weight: 700;
    font-size: 36px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 16px;

    @media screen and (max-width: 900px) {
      font-size: 20px;
    }
  }

  .decoration {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 48px;

    @media screen and (max-width: 900px) {
      font-size: 14px;
    }
  }

  .btn_see_all {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 100px;
  }

  .get_xox {
    cursor: pointer;
    padding: 1px;
    border-radius: 8px;
    background-image: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);

    .boxed-child {
      width: 100%;
      height: 100%;
      background-color: black;
      padding: 16px 40px;
      border-radius: inherit;
      span {
        background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        font-weight: 700;
        font-size: 18px;
        width: 100%;
        height: 100%;
        background-color: #191a28;
        border-radius: inherit;
      }
    }

    @media screen and (max-width: 900px) {
      font-size: 14px;

      .boxed-child {
        padding: 12px 30px;

        span {
          font-size: 16px;
        }
      }
    }
  }
`

const Partners = () => {
  const [isShowMore, setIsShowMore] = useState(false)
  const { width } = useWindowSize()

  const handleChangeShowMore = () => {
    setIsShowMore(!isShowMore)
  }
  return (
    <Wrapper>
      <div className="title">Strategic Partners</div>
      <p className="decoration">Backed by the Best to Deliver the Best.</p>

      <Swiper
        speed={1000}
        loop={true}
        slidesPerView={width < 900 ? 4 : 10}
        freeMode={true}
        spaceBetween={10}
        watchSlidesProgress={true}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
          waitForTransition: false,
        }}
        // modules={[Autoplay]}
        allowTouchMove={true}
      >
        {listPartners.map(({ icon }) => {
          return (
            <SwiperSlide>
              <img src={icon} alt="icon" />
            </SwiperSlide>
          )
        })}
      </Swiper>

      <Swiper
        speed={1000}
        loop={true}
        slidesPerView={width < 900 ? 4 : 10}
        freeMode={true}
        spaceBetween={10}
        watchSlidesProgress={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          waitForTransition: false,
          reverseDirection: true,
        }}
        // modules={[Autoplay]}
        allowTouchMove={true}
      >
        {listPartners.map(({ icon }) => {
          return (
            <SwiperSlide>
              <img src={icon} alt="icon" />
            </SwiperSlide>
          )
        })}
      </Swiper>

      <Swiper
        speed={1000}
        loop={true}
        slidesPerView={width < 900 ? 4 : 10}
        freeMode={true}
        spaceBetween={10}
        watchSlidesProgress={true}
        autoplay={{
          delay: 2,
          disableOnInteraction: false,
          waitForTransition: false,
        }}
        // modules={[Autoplay]}
        allowTouchMove={true}
      >
        {listPartners.map(({ icon }) => {
          return (
            <SwiperSlide>
              <img src={icon} alt="icon" />
            </SwiperSlide>
          )
        })}
      </Swiper>

      {isShowMore ? (
        <Swiper
          speed={1000}
          loop={true}
          slidesPerView={width < 900 ? 4 : 10}
          freeMode={true}
          spaceBetween={5}
          watchSlidesProgress={true}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            waitForTransition: false,
            reverseDirection: true,
          }}
          // modules={[Autoplay]}
          allowTouchMove={true}
        >
          {listPartners.map(({ icon }) => {
            return (
              <SwiperSlide>
                <img src={icon} alt="icon" />
              </SwiperSlide>
            )
          })}
        </Swiper>
      ) : null}

      <div className="btn_see_all">
        <div className="get_xox" onClick={handleChangeShowMore}>
          <div className="boxed-child">{isShowMore ? <span>See Less</span> : <span>See All</span>}</div>
        </div>
      </div>
    </Wrapper>
  )
}

const listPartners = [
  {
    icon: '/images/l1.svg',
  },
  {
    icon: '/images/l2.svg',
  },
  {
    icon: '/images/l3.svg',
  },

  {
    icon: '/images/l4.svg',
  },
  {
    icon: '/images/l5.svg',
  },
  {
    icon: '/images/l6.svg',
  },
  {
    icon: '/images/l7.svg',
  },
  {
    icon: '/images/l9.svg',
  },
  {
    icon: '/images/l14.svg',
  },
  {
    icon: '/images/l111.svg',
  },
  {
    icon: '/images/l1.svg',
  },
  {
    icon: '/images/l2.svg',
  },
  {
    icon: '/images/l3.svg',
  },

  {
    icon: '/images/l4.svg',
  },
  {
    icon: '/images/l5.svg',
  },
  {
    icon: '/images/l6.svg',
  },
  {
    icon: '/images/l7.svg',
  },
  {
    icon: '/images/l9.svg',
  },
  {
    icon: '/images/l14.svg',
  },
  {
    icon: '/images/l111.svg',
  },
]

export default Partners
