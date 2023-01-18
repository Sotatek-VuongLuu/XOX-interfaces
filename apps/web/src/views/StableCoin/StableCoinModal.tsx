import React, { useCallback } from 'react'
import { Currency, CurrencyAmount, Fraction, Percent, Token } from '@pancakeswap/sdk'
import { InjectedModalProps, Button } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import TransactionConfirmationModal, {
  ConfirmationModalContent,
  TransactionErrorContent,
} from 'components/TransactionConfirmationModal'
import { Field } from 'state/burn/actions'
import _toNumber from 'lodash/toNumber'

const StableCoinModal = (props: any) => {
    const {onDismiss, isBUSD, amount, txHas, pending, withdrawErrorMessage} = props;
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
      pendingText={`Withdraw ${amount} ${isBUSD ? 'BUSD' : 'USDC'}`}
      attemptingTxn={pending}
      hash={txHas}
      onDismiss={onDismiss}
      iconGridLoader
    />
  )
}

export default StableCoinModal
