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
  grid-template-columns: 49% 49%;
  gap: 24px;
`

function CountDownBlock() {
  return (
    <Wrapper>
      <Content>
        <PricingInfo />
        <StartingSoon />
      </Content>
    </Wrapper>
  )
}

export default CountDownBlock
