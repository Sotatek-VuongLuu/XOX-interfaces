import { getSaleStats } from 'services/presale'

export const fetchDataSaleStats = async (chainId?: number, address?: string) => {
  try {
    const result = { dataSaleStats: [] }
    const response = await getSaleStats()
    if (response && response?.saleStats) {
      result.dataSaleStats = response?.saleStats
    }
    return result
  } catch (error) {
    console.warn(error)
  }
  return null
}
