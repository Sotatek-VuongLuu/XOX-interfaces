import { useMemo } from 'react'
import { Trade, TradeType, CurrencyAmount, Currency } from '@pancakeswap/sdk'
import { Button, Text, ErrorIcon, ArrowDownIcon } from '@pancakeswap/uikit'
import { Field } from 'state/swap/actions'
import { useTranslation } from '@pancakeswap/localization'
import { computeTradePriceBreakdown, warningSeverity } from 'utils/exchange'
import { AutoColumn } from 'components/Layout/Column'
import styled from 'styled-components'
import { CurrencyLogo } from 'components/Logo'
import { RowBetween, RowFixed } from 'components/Layout/Row'
import truncateHash from '@pancakeswap/utils/truncateHash'
import { TruncatedText, SwapShowAcceptChanges } from './styleds'

const RowPrice = styled(RowBetween)`
  background: #1d1c1c;
  padding: 24px 17px;
  border-radius: 10px;
  width: 100%;
  @media (max-width: 574px) {
    padding: 16px;
    margin-bottom: 0;
  }
`
export default function SwapModalHeader({
  trade,
  slippageAdjustedAmounts,
  isEnoughInputBalance,
  recipient,
  showAcceptChanges,
  onAcceptChanges,
  allowedSlippage,
}: {
  trade: Trade<Currency, Currency, TradeType>
  slippageAdjustedAmounts: { [field in Field]?: CurrencyAmount<Currency> }
  isEnoughInputBalance: boolean
  recipient: string | null
  showAcceptChanges: boolean
  onAcceptChanges: () => void
  allowedSlippage: number
}) {
  const { t } = useTranslation()

  // const { priceImpactWithoutFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  const inputTextColor =
    showAcceptChanges && trade.tradeType === TradeType.EXACT_OUTPUT && isEnoughInputBalance
      ? 'primary'
      : trade.tradeType === TradeType.EXACT_OUTPUT && !isEnoughInputBalance
      ? 'failure'
      : 'text'

  const amount =
    trade.tradeType === TradeType.EXACT_INPUT
      ? slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(6)
      : slippageAdjustedAmounts[Field.INPUT]?.toSignificant(6)
  const symbol =
    trade.tradeType === TradeType.EXACT_INPUT ? trade.outputAmount.currency.symbol : trade.inputAmount.currency.symbol

  const tradeInfoText =
    trade.tradeType === TradeType.EXACT_INPUT
      ? t('Output is estimated. You will receive at least or the transaction will revert.')
      : t('Input is estimated. You will sell at most or the transaction will revert.')

  const [estimatedText, transactionRevertText] = tradeInfoText.split(`${amount} ${symbol}`)

  const truncatedRecipient = recipient ? truncateHash(recipient) : ''

  const recipientInfoText = t('Output will be sent to %recipient%', {
    recipient: truncatedRecipient,
  })

  const [recipientSentToText, postSentToText] = recipientInfoText.split(truncatedRecipient)

  return (
    <AutoColumn gap="md">
      <RowPrice align="flex-end">
        <RowFixed gap="4px">
          <TruncatedText fontSize="18px" color={inputTextColor}>
            {trade.inputAmount.toSignificant(6)}
          </TruncatedText>
        </RowFixed>
        <RowFixed gap="4px">
          <CurrencyLogo currency={trade.inputAmount.currency} size="18px" />
          <Text fontSize="18px">{trade.inputAmount.currency.symbol}</Text>
        </RowFixed>
      </RowPrice>
      <RowFixed style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <ArrowDownIcon width="16px" ml="4px" />
      </RowFixed>
      <RowPrice align="flex-end">
        <RowFixed gap="4px">
          <TruncatedText
            fontSize="18px"
            color={
              priceImpactSeverity > 2
                ? 'failure'
                : showAcceptChanges && trade.tradeType === TradeType.EXACT_INPUT
                ? 'primary'
                : 'text'
            }
          >
            {trade.outputAmount.toSignificant(6)}
          </TruncatedText>
        </RowFixed>
        <RowFixed gap="4px">
          <CurrencyLogo currency={trade.outputAmount.currency} size="18px" />
          <Text fontSize="18px">{trade.outputAmount.currency.symbol}</Text>
        </RowFixed>
      </RowPrice>
      {showAcceptChanges ? (
        <SwapShowAcceptChanges justify="flex-start" gap="0px">
          <RowBetween style={{ marginBottom: '0' }}>
            <RowFixed>
              <ErrorIcon mr="8px" />
              <Text bold> {t('Price Updated')}</Text>
            </RowFixed>
            <Button onClick={onAcceptChanges}>{t('Accept')}</Button>
          </RowBetween>
        </SwapShowAcceptChanges>
      ) : null}
      <AutoColumn justify="flex-start" gap="sm">
        <RowFixed style={{ width: '100%' }}>
          <Text style={{ color: '#FFFFFFDE', fontSize: '18px' }}>{t('Slippage Tolerance')}</Text>
          <Text bold color="#FB8618" ml="auto" textAlign="end" style={{ fontSize: '18px' }}>
            {`${allowedSlippage / 100}%`}
          </Text>
        </RowFixed>
        {trade.tradeType === TradeType.EXACT_OUTPUT && !isEnoughInputBalance && (
          <Text small color="failure" textAlign="left" style={{ width: '100%' }}>
            {t('Insufficient input token balance. Your transaction may fail.')}
          </Text>
        )}
        <Text small color="textSubtle" textAlign="left" style={{ width: '100%' }}>
          {estimatedText}
          {transactionRevertText}
        </Text>
      </AutoColumn>
      {recipient !== null ? (
        <AutoColumn justify="flex-start" gap="sm" style={{ padding: '12px 0 0 0px' }}>
          <Text color="textSubtle">
            {recipientSentToText}
            <b title={recipient}>{truncatedRecipient}</b>
            {postSentToText}
          </Text>
        </AutoColumn>
      ) : null}
    </AutoColumn>
  )
}
