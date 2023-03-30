/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-cycle */
import { formatEther, parseEther, parseUnits } from '@ethersproject/units'
import { ChainId, ERC20Token } from '@pancakeswap/sdk'
import { useModal, useToast } from '@pancakeswap/uikit'
import tryParseAmount from '@pancakeswap/utils/tryParseAmount'
import BigNumber from 'bignumber.js'
import { BigNumber as BigNumberEthers } from '@ethersproject/bignumber'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useXOXPreSaleContract } from 'hooks/useContract'
import moment from 'moment'
import axios from 'axios'
import { useCallback, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Context } from '@pancakeswap/uikit/src/widgets/Modal/ModalContext'
import { getContractPreSaleAddress } from 'utils/addressHelpers'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useTranslation } from '@pancakeswap/localization'
import ModalBase from 'views/Referral/components/Modal/ModalBase'
import { Content } from 'views/Pools/components/style'
import { GridLoader } from 'react-spinners'
import {
  getDataReferralPresale,
  getDataRoundStats,
  getDataTransaction,
  getDataTransactionClaimOfUser,
  getDataTransactionOfUser,
  getUserPreSaleInfo,
} from 'services/presale'
import { getBalancesForEthereumAddress } from 'ethereum-erc20-token-balances-multicall'
import { useProvider } from 'wagmi'
import { USDT, USDT_GOERLI } from '@pancakeswap/tokens'
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
  @media screen and (max-width: 1200px) {
    padding: 24px;
  }
`

const ContentContainer = styled.div`
  width: 1400px;
  @media screen and (max-width: 1399px) {
    width: 1200px;
  }
  @media screen and (max-width: 1200px) {
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
    amount: '-',
    field: 'amountInvestUSD',
  },
  {
    id: 2,
    title: 'XOX amount bought',
    amount: '-',
    field: 'amountBoughtXOX',
  },
  {
    id: 3,
    title: 'XOX amount received',
    amount: '-',
    field: 'amountClaimXOX',
  },
  {
    id: 4,
    title: 'XOXS amount received',
    amount: '-',
    field: 'amountBoughtXOXS',
  },
]

export interface IRefInfo {
  id: number | string
  title: string
  amountInit: string
  account?: string
  rewardXOXS?: string
  totalTransactionApplyReferral?: string
}
const initialRefInfo: IRefInfo[] = [
  {
    id: 1,
    title: 'XOXS amount received from Referral',
    amountInit: '-',
  },
  {
    id: 2,
    title: 'Number of transactions applying your referral code',
    amountInit: '-',
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
    tokenAllocationPercent: '10',
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
    amount: '',
    icon: '$',
    field: 'total_raised_usd',
    decimal: 6,
  },
  {
    id: 2,
    title: 'XOX amount bought',
    amount: '',
    field: 'xox_amount_bought',
    decimal: 18,
  },
  {
    id: 3,
    title: 'Number of Investors',
    amount: '',
    icon: '',
    field: 'total_investor',
  },
  {
    id: 4,
    title: 'Total XOXS Amount Rewarded',
    amount: '',
    field: 'xoxs_amount_reward',
    decimal: 6,
  },
]

export const tabSaleMechanism: string[] = [
  'Your Information',
  'Private Sale Mechanism',
  'Sale Referral Program',
  'Token Metrics',
  'Vesting Schedule',
]

export interface IVestingTime {
  title: string
  amountVested: number | string
  remaining: number | string
  yourCurrentXOX: number | string
  startTime: number[]
  statusClaim: boolean
  round?: number
}

