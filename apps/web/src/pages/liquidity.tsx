import { CHAIN_IDS } from 'utils/wagmi'
import Liquidity from '../views/Pool'
import { PageMeta } from 'components/Layout/Page'

const LiquidityPage = () => {
  return (
    <>
      <Liquidity />
    </>
  )
}

LiquidityPage.chains = CHAIN_IDS

export default LiquidityPage
