/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-cycle */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useCallback, useEffect, useMemo } from 'react'
import { Flex, useMatchBreakpoints, useModal } from '@pancakeswap/uikit'
import Page from '../Page'
import { useTranslation } from '@pancakeswap/localization'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { StyledInputCurrencyWrapper, StyledSwapContainer, StyledHeader, StyledHeading1 } from './styles'
import AmountInput from './AmountInput'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useAccount, useConnect } from 'wagmi'
import { ChainId } from '@pancakeswap/sdk'
import AddressInput from './AddressInput'
import { getAddress } from '@ethersproject/address'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import tryParseAmount from '@pancakeswap/utils/tryParseAmount'
import { XOX_ADDRESS } from 'config/constants/exchange'
import { XOX } from '@pancakeswap/tokens'
import styled from 'styled-components'
import { formatEther, parseEther, parseUnits } from '@ethersproject/units'
import { getBridgeTokenAddress } from 'utils/addressHelpers'
import { useBridgeTokenContract, useXOXTokenContractPoolBridge } from '../../hooks/useContract'
import ModalBase from '../Referral/components/Modal/ModalBase'
import Reminder from './Reminder'
// eslint-disable-next-line import/no-cycle
import ModalTransactionHistory from './ModalTransactionHistory'
import { WalletModalV2 } from '@pancakeswap/ui-wallets'
import { createWallets, getDocLink } from 'config/wallet'
import { useActiveHandle } from 'hooks/useEagerConnect.bmp'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import useAuth from 'hooks/useAuth'
import { CONTRACT_BRIDGE_POOL, NETWORK_LABEL, NETWORK_LINK } from './networks'
import { GridLoader } from 'react-spinners'
import truncateHash from '@pancakeswap/utils/truncateHash'
import LiquidityBackgroundDesktop from 'components/Svg/LiquidityBackgroundDesktop'
import LiquidityBackgroundBorderDesktop from 'components/Svg/LiquidityBackgroundBorderDesktop'
import LiquidityBackgroundMobile from 'components/Svg/LiquidityBackgroundMobile'
import LiquidityBackgroundBorderMobile from 'components/Svg/LiquidityBackgroundBorderMobile'

const SwapButton = styled.button`
  background: ${({ disabled }) =>
    disabled ? 'rgba(255, 255, 255, 0.05) ' : 'linear-gradient(100.7deg, #6473FF 0%, #A35AFF 100%)'};
  color: ${({ theme, disabled }) => (disabled ? 'rgba(255, 255, 255, 0.38)' : theme.colors.white)};
  width: 100%;
  border-radius: 8px;
  padding: 17px 20px;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 24px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  > span {
    margin-right: 8px;
  }
  @media (max-width: 576px) {
    padding: 12px 20px;
    font-size: 16px;
  }
`

const WapperBg = styled.div`
  position: relative;
  .mobile {
    display: none;
  }
  @media (max-width: 576px) {
    .desktop {
      display: none;
    }
    .mobile {
      display: block;
    }
  }
`

const Divider = styled.div`
  padding: 0 12px;
  margin: 5px 0;
  text-align: center;

  @media screen and (min-width: 576px) {
    padding: 0 25px;
    margin: 10px 0;
  }
`

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`

const WapperConnectBtn = styled(Button)`
  width: 100%;
  margin-top: 20px;
  height: 54px;
  font-size: 18px;
  font-weight: 700;
  border-radius: 8px;
  background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
  color: white;
