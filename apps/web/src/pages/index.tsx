import { SWRConfig } from 'swr'
import Home from '../views/Home'
import { PageMeta } from 'components/Layout/Page'

const IndexPage = ({ totalTx30Days, addressCount30Days, tvl }) => {
  return (
    <>
      <PageMeta />
      <SWRConfig
        value={{
          fallback: {
            totalTx30Days,
            addressCount30Days,
            tvl,
          },
        }}
      >
        <Home />
      </SWRConfig>
    </>
  )
}

IndexPage.chains = []

export default IndexPage
