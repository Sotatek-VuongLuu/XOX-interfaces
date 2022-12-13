/* eslint-disable import/order */
import { useTranslation } from '@pancakeswap/localization'
import { Card, Flex } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useEffect, useMemo, useState } from 'react'
import { checkIsStableSwap } from 'state/info/constant'
import {
  useAllPoolDataSWR,
  useAllTokenDataSWR,
  useGetChainName,
  useProtocolChartDataSWR,
  useProtocolDataSWR,
  useProtocolTransactionsSWR,
} from 'state/info/hooks'
import styled from 'styled-components'
// import BarChart from 'views/Info/components/InfoCharts/BarChart'
import LineChart from 'views/Info/components/InfoCharts/LineChart'
// import PoolTable from 'views/Info/components/InfoTables/PoolsTable'
// import TokenTable from 'views/Info/components/InfoTables/TokensTable'
import TransactionTable from 'views/Info/components/InfoTables/TransactionsTable'
import HoverableChart from '../components/InfoCharts/HoverableChart'
import WalletInfoTable from 'views/Info/components/InfoTables/WalletInfoTable'
import axios from 'axios'
import { SUGGESTED_BASES } from 'config/constants/exchange'
import { tokens } from 'tokens'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useNativeCurrency from 'hooks/useNativeCurrency'

export const ChartCardsContainer = styled(Flex)`
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  padding: 0;
  background: #242424;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  border-radius: 10px;

  & > * {
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  } ;
`

export const PageContainer = styled(Flex)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 5fr 2fr;
  } ;
