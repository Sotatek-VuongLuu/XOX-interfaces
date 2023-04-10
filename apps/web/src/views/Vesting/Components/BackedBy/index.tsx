import { Flex, Grid } from '@pancakeswap/uikit'
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

  > div {
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

    > div {
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
  const { width } = useWindowSize()
  return (
    <WrapperItem
      className="container"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <p className="title">{item.title}</p>
      <p className="describe">{item.describe}</p>

      <div>
        {width >= 900 && (
          <>
            <div>
              <img src="/images/dex-v2/AirbnbLogo.svg" alt="AirbnbLogo" />
              <img src="/images/dex-v2/HubspotLogo.svg" alt="HubspotLogo" />
              <img src="/images/dex-v2/GoogleLogo.svg" alt="GoogleLogo" />
            </div>
            <div>
              <img src="/images/dex-v2/MicrosoftLogo.svg" alt="MicrosoftLogo" />
              <img src="/images/dex-v2/WalmartLogo.svg" alt="WalmartLogo" />
              <img src="/images/dex-v2/FedExLogo.svg" alt="FedExLogo" />
            </div>
          </>
        )}

        {width < 900 && (
          <>
            <div>
              <img src="/images/dex-v2/AirbnbLogo.svg" alt="AirbnbLogo" />
              <img src="/images/dex-v2/HubspotLogo.svg" alt="HubspotLogo" />
            </div>
            <div>
              <img src="/images/dex-v2/GoogleLogo.svg" alt="GoogleLogo" />
              <img src="/images/dex-v2/MicrosoftLogo.svg" alt="MicrosoftLogo" />
            </div>
            <div>
              <img src="/images/dex-v2/WalmartLogo.svg" alt="WalmartLogo" />
              <img src="/images/dex-v2/FedExLogo.svg" alt="FedExLogo" />
            </div>
          </>
        )}
      </div>
    </WrapperItem>
  )
}

function BackedBy() {
  const arrBackedBy = [
    {
      title: 'Secured By',
      describe: 'XOX has Industry Leading Security. Protected By The Best.',
    },
    {
      title: 'Back By',
      describe: 'The Best to Deliver the Best.',
    },
  ]
  return (
    <Wrapper>
      <Content>
        {arrBackedBy.map((item, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <SecuredByItem item={item} key={index} />
        })}
      </Content>
    </Wrapper>
  )
}

export default BackedBy
