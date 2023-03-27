import { ChainId, Currency, Token } from '@pancakeswap/sdk'
import { BinanceIcon } from '@pancakeswap/uikit'
import { useEffect, useMemo, useState } from 'react'
import { WrappedTokenInfo } from '@pancakeswap/token-lists'
import styled from 'styled-components'
import { useHttpLocations } from '@pancakeswap/hooks'
import getTokenLogoURL from '../../utils/getTokenLogoURL'
import Logo from './Logo'
import axios from 'axios'

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)
  const [coinmarketcapId, setCoinmarketcapId] = useState<string>('')

  useEffect(() => {
    if (currency?.isNative) return
    const token = currency as Token
    let coinmarketcapIds = {}
    const coinmarketcapIdsJSON = localStorage.getItem('coinmarketcapIds')
    if (coinmarketcapIdsJSON) {
      coinmarketcapIds = JSON.parse(coinmarketcapIdsJSON)
      const id = coinmarketcapIds?.[token.chainId]?.[token.address.toUpperCase()]
      if (id) {
        setCoinmarketcapId(id)
        return
      }
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_API}/coin-market-cap/pro/coins/info`, {
        params: { address: token.address },
      })
      .then((response) => {
        const tokenInfos = response.data.data
        const tokenInfo = Object.values(tokenInfos)[0] as any
        coinmarketcapIds[token.chainId][token.address.toUpperCase()] = tokenInfo.id
        setCoinmarketcapId(tokenInfo.id)
        localStorage.setItem('coinmarketcapIds', JSON.stringify(coinmarketcapIds))
      })
      .catch((e) => console.warn(e, 'tokenInfo'))
  }, [currency])

  const srcs: string[] = useMemo(() => {
    if (currency?.isNative) return []

    if (currency?.isToken) {
      const tokenLogoURL = getTokenLogoURL(currency, coinmarketcapId)
      if (currency instanceof WrappedTokenInfo) {
        if (!tokenLogoURL) return [...uriLocations]
        return [tokenLogoURL, ...uriLocations]
      }
      if (!tokenLogoURL) return []
      return [tokenLogoURL]
    }
    return []
  }, [currency, uriLocations, coinmarketcapId])

  if (currency?.isNative) {
    if (currency.chainId === ChainId.BSC) {
      return <BinanceIcon width={size} style={style} />
    }
    return <StyledLogo size={size} srcs={[`/images/chains/${currency.chainId}.svg`]} width={size} style={style} />
  }
  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
