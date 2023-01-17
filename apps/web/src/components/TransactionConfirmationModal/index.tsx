import { ReactElement, useCallback } from 'react'
import { ChainId, Currency, Token } from '@pancakeswap/sdk'
import styled from 'styled-components'
import {
  Button,
  Text,
  Flex,
  Box,
  Link,
  Modal,
  InjectedModalProps,
  ModalProps,
} from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import { WrappedTokenInfo } from '@pancakeswap/token-lists'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { GridLoader } from 'react-spinners'
import { AutoColumn, ColumnCenter } from '../Layout/Column'
import { getBlockExploreLink, getBlockExploreName } from '../../utils'
import AddToWalletButton, { AddToWalletTextOptions } from '../AddToWallet/AddToWalletButton'

const Wrapper = styled.div`
  width: 100%;
  min-width: 300px;

  .waiting {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
  }

  .pending {
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
  }

  .confirm {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.6);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    .waiting {
      font-size: 18px;
      line-height: 22px;
    }

    .pending {
      font-size: 14px;
      line-height: 17px;
    }
  }
`
const Section = styled(AutoColumn)``

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 0 0 24px 0;
`
const ButtonFooters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 37px;
  margin-bottom: 32px;
  width: 100%;
  button {
    min-width: 200px;
  }
  @media screen and (max-width: 500px) {
    button {
      min-width: unset;
    }
  }
`
const ConfirmImg = styled.div`
  max-width: 171px;
  max-height: 160px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
  }
`

function ConfirmationPendingContent({ pendingText, iconGridLoader }: { pendingText: string; iconGridLoader?: any }) {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <ConfirmedIcon>
        <GridLoader color="#9072FF" style={{ width: '51px', height: '51px' }} />
      </ConfirmedIcon>
      <AutoColumn gap="16px" justify="center">
        <Text className="waiting">{t('Waiting For Confirmation')}</Text>
        <AutoColumn gap="12px" justify="center">
          <Text className="pending">{pendingText}</Text>
        </AutoColumn>
        <Text className="confirm">{t('Confirm this transaction in your wallet.')}</Text>
      </AutoColumn>
    </Wrapper>
  )
}

export function TransactionSubmittedContent({
  onDismiss,
  chainId,
  hash,
  currencyToAdd,
}: {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
  currencyToAdd?: Currency | undefined
}) {
  const { t } = useTranslation()

  const token: Token | undefined = wrappedCurrency(currencyToAdd, chainId)

  return (
    <Wrapper>
      <Section>
        <ConfirmedIcon>
          <ConfirmImg>
            <img src="/images/swap/transaction-submited.png" alt="" />
          </ConfirmImg>
        </ConfirmedIcon>
        <AutoColumn gap="8px" justify="center">
          <Text fontSize="20px" lineHeight="24px">
            {t('Transaction Submitted')}
          </Text>
          {chainId && hash && (
            <Link
              external
              href={getBlockExploreLink(hash, 'transaction', chainId)}
              style={{ color: '#3D8AFF', fontWeight: 400, marginBottom: '16px' }}
            >
              {t('View on %site%', {
                site: getBlockExploreName(chainId),
              })}
            </Link>
          )}
          <ButtonFooters>
            <Button onClick={onDismiss} maxWidth="200px" style={{ height: '37px', background: '#313131' }}>
              {t('Close')}
            </Button>
            {currencyToAdd && (
              <AddToWalletButton
                variant="tertiary"
                maxWidth="200px"
                textOptions={AddToWalletTextOptions.TEXT_WITH_ASSET}
                tokenAddress={token.address}
                tokenSymbol={currencyToAdd.symbol}
                tokenDecimals={token.decimals}
                tokenLogo={token instanceof WrappedTokenInfo ? token.logoURI : undefined}
                style={{ fontSize: '15px', height: '37px', marginLeft: '16px' }}
              />
            )}
          </ButtonFooters>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export function ConfirmationModalContent({
  bottomContent,
  topContent,
}: {
  topContent: () => React.ReactNode
  bottomContent: () => React.ReactNode
}) {
  return (
    <Wrapper>
      <Box>{topContent()}</Box>
      <Box>{bottomContent()}</Box>
    </Wrapper>
  )
}

export function TransactionErrorContent({
  message,
  onDismiss,
}: {
  message: ReactElement | string
  onDismiss?: () => void
}) {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <AutoColumn justify="center">
        {/* <ErrorIcon color="failure" width="64px" /> */}
        <img alt="" src="/images/swap/icon-swap-error.svg" style={{ padding: '10px 0' }} />
        <Text color="failure" style={{ textAlign: 'center', width: '85%', wordBreak: 'break-word' }}>
          {message}
        </Text>
      </AutoColumn>

      {onDismiss ? (
        <Flex justifyContent="center" pt="24px" mb="32px">
          <Button onClick={onDismiss}>{t('Dismiss')}</Button>
        </Flex>
      ) : null}
    </Wrapper>
  )
}
export function TransactionSwapErrorContent({
  message,
  onDismiss,
}: {
  message: ReactElement | string
  onDismiss?: () => void
}) {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <AutoColumn justify="center">
        <img src="/images/swap/icon-swap-error.svg" alt="" />
        <Text
          color="failure"
          style={{ textAlign: 'center', width: '85%', marginTop: '24px', color: '#FFFFFF99', wordBreak: 'break-word' }}
        >
          {message}
        </Text>
      </AutoColumn>

      {onDismiss ? (
        <Flex justifyContent="center" pt="24px" mb="32px">
          <Button onClick={onDismiss}>{t('Dismiss')}</Button>
        </Flex>
      ) : null}
    </Wrapper>
  )
}
interface ConfirmationModalProps {
  title: string
  customOnDismiss?: () => void
  hash?: string | undefined
  content: () => React.ReactNode
  attemptingTxn: boolean
  pendingText: string
  currencyToAdd?: Currency | undefined
  iconGridLoader?: boolean
}

const TransactionConfirmationModal: React.FC<
  React.PropsWithChildren<InjectedModalProps & ConfirmationModalProps & ModalProps>
> = ({
  title,
  onDismiss,
  customOnDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  currencyToAdd,
  iconGridLoader,
  ...props
}) => {
  const { chainId } = useActiveChainId()
  const handleDismiss = useCallback(() => {
    if (customOnDismiss) {
      customOnDismiss()
    }
    onDismiss?.()
  }, [customOnDismiss, onDismiss])

  if (!chainId) return null

  return (
    <Modal title={title} {...props} onDismiss={handleDismiss}>
      {attemptingTxn ? (
        <ConfirmationPendingContent pendingText={pendingText} iconGridLoader={iconGridLoader} />
      ) : hash ? (
        <TransactionSubmittedContent
          chainId={chainId}
          hash={hash}
          onDismiss={handleDismiss}
          currencyToAdd={currencyToAdd}
        />
      ) : (
        content()
      )}
    </Modal>
  )
}

export default TransactionConfirmationModal
