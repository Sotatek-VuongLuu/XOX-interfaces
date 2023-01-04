import { ReactElement, useCallback } from 'react'
import { ChainId, Currency, Token } from '@pancakeswap/sdk'
import styled from 'styled-components'
import {
  Button,
  Text,
  ErrorIcon,
  ArrowUpIcon,
  Flex,
  Box,
  Link,
  Spinner,
  Modal,
  InjectedModalProps,
  ModalProps,
} from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import { WrappedTokenInfo } from '@pancakeswap/token-lists'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { AutoColumn, ColumnCenter } from '../Layout/Column'
import { getBlockExploreLink, getBlockExploreName } from '../../utils'
import AddToWalletButton, { AddToWalletTextOptions } from '../AddToWallet/AddToWalletButton'

const Wrapper = styled.div`
  width: 100%;
`
const Section = styled(AutoColumn)`
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 0 0 24px 0;
`
const ButtonFooters = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  height:43px;
  width:100%;
  button {
    min-width:200px;
  }
  @media screen and (max-width: 500px) {
    button {
      min-width:unset;
    }
  }
`
const ConfirmImg = styled.div`
  max-width: 171px;
  max-height: 160px;
  margin:0 auto;
  img {
    width:100%;
    height:100%;
  }
`

function ConfirmationPendingContent({ pendingText }: { pendingText: string }) {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <ConfirmedIcon>
        <Spinner />
      </ConfirmedIcon>
      <AutoColumn gap="12px" justify="center">
        <Text fontSize="18px">{t('Waiting For Confirmation')}</Text>
        <AutoColumn gap="12px" justify="center">
          <Text bold small textAlign="center">
            {pendingText}
          </Text>
        </AutoColumn>
        <Text small color="textSubtle" textAlign="center">
          {t('Confirm this transaction in your wallet')}
        </Text>
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
          {/* <ArrowUpIcon strokeWidth={0.5} width="90px" color="primary" /> */}
          <ConfirmImg><img src='/images/swap/transaction-submited.png' alt='' /></ConfirmImg>
         
        </ConfirmedIcon>
        <AutoColumn gap="12px" justify="center">
          <Text fontSize="20px">{t('Transaction Submitted')}</Text>
          {chainId && hash && (
            <Link external small href={getBlockExploreLink(hash, 'transaction', chainId)}>
              {t('View on %site%', {
                site: getBlockExploreName(chainId),
              })}
            </Link>
          )}
          <ButtonFooters>
          <Button onClick={onDismiss} maxWidth='200px' style={{height:'43px', background:'#313131', marginRight:'16px'}}>
            {t('Close')}
          </Button>
          {currencyToAdd && (
            <AddToWalletButton
              variant="tertiary"
              maxWidth='200px'
              textOptions={AddToWalletTextOptions.TEXT_WITH_ASSET}
              tokenAddress={token.address}
              tokenSymbol={currencyToAdd.symbol}
              tokenDecimals={token.decimals}
              tokenLogo={token instanceof WrappedTokenInfo ? token.logoURI : undefined}
              style = {{fontSize:'15px', height:'43px'}}
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
        <ErrorIcon color="failure" width="64px" />
        <Text color="failure" style={{ textAlign: 'center', width: '85%', wordBreak: 'break-word' }}>
          {message}
        </Text>
      </AutoColumn>

      {onDismiss ? (
        <Flex justifyContent="center" pt="24px">
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
        <img src='/images/swap/icon-swap-error.svg' alt='' />
        <Text color="failure" style={{ textAlign: 'center', width: '85%', marginTop:'24px', color:'#FFFFFF99', wordBreak: 'break-word' }}>
          {message}
        </Text>
      </AutoColumn>

      {onDismiss ? (
        <Flex justifyContent="center" pt="24px">
          <Button onClick={onDismiss}>{t('Dismiss')}</Button>
        </Flex>
      ) : null}
    </Wrapper>
  )
}
interface ConfirmationModalProps {
  title: string
  customOnDismiss?: () => void
  hash: string | undefined
  content: () => React.ReactNode
  attemptingTxn: boolean
  pendingText: string
  currencyToAdd?: Currency | undefined
}

const TransactionConfirmationModal: React.FC<
  React.PropsWithChildren<InjectedModalProps & ConfirmationModalProps & ModalProps>
> = ({ title, onDismiss, customOnDismiss, attemptingTxn, hash, pendingText, content, currencyToAdd, ...props }) => {
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
        <ConfirmationPendingContent pendingText={pendingText} />
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