export enum TYPE_BY {
  BY_ERC20,
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

export enum SALE_ROUND {
  ONE,
  TWO,
  THREE,
}
export const vestingTiming: IVestingTime[] = [
  {
    title: 'Sale 1',
    amountVested: 0,
    remaining: 0,
    yourCurrentXOX: 0,
    startTime: [],
    statusClaim: false,
    round: ROUND.ONE,
  },
  {
    title: 'Sale 2',
    amountVested: 0,
    remaining: 0,
    yourCurrentXOX: 0,
    startTime: [],
    statusClaim: false,
    round: ROUND.TWO,
  },
  {
    title: 'Sale 3',
    amountVested: 0,
    remaining: 0,
    yourCurrentXOX: 0,
    startTime: [],
    statusClaim: false,
    round: ROUND.THREE,
  },
]

const now = new Date()
export const timeStampOfNow = now.getTime()

interface IDataWhitelist {
  address: string
  proof: string[]
}

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

export const decimal = 6

function VestingPage() {
  const notSupport = [ChainId.BSC_TESTNET, ChainId.BSC]
  const [tabActiveMechansim, setTabActiveMechansim] = useState<string>('Your Information')
  const [referralError, setReferralError] = useState(null)
  const [dataWhitelist, setDataWhitelist] = useState<IDataWhitelist[]>([])
  const [dataForInfo, setDataForInfo] = useState<IYourInfo[]>(initialYourInfo)
  const { account, chainId } = useActiveWeb3React()
  const [typeBuyPrice, setTypeBuyPrice] = useState<number | null>(null)
  const [amount, setAmount] = useState<string>('')
  const [currentRound, setCurrentRound] = useState<number | null>(0)
  const [infoRoundOne, setInfoRoundOne] = useState<RoundInfo>(defaultRoundInfo)
  const [infoRoundTow, setInfoRoundTow] = useState<RoundInfo>(defaultRoundInfo)
  const [infoRoundThree, setInfoRoundThree] = useState<RoundInfo>(defaultRoundInfo)
  const [ethPerDolla, setEthPerDolla] = useState<null | number>(null)
  const [referralCode, setReferralCode] = useState(ADDRESS_CODE)
  const [codeRef, setCodeRef] = useState('')
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const [totalXOXTokenInRound, setTotalXOXTokenInRound] = useState<number | string | null>(0)
  const { nodeId } = useContext(Context)

  const contractPreSale = !account
    ? process.env.NODE_ENV === 'production'
      ? notSupport.includes(chainId)
        ? useXOXPreSaleContract(ChainId.GOERLI)
        : useXOXPreSaleContract(ChainId.GOERLI) /// OR ETH ON MAINNET
      : useXOXPreSaleContract(ChainId.GOERLI)
    : notSupport.includes(chainId)
    ? useXOXPreSaleContract(ChainId.GOERLI)
    : useXOXPreSaleContract(ChainId.GOERLI)

  const [whiteList, setWhiteList] = useState<string[]>([])
  const [isUserInWhiteList, setIsUserInWhiteList] = useState<boolean>(false)

  const [approvalState, approveCallback] = useApproveCallback(
    USDT[ChainId.GOERLI] && tryParseAmount('0.01', USDT_GOERLI),
    getContractPreSaleAddress(5),
  )
  const [dataRef, setDataRef] = useState<IRefInfo[]>(initialRefInfo)
  const [balanceLP, setBalanceLP] = useState<any>()
  const [balanceNative, setBalanceNative] = useState<any>()
  const provider = useProvider({ chainId })
  const [dataTransaction, setDataTransaction] = useState<any>([])
  const [dataTransactionOfUser, setDataTransactionOfUser] = useState<any>([])
  const [dataTransactionClaimOfUser, setDataTransactionClaimOfUser] = useState<any>([])
  const [arrSaleStats, setArrSaleStats] = useState<Start[]>(initStat)
  const [isInTimeRangeSale, setIsInTimeRangeSale] = useState<boolean>(false)
  const resSaleStats = useGetSaleStats()
  const [dataStatus, setDataStatus] = useState<any>([])
  const [dataVestingSchedule, setDataVestingSchedule] = useState<IVestingTime[]>([])
  const [messageConfirm, setMessageConfirm] = useState<string>('')
  const [massageErrorAmount, setMassageErrorAmount] = useState<string>('')
  const [reacheZero, setReachZero] = useState<boolean>(null)
  const [isTimeAllowWhitelist, setIsTimeAllowWhitelist] = useState<boolean>(false)
  const [_, setisReachWhitelist] = useState<boolean>(false)
  const [loadOk, setLoadOk] = useState(false)
  const [timeRecall, setTimeRecall] = useState(7)
  const handleUpdateDataSale = (arr: Start[], dataSaleStatsParams: any) => {
    if (dataSaleStatsParams.length !== 0) {
      const dataUpdate = Array.from(arr).map((item: Start) => {
        return {
          ...item,
          amount: dataSaleStatsParams[0][item?.field],
        }
      })
      setArrSaleStats(dataUpdate)
      return null
    }
    setArrSaleStats(initStat)
    return null
  }

  const [isOpenLoadingClaimModal, setIsOpenLoadingClaimModal] = useState<boolean>(false)
  const [amountXOX, setAmountXOX] = useState<string | number>('-')
  const [amountXOXS, setAmountXOXS] = useState<string | number>('-')
  const handleApprove = useCallback(async () => {
    await approveCallback()
  }, [approveCallback])

  const handleGetInfoRound = async () => {
    try {
      if (chainId === 97 || chainId === 56) return
      const [dataROne, dataRTwo, dataRThree] = await Promise.all([
        contractPreSale.saleRound(ROUND.ONE),
        contractPreSale.saleRound(ROUND.TWO),
        contractPreSale.saleRound(ROUND.THREE),
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
    } catch (error) {
      console.warn(error)
    }
  }

  const handleGetCurrentRound = async (time: any) => {
    try {
      if (chainId === 97 || chainId === 56) return

      if (infoRoundOne.startDate && infoRoundOne.startDate <= time) {
        setCurrentRound(1)
      }
      if (infoRoundTow.startDate && infoRoundTow.startDate <= time) {
        setCurrentRound(2)
      }
      if (infoRoundThree.startDate && infoRoundThree.startDate <= time) {
        setCurrentRound(3)
      }
    } catch (error) {
      console.warn(error)
    }
  }

  const handleGetOneHourBeforeSale = () => {
    const timeStartWhiteList = moment
      .unix(infoRoundOne.startDate / 1000)
      .subtract(1, 'hour')
      .unix()
    return timeStartWhiteList * 1000
  }

  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  const getHexProof = (whitelistI: IDataWhitelist[], owner: string) => {
    const merkele: IDataWhitelist = Array.from(whitelistI).find(
      (item: IDataWhitelist) => item.address === owner.toLowerCase(),
    )
    return merkele.proof
  }

  const handleGetApiWhitelist = async () => {
    const result: any = await axios.get(`${process.env.NEXT_PUBLIC_API}/whitelist`).catch((error) => {
      console.warn(error)
    })

    if (result?.status === 200 && result?.data && result?.data?.length !== 0) {
      const arr = Array.from(result?.data).map((item: any) => {
        return item?.address
      })
      setWhiteList(arr)
      setDataWhitelist(result?.data)
    }
  }

  const handeInvest = async (code: any) => {
    const valueETH = typeBuyPrice === TYPE_BY.BY_ETH ? parseEther(amount.toString()) : parseEther('0')
    const addressTokenBuy = typeBuyPrice === TYPE_BY.BY_ETH ? NATIVE_TOKEN : USDC_TEST
    const amountParse =
      typeBuyPrice === TYPE_BY.BY_ETH ? parseEther(amount.toString()) : parseUnits(amount.toString(), decimal)
    setMessageConfirm(`Buying ${Number(amountXOX).toLocaleString()} XOX`)
    if (
      isUserInWhiteList &&
      handleGetOneHourBeforeSale() <= timeStampOfNow &&
      timeStampOfNow < infoRoundOne.startDate
    ) {
      try {
        setIsOpenLoadingClaimModal(true)
        const _merkleProof = getHexProof(dataWhitelist, account)
        const gasFee = await contractPreSale.estimateGas.whiteListedInvest(
          addressTokenBuy,
          amountParse,
          code,
          _merkleProof,
          {
            value: valueETH,
          },
        )
        const txWhitelist = await contractPreSale.whiteListedInvest(addressTokenBuy, amountParse, code, _merkleProof, {
          gasLimit: gasFee,
          value: valueETH,
        })
        const txHash = await txWhitelist.wait(1)
        if (txHash?.transactionHash) {
          setIsOpenLoadingClaimModal(false)
          handleGetTotalTokenInvested(currentRound)
          onDissmiss()
          toastSuccess(
            `Bought XOX`,
            <ToastDescriptionWithTx txHash={txHash.transactionHash}>
              {t('Your %symbol% investment has been confirmed!', { symbol: 'XOX' })}
            </ToastDescriptionWithTx>,
          )
        }
      } catch (error: any) {
        setIsOpenLoadingClaimModal(false)
        if (error?.message?.includes('rejected')) {
          toastError('Error', 'User rejected the request.')
          return
        }
        if (error?.message?.includes('PreSale: Exchange amount exceed limit!')) {
          toastError('Error', 'Exchange amount exceed limit!')
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
        const gasFee = await contractPreSale.estimateGas.invest(addressTokenBuy, amountParse, code, {
          value: valueETH,
        })
        const txInvest = await contractPreSale.invest(addressTokenBuy, amountParse, code, {
          value: valueETH,
          gasLimit: gasFee,
        })
        const txHashInvest = await txInvest.wait(1)
        if (txHashInvest?.transactionHash) {
          onDissmiss()
          setIsOpenLoadingClaimModal(false)
          handleGetTotalTokenInvested(currentRound)
          toastSuccess(
            `Bought XOX`,
            <ToastDescriptionWithTx txHash={txHashInvest.transactionHash}>
              {t('Your %symbol% investment has been confirmed!', { symbol: 'XOX' })}
            </ToastDescriptionWithTx>,
          )
        }
      } catch (error: any) {
        setIsOpenLoadingClaimModal(false)
        if (error?.message?.includes('rejected')) {
          toastError('Error', 'User rejected the request.')
          return
        }
        if (error?.message?.includes('PreSale: Exchange amount exceed limit!')) {
          toastError('Error', 'Exchange amount exceed limit!')
          return
        }
        if (error?.code !== 4001) {
          toastError('Error', 'Transaction failed')
        }
      }
    }
  }

  const handleClaim = async (round: number, amoutXOXPending: any) => {
    try {
      setIsOpenLoadingClaimModal(true)
      setMessageConfirm(`Claim ${Number(amoutXOXPending).toLocaleString()} XOX`)
      const gas = await contractPreSale.estimateGas.userClaimInvestedToken(BigNumberEthers.from(round))
      const result = await contractPreSale.userClaimInvestedToken(BigNumberEthers.from(round), { gasLimit: gas })
      const txHash = await result.wait(1)

      if (txHash?.transactionHash) {
        setIsOpenLoadingClaimModal(false)
        handleGetDataVesting()
        toastSuccess(
          `Claimed XOX`,
          <ToastDescriptionWithTx txHash={txHash.transactionHash}>
            {t('Your %symbol% invests have been sent to your wallet!', { symbol: 'XOX' })}
          </ToastDescriptionWithTx>,
        )
      }
    } catch (error: any) {
      console.warn(error)
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

  const handleRenderTenMonths = (dateAgr: number) => {
    const arrLockingTime = []
    const timeInit = moment
      .unix(dateAgr / 1000)
      .add(0.5, 'hour')
      .unix()
    arrLockingTime.push(timeInit * 1000)
    for (let i = 0; i < 9; i++) {
      const time = moment
        .unix(arrLockingTime[i] / 1000)
        .add(0.5, 'hour')
        .unix()
      arrLockingTime.push(time * 1000)
    }
    return arrLockingTime
  }

  const handleGetDataVesting = async () => {
    if (chainId === 97 || chainId === 56) return
    const dataClone: IVestingTime[] = [...vestingTiming]
    const round = [1, 2, 3]
    const dataRoundDate = [infoRoundOne, infoRoundTow, infoRoundThree]

    round.forEach(async (item) => {
      const [vested, currentXOX, userInvested] = await Promise.all([
        contractPreSale.userClaimedAmount(account, BigNumberEthers.from(item)),
        contractPreSale.pendingXOXInvest(account, BigNumberEthers.from(item)),
        contractPreSale.userInvestedAmount(account, BigNumberEthers.from(item)),
      ])
      dataClone[item - 1].amountVested = new BigNumber(formatEther(vested).toString()).toFixed(2)
      dataClone[item - 1].yourCurrentXOX = new BigNumber(formatEther(currentXOX).toString()).toFixed(2)
      dataClone[item - 1].remaining = new BigNumber(formatEther(userInvested).toString())
        .minus(formatEther(vested).toString())
        .toFixed(2)
      dataClone[item - 1].startTime = dataRoundDate[item - 1].endDate
        ? handleRenderTenMonths(dataRoundDate[item - 1].endDate)
        : []
    })
    setDataVestingSchedule(dataClone)
  }

  const handCheckInTimeRangeSale = (time: number) => {
    if (
      (infoRoundOne.startDate <= time && time <= infoRoundOne.endDate) ||
      (infoRoundTow.startDate <= time && time <= infoRoundTow.endDate) ||
      (infoRoundThree.startDate <= time && time <= infoRoundThree.endDate)
    ) {
      setIsInTimeRangeSale(true)
    } else {
      setIsInTimeRangeSale(false)
    }
  }

  const handleIsTimeAllowWhitelist = (time: number) => {
    setIsTimeAllowWhitelist(handleGetOneHourBeforeSale() <= time && time < infoRoundOne.startDate)
  }

  const handleGetTotalTokenInvested = async (round: number) => {
    if (chainId === 97 || chainId === 56) return
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
      setReferralCode(ADDRESS_CODE)
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
        setReferralCode(ADDRESS_CODE)
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
      referralCode={referralCode}
      handleApprove={handleApprove}
      ethPerDolla={ethPerDolla}
      currentRound={currentRound}
      handleChangeReferal={handleChangeReferal}
      setCodeRef={setCodeRef}
      referralError={referralError}
      massageErrorAmount={massageErrorAmount}
      amountXOX={amountXOX}
      amountXOXS={amountXOXS}
      setAmountXOX={setAmountXOX}
      setAmountXOXS={setAmountXOXS}
      balanceLP={balanceLP}
      balanceNative={balanceNative}
      isTimeAllowWhitelist={isTimeAllowWhitelist}
    />,
    true,
    true,
    'exchange-sale',
  )

  const handleGetPreSaleUserInfo = async () => {
    if (!account) return
    try {
      const data = await getUserPreSaleInfo(account)
      if (data && data.userPreSaleDatas && data.userPreSaleDatas?.length > 0) {
        const result = {
          amountInvestUSD: 0,
          amountBoughtXOX: 0,
          amountBoughtXOXS: 0,
          amountClaimXOX: 0,
        }
        Array.from(data.userPreSaleDatas).forEach((item: any) => {
          result.amountInvestUSD += new BigNumber(item?.amountInvestUSD).div(10 ** decimal).toNumber()
          result.amountBoughtXOX += new BigNumber(item?.amountBoughtXOX).div(10 ** 18).toNumber()
          result.amountBoughtXOXS += new BigNumber(item?.amountBoughtXOXS).div(10 ** decimal).toNumber()
          result.amountClaimXOX += new BigNumber(item?.amountClaimXOX).div(10 ** 18).toNumber()
          return null
        })

        const arrUpdate: IYourInfo[] = Array.from(initialYourInfo).map((item: IYourInfo) => {
          return {
            ...item,
            amount: new BigNumber(result[item.field]).toFixed(2),
          }
        })
        setDataForInfo(arrUpdate)

        return
      }
    } catch (error) {
      console.warn(error)
    }
  }

  const handleGetRoundStatus = async () => {
    try {
      const data = await getDataRoundStats()
      if (data && data.roundStats) {
        setDataStatus(data.roundStats)
      }
    } catch (error) {
      console.warn(error)
    }
  }

  const handleGetDataTransaction = async () => {
    try {
      const result = await getDataTransaction()
      if (result && result?.transactionPreSales) {
        const listAddress = result?.transactionPreSales.map((item: any) => item?.sender)
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/users/address/mapping`, {
          wallets: listAddress,
        })

        const dataMapping = result?.transactionPreSales.map((item: any) => {
          const dataUserInfos = response.data
          const userInfo = dataUserInfos?.find((user) => item.sender === user.address)

          return {
            ...item,
            username: userInfo?.username ?? null,
            avatar: userInfo?.avatar ?? null,
          }
        })

        setDataTransaction(dataMapping)
      }
    } catch (error) {
      console.warn(error)
    }
  }

  const handleGetDataTransactionOfUser = async () => {
    if (!account) return
    try {
      const result = await getDataTransactionOfUser(account)
      if (result && result?.transactionPreSales) {
        setDataTransactionOfUser(result?.transactionPreSales)
      }
    } catch (error) {
      console.warn(error)
    }
  }

  const handleGetDataTransactionClaimOfUser = async () => {
    if (!account) return
    try {
      const result = await getDataTransactionClaimOfUser(account)
      if (result && result?.transactionPreSales) {
        setDataTransactionClaimOfUser(result?.transactionPreSales)
      }
    } catch (error) {
      console.warn(error)
    }
  }

  const handleGetBalanceOfUser = () => {
    const currentProvider = provider
    currentProvider.getBalance(account).then((balance) => {
      const nativeBalance = balance ? formatEther(balance._hex) : 0
      setBalanceNative(nativeBalance)
    })
    getBalancesForEthereumAddress({
      // erc20 tokens you want to query!
      contractAddresses: [USDC_TEST],
      // ethereum address of the user you want to get the balances for
      ethereumAddress: account,
      // your ethers provider
      providerOptions: {
        ethersProvider: currentProvider,
      },
    })
      .then((balance) => {
        setBalanceLP(balance ? balance.tokens[0].balance : 0)
      })
      .catch((error) => {
        console.warn(error)
      })
  }

  const handleGetRefPreSale = async () => {
    if (!account) return
    try {
      const data = await getDataReferralPresale(account)
      if (data && data?.analysisSaleReferrals && data?.analysisSaleReferrals.length !== 0) {
        const newData = Array.from(initialRefInfo).map((item: IRefInfo) => {
          return {
            ...item,
            ...data?.analysisSaleReferrals[0],
          }
        })
        setDataRef(newData)
      }
    } catch (error) {
      console.warn(error)
    }
  }

  const validateAmount = (value: string, typeBuy: number) => {
    let message = ''
    const totalDolla = typeBuy === TYPE_BY.BY_ETH ? new BigNumber(value).multipliedBy(ethPerDolla).toNumber() : value
    const balanceCompare = typeBuy === TYPE_BY.BY_ETH ? balanceNative : balanceLP
    if (new BigNumber(value).isGreaterThan(balanceCompare)) {
      message = 'Insufficient balance'
      return message
    }
    if (totalDolla < 50) {
      message = 'Minimum investment: $50'
    } else {
      message = ''
    }
    return message
  }

  useEffect(() => {
    if (!resSaleStats) return
    handleUpdateDataSale(initStat, resSaleStats?.dataSaleStats)
  }, [resSaleStats])

  useEffect(() => {
    if (!account || !chainId) return
    handleGetDataTransactionOfUser()
    handleGetDataTransactionClaimOfUser()
    handleGetInfoRound()
    handleGetDataTransaction()
    handleGetRefPreSale()
    handleGetApiWhitelist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId])

  useEffect(() => {
    handleGetRoundStatus()
    handleGetInfoRound()
    handCheckInTimeRangeSale(timeStampOfNow)
    handleGetDataTransactionOfUser()
    handleGetDataTransactionClaimOfUser()
    handleGetPreSaleUserInfo()
    handleGetRefPreSale()
    handleGetRoundStatus()
    handleGetDataTransaction()
    handleGetCurrentRound(timeStampOfNow)
    handleGetApiWhitelist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const myId = setTimeout(() => {
      if (timeRecall > 0) {
        setTimeRecall(timeRecall - 1)
        return
      }
      handleGetDataTransactionOfUser()
      handleGetDataTransactionClaimOfUser()
      handleGetPreSaleUserInfo()
      handleGetRefPreSale()
      handleGetRoundStatus()
      handleGetDataTransaction()
      setTimeRecall(7)
    }, 1000)
    return () => clearTimeout(myId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRecall, account, chainId])

  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approvalState, approvalSubmitted])

  useEffect(() => {
    handleGetTotalTokenInvested(currentRound)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRound])

  useEffect(() => {
    if (amount === '') {
      setMassageErrorAmount('This is required')
    } else {
      const mess: string = validateAmount(amount, typeBuyPrice)
      setMassageErrorAmount(mess)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, typeBuyPrice])

  useEffect(() => {
    if (!account || !chainId) return
    handleGetBalanceOfUser()
    handleGetPrice()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId, provider, nodeId])

  useEffect(() => {
    if (!account || !chainId || !infoRoundOne.startDate) return
    handleGetDataVesting()
    handCheckInTimeRangeSale(timeStampOfNow)
    handleIsTimeAllowWhitelist(timeStampOfNow)
    handleGetCurrentRound(timeStampOfNow)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId, infoRoundOne, infoRoundThree, infoRoundTow])

  useEffect(() => {
    setReferralError(null)
    setAmount('')
    // setMassageErrorAmount('')
  }, [nodeId])

  useEffect(() => {
    setReferralError(null)
    if (!account || !codeRef) return
    handleChangeReferal(codeRef)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  useEffect(() => {
    if (reacheZero) {
      const timeStampAtNow = Date.now()
      handCheckInTimeRangeSale(timeStampAtNow)
      handleIsTimeAllowWhitelist(timeStampAtNow)
      handleGetCurrentRound(timeStampAtNow)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reacheZero, infoRoundOne])

  useEffect(() => {
    if (!account) return
    if (whiteList.includes(account.toLocaleLowerCase())) {
      setIsUserInWhiteList(true)
    } else {
      setIsUserInWhiteList(false)
    }
  }, [whiteList, setWhiteList, account, dataWhitelist])

  useEffect(() => {
    handleGetOneHourBeforeSale()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoRoundOne])

  useEffect(() => {
    if (!account || !chainId) return
    if (loadOk) window.location.reload()
    setLoadOk(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId])

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
            isTimeAllowWhitelist={isTimeAllowWhitelist}
            setTypeBuyPrice={setTypeBuyPrice}
            typeBuyPrice={typeBuyPrice}
            totalXOXTokenInRound={totalXOXTokenInRound}
            reacheZero={reacheZero}
            setReachZero={setReachZero}
            oneHourBeforeStart={handleGetOneHourBeforeSale()}
            setisReachWhitelist={setisReachWhitelist}
          />
          <SaleStats dataStat={arrSaleStats} />
          <ChartSalePage infoRoundOne={infoRoundOne} />
          <SaleStatus
            currentRound={currentRound}
            isInTimeRangeSale={isInTimeRangeSale}
            totalXOXTokenInRound={totalXOXTokenInRound}
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
            dataRefInfo={dataRef}
            handleClaim={handleClaim}
            dataTransaction={dataTransactionOfUser}
            dataTransactionClaimOfUser={dataTransactionClaimOfUser}
            dataVesting={dataVestingSchedule}
            handleGetDataVesting={handleGetDataVesting}
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
          <div className="noti_claim_pending_h3">{messageConfirm}</div>
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
