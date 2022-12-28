// TODO PCS refactor ternaries
/* eslint-disable no-nested-ternary */
// import { useTranslation } from '@pancakeswap/localization'
// import { ChainId } from '@pancakeswap/sdk'
import { useAccount, useProvider, useNetwork } from 'wagmi'
// import { fetchBalance } from '@wagmi/core'
// import truncateHash from '@pancakeswap/utils/truncateHash'
import { Flex, Text, CopyButton } from '@pancakeswap/uikit'
// import { ITEMS_PER_INFO_TABLE_PAGE } from 'config/constants/info'
// import { formatDistanceToNowStrict } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
// import { useGetChainName } from 'state/info/hooks'
// import { Transaction, TransactionType } from 'state/info/types'
import styled from 'styled-components'
// import { getBlockExploreLink } from 'utils'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { formatBigNumber } from '@pancakeswap/utils/formatBalance'
// import { formatAmount } from 'utils/formatInfoNumbers'
// import { defaultTokens } from './config'
import { getBalancesForEthereumAddress } from 'ethereum-erc20-token-balances-multicall'
import { getDefaultProvider } from '@ethersproject/providers'
import { CurrencyLogo } from 'components/Logo'
import { ERC20Token } from '@pancakeswap/sdk'
import ConnectWalletButton from 'components/ConnectWalletButton'
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
    height: 4px;
    background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
  }
`

const CoinListWrapper = styled(Flex)`
  max-height: 146px;
  overflow: auto;
  padding-right: 6px;
  width: calc(100% + 12px);

  ${({ theme }) => theme.mediaQueries.md} {
    padding-right: 9px;
    width: calc(100% + 15px);
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #444444;
    transform: matrix(0, -1, -1, 0, 0, 0);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: none;
    border-radius: 10px;
  }
