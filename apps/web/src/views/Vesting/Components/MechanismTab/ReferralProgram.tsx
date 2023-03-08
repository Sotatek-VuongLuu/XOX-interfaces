/* eslint-disable react/no-unescaped-entities */
import { Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { CustomTableWrapper, Table } from '../MainInfoTab/SaleHistory'

const Wrapper = styled.div``
const Content = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  color: rgba(255, 255, 255, 0.87);

  .high_light {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #fb8618;
    margin-bottom: 16px;
  }
  .nomal {
    font-weight: 400;
    font-size: 16px;
    line-height: 32px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 16px;
  }

  .table_ref {
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    width: 760px;
    min-width: 760px;
    padding: 19px 21px;
    margin-bottom: 16px;
  }

  .scroll {
    width: 100%;
    overflow-x: auto;
  }

  @media screen and (max-width: 900px) {
    .nomal {
      font-size: 14px;
      line-height: 24px;
    }

    .high_light {
      font-size: 14px;
      line-height: 17px;
    }

    .table_ref {
      padding: 15px 16px;
    }
    .scroll {
      margin-bottom: 16px;
    }
  }
`

const StyleWrapperTable = styled(CustomTableWrapper)`
  padding-top: 0px;

  & > div:last-child {
    margin-bottom: 0px;
  }

  & > div {
    min-width: 100%;
  }
`

const CusTable = styled(Table)`
  grid-template-columns: 0.5fr 1.25fr 1.25fr;
  grid-gap: 16px 10px;

  &::before {
    top: 25px;
  }

  .table-header {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.6);
  }

  .value_round {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
  }

  @media screen and (max-width: 900px) {
    .table-header {
      font-size: 14px;
      line-height: 17px;
    }

    .value_round {
      font-size: 14px;
      line-height: 17px;
    }
  }
`

const CusTableRow = styled(CusTable)`
  &::before {
    border: none;
  }
`

function ReferralProgram() {
  const data = [
    {
      round: 'Round 1',
      referrer: '3%',
      referee: '2%',
    },
    {
      round: 'Round 2',
      referrer: '3%',
      referee: '2%',
    },
    {
      round: 'Round 3',
      referrer: '3%',
      referee: '2%',
    },
  ]
  return (
    <Wrapper>
      <Content>
        <p className="high_light">Referral Program Mechanism for Pre-Sales</p>
        <p className="nomal">
          Apart from earning XOXS as a bonus by investing in the Pre-Sales, users and investors (BOTH) can also earn
          more XOXS by referring others to invest. Each user will get a custom Code after connecting their wallet to the
          XOX Labs dapp, users and influencers only need to share the their code with other investors and communities
          then when they invest using the codes the XOXS earned by both (the person that owns the code and the person
          that is using the code) will be automatically added to the respective wallets.
        </p>

        <div className="scroll">
          <div className="table_ref">
            <StyleWrapperTable>
              <CusTable>
                <Text className="table-header">Token Sale</Text>
                <Text className="table-header">Referral bonus XOXS ( referrer )</Text>
                <Text className="table-header">Referral bonus XOXS ( Referee )</Text>
              </CusTable>

              {Array.from(data).map((item) => {
                return (
                  <CusTableRow>
                    <Text className="value_round">{item.round}</Text>
                    <Text className="value_round">{item.referrer}</Text>
                    <Text className="value_round">{item.referee}</Text>
                  </CusTableRow>
                )
              })}
            </StyleWrapperTable>
          </div>
        </div>

        <p className="nomal">
          Example: User A shares referral code with B, A gets 3% of total transaction amount of Investor B in XOXS and B
          which is the person that is buying using A's code also gets an extra 2% of his own total transaction amount in
          XOXS on top of the XOXS he is getting already as a bonus by investing depending on which sale he is buying in.
        </p>

        <p className="nomal">
          <i>
            *Important to note that Both sides will earn XOXS by just applying 1 code, so it's a win win situation for
            Both. Also the XOXS earned will be automatically staked once the project launch to the public and it will
            generate all XOXS holders passive income (APY) in USDT/USDC on autopilot.
          </i>
        </p>

        <p className="high_light">4 Steps to Earn</p>

        <div className="nomal">
          1. Connect Wallet <br />
          2. Copy Your Unique Referral Code <br />
          3. Share it with friends <br />
          4. Earn XOXS
        </div>
      </Content>
    </Wrapper>
  )
}

export default ReferralProgram
