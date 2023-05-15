import { CHAIN_IDS } from 'utils/wagmi'
import LayoutHistory from '../../views/StableCoinHistory'
import { PageMeta } from 'components/Layout/Page'

const PageHistory = () => {
  return (
    <>
      <PageMeta />
      <LayoutHistory />
    </>
  )
}

export default PageHistory
