import { Box, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'

export const StyledSwapContainer = styled(Flex)<{ $isChartExpanded: boolean }>`
  flex-shrink: 0;
  height: fit-content;
  position: absolute;
  top: 30px;
  left: 16px;
  padding: 0 28px;
  width: 559px;
`

export const StyledInputCurrencyWrapper = styled(Box)`
  width: 503px;
`
