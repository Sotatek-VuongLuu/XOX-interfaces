import { Flex, Grid } from '@pancakeswap/uikit'
import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 24px 0px;
`
const Content = styled(Grid)`
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const WrapperItem = styled(Flex)`
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

  .edge1 {
    width: 1px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    left: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 1px solid #ffffff30;
    border-right: 1px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 1px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .airbnb {
    margin-top: 35px;
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
      <div className="corner1" />
      <div className="edge1" />
      <div className="corner2" />
      <div className="edge2" />
      <p className="title">{item.title}</p>
      <p className="describe">{item.describe}</p>

      {width <= 900 && <img src="/images/logo_backed_mb.svg" alt="microsoft" />}
      {width > 900 && (
        <>
          <img src={item.sv2} alt="microsoft" />
          <img src={item.sv1} alt="airbnb" className="airbnb" />
        </>
      )}
    </WrapperItem>
  )
}

function BackedBy() {
  const arrBackedBy = [
    {
      title: 'Secured By',
      describe: 'XOX has Industry Leading Security. Protected By The Best.',
      sv1: '/microsoft.svg',
      sv2: '/airbnb.svg',
    },
    {
      title: 'Back By',
      describe: 'The Best to Deliver the Best.',
      sv1: '/microsoft.svg',
      sv2: '/airbnb.svg',
    },
  ]
  return (
    <Wrapper>
      <Content>
        {arrBackedBy.map((item) => {
          return <SecuredByItem item={item} />
        })}
      </Content>
    </Wrapper>
  )
}

export default BackedBy