`

const Content = styled.div`
  .discription {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
    text-align: center;
    padding: 24px 0px;

    span {
      font-weight: 700;
    }
  }

  .btn-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    button {
      border: none;
      border-radius: 6px;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      padding: 12px;
      cursor: pointer;
    }
    & > .cancel {
      background: #313131;
    }
    & > .confirm {
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
    }
  }

  .noti {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
    text-align: center;
    margin-top: 8px;
    margin-bottom: 24px;
    span {
      color: #9072ff;
      font-weight: 700;
    }
  }
  .noti_claim_success {
    display: flex;
    justify-content: center;
    margin-top: 24px;
  }

  .x-close-icon {
    position: absolute;
    top: 11px;
    right: 11px;
    cursor: pointer;
  }

  .xox_loading {
    display: flex;
    justify-content: center;
  }

  .reject_xox {
    display: flex;
    justify-content: center;
    margin: 24px 0;
  }
  .noti_claim_pending_h1 {
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
  }

  .noti_claim_pending_h3 {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
    margin: 16px 0px;
  }
  .noti_claim_pending_h2 {
    text-align: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.6);
  }

  .btn_dismiss_container {
    display: flex;
    justify-content: center;
    margin-top: 24px;
    .btn_dismiss {
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
      border-radius: 6px;
      padding: 12px 30px;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      border: none;
      cursor: pointer;
    }
  }

  .submitted {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    margin-top: 24px;
    margin-bottom: 8px;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
  }
  .view_on {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #3d8aff;
    margin-bottom: 24px;
  }

  .btn_close {
    text-align: center;
    width: 100%;
    padding: 12px 0px;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    background: #313131;
    border-radius: 6px;
    cursor: pointer;
  }
`

const SwapBackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: 100%;
`

const BackgroundWrapper = styled.div`
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: calc(100% - 200px);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: #242424;
`

const Wrapper = styled(Flex)`
  width: 100%;
  height: fit-content;
  z-index: 0;
  align-items: center;
  justify-content: center;
`

export const getChainIdToByChainId = (chainId: any) => {
  switch (chainId) {
    case ChainId.GOERLI:
      return ChainId.BSC_TESTNET
    case ChainId.BSC_TESTNET:
      return ChainId.GOERLI
    case ChainId.ETHEREUM:
      return ChainId.BSC
    case ChainId.BSC:
      return ChainId.ETHEREUM
    default:
      return chainId
  }
}

export const linkTransaction = (chainId) => {
  return `${NETWORK_LINK[chainId]}/tx/`
}

