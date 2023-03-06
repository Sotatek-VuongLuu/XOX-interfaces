import { Button, CloseIcon, Flex, Image, Input, LinkExternal, TrustWalletIcon } from '@pancakeswap/uikit'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { CurrencyLogo } from 'components/Logo'
import { SUGGESTED_BASES } from 'config/constants/exchange'
import axios from 'axios'
import { Token } from '@pancakeswap/sdk'
import { isAddress } from '@ethersproject/address'

const ModalWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1000;

  & > div {
    width: 448px;
    background: #242424;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    padding: 32px 27px;
    position: relative;

    & > .close-btn {
      position: absolute;
      top: 17px;
      right: 17px;
      cursor: pointer;
    }

    & > .back-btn {
      position: absolute;
      top: 17px;
      left: 17px;
      cursor: pointer;
    }

    & h2 {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.87);
      text-align: center;
    }

    & .input-token {
      position: relative;
    }

    & .input-import-token input {
      padding-left: 16px;
    }

    .warn {
      padding: 16px;
      width: 100%;
      background: rgba(255, 200, 92, 0.1);
      border-radius: 8px;
      display: flex;
      flex-direction: row;
      margin-bottom: 16px;

      svg {
        min-width: 20.17px;
      }

      div {
        margin-left: 13px;
        display: flex;
        flex-direction: column;
      }

      div p {
        margin-bottom: 4px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #ffbd3c;
      }

      h3 {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        color: #ffbd3c;
      }
    }

    .token-info {
      display: flex;
      flex-direction: column;

      div {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 16px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: rgba(255, 255, 255, 0.87);
      }

      div:first-child img {
        margin-right: 8px;
      }

      div:first-child {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        color: #9072ff;
      }

      div:last-child {
        justify-content: space-between;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: rgba(255, 255, 255, 0.87);
      }

      div:last-child a {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #9072ff;
      }
    }

    .btns {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      div {
        display: flex;
        flex-direction: row;
      }

      div input {
        margin: 0 8px 0 0;
        height: 18px;
      }

      div label {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: rgba(255, 255, 255, 0.87);
        white-space: nowrap;
      }

      button {
        width: 113px;
      }

      button:disabled {
        background: rgba(255, 255, 255, 0.05);
        color: rgba(255, 255, 255, 0.38);
      }
    }

    & input {
      width: 100%;
      height: 54px;
      background: #303030;
      border-radius: 8px;
      padding-left: 52px;
      outline: none;
      box-shadow: none !important;
      margin-bottom: 16px;
      margin-top: 16px;
    }

    & .input-token svg {
      position: absolute;
      transform: translateY(-50%);
      left: 16px;
      top: 50%;
    }

    & .token-list {
      overflow: auto;
      height: 310px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.87);

      & > div {
        height: 62px;
        border-radius: 8px;
        padding: 16px;
      }

      & > div:hover,
      & > div.active {
        background: #9072ff;
      }

      & span {
        margin-left: 8px;
      }
    }
  }
`

const BaseWrapper = styled.div<{ disable?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`

