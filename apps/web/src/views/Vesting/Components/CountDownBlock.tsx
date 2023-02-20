import { Text } from '@pancakeswap/uikit'
import React from 'react'
import styled from 'styled-components'
import CountDown from './CountDown'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Content = styled.div``

function CountDownBlock() {
  return (
    <Wrapper>
      <Content>
        <Text>XOX Token Private Sale Starting Soon</Text>
        <Text>Sale 1 will start on</Text>
        <CountDown startTime={1679257779000} />
      </Content>
    </Wrapper>
  )
}

export default CountDownBlock
