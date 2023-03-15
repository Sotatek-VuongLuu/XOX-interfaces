/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-cycle */
import { formatEther, formatUnits, parseEther, parseUnits } from '@ethersproject/units'
import { ChainId, ERC20Token } from '@pancakeswap/sdk'
import { useModal, useToast } from '@pancakeswap/uikit'
import tryParseAmount from '@pancakeswap/utils/tryParseAmount'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useXOXPreSaleContract } from 'hooks/useContract'
import keccak256 from 'keccak256'
import MerkleTree from 'merkletreejs'
import moment from 'moment'
import axios from 'axios'
import { useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import styled from 'styled-components'
import { Context } from '@pancakeswap/uikit/src/widgets/Modal/ModalContext'
import { getContractPreSaleAddress } from 'utils/addressHelpers'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useTranslation } from '@pancakeswap/localization'
import ModalBase from 'views/Referral/components/Modal/ModalBase'
import { Content } from 'views/Pools/components/style'
import { GridLoader } from 'react-spinners'
import { getDataRoundStats, getDataTransaction, getUserPreSaleInfo } from 'services/presale'
import BackedBy from './Components/BackedBy'
import ChartSalePage from './Components/Chart'
import CountDownBlock from './Components/CountDownBlock'
import { getPriceUsdPerToken } from './Components/getPrice'
import ModalSaleExchange from './Components/ModalExchange'
import SaleMechanism from './Components/SaleMechanism'
import SaleStats from './Components/SaleStats'
import SaleStatus from './Components/SaleStatus'
import SaleHistorySession from './VestingSaleHistory'
import { useGetSaleStats } from './hooks'

const Page = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 900px) {
    padding: 24px;
  }
`

const ContentContainer = styled.div`
  width: 1400px;
  @media screen and (max-width: 900px) {
    width: 100%;
  }
