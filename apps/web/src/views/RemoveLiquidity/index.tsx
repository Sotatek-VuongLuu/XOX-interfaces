import { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { splitSignature } from '@ethersproject/bytes'
import { Contract } from '@ethersproject/contracts'
import { TransactionResponse } from '@ethersproject/providers'
import { useRouter } from 'next/router'
import { Currency, Percent, WNATIVE, ChainId } from '@pancakeswap/sdk'
import {
  Button,
  Text,
  AddIcon,
  ArrowDownIcon,
  CardBody,
  Slider,
  Box,
  Flex,
  useModal,
  Checkbox,
  TooltipText,
  useTooltip,
  useToast,
  useMatchBreakpoints,
} from '@pancakeswap/uikit'
import { useWeb3LibraryContext } from '@pancakeswap/wagmi'
import { BigNumber } from '@ethersproject/bignumber'
import { callWithEstimateGas } from 'utils/calls'
import { getLPSymbol } from 'utils/getLpSymbol'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { getZapAddress } from 'utils/addressHelpers'
import { ZapCheckbox } from 'components/CurrencyInputPanel/ZapCheckbox'
import { CommitButton } from 'components/CommitButton'
import { useTranslation } from '@pancakeswap/localization'
import { ROUTER_ADDRESS, ROUTER_XOX } from 'config/constants/exchange'
import { transactionErrorToUserReadableMessage } from 'utils/transactionErrorToUserReadableMessage'
import { useLPApr } from 'state/swap/useLPApr'
import SwapMainBackgroundDesktop from 'components/Svg/SwapMainBackgroundDesktop'
import SwapMainBackgroundMobile from 'components/Svg/SwapMainBackgroundMobile'
import LiquidityBackgroundMobile from 'components/Svg/LiquidityBackgroundMobile'
import LiquidityBackgroundBorderMobile from 'components/Svg/LiquidityBackgroundBorderMobile'
import LiquidityBackgroundDesktop from 'components/Svg/LiquidityBackgroundDesktop'
import LiquidityBackgroundBorderDesktop from 'components/Svg/LiquidityBackgroundBorderDesktop'

import { AutoColumn, ColumnCenter } from '../../components/Layout/Column'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { MinimalPositionCard } from '../../components/PositionCard'
import { AppHeader, AppBody } from '../../components/App'
import { RowBetween } from '../../components/Layout/Row'
import ConnectWalletButton from '../../components/ConnectWalletButton'
import { LightGreyCard } from '../../components/Card'
import { CurrencyLogo } from '../../components/Logo'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { usePairContract, useZapContract } from '../../hooks/useContract'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { calculateGasMargin } from '../../utils'
import { calculateSlippageAmount, useRouterContractXOX } from '../../utils/exchange'
import { currencyId } from '../../utils/currencyId'
import useDebouncedChangeHandler from '../../hooks/useDebouncedChangeHandler'
import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
import Dots from '../../components/Loader/Dots'
import { useBurnActionHandlers, useDerivedBurnInfo, useBurnState } from '../../state/burn/hooks'
import { Field } from '../../state/burn/actions'
import { useGasPrice, useUserSlippageTolerance, useZapModeManager } from '../../state/user/hooks'
import Page from '../Page'
import ConfirmLiquidityModal from '../Swap/components/ConfirmRemoveLiquidityModal'
import { logError } from '../../utils/sentry'
import { formatAmount } from '../../utils/formatInfoNumbers'
import { CommonBasesType } from '../../components/SearchModal/types'

const BorderCard = styled.div`
  border: solid 1px ${({ theme }) => theme.colors.cardBorder};
  border-radius: 16px;
  padding: 16px;
  background: #303030;
  border: none;
`

const AmountWrapper = styled(RowBetween)`
  div {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: rgba(255, 255, 255, 0.87);
  }

  button {
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
    color: #3d8aff;
    background: none !important;
    outline: none;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    div {
      font-size: 14px;
      line-height: 17px;
    }

    button {
      font-size: 14px;
      line-height: 17px;
    }
  }
`

const CustomLightGreyCard = styled(LightGreyCard)`
  background: #303030;
  border: none;
`

const CustomCardBody = styled(CardBody)`
  padding: 24px 18px;

  .amount {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.87);
  }

  .btn-percent {
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
    color: #9072ff;
    background: none !important;
    height: 27px;
    border: 1px solid #9072ff;
    border-radius: 40px;
  }

  .text-symbol {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
  }

  .text-amount {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
  }

  .currencyx img {
    width: 18px;
    height: unset;
  }

  .text-price {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
  }

  .amount-per-token {
    & > div:first-child {
      margin-bottom: 8px;
    }

    div {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
    }
  }

  .slippage {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #9072ff;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 32px 24px;
    .amount {
      font-weight: 500;
      font-size: 40px;
      line-height: 48px;
    }

    .text-symbol {
      font-size: 16px;
      line-height: 19px;
    }

    .text-amount {
      font-size: 18px;
      line-height: 22px;
    }

    .currencyx img {
      width: 24px;
      height: unset;
    }

    .text-price {
      font-size: 16px;
      line-height: 19px;
    }

    .amount-per-token {
      & > div:first-child {
        margin-bottom: 8px;
      }

      div {
        font-size: 16px;
        line-height: 19px;
      }
    }

    .slippage {
      font-size: 16px;
      line-height: 19px;
    }
  }
`

const StyledLiquidityContainer = styled.div`
  flex-shrink: 0;
  height: fit-content;
  // position: absolute;
  // top: 56px;
  // left: 0px;
  margin-top: 10px;
  z-index: 9;
  padding: 0 28px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 560px;
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

const MainBackground = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  svg {
    width: 100vw;
  }
`

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  button {
    height: 37px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    button {
      height: 43px;
    }
  }
`

const zapSupportedChainId = [ChainId.BSC, ChainId.BSC_TESTNET]

export default function RemoveLiquidity({ currencyA, currencyB, currencyIdA, currencyIdB }) {
  const router = useRouter()
  const native = useNativeCurrency()
  const [zapMode] = useZapModeManager()
  const [temporarilyZapMode, setTemporarilyZapMode] = useState(true)
  const { account, chainId, isWrongNetwork } = useActiveWeb3React()
  const library = useWeb3LibraryContext()
  const { toastError } = useToast()
  const [tokenA, tokenB] = useMemo(() => [currencyA?.wrapped, currencyB?.wrapped], [currencyA, currencyB])
  const { isMobile } = useMatchBreakpoints()

  const { t } = useTranslation()
  const gasPrice = useGasPrice()

  const canZapOut = useMemo(() => zapSupportedChainId.includes(chainId) && zapMode, [chainId, zapMode])
  const zapModeStatus = useMemo(
    () => canZapOut && !!zapMode && temporarilyZapMode,
    [canZapOut, zapMode, temporarilyZapMode],
  )

  // burn state
  const { independentField, typedValue } = useBurnState()
  const [removalCheckedA, setRemovalCheckedA] = useState(true)
  const [removalCheckedB, setRemovalCheckedB] = useState(true)
  const { pair, parsedAmounts, error, tokenToReceive, estimateZapOutAmount } = useDerivedBurnInfo(
    currencyA ?? undefined,
    currencyB ?? undefined,
    removalCheckedA,
    removalCheckedB,
    zapModeStatus,
  )
  const isZap = (!removalCheckedA || !removalCheckedB) && zapModeStatus

  const poolData = useLPApr(pair)
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t(`Based on last 7 days' performance. Does not account for impermanent loss`),
    {
      placement: 'bottom',
    },
  )
  const { onUserInput: _onUserInput } = useBurnActionHandlers()
  const isValid = !error

  // modal and loading
  const [showDetailed, setShowDetailed] = useState<boolean>(false)
  const [{ attemptingTxn, liquidityErrorMessage, txHash }, setLiquidityState] = useState<{
    attemptingTxn: boolean
    liquidityErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    attemptingTxn: false,
    liquidityErrorMessage: undefined,
    txHash: undefined,
  })

  // txn values
  const deadline = useTransactionDeadline()
  const [allowedSlippage] = useUserSlippageTolerance()

  const formattedAmounts = {
    [Field.LIQUIDITY_PERCENT]: parsedAmounts[Field.LIQUIDITY_PERCENT].equalTo('0')
      ? '0'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].lessThan(new Percent('1', '100'))
      ? '<1'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0),
    [Field.LIQUIDITY]:
      independentField === Field.LIQUIDITY ? typedValue : parsedAmounts[Field.LIQUIDITY]?.toSignificant(6) ?? '',
    [Field.CURRENCY_A]:
      independentField === Field.CURRENCY_A ? typedValue : parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? '',
    [Field.CURRENCY_B]:
      independentField === Field.CURRENCY_B ? typedValue : parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? '',
  }

  const atMaxAmount = parsedAmounts[Field.LIQUIDITY_PERCENT]?.equalTo(new Percent('1'))

  // pair contract
  const pairContractRead: Contract | null = usePairContract(pair?.liquidityToken?.address, false)
  const pairContract: Contract | null = usePairContract(pair?.liquidityToken?.address)

  // allowance handling
  const [signatureData, setSignatureData] = useState<{ v: number; r: string; s: string; deadline: number } | null>(null)
  const [approval, approveCallback] = useApproveCallback(
    parsedAmounts[Field.LIQUIDITY],
    isZap ? getZapAddress(chainId) : ROUTER_XOX[chainId],
  )

  async function onAttemptToApprove() {
    if (!pairContract || !pairContractRead || !pair || !library || !deadline) throw new Error('missing dependencies')
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY]
    if (!liquidityAmount) {
      toastError(t('Error'), t('Missing liquidity amount'))
      throw new Error('missing liquidity amount')
    }

    // try to gather a signature for permission
    const nonce = await pairContractRead.nonces(account)

    const EIP712Domain = [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ]
    const domain = {
      name: 'Pancake LPs',
      version: '1',
      chainId,
      verifyingContract: pair.liquidityToken.address,
    }
    const Permit = [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ]
    const message = {
      owner: account,
      spender: ROUTER_XOX[chainId],
      value: liquidityAmount.quotient.toString(),
      nonce: nonce.toHexString(),
      deadline: deadline.toNumber(),
    }
    const data = JSON.stringify({
      types: {
        EIP712Domain,
        Permit,
      },
      domain,
      primaryType: 'Permit',
      message,
    })

    approveCallback()
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback(
    (field: Field, value: string) => {
      setSignatureData(null)
      return _onUserInput(field, value)
    },
    [_onUserInput],
  )

  const onLiquidityInput = useCallback((value: string): void => onUserInput(Field.LIQUIDITY, value), [onUserInput])
  const onCurrencyAInput = useCallback((value: string): void => onUserInput(Field.CURRENCY_A, value), [onUserInput])
  const onCurrencyBInput = useCallback((value: string): void => onUserInput(Field.CURRENCY_B, value), [onUserInput])

  const zapContract = useZapContract()

  // tx sending
  const addTransaction = useTransactionAdder()

  const routerContract = useRouterContractXOX(false)

  async function onZapOut() {
    if (!chainId || !library || !account || !estimateZapOutAmount) throw new Error('missing dependencies')
    if (!zapContract) throw new Error('missing zap contract')
    if (!tokenToReceive) throw new Error('missing tokenToReceive')

    if (!currencyA || !currencyB) {
      toastError(t('Error'), t('Missing tokens'))
      throw new Error('missing tokens')
    }
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY]
    if (!liquidityAmount) {
      toastError(t('Error'), t('Missing liquidity amount'))
      throw new Error('missing liquidity amount')
    }

    if (!tokenA || !tokenB) {
      toastError(t('Error'), t('Could not wrap'))
      throw new Error('could not wrap')
    }

    const totalTokenAmountOut =
      removalCheckedA && !removalCheckedB ? parsedAmounts[Field.CURRENCY_A] : parsedAmounts[Field.CURRENCY_B]

    let methodName
    let args
    if (oneCurrencyIsNative && tokenToReceive.toLowerCase() === WNATIVE[chainId].address.toLowerCase()) {
      methodName = 'zapOutBNB'
      args = [
        pair.liquidityToken.address,
        parsedAmounts[Field.LIQUIDITY].quotient.toString(),
        calculateSlippageAmount(estimateZapOutAmount, allowedSlippage)[0].toString(),
        calculateSlippageAmount(totalTokenAmountOut, allowedSlippage)[0].toString(),
      ]
    } else {
      methodName = 'zapOutToken'
      args = [
        pair.liquidityToken.address,
        tokenToReceive,
        parsedAmounts[Field.LIQUIDITY].quotient.toString(),
        calculateSlippageAmount(estimateZapOutAmount, allowedSlippage)[0].toString(),
        calculateSlippageAmount(totalTokenAmountOut, allowedSlippage)[0].toString(),
      ]
    }
    setLiquidityState({ attemptingTxn: true, liquidityErrorMessage: undefined, txHash: undefined })
    callWithEstimateGas(zapContract, methodName, args, {
      gasPrice,
    })
      .then((response) => {
        setLiquidityState({ attemptingTxn: false, liquidityErrorMessage: undefined, txHash: response.hash })
        const amount = parsedAmounts[Field.LIQUIDITY].toSignificant(3)
        const symbol = getLPSymbol(pair.token0.symbol, pair.token1.symbol, chainId)
        addTransaction(response, {
          summary: `Remove ${amount} ${symbol}`,
          translatableSummary: {
            text: 'Remove %amount% %symbol%',
            data: { amount, symbol },
          },
          type: 'remove-liquidity',
        })
      })
      .catch((err) => {
        if (err && err.code !== 4001) {
          console.error(`Remove Liquidity failed`, err, args)
        }
        setLiquidityState({
          attemptingTxn: false,
          liquidityErrorMessage: err && err?.code !== 4001 ? `Remove Liquidity failed: ${err.message}` : undefined,
          txHash: undefined,
        })
      })
  }

  async function onRemove() {
    if (!chainId || !account || !deadline || !routerContract) throw new Error('missing dependencies')
    const { [Field.CURRENCY_A]: currencyAmountA, [Field.CURRENCY_B]: currencyAmountB } = parsedAmounts
    if (!currencyAmountA || !currencyAmountB) {
      toastError(t('Error'), t('Missing currency amounts'))
      throw new Error('missing currency amounts')
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(currencyAmountA, allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(currencyAmountB, allowedSlippage)[0],
    }

    if (!currencyA || !currencyB) {
      toastError(t('Error'), t('Missing tokens'))
      throw new Error('missing tokens')
    }
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY]
    if (!liquidityAmount) {
      toastError(t('Error'), t('Missing liquidity amount'))
      throw new Error('missing liquidity amount')
    }

    const currencyBIsNative = currencyB?.isNative
    const oneCurrencyIsNative = currencyA?.isNative || currencyBIsNative

    if (!tokenA || !tokenB) {
      toastError(t('Error'), t('Could not wrap'))
      throw new Error('could not wrap')
    }

    let methodNames: string[]
    let args: Array<string | string[] | number | boolean>
    // we have approval, use normal remove liquidity
    if (approval === ApprovalState.APPROVED) {
      // removeLiquidityETH
      if (oneCurrencyIsNative) {
        methodNames = ['removeLiquidityETH', 'removeLiquidityETHSupportingFeeOnTransferTokens']
        args = [
          currencyBIsNative ? tokenA.address : tokenB.address,
          liquidityAmount.quotient.toString(),
          amountsMin[currencyBIsNative ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsNative ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          deadline.toHexString(),
        ]
      }
      // removeLiquidity
      else {
        methodNames = ['removeLiquidity']
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.quotient.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          deadline.toHexString(),
        ]
      }
    }
    // we have a signature, use permit versions of remove liquidity
    else if (signatureData !== null) {
      // removeLiquidityETHWithPermit
      if (oneCurrencyIsNative) {
        methodNames = ['removeLiquidityETHWithPermit', 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens']
        args = [
          currencyBIsNative ? tokenA.address : tokenB.address,
          liquidityAmount.quotient.toString(),
          amountsMin[currencyBIsNative ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsNative ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        ]
      }
      // removeLiquidityETHWithPermit
      else {
        methodNames = ['removeLiquidityWithPermit']
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.quotient.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        ]
      }
    } else {
      toastError(t('Error'), t('Attempting to confirm without approval or a signature'))
      throw new Error('Attempting to confirm without approval or a signature')
    }

    let methodSafeGasEstimate: { methodName: string; safeGasEstimate: BigNumber }
    for (let i = 0; i < methodNames.length; i++) {
      let safeGasEstimate
      try {
        // eslint-disable-next-line no-await-in-loop
        safeGasEstimate = calculateGasMargin(await routerContract.estimateGas[methodNames[i]](...args))
      } catch (e) {
        console.error(`estimateGas failed`, methodNames[i], args, e)
      }

      if (BigNumber.isBigNumber(safeGasEstimate)) {
        methodSafeGasEstimate = { methodName: methodNames[i], safeGasEstimate }
        break
      }
    }

    // all estimations failed...
    if (!methodSafeGasEstimate) {
      toastError(t('Error'), t('This transaction would fail'))
    } else {
      const { methodName, safeGasEstimate } = methodSafeGasEstimate

      setLiquidityState({ attemptingTxn: true, liquidityErrorMessage: undefined, txHash: undefined })
      await routerContract[methodName](...args, {
        gasLimit: safeGasEstimate,
        gasPrice,
      })
        .then((response: TransactionResponse) => {
          setLiquidityState({ attemptingTxn: false, liquidityErrorMessage: undefined, txHash: response.hash })
          const amountA = parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)
          const amountB = parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)
          addTransaction(response, {
            summary: `Remove ${amountA} ${currencyA?.symbol} and ${amountB} ${currencyB?.symbol}`,
            translatableSummary: {
              text: 'Remove %amountA% %symbolA% and %amountB% %symbolB%',
              data: { amountA, symbolA: currencyA?.symbol, amountB, symbolB: currencyB?.symbol },
            },
            type: 'remove-liquidity',
          })
        })
        .catch((err) => {
          if (err && err.code !== 4001) {
            logError(err)
            console.error(`Remove Liquidity failed`, err, args)
          }
          setLiquidityState({
            attemptingTxn: false,
            liquidityErrorMessage:
              err && err?.code !== 4001
                ? t('Remove liquidity failed: %message%', { message: transactionErrorToUserReadableMessage(err, t) })
                : undefined,
            txHash: undefined,
          })
        })
    }
  }

  const pendingText = t('Removing %amountA% %symbolA% and %amountB% %symbolB%', {
    amountA: parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? '',
    symbolA: currencyA?.symbol ?? '',
    amountB: parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? '',
    symbolB: currencyB?.symbol ?? '',
  })

  const liquidityPercentChangeCallback = useCallback(
    (value: number) => {
      onUserInput(Field.LIQUIDITY_PERCENT, value.toString())
    },
    [onUserInput],
  )

  const oneCurrencyIsNative = currencyA?.isNative || currencyB?.isNative
  const oneCurrencyIsWNative = Boolean(
    chainId &&
      ((currencyA && WNATIVE[chainId]?.equals(currencyA)) || (currencyB && WNATIVE[chainId]?.equals(currencyB))),
  )

  const handleSelectCurrencyA = useCallback(
    (currency: Currency) => {
      if (currencyIdB && currencyId(currency) === currencyIdB) {
        router.replace(`/remove/${currencyId(currency)}/${currencyIdA}`, undefined, { shallow: true })
      } else {
        router.replace(`/remove/${currencyId(currency)}/${currencyIdB}`, undefined, { shallow: true })
      }
    },
    [currencyIdA, currencyIdB, router],
  )
  const handleSelectCurrencyB = useCallback(
    (currency: Currency) => {
      if (currencyIdA && currencyId(currency) === currencyIdA) {
        router.replace(`/remove/${currencyIdB}/${currencyId(currency)}`, undefined, { shallow: true })
      } else {
        router.replace(`/remove/${currencyIdA}/${currencyId(currency)}`, undefined, { shallow: true })
      }
    },
    [currencyIdA, currencyIdB, router],
  )

  const handleDismissConfirmation = useCallback(() => {
    setSignatureData(null) // important that we clear signature data to avoid bad sigs
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.LIQUIDITY_PERCENT, '0')
    }
  }, [onUserInput, txHash])

  const [innerLiquidityPercentage, setInnerLiquidityPercentage] = useDebouncedChangeHandler(
    Number.parseInt(parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0)),
    liquidityPercentChangeCallback,
  )

  const handleChangePercent = useCallback(
    (value) => setInnerLiquidityPercentage(Math.ceil(value)),
    [setInnerLiquidityPercentage],
  )

  const [onPresentRemoveLiquidity] = useModal(
    <ConfirmLiquidityModal
      title={t('You will receive')}
      customOnDismiss={handleDismissConfirmation}
      attemptingTxn={attemptingTxn}
      hash={txHash || ''}
      allowedSlippage={allowedSlippage}
      onRemove={isZap ? onZapOut : onRemove}
      isZap={isZap}
      pendingText={pendingText}
      approval={approval}
      signatureData={signatureData}
      tokenA={tokenA}
      tokenB={tokenB}
      liquidityErrorMessage={liquidityErrorMessage}
      parsedAmounts={parsedAmounts}
      currencyA={currencyA}
      currencyB={currencyB}
      toggleZapMode={setTemporarilyZapMode}
    />,
    true,
    true,
    'removeLiquidityModal',
  )

  const isZapOutA = isZap && !removalCheckedB && removalCheckedA
  const isZapOutB = isZap && !removalCheckedA && removalCheckedB

  return (
    <Page>
      <MainBackground>{isMobile ? <SwapMainBackgroundMobile /> : <SwapMainBackgroundDesktop />}</MainBackground>
      <Flex
        width={['290px', , '559px']}
        marginTop="100px"
        marginBottom="100px"
        height="100%"
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

          <StyledLiquidityContainer>
            {/* <Header>
              <div>
                <p className="title">Liquidity</p>
                <p className="sub_title">Add liquidity to receive LP tokens</p>
              </div>
              <div style={{ display: 'flex' }}>
                <span style={{ marginRight: '8px' }}>
                  <img src="/images/liquidity/setting-icon.svg" alt="" />
                </span>
                <span>
                  <img src="/images/liquidity/history-icon.svg" alt="" />
                </span>
              </div>
            </Header> */}
            <AppHeader
              backTo="/liquidity"
              title={t('Remove %assetA%-%assetB% liquidity', {
                assetA: currencyA?.symbol ?? '',
                assetB: currencyB?.symbol ?? '',
              })}
              noConfig
            />

            <CustomCardBody>
              <AutoColumn gap="20px">
                <AmountWrapper>
                  <Text>{t('Amount')}</Text>
                  <Button variant="text" scale="sm" onClick={() => setShowDetailed(!showDetailed)}>
                    {showDetailed ? t('Simple') : t('Detailed')}
                  </Button>
                </AmountWrapper>
                {!showDetailed && (
                  <BorderCard>
                    <Text className="amount">{formattedAmounts[Field.LIQUIDITY_PERCENT]}%</Text>
                    <Slider
                      name="lp-amount"
                      min={0}
                      max={100}
                      value={innerLiquidityPercentage}
                      onValueChanged={handleChangePercent}
                    />
                    <Flex flexWrap="wrap" justifyContent="space-between">
                      <Button className="btn-percent" onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '25')}>
                        25%
                      </Button>
                      <Button className="btn-percent" onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '50')}>
                        50%
                      </Button>
                      <Button className="btn-percent" onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '75')}>
                        75%
                      </Button>
                      <Button className="btn-percent" onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '100')}>
                        {t('Max')}
                      </Button>
                    </Flex>
                  </BorderCard>
                )}
              </AutoColumn>
              {!showDetailed && (
                <>
                  <ColumnCenter style={{ margin: '8px auto' }}>
                    <ArrowDownIcon color="textSubtle" width="24px" />
                  </ColumnCenter>
                  <AutoColumn gap="10px">
                    <CustomLightGreyCard>
                      <Flex
                        className="currencyx"
                        justifyContent="space-between"
                        mb="8px"
                        as="label"
                        alignItems="center"
                      >
                        <Flex>
                          <Text className="text-amount">{formattedAmounts[Field.CURRENCY_A] || '-'}</Text>
                        </Flex>
                        <Flex alignItems="center">
                          {zapModeStatus && (
                            <Flex mr="9px">
                              <Checkbox
                                disabled={isZapOutA}
                                scale="sm"
                                checked={removalCheckedA}
                                onChange={(e) => setRemovalCheckedA(e.target.checked)}
                              />
                            </Flex>
                          )}
                          <CurrencyLogo currency={currencyA} />
                          <Text className="text-symbol" id="remove-liquidity-tokena-symbol" ml="8px">
                            {currencyA?.symbol}
                          </Text>
                        </Flex>
                      </Flex>
                      <Flex className="currencyx" justifyContent="space-between" as="label" alignItems="center">
                        <Flex>
                          <Text className="text-amount">{formattedAmounts[Field.CURRENCY_B] || '-'}</Text>
                        </Flex>
                        <Flex alignItems="center">
                          {zapModeStatus && (
                            <Flex mr="9px">
                              <Checkbox
                                disabled={isZapOutB}
                                scale="sm"
                                checked={removalCheckedB}
                                onChange={(e) => setRemovalCheckedB(e.target.checked)}
                              />
                            </Flex>
                          )}
                          <CurrencyLogo currency={currencyB} />
                          <Text className="text-symbol" id="remove-liquidity-tokenb-symbol" ml="8px">
                            {currencyB?.symbol}
                          </Text>
                        </Flex>
                      </Flex>
                      {/* {chainId && (oneCurrencyIsWNative || oneCurrencyIsNative) ? (
                    <RowBetween style={{ justifyContent: 'flex-end', fontSize: '14px' }}>
                      {oneCurrencyIsNative ? (
                        <StyledInternalLink
                          href={`/remove/${currencyA?.isNative ? WNATIVE[chainId]?.address : currencyIdA}/${
                            currencyB?.isNative ? WNATIVE[chainId]?.address : currencyIdB
                          }`}
                        >
                          {t('Receive %currency%', { currency: WNATIVE[chainId]?.symbol })}
                        </StyledInternalLink>
                      ) : oneCurrencyIsWNative ? (
                        <StyledInternalLink
                          href={`/remove/${
                            currencyA && currencyA.equals(WNATIVE[chainId]) ? native?.symbol : currencyIdA
                          }/${currencyB && currencyB.equals(WNATIVE[chainId]) ? native?.symbol : currencyIdB}`}
                        >
                          {t('Receive %currency%', { currency: native?.symbol })}
                        </StyledInternalLink>
                      ) : null}
                    </RowBetween>
                  ) : null} */}
                    </CustomLightGreyCard>
                  </AutoColumn>
                </>
              )}

              {showDetailed && (
                <Box my="16px">
                  <CurrencyInputPanel
                    value={formattedAmounts[Field.LIQUIDITY]}
                    onUserInput={onLiquidityInput}
                    onPercentInput={(percent) => {
                      onUserInput(Field.LIQUIDITY_PERCENT, percent.toString())
                    }}
                    onMax={() => {
                      onUserInput(Field.LIQUIDITY_PERCENT, '100')
                    }}
                    // showQuickInputButton
                    showMaxButton={!atMaxAmount}
                    disableCurrencySelect
                    currency={pair?.liquidityToken}
                    pair={pair}
                    id="liquidity-amount"
                    onCurrencySelect={() => null}
                    showCommonBases
                    commonBasesType={CommonBasesType.LIQUIDITY}
                  />
                  <ColumnCenter style={{ margin: '8px auto' }}>
                    <ArrowDownIcon width="24px" my="16px" />
                  </ColumnCenter>
                  <CurrencyInputPanel
                    beforeButton={
                      zapModeStatus && (
                        <ZapCheckbox
                          disabled={!removalCheckedB && removalCheckedA}
                          checked={removalCheckedA}
                          onChange={(e) => {
                            setRemovalCheckedA(e.target.checked)
                          }}
                        />
                      )
                    }
                    zapStyle="zap"
                    hideBalance
                    disabled={isZap && !removalCheckedA}
                    value={formattedAmounts[Field.CURRENCY_A]}
                    onUserInput={onCurrencyAInput}
                    onMax={() => onUserInput(Field.LIQUIDITY_PERCENT, '100')}
                    showMaxButton={!atMaxAmount}
                    currency={currencyA}
                    label={t('Output')}
                    onCurrencySelect={handleSelectCurrencyA}
                    id="remove-liquidity-tokena"
                    showCommonBases
                    commonBasesType={CommonBasesType.LIQUIDITY}
                  />
                  <ColumnCenter>
                    <AddIcon width="24px" my="16px" />
                  </ColumnCenter>
                  <CurrencyInputPanel
                    beforeButton={
                      zapModeStatus && (
                        <ZapCheckbox
                          disabled={!removalCheckedA && removalCheckedB}
                          checked={removalCheckedB}
                          onChange={(e) => {
                            setRemovalCheckedB(e.target.checked)
                          }}
                        />
                      )
                    }
                    zapStyle="zap"
                    hideBalance
                    disabled={isZap && !removalCheckedB}
                    value={formattedAmounts[Field.CURRENCY_B]}
                    onUserInput={onCurrencyBInput}
                    showMaxButton={false}
                    currency={currencyB}
                    label={t('Output')}
                    onCurrencySelect={handleSelectCurrencyB}
                    id="remove-liquidity-tokenb"
                    showCommonBases
                    commonBasesType={CommonBasesType.LIQUIDITY}
                  />
                </Box>
              )}
              {pair && (
                <Flex justifyContent="space-between" style={{ marginTop: '16px' }}>
                  <Text className="text-price">{t('Prices')}</Text>
                  <Flex flexDirection="column" alignItems="flex-end">
                    <Text>
                      1 {currencyA?.symbol} = {tokenA ? pair.priceOf(tokenA).toSignificant(6) : '-'} {currencyB?.symbol}
                    </Text>
                    <Text>
                      1 {currencyB?.symbol} ={tokenB ? pair.priceOf(tokenB).toSignificant(6) : '-'} {currencyA?.symbol}
                    </Text>
                  </Flex>
                </Flex>
              )}
              <RowBetween mt="16px">
                <Text className="text-price">{t('Slippage Tolerance')}</Text>
                <Text className="slippage">{allowedSlippage / 100}%</Text>
              </RowBetween>
              {poolData && (
                <RowBetween mt="16px">
                  <TooltipText ref={targetRef} bold fontSize="12px" color="secondary">
                    {t('LP reward APR')}
                  </TooltipText>
                  {tooltipVisible && tooltip}
                  <Text bold color="primary">
                    {formatAmount(poolData.lpApr7d)}%
                  </Text>
                </RowBetween>
              )}
              <Box position="relative" mt="24px">
                {!account ? (
                  <ConnectWalletButton width="100%" />
                ) : isWrongNetwork ? (
                  <CommitButton width="100%" />
                ) : (
                  <ButtonWrapper className="btn-area">
                    <Button
                      variant={
                        approval === ApprovalState.APPROVED || (!isZap && signatureData !== null)
                          ? 'success'
                          : 'primary'
                      }
                      onClick={isZap ? approveCallback : onAttemptToApprove}
                      disabled={approval !== ApprovalState.NOT_APPROVED || (!isZap && signatureData !== null)}
                      width="100%"
                      mr="0.5rem"
                      style={{ fontWeight: 700 }}
                    >
                      {approval === ApprovalState.PENDING ? (
                        <Dots>{t('Approving')}</Dots>
                      ) : approval === ApprovalState.APPROVED || (!isZap && signatureData !== null) ? (
                        t('Approved')
                      ) : (
                        t('Approve')
                      )}
                    </Button>
                    <Button
                      variant={
                        !isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B]
                          ? 'danger'
                          : 'primary'
                      }
                      onClick={() => {
                        setLiquidityState({
                          attemptingTxn: false,
                          liquidityErrorMessage: undefined,
                          txHash: undefined,
                        })
                        onPresentRemoveLiquidity()
                      }}
                      width="100%"
                      disabled={
                        !isValid ||
                        (!isZap && signatureData === null && approval !== ApprovalState.APPROVED) ||
                        (isZap && approval !== ApprovalState.APPROVED)
                      }
                      style={{ fontWeight: 700 }}
                    >
                      {error || t('Remove')}
                    </Button>
                  </ButtonWrapper>
                )}
              </Box>
              {pair ? (
                <AutoColumn style={{ width: '100%', marginTop: '24px' }}>
                  <MinimalPositionCard showUnwrapped={oneCurrencyIsWNative} pair={pair} />
                </AutoColumn>
              ) : null}
            </CustomCardBody>
          </StyledLiquidityContainer>
        </Wrapper>
      </Flex>
    </Page>
  )
}
