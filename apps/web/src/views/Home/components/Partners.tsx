/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-boolean-value */
import styled, { keyframes } from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import SwiperCore, { Autoplay } from 'swiper'
import { useState } from 'react'
import useWindowSize from 'hooks/useWindowSize'

SwiperCore.use([Autoplay])

const translateinfinite = keyframes`
100% { transform:translateX(calc(-80px * 10))}

`

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
`

const SliderWrapper = styled.div`
  margin-bottom: 24px;
  
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
     {
      padding: 0 20px 0 20px;
    }
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
    height: 80px;
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
      transform: translateX(calc(-144px * 10));
    }
  }
  @keyframes translateinfinitetr {
    0% {
      transform: translateX(calc(-144px * 10));
    }
    100% {
      transform: translateX(calc(0));
    }
  }
  #infinite div.highway-barrier {
    box-shadow: 0 3px 10px -3px rgba(0, 0, 0, 0.3);
  }
  #infinite div.highway-barrier ul.highway-lane {
    width: calc(144px * 20);
  }
  #infinite.infinitetl div.highway-barrier ul.highway-lane li.highway-car {
    width: 80px;
    animation: translateinfinitetl 10s linear infinite;
  }
  #infinite.infinitetr div.highway-barrier ul.highway-lane li.highway-car {
    width: 80px;
    animation: translateinfinitetr 10s linear infinite;
  }
  #infinite.infinitetl.speed-20 div.highway-barrier ul.highway-lane li.highway-car {
    width: 80px;
    animation: translateinfinitetl 20s linear infinite;
  }
  #infinite.infinitetr.speed-20 div.highway-barrier ul.highway-lane li.highway-car {
    width: 80px;
    animation: translateinfinitetr 20s linear infinite;
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

      <SliderWrapper>
        <div id="infinite" className="infinitetl highway-slider">
          <div className="container highway-barrier">
            <ul className="highway-lane">
              {listPartners.map(({ icon }) => {
                return (
                  <li className="highway-car" key={icon}>
                    <img src={icon} alt="icon" />
                  </li>
                )
              })}
              {listPartners.map(({ icon }) => {
                return (
                  <li className="highway-car" key={icon}>
                    <img src={icon} alt="icon" />
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
                    <img src={icon} alt="icon" />
                  </li>
                )
              })}
              {listPartners.map(({ icon }) => {
                return (
                  <li className="highway-car" key={icon}>
                    <img src={icon} alt="icon" />
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
                    <img src={icon} alt="icon" />
                  </li>
                )
              })}
              {listPartners.map(({ icon }) => {
                return (
                  <li className="highway-car" key={icon}>
                    <img src={icon} alt="icon" />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </SliderWrapper>

      <SliderWrapper>
        <div id="infinite" className="infinitetr highway-slider">
          <div className="container highway-barrier">
            <ul className="highway-lane">
              {listPartners.map(({ icon }) => {
                return (
                  <li className="highway-car" key={icon}>
                    <img src={icon} alt="icon" />
                  </li>
                )
              })}
              {listPartners.map(({ icon }) => {
                return (
                  <li className="highway-car" key={icon}>
                    <img src={icon} alt="icon" />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </SliderWrapper>

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
]

export default Partners
