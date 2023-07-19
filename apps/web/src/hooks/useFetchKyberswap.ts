import { parseEther, parseUnits } from '@ethersproject/units'
import { ChainId, Currency, CurrencyAmount, Token } from '@pancakeswap/sdk'
import { GELATO_NATIVE } from 'config/constants'
import { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { TSwapRoute, buildRoutes } from 'utils/swapHelpers'
import { KYBERSWAP_NETWORK_CHAIN } from 'views/BridgeToken/networks'
import axios from 'axios'

type Props = {
  chainId: ChainId
  currencyIn: Currency
  currencyOut: Currency
  tokenIn: Token
  tokenOut: Token
  tokenInAmount: string
  saveGas: boolean
}

type Summary = {
  tokenIn: string
  amountIn: string
  amountInUsd: string
  tokenInMarketPriceAvailable: string
  tokenOut: string
  amountOut: string
  amountOutUsd: string
  tokenOutMarketPriceAvailable: string
  gas: string
  gasPrice: string
  gasUsd: string
  extraFee: {
    string
    feeAmount: string
    chargeFeeBy: string
    isInBps: string
    feeReceiver: string
  }
}

const useFetchKyberswap = ({ chainId, currencyIn, currencyOut, tokenIn, tokenOut, tokenInAmount, saveGas }: Props) => {
  const [swapRoute, setSwapRoute] = useState<TSwapRoute[][]>([])
  const [summary, setSummary] = useState<Summary>()
  const [routerAddress, setRouterAddress] = useState<string>()
  const [fullRoute, setFullRoute] = useState<any>({})
  const [amountIn, setAmountIn] = useState('')
  const [amountOut, setAmountOut] = useState('')

  const needFetch = useMemo(() => {
    try {
      return !tokenInAmount || (currencyIn && currencyOut && !parseUnits(tokenInAmount, currencyIn?.decimals).isZero())
    } catch (error) {
      return false
    }
  }, [currencyIn, currencyOut, tokenInAmount, tokenOut])

  useEffect(() => {
    if (!needFetch || !(currencyIn && currencyOut)) return

    try {
      const url = `https://aggregator-api.kyberswap.com/${KYBERSWAP_NETWORK_CHAIN[chainId]}/api/v1/routes?tokenIn=${
        currencyIn.isNative ? GELATO_NATIVE : tokenIn.address
      }&tokenOut=${currencyOut.isNative ? GELATO_NATIVE : tokenOut.address}&amountIn=${parseUnits(
        tokenInAmount || '1',
        currencyIn?.decimals,
      ).toString()}&saveGas=${saveGas}&gasInclude=true`

      axios
        .get(url, {
          headers: { 'x-client-id': 'xoxlabs' },
        })
        .then((response) => {
          const data = response.data.data
          const routeSummary = data['routeSummary']
          const routerAddress = data['routerAddress']
          const route = routeSummary['route']

          if (tokenInAmount) {
            setFullRoute({ ...data })
            setSwapRoute(buildRoutes(route))
            // delete routeSummary['route']
            setSummary(routeSummary)
            setRouterAddress(routerAddress)
            setAmountIn(routeSummary.amountIn)
            setAmountOut(routeSummary.amountOut)
          } else {
            setAmountIn(routeSummary.amountIn)
            setAmountOut(routeSummary.amountOut)
          }
          return
        })
        .catch(() => {
          setSwapRoute([])
          setSummary(undefined)
          setRouterAddress(undefined)
        })
    } catch (error) {
      console.log(error)
    }
  }, [currencyIn, currencyOut, tokenInAmount, tokenOut])

  useEffect(() => {
    try {
      if (!currencyIn || !tokenInAmount || parseUnits(tokenInAmount, currencyIn?.decimals).isZero()) {
        setSwapRoute([])
        setSummary(undefined)
        setRouterAddress(undefined)
      }
    } catch {
      setSwapRoute([])
      setSummary(undefined)
      setRouterAddress(undefined)
    }
  }, [currencyIn, tokenInAmount])

  return {
    swapRoute,
    summary,
    routerAddress,
    fullRoute,
    amountIn,
    amountOut,
    setAmountIn,
    setAmountOut,
  }
}

export default useFetchKyberswap
