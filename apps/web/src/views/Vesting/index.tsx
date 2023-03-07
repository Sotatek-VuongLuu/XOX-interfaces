/* eslint-disable import/no-cycle */
import { useModal } from '@pancakeswap/uikit'
import React, { ReducerAction, ReducerState, useMemo, useReducer, useState } from 'react'
import styled from 'styled-components'
import BackedBy from './Components/BackedBy'
import ChartSalePage from './Components/Chart'
import CountDownBlock from './Components/CountDownBlock'
import MainInfoBlock from './Components/MainInfoBlock'
import ModalSaleExchange from './Components/ModalExchange'
import SaleMechanism from './Components/SaleMechanism'
import SaleStats from './Components/SaleStats'
import SaleStatus from './Components/SaleStatus'
import SaleHistorySession from './VestingSaleHistory'

const Page = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`

const ContentContainer = styled.div`
  width: 1400px;
`

const initialYourInfo = [
  {
    id: 1,
    title: 'Amount invested',
    amount: '1000',
  },
  {
    id: 2,
    title: 'XOX amount bought',
    amount: '100',
  },
  {
    id: 3,
    title: 'XOX amount received',
    amount: '100',
  },
  {
    id: 4,
    title: 'XOXS amount received',
    amount: '100',
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
    title: 'Team allocation (0% at TGR & 5 years vesting 20% yearly)',
    tokenAllocationPercent: '0',
    tokenAllocation: '0',
    tge: '0',
    tokenAllocationatTge: '0',
    initialMarketcap: '0',
    fullyDilitedMc: '0',
  },
  {
    id: 2,
    title: 'Company Reserve (0% at TGE & 4 years vesting 20% yearly)',
    tokenAllocationPercent: '0',
    tokenAllocation: '0',
    tge: '0',
    tokenAllocationatTge: '0',
    initialMarketcap: '0',
    fullyDilitedMc: '0',
  },
  {
    id: 3,
    title: 'Strategic Partnership (0% at TGE & 5 years vesting 25% yearly)',
    tokenAllocationPercent: '0',
    tokenAllocation: '0',
    tge: '0',
    tokenAllocationatTge: '0',
    initialMarketcap: '0',
    fullyDilitedMc: '0',
  },
  {
    id: 4,
    title: 'Ecosystem Growth (0% at TGR & 4 years vesting 25% yearly)',
    tokenAllocationPercent: '0',
    tokenAllocation: '0',
    tge: '0',
    tokenAllocationatTge: '0',
    initialMarketcap: '0',
    fullyDilitedMc: '0',
  },
  {
    id: 5,
    title: 'Community Rewards (0% at TGR & 5 years vesting 20% yearly)',
    tokenAllocationPercent: '0',
    tokenAllocation: '0',
    tge: '0',
    tokenAllocationatTge: '0',
    initialMarketcap: '0',
    fullyDilitedMc: '0',
  },
  {
    id: 6,
    title: 'XOX Labs Foundation (0% at TGE & 5 years vesting 20% yearly)',
    tokenAllocationPercent: '0',
    tokenAllocation: '0',
    tge: '0',
    tokenAllocationatTge: '0',
    initialMarketcap: '0',
    fullyDilitedMc: '0',
  },
  {
    id: 7,
    title: 'LP Farming (20% at Launch then 10% unlock Each year for 8 years)',
    tokenAllocationPercent: '0',
    tokenAllocation: '0',
    tge: '0',
    tokenAllocationatTge: '0',
    initialMarketcap: '0',
    fullyDilitedMc: '0',
  },
  {
    id: 8,
    title: 'Seed sale (10% release at TGE then 10% Unlock Weekly)',
    tokenAllocationPercent: '0',
    tokenAllocation: '0',
    tge: '0',
    tokenAllocationatTge: '0',
    initialMarketcap: '0',
    fullyDilitedMc: '0',
  },
  {
    id: 9,
    title: 'Partners sale (10% release at TGE then 5% release Monthly)',
    tokenAllocationPercent: '0',
    tokenAllocation: '0',
    tge: '0',
    tokenAllocationatTge: '0',
    initialMarketcap: '0',
    fullyDilitedMc: '0',
  },
  {
    id: 10,
    title: 'Private sale (10% release at TGE then 10% release Monthly)',
    tokenAllocationPercent: '0',
    tokenAllocation: '0',
    tge: '0',
    tokenAllocationatTge: '0',
    initialMarketcap: '0',
    fullyDilitedMc: '0',
  },
  {
    id: 11,
    title: 'Public sale (40% release at TGE then 10% Monthly)',
    tokenAllocationPercent: '0',
    tokenAllocation: '0',
    tge: '0',
    tokenAllocationatTge: '0',
    initialMarketcap: '0',
    fullyDilitedMc: '0',
  },
  {
    id: 12,
    title: 'Liquidity Pools DEX (100% lock 5 years)',
    tokenAllocationPercent: '0',
    tokenAllocation: '0',
    tge: '0',
    tokenAllocationatTge: '0',
    initialMarketcap: '0',
    fullyDilitedMc: '0',
  },
  {
    id: 13,
    title: 'CEX Lisring (TGE = 40% then 10% Monthly Release)',
    tokenAllocationPercent: '0',
    tokenAllocation: '0',
    tge: '0',
    tokenAllocationatTge: '0',
    initialMarketcap: '0',
    fullyDilitedMc: '0',
  },
  {
    id: 14,
    title: 'Total include LP',
    tokenAllocationPercent: '0',
    tokenAllocation: '0',
    tge: '0',
    tokenAllocationatTge: '0',
    initialMarketcap: '0',
    fullyDilitedMc: '0',
  },
  {
    id: 15,
    title: 'Total Exclude LP',
    tokenAllocationPercent: '0',
    tokenAllocation: '0',
    tge: '0',
    tokenAllocationatTge: '0',
    initialMarketcap: '0',
    fullyDilitedMc: '0',
  },
]

/// for stats

const initStat = [
  {
    id: 1,
    title: 'Total Current Raised',
    amount: '10.000',
    icon: '$',
  },
  {
    id: 2,
    title: 'XOX amount bought',
    amount: '5.000',
  },
  {
    id: 3,
    title: 'Number of Investors',
    amount: '+500',
  },
  {
    id: 4,
    title: 'Total XOXS Amount Rewarded',
    amount: '5.000',
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

enum TYPE_BY {
  BY_USDC,
  BY_USDT,
}

function VestingPage() {
  const [tabActiveInfo, setTabActiveInfo] = useState<string>('Dashboard')
  const [tabActiveMechansim, setTabActiveMechansim] = useState<string>('Private Sale Mechanism')
  const counterReducer = useReducer(reducer, initialYourInfo)
  const [typeBuyPrice, setTypeBuyPrice] = useState(TYPE_BY.BY_USDC)
  const [amount, setAmount] = useState('')
  const { getCount } = useSelectors(counterReducer, (state) => ({
    getCount: () => state,
  }))

  const [onModalExchangeSale] = useModal(
    <ModalSaleExchange amount={amount} setAmount={setAmount} />,
    true,
    true,
    'exchange-sale',
  )

  return (
    <Page>
      <ContentContainer>
        <CountDownBlock onModalExchangeSale={onModalExchangeSale} />
        <SaleStats dataStat={initStat} />
        <ChartSalePage />
        <SaleStatus />
        <SaleMechanism
          tabSaleMechanism={tabSaleMechanism}
          tabActiveMechansim={tabActiveMechansim}
          setTabActiveMechansim={setTabActiveMechansim}
          initialTokenMetrics={initialTokenMetrics}
          dataInfo={getCount()}
          dataRefInfo={initialRefInfo}
        />
        <SaleHistorySession />
        <BackedBy />
      </ContentContainer>
    </Page>
  )
}

export default VestingPage
