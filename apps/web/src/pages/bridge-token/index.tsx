import { CHAIN_IDS } from 'utils/wagmi'
import BridgeToken from '../../views/BridgeToken'
import { SwapFeaturesProvider } from '../../views/Swap/SwapFeaturesContext'
import DeploymentComing from 'components/DeploymentComing'

const BridgeTokenPage = () => {
  return (
    <>
      <SwapFeaturesProvider>
        <DeploymentComing />
        <BridgeToken />
      </SwapFeaturesProvider>
    </>
  )
}

BridgeTokenPage.chains = CHAIN_IDS

export default BridgeTokenPage