`

const Overview: React.FC<React.PropsWithChildren> = () => {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const native = useNativeCurrency()
  const [coinGeckoIds, setCoinGeckoIds] = useState<string | undefined>()
  const [coinGeckoId, setCoinGeckoId] = useState<string | undefined>()
  const [filter, setFilter] = useState<any>({ days: 1 })
  const protocolData = useProtocolDataSWR()
  const [chartData, setChardData] = useState<Array<any> | undefined>()
  const [currencyDatas, setCurrencyDatas] = useState<Array<any> | undefined>()
  const transactions = useProtocolTransactionsSWR()
  const { chainId } = useActiveChainId()

  const currentDate = useMemo(
    () => new Date().toLocaleString(locale, { month: 'short', year: 'numeric', day: 'numeric' }),
    [locale],
  )

  const allTokens = useAllTokenDataSWR()

  const formattedTokens = useMemo(() => {
    return Object.values(allTokens)
      .map((token) => token.data)
      .filter((token) => token.name !== 'unknown')
  }, [allTokens])

  useEffect(() => {
    console.log(protocolData, 'protocolData')
  }, [protocolData])

  // const allPoolData = useAllPoolDataSWR()
  // const allPoolData = useAllPoolData()

  // const somePoolsAreLoading = useMemo(() => {
  //   return poolDatas.some((pool) => !pool?.token0Price)
  // }, [poolDatas])

  // const isStableSwap = checkIsStableSwap()
  // const chainName = useGetChainName()

  useEffect(() => {
    const ids = SUGGESTED_BASES[chainId]
      .concat([native])
      .map((token: any) => {
        const [t] = tokens.filter((t) => t.symbol.toLowerCase() === token?.symbol?.toLowerCase())

        return t?.id
      })
      .filter((e: any) => e !== undefined)

    setCoinGeckoIds(ids.join(','))

    const [token] = tokens.filter((t) => t.symbol.toLowerCase() === native.symbol.toLowerCase())

    setCoinGeckoId(token?.id)
  }, [])

  useEffect(() => {
    if (!coinGeckoId) return
    setChardData([
      {
        date: 1670816690317,
        priceUSD: 282.9648281402409,
      },
      {
        date: 1670816974885,
        priceUSD: 282.94953321645073,
      },
      {
        date: 1670817331273,
        priceUSD: 282.86832722757254,
      },
      {
        date: 1670817628328,
        priceUSD: 282.8082925215686,
      },
      {
        date: 1670817995242,
        priceUSD: 282.6805602542278,
      },
      {
        date: 1670818253802,
        priceUSD: 282.376453599148,
      },
      {
        date: 1670818498624,
        priceUSD: 282.4514579439103,
      },
      {
        date: 1670818831269,
        priceUSD: 282.83434553764863,
      },
      {
        date: 1670819139590,
        priceUSD: 282.2319535940369,
      },
      {
        date: 1670819506667,
        priceUSD: 282.3126719415118,
      },
      {
        date: 1670819749709,
        priceUSD: 282.0401263534576,
      },
      {
        date: 1670819988644,
        priceUSD: 282.04478317237886,
      },
      {
        date: 1670820319538,
        priceUSD: 282.0791190869956,
      },
      {
        date: 1670820631912,
        priceUSD: 282.00376774797803,
      },
      {
        date: 1670820898401,
        priceUSD: 282.1233647043774,
      },
      {
        date: 1670821198093,
        priceUSD: 282.35527945137727,
      },
      {
        date: 1670821504763,
        priceUSD: 282.2816324975035,
      },
      {
        date: 1670821793211,
        priceUSD: 282.2719883921337,
      },
      {
        date: 1670822095022,
        priceUSD: 282.24869833626997,
      },
      {
        date: 1670822416522,
        priceUSD: 281.9170544749598,
      },
      {
        date: 1670822754604,
        priceUSD: 281.8043786552195,
      },
      {
        date: 1670823102243,
        priceUSD: 281.20347891213873,
      },
      {
        date: 1670823297983,
        priceUSD: 281.7634884105353,
      },
      {
        date: 1670823613558,
        priceUSD: 281.86342793801043,
      },
      {
        date: 1670823921467,
        priceUSD: 281.86637295586326,
      },
      {
        date: 1670824253252,
        priceUSD: 281.39394287321034,
      },
      {
        date: 1670824526113,
        priceUSD: 281.4439414557159,
      },
      {
        date: 1670824815964,
        priceUSD: 281.5525728017978,
      },
      {
        date: 1670825157147,
        priceUSD: 281.42298552938166,
      },
      {
        date: 1670825450508,
        priceUSD: 281.44848271801476,
      },
      {
        date: 1670825710362,
        priceUSD: 281.4470869380859,
      },
      {
        date: 1670826066709,
        priceUSD: 281.3907459549471,
      },
      {
        date: 1670826361807,
        priceUSD: 281.3593731811681,
      },
      {
        date: 1670826640860,
        priceUSD: 281.3334324108534,
      },
      {
        date: 1670826951966,
        priceUSD: 281.2521230968065,
      },
      {
        date: 1670827207641,
        priceUSD: 281.267562171478,
      },
      {
        date: 1670827564081,
        priceUSD: 281.58596944836637,
      },
      {
        date: 1670827866243,
        priceUSD: 281.44643839862124,
      },
      {
        date: 1670828163759,
        priceUSD: 281.42544306768616,
      },
      {
        date: 1670828396695,
        priceUSD: 281.62659483705403,
      },
      {
        date: 1670828706012,
        priceUSD: 281.8630339253256,
      },
      {
        date: 1670829003658,
        priceUSD: 282.10001467068116,
      },
      {
        date: 1670829303513,
        priceUSD: 282.1591174814493,
      },
      {
        date: 1670829668834,
        priceUSD: 282.273414871145,
      },
      {
        date: 1670829888444,
        priceUSD: 282.10236878895574,
      },
      {
        date: 1670830222022,
        priceUSD: 282.1585122979201,
      },
      {
        date: 1670830502304,
        priceUSD: 282.05372499507854,
      },
      {
        date: 1670830851304,
        priceUSD: 281.6619415667287,
      },
      {
        date: 1670831134003,
        priceUSD: 281.61558741960494,
      },
      {
        date: 1670831489676,
        priceUSD: 281.5746434989114,
      },
      {
        date: 1670831720405,
        priceUSD: 281.7067932571929,
      },
      {
        date: 1670832052428,
        priceUSD: 281.26723760823086,
      },
      {
        date: 1670832360677,
        priceUSD: 281.12538300754323,
      },
      {
        date: 1670832600059,
        priceUSD: 281.27966134087205,
      },
      {
        date: 1670832931990,
        priceUSD: 281.05182082467576,
      },
      {
        date: 1670833236624,
        priceUSD: 281.2514293676245,
      },
      {
        date: 1670833512196,
        priceUSD: 281.1246772310131,
      },
      {
        date: 1670833853045,
        priceUSD: 280.8916232948762,
      },
      {
        date: 1670834151153,
        priceUSD: 281.0016448044241,
      },
      {
        date: 1670834395104,
        priceUSD: 281.29065424749166,
      },
      {
        date: 1670834735076,
        priceUSD: 281.3298453082789,
      },
      {
        date: 1670835059914,
        priceUSD: 281.2028280875683,
      },
      {
        date: 1670835302347,
        priceUSD: 281.35827653177955,
      },
      {
        date: 1670835559572,
        priceUSD: 281.57953593781014,
      },
      {
        date: 1670835894871,
        priceUSD: 281.62176269213177,
      },
      {
        date: 1670836197137,
        priceUSD: 281.7871193366807,
      },
      {
        date: 1670836479210,
        priceUSD: 281.9667193625692,
      },
      {
        date: 1670836793361,
        priceUSD: 282.04954834106155,
      },
      {
        date: 1670837073404,
        priceUSD: 282.0497283758583,
      },
      {
        date: 1670837440394,
        priceUSD: 281.903214496829,
      },
      {
        date: 1670837719234,
        priceUSD: 282.0246158741877,
      },
      {
        date: 1670838001031,
        priceUSD: 282.17274294082563,
      },
      {
        date: 1670838304924,
        priceUSD: 282.2039502611982,
      },
      {
        date: 1670838595819,
        priceUSD: 282.2734301083374,
      },
      {
        date: 1670838918483,
        priceUSD: 282.42969541868615,
      },
      {
        date: 1670839268069,
        priceUSD: 282.61611577490356,
      },
      {
        date: 1670839547042,
        priceUSD: 282.6428226385743,
      },
      {
        date: 1670839798227,
        priceUSD: 282.64306479373414,
      },
      {
        date: 1670840080319,
        priceUSD: 282.64231008043436,
      },
      {
        date: 1670840346850,
        priceUSD: 282.7668618418459,
      },
      {
        date: 1670840662426,
        priceUSD: 282.72574288582183,
      },
      {
        date: 1670841038853,
        priceUSD: 283.34605720111034,
      },
      {
        date: 1670841367617,
        priceUSD: 283.3117613302004,
      },
      {
        date: 1670841716965,
        priceUSD: 283.1786834987023,
      },
      {
        date: 1670841933995,
        priceUSD: 283.5374745154464,
      },
      {
        date: 1670842195047,
        priceUSD: 283.7165486856978,
      },
      {
        date: 1670842500461,
        priceUSD: 283.79276654116535,
      },
      {
        date: 1670842855510,
        priceUSD: 283.84685228463417,
      },
      {
        date: 1670843114508,
        priceUSD: 283.9356506673779,
      },
      {
        date: 1670843448898,
        priceUSD: 283.66979388865275,
      },
      {
        date: 1670843690539,
        priceUSD: 283.72875263347936,
      },
      {
        date: 1670844029018,
        priceUSD: 283.73973296865836,
      },
      {
        date: 1670844352937,
        priceUSD: 283.93589231932526,
      },
      {
        date: 1670844700230,
        priceUSD: 283.739894958442,
      },
      {
        date: 1670844946175,
        priceUSD: 283.7440431295666,
      },
      {
        date: 1670845197339,
        priceUSD: 283.5767172984253,
      },
      {
        date: 1670845499283,
        priceUSD: 283.77195829577147,
      },
      {
        date: 1670845795243,
        priceUSD: 283.8227436306447,
      },
      {
        date: 1670846098958,
        priceUSD: 283.7668430400952,
      },
      {
        date: 1670846416705,
        priceUSD: 283.72869429597455,
      },
      {
        date: 1670846721894,
        priceUSD: 283.65668311901305,
      },
      {
        date: 1670847046049,
        priceUSD: 283.22368172734383,
      },
      {
        date: 1670847334466,
        priceUSD: 283.66440472084196,
      },
      {
        date: 1670847598007,
        priceUSD: 283.53520460952643,
      },
      {
        date: 1670847902594,
        priceUSD: 283.3761459000943,
      },
      {
        date: 1670848280209,
        priceUSD: 283.3781274037981,
      },
      {
        date: 1670848517771,
        priceUSD: 278.0284444448575,
      },
      {
        date: 1670848834570,
        priceUSD: 276.923807083485,
      },
      {
        date: 1670849099241,
        priceUSD: 275.9736813793689,
      },
      {
        date: 1670849419478,
        priceUSD: 275.5412937225715,
      },
      {
        date: 1670849677238,
        priceUSD: 276.18614860987503,
      },
      {
        date: 1670850013873,
        priceUSD: 275.9604822147468,
      },
      {
        date: 1670850307578,
        priceUSD: 276.2438395033345,
      },
      {
        date: 1670850603429,
        priceUSD: 276.75014459794204,
      },
      {
        date: 1670850892505,
        priceUSD: 276.8432935140835,
      },
      {
        date: 1670851249285,
        priceUSD: 276.74672152001335,
      },
      {
        date: 1670851484965,
        priceUSD: 276.5931242302362,
      },
      {
        date: 1670851772070,
        priceUSD: 276.6379450109202,
      },
      {
        date: 1670852095916,
        priceUSD: 276.9366749159413,
      },
      {
        date: 1670852431103,
        priceUSD: 276.8352989738821,
      },
      {
        date: 1670852694437,
        priceUSD: 276.89392114906195,
      },
      {
        date: 1670852987418,
        priceUSD: 276.8008085885487,
      },
      {
        date: 1670853299871,
        priceUSD: 276.9195922190589,
      },
      {
        date: 1670853681090,
        priceUSD: 276.0770632793565,
      },
      {
        date: 1670853844073,
        priceUSD: 275.7653784462801,
      },
      {
        date: 1670854207728,
        priceUSD: 276.1104031937964,
      },
      {
        date: 1670854524969,
        priceUSD: 276.37416861657795,
      },
      {
        date: 1670854796787,
        priceUSD: 276.22883535095923,
      },
      {
        date: 1670855112004,
        priceUSD: 276.3448240646759,
      },
      {
        date: 1670855440128,
        priceUSD: 276.7651517160467,
      },
      {
        date: 1670855694935,
        priceUSD: 276.7953578161685,
      },
      {
        date: 1670856029161,
        priceUSD: 276.4699925188249,
      },
      {
        date: 1670856332834,
        priceUSD: 276.41825999369485,
      },
      {
        date: 1670856647169,
        priceUSD: 276.5100741730328,
      },
      {
        date: 1670856973113,
        priceUSD: 276.61842927920503,
      },
      {
        date: 1670857242145,
        priceUSD: 276.6925711743292,
      },
      {
        date: 1670857552046,
        priceUSD: 276.0221714813504,
      },
      {
        date: 1670857796578,
        priceUSD: 276.0615682182022,
      },
      {
        date: 1670858097397,
        priceUSD: 275.9149029551566,
      },
      {
        date: 1670858468590,
        priceUSD: 275.74285216659825,
      },
      {
        date: 1670858697715,
        priceUSD: 275.9190983375671,
      },
      {
        date: 1670859000434,
        priceUSD: 277.14477642044534,
      },
      {
        date: 1670859355493,
        priceUSD: 276.7574661747232,
      },
      {
        date: 1670859654188,
        priceUSD: 276.61240884478843,
      },
      {
        date: 1670859902261,
        priceUSD: 276.4638670276702,
      },
      {
        date: 1670860260207,
        priceUSD: 276.6032350308272,
      },
      {
        date: 1670860545150,
        priceUSD: 276.5840314088047,
      },
      {
        date: 1670860847950,
        priceUSD: 276.1412320385178,
      },
      {
        date: 1670861267007,
        priceUSD: 276.26749620953257,
      },
      {
        date: 1670861465602,
        priceUSD: 276.19815802363746,
      },
      {
        date: 1670861698449,
        priceUSD: 276.12116431639504,
      },
      {
        date: 1670861993841,
        priceUSD: 276.099826034346,
      },
      {
        date: 1670862280213,
        priceUSD: 276.20347333677404,
      },
      {
        date: 1670862602571,
        priceUSD: 276.2040155860024,
      },
      {
        date: 1670862941290,
        priceUSD: 276.2267191898603,
      },
      {
        date: 1670863215450,
        priceUSD: 276.08688942807896,
      },
      {
        date: 1670863472125,
        priceUSD: 276.06721199983974,
      },
      {
        date: 1670863927263,
        priceUSD: 276.6134667862375,
      },
      {
        date: 1670864052834,
        priceUSD: 276.6341432074165,
      },
      {
        date: 1670864395626,
        priceUSD: 276.68292770666034,
      },
      {
        date: 1670864769906,
        priceUSD: 276.6134373231297,
      },
      {
        date: 1670865056780,
        priceUSD: 276.18734155256345,
      },
      {
        date: 1670865309950,
        priceUSD: 276.10433333368513,
      },
      {
        date: 1670865593852,
        priceUSD: 275.98910534304434,
      },
      {
        date: 1670865850252,
        priceUSD: 275.9868393602577,
      },
      {
        date: 1670866183335,
        priceUSD: 275.91845650400165,
      },
      {
        date: 1670866561769,
        priceUSD: 276.0816466066013,
      },
      {
        date: 1670866793522,
        priceUSD: 276.2349191580091,
      },
      {
        date: 1670867092699,
        priceUSD: 276.16367861869657,
      },
      {
        date: 1670867395903,
        priceUSD: 276.0939029441357,
      },
      {
        date: 1670867699980,
        priceUSD: 276.1349065716535,
      },
      {
        date: 1670868039244,
        priceUSD: 275.7761918052112,
      },
      {
        date: 1670868368785,
        priceUSD: 275.5453069227761,
      },
      {
        date: 1670868549132,
        priceUSD: 275.45150668321486,
      },
      {
        date: 1670868881040,
        priceUSD: 275.0889366092062,
      },
      {
        date: 1670869192346,
        priceUSD: 274.92531525929445,
      },
      {
        date: 1670869475670,
        priceUSD: 275.1153678318994,
      },
      {
        date: 1670869834061,
        priceUSD: 275.1042070151504,
      },
      {
        date: 1670870098308,
        priceUSD: 275.17055123354265,
      },
      {
        date: 1670870421994,
        priceUSD: 275.04023300203954,
      },
      {
        date: 1670870697005,
        priceUSD: 275.1503757248931,
      },
      {
        date: 1670871022945,
        priceUSD: 275.0612746281136,
      },
      {
        date: 1670871340060,
        priceUSD: 275.305650905775,
      },
      {
        date: 1670871625428,
        priceUSD: 275.1456520718508,
      },
      {
        date: 1670871954496,
        priceUSD: 275.35539706275404,
      },
      {
        date: 1670872247419,
        priceUSD: 275.28253775278614,
      },
      {
        date: 1670872544271,
        priceUSD: 275.0426575340542,
      },
      {
        date: 1670872826902,
        priceUSD: 274.724842449657,
      },
      {
        date: 1670873102250,
        priceUSD: 274.5774504677769,
      },
      {
        date: 1670873470974,
        priceUSD: 274.43170384919097,
      },
      {
        date: 1670873688814,
        priceUSD: 274.4161605687393,
      },
      {
        date: 1670874031257,
        priceUSD: 274.18502012268186,
      },
      {
        date: 1670874328028,
        priceUSD: 273.67180550559436,
      },
      {
        date: 1670874644730,
        priceUSD: 273.47295486686716,
      },
      {
        date: 1670874899259,
        priceUSD: 273.4143681851762,
      },
      {
        date: 1670875293562,
        priceUSD: 273.73924104117197,
      },
      {
        date: 1670875495605,
        priceUSD: 274.3745463730086,
      },
      {
        date: 1670875819274,
        priceUSD: 274.70621829391814,
      },
      {
        date: 1670876135932,
        priceUSD: 274.7437494939747,
      },
      {
        date: 1670876437976,
        priceUSD: 274.838034123498,
      },
      {
        date: 1670876738674,
        priceUSD: 274.75831570132584,
      },
      {
        date: 1670877003947,
        priceUSD: 274.8745635767881,
      },
      {
        date: 1670877316889,
        priceUSD: 274.9740749724004,
      },
      {
        date: 1670877600902,
        priceUSD: 274.8683630444503,
      },
      {
        date: 1670877961728,
        priceUSD: 274.9507066051404,
      },
      {
        date: 1670878248739,
        priceUSD: 274.91277499248673,
      },
      {
        date: 1670878531169,
        priceUSD: 273.9298914895475,
      },
      {
        date: 1670878803597,
        priceUSD: 273.8491201469289,
      },
      {
        date: 1670879109045,
        priceUSD: 274.77021374654686,
      },
      {
        date: 1670879517129,
        priceUSD: 275.0912674522652,
      },
      {
        date: 1670879695006,
        priceUSD: 274.65213750592477,
      },
      {
        date: 1670879981123,
        priceUSD: 274.82371365764976,
      },
      {
        date: 1670880255595,
        priceUSD: 275.7774071105442,
      },
      {
        date: 1670880611398,
        priceUSD: 276.67398730232344,
      },
      {
        date: 1670880964696,
        priceUSD: 276.5420326652473,
      },
      {
        date: 1670881207230,
        priceUSD: 276.82850416759624,
      },
      {
        date: 1670881516312,
        priceUSD: 276.900841856241,
      },
      {
        date: 1670881815694,
        priceUSD: 276.89610896661367,
      },
      {
        date: 1670882146396,
        priceUSD: 276.654208356923,
      },
      {
        date: 1670882470667,
        priceUSD: 276.70897207527196,
      },
      {
        date: 1670882682302,
        priceUSD: 276.72781931133596,
      },
      {
        date: 1670883088787,
        priceUSD: 276.62223355572115,
      },
      {
        date: 1670883297665,
        priceUSD: 276.75929994182445,
      },
      {
        date: 1670883642864,
        priceUSD: 276.5213329488086,
      },
      {
        date: 1670883941792,
        priceUSD: 276.479385228236,
      },
      {
        date: 1670884205820,
        priceUSD: 276.74298202044565,
      },
      {
        date: 1670884568835,
        priceUSD: 277.0043742894383,
      },
      {
        date: 1670884868020,
        priceUSD: 276.53398090916704,
      },
      {
        date: 1670885135708,
        priceUSD: 276.7214455398538,
      },
      {
        date: 1670885459146,
        priceUSD: 276.5451403009547,
      },
      {
        date: 1670885684815,
        priceUSD: 276.5158381442302,
      },
      {
        date: 1670886036911,
        priceUSD: 276.7730235275047,
      },
      {
        date: 1670886296037,
        priceUSD: 276.7932560569853,
      },
      {
        date: 1670886621473,
        priceUSD: 276.83661026754334,
      },
      {
        date: 1670886965631,
        priceUSD: 276.7564280789949,
      },
      {
        date: 1670887303874,
        priceUSD: 276.73681657607267,
      },
      {
        date: 1670887567069,
        priceUSD: 277.13727114304425,
      },
      {
        date: 1670887913513,
        priceUSD: 276.7660447835262,
      },
      {
        date: 1670888109247,
        priceUSD: 276.7029369010065,
      },
      {
        date: 1670888408920,
        priceUSD: 276.83741664170645,
      },
      {
        date: 1670888730971,
        priceUSD: 276.9921735584495,
      },
      {
        date: 1670889074285,
        priceUSD: 277.1214471948018,
      },
      {
        date: 1670889259964,
        priceUSD: 276.950700638716,
      },
      {
        date: 1670889605011,
        priceUSD: 275.61108726717566,
      },
      {
        date: 1670889963436,
        priceUSD: 276.6628349643778,
      },
      {
        date: 1670890254410,
        priceUSD: 276.63908696671035,
      },
      {
        date: 1670890564559,
        priceUSD: 276.4926062142624,
      },
      {
        date: 1670890843805,
        priceUSD: 276.4346337562019,
      },
      {
        date: 1670891150687,
        priceUSD: 276.17266019625373,
      },
      {
        date: 1670891463328,
        priceUSD: 275.8253410846857,
      },
      {
        date: 1670891733014,
        priceUSD: 275.66440890055196,
      },
      {
        date: 1670891973407,
        priceUSD: 275.5841554387791,
      },
      {
        date: 1670892268030,
        priceUSD: 275.53443340186243,
      },
      {
        date: 1670892597008,
        priceUSD: 275.55559325983074,
      },
      {
        date: 1670892936415,
        priceUSD: 275.48773378968315,
      },
      {
        date: 1670893214047,
        priceUSD: 275.5880324955223,
      },
      {
        date: 1670893504902,
        priceUSD: 275.5004812342319,
      },
      {
        date: 1670893866124,
        priceUSD: 275.26026452795264,
      },
      {
        date: 1670894128553,
        priceUSD: 275.64875428488034,
      },
      {
        date: 1670894435091,
        priceUSD: 275.71798938188135,
      },
      {
        date: 1670894702366,
        priceUSD: 275.620213221425,
      },
      {
        date: 1670894983271,
        priceUSD: 275.56528063880023,
      },
      {
        date: 1670895264581,
        priceUSD: 275.7248011013043,
      },
      {
        date: 1670895680256,
        priceUSD: 274.9505834964267,
      },
      {
        date: 1670895909540,
        priceUSD: 274.70342822257174,
      },
      {
        date: 1670896155259,
        priceUSD: 274.72692732976816,
      },
      {
        date: 1670896504436,
        priceUSD: 274.8107321202371,
      },
      {
        date: 1670896819272,
        priceUSD: 274.80490143778536,
      },
      {
        date: 1670897185663,
        priceUSD: 273.16086758769626,
      },
      {
        date: 1670897463055,
        priceUSD: 273.0956001968933,
      },
      {
        date: 1670897696083,
        priceUSD: 272.9232902942295,
      },
      {
        date: 1670897995411,
        priceUSD: 272.93294929481993,
      },
      {
        date: 1670898305885,
        priceUSD: 272.83200298963266,
      },
      {
        date: 1670898628299,
        priceUSD: 271.93664818242394,
      },
      {
        date: 1670898982929,
        priceUSD: 271.2917768236507,
      },
      {
        date: 1670899231877,
        priceUSD: 271.7327245603563,
      },
      {
        date: 1670899530000,
        priceUSD: 272.22416156886453,
      },
      {
        date: 1670899867582,
        priceUSD: 272.2770199751384,
      },
      {
        date: 1670900104610,
        priceUSD: 272.42551807929715,
      },
      {
        date: 1670900405917,
        priceUSD: 272.43851207179824,
      },
      {
        date: 1670900676211,
        priceUSD: 272.4799442069455,
      },
      {
        date: 1670900999948,
        priceUSD: 272.1062205941408,
      },
      {
        date: 1670901356847,
        priceUSD: 272.19448284289075,
      },
      {
        date: 1670901596585,
        priceUSD: 272.2578270357787,
      },
      {
        date: 1670901913391,
        priceUSD: 272.40109900625816,
      },
      {
        date: 1670902224396,
        priceUSD: 272.0313717702792,
      },
      {
        date: 1670902517185,
        priceUSD: 271.7218539250787,
      },
      {
        date: 1670902843660,
        priceUSD: 271.73575640438924,
      },
      {
        date: 1670903046000,
        priceUSD: 271.74731136656874,
      },
    ])

    // axios
    //   .get(`https://api.coingecko.com/api/v3/coins/${coinGeckoId}/market_chart`, {
    //     params: { vs_currency: 'usd', days: filter.days },
    //   })
    //   .then((result) => {
    //     const data = result.data.prices.map((d) => {
    //       return {
    //         date: d[0],
    //         priceUSD: d[1],
    //       }
    //     })
    //     setChardData(data)
    //     console.log(data, 'setChardData')
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }, [filter, coinGeckoId])

  useEffect(() => {
    if (!coinGeckoIds) return

    setCurrencyDatas([
      {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
        current_price: 1270.36,
        market_cap: 153154689791,
        market_cap_rank: 2,
        fully_diluted_valuation: 153154689791,
        total_volume: 4576340921,
        high_24h: 1277.35,
        low_24h: 1243.43,
        price_change_24h: 25.25,
        price_change_percentage_24h: 2.02803,
        market_cap_change_24h: 3063622903,
        market_cap_change_percentage_24h: 2.04118,
        circulating_supply: 120521989.817511,
        total_supply: 120521989.817511,
        max_supply: null,
        ath: 4878.26,
        ath_change_percentage: -73.95126,
        ath_date: '2021-11-10T14:24:19.604Z',
        atl: 0.432979,
        atl_change_percentage: 293384.37186,
        atl_date: '2015-10-20T00:00:00.000Z',
        roi: {
          times: 98.02709537210228,
          currency: 'btc',
          percentage: 9802.709537210229,
        },
        last_updated: '2022-12-13T03:44:48.946Z',
      },
      {
        id: 'binancecoin',
        symbol: 'bnb',
        name: 'BNB',
        image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850',
        current_price: 271.75,
        market_cap: 44368192205,
        market_cap_rank: 4,
        fully_diluted_valuation: 54347151281,
        total_volume: 188496426,
        high_24h: 283.94,
        low_24h: 271.29,
        price_change_24h: -11.217516773672173,
        price_change_percentage_24h: -3.96428,
        market_cap_change_24h: -1846798336.0498505,
        market_cap_change_percentage_24h: -3.9961,
        circulating_supply: 163276974.63,
        total_supply: 163276974.63,
        max_supply: 200000000,
        ath: 686.31,
        ath_change_percentage: -60.40592,
        ath_date: '2021-05-10T07:24:17.097Z',
        atl: 0.0398177,
        atl_change_percentage: 682352.34317,
        atl_date: '2017-10-19T00:00:00.000Z',
        roi: null,
        last_updated: '2022-12-13T03:44:06.548Z',
      },
      {
        id: 'binance-usd',
        symbol: 'busd',
        name: 'Binance USD',
        image: 'https://assets.coingecko.com/coins/images/9576/large/BUSD.png?1568947766',
        current_price: 0.999588,
        market_cap: 21991869604,
        market_cap_rank: 6,
        fully_diluted_valuation: 21991869604,
        total_volume: 7248361953,
        high_24h: 1.005,
        low_24h: 0.99875,
        price_change_24h: -0.001170253606396221,
        price_change_percentage_24h: -0.11694,
        market_cap_change_24h: -124581695.17029953,
        market_cap_change_percentage_24h: -0.5633,
        circulating_supply: 22001352875.78,
        total_supply: 22001352875.78,
        max_supply: null,
        ath: 1.15,
        ath_change_percentage: -13.38697,
        ath_date: '2020-03-13T02:35:42.953Z',
        atl: 0.901127,
        atl_change_percentage: 10.93784,
        atl_date: '2021-05-19T13:04:37.445Z',
        roi: null,
        last_updated: '2022-12-13T03:45:26.776Z',
      },
      {
        id: 'dogecoin',
        symbol: 'doge',
        name: 'Dogecoin',
        image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1547792256',
        current_price: 0.089758,
        market_cap: 12328844653,
        market_cap_rank: 8,
        fully_diluted_valuation: null,
        total_volume: 799415506,
        high_24h: 0.091262,
        low_24h: 0.08731,
        price_change_24h: 0.00185953,
        price_change_percentage_24h: 2.11555,
        market_cap_change_24h: 216606265,
        market_cap_change_percentage_24h: 1.78833,
        circulating_supply: 137282056383.705,
        total_supply: null,
        max_supply: null,
        ath: 0.731578,
        ath_change_percentage: -87.7238,
        ath_date: '2021-05-08T05:08:23.458Z',
        atl: 0.0000869,
        atl_change_percentage: 103244.22229,
        atl_date: '2015-05-06T00:00:00.000Z',
        roi: null,
        last_updated: '2022-12-13T03:45:10.472Z',
      },
      {
        id: 'cardano',
        symbol: 'ada',
        name: 'Cardano',
        image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860',
        current_price: 0.305269,
        market_cap: 10702147663,
        market_cap_rank: 9,
        fully_diluted_valuation: 13742227381,
        total_volume: 157299222,
        high_24h: 0.308138,
        low_24h: 0.303039,
        price_change_24h: 0.00153613,
        price_change_percentage_24h: 0.50575,
        market_cap_change_24h: 56154116,
        market_cap_change_percentage_24h: 0.52747,
        circulating_supply: 35045020830.3234,
        total_supply: 45000000000,
        max_supply: 45000000000,
        ath: 3.09,
        ath_change_percentage: -90.10717,
        ath_date: '2021-09-02T06:00:10.474Z',
        atl: 0.01925275,
        atl_change_percentage: 1486.17797,
        atl_date: '2020-03-13T02:22:55.044Z',
        roi: null,
        last_updated: '2022-12-13T03:45:00.227Z',
      },
      {
        id: 'matic-network',
        symbol: 'matic',
        name: 'Polygon',
        image: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912',
        current_price: 0.904143,
        market_cap: 8103282769,
        market_cap_rank: 10,
        fully_diluted_valuation: 9048418018,
        total_volume: 241349257,
        high_24h: 0.911948,
        low_24h: 0.880656,
        price_change_24h: 0.02345048,
        price_change_percentage_24h: 2.66273,
        market_cap_change_24h: 222450369,
        market_cap_change_percentage_24h: 2.82268,
        circulating_supply: 8955469069.28493,
        total_supply: 10000000000,
        max_supply: 10000000000,
        ath: 2.92,
        ath_change_percentage: -68.97286,
        ath_date: '2021-12-27T02:08:34.307Z',
        atl: 0.00314376,
        atl_change_percentage: 28681.87535,
        atl_date: '2019-05-10T00:00:00.000Z',
        roi: {
          times: 342.78065723957474,
          currency: 'usd',
          percentage: 34278.06572395747,
        },
        last_updated: '2022-12-13T03:45:23.597Z',
      },
      {
        id: 'chainlink',
        symbol: 'link',
        name: 'Chainlink',
        image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1547034700',
        current_price: 6.63,
        market_cap: 3264286820,
        market_cap_rank: 23,
        fully_diluted_valuation: 6640128176,
        total_volume: 169352547,
        high_24h: 6.71,
        low_24h: 6.56,
        price_change_24h: 0.055551,
        price_change_percentage_24h: 0.8445,
        market_cap_change_24h: 30194840,
        market_cap_change_percentage_24h: 0.93364,
        circulating_supply: 491599971.2305644,
        total_supply: 1000000000,
        max_supply: 1000000000,
        ath: 52.7,
        ath_change_percentage: -87.39927,
        ath_date: '2021-05-10T00:13:57.214Z',
        atl: 0.148183,
        atl_change_percentage: 4381.04431,
        atl_date: '2017-11-29T00:00:00.000Z',
        roi: null,
        last_updated: '2022-12-13T03:45:14.135Z',
      },
      {
        id: 'pancakeswap-token',
        symbol: 'cake',
        name: 'PancakeSwap',
        image: 'https://assets.coingecko.com/coins/images/12632/large/pancakeswap-cake-logo_%281%29.png?1629359065',
        current_price: 3.77,
        market_cap: 598978879,
        market_cap_rank: 62,
        fully_diluted_valuation: 2836080288,
        total_volume: 31327663,
        high_24h: 3.96,
        low_24h: 3.78,
        price_change_24h: -0.18202487581832738,
        price_change_percentage_24h: -4.60758,
        market_cap_change_24h: -36869960.87749159,
        market_cap_change_percentage_24h: -5.79854,
        circulating_supply: 158399662.051997,
        total_supply: 350940543.328689,
        max_supply: 750000000,
        ath: 43.96,
        ath_change_percentage: -91.40171,
        ath_date: '2021-04-30T10:08:22.934Z',
        atl: 0.194441,
        atl_change_percentage: 1844.14438,
        atl_date: '2020-11-03T14:29:34.165Z',
        roi: null,
        last_updated: '2022-12-13T03:45:21.868Z',
      },
      {
        id: 'bitcoin-bep2',
        symbol: 'btcb',
        name: 'Bitcoin BEP2',
        image: 'https://assets.coingecko.com/coins/images/8749/large/4023.png?1560916975',
        current_price: 17145.59,
        market_cap: 0,
        market_cap_rank: null,
        fully_diluted_valuation: null,
        total_volume: 778704,
        high_24h: 17234.01,
        low_24h: 16889.93,
        price_change_24h: 225.89,
        price_change_percentage_24h: 1.33505,
        market_cap_change_24h: 0,
        market_cap_change_percentage_24h: 0,
        circulating_supply: 0,
        total_supply: 9001,
        max_supply: null,
        ath: 73830,
        ath_change_percentage: -76.80676,
        ath_date: '2021-11-10T14:19:27.662Z',
        atl: 2904.57,
        atl_change_percentage: 489.53896,
        atl_date: '2020-03-16T03:19:15.298Z',
        roi: null,
        last_updated: '2022-12-13T03:44:34.139Z',
      },
    ])
    // axios
    //   .get('https://api.coingecko.com/api/v3/coins/markets', { params: { vs_currency: 'usd', ids: coinGeckoIds } })
    //   .then((result) => {
    //     setCurrencyDatas(result.data)
    //     console.log(result.data, 'setChardDatasetChardData')
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }, [coinGeckoIds, coinGeckoId])

  return (
    <Page>
      <PageContainer>
        {/* {chainName === 'BSC' && !isStableSwap && (
            <Message variant="warning" mb="10px">
              <MessageText fontSize={16}>
                {t('PancakeSwap Info is currently under maintenance. Data may not be accurate or up-to-date.')}
              </MessageText>
            </Message>
          )} */}
        {/* <Heading scale="lg" mb="16px" id="info-overview-title">
            {t('PancakeSwap Info & Analytics')}
          </Heading> */}
        <ChartCardsContainer>
          <HoverableChart
            chartData={chartData}
            valueProperty="priceUSD"
            ChartComponent={LineChart}
            filter={filter}
            setFilter={setFilter}
            currencyDatas={currencyDatas}
            setCoinGeckoId={setCoinGeckoId}
            chainId={chainId}
            native={native}
          />
        </ChartCardsContainer>
        {/* <Heading scale="lg" mt="40px" mb="16px">
            {t('Top Tokens')}
          </Heading>
          <TokenTable tokenDatas={formattedTokens} /> */}
        {/* <Heading scale="lg" mt="40px" mb="16px">
            {t('Top Pairs')}
          </Heading>
          <PoolTable poolDatas={poolDatas} loading={somePoolsAreLoading} /> */}
        <WalletInfoTable currencyDatas={currencyDatas} native={native} />
        <TransactionTable transactions={transactions} />
      </PageContainer>
    </Page>
  )
}

export default Overview
