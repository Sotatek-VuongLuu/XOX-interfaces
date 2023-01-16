import { useState } from 'react'
import styled from 'styled-components'
import { Trade, TradeType, CurrencyAmount, Currency } from '@pancakeswap/sdk'
import { Button, Text, QuestionHelper } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { Field } from 'state/swap/actions'
import CircleRefresh from 'components/Svg/CircleRefresh'
import { computeTradePriceBreakdown, formatExecutionPrice, warningSeverity } from 'utils/exchange'
import { AutoColumn } from 'components/Layout/Column'
import { AutoRow, RowBetween, RowFixed } from 'components/Layout/Row'
import { useActiveChainId } from 'hooks/useActiveChainId'
import FormattedPriceImpact from './FormattedPriceImpact'
import { SwapCallbackError } from './styleds'

const SwapModalFooterContainer = styled(AutoColumn)`
  margin-top: 24px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background-color: ${({ theme }) => theme.colors.dark3};
`
const CircleBox = styled.div`
  cursor: pointer;
`

export default function SwapModalFooter({
  trade,
  slippageAdjustedAmounts,
  isEnoughInputBalance,
  onConfirm,
  swapErrorMessage,
  disabledConfirm,
}: {
  trade: Trade<Currency, Currency, TradeType>
  slippageAdjustedAmounts: { [field in Field]?: CurrencyAmount<Currency> }
  isEnoughInputBalance: boolean
  onConfirm: () => void
  swapErrorMessage?: string | undefined
  disabledConfirm: boolean
}) {
  const { t } = useTranslation()
  const { chainId } = useActiveChainId()
  const [showInverted, setShowInverted] = useState<boolean>(false)
  // const { priceImpactWithoutFee, realizedLPFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const severity = warningSeverity(priceImpactWithoutFee)

  const totalFeePercent = chainId === 1 || chainId === 5 ? '0.3%' : '0.25%'

  return (
    <>
      <SwapModalFooterContainer>
        <RowBetween align="center">
          <Text fontSize="16px" color="textSubtle">
            {t('Price')}
          </Text>
          <Text
            fontSize="16px"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              textAlign: 'right',
              paddingLeft: '10px',
            }}
          >
            {formatExecutionPrice(trade, showInverted)}
            <CircleBox onClick={() => setShowInverted(!showInverted)}>
              <CircleRefresh />
            </CircleBox>
          </Text>
        </RowBetween>

        <RowBetween>
          <RowFixed>
            <Text fontSize="16px" color="textSubtle">
              {trade.tradeType === TradeType.EXACT_INPUT ? t('Minimum received') : t('Maximum sold')}
            </Text>
            <QuestionHelper
              text={t(
                'Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.',
              )}
              ml="4px"
              placement="auto"
            />
          </RowFixed>
          <RowFixed>
            <Text fontSize="16px">
              {trade.tradeType === TradeType.EXACT_INPUT
                ? slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4) ?? '-'
                : slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4) ?? '-'}
            </Text>
            <Text fontSize="16px" marginLeft="4px">
              {trade.tradeType === TradeType.EXACT_INPUT
                ? trade.outputAmount.currency.symbol
                : trade.inputAmount.currency.symbol}
            </Text>
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <Text fontSize="16px" color="textSubtle">
              {t('Price Impact')}
            </Text>
            <QuestionHelper
              text={t('The difference between the market price and your price due to trade size.')}
              ml="4px"
              placement="auto"
            />
          </RowFixed>
          <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <Text fontSize="16px" color="textSubtle">
              {t('Liquidity Provider Fee')}
            </Text>
            <QuestionHelper
              text={
                <>
                  <Text mb="12px">{t('For each trade a %amount% fee is paid', { amount: totalFeePercent })}</Text>
                </>
              }
              ml="4px"
              placement="auto"
            />
          </RowFixed>
          <Text fontSize="16px">
            {realizedLPFee ? `${realizedLPFee?.toSignificant(6)} ${trade.inputAmount.currency.symbol}` : '-'}
          </Text>
        </RowBetween>
      </SwapModalFooterContainer>

      <AutoRow>
        <Button
          variant={severity > 2 ? 'danger' : 'primary'}
          onClick={onConfirm}
          disabled={disabledConfirm}
          mt="12px"
          id="confirm-swap-or-send"
          width="100%"
        >
          {severity > 2 || (trade.tradeType === TradeType.EXACT_OUTPUT && !isEnoughInputBalance)
            ? t('Swap Anyway')
            : t('Confirm Swap')}
        </Button>

        {swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
      </AutoRow>
    </>
  )
}
