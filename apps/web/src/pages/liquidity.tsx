import { CHAIN_IDS } from 'utils/wagmi'
import Liquidity from '../views/Pool'
import DeploymentComing from 'components/DeploymentComing'

const LiquidityPage = () => {
  return (
    <>
      <DeploymentComing />
      <Liquidity />
    </>
  )
}

LiquidityPage.chains = CHAIN_IDS

export default LiquidityPage
