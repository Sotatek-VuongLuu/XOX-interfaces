import { mapDataChartXOX } from 'state/info/queries/helpers'
import { PairData } from 'state/info/queries/types'
import { TransactionFrom } from 'state/info/types'
import { getMultiChainQueryEndPointWithChainId } from '../../constant'

/**
 * Transactions for Transaction table on the Home page
 */

const QUERY_HOUR = `
query fetchDataChartXOX {
  pairHourDatas {
    id
    hourStartUnix
    reserve0
    reserve1
    hourlyVolumeUSD
  }
}
`

const QUERY_DAY = `
  query fetchDataChartXOX {
    pairDayDatas {
      id
      date
      reserve0
      reserve1
      dailyVolumeUSD
    }
  }
`

interface ChartData {
  pairHourDatas?: PairData[]
  pairDayDatas?: PairData[]
}

const fetchDataChartXOX = async (chainId: number, filter: any): Promise<any> => {
  try {
    console.log(filter)
    let dataChart
    dataChart = await getMultiChainQueryEndPointWithChainId(chainId, TransactionFrom.XOX).request<ChartData>(
      ['1D'].includes(filter) ? QUERY_HOUR : QUERY_DAY,
    )

    if (!['1D'].includes(filter) && dataChart && dataChart.pairDayDatas.length < 7) {
      dataChart = await getMultiChainQueryEndPointWithChainId(chainId, TransactionFrom.XOX).request<ChartData>(
        QUERY_HOUR,
      )
    }
    return (dataChart?.pairHourDatas || dataChart.pairDayDatas || []).map(mapDataChartXOX)
  } catch (e) {
    return []
  }
}

export default fetchDataChartXOX
