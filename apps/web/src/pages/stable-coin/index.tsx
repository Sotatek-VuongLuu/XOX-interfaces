import { CHAIN_IDS } from 'utils/wagmi'
import StableCoin from '../../views/StableCoin'
import { PageMeta } from 'components/Layout/Page'

const PageStableCoin = () => {
  return (
    <>
      <PageMeta />
      <StableCoin />
    </>
  )
}

export default PageStableCoin
