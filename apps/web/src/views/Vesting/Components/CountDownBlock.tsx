/* eslint-disable import/no-cycle */
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { RoundInfo } from '..'
import PricingInfo from './PricingInfo'
import StartingSoon from './StartingSoon'

const Wrapper = styled.div`
  margin-top: 36px;
  margin-bottom: 24px;
  @media screen and (max-width: 900px) {
    margin-top: 4px;
    margin-bottom: 24px;
  }
`

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`
interface IProps {
  onModalExchangeSale: () => void
  currentRound: number
  infoRoundOne: RoundInfo
  infoRoundTow: RoundInfo
  infoRoundThree: RoundInfo
  isInTimeRangeSale: boolean
  isUserInWhiteList: boolean
  isTimeAllowWhitelist: boolean
  setTypeBuyPrice: (typeBuy: number) => void
  typeBuyPrice: number
  totalXOXTokenInRound: number | string
  reacheZero: boolean
  setReachZero: (isReach: boolean) => void
  oneHourBeforeStart: number
  setisReachWhitelist: (reach: boolean) => void
}

function CountDownBlock({
  onModalExchangeSale,
  currentRound,
  infoRoundOne,
  infoRoundTow,
  infoRoundThree,
  isInTimeRangeSale,
  isUserInWhiteList,
  isTimeAllowWhitelist,
  setTypeBuyPrice,
  typeBuyPrice,
  totalXOXTokenInRound,
  reacheZero,
  setReachZero,
  oneHourBeforeStart,
  setisReachWhitelist,
}: IProps) {
  return (
    <Wrapper>
      <Content>
        <PricingInfo
          onModalExchangeSale={onModalExchangeSale}
          currentRound={currentRound}
          isInTimeRangeSale={isInTimeRangeSale}
          isUserInWhiteList={isUserInWhiteList}
          isTimeAllowWhitelist={isTimeAllowWhitelist}
          setTypeBuyPrice={setTypeBuyPrice}
          typeBuyPrice={typeBuyPrice}
        />
        <StartingSoon
          currentRound={currentRound}
          infoRoundOne={infoRoundOne}
          infoRoundTow={infoRoundTow}
          infoRoundThree={infoRoundThree}
          totalXOXTokenInRound={totalXOXTokenInRound}
          isInTimeRangeSale={isInTimeRangeSale}
          isUserInWhiteList={isUserInWhiteList}
          isTimeAllowWhitelist={isTimeAllowWhitelist}
          reacheZero={reacheZero}
          setReachZero={setReachZero}
          oneHourBeforeStart={oneHourBeforeStart}
          setisReachWhitelist={setisReachWhitelist}
        />
      </Content>
    </Wrapper>
  )
}

export default CountDownBlock
