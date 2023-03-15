import { Text } from '@pancakeswap/uikit'
import React from 'react'
import styled from 'styled-components'
import CountDown from './CountDown'
import PricingInfo from './PricingInfo'
import StartingSoon from './StartingSoon'

const Wrapper = styled.div`
  margin-top: 36px;
  margin-bottom: 24px;
`

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

function CountDownBlock({ onModalExchangeSale }) {
  return (
    <Wrapper>
      <Content>
        <PricingInfo onModalExchangeSale={onModalExchangeSale} />
        <StartingSoon />
      </Content>
    </Wrapper>
  )
}

export default CountDownBlock