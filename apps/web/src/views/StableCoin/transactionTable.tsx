import { Box, Flex, LinkExternal, Skeleton, Text, Button, Link, Select, Input } from '@pancakeswap/uikit'

export default function TransactionTable() {
  return (
    <Flex mb="16px" justifyContent="space-between">
      <Text
        className="heading"
        fontSize="20px"
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="700"
        lineHeight="24px"
        color="rgba(255, 255, 255, 0.87)"
        height="24px"
      >
        Transactions History
      </Text>
      <Flex flexDirection="column" alignItems="flex-end">
        <Text
          fontSize="14px"
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="17px"
          color="rgba(255, 255, 255, 0.6)"
        >
          Total: 100
        </Text>
      </Flex>
    </Flex>
  )
}