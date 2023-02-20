import { Flex, Text } from '@pancakeswap/uikit'
import { useState } from 'react'
import styled from 'styled-components'
import { ClickableColumnHeader, CustomTableWrapper, Table } from '../MainInfoTab/SaleHistory'

interface IProps {
  initialTokenMetrics: any[]
}

const CustomTable = styled(Table)`
  grid-template-columns: 2fr repeat(6, 1.5fr);
  gap: 10px;
`

const Wrapper = styled.div`
  .heading_info_vesting {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 30px;
      left: 0px;
      width: 40px;
      height: 4px;
      background: linear-gradient(100.7deg, rgb(100, 115, 255) 0%, rgb(163, 90, 255) 100%);
    }
  }
`

const DataRow = ({ item }) => {
  return (
    <>
      <Text className="text-token-metrics">{item.title}</Text>
      <Text className="text-token-metrics">{item.tokenAllocationPercent}</Text>
      <Text className="text-token-metrics">{item.tokenAllocation}</Text>
      <Text className="text-token-metrics">{item.tge}</Text>
      <Text className="text-token-metrics">{item.tokenAllocationatTge}</Text>
      <Text className="text-token-metrics">{item.initialMarketcap}</Text>
      <Text className="text-token-metrics">{item.fullyDilitedMc}</Text>
    </>
  )
}

function TokenMetrics({ initialTokenMetrics }: IProps) {
  return (
    <Wrapper>
      <Flex mb="16px" justifyContent="space-between">
        <Text
          className="heading_info_vesting"
          fontSize="20px"
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="24px"
          color="rgba(255, 255, 255, 0.87)"
          height="24px"
        >
          Tokenomics:
        </Text>
      </Flex>
      <CustomTableWrapper>
        <CustomTable>
          <Text
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
            className="table-header"
          >
            Tokenometrics
          </Text>
          <Text
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
            className="table-header"
          >
            Token Allocation (%)
          </Text>
          <ClickableColumnHeader
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
            className="table-header"
          >
            <Flex alignItems="center">
              <span style={{ marginRight: '12px' }}>Token Allocation</span>{' '}
            </Flex>
          </ClickableColumnHeader>
          <ClickableColumnHeader
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
            className="table-header"
          >
            <Flex alignItems="center">
              <span style={{ marginRight: '12px' }}>TGE (%)</span>{' '}
            </Flex>
          </ClickableColumnHeader>
          <Text
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
            className="table-header"
          >
            Token Allocation at TGE
          </Text>
          <Text
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
            className="table-header"
          >
            Initial Marketcap
          </Text>
          <ClickableColumnHeader
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.6)"
            className="table-header"
          >
            <Flex alignItems="center">
              <span style={{ marginRight: '12px' }}>Fully Dilited MC ($)</span>
            </Flex>
          </ClickableColumnHeader>

          {Array.from(initialTokenMetrics).map((item) => {
            return <DataRow item={item} />
          })}
        </CustomTable>
      </CustomTableWrapper>
    </Wrapper>
  )
}

export default TokenMetrics
