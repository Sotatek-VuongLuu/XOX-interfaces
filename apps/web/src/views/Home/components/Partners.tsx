/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-boolean-value */
import styled from 'styled-components'
import 'swiper/css'
import SwiperCore, { Autoplay } from 'swiper'
import { useState } from 'react'
import useWindowSize from 'hooks/useWindowSize'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

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
      margin-top: 32px;
    }
  }

  .decoration {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    color: #fb8618;

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

    @media screen and (max-width: 900px) {
      margin: 56px 0px 64px;
    }
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

  .slide_container {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 117px;
      left: -1px;
      background: linear-gradient(90deg, #0a0a0a 0%, rgba(10, 10, 10, 0) 100%);
      z-index: 99;
    }

    &::after {
      content: '';
      position: absolute;
      height: 100%;
      right: -1px;
      top: 0;
      width: 117px;
      background: linear-gradient(90deg, #0a0a0a 0%, rgba(10, 10, 10, 0) 70.83%);
      transform: matrix(-1, 0, 0, 1, 0, 0);
      z-index: 99;
    }

    @media (max-width: 560px) {
      &::before {
        width: 70px;
      }

      &::after {
        width: 70px;
      }
    }
  }

  @media (max-width: 560px) {
    .slide_container {
      width: 100vw;
      max-width: 100%;
      margin: -20px;
    }
  }
`

const SliderWrapper = styled.div`

  div.container {
    transition: all 0.3s ease;
  }
  div.container h1 {
    margin: 15px 0 0 0;
  }
  div.container h3 {
    margin: 0 0 25px 0;
  }
  @media (max-width: 992px) {
    padding: 0;
  }
  .slide-option {
    margin: 0 0 50px 0;
  }
  .slide-option .no-marg {
    margin: 0 0 0 0;
  }
  div.highway-slider {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 120px;

    @media (max-width: 560px) {
      height: 100px;
    }
  }
  div.highway-slider div.highway-barrier {
    overflow: hidden;
    position: relative;
  }
  div.highway-slider ul.highway-lane {
    display: flex;
    height: 100%;
  }
  div.highway-slider ul.highway-lane li.highway-car {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(20, 1fr)
    gap: 64px;
    justify-content: center;
    align-items: center;
    color: #343434;
  }
  
  @keyframes translateinfinitetl {
    100% {
      transform: translateX(calc(-160px * 10));
    }
  }
  @keyframes translateinfinitetr {
    0% {
      transform: translateX(calc(-160px * 10));
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes scale1 {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  #infinite div.highway-barrier {
    box-shadow: 0 3px 10px -3px rgba(0, 0, 0, 0.3);
  }
  #infinite div.highway-barrier ul.highway-lane {
    width: calc(160px * 20);
    &:hover li.highway-car{
      animation-play-state: paused !important;
    }
    & img.partner:hover {
      animation: scale1 2.8s infinite;
    }

    & img {
      cursor: pointer;
    }
  }
  #infinite.infinitetl div.highway-barrier ul.highway-lane li.highway-car {
    width: 80px;
    animation: translateinfinitetl 23s linear infinite;
  }
  #infinite.infinitetr div.highway-barrier ul.highway-lane li.highway-car {
    width: 80px;
    animation: translateinfinitetr 23s linear infinite;
  }
  #infinite.infinitetl.speed-20 div.highway-barrier ul.highway-lane li.highway-car {
    width: 80px;
    animation: translateinfinitetl 23s linear infinite;
  }
  #infinite.infinitetr.speed-20 div.highway-barrier ul.highway-lane li.highway-car {
    width: 80px;
    animation: translateinfinitetr 23s linear infinite;
  }