const SelectTokenModal = (
  { isOpen, setOpen, selectedCurrency, setSelectedCurrency, native, chainId, setCoinGeckoId },
  ref,
) => {
  const [importToken, setImportToken] = useState()
  const [searchAdress, setSearchAdress] = useState('')
  const [listToken, setListToken] = useState([])
  const [isImportTokenModalOpen, setImportTokenModalOpen] = useState(true)
  const [understand, setUnderstand] = useState(false)
  const [tokenInfo, setTokenInfo] = useState<any>()

  const modalElement = document.getElementById('portal-root')

  useImperativeHandle(
    ref,
    () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }),
    [],
  )

  const handleSearchToken = useCallback(
    (e) => {
      setSearchAdress(e.target.value)

      if (!isAddress(e.target.value)) return

      axios
        .get(`${process.env.NEXT_PUBLIC_API}/tokens/${chainId}/${e.target.value}`)
        .then((result) => {
          setTokenInfo(result.data)
          setCoinGeckoId(result.data.coingekcoId)
        })
        .catch((error) => {
          console.warn(error)
        })
    },
    [chainId],
  )

  const handleEscape = useCallback((event) => {
    if (event.keyCode === 27) setOpen(false)
  }, [])

  const handleImportTokenBtnClicked = useCallback(() => {
    setImportTokenModalOpen(true)
  }, [])

  useEffect(() => {
    document.addEventListener('keyDown', handleEscape, false)
    return () => {
      document.addEventListener('keyDown', handleEscape, false)
    }
  }, [])

  useEffect(() => {
    const tokens = SUGGESTED_BASES[chainId].filter((s: any) => {
      // return s.symbol.toLowerCase().includes(searchToken.toLowerCase()) || s.name.toLowerCase().includes(searchToken.toLowerCase())
      return (
        s?.symbol?.toLowerCase()?.includes(searchAdress.toLowerCase()) ||
        s?.address?.toLowerCase()?.includes(searchAdress.toLowerCase())
      )
    })

    setListToken(tokens)
  }, [searchAdress])

  useEffect(() => {
    setImportTokenModalOpen(true)
  }, [isOpen])

  return createPortal(
    isOpen ? (
      <ModalWrapper>
        {isImportTokenModalOpen ? (
          <div>
            <button
              className="close-btn"
              onClick={() => {
                setOpen(false)
              }}
              type="button"
            >
              <CloseIcon />
            </button>
            <button
              className="back-btn"
              onClick={() => {
                setImportTokenModalOpen(false)
              }}
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path
                  d="M6.09619 11.9961H18.0962"
                  stroke="#8E8E8E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.0962 18L6.09619 12L12.0962 6"
                  stroke="#8E8E8E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <h2>Import Token</h2>
            <Flex className="input-import-token">
              <Input placeholder="Search name or paste address" value={searchAdress} onChange={handleSearchToken} />
            </Flex>
            <div className="warn">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
                <path
                  d="M11.0001 3.94949L17.9026 15.8753H4.09758L11.0001 3.94949ZM11.0001 0.291992L0.916748 17.7087H21.0834L11.0001 0.291992Z"
                  fill="#FFBD3C"
                />
                <path d="M11.9167 13.1253H10.0834V14.9587H11.9167V13.1253Z" fill="#FFBD3C" />
                <path d="M11.9167 7.62533H10.0834V12.2087H11.9167V7.62533Z" fill="#FFBD3C" />
              </svg>
              <div>
                <h3>Title</h3>
                <p>
                  Anyone can create a BEP20 token on BNB Smart Chain with any name, including creating fake versions of
                  existing tokens and tokens that claim to represent projects that do not have a token.
                  <br />
                  <br />
                  If you purchase an arbitrary token, you may be unable to sell it back.
                </p>
              </div>
            </div>
            {tokenInfo && (
              <div className="token-info">
                <div>
                  <img src="/images/coinmaketcap.png" alt="" />
                  <h3>Via CoinGecko</h3>
                </div>
                <div>
                  <span>{tokenInfo.symbol?.toUpperCase()}</span>
                </div>
                <div>
                  <span>
                    {tokenInfo.address
                      ? `${tokenInfo.address.substring(0, 4)}...${tokenInfo.address.substring(
                          tokenInfo.address.length - 4,
                        )}`
                      : null}
                  </span>
                  <LinkExternal
                    href={
                      chainId === 1
                        ? `https://etherscan.io/address/${tokenInfo.address}`
                        : chainId === 56
                        ? `https://bscscan.com/address/${tokenInfo.address}`
                        : '#'
                    }
                    color="#9072FF"
                  >
                    View on {chainId === 1 ? 'EtherScan' : chainId === 56 ? 'BscScan' : null}
                  </LinkExternal>
                </div>
              </div>
            )}
            <div className="btns">
              <div>
                <input
                  id="understand"
                  type="checkbox"
                  checked={understand}
                  onChange={() => setUnderstand(!understand)}
                />
                {/* // eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                {/* <label htmlFor="understand">I understand</label> */}
              </div>
              <Button width="100%" height="43px" disabled={!understand} onClick={handleImportTokenBtnClicked}>
                Import
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <button
              className="close-btn"
              onClick={() => {
                setOpen(false)
              }}
              type="button"
            >
              <CloseIcon />
            </button>

            <h2>Select Token</h2>
            <Flex className="input-token">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M10.0833 17.4167C14.1334 17.4167 17.4167 14.1334 17.4167 10.0833C17.4167 6.03325 14.1334 2.75 10.0833 2.75C6.03325 2.75 2.75 6.03325 2.75 10.0833C2.75 14.1334 6.03325 17.4167 10.0833 17.4167Z"
                  stroke="#8E8E8E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.25 19.2502L15.2625 15.2627"
                  stroke="#8E8E8E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Input
                placeholder="Search name or paste address"
                value={searchAdress}
                onChange={(e) => setSearchAdress(e.target.value)}
              />
            </Flex>
            <Flex flexDirection="column" className="token-list">
              {(native.symbol.toLowerCase().includes(searchAdress.toLowerCase()) ||
                native.name.toLowerCase().includes(searchAdress.toLowerCase())) && (
                <BaseWrapper
                  onClick={() => {
                    if (!selectedCurrency || !selectedCurrency.isNative) {
                      setSelectedCurrency(native)
                      setOpen(false)
                    }
                  }}
                  disable={selectedCurrency?.isNative}
                  className={native.symbol === selectedCurrency.symbol ? 'active' : 'inactive'}
                >
                  <CurrencyLogo currency={native} size="30px" />
                  <span>{native?.symbol}</span>
                </BaseWrapper>
              )}
              {listToken.map((token: Token) => {
                const selected = selectedCurrency?.equals(token)
                return (
                  <BaseWrapper
                    key={token.symbol}
                    onClick={() => {
                      if (!selected) {
                        setSelectedCurrency(token)
                        setOpen(false)
                      }
                    }}
                    disable={selected}
                    className={token.symbol === selectedCurrency.symbol ? 'active' : 'inactive'}
                  >
                    <CurrencyLogo currency={token} size="30px" />
                    <span>{token?.symbol}</span>
                  </BaseWrapper>
                )
              })}
            </Flex>
            <Button width="100%" height="43px" marginTop="16px" onClick={handleImportTokenBtnClicked}>
              Import
            </Button>
          </div>
        )}
      </ModalWrapper>
    ) : null,
    modalElement,
  )
}

export default forwardRef(SelectTokenModal)
