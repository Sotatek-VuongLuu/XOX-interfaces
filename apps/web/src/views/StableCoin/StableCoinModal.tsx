import React, { useCallback } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import TransactionConfirmationModal, { TransactionErrorContent } from 'components/TransactionConfirmationModal'
import _toNumber from 'lodash/toNumber'
import { roundingAmountNumber } from '@pancakeswap/utils/formatBalance'

const StableCoinModal = (props: any) => {
  const { onDismiss, isBUSD, amount, txHas, pending, withdrawErrorMessage } = props
  const { t } = useTranslation()

  console.log(withdrawErrorMessage)

  const confirmationContent = useCallback(
    () =>
      withdrawErrorMessage ? (
        <>
          <TransactionErrorContent message={withdrawErrorMessage} onDismiss={onDismiss} />
        </>
      ) : (
        <></>
      ),
    [withdrawErrorMessage, onDismiss],
  )

  return (
    <TransactionConfirmationModal
      title="Confirm Withdraw"
      content={confirmationContent}
      pendingText={
        <>
          Withdraw Amount ${roundingAmountNumber(amount, 6)}
          <br />
          You will receive: {`${roundingAmountNumber(amount * 0.99, 6)} ${isBUSD ? 'USDT' : 'USDC'}`}
          <br />
          Platform Fee: {`${roundingAmountNumber(amount * 0.01, 6)} ${isBUSD ? 'USDT' : 'USDC'}`}
        </>
      }
      attemptingTxn={pending}
      hash={txHas}
      onDismiss={onDismiss}
      iconGridLoader
    />
  )
}

export default StableCoinModal
