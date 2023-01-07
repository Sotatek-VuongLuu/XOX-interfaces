import { useTranslation } from '@pancakeswap/localization'
import { Currency } from '@pancakeswap/sdk'
import { AddIcon, Box, CardBody, CardFooter, Text, TooltipText, useTooltip, FlexGap } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { CommitButton } from 'components/CommitButton'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { CurrencySelect } from 'components/CurrencySelect'
import { RowBetween } from 'components/Layout/Row'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { usePair } from 'hooks/usePairs'
import { formatAmount } from 'utils/formatInfoNumbers'
import { useLPApr } from 'state/swap/useLPApr'
import { AppHeader } from '../../components/App'
import { CommonBasesType } from '../../components/SearchModal/types'
import { useCurrencySelectRoute } from './useCurrencySelectRoute'

const ChoosePairCardBody = styled(CardBody)`
  padding:24px 0;
`
const FlexCurrency = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-between;
  position:relative;
`
const PlusIcon = styled.div`
  position:absolute;
  top:10px;
  left:50%;
  z-index:99;
`
export function ChoosePair({
  currencyA,
  currencyB,
  error,
  onNext,
}: {
  currencyA?: Currency
  currencyB?: Currency
  error?: string
  onNext?: () => void
}) {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const isValid = !error
  const { handleCurrencyASelect, handleCurrencyBSelect } = useCurrencySelectRoute()
  const [, pair] = usePair(currencyA, currencyB)
  const poolData = useLPApr(pair)
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t(`Based on last 7 days' performance. Does not account for impermanent loss`),
    {
      placement: 'bottom',
    },
  )

  return (
    <>
      <AppHeader
        title={t('Add Liquidity')}
        subtitle={t('Receive LP tokens and earn 0.17% trading fees')}
        helper={t(
          'Liquidity providers earn a 0.17% trading fee on all trades made for that token pair, proportional to their share of the liquidity pool.',
        )}
        backTo="/liquidity"
      />
      <ChoosePairCardBody>
        <Box>
          <Text color="#ffffffde" size='18px' mb="24px">
            {t('Pool')}
          </Text>
          <FlexCurrency>
            <CurrencySelect
              id="add-liquidity-select-tokena"
              selectedCurrency={currencyA}
              onCurrencySelect={handleCurrencyASelect}
              showCommonBases
              commonBasesType={CommonBasesType.LIQUIDITY}
            />
            <PlusIcon><AddIcon color="textSubtle" /></PlusIcon>
            <CurrencySelect
              id="add-liquidity-select-tokenb"
              selectedCurrency={currencyB}
              onCurrencySelect={handleCurrencyBSelect}
              showCommonBases
              commonBasesType={CommonBasesType.LIQUIDITY}
            />
          </FlexCurrency>
          {pair && poolData && (
            <RowBetween mt="24px">
              <TooltipText ref={targetRef} bold fontSize="12px" color="secondary">
                {t('LP reward APR')}
              </TooltipText>
              {tooltipVisible && tooltip}
              <Text bold color="primary">
                {formatAmount(poolData.lpApr7d)}%
              </Text>
            </RowBetween>
          )}
        </Box>
      </ChoosePairCardBody>
      <CardFooter>
        {!account ? (
          <ConnectWalletButton width="100%" />
        ) : (
          <CommitButton
            data-test="choose-pair-next"
            width="100%"
            variant={!isValid ? 'danger' : 'primary'}
            onClick={onNext}
            disabled={!isValid}
          >
            {error ?? t('Add Liquidity')}
          </CommitButton>
        )}
      </CardFooter>
    </>
  )
}
