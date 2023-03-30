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
import { formatAmountNumber, formatAmountNumber2, formatBigNumber } from '@pancakeswap/utils/formatBalance'
// import { formatAmountNumber } from 'utils/formatInfoNumbers'
// import { defaultTokens } from './config'
import { getBalancesForEthereumAddress } from 'ethereum-erc20-token-balances-multicall'
import { getDefaultProvider } from '@ethersproject/providers'
import { CurrencyLogo } from 'components/Logo'
import { ERC20Token, PAIR_XOX_BUSD } from '@pancakeswap/sdk'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { USD_ADDRESS, USD_DECIMALS, XOX_ADDRESS } from 'config/constants/exchange'
import { useERC20 } from 'hooks/useContract'
import InfoPieChart from '../InfoCharts/PieChart'
import { useTranslation } from '@pancakeswap/localization'

const Wrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  position: relative;

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
    background: linear-gradient(90deg, #ee0979 0%, #ff6a00 100%);
  }

  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 2px solid #ffffff30;
    border-left: 2px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    left: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 2px solid #ffffff30;
    border-right: 2px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 454px;
    min-width: 454px;
    margin-left: 24px;
    margin-top: 0;

    .corner1 {
      border-bottom: 1px solid #ffffff30;
      border-left: 1px solid #ffffff30;
    }

    .edge1 {
      width: 1px;
    }

    .corner2 {
      border-bottom: 1px solid #ffffff30;
      border-right: 1px solid #ffffff30;
    }

    .edge2 {
      width: 1px;
    }
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
  padding: 1px;
  border: none;
  margin: 32px auto 0;
  background: transparent;

  & > div {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background: transparent;
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
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
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
    color: rgba(255, 255, 255, 0.87);
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
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
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

const TransactionTable: React.FC<React.PropsWithChildren<any>> = ({ currencyDatas, native, allTokens, className }) => {
  const [tokensBalance, setTokensBalance] = useState<any>([])
  const { t } = useTranslation()

  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()
  const { chain } = useNetwork()
  const provider = useProvider({ chainId })
  const [balanceNative, setBalanceNative] = useState<any>()
  const [dataChart, setDataChart] = useState<any>([])
  const [totalAsset, setTotalAsset] = useState<number>(0)
  const [rateXOX, setRateXOX] = useState(0)
  const contractUSD = useERC20(USD_ADDRESS[chainId])
  const contractXOX = useERC20(XOX_ADDRESS[chainId])
  const [colors, setColors] = useState<any[]>([])

  const tokenRateUSD = useCallback(
    (symbol: string): number => {
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
    [currencyDatas, chainId],
  )

  const tokenRateXOX = useCallback(
    (symbol: string) => {
      if (!currencyDatas || rateXOX === 0) return 0
      if (symbol === native.symbol && chainId === 5) {
        const currencyData = currencyDatas.find((data: any) => data?.symbol?.toUpperCase() === 'ETH')
        return (currencyData?.price || 0) / rateXOX
      }
      if (symbol === native.symbol && chainId === 97) {
        const currencyData = currencyDatas.find((data: any) => data?.symbol?.toUpperCase() === 'BNB')
        return (currencyData?.price || 0) / rateXOX
      }
      const currencyData = currencyDatas.find((data: any) => data?.symbol?.toUpperCase() === symbol.toUpperCase())
      if (!currencyData) return 0
      return currencyData.price / rateXOX
    },
    [currencyDatas, rateXOX, chainId],
  )

  const getXOXPrice = () => {
    Promise.all([contractUSD.balanceOf(PAIR_XOX_BUSD[chainId]), contractXOX.balanceOf(PAIR_XOX_BUSD[chainId])])
      .then((balances) => {
        const baseTokenPrice = parseFloat(formatBigNumber(balances[0], 2, USD_DECIMALS[chainId]))
        const XoxPrice = parseFloat(formatBigNumber(balances[1]))
        if (baseTokenPrice === 0) return
        setRateXOX(baseTokenPrice / XoxPrice)
      })
      .catch((e) => console.warn(e))
  }

  const getToken = useCallback(
    (token: any) => {
      return new ERC20Token(chainId, token.contractAddress, token.decimals, token.symbol)
    },
    [chainId],
  )

  useEffect(() => {
    getXOXPrice()
    const id = setInterval(getXOXPrice, 10000)

    // eslint-disable-next-line consistent-return
    return () => clearInterval(id)
  }, [chainId])

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
    const nativeBalance = balanceNative
      ? formatAmountNumber(parseFloat(formatBigNumber(balanceNative)) * tokenRateUSD(native.symbol))
      : 0
    const balanceXOX = tokensBalance.find(
      (token: any) => token.contractAddress.toLowerCase() === XOX_ADDRESS[chainId].toLowerCase(),
    )
    const xoxBalance = balanceXOX ? formatAmountNumber(balanceXOX.balance * rateXOX) : 0
    const result = [
      { name: native.symbol, value: nativeBalance },
      { name: 'XOX', value: xoxBalance },
    ]
    let sum = 0
    tokensBalance.forEach((balance: any) => {
      if (balance.contractAddress.toLowerCase() === USD_ADDRESS[chainId].toLowerCase()) {
        const balanceUSD = formatAmountNumber(balance.balance * tokenRateUSD(balance.symbol))
        result.push({ name: balance.symbol, value: balanceUSD })
      } else if (balance.contractAddress.toLowerCase() !== XOX_ADDRESS[chainId].toLowerCase()) {
        sum += formatAmountNumber(balance.balance * tokenRateUSD(balance.symbol))
      }
    })
    setColors([
      { start: '#2A56D9', end: '#66B5F8' },
      { start: '#791CE7', end: '#BD2AE8' },
      { start: '#C2785B', end: '#C39B5F' },
      { start: '#B02E79', end: '#C043BB' },
    ])
    result.push({
      name: t('Others'),
      value: sum,
    })
    total = nativeBalance + xoxBalance + result[2].value + sum
    setTotalAsset(total)
    setDataChart(
      result.map((d) => {
        return {
          name: d.name,
          value: Number(((d.value * 100) / total).toFixed(2)),
        }
      }),
    )
    console.log(
      result.map((d) => {
        return {
          name: d.name,
          value: Number(((d.value * 100) / total).toFixed(2)),
        }
      }),
    )
  }, [balanceNative, tokensBalance, chainId, currencyDatas, rateXOX])

  return (
    <Wrapper className={className}>
      <div className="corner1"></div>
      <div className="edge1"></div>
      <div className="corner2"></div>
      <div className="edge2"></div>
      <TableWrapper>
        <Flex justifyContent="space-between" alignItems="flex-end">
          <Text
            fontSize={['16px', , '20px']}
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight={['19px', , '24px']}
            color="rgba(255, 255, 255, 0.87)"
            className="heading"
          >
            {t('Token Asset')}
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
                  tooltipMessage={t("Copied")}
                  button={
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                      <path
                        d="M14.3432 12.7188V3.15625H4.78027"
                        stroke="url(#paint0_linear_10957_45072)"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.2182 5.28125H2.65527V14.8438H12.2182V5.28125Z"
                        stroke="url(#paint1_linear_10957_45072)"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_10957_45072"
                          x1="4.78027"
                          y1="7.93753"
                          x2="14.3432"
                          y2="7.93753"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#EE0979" />
                          <stop offset="1" stopColor="#FF6A00" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_10957_45072"
                          x1="2.65527"
                          y1="10.0625"
                          x2="12.2182"
                          y2="10.0625"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#EE0979" />
                          <stop offset="1" stopColor="#FF6A00" />
                        </linearGradient>
                      </defs>
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
              <Flex alignItems="center" p="16px" borderRadius="6px" background="rgba(255, 255, 255, 0.05)" mb="6px">
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
                      {balanceNative ? formatBigNumber(balanceNative, 6) : 0}
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
                    ~$
                    {balanceNative
                      ? formatAmountNumber2(parseFloat(formatBigNumber(balanceNative)) * tokenRateUSD(native.symbol))
                      : 0}{' '}
                    | ~
                    {balanceNative
                      ? formatAmountNumber2(parseFloat(formatBigNumber(balanceNative)) * tokenRateXOX(native.symbol))
                      : 0}{' '}
                    XOX
                  </Text>
                </Flex>
              </Flex>
              {tokensBalance.map((balance, index: number) => {
                return (
                  <Flex
                    alignItems="center"
                    p="16px"
                    borderRadius="6px"
                    background="rgba(255, 255, 255, 0.05)"
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
                          {formatAmountNumber2(balance?.balance, 6)}
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
                        {/* {tokenRateXOX(balance.symbol)} && 
                        {balance &&
                          (balance.symbol === 'XOX'
                            ? balance?.balance * tokenRateXOX(balance.symbol)
                            : '' */}
                        {balance?.symbol !== 'XOX' ? (
                          <>
                            ~${formatAmountNumber2(balance?.balance * tokenRateUSD(balance.symbol))} | ~
                            {formatAmountNumber2(balance?.balance * tokenRateXOX(balance.symbol))} XOX
                          </>
                        ) : (
                          <>~${formatAmountNumber2(balance?.balance / rateXOX)}</>
                        )}
                      </Text>
                    </Flex>
                  </Flex>
                )
              })}
            </CoinListWrapper>
          </Flex>
        ) : (
          <Flex height="100%" minHeight="350px" flexDirection="column" justifyContent="center" alignItems="center">
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
              <svg xmlns="http://www.w3.org/2000/svg" width="124" height="37" viewBox="0 0 124 37" fill="none">
                <path
                  d="M35.5834 15.8441V24.3441M26.3687 14.2393L31.2572 11.417L32.8907 14.2464L26.3687 14.2393ZM21.4167 14.9587C21.4167 14.5674 21.7339 14.2503 22.1251 14.2503H34.8751C35.2663 14.2503 35.5834 14.5674 35.5834 14.9587V24.8753C35.5834 25.2665 35.2663 25.5837 34.8751 25.5837H22.1251C21.7339 25.5837 21.4167 25.2665 21.4167 24.8753V14.9587ZM32.4845 21.6878H35.5834V18.1462H32.4845C31.4575 18.1462 30.6251 18.939 30.6251 19.917C30.6251 20.895 31.4575 21.6878 32.4845 21.6878Z"
                  stroke="url(#paint0_linear_11003_43804)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M54.8686 17.3828H52.6911C52.6513 17.1011 52.5701 16.8509 52.4474 16.6321C52.3248 16.41 52.1674 16.2211 51.9751 16.0653C51.7829 15.9096 51.5608 15.7902 51.3089 15.7074C51.0604 15.6245 50.7902 15.5831 50.4986 15.5831C49.9716 15.5831 49.5125 15.714 49.1214 15.9759C48.7304 16.2344 48.4271 16.6122 48.2116 17.1094C47.9962 17.6032 47.8885 18.2031 47.8885 18.9091C47.8885 19.6349 47.9962 20.2448 48.2116 20.7386C48.4304 21.2325 48.7353 21.6054 49.1264 21.8572C49.5175 22.1091 49.9699 22.2351 50.4837 22.2351C50.772 22.2351 51.0388 22.197 51.2841 22.1207C51.5327 22.0445 51.7531 21.9335 51.9453 21.7876C52.1375 21.6385 52.2966 21.4579 52.4226 21.2457C52.5518 21.0336 52.6413 20.7917 52.6911 20.5199L54.8686 20.5298C54.8123 20.9972 54.6714 21.4479 54.446 21.8821C54.224 22.313 53.924 22.6991 53.5462 23.0405C53.1716 23.3786 52.7242 23.647 52.2038 23.8459C51.6868 24.0414 51.1018 24.1392 50.4489 24.1392C49.5407 24.1392 48.7287 23.9337 48.0128 23.5227C47.3002 23.1117 46.7367 22.5168 46.3224 21.7379C45.9115 20.959 45.706 20.0161 45.706 18.9091C45.706 17.7988 45.9148 16.8542 46.3324 16.0753C46.75 15.2964 47.3168 14.7031 48.0327 14.2955C48.7486 13.8845 49.554 13.679 50.4489 13.679C51.0388 13.679 51.5857 13.7618 52.0895 13.9276C52.5966 14.0933 53.0457 14.3352 53.4368 14.6534C53.8279 14.9683 54.1461 15.3544 54.3913 15.8118C54.6399 16.2692 54.799 16.7929 54.8686 17.3828ZM59.8228 24.1491C59.0505 24.1491 58.3827 23.9851 57.8192 23.657C57.2591 23.3255 56.8266 22.8648 56.5217 22.2749C56.2167 21.6816 56.0643 20.9938 56.0643 20.2116C56.0643 19.4228 56.2167 18.7334 56.5217 18.1435C56.8266 17.5502 57.2591 17.0895 57.8192 16.7614C58.3827 16.4299 59.0505 16.2642 59.8228 16.2642C60.5951 16.2642 61.2612 16.4299 61.8214 16.7614C62.3848 17.0895 62.819 17.5502 63.1239 18.1435C63.4289 18.7334 63.5813 19.4228 63.5813 20.2116C63.5813 20.9938 63.4289 21.6816 63.1239 22.2749C62.819 22.8648 62.3848 23.3255 61.8214 23.657C61.2612 23.9851 60.5951 24.1491 59.8228 24.1491ZM59.8327 22.5085C60.1841 22.5085 60.4774 22.4091 60.7127 22.2102C60.948 22.008 61.1254 21.733 61.2447 21.3849C61.3673 21.0369 61.4286 20.6409 61.4286 20.1967C61.4286 19.7526 61.3673 19.3565 61.2447 19.0085C61.1254 18.6605 60.948 18.3854 60.7127 18.1832C60.4774 17.9811 60.1841 17.88 59.8327 17.88C59.4781 17.88 59.1798 17.9811 58.9379 18.1832C58.6992 18.3854 58.5186 18.6605 58.396 19.0085C58.2766 19.3565 58.217 19.7526 58.217 20.1967C58.217 20.6409 58.2766 21.0369 58.396 21.3849C58.5186 21.733 58.6992 22.008 58.9379 22.2102C59.1798 22.4091 59.4781 22.5085 59.8327 22.5085ZM67.0763 19.5852V24H64.9585V16.3636H66.9769V17.7109H67.0664C67.2354 17.2668 67.5188 16.9155 67.9165 16.657C68.3143 16.3951 68.7965 16.2642 69.3633 16.2642C69.8936 16.2642 70.3559 16.3802 70.7504 16.6122C71.1448 16.8442 71.4513 17.1757 71.6701 17.6065C71.8888 18.0341 71.9982 18.5445 71.9982 19.1378V24H69.8803V19.5156C69.8836 19.0483 69.7643 18.6837 69.5224 18.4219C69.2804 18.1567 68.9473 18.0241 68.5231 18.0241C68.238 18.0241 67.9862 18.0855 67.7674 18.2081C67.552 18.3307 67.3829 18.5097 67.2603 18.745C67.141 18.977 67.0797 19.2571 67.0763 19.5852ZM75.7853 19.5852V24H73.6674V16.3636H75.6859V17.7109H75.7754C75.9444 17.2668 76.2278 16.9155 76.6255 16.657C77.0233 16.3951 77.5055 16.2642 78.0723 16.2642C78.6026 16.2642 79.0649 16.3802 79.4593 16.6122C79.8538 16.8442 80.1603 17.1757 80.3791 17.6065C80.5978 18.0341 80.7072 18.5445 80.7072 19.1378V24H78.5893V19.5156C78.5926 19.0483 78.4733 18.6837 78.2314 18.4219C77.9894 18.1567 77.6563 18.0241 77.2321 18.0241C76.947 18.0241 76.6951 18.0855 76.4764 18.2081C76.2609 18.3307 76.0919 18.5097 75.9693 18.745C75.85 18.977 75.7886 19.2571 75.7853 19.5852ZM85.8565 24.1491C85.071 24.1491 84.3949 23.9901 83.8281 23.6719C83.2647 23.3504 82.8305 22.8963 82.5256 22.3097C82.2206 21.7197 82.0682 21.022 82.0682 20.2166C82.0682 19.4311 82.2206 18.7417 82.5256 18.1484C82.8305 17.5552 83.2597 17.0928 83.8132 16.7614C84.37 16.4299 85.023 16.2642 85.772 16.2642C86.2758 16.2642 86.7448 16.3454 87.179 16.5078C87.6165 16.6669 87.9976 16.9072 88.3224 17.2287C88.6506 17.5502 88.9058 17.9545 89.0881 18.4418C89.2704 18.9257 89.3615 19.4924 89.3615 20.142V20.7237H82.9134V19.4112H87.3679C87.3679 19.1063 87.3016 18.8362 87.169 18.6009C87.0365 18.3655 86.8525 18.1816 86.6172 18.049C86.3852 17.9131 86.1151 17.8452 85.8068 17.8452C85.4853 17.8452 85.2003 17.9197 84.9517 18.0689C84.7064 18.2147 84.5142 18.4119 84.375 18.6605C84.2358 18.9058 84.1645 19.1792 84.1612 19.4808V20.7287C84.1612 21.1065 84.2308 21.433 84.37 21.7081C84.5125 21.9832 84.7131 22.1953 84.9716 22.3445C85.2301 22.4936 85.5367 22.5682 85.8913 22.5682C86.1267 22.5682 86.3421 22.535 86.5376 22.4688C86.7332 22.4025 86.9006 22.303 87.0398 22.1705C87.179 22.0379 87.285 21.8755 87.358 21.6832L89.3168 21.8125C89.2173 22.2831 89.0135 22.6941 88.7053 23.0455C88.4003 23.3935 88.0059 23.6652 87.522 23.8608C87.0414 24.053 86.4863 24.1491 85.8565 24.1491ZM94.1939 24.1491C93.4117 24.1491 92.7389 23.9834 92.1754 23.652C91.6153 23.3172 91.1844 22.8532 90.8828 22.2599C90.5845 21.6667 90.4354 20.9839 90.4354 20.2116C90.4354 19.4295 90.5862 18.7434 90.8878 18.1534C91.1927 17.5601 91.6252 17.0978 92.1854 16.7663C92.7455 16.4316 93.4117 16.2642 94.1839 16.2642C94.8501 16.2642 95.4335 16.3852 95.9339 16.6271C96.4344 16.8691 96.8305 17.2088 97.1222 17.6463C97.4138 18.0838 97.5746 18.5975 97.6044 19.1875H95.6058C95.5495 18.8063 95.4003 18.4998 95.1584 18.2678C94.9197 18.0324 94.6065 17.9148 94.2188 17.9148C93.8906 17.9148 93.6039 18.0043 93.3587 18.1832C93.1167 18.3589 92.9278 18.6158 92.7919 18.9538C92.656 19.2919 92.5881 19.7012 92.5881 20.1818C92.5881 20.669 92.6544 21.0833 92.7869 21.4247C92.9228 21.7661 93.1134 22.0263 93.3587 22.2053C93.6039 22.3842 93.8906 22.4737 94.2188 22.4737C94.4607 22.4737 94.6778 22.424 94.87 22.3246C95.0656 22.2251 95.2263 22.081 95.3523 21.892C95.4815 21.6998 95.5661 21.4695 95.6058 21.201H97.6044C97.5713 21.7843 97.4122 22.2981 97.1271 22.7422C96.8454 23.183 96.456 23.5277 95.9588 23.7763C95.4616 24.0249 94.8733 24.1491 94.1939 24.1491ZM103.022 16.3636V17.9545H98.4235V16.3636H103.022ZM99.4675 14.5341H101.585V21.6534C101.585 21.849 101.615 22.0014 101.675 22.1108C101.735 22.2169 101.817 22.2914 101.923 22.3345C102.033 22.3776 102.159 22.3991 102.301 22.3991C102.401 22.3991 102.5 22.3909 102.6 22.3743C102.699 22.3544 102.775 22.3395 102.828 22.3295L103.161 23.9055C103.055 23.9387 102.906 23.9768 102.714 24.0199C102.522 24.0663 102.288 24.0945 102.013 24.1044C101.503 24.1243 101.055 24.0563 100.671 23.9006C100.289 23.7448 99.9928 23.5028 99.7807 23.1747C99.5686 22.8466 99.4642 22.4323 99.4675 21.9318V14.5341Z"
                  fill="url(#paint1_linear_11003_43804)"
                />
                <rect x="0.5" y="0.5" width="123" height="36" rx="7.5" stroke="url(#paint2_linear_11003_43804)" />
                <defs>
                  <linearGradient
                    id="paint0_linear_11003_43804"
                    x1="20.2946"
                    y1="11.417"
                    x2="38.7754"
                    y2="13.1366"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#B809B5" />
                    <stop offset="0.510417" stopColor="#ED1C51" />
                    <stop offset="1" stopColor="#FFB000" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_11003_43804"
                    x1="40.3267"
                    y1="10"
                    x2="110.628"
                    y2="32.7033"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#B809B5" />
                    <stop offset="0.510417" stopColor="#ED1C51" />
                    <stop offset="1" stopColor="#FFB000" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_11003_43804"
                    x1="-9.82178"
                    y1="1.09177e-08"
                    x2="138.879"
                    y2="46.3718"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#B809B5" />
                    <stop offset="0.510417" stopColor="#ED1C51" />
                    <stop offset="1" stopColor="#FFB000" />
                  </linearGradient>
                </defs>
              </svg>
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