export default function BridgeToken() {
  const { chainId } = useActiveChainId()
  const { switchNetworkAsync } = useSwitchNetwork()
  const [amountInput, setAmountInput] = useState('')
  const [defaultToken, setDefaultToken] = useState(XOX_ADDRESS[chainId])
  const [isShowDropFrom, setIsShowDropFrom] = useState(false)
  const [isShowDropTo, setIsShowDropTo] = useState(false)
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false)
  const [minAmount, setMinAmount] = useState<number>(0)
  const [_, setMaxAmount] = useState<number>(0)
  const [messageAddress, setMessageAddress] = useState('')
  const {
    t,
    currentLanguage: { code },
  } = useTranslation()
  const [addressTokenInput, setAddressTokenInput] = useState(XOX[chainId])
  const [amountTo, setAmountTo] = useState<string>('')
  const [tokenB, setTokenB] = useState(XOX[getChainIdToByChainId(chainId)])
  const bridgeTokenContract = useBridgeTokenContract(chainId)
  const { address: account } = useAccount()
  const contractXOX = useXOXTokenContractPoolBridge(false, getChainIdToByChainId(chainId))
  const balanceInput = useCurrencyBalance(account ?? undefined, XOX[chainId])
  const [balancePool, setBalancePool] = useState('')
  const [chainIdSupport, setChainIdSupport] = useState(chainId)
  const [addressTo, setAddressTo] = useState(account)
  const [messageButton, setMessageButton] = useState('Enter an amount')
  const [messageTx, setMessageTx] = useState('')
  const [loading, setLoading] = useState(false)
  const [approvalState, approveCallback] = useApproveCallback(
    XOX_ADDRESS[chainId] && tryParseAmount(amountInput, XOX[chainId]),
    getBridgeTokenAddress(chainId),
  )
  const [modalReject, setModalReject] = useState<boolean>(false)
  const [isOpenLoadingClaimModal, setIsOpenLoadingClaimModal] = useState<boolean>(false)
  const [txHash, setTxHash] = useState('')
  const { isMobile } = useMatchBreakpoints()
  const handleGetBalancePool = async () => {
    try {
      setBalancePool('')
      const amountPool = await contractXOX.balanceOf(CONTRACT_BRIDGE_POOL[getChainIdToByChainId(chainId)])
      setBalancePool(formatEther(amountPool))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error>>>', error)
    }
  }

  useEffect(() => {
    setAddressTo(account)
    if (chainId) {
      setTokenB(XOX[getChainIdToByChainId(chainId)])
      setDefaultToken(XOX_ADDRESS[chainId])
      setChainIdSupport(chainId)
      setAddressTokenInput(XOX[chainId])
    }
  }, [account, chainId])

  useEffect(() => {
    if (amountInput === '' || Number(amountInput) === 0 || amountInput === '.') {
      setMessageButton('Enter an amount')
    } else if (
      account &&
      balanceInput &&
      // parseEther(amountInput).gt(parseEther(balanceInput?.toExact())) &&
      parseUnits(amountInput, addressTokenInput.decimals).gt(
        parseUnits(balanceInput?.toExact(), addressTokenInput.decimals),
      )
    ) {
      setMessageButton(`Insuficient Your ${addressTokenInput.symbol} Balance`)
    } else if (
      balancePool !== '-' &&
      balancePool &&
      amountTo &&
      parseEther(Number(amountTo).toFixed(18)).gt(parseEther(balancePool))
    ) {
      setMessageButton('Insuficient Pool Balance')
    } else if (approvalState === ApprovalState.UNKNOWN || approvalState === ApprovalState.NOT_APPROVED) {
      setMessageButton(`Approve ${addressTokenInput.symbol}`)
    } else if (approvalState === ApprovalState.PENDING) {
      setMessageButton('Approving')
    } else if (amountTo === '0') {
      setMessageButton('Input Amount Not Allowed')
    } else setMessageButton('Bridge')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountInput, approvalState, balanceInput, minAmount])

  // handle user type input
  const handleUserInput = (value) => {
    const decimalRegExp = new RegExp('^[+-]?([0-9]{0,20}([.][0-9]{0,18})?|[.][0-9]{0,18})$')
    if (!value || decimalRegExp.test(value) || amountInput.length > value.length) {
      setAmountInput(value)
    }
  }

  const handleShowDropFrom = () => {
    setIsShowDropFrom(!isShowDropFrom)
    setIsShowDropTo(false)
  }

  const handleShowDropTo = () => {
    setIsShowDropTo(!isShowDropTo)
    setIsShowDropFrom(false)
  }

  const isAddress = (value: any) => {
    try {
      return getAddress(value)
    } catch {
      return false
    }
  }

  const handleAddressTo = (value) => {
    setAddressTo(value)
    const validAdress = isAddress(value)
    if (!validAdress) {
      setMessageAddress('Please enter a valid address.')
    } else setMessageAddress('')
  }

  // handle approve STAND to contract
  const handleApprove = useCallback(async () => {
    await approveCallback()
  }, [approveCallback])

  const [onHistoryTransactionsModal] = useModal(<ModalTransactionHistory />)

  // handle click button Swap, approve or swap
  const handleSwapButtonClick = () => {
    if (approvalState === ApprovalState.NOT_APPROVED || approvalState === ApprovalState.UNKNOWN) {
      handleApprove()
      return
    }
    hanleConfirmSwap()
  }

  // handle switch network
  const switchNetwork = () => {
    if (account) {
      switchNetworkAsync(getChainIdToByChainId(chainId))
    }
    return null
  }

  // handle deposit STAND to contract
  const hanleConfirmSwap = async () => {
    setLoading(true)
    setIsOpenLoadingClaimModal(true)
    try {
      const params = [addressTo, parseUnits(amountInput, addressTokenInput.decimals)]
      const gasFee = await bridgeTokenContract.estimateGas.deposit(...params)
      const deposit = await bridgeTokenContract.deposit(...params, {
        gasLimit: gasFee,
      })
      const tx = await deposit.wait(1)
      setMessageTx(`Swap ${amountInput} ${addressTokenInput.symbol}`)
      if (tx?.transactionHash) {
        setIsOpenSuccessModal(true)
        setIsOpenLoadingClaimModal(false)
        setTxHash(tx?.transactionHash)
        setLoading(false)
        setAmountInput('')
      }
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      setIsOpenLoadingClaimModal(false)
      if (error && error?.code === 'ACTION_REJECTED') {
        setModalReject(true)
      }
      // nothing
    }
  }

  const handleActive = useActiveHandle()
  const { connectAsync } = useConnect()
  const [open, setOpen] = useState(false)
  const userProfile = useSelector<AppState, AppState['user']['userProfile']>((state) => state.user.userProfile)
  const { login } = useAuth()
  const docLink = useMemo(() => getDocLink(code), [code])

  const handleClick = () => {
    if (typeof __NEZHA_BRIDGE__ !== 'undefined') {
      handleActive()
    } else {
      setOpen(true)
    }
  }

  useEffect(() => {
    setMessageAddress('')
    if (account && !userProfile) {
      setOpen(false)
    }
  }, [account, userProfile])

  const wallets = useMemo(() => createWallets(chainId, connectAsync), [chainId, connectAsync])

  useEffect(() => {
    if (chainId && account) {
      handleGetBalancePool()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account])

  return (
    <Page>
      <Flex
        width={['328px', , '559px']}
        marginTop="40px"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <Wrapper flex="column" position="relative">
          {isMobile ? (
            <>
              <SwapBackgroundWrapper>
                <LiquidityBackgroundMobile />
              </SwapBackgroundWrapper>

              <SwapBackgroundWrapper>
                <LiquidityBackgroundBorderMobile />
              </SwapBackgroundWrapper>
            </>
          ) : (
            <>
              <SwapBackgroundWrapper>
                <LiquidityBackgroundDesktop />
              </SwapBackgroundWrapper>

              <SwapBackgroundWrapper>
                <LiquidityBackgroundBorderDesktop />
              </SwapBackgroundWrapper>
            </>
          )}
          <BackgroundWrapper />
          <StyledSwapContainer>
            <StyledInputCurrencyWrapper>
              <StyledHeader>
                <div>
                  <StyledHeading1>{t('Bridge')}</StyledHeading1>
                  <p>{t('Trade tokens in an instant')} </p>
                </div>
                <Button onClick={onHistoryTransactionsModal}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2.90918 3.36365V7H6.54556"
                      stroke="#8E8E8E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12C2 17.5229 6.47715 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2C8.299 2 5.06755 4.01056 3.33839 6.99905"
                      stroke="#8E8E8E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.0026 6L12.002 12.0044L16.2417 16.2441"
                      stroke="#8E8E8E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </StyledHeader>
              <AmountInput
                isTokenFrom
                inputChainId={chainIdSupport}
                balance={balanceInput ? balanceInput?.toExact() : '-'}
                amount={amountInput}
                handleUserInput={handleUserInput}
                handleBalanceMax={(balance) => setAmountInput(balance)}
                switchNetwork={switchNetwork}
                tokenSymbol={defaultToken?.symbol}
                isShowDrop={isShowDropFrom}
                handleShowDrop={handleShowDropFrom}
              />
              <Divider>
                <div>
                  <svg
                    width="31"
                    height="30"
                    viewBox="0 0 31 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={switchNetwork}
                    aria-hidden="true"
                    style={{ cursor: 'pointer' }}
                  >
                    <circle cx="15.5" cy="15" r="15" fill="#303030" />
                    <path
                      d="M15.5042 20.9498V9"
                      stroke="#8E8E8E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.5 15L15.5 21L9.5 15"
                      stroke="#8E8E8E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Divider>
              <AmountInput
                isTokenFrom={false}
                inputChainId={getChainIdToByChainId(chainIdSupport)}
                amount={amountTo}
                balance={balancePool}
                switchNetwork={switchNetwork}
                tokenSymbol={tokenB?.symbol}
                isShowDrop={isShowDropTo}
                handleShowDrop={handleShowDropTo}
              />
              {account && (
                <AddressInput address={addressTo} handleAddressTo={handleAddressTo} messageAddress={messageAddress} />
              )}
              {!account ? (
                <WapperConnectBtn onClick={handleClick}>Connect Wallet</WapperConnectBtn>
              ) : (
                <SwapButton
                  disabled={
                    (messageButton !== 'Bridge' && messageButton !== `Approve ${addressTokenInput.symbol}`) ||
                    messageAddress !== '' ||
                    amountTo === '' ||
                    loading
                  }
                  onClick={handleSwapButtonClick}
                >
                  <span>{messageButton}</span>
                  {approvalState === ApprovalState.PENDING}
                </SwapButton>
              )}
              <Reminder
                chainId={chainId}
                tokenInput={defaultToken}
                tokenOutput={tokenB}
                amount={amountInput}
                // eslint-disable-next-line @typescript-eslint/no-shadow
                onBridgeTokenFeeChange={(minAmount, maxAmount) => {
                  setMinAmount(Number(minAmount))
                  setMaxAmount(Number(maxAmount))
                }}
                setAmountTo={setAmountTo}
              />
            </StyledInputCurrencyWrapper>
          </StyledSwapContainer>
          <ModalBase open={isOpenSuccessModal} handleClose={() => setIsOpenSuccessModal(false)} title="Confirm Bridge">
            <Content>
              <div className="noti_claim_success">
                <img src="/images/success_claim.png" alt="success_claim" />
              </div>
              <div className="submitted">Transaction Submitted</div>
              <a href={`${linkTransaction(chainId)}${txHash}`} target="_blank" rel="noreferrer">
                <div className="view_on">View on {NETWORK_LABEL[chainId]}scan</div>
              </a>
              <div className="btn_close" onClick={() => setIsOpenSuccessModal(false)}>
                Close
              </div>
            </Content>
          </ModalBase>
          <WalletModalV2
            docText={t('Learn How to Connect')}
            docLink={docLink}
            isOpen={open}
            wallets={wallets}
            login={login}
            onDismiss={() => setOpen(false)}
          />
          <ModalBase open={modalReject} handleClose={() => setModalReject(false)} title="Bridge Confirm">
            <Content>
              <div className="noti_claim_pending_h1 xox_loading reject_xox" style={{ marginTop: '16px' }}>
                <img src="/images/reject_xox.png" alt="reject_xox" />
              </div>
              <div className="noti_claim_pending_h2">Transaction rejected.</div>
              <div className="btn_dismiss_container">
                <button className="btn_dismiss" type="button" onClick={() => setModalReject(false)}>
                  Dismiss
                </button>
              </div>
              <img
                src="/images/close-one.svg"
                alt="close-one"
                className="x-close-icon"
                aria-hidden="true"
                onClick={() => setModalReject(false)}
              />
            </Content>
          </ModalBase>
          <ModalBase
            open={isOpenLoadingClaimModal}
            handleClose={() => setIsOpenLoadingClaimModal(false)}
            title="Bridge Confirm"
          >
            <Content>
              <div className="xox_loading" style={{ margin: '24px 0px' }}>
                <GridLoader color="#9072FF" style={{ width: '51px', height: '51px' }} />
              </div>
              <div className="noti_claim_pending_h1">Waiting For Confirmation</div>
              <div className="noti_claim_pending_h3">
                Bridging {amountInput} XOX and {amountTo} XOX
              </div>
              <div className="noti_claim_pending_h2">Confirm this transaction in your wallet</div>
              <img
                src="/images/close-one.svg"
                alt="close-one"
                className="x-close-icon"
                aria-hidden="true"
                onClick={() => setIsOpenLoadingClaimModal(false)}
              />
            </Content>
          </ModalBase>
        </Wrapper>
      </Flex>
    </Page>
  )
}
