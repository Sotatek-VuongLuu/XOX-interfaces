import { Flex, Grid } from '@pancakeswap/uikit'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-bottom: 24px;
`
const Content = styled(Grid)``

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
    border-bottom: 2px solid #ffffff30;
    border-left: 2px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 2px;
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
    border-bottom: 2px solid #ffffff30;
    border-right: 2px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 2px;
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
`

const SecuredByItem = ({ item }) => {
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
      <img src={item.sv2} alt="microsoft" />
      <img src={item.sv1} alt="airbnb" className="airbnb" />
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
      <Content gridTemplateColumns="1fr 1fr" gridGap="24px">
        {arrBackedBy.map((item) => {
          return <SecuredByItem item={item} />
        })}
      </Content>
    </Wrapper>
  )
}

export default BackedBy
