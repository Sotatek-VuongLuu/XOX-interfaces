import { Box, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'

export const StyledSwapContainer = styled(Flex)<{ $isChartExpanded: boolean }>`
  flex-shrink: 0;
  height: fit-content;
  position: absolute;
  top: 30px;
  left: 16px;
  padding: 18px 28px 0px;
  width: 559px;
  max-width: 100vw;
`

export const StyledInputCurrencyWrapper = styled(Box)`
  width: 503px;
  max-width: 100vw;
`
export const StyledHeader = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSubtle};
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.hr}
`
export const StyledHeading1 = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.white};
`