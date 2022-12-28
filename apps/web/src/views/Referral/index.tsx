/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { formatUnits } from '@ethersproject/units'
import { Box } from '@mui/material'
import { MAPPING_DECIMAL_WITH_CHAIN } from 'config/constants/mappingDecimals'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTreasuryXOX } from 'hooks/useContract'
import { useEffect, useState } from 'react'
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
  const { account, chainId } = useActiveWeb3React()
  const contractTreasuryXOX = useTreasuryXOX()
  const [userCurrentPoint, setUserCurrentPoint] = useState<number>(0)
  const [currentLevelReach, setCurrentLevelReach] = useState(null)
  const [listLevelMustReach, setListLevelMustReach] = useState<IItemLevel[]>(listLever)

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
      console.log(`error >>>`, error)
    }
  }

  const handleCheckReachLevel = (currentPoint: number) => {
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
    const currentLever = findLastReach.pop()
    setCurrentLevelReach(currentLever?.lever)
  }

  useEffect(() => {
    const fetchMyAPI = async () => {
      const currentPoint = await handleGetCurrentPoint()
      if (currentPoint) {
        await handleCheckReachLevel(currentPoint)
      }
    }
    fetchMyAPI()
  }, [account])

  return (
    <>
      <Wrapper>
        <Box>
          <Banner />
          <MainInfo userCurrentPoint={userCurrentPoint} currentLevelReach={currentLevelReach} listLever={listLever} />
          <ReferralFriend userCurrentPoint={userCurrentPoint} />
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
