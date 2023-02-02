import { useCallback, useEffect, useMemo, useState } from 'react'
import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/providers'
import { JSBI, CurrencyAmount, Token, WNATIVE, MINIMUM_LIQUIDITY, Percent } from '@pancakeswap/sdk'
import {
  Button,
  Text,
  AddIcon,
  CardBody,
  Message,
  useModal,
  TooltipText,
  useTooltip,
  MessageText,
  useMatchBreakpoints,
  Flex,
} from '@pancakeswap/uikit'
import { logError } from 'utils/sentry'
import styled from 'styled-components'
import { useIsTransactionUnsupported, useIsTransactionWarning } from 'hooks/Trades'
import { useTranslation } from '@pancakeswap/localization'
import { formatAmountString } from '@pancakeswap/utils/formatBalance'
import { useZapContract } from 'hooks/useContract'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getZapAddress } from 'utils/addressHelpers'
import { CommitButton } from 'components/CommitButton'
import { getLPSymbol } from 'utils/getLpSymbol'
import { useRouter } from 'next/router'
import { callWithEstimateGas } from 'utils/calls'
import { SUPPORT_ZAP } from 'config/constants/supportChains'
import { ContractMethodName } from 'utils/types'
import { ROUTER_XOX } from 'config/constants/exchange'
import { useLPApr } from 'state/swap/useLPApr'
import SwapbackgroundDesktop from 'components/Svg/SwapBackgroundDesktop'
import SwapbackgroundDesktopNone from 'components/Svg/SwapBackgroundDesktopNone'
import SwapbackgroundMobile from 'components/Svg/SwapBackgroundMobile'
import SwapbackgroundMobileNone from 'components/Svg/SwapBackgroundMobileNone'
import SwapbackgroundMobileNone2 from 'components/Svg/SwapBackgroundMobileNone2'
import SwapbackgroundDesktopNone2 from 'components/Svg/SwapBackgroundDesktopNone2'
import { CustomRowBetween, RowBetween, RowFixed } from 'components/Layout/Row'

import { AutoColumn, ColumnCenter } from '../../components/Layout/Column'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { AppHeader } from '../../components/App'
import ConnectWalletButton from '../../components/ConnectWalletButton'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import { Field } from '../../state/mint/actions'
import { useDerivedMintInfo, useMintActionHandlers, useMintState, useZapIn } from '../../state/mint/hooks'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { useGasPrice, useIsExpertMode, usePairAdder, useUserSlippageTolerance } from '../../state/user/hooks'
import { calculateGasMargin } from '../../utils'
import { calculateSlippageAmount, useRouterContractXOX } from '../../utils/exchange'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { wrappedCurrency } from '../../utils/wrappedCurrency'
import Dots from '../../components/Loader/Dots'
import Page from '../Page'
import ConfirmAddLiquidityModal from './components/ConfirmAddLiquidityModal'
import ConfirmZapInModal from './components/ConfirmZapInModal'
import { formatAmount } from '../../utils/formatInfoNumbers'
import { useCurrencySelectRoute } from './useCurrencySelectRoute'
import { CommonBasesType } from '../../components/SearchModal/types'
import { MinimalPositionCard } from 'components/PositionCard'

const Wrapper = styled(Flex)`
  width: 100%;
  max-width: 591px;
  height: fit-content;
  z-index: 0;
  align-items: center;
  justify-content: center;
`

const LiquidityBody = styled.div`
  padding: 30px 0;
  max-width: 503px;
  width: 100%;
  top: 30px;
  left: 16px;
  z-index: 2;

  .text-left {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);
  }

  .text-right {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255);
  }

  .text-share {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #9072ff;
  }

  .purple {
    color: #9072ff;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    .text-share {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #9072ff;
    }

    .purple {
      color: #9072ff;
      font-size: 18px;
      line-height: 22px;
    }

    .slippage {
      font-size: 18px;
      line-height: 22px;
    }
  }
`

const SwapbackgroundNoneWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
`
const SwapbackgroundNone2Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
`

const SwapbackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`

enum Steps {
  Choose,
  Add,
}

export default function AddLiquidity({ currencyA, currencyB }) {
  const router = useRouter()
  const { account, chainId, isWrongNetwork } = useActiveWeb3React()
  const { isMobile } = useMatchBreakpoints()
  const addPair = usePairAdder()
  const zapMode = false
  const expertMode = useIsExpertMode()
  const zapAddress = getZapAddress(chainId)

  const [temporarilyZapMode, setTemporarilyZapMode] = useState(true)

  const [steps, setSteps] = useState(Steps.Choose)

  const { t } = useTranslation()
  const gasPrice = useGasPrice()

  useEffect(() => {
    if (router.query.step === '1') {
      setSteps(Steps.Add)
    }
  }, [router.query])

  const zapModeStatus = useMemo(() => !!zapMode && temporarilyZapMode, [zapMode, temporarilyZapMode])

  // mint state
  const { independentField, typedValue, otherTypedValue } = useMintState()
  const {
    dependentField,
    currencies,
    pair,
    pairState,
    currencyBalances,
    parsedAmounts: mintParsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
    addError,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)

  const poolData = useLPApr(pair)
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t(`Based on last 7 days' performance. Does not account for impermanent loss`),
    {
      placement: 'bottom',
    },
  )

  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)

  // modal and loading
  const [{ attemptingTxn, liquidityErrorMessage, txHash }, setLiquidityState] = useState<{
    attemptingTxn: boolean
    liquidityErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    attemptingTxn: false,
    liquidityErrorMessage: undefined,
    txHash: undefined,
  })

  // Zap state
  const [zapTokenToggleA, setZapTokenToggleA] = useState(true)
  const [zapTokenToggleB, setZapTokenToggleB] = useState(true)
  const zapTokenCheckedA = zapTokenToggleA && currencyBalances?.[Field.CURRENCY_A]?.greaterThan(0)
  const zapTokenCheckedB = zapTokenToggleB && currencyBalances?.[Field.CURRENCY_B]?.greaterThan(0)

  // txn values
  const deadline = useTransactionDeadline() // custom from users settings
  const [allowedSlippage] = useUserSlippageTolerance() // custom from users

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: CurrencyAmount<Token> } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field]),
      }
    },
    {},
  )

  const canZap = useMemo(
    () =>
      !!zapModeStatus &&
      !noLiquidity &&
      SUPPORT_ZAP.includes(chainId) &&
      !(
        (pair && JSBI.lessThan(pair.reserve0.quotient, MINIMUM_LIQUIDITY)) ||
        (pair && JSBI.lessThan(pair.reserve1.quotient, MINIMUM_LIQUIDITY))
      ),
    [chainId, noLiquidity, pair, zapModeStatus],
  )

  const { handleCurrencyASelect, handleCurrencyBSelect } = useCurrencySelectRoute()

  const { zapInEstimating, rebalancing, ...zapIn } = useZapIn({
    pair,
    canZap,
    currencyA,
    currencyB,
    currencyBalances,
    zapTokenCheckedA,
    zapTokenCheckedB,
    maxAmounts,
  })

  const parsedAmounts = canZap ? zapIn.parsedAmounts : mintParsedAmounts

  const preferZapInstead = canZap && !zapIn.noNeedZap

  // get formatted amounts
  const formattedAmounts = useMemo(
    () => ({
      [independentField]:
        canZap &&
        ((independentField === Field.CURRENCY_A && !zapTokenCheckedA) ||
          (independentField === Field.CURRENCY_B && !zapTokenCheckedB))
          ? ''
          : typedValue,
      [dependentField]: noLiquidity ? otherTypedValue : formatAmountString(parsedAmounts[dependentField], 6) ?? '',
    }),
    [
      canZap,
      dependentField,
      independentField,
      noLiquidity,
      otherTypedValue,
      parsedAmounts,
      typedValue,
      zapTokenCheckedA,
      zapTokenCheckedB,
    ],
  )

  const atMaxAmounts: { [field in Field]?: CurrencyAmount<Token> } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0'),
      }
    },
    {},
  )

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(
    parsedAmounts[Field.CURRENCY_A],
    preferZapInstead ? zapAddress : ROUTER_XOX[chainId],
  )
  const [approvalB, approveBCallback] = useApproveCallback(
    parsedAmounts[Field.CURRENCY_B],
    preferZapInstead ? zapAddress : ROUTER_XOX[chainId],
  )

  const addTransaction = useTransactionAdder()

  const routerContract = useRouterContractXOX(false)

  async function onAdd() {
    if (!chainId || !account || !routerContract) return

    const { [Field.CURRENCY_A]: parsedAmountA, [Field.CURRENCY_B]: parsedAmountB } = mintParsedAmounts
    if (!parsedAmountA || !parsedAmountB || !currencyA || !currencyB || !deadline) {
      return
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(parsedAmountA, noLiquidity ? 0 : allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(parsedAmountB, noLiquidity ? 0 : allowedSlippage)[0],
    }

    let estimate
    let method: (...args: any) => Promise<TransactionResponse>
    let args: Array<string | string[] | number>
    let value: BigNumber | null
    if (currencyA?.isNative || currencyB?.isNative) {
      const tokenBIsNative = currencyB?.isNative
      estimate = routerContract.estimateGas.addLiquidityETH
      method = routerContract.addLiquidityETH
      args = [
        (tokenBIsNative ? currencyA : currencyB)?.wrapped?.address ?? '', // token
        (tokenBIsNative ? parsedAmountA : parsedAmountB).quotient.toString(), // token desired
        amountsMin[tokenBIsNative ? Field.CURRENCY_A : Field.CURRENCY_B].toString(), // token min
        amountsMin[tokenBIsNative ? Field.CURRENCY_B : Field.CURRENCY_A].toString(), // eth min
        account,
        deadline.toHexString(),
      ]
      value = BigNumber.from((tokenBIsNative ? parsedAmountB : parsedAmountA).quotient.toString())
    } else {
      estimate = routerContract.estimateGas.addLiquidity
      method = routerContract.addLiquidity
      args = [
        currencyA?.wrapped?.address ?? '',
        currencyB?.wrapped?.address ?? '',
        parsedAmountA.quotient.toString(),
        parsedAmountB.quotient.toString(),
        amountsMin[Field.CURRENCY_A].toString(),
        amountsMin[Field.CURRENCY_B].toString(),
        account,
        deadline.toHexString(),
      ]
      value = null
    }

    setLiquidityState({ attemptingTxn: true, liquidityErrorMessage: undefined, txHash: undefined })
    await estimate(...args, value ? { value } : {})
      .then((estimatedGasLimit) =>
        method(...args, {
          ...(value ? { value } : {}),
          gasLimit: calculateGasMargin(estimatedGasLimit),
          gasPrice,
        }).then((response) => {
          setLiquidityState({ attemptingTxn: false, liquidityErrorMessage: undefined, txHash: response.hash })

          const symbolA = currencies[Field.CURRENCY_A]?.symbol
          const amountA = parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)
          const symbolB = currencies[Field.CURRENCY_B]?.symbol
          const amountB = parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)
          addTransaction(response, {
            summary: `Add ${amountA} ${symbolA} and ${amountB} ${symbolB}`,
            translatableSummary: {
              text: 'Add %amountA% %symbolA% and %amountB% %symbolB%',
              data: { amountA, symbolA, amountB, symbolB },
            },
            type: 'add-liquidity',
          })

          if (pair) {
            addPair(pair)
          }
        }),
      )
      .catch((err) => {
        if (err && err.code !== 4001) {
          logError(err)
          console.error(`Add Liquidity failed`, err, args, value)
        }
        setLiquidityState({
          attemptingTxn: false,
          liquidityErrorMessage: t('Transaction rejected.'),
          txHash: undefined,
        })
      })
  }

  const pendingText = preferZapInstead
    ? t('Zapping %amountA% %symbolA% and %amountB% %symbolB%', {
        amountA: parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? '0',
        symbolA: currencies[Field.CURRENCY_A]?.symbol ?? '',
        amountB: parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? '0',
        symbolB: currencies[Field.CURRENCY_B]?.symbol ?? '',
      })
    : t('Adding %amountA% %symbolA% and %amountB% %symbolB%', {
        amountA: parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? '',
        symbolA: currencies[Field.CURRENCY_A]?.symbol ?? '',
        amountB: parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? '',
        symbolB: currencies[Field.CURRENCY_B]?.symbol ?? '',
      })

  const handleDismissConfirmation = useCallback(() => {
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onFieldAInput('')
    }
  }, [onFieldAInput, txHash])

  const addIsUnsupported = useIsTransactionUnsupported(currencies?.CURRENCY_A, currencies?.CURRENCY_B)
  const addIsWarning = useIsTransactionWarning(currencies?.CURRENCY_A, currencies?.CURRENCY_B)

  const zapContract = useZapContract()

  const [onPresentAddLiquidityModal] = useModal(
    <ConfirmAddLiquidityModal
      title={
        noLiquidity
          ? t('You are creating a pool')
          : attemptingTxn
          ? t('Confirm add liquidity')
          : txHash
          ? 'Transaction Submitted'
          : liquidityErrorMessage
          ? 'Confirm add liquidity'
          : t('You will receive')
      }
      customOnDismiss={handleDismissConfirmation}
      attemptingTxn={attemptingTxn}
      hash={txHash}
      pendingText={pendingText}
      currencyToAdd={pair?.liquidityToken}
      allowedSlippage={allowedSlippage}
      onAdd={onAdd}
      parsedAmounts={parsedAmounts}
      currencies={currencies}
      liquidityErrorMessage={liquidityErrorMessage}
      price={price}
      noLiquidity={noLiquidity}
      poolTokenPercentage={poolTokenPercentage}
      liquidityMinted={liquidityMinted}
    />,
    true,
    true,
    'addLiquidityModal',
  )

  async function onZapIn() {
    if (!canZap || !parsedAmounts || !zapIn.zapInEstimated || !chainId || !zapContract) {
      return
    }

    let method: ContractMethodName<typeof zapContract>
    let args
    let value: BigNumberish | null
    let summary: string
    let translatableSummary: { text: string; data?: Record<string, string | number> }
    const minAmountOut = zapIn.zapInEstimated.swapAmountOut.mul(10000 - allowedSlippage).div(10000)
    if (rebalancing) {
      const maxAmountIn = zapIn.zapInEstimated.swapAmountIn.mul(10000 + allowedSlippage).div(10000)
      const amountA = parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)
      const symbolA = currencies[Field.CURRENCY_A]?.symbol
      const amountB = parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)
      const symbolB = currencies[Field.CURRENCY_B]?.symbol
      summary = `Zap ${amountA} ${symbolA} and ${amountB} ${symbolB}`
      translatableSummary = {
        text: 'Zap %amountA% %symbolA% and %amountB% %symbolB%',
        data: { amountA, symbolA, amountB, symbolB },
      }
      if (currencyA?.isNative || currencyB?.isNative) {
        const tokenBIsBNB = currencyB?.isNative
        method = 'zapInBNBRebalancing'
        args = [
          wrappedCurrency(currencies[tokenBIsBNB ? Field.CURRENCY_A : Field.CURRENCY_B], chainId).address, // token1
          parsedAmounts[tokenBIsBNB ? Field.CURRENCY_A : Field.CURRENCY_B].quotient.toString(), // token1AmountIn
          pair.liquidityToken.address, // lp
          maxAmountIn, // tokenAmountInMax
          minAmountOut, // tokenAmountOutMin
          zapIn.zapInEstimated.isToken0Sold && !tokenBIsBNB, // isToken0Sold
        ]
        value = parsedAmounts[tokenBIsBNB ? Field.CURRENCY_B : Field.CURRENCY_A].quotient.toString()
      } else {
        method = 'zapInTokenRebalancing'
        args = [
          wrappedCurrency(currencies[Field.CURRENCY_A], chainId).address, // token0
          wrappedCurrency(currencies[Field.CURRENCY_B], chainId).address, // token1
          parsedAmounts[Field.CURRENCY_A].quotient.toString(), // token0AmountIn
          parsedAmounts[Field.CURRENCY_B].quotient.toString(), // token1AmountIn
          pair.liquidityToken.address, // lp
          maxAmountIn, // tokenAmountInMax
          minAmountOut, // tokenAmountOutMin
          zapIn.zapInEstimated.isToken0Sold, // isToken0Sold
        ]
      }
    } else if (currencies[zapIn.swapTokenField]?.isNative) {
      method = 'zapInBNB'
      args = [pair.liquidityToken.address, minAmountOut]
      const amount = parsedAmounts[zapIn.swapTokenField]?.toSignificant(3)
      const symbol = getLPSymbol(pair.token0.symbol, pair.token1.symbol, chainId)
      summary = `Zap in ${amount} BNB for ${symbol}`
      translatableSummary = {
        text: 'Zap in %amount% BNB for %symbol%',
        data: { amount, symbol },
      }
      value = parsedAmounts[zapIn.swapTokenField].quotient.toString()
    } else {
      method = 'zapInToken'
      args = [
        wrappedCurrency(currencies[zapIn.swapTokenField], chainId).address,
        parsedAmounts[zapIn.swapTokenField].quotient.toString(),
        pair.liquidityToken.address,
        minAmountOut,
      ]
      const amount = parsedAmounts[zapIn.swapTokenField]?.toSignificant(3)
      const { symbol } = currencies[zapIn.swapTokenField]
      const lpSymbol = getLPSymbol(pair.token0.symbol, pair.token1.symbol, chainId)
      summary = `Zap in ${amount} ${symbol} for ${lpSymbol}`
      translatableSummary = {
        text: 'Zap in %amount% %symbol% for %lpSymbol%',
        data: { amount, symbol, lpSymbol },
      }
    }

    setLiquidityState({ attemptingTxn: true, liquidityErrorMessage: undefined, txHash: undefined })

    callWithEstimateGas(zapContract, method, args, value ? { value, gasPrice } : { gasPrice })
      .then((response) => {
        setLiquidityState({ attemptingTxn: false, liquidityErrorMessage: undefined, txHash: response.hash })

        addTransaction(response, {
          summary,
          translatableSummary,
          type: 'add-liquidity',
        })

        if (pair) {
          addPair(pair)
        }
      })
      .catch((err) => {
        if (err && err.code !== 4001) {
          logError(err)
          console.error(`Add Liquidity failed`, err, args, value)
        }
        setLiquidityState({
          attemptingTxn: false,
          liquidityErrorMessage: t('Transaction rejected.'),
          txHash: undefined,
        })
      })
  }

  const [onPresentZapInModal] = useModal(
    <ConfirmZapInModal
      title={t('You will receive')}
      customOnDismiss={handleDismissConfirmation}
      attemptingTxn={attemptingTxn}
      hash={txHash}
      pendingText={pendingText}
      pair={pair}
      allowedSlippage={allowedSlippage}
      onAdd={onZapIn}
      parsedAmounts={parsedAmounts}
      currencies={currencies}
      liquidityErrorMessage={liquidityErrorMessage}
      price={price}
      poolTokenPercentage={zapIn.poolTokenPercentage}
      liquidityMinted={zapIn.liquidityMinted}
      zapSwapTokenField={zapIn.swapTokenField}
      zapSwapOutTokenField={zapIn.swapOutTokenField}
      zapInEstimated={zapIn.zapInEstimated}
      rebalancing={rebalancing}
      zapMode={zapModeStatus}
      toggleZapMode={setTemporarilyZapMode}
    />,
    true,
    true,
    'zapInModal',
  )

  const handleEnableZap = () => {
    if (!zapMode) {
      setTemporarilyZapMode(!zapMode)
    }
  }

  let isValid = !error
  let errorText = error

  if (preferZapInstead) {
    isValid = !error && !zapIn.error
    errorText = error ?? zapIn.error
  } else {
    isValid = !error && !addError
    errorText = error ?? addError
  }

  const buttonDisabled =
    !isValid ||
    ((zapIn.parsedAmounts[Field.CURRENCY_A] || (!preferZapInstead && zapTokenCheckedA)) &&
      approvalA !== ApprovalState.APPROVED) ||
    ((zapIn.parsedAmounts[Field.CURRENCY_B] || (!preferZapInstead && zapTokenCheckedB)) &&
      approvalB !== ApprovalState.APPROVED) ||
    (zapIn.priceSeverity > 3 && preferZapInstead)

  const showFieldAApproval =
    (zapTokenCheckedA || !preferZapInstead) &&
    (approvalA === ApprovalState.NOT_APPROVED || approvalA === ApprovalState.PENDING)
  const showFieldBApproval =
    (zapTokenCheckedB || !preferZapInstead) &&
    (approvalB === ApprovalState.NOT_APPROVED || approvalB === ApprovalState.PENDING)

  const shouldShowApprovalGroup = (showFieldAApproval || showFieldBApproval) && isValid

  const oneCurrencyIsWNATIVE = Boolean(
    chainId && ((currencyA && currencyA.equals(WNATIVE[chainId])) || (currencyB && currencyB.equals(WNATIVE[chainId]))),
  )

  const noAnyInputAmount = !parsedAmounts[Field.CURRENCY_A] && !parsedAmounts[Field.CURRENCY_B]

  const showZapWarning =
    preferZapInstead &&
    !noAnyInputAmount &&
    ((!rebalancing && !(!zapTokenCheckedA && !zapTokenCheckedB)) || (rebalancing && zapIn.priceSeverity > 3))

  const showReduceZapTokenButton =
    preferZapInstead && (zapIn.priceSeverity > 3 || zapIn.zapInEstimatedError) && maxAmounts[zapIn.swapTokenField]

  const showRebalancingConvert =
    !showZapWarning &&
    !noAnyInputAmount &&
    !showReduceZapTokenButton &&
    preferZapInstead &&
    zapIn.isDependentAmountGreaterThanMaxAmount &&
    rebalancing

  const showZapIsAvailable =
    !zapMode &&
    !showZapWarning &&
    !noAnyInputAmount &&
    (!zapTokenCheckedA || !zapTokenCheckedB) &&
    !noLiquidity &&
    !(
      (pair && JSBI.lessThan(pair.reserve0.quotient, MINIMUM_LIQUIDITY)) ||
      (pair && JSBI.lessThan(pair.reserve1.quotient, MINIMUM_LIQUIDITY))
    )
  return (
    <Page>
      <Flex
        width={['290px', , '100%']}
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
              <SwapbackgroundWrapper>
                <SwapbackgroundMobile />
              </SwapbackgroundWrapper>
              <SwapbackgroundNoneWrapper>
                <SwapbackgroundMobileNone />
              </SwapbackgroundNoneWrapper>
              <SwapbackgroundNone2Wrapper>
                <SwapbackgroundMobileNone2 />
              </SwapbackgroundNone2Wrapper>
            </>
          ) : (
            <>
              <SwapbackgroundWrapper>
                <SwapbackgroundDesktop />
              </SwapbackgroundWrapper>
              <SwapbackgroundNoneWrapper>
                <SwapbackgroundDesktopNone />
              </SwapbackgroundNoneWrapper>
              <SwapbackgroundNone2Wrapper>
                <SwapbackgroundDesktopNone2 />
              </SwapbackgroundNone2Wrapper>
            </>
          )}

          <LiquidityBody>
            <AppHeader
              title={
                currencies[Field.CURRENCY_A]?.symbol && currencies[Field.CURRENCY_B]?.symbol
                  ? `${getLPSymbol(currencies[Field.CURRENCY_A].symbol, currencies[Field.CURRENCY_B].symbol, chainId)}`
                  : t('Add Liquidity')
              }
              subtitle={`Receive LP tokens and earn ${chainId === 5 || chainId === 1 ? 0.3 : 0.25}% trading fees`}
              helper={t(
                `Liquidity providers earn a ${
                  chainId === 5 || chainId === 1 ? 0.3 : 0.25
                }% trading fee on all trades made for that token pair, proportional to their share of the liquidity pool.`,
              )}
              backTo="/liquidity"
            />
            <CardBody p={['18px 0', , '24px 0']}>
              <AutoColumn gap="16px">
                {noLiquidity && (
                  <ColumnCenter>
                    <Message variant="warning">
                      <div>
                        <Text bold mb="8px">
                          {t('You are the first liquidity provider.')}
                        </Text>
                        <Text mb="8px">{t('The ratio of tokens you add will set the price of this pool.')}</Text>
                        <Text>{t('Once you are happy with the rate click supply to review.')}</Text>
                      </div>
                    </Message>
                  </ColumnCenter>
                )}
                <CurrencyInputPanel
                  showBUSD
                  onInputBlur={canZap ? zapIn.onInputBlurOnce : undefined}
                  error={zapIn.priceSeverity > 3 && zapIn.swapTokenField === Field.CURRENCY_A}
                  // disabled={canZap && !zapTokenCheckedA}
                  // beforeButton={
                  //   canZap && (
                  //     <ZapCheckbox
                  //       disabled={currencyBalances?.[Field.CURRENCY_A]?.equalTo(0)}
                  //       checked={zapTokenCheckedA}
                  //       onChange={(e) => {
                  //         setZapTokenToggleA(e.target.checked)
                  //       }}
                  //     />
                  //   )
                  // }
                  onCurrencySelect={handleCurrencyASelect}
                  // zapStyle={canZap ? 'zap' : 'noZap'}
                  value={formattedAmounts[Field.CURRENCY_A]}
                  onUserInput={onFieldAInput}
                  onPercentInput={(percent) => {
                    if (maxAmounts[Field.CURRENCY_A]) {
                      onFieldAInput(maxAmounts[Field.CURRENCY_A]?.multiply(new Percent(percent, 100)).toExact() ?? '')
                    }
                  }}
                  showQuickInputButton
                  showMaxButton
                  currency={currencies[Field.CURRENCY_A]}
                  id="add-liquidity-input-tokena"
                  showCommonBases
                  commonBasesType={CommonBasesType.LIQUIDITY}
                  disableCurrencySelect
                />
                <ColumnCenter>
                  <AddIcon width="16px" />
                </ColumnCenter>
                <CurrencyInputPanel
                  showBUSD
                  // onInputBlur={canZap ? zapIn.onInputBlurOnce : undefined}
                  // disabled={canZap && !zapTokenCheckedB}
                  error={zapIn.priceSeverity > 3 && zapIn.swapTokenField === Field.CURRENCY_B}
                  // beforeButton={
                  //   canZap && (
                  //     <ZapCheckbox
                  //       disabled={currencyBalances?.[Field.CURRENCY_B]?.equalTo(0)}
                  //       checked={zapTokenCheckedB}
                  //       onChange={(e) => {
                  //         setZapTokenToggleB(e.target.checked)
                  //       }}
                  //     />
                  //   )
                  // }
                  onCurrencySelect={handleCurrencyBSelect}
                  // zapStyle={canZap ? 'zap' : 'noZap'}
                  value={formattedAmounts[Field.CURRENCY_B]}
                  onUserInput={onFieldBInput}
                  onPercentInput={(percent) => {
                    if (maxAmounts[Field.CURRENCY_B]) {
                      onFieldBInput(maxAmounts[Field.CURRENCY_B]?.multiply(new Percent(percent, 100)).toExact() ?? '')
                    }
                  }}
                  showQuickInputButton
                  showMaxButton
                  currency={currencies[Field.CURRENCY_B]}
                  id="add-liquidity-input-tokenb"
                  showCommonBases
                  commonBasesType={CommonBasesType.LIQUIDITY}
                  disableCurrencySelect
                />

                {showZapWarning && (
                  <Message variant={zapIn.priceSeverity > 3 ? 'danger' : 'warning'}>
                    {zapIn.priceSeverity > 3 ? (
                      <MessageText>
                        {t('Price Impact Too High.')}{' '}
                        <strong>
                          {t('Reduce amount of %token% to maximum limit', {
                            token: currencies[zapIn.swapTokenField]?.symbol,
                          })}
                        </strong>
                      </MessageText>
                    ) : (
                      <MessageText>
                        <strong>
                          {t('No %token% input.', { token: currencies[zapIn.swapOutTokenField]?.symbol })}
                        </strong>{' '}
                        {t('Some of your %token0% will be converted to %token1%.', {
                          token0: currencies[zapIn.swapTokenField]?.symbol,
                          token1: currencies[zapIn.swapOutTokenField]?.symbol,
                        })}
                      </MessageText>
                    )}
                  </Message>
                )}

                {showReduceZapTokenButton && (
                  <RowFixed style={{ margin: 'auto' }} onClick={() => zapIn.convertToMaxZappable()}>
                    <Button variant="secondary" scale="sm">
                      {t('Reduce %token%', { token: currencies[zapIn.swapTokenField]?.symbol })}
                    </Button>
                  </RowFixed>
                )}

                {showZapIsAvailable && (
                  <Message variant="warning">
                    <MessageText>
                      {t('Zap allows you to add liquidity with only 1 single token. Click')}
                      <Button p="0 4px" scale="sm" variant="text" height="auto" onClick={handleEnableZap}>
                        {t('here')}
                      </Button>
                      {t('to try.')}
                    </MessageText>
                  </Message>
                )}

                {showRebalancingConvert && (
                  <Message variant="warning">
                    <AutoColumn>
                      <MessageText>
                        <strong>
                          {t('Not enough %token%.', { token: currencies[zapIn.swapOutTokenField]?.symbol })}
                        </strong>{' '}
                        {zapIn.gasOverhead
                          ? t(
                              'Some of your %token0% will be converted to %token1% before adding liquidity, but this may cause higher gas fees.',
                              {
                                token0: currencies[zapIn.swapTokenField]?.symbol,
                                token1: currencies[zapIn.swapOutTokenField]?.symbol,
                              },
                            )
                          : t('Some of your %token0% will be converted to %token1%.', {
                              token0: currencies[zapIn.swapTokenField]?.symbol,
                              token1: currencies[zapIn.swapOutTokenField]?.symbol,
                            })}
                      </MessageText>
                    </AutoColumn>
                  </Message>
                )}

                {showRebalancingConvert && (
                  <RowFixed
                    style={{ margin: 'auto' }}
                    onClick={() => {
                      if (dependentField === Field.CURRENCY_A) {
                        onFieldAInput(maxAmounts[dependentField]?.toExact() ?? '')
                      } else {
                        onFieldBInput(maxAmounts[dependentField]?.toExact() ?? '')
                      }
                    }}
                  >
                    <Button variant="secondary" scale="sm">
                      {t('Don’t convert')}
                    </Button>
                  </RowFixed>
                )}

                {/* {currencies[Field.CURRENCY_A] && currencies[Field.CURRENCY_B] && pairState !== PairState.INVALID && (
                  <>
                    <LightCard padding="0px" borderRadius="20px">
                      <RowBetween padding="1rem">
                        <Text fontSize="14px">
                          {noLiquidity ? t('Initial prices and pool share') : t('Prices and pool share')}
                        </Text>
                      </RowBetween>{' '}
                      <LightCard padding="1rem" borderRadius="20px">
                        <PoolPriceBar
                          currencies={currencies}
                          poolTokenPercentage={preferZapInstead ? zapIn.poolTokenPercentage : poolTokenPercentage}
                          noLiquidity={noLiquidity}
                          price={price}
                        />
                      </LightCard>
                    </LightCard>
                  </>
                )} */}

                <Text className="text-share">Price and pool share</Text>

                {currencies[Field.CURRENCY_A] && currencies[Field.CURRENCY_B] && price && (
                  <>
                    <CustomRowBetween>
                      <Text className="text-left">{`${currencies[Field.CURRENCY_A]?.symbol} per ${
                        currencies[Field.CURRENCY_B]?.symbol
                      }`}</Text>
                      <Text className="text-right">{formatAmountString(price.invert(), 6)}</Text>
                    </CustomRowBetween>

                    <CustomRowBetween>
                      <Text className="text-left">{`${currencies[Field.CURRENCY_B]?.symbol} per ${
                        currencies[Field.CURRENCY_A]?.symbol
                      }`}</Text>
                      <Text className="text-right">{formatAmountString(price, 6)}</Text>
                    </CustomRowBetween>
                  </>
                )}

                <CustomRowBetween>
                  <Text className="text-left">{t('Share of Pool')}</Text>
                  <Text className="text-right">
                    {poolTokenPercentage
                      ? parseFloat(poolTokenPercentage.toFixed(6)) >= 0.01
                        ? `${formatAmountString(poolTokenPercentage)}%`
                        : '< 0.01%'
                      : '0%'}
                  </Text>
                </CustomRowBetween>

                <CustomRowBetween>
                  <Text className="text-left slippage">{t('Slippage Tolerance')}</Text>
                  <Text className="text-right purple">{allowedSlippage / 100}%</Text>
                </CustomRowBetween>

                {pair && poolData && (
                  <CustomRowBetween>
                    <TooltipText ref={targetRef} bold fontSize="12px" color="secondary">
                      {t('LP reward APR')}
                    </TooltipText>
                    {tooltipVisible && tooltip}
                    <Text className="text-right">{formatAmount(poolData.lpApr7d)}%</Text>
                  </CustomRowBetween>
                )}

                {addIsUnsupported || addIsWarning ? (
                  <Button disabled mb="4px">
                    {t('Unsupported Asset')}
                  </Button>
                ) : !account ? (
                  <ConnectWalletButton />
                ) : isWrongNetwork ? (
                  <CommitButton />
                ) : (
                  <AutoColumn gap="md">
                    {shouldShowApprovalGroup && (
                      <RowBetween style={{ gap: '8px' }}>
                        {showFieldAApproval && (
                          <Button
                            onClick={approveACallback}
                            disabled={approvalA === ApprovalState.PENDING}
                            width="100%"
                          >
                            {approvalA === ApprovalState.PENDING ? (
                              <Dots>{t('Enabling %asset%', { asset: currencies[Field.CURRENCY_A]?.symbol })}</Dots>
                            ) : (
                              t('Enable %asset%', { asset: currencies[Field.CURRENCY_A]?.symbol })
                            )}
                          </Button>
                        )}
                        {showFieldBApproval && (
                          <Button
                            onClick={approveBCallback}
                            disabled={approvalB === ApprovalState.PENDING}
                            width="100%"
                          >
                            {approvalB === ApprovalState.PENDING ? (
                              <Dots>{t('Enabling %asset%', { asset: currencies[Field.CURRENCY_B]?.symbol })}</Dots>
                            ) : (
                              t('Enable %asset%', { asset: currencies[Field.CURRENCY_B]?.symbol })
                            )}
                          </Button>
                        )}
                      </RowBetween>
                    )}
                    <CommitButton
                      isLoading={preferZapInstead && zapInEstimating}
                      variant={!isValid || zapIn.priceSeverity > 2 ? 'danger' : 'primary'}
                      onClick={() => {
                        if (preferZapInstead) {
                          setLiquidityState({
                            attemptingTxn: false,
                            liquidityErrorMessage: undefined,
                            txHash: undefined,
                          })
                          onPresentZapInModal()
                          return
                        }
                        if (expertMode) {
                          onAdd()
                        } else {
                          setLiquidityState({
                            attemptingTxn: false,
                            liquidityErrorMessage: undefined,
                            txHash: undefined,
                          })
                          onPresentAddLiquidityModal()
                        }
                      }}
                      disabled={buttonDisabled}
                    >
                      {errorText || t('Supply')}
                    </CommitButton>
                  </AutoColumn>
                )}
              </AutoColumn>

              {pair ? (
                <AutoColumn style={{ width: '100%', marginTop: '24px' }}>
                  <MinimalPositionCard showUnwrapped={oneCurrencyIsWNATIVE} pair={pair} />
                </AutoColumn>
              ) : null}
            </CardBody>
          </LiquidityBody>
        </Wrapper>
      </Flex>

      {/* {!(addIsUnsupported || addIsWarning) ? (
        pair && !noLiquidity && pairState !== PairState.INVALID ? (
          <AutoColumn style={{ minWidth: '20rem', width: '100%', maxWidth: '400px', marginTop: '1rem' }}>
            <MinimalPositionCard showUnwrapped={oneCurrencyIsWNATIVE} pair={pair} />
          </AutoColumn>
        ) : null
      ) : (
        <UnsupportedCurrencyFooter currencies={[currencies.CURRENCY_A, currencies.CURRENCY_B]} />
      )} */}
    </Page>
  )
}
