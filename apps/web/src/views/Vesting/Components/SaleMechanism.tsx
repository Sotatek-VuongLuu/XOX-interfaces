import ConnectWalletButton from 'components/ConnectWalletButton'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import styled from 'styled-components'
import Dashboard from './MainInfoTab/Dashboard'
import SaleHistory from './MainInfoTab/SaleHistory'
import VestingSchedule from './MainInfoTab/VestingSchedule'
import PrivateSale from './MechanismTab/PrivateSale'
import ReferralProgram from './MechanismTab/ReferralProgram'
import TokenMetrics from './MechanismTab/TokenMetrics'

interface IProps {
  tabSaleMechanism: string[]
  tabActiveMechansim: string
  setTabActiveMechansim: (tabActiveMechansim: string) => void
  initialTokenMetrics: any[]
}

const Wrapper = styled.div`
  padding: 40px 65px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin-top: 24px;
  margin-bottom: 40px;

  div {
    color: white;
  }
`
const Content = styled.div`
  .tab-mechanism {
    display: flex;
    color: white;
    cursor: pointer;
  }
`

function SaleMechanism({ tabSaleMechanism, tabActiveMechansim, setTabActiveMechansim, initialTokenMetrics }: IProps) {
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
      case 'Sale Referral Program':
        return <ReferralProgram />
      case 'Token Metrics':
        return <TokenMetrics initialTokenMetrics={initialTokenMetrics} />
      default:
        return <PrivateSale />
    }
  }
  return (
    <Wrapper>
      <Content>
        <div className="tab-mechanism">
          {Array.from(tabSaleMechanism).map((item) => {
            return (
              <div className="item-tab-mechanism" onClick={() => setTabActiveMechansim(item)} aria-hidden="true">
                {item}
              </div>
            )
          })}
        </div>
        <div className="body">{renderBody(tabActiveMechansim)}</div>
      </Content>
    </Wrapper>
  )
}

export default SaleMechanism
