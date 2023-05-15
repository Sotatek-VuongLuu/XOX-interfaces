import { CHAIN_IDS } from 'utils/wagmi'
import WithDrawLayout from '../../views/StableCoinWithdraw'
import { PageMeta } from 'components/Layout/Page'

const PageWithdraw = () => {
  return (
    <>
      <PageMeta />
      <WithDrawLayout />
    </>
  )
}

export default PageWithdraw
