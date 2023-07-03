import { useTranslation } from '@pancakeswap/localization'
import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const Wrapper = styled.div<{ testMode: boolean }>`
  position: fixed;
  width: fit-content;
  height: fit-content;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${({ testMode }) => (testMode ? 'none' : 'grid')};
  place-content: center;
  z-index: 9999;

  .main-content {
    display: inline-flex;
    padding: 32px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    border-radius: 20px;
    background: #101010;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    position: relative;

    &:before {
      display: block;
      content: '';
      position: absolute;
      border-radius: 20px;
      top: -1px;
      left: -1px;
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      z-index: -1;
      background: linear-gradient(90deg, #ee0979 0%, #ff6a00 100%);
    }
  }

  h2 {
    color: rgba(255, 255, 255, 0.87);
    font-size: 20px;
    font-family: Inter;
    font-weight: 700;
  }

  .description {
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
    font-size: 16px;
    font-family: Inter;
    line-height: 24px;
  }

  .logo-name {
    color: #fff;
    font-size: 18px;
    font-family: Inter;
    margin-top: 18px;
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
    list-style-type: none;
    padding: none;
    margin: none;
    margin-top: 4px;
  }

  li a {
    display: flex;
    width: 200px;
    height: 142px;
    padding: 24px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 16px;
    background: #1d1c1c;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    transition: all;

    &:hover {
      animation: scale-animation 2s linear 0s infinite;
    }
  }

  li .fill-white path {
    fill: white !important;
  }

  li .fill-auto {
    display: none;
  }

  li:hover .fill-white {
    display: none;
  }

  li:hover .fill-auto {
    display: block;
  }

  @keyframes scale-animation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02);
      box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 10px 5px;
    }
    100% {
      transform: scale(1);
    }
  }

  @media screen and (max-width: 560px) {
    .main-content {
      padding: 24px 12px;
    }

    .description {
      color: rgba(255, 255, 255, 0.6);
      text-align: center;
      font-size: 14px;
      font-family: Inter;
      line-height: 17px;
    }

    ul {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      list-style-type: none;
      padding: none;
      margin: none;
      margin-top: 4px;
    }

    li a {
      display: flex;
      width: 150px;
      height: 112px;
      padding: 24px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      border-radius: 16px;
      background: #1d1c1c;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      cursor: pointer;
      transition: all;

      &:hover {
        animation: scale-animation 2s linear 0s infinite;
      }
    }

    .logo-name {
      font-size: 16px;
      margin-top: 0;
    }
  }
`

