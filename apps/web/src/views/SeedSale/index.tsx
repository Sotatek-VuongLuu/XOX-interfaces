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
import { useXOXSeedSaleContract } from 'hooks/useContract'
import moment from 'moment'
import axios from 'axios'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Context } from '@pancakeswap/uikit/src/widgets/Modal/ModalContext'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useTranslation } from '@pancakeswap/localization'
import ModalBase from 'views/Referral/components/Modal/ModalBase'
import { Content } from 'views/Pools/components/style'
import { GridLoader } from 'react-spinners'
import {
  getTransactionVestingSalesOfUser,
} from 'services/seedsale'
import { getBalancesForEthereumAddress } from 'ethereum-erc20-token-balances-multicall'
import { useProvider } from 'wagmi'
import { USDT, USDT_MUMBAI } from '@pancakeswap/tokens'
import BackedBy from './Components/BackedBy'
import SaleMechanism from './Components/SaleMechanism'
import SaleHistorySession from './VestingSaleHistory'
// import { useGetSaleStats } from './hooks'

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

export interface IVestingTime {
  title: string
  amountVested: number | string
  remaining: number | string
  yourCurrentXOX: number | string
  startTime: number[]
  statusClaim: boolean
}

export const seedSaleData: IVestingTime =
{
  title: 'Seed Sale',
  amountVested: 0,
  remaining: 0,
  yourCurrentXOX: 0,
  startTime: [],
  statusClaim: false,
}


export const partnerSaleData: IVestingTime =
{
  title: 'Partner Sale',
  amountVested: 0,
  remaining: 0,
  yourCurrentXOX: 0,
  startTime: [],
  statusClaim: false,
}

const now = new Date()
export const timeStampOfNow = now.getTime()

const _ONT_MONTH = 1800000
export const decimal = 6

const handleRenderTimeScheduleForSeedSale = (dateAgr: number) => {
  const arrLockingTime = []
  arrLockingTime.push(dateAgr * 1000)
  for (let i = 0; i < 5; i++) {
    const time = moment
      .unix(arrLockingTime[i] / 1000)
      .add(1, 'hour')
      .unix()
    arrLockingTime.push(time * 1000)
  }
  return arrLockingTime
}

const handleRenderTimeScheduleForPartnerSale = (dateAgr: number) => {
  const arrLockingTime = []
  arrLockingTime.push(dateAgr * 1000)
  for (let i = 0; i < 18; i++) {
    const time = moment
      .unix(arrLockingTime[i] / 1000)
      .add(1, 'hour')
      .unix()
    arrLockingTime.push(time * 1000)
  }
  return arrLockingTime
}

