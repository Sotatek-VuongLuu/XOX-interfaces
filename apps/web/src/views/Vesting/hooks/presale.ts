import { getSaleStats } from 'services/presale'

export const fetchDataSaleStats = async (chainId?: number, address?: string) => {
  const result = { dataSaleStats: [] }
  const response = await getSaleStats()
  if (response) {
    result.dataSaleStats = response?.saleStats
  }
  return result
}
