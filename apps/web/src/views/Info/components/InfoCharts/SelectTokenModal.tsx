import { Button, CloseIcon, Flex, Image, Input } from '@pancakeswap/uikit'
import ImportToken from 'components/SearchModal/ImportToken'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { CurrencyLogo } from 'components/Logo'
import { SUGGESTED_BASES } from 'config/constants/exchange'
import { Token } from '@pancakeswap/sdk'

const ModalWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
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

    & h2 {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.87);
      text-align: center;
      margin-top: 16px;
    }

    & .input-token {
      position: relative;
      margin-bottom: 16px;
      margin-top: 16px;
    }

    & input {
      width: 100%;
      height: 54px;
      background: #303030;
      border-radius: 8px;
      padding-left: 52px;
      outline: none;
      box-shadow: none !important;
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

const SelectCoinModal = ({ isOpen, setOpen, selectedCurrency, setSelectedCurrency, native, chainId }, ref) => {
  const [importToken, setImportToken] = useState()
  const [searchToken, setSearchToken] = useState('')
  const [listToken, setListToken] = useState([])
  const [isImportTokenModalOpen, setImportTokenModalOpen] = useState(false)

  const modalElement = document.getElementById('portal-root')

  useImperativeHandle(
    ref,
    () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }),
    [close],
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
      return s?.symbol?.toLowerCase()?.includes(searchToken.toLowerCase())
    })

    setListToken(tokens)
  }, [searchToken])

  useEffect(()=> {
    setImportTokenModalOpen(false)
  }, [isOpen])

  return createPortal(
    isOpen ? (
      <ModalWrapper>
        {isImportTokenModalOpen ? (
          <div>
            <div
              className="close-btn"
              onClick={() => {
                setOpen(false)
              }}
            >
              <CloseIcon />
            </div>
            <div
              className="back-btn"
              onClick={() => {
                setImportTokenModalOpen(false)
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path
                  d="M6.09619 11.9961H18.0962"
                  stroke="#8E8E8E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.0962 18L6.09619 12L12.0962 6"
                  stroke="#8E8E8E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <h2>Import Token</h2>
            <Flex className="input-token">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M10.0833 17.4167C14.1334 17.4167 17.4167 14.1334 17.4167 10.0833C17.4167 6.03325 14.1334 2.75 10.0833 2.75C6.03325 2.75 2.75 6.03325 2.75 10.0833C2.75 14.1334 6.03325 17.4167 10.0833 17.4167Z"
                  stroke="#8E8E8E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.25 19.2502L15.2625 15.2627"
                  stroke="#8E8E8E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <Input placeholder="Search name or paste address" />
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
              <h3>Title</h3>
              <p>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
                enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
              </p>
            </div>
            <div className="token-info">
              <div>
                <h3>Via CoinGecko</h3>
                <span>NXD Next</span>
              </div>
            </div>
            <Button width="100%" height="43px" onClick={handleImportTokenBtnClicked}>
              Import
            </Button>
          </div>
        ) : (
          <div>
            <div
              className="close-btn"
              onClick={() => {
                setOpen(false)
                console.log(isOpen)
              }}
            >
              <CloseIcon />
            </div>

            <h2>Select Token</h2>
            <Flex className="input-token">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M10.0833 17.4167C14.1334 17.4167 17.4167 14.1334 17.4167 10.0833C17.4167 6.03325 14.1334 2.75 10.0833 2.75C6.03325 2.75 2.75 6.03325 2.75 10.0833C2.75 14.1334 6.03325 17.4167 10.0833 17.4167Z"
                  stroke="#8E8E8E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.25 19.2502L15.2625 15.2627"
                  stroke="#8E8E8E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <Input
                placeholder="Search name or paste address"
                value={searchToken}
                onChange={(e) => setSearchToken(e.target.value)}
              />
            </Flex>
            <Flex flexDirection="column" className="token-list">
              {(native.symbol.toLowerCase().includes(searchToken.toLowerCase()) ||
                native.name.toLowerCase().includes(searchToken.toLowerCase())) && (
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

export default forwardRef(SelectCoinModal)