function SeedSalePage() {
  const notSupport = [ChainId.BSC_TESTNET, ChainId.BSC]
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()

  const contractVestingSale = !account
    ? process.env.NODE_ENV === 'production'
      ? notSupport.includes(chainId)
        ? useXOXSeedSaleContract(ChainId.POLYGON_TESTNET)
        : useXOXSeedSaleContract(ChainId.POLYGON_TESTNET) /// OR ETH ON MAINNET
      : useXOXSeedSaleContract(ChainId.POLYGON_TESTNET)
    : notSupport.includes(chainId)
      ? useXOXSeedSaleContract(ChainId.POLYGON_TESTNET)
      : useXOXSeedSaleContract(ChainId.POLYGON_TESTNET)

  const [lanchTime, setLanchTime] = useState<number | null>(1690167600)

  const provider = useProvider({ chainId })
  const [dataTransaction, setDataTransaction] = useState<any>([])
  const [dataSeedSaleSchedule, setDataSeedSaleSchedule] = useState<IVestingTime>({
    title: 'Seed Sale',
    amountVested: 0,
    remaining: 0,
    yourCurrentXOX: 0,
    startTime: handleRenderTimeScheduleForSeedSale(lanchTime),
    statusClaim: false,
  })
  const [dataPartnerSaleSchedule, setDataPartnerSaleSchedule] = useState<IVestingTime>({
    title: 'Partner Sale',
    amountVested: 0,
    remaining: 0,
    yourCurrentXOX: 0,
    startTime: handleRenderTimeScheduleForPartnerSale(lanchTime),
    statusClaim: false,
  })
  const [dataTransactionClaimOfInvestor, setDataTransactionClaimOfInvestor] = useState<any>([])

  const [messageConfirm, setMessageConfirm] = useState<string>('')
  const [loadOk, setLoadOk] = useState(false)

  const [isOpenLoadingClaimModal, setIsOpenLoadingClaimModal] = useState<boolean>(false)

  const handleClaimSeedSale = async (amoutXOXPending: any) => {
    try {
      setIsOpenLoadingClaimModal(true)
      setMessageConfirm(`${t('Claim')} ${Number(amoutXOXPending).toLocaleString()} XOX`)
      // const gas = await contractVestingSale.estimateGas.claimSeedSale()
      const result = await contractVestingSale.claimSeedSale({ gasLimit: 236397 })
      const txHash = await result.wait(1)
      if (txHash?.transactionHash) {
        setIsOpenLoadingClaimModal(false)
        handleGetDataVesting()
        toastSuccess(
          `${t('Claimed')} XOX`,
          <ToastDescriptionWithTx txHash={txHash.transactionHash}>
            {t('Your %symbol% Tokens have been claimed and sent to your wallet!', { symbol: 'XOX' })}
          </ToastDescriptionWithTx>,
        )
      }
    } catch (error: any) {
      console.warn(error)
      setIsOpenLoadingClaimModal(false)
      if (error?.message?.includes('rejected')) {
        toastError('Error', t('User rejected the request.'))
        return
      }
      if (error?.code !== 4001) {
        toastError('Error', t('Transaction failed'))
      }
    }
  }

  const handleClaimPartnerSale = async (amoutXOXPending: any) => {
    try {
      setIsOpenLoadingClaimModal(true)
      setMessageConfirm(`${t('Claim')} ${Number(amoutXOXPending).toLocaleString()} XOX`)
      const gas = await contractVestingSale.estimateGas.claimPartnerSale()
      const result = await contractVestingSale.claimPartnerSale({ gasLimit: gas })
      const txHash = await result.wait(1)

      if (txHash?.transactionHash) {
        setIsOpenLoadingClaimModal(false)
        handleGetDataVesting()
        toastSuccess(
          `${t('Claimed')} XOX`,
          <ToastDescriptionWithTx txHash={txHash.transactionHash}>
            {t('Your %symbol% Tokens have been claimed and sent to your wallet!', { symbol: 'XOX' })}
          </ToastDescriptionWithTx>,
        )
      }
    } catch (error: any) {
      console.warn(error)
      setIsOpenLoadingClaimModal(false)
      if (error?.message?.includes('rejected')) {
        toastError('Error', t('User rejected the request.'))
        return
      }
      if (error?.code !== 4001) {
        toastError('Error', t('Transaction failed'))
      }
    }
  }

  const handleSeedSaleData = async () => {
    if (chainId !== 80001) return;
    const data: IVestingTime = seedSaleData;
    const [vestingSchedule, currentXOX] = await Promise.all([
      contractVestingSale.vestingScheduleSeedSale(account),
      contractVestingSale.getPendingAmountSeedSale(account),
    ])
    // new BigNumber(formatEther(vested).toString()).toFixed(2)
    data.amountVested = new BigNumber(formatEther(vestingSchedule.amountClaimed).toString()).toFixed(2)
    data.yourCurrentXOX = new BigNumber(formatEther(currentXOX).toString()).toFixed(2)
    data.remaining = new BigNumber(formatEther(vestingSchedule.amountOfGrant).toString()).toFixed(2)
    data.startTime = lanchTime ? handleRenderTimeScheduleForSeedSale(lanchTime) : []
    await setDataSeedSaleSchedule(data)
  }

  const handlePartnerSaleData = async () => {
    if (chainId !== 80001) return;
    const data: IVestingTime = partnerSaleData;
    const [vestingSchedule, currentXOX] = await Promise.all([
      contractVestingSale.vestingSchedulePartnerSale(account),
      contractVestingSale.getPendingAmountPartnerSale(account),
    ])
    // new BigNumber(formatEther(vested).toString()).toFixed(2)
    data.amountVested = new BigNumber(formatEther(vestingSchedule.amountClaimed).toString()).toFixed(2)
    data.yourCurrentXOX = new BigNumber(formatEther(currentXOX).toString()).toFixed(2)
    data.remaining = new BigNumber(formatEther(vestingSchedule.amountOfGrant).toString()).toFixed(2)
    data.startTime = lanchTime ? handleRenderTimeScheduleForPartnerSale(lanchTime) : []
    await setDataPartnerSaleSchedule(data)
  }

  const handleGetDataVesting = async () => {
    handleSeedSaleData();
    handlePartnerSaleData();
  }

  // const handleGetDataTransaction = async () => {
  //   try {
  //     const result = await getDataTransaction()
  //     if (result && result?.transactionPreSales && result?.transactionPreSales.length > 0) {
  //       const listAddress = result?.transactionPreSales.map((item: any) => item?.sender)
  //       const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/users/address/mapping`, {
  //         wallets: listAddress,
  //       })

  //       const dataMapping = result?.transactionPreSales.map((item: any) => {
  //         const dataUserInfos = response.data
  //         const userInfo = dataUserInfos?.find((user) => item.sender === user.address)

  //         return {
  //           ...item,
  //           username: userInfo?.username ?? null,
  //           avatar: userInfo?.avatar ?? null,
  //         }
  //       })

  //       setDataTransaction(dataMapping)
  //     }
  //   } catch (error) {
  //     console.warn(error)
  //   }
  // }

  const handleGetDataTransactionClaimOfUser = async () => {
    if (!account) return
    try {
      const result = await getTransactionVestingSalesOfUser(account, chainId)
      if (result && result?.transactionSeedPartnerSales) {
        setDataTransactionClaimOfInvestor(result?.transactionSeedPartnerSales)
      }
    } catch (error) {
      console.warn(error)
    }
  }
  
  useEffect(() => {
    if (!account || !chainId) return
    if (loadOk) window.location.reload()
    setLoadOk(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId])

  useEffect(() => {
    if (!account || !chainId || lanchTime === null) return
    handleGetDataVesting()
    handleGetDataTransactionClaimOfUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId, lanchTime])



  return (
    <>
      <Page>
        <ContentContainer>
          <SaleMechanism
            dataSeedSale={dataSeedSaleSchedule || seedSaleData}
            dataPartnerSale={dataPartnerSaleSchedule || partnerSaleData}
            handleClaimSeedSale={handleClaimSeedSale}
            handleClaimPartnerSale={handleClaimPartnerSale}
            handleGetDataVesting={handleGetDataVesting}
          />
          <SaleHistorySession dataTransaction={dataTransactionClaimOfInvestor} />
          <BackedBy />
        </ContentContainer>
      </Page>

      <ModalBase
        open={isOpenLoadingClaimModal}
        handleClose={() => setIsOpenLoadingClaimModal(false)}
        title={t('Confirm Vesting Sale')}
      >
        <Content>
          <div className="xox_loading" style={{ margin: '24px 0px' }}>
            <GridLoader color="#FB8618" style={{ width: '51px', height: '51px' }} />
          </div>
          <div className="noti_claim_pending_h1">{t('Waiting For Confirmation')}</div>
          <div className="noti_claim_pending_h3">{messageConfirm}</div>
          <div className="noti_claim_pending_h2">{t('Confirm this transaction in your wallet.')}</div>
          <img
            src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/close-one.svg`}
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

export default SeedSalePage
