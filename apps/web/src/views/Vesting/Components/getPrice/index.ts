import { ethers } from 'ethers'
import aggregatorV3InterfaceABI from './abi/aggregatorV3InterfaceABI.json'

export const getPriceUsdPerToken = async () => {
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/polygon_mumbai')
  const priceFeed = new ethers.Contract(
    '0xf33426fb1a9513a91C1D96d92Ee020BE035b4f6f',
    aggregatorV3InterfaceABI,
    provider,
  )
  try {
    const roundData = await priceFeed.latestRoundData()
    const decimals = await priceFeed.decimals()

    if (decimals) {
      return [roundData, decimals]
    }
    return [null, null]
  } catch (error) {
    return [null, error]
  }
}
