import { useActiveChainId } from 'hooks/useActiveChainId'
import { SWR_SETTINGS, useGetChainName } from 'state/info/hooks'
import useSWRImmutable from 'swr/immutable'
import { fetchDataSaleStats } from './presale'

export const useGetSaleStats = () => {
  const chainName = useGetChainName()
  const { chainId } = useActiveChainId()
  const type = 'pre-sale'
  const { data: saleStats } = useSWRImmutable(
    [`info/protocol/getDataSaleStarts/${type}`],
    () => fetchDataSaleStats(),
    SWR_SETTINGS,
  )
  return saleStats
}
