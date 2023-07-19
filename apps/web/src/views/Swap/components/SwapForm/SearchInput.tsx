import { useDebounce } from '@pancakeswap/hooks'
import { Token } from '@pancakeswap/sdk'
import { useActiveChainId } from 'hooks/useActiveChainId'
import _ from 'lodash'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import { SearchInputWrapper as Wrapper } from './styles'

type Props = {
  tokenIn: Token
  tokenOut: Token
  setTokenInImgURL: (url: string) => void
  setTokenOutImgURL: (url: string) => void
  setTokenIn: (tokenIn: Token) => void
  setTokenOut: (tokenOut: Token) => void
  setInputAmountIn: (amount: string) => void
}

type Pair = {
  tokenIn: {
    token: Token
    imgUrl: string
  }
  tokenOut: {
    token: Token
    imgUrl: string
  }
}

const SearchInput = ({
  tokenIn: selectedTokenIn,
  tokenOut: selectedTokenOut,
  setTokenIn,
  setTokenOut,
  setTokenInImgURL,
  setTokenOutImgURL,
  setInputAmountIn,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setOpen] = useState(false)
  const [pairs, setPairs] = useState<Pair[]>([])
  const [amount, setAmount] = useState('')
  const { chainId } = useActiveChainId()
  const { isMobile } = useMatchBreakpoints()
  const inputRef = useRef<HTMLInputElement>()
  const debounceSearchTerm = useDebounce(searchTerm, 400)

  const res = useSWR(
    `https://type-swap.kyberswap.com/api/v1/suggested-pairs?chainId=${chainId}&query=${debounceSearchTerm}`,
    (url) =>
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          if (response.code === 0) {
            const recommendedPairs = response.data.recommendedPairs

            const pairs = recommendedPairs.map((pair: any) => {
              const {
                tokenIn: tokenInAddress,
                tokenInSymbol,
                tokenInName,
                tokenInImgUrl,
                tokenOut: tokenOutAddress,
                tokenOutSymbol,
                tokenOutName,
                tokenOutImgUrl,
              } = pair

              const tokenIn = new Token(chainId, tokenInAddress, 18, tokenInSymbol, tokenInName)
              const tokenOut = new Token(chainId, tokenOutAddress, 18, tokenOutSymbol, tokenOutName)
              setAmount(response.data.amount)

              return {
                tokenIn: {
                  token: tokenIn,
                  imgUrl: tokenInImgUrl,
                },
                tokenOut: {
                  token: tokenOut,
                  imgUrl: tokenOutImgUrl,
                },
              }
            })
            setPairs(pairs)
          }
        }),
  )

  const handleOnChangeSearchTerm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleOnClickedPair = useCallback(
    (pair: Pair) => {
      const { tokenIn, tokenOut } = pair
      if (
        tokenIn.token?.address === selectedTokenIn?.address &&
        tokenOut.token?.address === selectedTokenOut?.address
      ) {
        return
      }

      setTokenIn(tokenIn.token)
      setTokenInImgURL(tokenIn.imgUrl)
      setTokenOut(tokenOut.token)
      setTokenOutImgURL(tokenOut.imgUrl)
      setInputAmountIn(amount)
      setOpen(false)
    },
    [selectedTokenIn, selectedTokenOut],
  )

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && (event.key === 'k' || event.code === 'KeyK')) {
        event.preventDefault()
        if (inputRef.current) {
          inputRef.current.focus()
        }
        setOpen(true)
      }
    })
  }, [])

  const handleKeyDown = (event) => {
    if (event?.key === 'Escape' || event?.code === 'Escape') {
      if (inputRef.current) {
        inputRef.current.blur()
      }
      setOpen(false)
    }
  }

  return (
    <Wrapper>
      <div
        className="blur"
        style={{ display: isOpen ? 'block' : 'none' }}
        role="button"
        onClick={() => setOpen(false)}
      />
      <div className="input-group">
        <input
          ref={inputRef}
          value={searchTerm}
          onFocus={() => setOpen(true)}
          onChange={handleOnChangeSearchTerm}
          placeholder="Try typing “10 ETH to KNC”"
          onKeyDown={handleKeyDown}
        />

        <svg
          className="search-icon"
          width={22}
          height={22}
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="fi:search">
            <path
              id="Vector"
              d="M10.0833 17.4167C14.1334 17.4167 17.4167 14.1334 17.4167 10.0833C17.4167 6.03325 14.1334 2.75 10.0833 2.75C6.03325 2.75 2.75 6.03325 2.75 10.0833C2.75 14.1334 6.03325 17.4167 10.0833 17.4167Z"
              stroke="#515151"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_2"
              d="M19.2502 19.25L15.2627 15.2625"
              stroke="#515151"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
        {!isMobile && (
          <button onClick={() => setOpen(!isOpen)}>
            {isOpen ? (
              'Esc'
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                </svg>{' '}
                K
              </>
            )}
          </button>
        )}
      </div>

      <ul className={`dropdown-items ${isOpen && 'active'}`}>
        {pairs.map(({ tokenIn, tokenOut }) => {
          return (
            <li
              className={`dropdown-item ${
                tokenIn.token.address === selectedTokenIn?.address &&
                tokenOut.token.address === selectedTokenOut?.address &&
                'active'
              }`}
              role="button"
              onClick={() => handleOnClickedPair({ tokenIn, tokenOut })}
              key={`${tokenIn.token.address}-${tokenOut.token.address}`}
            >
              <div>
                <img src={tokenIn.imgUrl} alt="" />
                <img src={tokenOut.imgUrl} alt="" />
              </div>
              <div className="pair-information">
                <p>
                  {amount && `${amount} `}
                  {tokenIn.token.symbol} - {tokenOut.token.symbol}
                </p>
                <p>
                  {tokenIn.token.name} - {tokenOut.token.name}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </Wrapper>
  )
}

export default SearchInput