const DeploymentComing = () => {
  const {t} = useTranslation();
  const element = document.querySelector('#modal-popup-deployment-coming')

  return createPortal(
    <Wrapper testMode={process.env.NEXT_PUBLIC_TEST_MODE === '1'}>
      <div className="main-content">
        <h2>{t("Deployment Coming")}</h2>
        <p className="description" dangerouslySetInnerHTML={{__html: t("Meanwhile explore the ecosystem, participate in <br /> airdrops and join the community!")}} />
        <ul className="item-list">
          {listItems.map((item) => {
            return (
              <li key={item.title}>
                <a href={item.href} target="_blank">
                  <span className="fill-white">{item.image}</span>
                  <span className="fill-auto">{item.image}</span>
                  <p className="logo-name">{item.title}</p>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </Wrapper>,
    element,
  )
}

const listItems = [
  {
    image: (
      <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
        <path
          d="M44.5 9.66938C42.9173 10.3872 41.2113 10.8589 39.4436 11.0845C41.2524 9.99752 42.6501 8.27478 43.3078 6.2034C41.6018 7.22884 39.7108 7.94664 37.717 8.35682C36.0932 6.59306 33.8117 5.56763 31.2218 5.56763C26.3915 5.56763 22.445 9.50531 22.445 14.3659C22.445 15.0632 22.5272 15.74 22.6711 16.3757C15.3537 16.0066 8.83795 12.4996 4.50096 7.18782C3.74044 8.47987 3.3088 9.99752 3.3088 11.5972C3.3088 14.653 4.85038 17.3602 7.2347 18.8983C5.77533 18.8983 4.41874 18.4881 3.22658 17.8729V17.9344C3.22658 22.2002 6.26864 25.7687 10.2973 26.5686C9.00389 26.9218 7.64599 26.9709 6.33031 26.7121C6.88858 28.4605 7.98194 29.9903 9.45668 31.0865C10.9314 32.1828 12.7134 32.7903 14.5521 32.8238C11.4353 35.2857 7.57179 36.6165 3.59656 36.5974C2.89771 36.5974 2.19885 36.5563 1.5 36.4743C5.40535 38.9764 10.0507 40.4325 15.0249 40.4325C31.2218 40.4325 40.1219 27.0198 40.1219 15.3913C40.1219 15.0016 40.1219 14.6325 40.1013 14.2428C41.8279 13.0123 43.3078 11.4536 44.5 9.66938V9.66938Z"
          fill="#1D9BF0"
        />
      </svg>
    ),
    title: '@Xox_Labs',
    href: 'https://twitter.com/Xox_Labs',
  },
  {
    image: (
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44" fill="none">
        <path
          id="Vector"
          d="M21.0711 29.4563H14.9591V43.5H21.0711V29.4563ZM35.2002 15.0618H24.8003L32.1936 7.88954L28.1027 3.60959L21.0545 10.9824V0.5H14.9428V10.9824L7.89468 3.62638L3.80694 7.88954L11.1968 15.045H0.800198V20.9634H11.2561L3.81659 28.3194L7.89468 32.4993L17.9986 22.1671L28.1027 32.4993L32.1936 28.3364L24.7512 20.9801H35.2002V15.0618Z"
          fill="#3EDC5C"
        />
      </svg>
    ),
    title: 'linktr.ee/xoxlabs',
    href: null,
  },
  {
    image: (
      <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
        <path
          d="M21.9198 25.1412L28.4281 31.6495C29.0081 32.2295 29.3342 33.0163 29.3342 33.8366V33.8375C29.3342 35.5459 27.9493 36.9316 26.2401 36.9316H26.0487C25.2284 36.9316 24.4416 36.6055 23.8616 36.0255L17.5438 29.7077C16.9638 29.1277 16.6377 28.3409 16.6377 27.5206V27.3292C16.6377 25.6209 18.0226 24.2351 19.7318 24.2351H19.7327C20.553 24.2351 21.3398 24.5612 21.9198 25.1412Z"
          fill="white"
        />
        <path
          d="M44.5002 27.3292V27.5214C44.5002 28.3417 44.1742 29.1285 43.5941 29.7094L37.2763 36.0264C36.6963 36.6064 35.9095 36.9325 35.0892 36.9325H34.8978C33.1895 36.9325 31.8037 35.5476 31.8037 33.8384V33.8375C31.8037 33.0172 32.1298 32.2304 32.7098 31.6495L39.2189 25.1412C39.799 24.5612 40.5858 24.2351 41.4061 24.2351C43.1153 24.2351 44.5002 25.62 44.5002 27.3292Z"
          fill="white"
        />
        <path
          d="M26.0487 9.06763H26.2409C27.9493 9.06763 29.3351 10.4525 29.3351 12.1617C29.3351 12.982 29.009 13.7689 28.429 14.3489L21.9207 20.858C21.3406 21.4381 20.5538 21.7641 19.7327 21.7641H19.7318C18.0234 21.7641 16.6377 20.3792 16.6377 18.67V18.4787C16.6377 17.6584 16.9638 16.8716 17.5438 16.2915L23.8607 9.97372C24.4408 9.39369 25.2276 9.06763 26.0487 9.06763Z"
          fill="white"
        />
        <path
          d="M44.5002 18.4785V18.6707C44.5002 20.3791 43.1153 21.7649 41.4061 21.7649C40.5858 21.7649 39.799 21.4388 39.2189 20.8588L32.7098 14.3496C32.1298 13.7696 31.8037 12.9828 31.8037 12.1625C31.8037 10.4541 33.1886 9.06836 34.8978 9.06836H35.09C35.9103 9.06836 36.6971 9.39442 37.2772 9.97446L43.5941 16.2914C44.1742 16.8706 44.5002 17.6574 44.5002 18.4785Z"
          fill="white"
        />
        <path
          d="M14.1965 27.3292V27.5214C14.1965 28.3417 13.8704 29.1285 13.2904 29.7094L6.97261 36.0264C6.39257 36.6064 5.60575 36.9325 4.78546 36.9325H4.59411C2.88574 36.9325 1.5 35.5476 1.5 33.8384V33.8375C1.5 33.0172 1.82606 32.2304 2.4061 31.6495L8.91523 25.1412C9.49527 24.5612 10.2821 24.2351 11.1024 24.2351C12.8116 24.2351 14.1965 25.62 14.1965 27.3292Z"
          fill="white"
        />
        <path
          d="M14.1965 18.4785V18.6707C14.1965 20.3791 12.8116 21.7649 11.1024 21.7649C10.2821 21.7649 9.49527 21.4388 8.91523 20.8588L2.4061 14.3496C1.82606 13.7696 1.5 12.9828 1.5 12.1625C1.5 10.4541 2.88489 9.06836 4.59411 9.06836H4.78631C5.60661 9.06836 6.39343 9.39442 6.97347 9.97446L13.2904 16.2914C13.8704 16.8706 14.1965 17.6574 14.1965 18.4785Z"
          fill="white"
        />
      </svg>
    ),
    title: 'Pre-Sale',
    href: '/pre-sales',
  },
  {
    image: (
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="34" viewBox="0 0 44 34" fill="none">
        <path
          id="image 26 (Traced)"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.6884 0.661418C12.2455 1.19098 9.46656 2.09455 7.51862 2.9926L7.0252 3.2201L6.43483 4.16746C3.48455 8.90233 1.76262 13.3971 0.923637 18.5534C0.57974 20.6669 0.427437 23.4674 0.533006 25.735C0.573272 26.5985 0.625291 27.4705 0.648658 27.6728L0.69115 28.0405L1.41267 28.555C3.65715 30.1554 6.18948 31.5461 8.68815 32.5509C9.35932 32.8207 11.4858 33.5857 11.5648 33.5857C11.6128 33.5857 12.5131 32.2288 12.9511 31.4964C13.4163 30.7184 13.9166 29.7654 13.8757 29.735C13.8637 29.7261 13.6661 29.6443 13.4366 29.5532C12.8362 29.3151 11.5285 28.6864 10.8441 28.3069L10.2557 27.9806L10.4553 27.8139C10.565 27.7222 10.7654 27.5672 10.9006 27.4694L11.1463 27.2917L11.9558 27.6406C14.2594 28.6337 16.9537 29.3362 19.5913 29.6315C20.63 29.7478 23.4375 29.7484 24.4594 29.6325C27.0923 29.3342 29.7365 28.6431 31.9873 27.6651L32.8736 27.2799L33.2965 27.6179C33.6875 27.9303 33.7099 27.9631 33.5924 28.0512C33.3625 28.2237 31.3217 29.2428 30.7184 29.4863C30.3933 29.6175 30.1154 29.7329 30.1008 29.7427C30.0413 29.7829 30.9862 31.4313 31.6651 32.4716C32.065 33.0844 32.4001 33.5857 32.4096 33.5857C32.4192 33.5857 32.9266 33.4151 33.5373 33.2066C36.5019 32.1943 39.31 30.7896 41.9151 29.0156C43.451 27.9697 43.3154 28.1169 43.3809 27.4237C43.5843 25.2721 43.5222 22.0606 43.232 19.7206C42.5381 14.1255 40.5221 8.66853 37.3881 3.90232L36.9179 3.18721L36.2696 2.89802C34.1038 1.93206 31.4405 1.09138 28.9499 0.587564C28.2373 0.443395 28.0386 0.424295 27.992 0.49546C27.8578 0.700183 26.963 2.59617 26.963 2.67575C26.963 2.73765 26.8728 2.74954 26.6449 2.71777C24.967 2.48383 24.0976 2.43113 21.9558 2.43354C19.829 2.43587 18.996 2.4873 17.4325 2.71254L17.1167 2.75809L16.5454 1.58324C16.2312 0.937093 15.9352 0.411138 15.8876 0.414321C15.84 0.417575 15.3004 0.528779 14.6884 0.661418ZM15.6903 14.3825C16.9218 14.6778 17.9967 15.7135 18.4644 17.0554C18.6994 17.7297 18.7576 19.0132 18.5868 19.756C18.2563 21.1933 17.177 22.4394 15.9205 22.8342C15.2753 23.0369 14.3505 23.0252 13.7417 22.8065C12.7769 22.4601 11.9995 21.7391 11.5204 20.7463C11.157 19.9932 11.0373 19.4754 11.0373 18.656C11.0373 15.8331 13.253 13.7981 15.6903 14.3825ZM29.8222 14.3454C31.1883 14.6073 32.4453 15.872 32.8446 17.3862C32.9922 17.9461 33.0101 19.1625 32.8789 19.7206C32.6684 20.6152 32.0818 21.6007 31.4371 22.1427C30.6957 22.7658 29.9618 23.0061 28.9411 22.96C28.3085 22.9314 28.1765 22.901 27.7191 22.679C26.4853 22.0799 25.6875 21.0285 25.4028 19.6258C25.1785 18.5215 25.3073 17.5347 25.8114 16.4957C26.0639 15.9752 26.22 15.7598 26.6313 15.3638C27.5748 14.4555 28.6337 14.1175 29.8222 14.3454Z"
          fill="#5562EA"
        />
      </svg>
    ),
    title: '@Xox_Labs',
    href: 'https://discord.com/xoxlabs',
  },
  {
    image: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="36" viewBox="0 0 40 36" fill="none">
        <path
          id="Vector"
          d="M36.5912 0.536089C36.5912 0.536089 40.2911 -1.00295 39.9816 2.73443C39.8797 4.27347 38.955 9.66062 38.235 15.4866L35.7683 32.7462C35.7683 32.7462 35.5626 35.2747 33.7122 35.7146C31.8627 36.1535 29.0875 34.1756 28.5732 33.7357C28.1618 33.4055 20.8647 28.4583 18.2953 26.0405C17.5753 25.3802 16.7524 24.0616 18.3981 22.5225L29.1894 11.5288C30.4227 10.2102 31.656 7.13213 26.517 10.8695L12.1268 21.3126C12.1268 21.3126 10.482 22.4128 7.39922 21.4234L0.717413 19.224C0.717413 19.224 -1.74922 17.5753 2.46501 15.9265C12.7439 10.7598 25.3866 5.48337 36.5893 0.536089H36.5912Z"
          fill="#0088CC"
        />
      </svg>
    ),
    title: '@xoxlabsofficial',
    href: 'https://t.me/xoxlabsofficial',
  },
  {
    image: (
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="42" viewBox="0 0 44 42" fill="none">
        <g id="png-clipart-computer-icons-airdrop-others-angle-logo 1" clip-path="url(#clip0_892_5800)">
          <path
            id="Vector"
            d="M21.9626 2.81544C23.006 4.13862 23.7118 5.50256 24.2875 6.93413C25.3606 9.60303 25.9686 12.3838 26.3193 15.2331C26.6203 17.6852 26.6918 20.1425 26.6753 22.6077C26.6709 23.3109 26.6744 24.0141 26.6979 24.7164C26.7067 24.9792 26.6063 25.1318 26.3978 25.2748C25.2978 26.0327 24.0642 26.4272 22.7495 26.5373C20.9855 26.6847 19.3219 26.3318 17.7978 25.3971C17.4602 25.1899 17.3023 24.9592 17.3163 24.5369C17.3922 22.1559 17.3547 19.7688 17.5073 17.393C17.776 13.2058 18.5987 9.13047 20.483 5.33087C20.9035 4.48373 21.4418 3.69381 21.9635 2.81458L21.9626 2.81544Z"
            fill="white"
          />
          <path
            id="Vector_2"
            d="M19.4909 3.229C17.8116 6.0722 16.8738 9.13303 16.2657 12.3109C15.5163 16.2276 15.4212 20.1867 15.4893 24.1554C15.4954 24.4996 15.4038 24.6991 15.0801 24.8517C12.7997 25.9286 10.5359 25.9182 8.27638 24.797C8.06265 24.6912 7.96407 24.5577 7.97105 24.2985C8.01467 22.6969 7.94749 21.0876 8.08533 19.4948C8.42295 15.5773 9.78649 12.0404 12.2833 8.95614C14.2313 6.5491 16.6243 4.69352 19.3531 3.24635C19.3758 3.23421 19.4072 3.23854 19.4909 3.229Z"
            fill="#828282"
          />
          <path
            id="Vector_3"
            d="M24.6455 3.18739C25.5205 3.73106 26.4199 4.24091 27.2662 4.82533C30.6624 7.16994 33.1958 10.21 34.6998 14.0633C35.6167 16.4123 36.0023 18.8592 36.0389 21.3668C36.0529 22.3328 36.0319 23.2987 36.0476 24.2646C36.052 24.5291 35.9708 24.6826 35.7327 24.8083C34.6623 25.3763 33.5247 25.6242 32.3147 25.6286C31.1038 25.632 29.9653 25.3823 28.8905 24.8274C28.6567 24.7069 28.566 24.5621 28.5634 24.2915C28.5477 22.3276 28.5721 20.361 28.4701 18.4014C28.2903 14.9608 27.8053 11.5644 26.7515 8.26421C26.2123 6.57598 25.5362 4.95105 24.6411 3.41717C24.615 3.37208 24.6001 3.32006 24.5801 3.2715C24.6019 3.24288 24.6237 3.21514 24.6455 3.18652V3.18739Z"
            fill="#828282"
          />
          <path
            id="Vector_4"
            d="M23.4746 0.548828C24.5948 0.724848 25.7289 0.839304 26.8324 1.08903C31.3418 2.11133 35.1629 4.34062 38.2337 7.7743C40.8046 10.6487 42.5005 13.9844 43.1435 17.797C43.3485 19.0127 43.4017 20.2561 43.4942 21.4882C43.5561 22.3206 43.1574 22.9727 42.5127 23.4539C41.2041 24.4294 39.7499 24.517 38.2232 24.0774C37.9685 24.0037 37.9083 23.8614 37.9013 23.6083C37.8585 22.0085 37.8594 20.4035 37.7242 18.8098C37.493 16.0871 36.6765 13.517 35.3522 11.1247C32.6486 6.23955 28.5493 2.90818 23.479 0.678892C23.4772 0.635537 23.4764 0.592183 23.4746 0.548828Z"
            fill="white"
          />
          <path
            id="Vector_5"
            d="M20.5532 0.692765C18.7046 1.46188 16.9729 2.43822 15.3625 3.61833C12.1172 5.99763 9.55674 8.94227 7.92712 12.6369C6.96749 14.8125 6.37165 17.0877 6.23381 19.4618C6.15355 20.844 6.15617 22.2313 6.14047 23.6161C6.13785 23.8719 6.0794 23.9932 5.81507 24.0687C4.16974 24.5378 2.63085 24.4251 1.29435 23.2606C0.662745 22.7117 0.472565 21.9747 0.503099 21.1535C0.593827 18.7057 1.02828 16.3325 1.93643 14.0451C3.10456 11.1031 4.85021 8.55728 7.1664 6.39563C9.92663 3.8195 13.1527 2.08358 16.8281 1.20348C18.0459 0.912139 19.2987 0.763 20.5357 0.548828L20.5532 0.692765Z"
            fill="white"
          />
          <path
            id="Vector_6"
            d="M4.18945 26.2633C4.8263 26.1567 5.40731 26.044 5.99355 25.9728C6.10086 25.9598 6.27097 26.0864 6.34163 26.194C7.52983 28.0001 8.70668 29.8123 9.88527 31.6246C11.637 34.3186 13.3853 37.0144 15.1379 39.7076C15.5793 40.3848 15.5846 40.8253 15.1353 41.2033C14.7139 41.558 14.1417 41.5189 13.7997 41.0472C13.3434 40.4177 12.9395 39.7492 12.5155 39.0971C9.78931 34.9039 7.06397 30.7106 4.3395 26.5174C4.28629 26.4359 4.24005 26.3492 4.19033 26.2625L4.18945 26.2633Z"
            fill="white"
          />
          <path
            id="Vector_7"
            d="M39.8543 26.2529C39.0901 27.4321 38.3477 28.5776 37.6053 29.7221C35.1905 33.4437 32.7758 37.1652 30.3619 40.8868C30.0129 41.4244 29.4755 41.5839 28.994 41.2882C28.5176 40.996 28.4287 40.442 28.7855 39.8922C31.749 35.3253 34.7168 30.76 37.6769 26.1905C37.8095 25.9858 37.9176 25.9433 38.1654 25.9971C38.7002 26.1133 39.2498 26.1653 39.8552 26.2529H39.8543Z"
            fill="white"
          />
          <path
            id="Vector_8"
            d="M11.9072 27.5354C12.5493 27.4513 13.1635 27.3706 13.8082 27.2856C14.4433 28.8031 15.0871 30.3335 15.7239 31.8674C16.8083 34.4773 17.8927 37.0864 18.964 39.7015C19.0861 39.9998 19.2082 40.3336 19.1943 40.6449C19.1751 41.0637 18.779 41.3845 18.3882 41.4322C17.9633 41.4834 17.5873 41.271 17.3989 40.8244C16.8066 39.4241 16.2247 38.0194 15.6437 36.6138C14.4424 33.7099 13.2437 30.8043 12.0451 27.8987C11.9971 27.7825 11.9561 27.6637 11.9072 27.5362V27.5354Z"
            fill="white"
          />
          <path
            id="Vector_9"
            d="M30.2304 27.2916C30.8716 27.3731 31.4867 27.4503 32.1331 27.5327C31.6411 28.731 31.1534 29.9224 30.6614 31.1129C29.3511 34.283 28.0451 37.4539 26.7173 40.6171C26.603 40.8902 26.385 41.1677 26.1381 41.3264C25.8188 41.5319 25.4314 41.479 25.1322 41.2102C24.8112 40.9206 24.7213 40.559 24.8906 40.1497C25.4436 38.8109 25.9967 37.4713 26.5498 36.1325C27.7502 33.2277 28.9506 30.323 30.1519 27.4182C30.1685 27.3792 30.1964 27.3445 30.2287 27.2925L30.2304 27.2916Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_892_5800">
            <rect width="43" height="40.9024" fill="white" transform="translate(0.5 0.548828)" />
          </clipPath>
        </defs>
      </svg>
    ),
    title: 'Airdrops',
    href: null,
  },
]

export default DeploymentComing
