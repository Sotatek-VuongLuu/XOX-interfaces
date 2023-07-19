import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { Currency, CurrencyAmount } from '@pancakeswap/swap-sdk-core'
import { CircleLoader, useMatchBreakpoints, useModal, useToast } from '@pancakeswap/uikit'
import { CommitButton } from 'components/CommitButton'
import { AutoRow } from 'components/Layout/Row'
import { ApprovalState } from 'hooks/useApproveCallback'
import { parseEther, parseUnits } from '@ethersproject/units'
import ConfirmKyberSwapModal from './ConfirmKyberSwapModal'
import useKyberswap from 'hooks/useKyberswap'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useSigner } from 'wagmi'
import { ToastDescriptionWithTx } from 'components/Toast'
import ConnectWalletButton from 'components/ConnectWalletButton'

type Props = {
  approval: ApprovalState
  currencyIn: Currency
  currencyOut: Currency
  balance: CurrencyAmount<Currency>
  tokenInImgUrl: string
  tokenOutImgUrl: string
  tokenInAmount: string
  summary: any
  allowedSlippage: number
  recipient: string | null
  routerAddress: string
  fullRoute: any
  attemptingTxn: boolean
  setAttemptingTxn: (b: boolean) => void
  approveCallback: () => Promise<void>
}
const SwapButton = ({
  approval,
  currencyIn,
  currencyOut,
  balance,
  tokenInImgUrl,
  tokenOutImgUrl,
  tokenInAmount,
  summary,
  allowedSlippage,
  recipient,
  routerAddress,
  fullRoute,
  attemptingTxn,
  setAttemptingTxn,
  approveCallback,
}: Props) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { chainId } = useActiveChainId()
  const { account } = useActiveWeb3React()
  const { buildSwap, data } = useKyberswap({
    fullRoute,
    slippage: allowedSlippage,
    chainId,
    account,
  })
  const { toastSuccess, toastError } = useToast()
  const { data: signer } = useSigner()
  const [transaction, setTransaction] = useState<any>()

  const onSwap = useCallback(async () => {
    if (!data || attemptingTxn) return
    setAttemptingTxn(true)
    let transaction = {
      to: routerAddress,
      data: data,
    }
    if (currencyIn.isNative) {
      transaction['value'] = summary.amountIn
    }
    try {
      // const estimatedGasLimit = await signer.estimateGas(transaction)
      const transactionResponse = await signer.sendTransaction(transaction)
      toastSuccess(t('Transaction has succeeded!'), <ToastDescriptionWithTx txHash={transactionResponse.hash} />)
      setTransaction(transactionResponse)
    } catch (error) {
      setTransaction({ swapErrorMessage: error })
      console.log(error)
      toastError(t('Error'), t('Transaction failed'))
    }
    setAttemptingTxn(false)
  }, [data, account, tokenInAmount, currencyIn, data])

  const onDismiss = useCallback(() => {
    setTransaction(undefined)
  }, [])

  const [onPresentConfirmModal] = useModal(
    <ConfirmKyberSwapModal
      currencyIn={currencyIn}
      currencyOut={currencyOut}
      tokenInImgUrl={tokenInImgUrl}
      tokenOutImgUrl={tokenOutImgUrl}
      tokenInAmount={tokenInAmount}
      summary={summary}
      allowedSlippage={allowedSlippage}
      recipient={recipient}
      routerAddress={routerAddress}
      attemptingTxn={attemptingTxn}
      txHash={transaction?.hash}
      swapErrorMessage={transaction?.swapErrorMessage}
      disabled={!data}
      onConfirm={onSwap}
      customOnDismiss={onDismiss}
    />,
    true,
    true,
    'confirmSwapModal',
  )

  const onSwapHandler = useCallback(() => {
    buildSwap()
    onPresentConfirmModal()
  }, [buildSwap])

  const isNotEnoughBalance = useMemo(() => {
    if (!tokenInAmount) return false

    return balance && parseEther(balance.toExact()).lt(parseEther(tokenInAmount))
  }, [balance, tokenInAmount])

  const isOverSlippage = () => {
    return allowedSlippage > 1999
  }

  return !account ? (
    <ConnectWalletButton width="100%" style={{ fontSize: isMobile ? '16px' : '18px', marginTop: '16px' }} />
  ) : isNotEnoughBalance ? (
    <CommitButton disabled width="100%" style={{ fontSize: isMobile ? '16px' : '18px' }}>
      {t('Insufficient Balance')}
    </CommitButton>
  ) : approval !== ApprovalState.APPROVED ? (
    <CommitButton
      variant={'primary'}
      onClick={approveCallback}
      disabled={process.env.NEXT_PUBLIC_TEST_MODE !== '1' || approval !== ApprovalState.NOT_APPROVED}
      width="100%"
      style={{ fontSize: isMobile ? '16px' : '18px' }}
    >
      {approval === ApprovalState.PENDING ? (
        <AutoRow gap="6px" justify="center">
          {t('Enabling')} <CircleLoader stroke="white" />
        </AutoRow>
      ) : (
        t('Enable %asset%', { asset: currencyIn?.symbol ?? '' })
      )}
    </CommitButton>
  ) : (
    <CommitButton
      onClick={() => {
        onSwapHandler()
      }}
      width="100%"
      id="swap-button"
      height={43}
      disabled={process.env.NEXT_PUBLIC_TEST_MODE !== '1' || isOverSlippage()}
      style={{ fontSize: isMobile ? '16px' : '18px' }}
    >
      {isOverSlippage() && !parseEther(tokenInAmount).isZero() ? t('Max slippage is 19.99') : t('Swap')}
    </CommitButton>
  )
}

export default SwapButton
