import { CHAIN_IDS } from 'utils/wagmi'
import BridgeToken from '../../views/BridgeToken'
import { SwapFeaturesProvider } from '../../views/Swap/SwapFeaturesContext'
import { PageMeta } from 'components/Layout/Page'

const BridgeTokenPage = () => {
  return (
    <>
      <PageMeta />
      <SwapFeaturesProvider>
        <BridgeToken />
      </SwapFeaturesProvider>
    </>
  )
}

BridgeTokenPage.chains = CHAIN_IDS

export default BridgeTokenPage
