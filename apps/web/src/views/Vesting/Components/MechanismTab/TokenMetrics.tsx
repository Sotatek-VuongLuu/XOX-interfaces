import { Flex, Text } from '@pancakeswap/uikit'
import { useState } from 'react'
import styled from 'styled-components'
import { ClickableColumnHeader, CustomTableWrapper, Table } from '../MainInfoTab/SaleHistory'

interface IProps {
  initialTokenMetrics: any[]
}

const CustomTable = styled(Table)`
  grid-template-columns: 5fr 2fr 2fr 1fr repeat(3, 1.5fr);
  gap: 20px;

  &::before {
    top: 52px;
  }

  .table-header {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.6);
  }
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
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    }
  }

  .text-token-metrics {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);
  }

  .item_15,
  .item_14 {
    .text-token-metrics {
      font-weight: 700 !important;
    }
  }
`

const CustomTableSale = styled(CustomTableWrapper)`
  & > div {
    min-width: 1600px;
  }
`

const Row = styled(CustomTable)`
  &::before {
    top: 25px;
  }

  &.item_15::before {
    border: 1px solid transparent;
  }
`

const DataRow = ({ item }) => {
  return (
    <Row className={`item_${item.id}`}>
      <Text className="text-token-metrics">{item.title}</Text>
      <Text className="text-token-metrics">
        {item.tokenAllocationPercent ? `${item.tokenAllocationPercent}%` : `-`}
      </Text>
      <Text className="text-token-metrics">
        {item.tokenAllocationPercent ? Number(item.tokenAllocation).toLocaleString() : '-'}
      </Text>
      <Text className="text-token-metrics">{item.tge}%</Text>
      <Text className="text-token-metrics">
        {item.tokenAllocationatTge ? Number(item.initialMarketcap).toLocaleString() : '-'}
      </Text>
      <Text className="text-token-metrics">
        {item.initialMarketcap ? Number(item.initialMarketcap).toLocaleString() : '-'}
      </Text>
      <Text className="text-token-metrics" textAlign="right">
        {item.fullyDilitedMc ? Number(item.fullyDilitedMc).toLocaleString() : '-'}
      </Text>
    </Row>
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
      <CustomTableSale>
        <CustomTable>
          <Text className="table-header">Tokenometrics</Text>
          <Text className="table-header">Token Allocation (%)</Text>
          <Text className="table-header">Token Allocation</Text>
          <Text className="table-header">TGE (%)</Text>
          <Text className="table-header">Token Allocation at TGE</Text>
          <Text className="table-header">Initial Marketcap</Text>
          <Text className="table-header">Fully Dilited MC ($)</Text>
        </CustomTable>
        {Array.from(initialTokenMetrics).map((item) => {
          return <DataRow item={item} />
        })}
      </CustomTableSale>
    </Wrapper>
  )
}

export default TokenMetrics
