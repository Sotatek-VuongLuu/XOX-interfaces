import styled from 'styled-components'
import { Flex, Text, Button } from '@pancakeswap/uikit'
import { USD_ADDRESS, XOX_ADDRESS } from 'config/constants/exchange'
import { useActiveChainId } from 'hooks/useActiveChainId'

const NavWrapper = styled(Flex)`
  padding: 28px 24px 24px;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 5fr 2fr;
    padding-left: 48px;
    padding-right: 48px;
  } ;
`

const Banner = styled.div`
  height: 315px;
  width: 100%;
  background: url('/images/bg_mobile_info.svg');
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  padding: 20px 16px;

  .get-xox {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    height: 43px;
  }

  .learn-more {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    width: 149px;
    height: 43px;
    border: 1px solid #ffffff;
    border-radius: 6px;
    margin-left: 16px;
    background: transparent;
  }

  .title {
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
    color: #ffbd3c;
  }

  .subtitle {
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.87);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    height: 200px;
    padding: 30px 24px;
    background: url('/images/bg.svg');
    background-repeat: no-repeat;
    background-size: cover;
    .title {
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      color: #ffbd3c;
    }

    .subtitle {
      font-weight: 700;
      font-size: 36px;
      line-height: 44px;
      color: rgba(255, 255, 255, 0.87);
    }

    .get-xox {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      height: 43px;
    }

    .learn-more {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      width: 149px;
      height: 43px;
      border: 1px solid #ffffff;
      border-radius: 6px;
      margin-left: 16px;
      background: transparent;
    }
  }
`

const MainContentContainer = styled.div`
  width: 1200px;
  .content {
    background: #242424;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 24px 21px;
    .header {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;

      .flex {
        display: flex;
        align-items: center;
      }
    }
  }
`

const Pools: React.FC<React.PropsWithChildren> = () => {
  return (
    <>
      <NavWrapper>
        <Banner>
          <Text className="title" marginBottom="16px">
            Swap to get XOX and XOXS
          </Text>
          <Text className="subtitle" marginBottom="16px">
            Earn BUSD/USDC from Your XOXS
          </Text>
          <a href="/#" target="_blank" rel="noreferrer">
            <Button className="get-xox">Get LP Token</Button>
          </a>
          <a href="/whitepaper" target="_blank" rel="noreferrer">
            <Button className="learn-more">Learn More</Button>
          </a>
        </Banner>
      </NavWrapper>

      <NavWrapper>
        <MainContentContainer>
          <div className="content">
            <div className="header">
              <div className="flex">
                <span>
                  <img src="/images/pair.png" alt="pair" />
                </span>
                <span>XOX - BUSD</span>
              </div>
              <div className="flex">
                <span>APR:</span>
                <br />
                <span>132.26%</span>
              </div>
              <div className="flex">
                <span>Earned:</span>
                <span>0</span>
              </div>
              <div className="flex">
                <span>Liquidity</span>
                <span>
                  $135.249.453
                  <img src="/images/u_question-circle.svg" alt="u_question-circle" />
                </span>
              </div>
            </div>
          </div>
        </MainContentContainer>
      </NavWrapper>
    </>
  )
}

export default Pools
