import { useTranslation } from '@pancakeswap/localization'
import { Flex, Grid, useTooltip } from '@pancakeswap/uikit'
import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 24px 0px 42px;

  @media screen and (max-width: 900px) {
    margin: 0px;
  }
`
const Content = styled(Grid)`
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const WrapperItem = styled(Flex)`
  position: relative;
  padding: 24px 109px;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;

  .title {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.075em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.87);
  }
  .describe {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #fb8618;
    margin-top: 16px;
    margin-bottom: 38px;
  }
  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 1px solid #ffffff30;
    border-left: 1px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
    bottom: 0;
    border-width: 1px;
    border-radius: inherit;
    border-color: white;
    border-style: solid;
    mask: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);
  }

  .airbnb {
    margin-top: 35px;
  }

  &.secured .logos {
    > div {
      position: relative;
      display: inline-block;
    }

    > div a {
      display: block;
    }

    > div img {
      cursor: pointer;
      width: 120px;

      &.icon-short {
        position: absolute;
        z-index: 2;
      }

      &.icon-full {
        opacity: 0;
      }
    }

    > div:hover {
      img.icon-short {
        visibility: hidden;
      }

      img.icon-short + img {
        opacity: 1;
      }
    }
  }
  &.backed > div {
    > div:nth-child(1) {
      margin-bottom: 32px;
      padding: 0px 40px;
    }
    > div:nth-child(2) {
      padding-left: 20px;
    }
    > div {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-column-gap: 64px;
      img {
        max-width: 100%;
        cursor: pointer !important;
      }
    }
  }

  @media screen and (max-width: 900px) {
    padding: 24px 15px;

    .title {
      font-size: 16px;
      line-height: 24px;
    }
    .describe {
      font-size: 14px;
      line-height: 24px;
      margin-top: 10px;
    }

    &.backed > div {
      > div {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-column-gap: 58px;
      }
      > div:nth-child(1) {
        padding: 0px;
      }
      > div:nth-child(2) {
        padding-left: 0px;
        margin: 32px 0px;
      }
    }
  }
`

const SecuredByItem = ({ item }) => {
  const { t } = useTranslation()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(t('Coming Soon'), {
    placement: 'top',
  })

  const {
    targetRef: zellicRef,
    tooltip: zellicTooltip,
    tooltipVisible: zellicTooltipVisible,
  } = useTooltip(t('Coming Soon'), {
    placement: 'top',
  })

  return (
    <WrapperItem
      className="container secured"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <p className="title">{t(item.title)}</p>
      <p className="describe">{t(item.describe)}</p>

      <div className="logos">
        <div>
          <a href="https://www.certik.com/" target="_blank">
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/Certik-short.svg`}
              className="icon-short"
              alt="CertikLogo"
            />
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/Certik-full.svg`}
              className="icon-full"
              alt="CertikLogo"
            />
          </a>
        </div>

        {zellicTooltipVisible && zellicTooltip}
        <div ref={zellicRef}>
          <a href="https://www.zellic.io/" target="_blank">
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/Zellic-short.svg`}
              className="icon-short"
              alt="ZellicLogo"
            />
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/Zellic-full.svg`}
              className="icon-full"
              alt="ZellicLogo"
            />
          </a>
        </div>

        {tooltipVisible && tooltip}
        <div ref={targetRef}>
          <a href="https://hacken.io/" target="_blank">
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/Hacken-short.svg`}
              className="icon-short"
              alt="HackenLogo"
            />
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/Hacken-full.svg`}
              className="icon-full"
              alt="HackenLogo"
            />
          </a>
        </div>
        {/* <div>
              <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/MicrosoftLogo.svg`} alt="MicrosoftLogo" />
              <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/WalmartLogo.svg`} alt="WalmartLogo" />
              <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/partners/FedExLogo.svg`} alt="FedExLogo" />
            </div> */}
      </div>
    </WrapperItem>
  )
}

const BackedByItem = ({ item }) => {
  const { width } = useWindowSize()
  const { t } = useTranslation()
  return (
    <WrapperItem
      className="container secured"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <p className="title">{t(item.title)}</p>
      <p className="describe">{t(item.describe)}</p>

      <div className="logos">
        <div>
          <a href="https://kyberswap.com/" target="_blank">
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/KyberNetwork-short-01.svg`}
              className="icon-short"
              alt="KyberLogo"
            />
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/KyberNetwork-full-horizontal.svg`}
              className="icon-full"
              alt="KyberLogo"
            />
          </a>
        </div>
        <div>
          <a href="https://bitgert.com/" target="_blank">
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/Bitgert-short-01.svg`}
              className="icon-short"
              alt="Bitgert Logo"
            />
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/Bitgert-full-horizontal.svg`}
              className="icon-full"
              alt="Bitgert Logo"
            />
          </a>
        </div>
        <div>
          <a href="https://coin98.com/" target="_blank">
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/Coin98-short-01.svg`}
              className="icon-short"
              alt="Coin98Logo"
            />
            <img
              src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/Coin98-full-horizontal.svg`}
              className="icon-full"
              alt="Coin98Logo"
            />
          </a>
        </div>
      </div>
    </WrapperItem>
  )
}

function BackedBy() {
  return (
    <Wrapper>
      <Content>
        <SecuredByItem
          item={{
            title: 'Secured By',
            describe: 'XOX has Industry Leading Security. Protected By The Best.',
          }}
        />
        <BackedByItem
          item={{
            title: 'Back By',
            describe: 'The Best to Deliver the Best.',
          }}
        />
      </Content>
    </Wrapper>
  )
}

export default BackedBy
