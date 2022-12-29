import { Box, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'

export const StyledSwapContainer = styled(Flex)<{ $isChartExpanded: boolean }>`
  flex-shrink: 0;
  top: 30px;
  left: 16px;
  padding: 30px 0;
  margin-top: 20px;
  width: 100%;
  max-width: 559px;
  z-index: 2;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 18px;
  }
`

export const StyledInputCurrencyWrapper = styled(Box)`
  width: 100%;
`
