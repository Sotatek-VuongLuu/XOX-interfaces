import { Flex, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { ClickableColumnHeader, CustomTableWrapper, Table } from '../MainInfoTab/SaleHistory'

const Wrapper = styled.div``

const Content = styled.div`
  .title {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 20px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 30px;
      left: 0px;
      width: 40px;
      height: 4px;
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    }
  }
  .description {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);

    p:nth-last-child(2) {
      font-weight: 700;
      margin: 24px 0px;
    }
    p:first-child {
      margin-bottom: 24px;
    }
  }
  .normal {
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.87);
    margin-top: 24px;
  }

  .high-light {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #fb8618;

    @media screen and (max-width: 900px) {
      font-size: 14px;
      line-height: 17px;
    }
  }

  @media screen and (max-width: 900px) {
    .normal {
      font-size: 14px;
      line-height: 20px;
    }
    .description {
      font-size: 14px;
      line-height: 20px;
    }
  }
`

const CustomTable = styled(Table)`
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;

  &::before {
    top: 25px;
  }

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 0px;
    border: 1px solid #444444;
    position: absolute;
    top: -13px;
  }

  .table-header {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.6);
    @media screen and (max-width: 900px) {
      font-size: 14px;
      line-height: 17px;
    }
  }

  .table_header_total {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
    @media screen and (max-width: 900px) {
      font-size: 14px;
      line-height: 17px;
    }
  }
`

const CustomTableRow = styled(CustomTable)`
  &::after {
    border: none;
  }
  &::before {
    border: none;
  }

  .value {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);

    @media screen and (max-width: 900px) {
      font-size: 14px;
      line-height: 17px;
    }
  }
`

const CustomTableSale = styled(CustomTableWrapper)`
  & > div {
    min-width: 1300px;
  }
`

function PrivateSale() {
  const arrToken = [
    {
      title: 'Private-Sale (ROUND 1)',
      total: '1.5%',
      amountToken: '2,700,000',
      price: '0.044',
      totalMoneyRaise: '162,000',
      launchPrice: '216,000',
    },
    {
      title: 'Private-Sale (ROUND 2)',
      total: '1.5%',
      amountToken: '2,700,000',
      price: '0.044',
      totalMoneyRaise: '162,000',
      launchPrice: '216,000',
    },
    {
      title: 'Private-Sale (ROUND 3)',
      total: '1.5%',
      amountToken: '2,700,000',
      price: '0.044',
      totalMoneyRaise: '162,000',
      launchPrice: '216,000',
    },
  ]
  return (
    <Wrapper>
      <Content>
        <div className="title">Sale mechanism:</div>
        <div className="description">
          <p>
            <strong>XOX Labs </strong>allows users to swap, stake, store, bridge, play, refer, invest and earn with ease
            on the leading Decentralized Blockchain Ecosystem.
          </p>
          <p>
            Initially Launching with Cross-chain liquidity on 6 of the most popular blockchains (ETH, BSC, Polygon,
            Solana, Arbitrum, Optimism) XOX Labs is already a miles ahead of 90% of its competitors when it comes to
            accessibility and multi-chain capabilities. But thats just the start, XOX Labs will soon launch the most
            capable Cross-Chain DEX Aggregator on Defi (XOX Dex V2), natively integrating 100+ DEXes and 60+
            Blockchains, which will be selected by community voting, popularity, capabilities, volume and scalability
            potential. Learn More in our Docs
          </p>
          <p className="high-light">XOX Token Pre-Sales</p>
          <p>Total Allocation 10.800.000 XOX Tokens 6% of the Total Supply (180.000.000 Tokens)</p>
        </div>

        <CustomTableSale>
          <CustomTable>
            <Text className="table-header">TOKEN SALES</Text>
            <Text className="table-header">Total Sale (%)</Text>
            <Text className="table-header">Amount of tokens</Text>
            <Text className="table-header">Price</Text>
            <Text className="table-header">Total Money Raise ($)</Text>
            <Text className="table-header">Launch price 0.06$ ($)</Text>
          </CustomTable>

          {Array.from(arrToken).map((item) => {
            return (
              <CustomTableRow>
                <Text className="value">{item.title}</Text>
                <Text className="value">{item.total}</Text>
                <Text className="value">{item.amountToken}</Text>
                <Text className="value">{item.price}</Text>
                <Text className="value">{item.totalMoneyRaise}</Text>
                <Text className="value">{item.launchPrice}</Text>
              </CustomTableRow>
            )
          })}

          <CustomTable>
            <Text className="table_header_total">TOTAL</Text>
            <Text className="table_header_total">6%</Text>
            <Text className="table_header_total">10,800,000</Text>
            <Text className="table_header_total">{null}</Text>
            <Text className="table_header_total">487,800</Text>
            <Text className="table_header_total">648,000</Text>
          </CustomTable>
        </CustomTableSale>

        <div>
          <p className="normal">
            Note: In the Round 1 whitelisted wallets will have a 1hr timeframe to buy in before the sale goes public.
            (During this hour only Whitelisted wallets will be able to buy XOX).{' '}
          </p>

          <p className="normal">
            *You will be able to claim your XOX Tokens & XOXS Stables once Public Sales have Ended
            <br />
            **Bonus XOXS earned by referrals will also be distributed once XOX Tokens are Claimed by investors after
            Public Sales have Ended
          </p>
          <p className="normal">
            <strong className="high-light">XOXS Bonus on each Round</strong>
          </p>
          <p className="normal">
            1. Round 1 - 8% XOXS Bonus <br />
            2. Round 2 - 6% XOXS Bonus <br />
            3. Round 3 - 4% XOXS Bonus
          </p>
          <p className="normal">
            <i>
              *The XOXS bonus % is calculated from your total investment (Example: If you invest $1000 in Round 1 then
              you get 80 XOXS <span>&#123;</span> 1 XOXS = 1$ <span>&#125;</span>, If you invest $1000 in Round 3 then
              you get 40 XOXS)
            </i>
          </p>
        </div>
      </Content>
    </Wrapper>
  )
}

export default PrivateSale