`

const Partners = () => {
  const { t } = useTranslation()
  const [isShowMore, setIsShowMore] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseOver = () => {
    setIsHovering(true)
  }

  const handleMouseOut = () => {
    setIsHovering(false)
  }

  const { isMobile } = useMatchBreakpoints()

  const handleChangeShowMore = () => {
    setIsShowMore(!isShowMore)
  }

  return (
    <Wrapper>
      <div className="title" data-aos="fade-up">
        {t('Strategic Partners')}
      </div>
      <p className="decoration" data-aos="fade-up" data-aos-duration="2300">
        {t('Backed by the Best to Deliver the Best.')}
      </p>

      <div className="slide_container">
        <SliderWrapper data-aos="fade-up">
          <div id="infinite" className="infinitetl highway-slider">
            <div className="container highway-barrier">
              <ul className="highway-lane">
                {listPartners.map(({ icon }) => {
                  return (
                    <li className="highway-car" key={icon}>
                      <img
                        src={icon}
                        alt="icon"
                        className={isHovering ? 'partner' : ''}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                      />
                    </li>
                  )
                })}
                {listPartners.map(({ icon }) => {
                  return (
                    <li className="highway-car" key={icon}>
                      <img
                        src={icon}
                        alt="icon"
                        className={isHovering ? 'partner' : ''}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                      />
                    </li>
                  )
                })}
                {isMobile &&
                  listPartners.map(({ icon }) => {
                    return (
                      <li className="highway-car" key={icon}>
                        <img
                          src={icon}
                          alt="icon"
                          className={isHovering ? 'partner' : ''}
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        />
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
        </SliderWrapper>

        <SliderWrapper>
          <div id="infinite" className="infinitetr speed-20 highway-slider">
            <div className="container highway-barrier">
              <ul className="highway-lane">
                {listPartners.map(({ icon }) => {
                  return (
                    <li className="highway-car" key={icon}>
                      <img
                        src={icon}
                        alt="icon"
                        className={isHovering ? 'partner' : ''}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                      />
                    </li>
                  )
                })}
                {listPartners.map(({ icon }) => {
                  return (
                    <li className="highway-car" key={icon}>
                      <img
                        src={icon}
                        alt="icon"
                        className={isHovering ? 'partner' : ''}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                      />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </SliderWrapper>

        <SliderWrapper>
          <div id="infinite" className="infinitetl speed-20 highway-slider">
            <div className="container highway-barrier">
              <ul className="highway-lane">
                {listPartners.map(({ icon }) => {
                  return (
                    <li className="highway-car" key={icon}>
                      <img
                        src={icon}
                        alt="icon"
                        className={isHovering ? 'partner' : ''}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                      />
                    </li>
                  )
                })}
                {listPartners.map(({ icon }) => {
                  return (
                    <li className="highway-car" key={icon}>
                      <img
                        src={icon}
                        alt="icon"
                        className={isHovering ? 'partner' : ''}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                      />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </SliderWrapper>

        {isShowMore ? (
          <SliderWrapper>
            <div id="infinite" className="infinitetr highway-slider">
              <div className="container highway-barrier">
                <ul className="highway-lane">
                  {listPartners.map(({ icon }) => {
                    return (
                      <li className="highway-car" key={icon}>
                        <img
                          src={icon}
                          alt="icon"
                          className={isHovering ? 'partner' : ''}
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        />
                      </li>
                    )
                  })}
                  {listPartners.map(({ icon }) => {
                    return (
                      <li className="highway-car" key={icon}>
                        <img
                          src={icon}
                          alt="icon"
                          className={isHovering ? 'partner' : ''}
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </SliderWrapper>
        ) : null}
      </div>

      <div className="btn_see_all" data-aos="fade-up" style={{ display: 'none' }}>
        <div className="get_xox" onClick={handleChangeShowMore}>
          <div className="boxed-child">{isShowMore ? <span>See Less</span> : <span>See All</span>}</div>
        </div>
      </div>
    </Wrapper>
  )
}

const listPartners = [
  {
    icon: '/images/partners/airbnb_partner.svg',
  },
  {
    icon: '/images/partners/microsoft_partner.svg',
  },
  {
    icon: '/images/partners/walmart_partner.svg',
  },
  {
    icon: '/images/partners/hubspot_partner.svg',
  },
  {
    icon: '/images/partners/google_partner.svg',
  },
  {
    icon: '/images/partners/fedex_partner.svg',
  },
  {
    icon: '/images/partners/airbnb_partner.svg',
  },
  {
    icon: '/images/partners/google_partner.svg',
  },
  {
    icon: '/images/partners/microsoft_partner.svg',
  },
  {
    icon: '/images/partners/hubspot_partner.svg',
  },
]

export default Partners
