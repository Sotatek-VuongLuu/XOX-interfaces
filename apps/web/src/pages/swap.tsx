import { CHAIN_IDS } from 'utils/wagmi'
import Swap from '../views/Swap'
import { SwapFeaturesProvider } from '../views/Swap/SwapFeaturesContext'
import DeploymentComing from 'components/DeploymentComing'

const SwapPage = () => {
  return (
    <>
      <SwapFeaturesProvider>
        <DeploymentComing />
        <Swap />
      </SwapFeaturesProvider>
    </>
  )
}

SwapPage.chains = CHAIN_IDS

export default SwapPage
