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
  @media(max-width: 576px){
    width: calc(100% - 33px);
    padding: 10px 20px 0px;
  }
`

export const StyledInputCurrencyWrapper = styled(Box)`
  width: 503px;
  max-width: 100vw;
  @media(max-width: 576px){
    max-width: 100%;
  }
`
export const StyledHeader = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSubtle};
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.hr};
  @media(max-width: 576px){
    font-size: 12px;
    padding-bottom: 15px;
    margin-bottom: 15px;
  }
`
export const StyledHeading1 = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.white};
  @media(max-width: 576px){
    font-size: 16px;
  }
`