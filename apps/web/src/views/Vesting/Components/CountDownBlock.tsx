import { Text } from '@pancakeswap/uikit'
import React from 'react'
import styled from 'styled-components'
import CountDown from './CountDown'
import PricingInfo from './PricingInfo'

const Wrapper = styled.div`
  margin-top: 36px;
`

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

function CountDownBlock() {
  return (
    <Wrapper>
      <Content>
        <PricingInfo />
        <CountDown startTime={1679257779000} />
      </Content>
    </Wrapper>
  )
}

export default CountDownBlock