`

interface IYourInfo {
  id: number
  title: string
  amount: string
  field?: string
}

const initialYourInfo: IYourInfo[] = [
  {
    id: 1,
    title: 'Amount invested',
    amount: '1000',
    field: 'amountInvestUSD',
  },
  {
    id: 2,
    title: 'XOX amount bought',
    amount: '100',
    field: 'amountBoughtXOX',
  },
  {
    id: 3,
    title: 'XOX amount received',
    amount: '100',
    field: 'amountClaimXOX',
  },
  {
    id: 4,
    title: 'XOXS amount received',
    amount: '100',
    field: 'amountBoughtXOXS',
  },
]

const initialRefInfo = [
  {
    id: 1,
    title: 'XOXS amount received from Referral',
    amount: '1000',
  },
  {
    id: 2,
    title: 'Number of transactions applying your referral code',
    amount: '100',
  },
]

const initialTokenMetrics = [
  {
    id: 1,
    title: 'Team allocation (0% at TGE & 5 years vesting 20% Yearly)',
    tokenAllocationPercent: '7',
    tokenAllocation: '12600000',
    tge: '0',
    tokenAllocationatTge: '',
    initialMarketcap: '',
    fullyDilitedMc: '',
  },
  {
    id: 2,
    title: 'Company Reserve (0% at TGE & 4 years vesting 25% Yearly)',
    tokenAllocationPercent: '15',
    tokenAllocation: '27000000',
    tge: '0',
    tokenAllocationatTge: '',
    initialMarketcap: '',
    fullyDilitedMc: '',
  },
  {
    id: 3,
    title: 'Strategic Partnership (0% at TGE & 5 years vesting 20% Yearly)',
    tokenAllocationPercent: '5',
    tokenAllocation: '9000000',
    tge: '0',
    tokenAllocationatTge: '',
    initialMarketcap: '',
    fullyDilitedMc: '',
  },
  {
    id: 4,
    title: 'Ecosystem Growth (0% at TGE & 4 years vesting 25% Yearly)',
    tokenAllocationPercent: '20',
    tokenAllocation: '36000000',
    tge: '0',
    tokenAllocationatTge: '',
    initialMarketcap: '',
    fullyDilitedMc: '',
  },
  {
    id: 5,
    title: 'Community Rewards (0% at TGE & 5 years vesting 20% Yearly)',
    tokenAllocationPercent: '1',
    tokenAllocation: '1800000',
    tge: '0',
    tokenAllocationatTge: '',
    initialMarketcap: '',
    fullyDilitedMc: '',
  },
  {
    id: 6,
    title: 'XOX labs Foundation (0% at TGE & 5 years vesting 20% Yearly)',
    tokenAllocationPercent: '3',
    tokenAllocation: '5400000',
    tge: '0',
    tokenAllocationatTge: '',
    initialMarketcap: '',
    fullyDilitedMc: '',
  },
  {
    id: 7,
    title: 'LP Farming (20% at Launch then 10% unlock Each year for 8 years)',
    tokenAllocationPercent: '10',
    tokenAllocation: '18000000',
    tge: '2',
    tokenAllocationatTge: '3600000',
    initialMarketcap: '216000',
    fullyDilitedMc: '',
  },
  {
    id: 8,
    title: 'Seed Sale (10% release at TGE then 10% Unlock Weekly)',
    tokenAllocationPercent: '2',
    tokenAllocation: '3600000',
    tge: '0.2',
    tokenAllocationatTge: '360000',
    initialMarketcap: '21600',
    fullyDilitedMc: '',
  },
  {
    id: 9,
    title: 'Partners Sale (10% release at TGE then 5% release Monthly)',
    tokenAllocationPercent: '3',
    tokenAllocation: '5400000',
    tge: '0.2',
    tokenAllocationatTge: '360000',
    initialMarketcap: '21600',
    fullyDilitedMc: '',
  },
  {
    id: 10,
    title: 'Private Sale (10% release at TGE then 10% release Monthly)',
    tokenAllocationPercent: '6',
    tokenAllocation: '10800000',
    tge: '0.6',
    tokenAllocationatTge: '1080000',
    initialMarketcap: '64800',
    fullyDilitedMc: '',
  },
  {
    id: 11,
    title: 'Public Sale (40% realease at TGE then 10% Monthly)',
    tokenAllocationPercent: '10%',
    tokenAllocation: '18000000',
    tge: '4',
    tokenAllocationatTge: '7200000',
    initialMarketcap: '432000',
    fullyDilitedMc: '',
  },
  {
    id: 12,
    title: 'Liquidity Pools DEX (100% lock 5 years)',
    tokenAllocationPercent: '8',
    tokenAllocation: '14400000',
    tge: '8',
    tokenAllocationatTge: '14400000',
    initialMarketcap: '864000',
    fullyDilitedMc: '',
  },
  {
    id: 13,
    title: 'CEX Listing (TGE = 40% then 10% Monthly Release)',
    tokenAllocationPercent: '10',
    tokenAllocation: '18000000',
    tge: '4',
    tokenAllocationatTge: '7200000',
    initialMarketcap: '423000',
    fullyDilitedMc: '',
  },
  {
    id: 14,
    title: 'Total include LP',
    tokenAllocationPercent: '100',
    tokenAllocation: '180000000',
    tge: '19',
    tokenAllocationatTge: '34200000',
    initialMarketcap: '2052000',
    fullyDilitedMc: '10800000',
  },
  {
    id: 15,
    title: 'Total Exclude LP',
    tokenAllocationPercent: '',
    tokenAllocation: '',
    tge: '11',
    tokenAllocationatTge: '19800000',
    initialMarketcap: '118800',
    fullyDilitedMc: '',
  },
]

/// for stats

export interface Start {
  id: number
  title: string
  amount: string
  icon?: string
  field?: string
  decimal?: number
}

const initStat: Start[] = [
  {
    id: 1,
    title: 'Total Current Raised',
    amount: '10.000',
    icon: '$',
    field: 'total_raised_usd',
    decimal: 6,
  },
  {
    id: 2,
    title: 'XOX amount bought',
    amount: '5.000',
    field: 'xox_amount_bought',
    decimal: 18,
  },
  {
    id: 3,
    title: 'Number of Investors',
    amount: '+500',
    field: 'total_investor',
  },
  {
    id: 4,
    title: 'Total XOXS Amount Rewarded',
    amount: '5.000',
    field: 'xoxs_amount_reward',
    decimal: 6,
  },
]

function useSelectors(reducer, mapStateToSelectors) {
  const [state] = reducer
  const selectors = useMemo(() => mapStateToSelectors(state), [state])
  return selectors
}

const reducer = (state = initialYourInfo, action) => {
  switch (action.type) {
    case 'COMPLETE':
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, amount: action.payload }
        }
        return todo
      })
    default:
      return state
  }
}

export const tabSaleMechanism: string[] = [
  'Private Sale Mechanism',
  'Sale Referral Program',
  'Token Metrics',
  'Vesting Schedule',
  'Your Information',
]

export enum TYPE_BY {
  BY_USDC,
  BY_ETH,
}

export const USDC_TEST = '0xfcdD04b6a25E533d8F16210Cb552020D6d880749'

export const NATIVE_TOKEN = '0x0000000000000000000000000000000000000000'
export const ADDRESS_CODE = '0x0000000000000000000000000000000000000000'

export enum ROUND {
  NOT_START,
  ONE,
  TWO,
  THREE,
}

const now = new Date()
const timeStampOfNow = now.getTime()

const WHITELIST = [
  '0x92282af2a9cc5364b4cf091d08a552882dc612e6',
  '0x3017c1bdcecd9394a2b5c8725016e224264a3c18',
  '0x7a6837c121b5cc61da94765df04fc7ed1a5b560a',
  '0xa7c99ea330ebcbeb0e2a960c9ab89370819faabc',
  '0xd867ab64045267fe2b48dc49823a4df74d1fe366',
  '0x400ee0c820144c8bb559ace1ad75e5c13e750334',
  '0xf1bfe27f383f98bddeb444a78b08c121954b4f62',
  '0x93ba7de27bcc9b4b81ae4ec8b0880ac0d649ca7e',
  '0xd3782f8c8371766ea59bab1950785454b48a9d43',
  '0x6c5532d1648d63624111459b9a5a0b01d3df6b43',
  '0x9606aaf89ad0f330b846f08128ed44c1253d32ad',
  '0x1043987a09d87c13d42c7a62a0b0f4546e60fc8f',
  '0xf39c1e8f765f9ac265f743522d76e77debde5e4a',
]

export const USDC_TESTNET = new ERC20Token(
  ChainId.GOERLI,
  USDC_TEST,
  6,
  'USDC',
  'USDC',
  'http://localhost:3001/pools?chainId=5',
)

export interface RoundInfo {
  totalDistribution: number | null
  startDate: number | null
  endDate: number | null
  bonusPercentage: number | null
  exchangeRate: number | null
}

const defaultRoundInfo = {
  totalDistribution: null,
  startDate: null,
  endDate: null,
  bonusPercentage: null,
  exchangeRate: null,
}

function VestingPage() {
  const [tabActiveMechansim, setTabActiveMechansim] = useState<string>('Private Sale Mechanism')
  const [referralError, setReferralError] = useState(null)
  const counterReducer = useReducer(reducer, initialYourInfo)
  const [dataForInfo, setDataForInfo] = useState<IYourInfo[]>(initialYourInfo)
  const { account, chainId } = useActiveWeb3React()
  const [typeBuyPrice, setTypeBuyPrice] = useState<number | null>(null)
  const [amount, setAmount] = useState<string>('')
  const [currentRound, setCurrentRound] = useState<number | null>(0)
  const [infoRoundOne, setInfoRoundOne] = useState<RoundInfo>(defaultRoundInfo)
  const [infoRoundTow, setInfoRoundTow] = useState<RoundInfo>(defaultRoundInfo)
  const [infoRoundThree, setInfoRoundThree] = useState<RoundInfo>(defaultRoundInfo)
  const [ethPerDolla, setEthPerDolla] = useState<null | number>(null)
  const [referralCode, setReferralCode] = useState(null)
  const [codeRef, setCodeRef] = useState('')
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const [totalXOXTokenInRound, setTotalXOXTokenInRound] = useState<number | string | null>(0)
  const { nodeId } = useContext(Context)
  const contractPreSale = useXOXPreSaleContract()
  const [whiteList, setWhiteList] = useState<string[]>(WHITELIST)
  const [isUserInWhiteList, setIsUserInWhiteList] = useState<boolean>(false)
  const [approvalState, approveCallback] = useApproveCallback(
    USDC_TEST && tryParseAmount('0.01', USDC_TESTNET),
    getContractPreSaleAddress(5),
  )
  const [dataTransaction, setDataTransaction] = useState<any>([])
  const [arrSaleStats, setArrSaleStats] = useState<Start[]>(initStat)
  const [isInTimeRangeSale, setIsInTimeRangeSale] = useState<boolean>(false)
  const resSaleStats = useGetSaleStats()
  const [dataStatus, setDataStatus] = useState<any>([])

  const handleUpdateDataSale = (arr: Start[], dataSaleStatsParams: any) => {
    const dataUpdate = Array.from(arr).map((item: Start) => {
      return {
        ...item,
        amount: dataSaleStatsParams[item.field],
      }
    })
    setArrSaleStats(dataUpdate)
    return null
  }

  useEffect(() => {
    if (!resSaleStats) return
    handleUpdateDataSale(initStat, resSaleStats?.dataSaleStats[0])
  }, [resSaleStats])

  const [isOpenLoadingClaimModal, setIsOpenLoadingClaimModal] = useState<boolean>(false)
  const [amountXOX, setAmountXOX] = useState<string | number>('-')
  const [amountXOXS, setAmountXOXS] = useState<string | number>('-')
  const handleApprove = useCallback(async () => {
    await approveCallback()
  }, [approveCallback])

  const handleGetInfoRound = async () => {
    const [dataROne, dataRTwo, dataRThree, currentR] = await Promise.all([
      contractPreSale.saleRound(ROUND.ONE),
      contractPreSale.saleRound(ROUND.TWO),
      contractPreSale.saleRound(ROUND.THREE),
      contractPreSale.currentRound(),
    ])

    setInfoRoundOne({
      ...infoRoundOne,
      totalDistribution: 2700000,
      startDate: new BigNumber(dataROne.startDate._hex).multipliedBy(1000).toNumber(),
      endDate: new BigNumber(dataROne.endDate._hex).multipliedBy(1000).toNumber(),
      bonusPercentage: new BigNumber(dataROne.bonusPercentage._hex).toNumber(),
      exchangeRate: new BigNumber(dataROne.exchangeRate._hex).toNumber(),
    })

    setInfoRoundTow({
      ...infoRoundTow,
      totalDistribution: 3600000,
      startDate: new BigNumber(dataRTwo.startDate._hex).multipliedBy(1000).toNumber(),
      endDate: new BigNumber(dataRTwo.endDate._hex).multipliedBy(1000).toNumber(),
      bonusPercentage: new BigNumber(dataRTwo.bonusPercentage._hex).toNumber(),
      exchangeRate: new BigNumber(dataRTwo.exchangeRate._hex).toNumber(),
    })
    setInfoRoundThree({
      ...infoRoundThree,
      totalDistribution: 4500000,
      startDate: new BigNumber(dataRThree.startDate._hex).multipliedBy(1000).toNumber(),
      endDate: new BigNumber(dataRThree.endDate._hex).multipliedBy(1000).toNumber(),
      bonusPercentage: new BigNumber(dataRThree.bonusPercentage._hex).toNumber(),
      exchangeRate: new BigNumber(dataRThree.exchangeRate._hex).toNumber(),
    })
    setCurrentRound(new BigNumber(currentR._hex).toNumber())
  }

  const handleGetOneHourBeforeSale = () => {
    const timeStartWhiteList = moment
      .unix(infoRoundOne.startDate / 1000)
      .subtract(1, 'hour')
      .unix()
    return timeStartWhiteList * 1000
  }

  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  const getHexProof = async (whitelist: string[], owner: string) => {
    const arrHash = await whitelist.map((acc) => keccak256(acc))
    const merkele = await new MerkleTree(arrHash, keccak256, { sortLeaves: true, sortPairs: true })
    return merkele.getHexProof(keccak256(owner))
  }

  const handeInvest = async () => {
    const _merkleProof = await getHexProof(whiteList, account)
    const valueETH = typeBuyPrice === TYPE_BY.BY_ETH ? parseEther(amount.toString()) : parseEther('0')
    const addressTokenBuy = typeBuyPrice === TYPE_BY.BY_ETH ? NATIVE_TOKEN : USDC_TEST
    const refAddess = !codeRef ? ADDRESS_CODE : referralCode
    const amountParse =
      typeBuyPrice === TYPE_BY.BY_ETH ? parseEther(amount.toString()) : parseUnits(amount.toString(), 6)

    if (
      isUserInWhiteList &&
      handleGetOneHourBeforeSale() <= timeStampOfNow &&
      timeStampOfNow < infoRoundOne.startDate
    ) {
      try {
        setIsOpenLoadingClaimModal(true)
        const gasFee = await contractPreSale.estimateGas.whiteListedInvest(
          addressTokenBuy,
          amountParse,
          refAddess,
          _merkleProof,
          {
            value: valueETH,
          },
        )
        const txWhitelist = await contractPreSale.whiteListedInvest(
          addressTokenBuy,
          amountParse,
          refAddess,
          _merkleProof,
          {
            gasLimit: gasFee,
            value: valueETH,
          },
        )
        const txHash = await txWhitelist.wait(1)
        if (txHash?.transactionHash) {
          setIsOpenLoadingClaimModal(false)
          onDissmiss()
          toastSuccess(
            `Bought XOX`,
            <ToastDescriptionWithTx txHash={txHash.transactionHash}>
              {t('Your %symbol% invests have been sent to your wallet!', { symbol: 'XOX' })}
            </ToastDescriptionWithTx>,
          )
        }
      } catch (error: any) {
        setIsOpenLoadingClaimModal(false)
        if (error?.message?.includes('rejected')) {
          toastError('Error', 'User rejected the request.')
          return
        }
        if (error?.code !== 4001) {
          toastError('Error', 'Transaction failed')
        }
      }
    }

    if (isInTimeRangeSale) {
      try {
        setIsOpenLoadingClaimModal(true)
        const gasFee = await contractPreSale.estimateGas.invest(addressTokenBuy, amountParse, refAddess, {
          value: valueETH,
        })
        const txInvest = await contractPreSale.invest(addressTokenBuy, amountParse, refAddess, {
          value: valueETH,
          gasLimit: gasFee,
        })
        const txHashInvest = await txInvest.wait(1)
        if (txHashInvest?.transactionHash) {
          onDissmiss()
          setIsOpenLoadingClaimModal(false)
          toastSuccess(
            `Bought XOX`,
            <ToastDescriptionWithTx txHash={txHashInvest.transactionHash}>
              {t('Your %symbol% invests have been sent to your wallet!', { symbol: 'XOX' })}
            </ToastDescriptionWithTx>,
          )
        }
      } catch (error: any) {
        setIsOpenLoadingClaimModal(false)
        if (error?.message?.includes('rejected')) {
          toastError('Error', 'User rejected the request.')
          return
        }
        if (error?.code !== 4001) {
          toastError('Error', 'Transaction failed')
        }
      }
    }
  }

  const handCheckInTimeRangeSale = () => {
    if (
      (infoRoundOne.startDate <= timeStampOfNow && timeStampOfNow <= infoRoundOne.endDate) ||
      (infoRoundTow.startDate <= timeStampOfNow && timeStampOfNow <= infoRoundTow.endDate) ||
      (infoRoundThree.startDate <= timeStampOfNow && timeStampOfNow <= infoRoundThree.endDate)
    ) {
      setIsInTimeRangeSale(true)
    } else {
      setIsInTimeRangeSale(false)
    }
  }

  const handleGetTotalTokenInvested = async (round: number) => {
    try {
      const data = await contractPreSale.totalRoundInvested(round)
      if (data) {
        setTotalXOXTokenInRound(new BigNumber(formatEther(data._hex)).toNumber())
      }
    } catch (error: any) {
      if (error?.code !== 4001) {
        toastError('Error', 'Transaction failed')
      }
    }
  }

  const handleGetPrice = async () => {
    try {
      const [result, decimals] = await getPriceUsdPerToken()
      if (result) {
        setEthPerDolla(new BigNumber(result?.answer?._hex).div(new BigNumber(10).pow(decimals)).toNumber())
      }
    } catch (error) {
      console.warn(error)
    }
  }

  const handleChangeReferal = (value: string) => {
    if (!account) return
    if (value.length === 0) {
      setReferralError(null)
      return
    }
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/users/referalcode/existed`, { address: account, referal_code: value })
      .then((response) => {
        if (response.data) {
          setReferralError(null)
          axios
            .get(`${process.env.NEXT_PUBLIC_API}/users`, { params: { ref: value } })
            .then((res) => {
              if (res.data.address) setReferralCode(res.data.address)
            })
            .catch((error) => console.warn(error))
        }
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          setReferralError(error.response.data.message)
        }
      })
  }

  const [onModalExchangeSale, onDissmiss] = useModal(
    <ModalSaleExchange
      amount={amount}
      setAmount={setAmount}
      typeBuyPrice={typeBuyPrice}
      approvalState={approvalState}
      approvalSubmitted={approvalSubmitted}
      handeInvest={handeInvest}
      handleApprove={handleApprove}
      ethPerDolla={ethPerDolla}
      currentRound={currentRound}
      handleChangeReferal={handleChangeReferal}
      setCodeRef={setCodeRef}
      referralError={referralError}
      amountXOX={amountXOX}
      amountXOXS={amountXOXS}
      setAmountXOX={setAmountXOX}
      setAmountXOXS={setAmountXOXS}
      isTimeAllowWhitelist={handleGetOneHourBeforeSale() <= timeStampOfNow && timeStampOfNow < infoRoundOne.startDate}
    />,
    true,
    true,
    'exchange-sale',
  )

  const handleGetPreSaleUserInfo = async (initUserInfo: IYourInfo[]) => {
    const data = await getUserPreSaleInfo()
    if (data && data.userPreSaleDatas && data.userPreSaleDatas?.length > 0) {
      const result = {
        amountInvestUSD: 0,
        amountBoughtXOX: 0,
        amountBoughtXOXS: 0,
        amountClaimXOX: 0,
      }
      Array.from(data.userPreSaleDatas).forEach((item: any) => {
        result.amountInvestUSD += new BigNumber(item?.amountInvestUSD).div(10 ** 6).toNumber()
        result.amountBoughtXOX += new BigNumber(item?.amountBoughtXOX).div(10 ** 18).toNumber()
        result.amountBoughtXOXS += new BigNumber(item?.amountBoughtXOXS).div(10 ** 6).toNumber()
        result.amountClaimXOX += new BigNumber(item?.amountClaimXOX).toNumber()
        return null
      })

      const arrUpdate: IYourInfo[] = Array.from(initUserInfo).map((item: IYourInfo) => {
        return {
          ...item,
          amount: new BigNumber(result[item.field]).toFixed(2),
        }
      })
      setDataForInfo(arrUpdate)
    }
  }

  const handleGetRoundStatus = async () => {
    const data = await getDataRoundStats()
    if (data && data.roundStats) {
      setDataStatus(data.roundStats)
    }
  }

  const handleGetDataTransaction = async () => {
    const result = await getDataTransaction()
    if (result && result?.transactionPreSales) {
      setDataTransaction(result?.transactionPreSales)
    }
  }

  useEffect(() => {
    if (!account || !chainId) return
    handleGetDataTransaction()
    handleGetRoundStatus()
  }, [account, chainId])

  useEffect(() => {
    setReferralError(null)
    setAmount('')
  }, [nodeId])

  useEffect(() => {
    setReferralError(null)
    if (!account || !codeRef) return
    handleChangeReferal(codeRef)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approvalState, approvalSubmitted])

  useEffect(() => {
    if (!account || !chainId) return
    handleGetTotalTokenInvested(currentRound)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRound, account, chainId])

  useEffect(() => {
    if (!account || !chainId) return
    handCheckInTimeRangeSale()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoRoundOne, infoRoundTow, infoRoundThree, account, chainId])

  useEffect(() => {
    if (!account) return
    if (whiteList.includes(account.toLocaleLowerCase())) {
      setIsUserInWhiteList(true)
    } else {
      setIsUserInWhiteList(false)
    }
  }, [whiteList, setWhiteList, account])

  useEffect(() => {
    if (!account || !chainId) return
    handleGetInfoRound()
    handleGetPrice()
    handleGetPreSaleUserInfo(initialYourInfo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId])

  useEffect(() => {
    handleGetOneHourBeforeSale()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoRoundOne])

  return (
    <>
      <Page>
        <ContentContainer>
          <CountDownBlock
            onModalExchangeSale={onModalExchangeSale}
            currentRound={currentRound}
            infoRoundOne={infoRoundOne}
            infoRoundTow={infoRoundTow}
            infoRoundThree={infoRoundThree}
            isInTimeRangeSale={isInTimeRangeSale}
            isUserInWhiteList={isUserInWhiteList}
            isTimeAllowWhitelist={
              handleGetOneHourBeforeSale() <= timeStampOfNow && timeStampOfNow < infoRoundOne.startDate
            }
            setTypeBuyPrice={setTypeBuyPrice}
            typeBuyPrice={typeBuyPrice}
            totalXOXTokenInRound={totalXOXTokenInRound}
          />
          <SaleStats dataStat={arrSaleStats} />
          <ChartSalePage />
          <SaleStatus
            isInTimeRangeSale={isInTimeRangeSale}
            dataStatus={dataStatus}
            infoRoundOne={infoRoundOne}
            infoRoundTow={infoRoundTow}
            infoRoundThree={infoRoundThree}
          />
          <SaleMechanism
            tabSaleMechanism={tabSaleMechanism}
            tabActiveMechansim={tabActiveMechansim}
            setTabActiveMechansim={setTabActiveMechansim}
            initialTokenMetrics={initialTokenMetrics}
            dataInfo={dataForInfo}
            dataRefInfo={initialRefInfo}
            dataTransaction={dataTransaction}
          />
          <SaleHistorySession dataTransaction={dataTransaction} />
          <BackedBy />
        </ContentContainer>
      </Page>

      <ModalBase
        open={isOpenLoadingClaimModal}
        handleClose={() => setIsOpenLoadingClaimModal(false)}
        title="Confirm PreSale"
      >
        <Content>
          <div className="xox_loading" style={{ margin: '24px 0px' }}>
            <GridLoader color="#FB8618" style={{ width: '51px', height: '51px' }} />
          </div>
          <div className="noti_claim_pending_h1">Waiting For Confirmation</div>
          <div className="noti_claim_pending_h3">Buying {amountXOX} XOX</div>
          <div className="noti_claim_pending_h2">Confirm this transaction in your wallet</div>
          <img
            src="/images/close-one.svg"
            alt="close-one"
            className="x-close-icon"
            aria-hidden="true"
            onClick={() => setIsOpenLoadingClaimModal(false)}
          />
        </Content>
      </ModalBase>
    </>
  )
}

export default VestingPage
