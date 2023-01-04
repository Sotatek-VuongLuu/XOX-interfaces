/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther, formatUnits } from '@ethersproject/units'
import { Box } from '@mui/material'
import { formatBigNumber } from '@pancakeswap/utils/formatBalance'
import { useWeb3React } from '@pancakeswap/wagmi'
import { MAPPING_DECIMAL_WITH_CHAIN } from 'config/constants/mappingDecimals'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTreasuryXOX } from 'hooks/useContract'
import { useEffect, useState } from 'react'
import { userPoint } from 'services/referral'
import styled from 'styled-components'
import Banner from './components/Banner'
import MainInfo from './components/MainInfo'
import ReferralFriend from './components/ReferralFriend'

export interface IItemLevel {
  icon: string
  point: number
  dollar: number
  lever: number
  isReach: boolean
}

const Wrapper = styled(Box)`
  padding: 48px;

  @media screen and (max-width: 900px) {
    padding: 48px 24px;
  }
`

export default function Refferal() {
  const { account, chainId } = useWeb3React()
  const contractTreasuryXOX = useTreasuryXOX()
  const [userCurrentPoint, setUserCurrentPoint] = useState<number>(0)
  const [currentLevelReach, setCurrentLevelReach] = useState<number>(0)
  const [listLevelMustReach, setListLevelMustReach] = useState<IItemLevel[]>(listLever)
  const [isClaimAll, setIsClaimAll] = useState<boolean>(false)
  const [volumnTotalEarn, setVolumnTotalEarn] = useState<string>('')
  const [volumnTotalUnClaim, setVolumnTotalUnClaim] = useState<string>('')

  // eslint-disable-next-line consistent-return
  const handleGetCurrentPoint = async () => {
    let currentPoint
    try {
      const infosUser: any[] = await contractTreasuryXOX.userInfo(account)

      const dataParse: any[] = infosUser.map((item) => {
        return formatUnits(item, MAPPING_DECIMAL_WITH_CHAIN[chainId])
      })
      setUserCurrentPoint(Number(dataParse[0]) * 2)

      currentPoint = Number(dataParse[0]) * 2

      return currentPoint
    } catch (error) {
      console.warn(error)
    }
  }

  // eslint-disable-next-line consistent-return
  const handleCheckPendingRewardAll = async (accountId: string) => {
    try {
      const txPendingReward = await contractTreasuryXOX.pendingRewardAll(accountId)
      setIsClaimAll(Number(formatEther(txPendingReward._hex)) === 0)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`error>>>>>`, error)
    }
  }

  const handleCheckReachLevel = async (currentPoint: number) => {
    if (currentPoint < listLevelMustReach[0].point) {
      setCurrentLevelReach(0)
    } else {
      const arrAddIsReach: IItemLevel[] = listLevelMustReach.map((item: IItemLevel) => {
        const reached = currentPoint >= item.point
        return {
          ...item,
          isReach: reached,
        }
      })

      const findLastReach = arrAddIsReach.filter((item) => {
        return item.isReach === true
      })
      const currentLever = findLastReach.pop()?.lever
      setCurrentLevelReach(currentLever)

      const arrCheckClaimed: IItemLevel[] = await Promise.all(
        arrAddIsReach?.map(async (item: IItemLevel): Promise<any> => {
          try {
            if (item.isReach) {
              const txPendingReward = await contractTreasuryXOX.pendingRewardByLevel(account, item.lever)
              if (Number(formatEther(txPendingReward._hex)) === 0) {
                return {
                  ...item,
                  isClaimed: true,
                }
              }
              return {
                ...item,
                isClaimed: false,
              }
            }
            return item
          } catch (error) {
            console.log(`error >>>>`, error)
          }
        }),
      )
      setListLevelMustReach([...arrCheckClaimed])
    }
  }

  const getUserPoint = async () => {
    try {
      const result = await userPoint(chainId)
      if (result) {
        const totalUnClaimed =
          Number(result.analysisDatas[0]?.total_reward) - Number(result.analysisDatas[0]?.total_claimed_amount)
        const volumn = formatBigNumber(BigNumber.from(result.analysisDatas[0]?.total_claimed_amount))
        const volumnUnClaim = formatBigNumber(BigNumber.from(totalUnClaimed.toString()))
        setVolumnTotalEarn(volumn)
        setVolumnTotalUnClaim(volumnUnClaim)
      }
    } catch (error) {
      console.log(`error >>>>`, error)
    }
  }

  const handleReCallGetCurrentPoint = async () => {
    const currentPoint = await handleGetCurrentPoint()
    handleCheckReachLevel(currentPoint)
  }

  useEffect(() => {
    const fetchMyAPI = async () => {
      const currentPoint = await handleGetCurrentPoint()
      handleCheckReachLevel(currentPoint)
    }
    fetchMyAPI()
    getUserPoint()
  }, [account, chainId])

  useEffect(() => {
    getUserPoint()
  }, [chainId])

  useEffect(() => {
    if (account) {
      handleCheckPendingRewardAll(account)
    }
  }, [account])

  return (
    <>
      <Wrapper>
        <Box>
          <Banner />
          <MainInfo
            userCurrentPoint={userCurrentPoint}
            currentLevelReach={currentLevelReach}
            listLever={listLever}
            volumnTotalEarn={volumnTotalEarn}
          />
          <ReferralFriend
            currentLevelReach={currentLevelReach}
            isClaimAll={isClaimAll}
            listLevelMustReach={listLevelMustReach}
            volumnTotalEarn={volumnTotalEarn}
            getUserPoint={getUserPoint}
            handleCheckReachLevel={handleReCallGetCurrentPoint}
            handleCheckPendingRewardAll={handleCheckPendingRewardAll}
            totalUnClaimed={volumnTotalUnClaim}
          />
        </Box>
      </Wrapper>
    </>
  )
}

export const listLever: IItemLevel[] = [
  {
    icon: '/images/lever_1.svg',
    point: 100,
    dollar: 10,
    lever: 1,
    isReach: false,
  },
  {
    icon: '/images/lever_2.svg',
    point: 500,
    dollar: 50,
    lever: 2,
    isReach: false,
  },
  {
    icon: '/images/lever_3.svg',
    point: 1000,
    dollar: 100,
    lever: 3,
    isReach: false,
  },
  {
    icon: '/images/lever_4.svg',
    point: 5000,
    dollar: 300,
    lever: 4,
    isReach: false,
  },
  {
    icon: '/images/lever_5.svg',
    point: 10000,
    dollar: 500,
    lever: 5,
    isReach: false,
  },
  {
    icon: '/images/lever_6.svg',
    point: 50000,
    dollar: 2000,
    lever: 6,
    isReach: false,
  },
  {
    icon: '/images/lever_7.svg',
    point: 100000,
    dollar: 5000,
    lever: 7,
    isReach: false,
  },
  {
    icon: '/images/lever_8.svg',
    point: 500000,
    dollar: 10000,
    lever: 8,
    isReach: false,
  },
  {
    icon: '/images/lever_9.svg',
    point: 1000000,
    dollar: 20000,
    lever: 9,
    isReach: false,
  },
]
