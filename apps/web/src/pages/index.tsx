import { SWRConfig } from 'swr'
import Home from '../views/Home'

const IndexPage = ({ totalTx30Days, addressCount30Days, tvl }) => {
  return (
    <>
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
