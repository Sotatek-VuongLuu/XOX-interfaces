import { Currency, Pair } from '@pancakeswap/sdk'
import {
  Button,
  ChevronDownIcon,
  Text,
  useModal,
  Flex,
  Box,
  NumericalInput,
  CopyButton,
  useMatchBreakpoints,
} from '@pancakeswap/uikit'
import styled, { css } from 'styled-components'
import { isAddress } from 'utils'
import { useTranslation } from '@pancakeswap/localization'
import { WrappedTokenInfo } from '@pancakeswap/token-lists'

import { useBUSDCurrencyAmount } from 'hooks/useBUSDPrice'
import { formatNumber } from '@pancakeswap/utils/formatBalance'
import { StablePair } from 'views/AddLiquidity/AddStableLiquidity/hooks/useStableLPDerivedMintInfo'

import { useAccount } from 'wagmi'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo'

import AddToWalletButton from '../AddToWallet/AddToWalletButton'

const ForDolar = styled.div`
  position: absolute;
  left: 17px;
  bottom: 40px;
`
const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: start;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
  position: absolute;
  bottom: 0;
`
const PercentButton = styled(Button)`
  background: unset;
  border: 1px solid #9072ff;
  padding: 6px 16px;
  color: #9072ff;
  font-size: 12px;
  font-weight: 700;
  height: 27px;
  border-radius: 30px;
`
const TextBalance = styled.div`
  position:absolute;
  right:17px;
  top 17px;
  z-index:99;
  font-size:14px;
  font-weight:400;
  line-height:17px;
  color:#FFFFFF99;
`
const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })<{ zapStyle?: ZapStyle }>`
  padding: 0;
  position: absolute;
  z-index: 99;
  right: 17px;
  background: unset;

  &:hover {
    background: unset !important;
  }
  ${({ zapStyle, theme }) =>
    zapStyle &&
    css`
      padding: 8px;
      background: ${theme.colors.background};
      border: 1px solid ${theme.colors.cardBorder};
      border-radius: ${zapStyle === 'zap' ? '0px' : '8px'} 8px 0px 0px;
      height: auto;
      position: absolute;
      right: 0;
    `};
`
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 15px 1rem 0 1rem;
`
const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  z-index: 1;
`
const Container = styled.div<{ zapStyle?: ZapStyle; error?: boolean }>`
  border-radius: 10px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.dark3};
  box-shadow: ${({ theme, error }) => theme.shadows[error ? 'warning' : 'inset']};
  ${({ zapStyle }) =>
    !!zapStyle &&
    css`
      border-radius: 0px 10px 10px 10px;
    `};
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.6;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`

const NumericalInputWrapper = styled(NumericalInput)`
  padding-right: 120px;
  font-size: 18px;
  @media screen and (max-width: 576px) {
    font-size: 16px;
  }
