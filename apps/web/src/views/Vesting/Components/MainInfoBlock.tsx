/* eslint-disable import/no-cycle */
import ConnectWalletButton from 'components/ConnectWalletButton'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import styled from 'styled-components'
import Dashboard from './MainInfoTab/Dashboard'
import SaleHistory from './MainInfoTab/SaleHistory'
import VestingSchedule from './MainInfoTab/VestingSchedule'
import YourInfo from './MainInfoTab/YourInfo'

interface IProps {
  tabInfo: string[]
  tabActiveInfo: string
  setTabActiveInfo: (tabInfo: string) => void
  dataInfo: any[]
  dataRefInfo: any[]
}

const Wrapper = styled.div`
  padding: 40px 65px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`

const Content = styled.div`
  div {
    color: white;
  }
  .tab {
    display: flex;
    justify-content: center;

    .item_tab {
      cursor: pointer;
    }
  }
`

function MainInfoBlock({ tabInfo, tabActiveInfo, setTabActiveInfo, dataInfo, dataRefInfo }: IProps) {
  const { account } = useActiveWeb3React()

  const renderBody = (tab: string) => {
    if (!account) {
      return (
        <ConnectWalletButton scale="sm" style={{ whiteSpace: 'nowrap' }}>
          <span>Connect Wallet</span>
        </ConnectWalletButton>
      )
    }
    switch (tab) {
      case 'Sale History':
        return <SaleHistory />
      case 'Vesting Schedule':
        return <VestingSchedule />
      case 'Your Information':
        return <YourInfo dataInfo={dataInfo} dataRefInfo={dataRefInfo} />
      default:
        return <Dashboard />
    }
  }

  return (
    <Wrapper>
      <Content>
        <div className="tab">
          {Array.from(tabInfo).map((item) => {
            return (
              <div
                className={tabActiveInfo === item ? 'item_tab active' : 'item_tab'}
                aria-hidden="true"
                onClick={() => setTabActiveInfo(item)}
              >
                {item}
              </div>
            )
          })}
        </div>
        {renderBody(tabActiveInfo)}
      </Content>
    </Wrapper>
  )
}

export default MainInfoBlock