`

const ConnectButton = styled(ConnectWalletButton)`
  width: 124px;
  height: 37px;
  border-radius: 4px;
  background: linear-gradient(#6473ff, #a35aff);
  padding: 1px;
  border: none;
  margin: 32px auto 0;

  & > div {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background: #242424;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    & > span {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }

    & > svg {
      margin-right: 10px;
    }
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

const TableWrapper = styled(Flex)`
  width: 100%;
  flex-direction: column;
  gap: 16px;
  background-color: ${({ theme }) => theme.card.background};
  border-radius: 10px;
  height: 100%;
  width: 100%;
  padding: 18px;
  min-height: 454px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 100%;
    min-height: unset;
    padding: 24px;
  }
`

const SORT_FIELD = {
  amountUSD: 'amountUSD',
  timestamp: 'timestamp',
  sender: 'sender',
  amountToken0: 'amountToken0',
  amountToken1: 'amountToken1',
}

const TransactionTable: React.FC<React.PropsWithChildren<any>> = ({ currencyDatas, native, allTokens }) => {
  const [tokensBalance, setTokensBalance] = useState<any>([])

  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()
  const { chain } = useNetwork()
  const provider = useProvider({ chainId })
  const [balanceNative, setBalanceNative] = useState<any>()
  const [dataChart, setDataChart] = useState<any>([])
  const [totalAsset, setTotalAsset] = useState<number>(0)

  const colors = ['#9072FF', '#5F35EB', '#89DDEF', '#90F0B1']

  const tokenRateUSD = useCallback(
    (symbol: string) => {
      if (!currencyDatas) return 0
      if (symbol === native.symbol && chainId === 5) {
        const currencyData = currencyDatas.find((data: any) => data?.symbol?.toUpperCase() === 'ETH')
        return currencyData?.price || 0
      }
      if (symbol === native.symbol && chainId === 97) {
        const currencyData = currencyDatas.find((data: any) => data?.symbol?.toUpperCase() === 'BNB')
        return currencyData?.price || 0
      }
      const currencyData = currencyDatas.find((data: any) => data?.symbol?.toUpperCase() === symbol.toUpperCase())
      if (!currencyData) return 0
      return currencyData.price
    },
    [currencyDatas],
  )

  const getToken = useCallback((token) => {
    return new ERC20Token(chainId, token.contractAddress, token.decimals, token.symbol)
  }, [])

  useEffect(() => {
    if (!account || !chain || allTokens.length === 0) return

    const currentProvider = chain.id === 1 || chain.id === 5 ? getDefaultProvider(chain.network) : provider
    currentProvider
      .getBalance(account)
      .then((balance) => {
        setBalanceNative(balance)
      })
      .catch((error) => {
        console.warn(error)
      })
    getBalancesForEthereumAddress({
      // erc20 tokens you want to query!
      contractAddresses: Object.keys(allTokens),
      // ethereum address of the user you want to get the balances for
      ethereumAddress: account,
      // your ethers provider
      providerOptions: {
        ethersProvider: currentProvider,
      },
    })
      .then((balance) => {
        setTokensBalance(balance.tokens)
      })
      .catch((error) => {
        console.warn(error)
      })
  }, [account, chain, allTokens])

  useEffect(() => {
    let total = 0
    const nativeBalance = balanceNative ? parseFloat(formatBigNumber(balanceNative)) * tokenRateUSD(native.symbol) : 0
    const xoxBalance = 0
    const result = [
      {
        name: native.symbol,
        value: nativeBalance,
      },
      {
        name: 'XOX',
        value: xoxBalance,
      },
    ]
    let sum = 0
    tokensBalance.forEach((balance: any) => {
      if (balance.symbol.toLowerCase() === 'busd' || balance.symbol.toLowerCase() === 'usdc') {
        result.push({
          name: balance.symbol,
          value: balance.balance * tokenRateUSD(balance.symbol),
        })
      } else {
        sum += balance.balance * tokenRateUSD(balance.symbol)
      }
    })
    result.push({
      name: 'others',
      value: sum,
    })
    total = nativeBalance + xoxBalance + result[2].value + sum
    setTotalAsset(total)
    setDataChart(result)
  }, [balanceNative, tokensBalance])

  return (
    <Wrapper>
      <TableWrapper>
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

        {account ? (
          <Flex flexDirection="column">
            <InfoPieChart data={dataChart} colors={colors} total={totalAsset} />

            <CoinListWrapper flexDirection="column">
              <Flex alignItems="center" p="16px" borderRadius="6px" background="#303030" mb="6px">
                <CurrencyLogo currency={native} size="30px" />
                <Flex flexDirection="column" ml="10px">
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
                      {balanceNative ? formatBigNumber(balanceNative) : 0}
                    </Text>
                    <Text
                      fontSize="14px"
                      fontFamily="Inter"
                      fontStyle="normal"
                      fontWeight="700"
                      lineHeight="17px"
                      color="rgba(255, 255, 255, 0.6)"
                    >
                      {native.symbol}
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
                    ~${balanceNative ? parseFloat(formatBigNumber(balanceNative)) * tokenRateUSD(native.symbol) : 0} |
                    ~0.70115 XOX
                  </Text>
                </Flex>
              </Flex>
              {tokensBalance.map((balance, index: number) => {
                return (
                  <Flex
                    alignItems="center"
                    p="16px"
                    borderRadius="6px"
                    background="#303030"
                    mb={index === tokensBalance.length - 1 ? '0' : '6px'}
                  >
                    <CurrencyLogo currency={getToken(balance)} size="30px" />
                    <Flex flexDirection="column" ml="10px">
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
                          {balance?.balance}
                        </Text>
                        <Text
                          fontSize="14px"
                          fontFamily="Inter"
                          fontStyle="normal"
                          fontWeight="700"
                          lineHeight="17px"
                          color="rgba(255, 255, 255, 0.6)"
                        >
                          {balance?.symbol}
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
                        ~${balance?.balance * tokenRateUSD(balance.symbol)} | ~0.70115 XOX
                      </Text>
                    </Flex>
                  </Flex>
                )
              })}
            </CoinListWrapper>
          </Flex>
        ) : (
          <Flex height="100%" flexDirection="column" justifyContent="center" alignItems="center">
            <Text
              fontSize="14px"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="17px"
              color="rgba(255, 255, 255)"
              textAlign="center"
            >
              Please connect wallet to view your token balance.{' '}
            </Text>
            <ConnectButton>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <path
                    d="M6.3685 4.23931L6.0185 3.63309C5.74424 3.79143 5.61045 4.11418 5.69225 4.42012C5.77405 4.72605 6.05105 4.93897 6.36774 4.93931L6.3685 4.23931ZM11.2569 1.41699L11.8631 1.06699C11.6698 0.732188 11.2417 0.617475 10.9069 0.810774L11.2569 1.41699ZM12.8905 4.24639L12.8897 4.94639C13.1399 4.94667 13.3713 4.81335 13.4965 4.59672C13.6217 4.38009 13.6218 4.11309 13.4967 3.89639L12.8905 4.24639ZM15.5832 11.6878V12.3878C15.9698 12.3878 16.2832 12.0744 16.2832 11.6878H15.5832ZM15.5832 8.14616H16.2832C16.2832 7.75956 15.9698 7.44616 15.5832 7.44616V8.14616ZM16.2832 5.84408C16.2832 5.45748 15.9698 5.14408 15.5832 5.14408C15.1966 5.14408 14.8832 5.45748 14.8832 5.84408H16.2832ZM14.8832 14.3441C14.8832 14.7307 15.1966 15.0441 15.5832 15.0441C15.9698 15.0441 16.2832 14.7307 16.2832 14.3441H14.8832ZM6.7185 4.84553L11.6069 2.02321L10.9069 0.810774L6.0185 3.63309L6.7185 4.84553ZM10.6507 1.76699L12.2843 4.59639L13.4967 3.89639L11.8631 1.06699L10.6507 1.76699ZM12.8912 3.54639L6.36926 3.53931L6.36774 4.93931L12.8897 4.94639L12.8912 3.54639ZM2.1165 4.95866C2.1165 4.95621 2.11686 4.95565 2.11687 4.95562C2.11708 4.95513 2.11768 4.95403 2.11894 4.95276C2.1202 4.9515 2.12131 4.9509 2.1218 4.95069C2.12183 4.95068 2.12239 4.95033 2.12484 4.95033V3.55033C1.34704 3.55033 0.716504 4.18084 0.716504 4.95866H2.1165ZM2.12484 4.95033H14.8748V3.55033H2.12484V4.95033ZM14.8748 4.95033C14.8773 4.95033 14.8779 4.95068 14.8779 4.95069C14.8784 4.9509 14.8795 4.9515 14.8807 4.95276C14.882 4.95402 14.8826 4.95513 14.8828 4.95562C14.8828 4.95564 14.8832 4.95621 14.8832 4.95866H16.2832C16.2832 4.18085 15.6526 3.55033 14.8748 3.55033V4.95033ZM14.8832 4.95866V14.8753H16.2832V4.95866H14.8832ZM14.8832 14.8753C14.8832 14.8778 14.8828 14.8783 14.8828 14.8784C14.8826 14.8789 14.882 14.88 14.8807 14.8812C14.8795 14.8825 14.8784 14.8831 14.8779 14.8833C14.8779 14.8833 14.8773 14.8837 14.8748 14.8837V16.2837C15.6526 16.2837 16.2832 15.6531 16.2832 14.8753H14.8832ZM14.8748 14.8837H2.12484V16.2837H14.8748V14.8837ZM2.12484 14.8837C2.12239 14.8837 2.12183 14.8833 2.1218 14.8833C2.12131 14.8831 2.1202 14.8825 2.11894 14.8812C2.11768 14.88 2.11708 14.8788 2.11687 14.8784C2.11686 14.8783 2.1165 14.8778 2.1165 14.8753H0.716504C0.716504 15.6531 1.34704 16.2837 2.12484 16.2837V14.8837ZM2.1165 14.8753V4.95866H0.716504V14.8753H2.1165ZM12.4842 12.3878H15.5832V10.9878H12.4842V12.3878ZM16.2832 11.6878V8.14616H14.8832V11.6878H16.2832ZM15.5832 7.44616H12.4842V8.84616H15.5832V7.44616ZM12.4842 7.44616C11.1033 7.44616 9.92484 8.52061 9.92484 9.91699H11.3248C11.3248 9.35738 11.8113 8.84616 12.4842 8.84616V7.44616ZM9.92484 9.91699C9.92484 11.3134 11.1033 12.3878 12.4842 12.3878V10.9878C11.8113 10.9878 11.3248 10.4766 11.3248 9.91699H9.92484ZM14.8832 5.84408V14.3441H16.2832V5.84408H14.8832Z"
                    fill="url(#paint0_linear_6038_5833)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_6038_5833"
                      x1="1.4165"
                      y1="1.41699"
                      x2="17.6787"
                      y2="4.48841"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#6473FF" />
                      <stop offset="1" stopColor="#A35AFF" />
                    </linearGradient>
                  </defs>
                </svg>
                <span>Connect</span>
              </div>
            </ConnectButton>
          </Flex>
        )}
        {/* {tokensBalance &&
          tokensBalance?.map((tokenBalance) => {
            const value = (tokenBalance as any)?.value
            const symbol = (tokenBalance as any)?.symbol
            const address = (tokenBalance as any)?.contractAddress
            return (
              <Flex>
                <Image
                  width={30}
                  height={30}
                  src={`/images/tokens/${address}.png`}
                  alt={`${address}.png`}
                />
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