`

type ZapStyle = 'noZap' | 'zap'

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onInputBlur?: () => void
  onPercentInput?: (percent: number) => void
  onMax?: () => void
  showQuickInputButton?: boolean
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | StablePair | null
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
  commonBasesType?: string
  zapStyle?: ZapStyle
  beforeButton?: React.ReactNode
  disabled?: boolean
  error?: boolean
  showBUSD?: boolean
}
export default function CurrencyInputPanel({
  value,
  onUserInput,
  onInputBlur,
  onPercentInput,
  onMax,
  showQuickInputButton = false,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  zapStyle,
  beforeButton,
  pair = null, // used for double token logo
  otherCurrency,
  id,
  showCommonBases,
  commonBasesType,
  disabled,
  error,
  showBUSD,
}: CurrencyInputPanelProps) {
  const { address: account } = useAccount()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const token = pair ? pair.liquidityToken : currency?.isToken ? currency : null
  const tokenAddress = token ? isAddress(token.address) : null

  const amountInDollar = useBUSDCurrencyAmount(
    showBUSD ? currency : undefined,
    Number.isFinite(+value) ? +value : undefined,
  )

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
      commonBasesType={commonBasesType}
    />,
  )
  const isShowPercent = account && currency && selectedCurrencyBalance?.greaterThan(0) && !disabled && label !== 'To'
  const isShowDolar = !!currency && showBUSD && Number.isFinite(amountInDollar)
  const checkHeightInput = () => {
    let height
    if (isMobile) {
      if (account) {
        height = '112px'
        if (isShowPercent) {
          height = '122px'
        } 
      }else {
        height = '52px'
      }
    } else if (isShowDolar && isShowPercent) {
      height = '128px'
    } else {
      height = '95px'
    }
    return height
  }
  return (
    <Box position="relative" id={id}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex>
          {beforeButton}

          {/* {token && tokenAddress ? (
            <Flex style={{ gap: '4px' }} ml="4px" alignItems="center">
              <CopyButton
                width="16px"
                buttonColor="textSubtle"
                text={tokenAddress}
                tooltipMessage={t('Token address copied')}
              />
              <AddToWalletButton
                variant="text"
                p="0"
                height="auto"
                width="fit-content"
                tokenAddress={tokenAddress}
                tokenSymbol={token.symbol}
                tokenDecimals={token.decimals}
                tokenLogo={token instanceof WrappedTokenInfo ? token.logoURI : undefined}
              />
            </Flex>
          ) : null} */}
        </Flex>
      </Flex>
      <InputPanel>
        {account && (
          <TextBalance
            onClick={!disabled && onMax}
            color="textSubtle"
            // fontSize="14px"
            style={{ display: 'inline', cursor: 'pointer' }}
          >
            {!hideBalance && !!currency
              ? t('Balance: %balance%', { balance: selectedCurrencyBalance?.toSignificant(6) ?? t('Loading') })
              : ' -'}
          </TextBalance>
        )}
        <Container as="label" zapStyle={zapStyle} error={error} style={{ height: checkHeightInput() }}>
          <LabelRow>
            <NumericalInputWrapper
              error={error}
              disabled={disabled}
              className="token-amount-input"
              value={value}
              onBlur={onInputBlur}
              onUserInput={(val) => {
                onUserInput(val)
              }}
              // style={
              //   isShowPercent && isShowDolar
              //     ? { marginTop: '-70px' }
              //     : isShowPercent
              //     ? { marginTop: '-36px' }
              //     : isShowDolar
              //     ? { marginTop: '-36px' }
              //     : { marginTop: '-10px' }
              // }
            />
          </LabelRow>
          {isShowDolar && (
            <ForDolar style={isShowPercent ? { bottom: '58px' } : { bottom: '22px' }}>
              <Flex justifyContent="flex-end" mr="1rem">
                <Flex maxWidth="200px">
                  <Text fontSize="12px" color="textSubtle">
                    ~{formatNumber(amountInDollar)} USD
                  </Text>
                </Flex>
              </Flex>
            </ForDolar>
          )}
          <InputRow selected={disableCurrencySelect} style={{ paddingBottom: 15}}>
            {isShowPercent && (
              <Flex alignItems="center" justifyContent="start">
                {showQuickInputButton &&
                  onPercentInput &&
                  [25, 50, 75].map((percent) => (
                    <PercentButton
                      key={`btn_quickCurrency${percent}`}
                      onClick={() => {
                        onPercentInput(percent)
                      }}
                      scale="xs"
                      mr="5px"
                      variant="secondary"
                      style={{ textTransform: 'uppercase' }}
                    >
                      {percent}%
                    </PercentButton>
                  ))}
                {showMaxButton && (
                  <PercentButton
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      onMax?.()
                    }}
                    scale="xs"
                    variant="secondary"
                    style={{ textTransform: 'uppercase' }}
                  >
                    {t('Max')}
                  </PercentButton>
                )}
              </Flex>
            )}
          </InputRow>
          <CurrencySelectButton
            // style={isMobile && !account?{top:'23%'}:isShowPercent?{top:'60%'}: {top:'45%'}}
            style={{bottom: (isMobile && isShowPercent) ? 50 : 15}}
            className="open-currency-select-button"
            selected={!!currency}
            onClick={() => {
              if (!disableCurrencySelect) {
                onPresentCurrencyModal()
              }
            }}
          >
            <Flex alignItems="center" justifyContent="space-between">
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
              ) : currency ? (
                <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
              ) : null}
              {pair ? (
                <Text id="pair" bold>
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </Text>
              ) : (
                <Text id="pair" bold>
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                        currency.symbol.length - 5,
                        currency.symbol.length,
                      )}`
                    : currency?.symbol) || t('Select a currency')}
                </Text>
              )}
              {!disableCurrencySelect && <ChevronDownIcon />}
            </Flex>
          </CurrencySelectButton>
        </Container>
        {disabled && <Overlay />}
      </InputPanel>
    </Box>
  )
}
