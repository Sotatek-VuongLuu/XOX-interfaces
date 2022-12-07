// TODO PCS refactor ternaries
/* eslint-disable no-nested-ternary */
import { useTranslation } from '@pancakeswap/localization'
// import { ChainId } from '@pancakeswap/sdk'
// import { useProvider } from 'wagmi'
// import { fetchBalance } from '@wagmi/core'
// import truncateHash from '@pancakeswap/utils/truncateHash'
import { Flex, Image, Text, CopyButton } from '@pancakeswap/uikit'
// import { ITEMS_PER_INFO_TABLE_PAGE } from 'config/constants/info'
// import { formatDistanceToNowStrict } from 'date-fns'
import { useEffect, useState } from 'react'
// import { useGetChainName } from 'state/info/hooks'
// import { Transaction, TransactionType } from 'state/info/types'
import styled from 'styled-components'
// import { getBlockExploreLink } from 'utils'
import { useAccount } from 'wagmi'
import { useActiveChainId } from 'hooks/useActiveChainId'
// import { formatBigNumber } from '@pancakeswap/utils/formatBalance'
// import { formatAmount } from 'utils/formatInfoNumbers'
// import { defaultTokens } from './config'
import { TableWrapper } from './shared'
import InfoPieChart from '../InfoCharts/PieChart'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  & .heading {
    position: relative;
  }

  & .heading:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
  }
`

const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;
  grid-template-columns: 2fr 4fr;
  padding: 0 24px;
  @media screen and (max-width: 940px) {
    grid-template-columns: 2fr 4fr;
  }
`

const Address = styled.div`
  position: relative;

  & > input {
    background: transparent;
    border: 0;
    color: #3d8aff;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    display: block;
    padding: 0;
    width: 130px;

    &:focus {
      outline: 0;
    }
  }

  &:after {
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.background}00,
      ${({ theme }) => theme.colors.background}E6
    );
    content: '';
    height: 100%;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
  }
`

const SORT_FIELD = {
  amountUSD: 'amountUSD',
  timestamp: 'timestamp',
  sender: 'sender',
  amountToken0: 'amountToken0',
  amountToken1: 'amountToken1',
}

const TransactionTable: React.FC<React.PropsWithChildren<any>> = () => {
  const [tokensBalance, setTokensBalance] = useState<boolean>(true)

  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()

  // const balance = await web3React.eth.getBalance(account);

  // const tokensBalance = Object.values(defaultTokens).map(async (tokens) => {
  //   const token = tokens[chainId]
  //   if (!token) return

  //   const balance = await fetchBalance({
  //     addressOrName: account,
  //     token: token.address,
  //   })

  //   return balance
  // })

  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ]

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  useEffect(() => {
    // const tokensBalance = Object.values(defaultTokens).map(async (tokens) => {
    //   const token = tokens[chainId]
    //   if (!token) return
    //   const balance = await fetchBalance({
    //     addressOrName: account,
    //     token: token.address,
    //   })
    //   return balance
    // })
  }, [])

  return (
    <Wrapper>
      <TableWrapper style={{ height: '100%', padding: '24px', width: '454px' }}>
        <Flex justifyContent="space-between" alignItems="flex-end">
          <Text
            fontSize="20px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="24px"
            color="rgba(255, 255, 255, 0.87)"
            className="heading"
          >
            Token Asset
          </Text>
          {account && (
            <Flex>
              <Address title={account}>
                <input
                  type="text"
                  readOnly
                  value={`${account.substring(0, 8)}...${account.substring(account.length - 4)}`}
                />
              </Address>
              <Flex>
                <CopyButton
                  width="24px"
                  text={account}
                  tooltipMessage="Copied"
                  button={
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                      <path
                        d="M14.3432 12.2183V2.65576H4.78027"
                        stroke="#8E8E8E"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.2182 4.78101H2.65527V14.3435H12.2182V4.78101Z"
                        stroke="#8E8E8E"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                />
              </Flex>
            </Flex>
          )}
        </Flex>
        <InfoPieChart data={data} colors={colors} />
        <Flex flexDirection="column">
          <Flex alignItems="center" p="19px 16px" borderRadius="6px" background="#303030" mb="6px">
            <Image width={30} height={30} src="alt" marginRight="6px" />
            <Flex flexDirection="column">
              <Flex mb="6px">
                <Text
                  fontSize="14px"
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="700"
                  lineHeight="17px"
                  color="rgba(255, 255, 255, 0.87)"
                  marginRight="5px"
                >
                  3213
                </Text>
                <Text
                  fontSize="14px"
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="700"
                  lineHeight="17px"
                  color="rgba(255, 255, 255, 0.6)"
                >
                  BNB
                </Text>
              </Flex>
              {/* <Text color="rgba(255, 255, 255, 0.87)">{formatBigNumber(value, 6)}</Text> */}
              <Text
                fontSize="12px"
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="15px"
                color="rgba(255, 255, 255, 0.6)"
              >
                ~$28,628.41 | ~0.70115 XOX
              </Text>
            </Flex>
          </Flex>
          <Flex alignItems="center" p="19px 16px" borderRadius="6px" background="#303030">
            <Image width={30} height={30} src="alt" marginRight="6px" />
            <Flex flexDirection="column">
              <Flex mb="6px">
                <Text
                  fontSize="14px"
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="700"
                  lineHeight="17px"
                  color="rgba(255, 255, 255, 0.87)"
                  marginRight="5px"
                >
                  3213
                </Text>
                <Text
                  fontSize="14px"
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="700"
                  lineHeight="17px"
                  color="rgba(255, 255, 255, 0.6)"
                >
                  BNB
                </Text>
              </Flex>
              {/* <Text color="rgba(255, 255, 255, 0.87)">{formatBigNumber(value, 6)}</Text> */}
              <Text
                fontSize="12px"
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="15px"
                color="rgba(255, 255, 255, 0.6)"
              >
                ~$28,628.41 | ~0.70115 XOX
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {/* {tokensBalance &&
          tokensBalance?.map((tokenBalance) => {
            const value = (tokenBalance as any)?.value
            const symbol = (tokenBalance as any)?.symbol
            return (
              <Flex>
                <Image width={30} height={30} src="alt" />
                <Flex>
                  <>
                    {value} {symbol}
                    <Text color="rgba(255, 255, 255, 0.87)">{value && formatBigNumber(value, 6)}</Text>
                  </>
                </Flex>
              </Flex>
            )
          })} */}
      </TableWrapper>
    </Wrapper>
  )
}

export default TransactionTable
