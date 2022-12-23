import { useCallback } from 'react'
import { Modal, ModalBody, Text, Button, Flex, InjectedModalProps } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import isEmpty from 'lodash/isEmpty'
import groupBy from 'lodash/groupBy'
import styled from 'styled-components'
import { useAllSortedRecentTransactions } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/reducer'
import { useAppDispatch } from 'state'
import { clearAllTransactions } from 'state/transactions/actions'
import { chains } from 'utils/wagmi'
import { useAccount } from 'wagmi'
import { AutoRow } from '../../Layout/Row'
import Transaction from './Transaction'
import ConnectWalletButton from '../../ConnectWalletButton'

const RecentButton = styled(Button)`
  width: 98px;
  height: 37px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
`
const NoTransaction = styled.div`
  text-align:center;
  &img {
    max-width:158px;
    max-height:160px;
    width:100%;
    height:100%;
    margin-bottom:16px;
  }
`
const NoTransactionText = styled(Text)`
  margin-top:16px;
  color:#FFFFFF99;
`
function renderTransactions(transactions: TransactionDetails[], chainId: number) {
  return (
    <Flex flexDirection="column">
      {transactions.map((tx) => {
        return <Transaction key={tx.hash + tx.addedTime} tx={tx} chainId={chainId} />
      })}
    </Flex>
  )
}

const TransactionsModal: React.FC<React.PropsWithChildren<InjectedModalProps>> = ({ onDismiss }) => {
  const { address: account } = useAccount()
  const dispatch = useAppDispatch()
  const sortedRecentTransactions = useAllSortedRecentTransactions()

  const { t } = useTranslation()

  const hasTransactions = !isEmpty(sortedRecentTransactions)

  const clearAllTransactionsCallback = useCallback(() => {
    dispatch(clearAllTransactions())
  }, [dispatch])

  return (
    <Modal title={t('Recent Transactions')} onDismiss={onDismiss}>
      {account ? (
        <ModalBody>
          {hasTransactions ? (
            <>
              <AutoRow mb="1rem" style={{ justifyContent: 'space-between' }}>
                <Text>{t('Recent Transactions')}</Text>
                <RecentButton variant="tertiary" scale="xs" onClick={clearAllTransactionsCallback}>
                  {t('clear all')}
                </RecentButton>
              </AutoRow>
              {Object.entries(sortedRecentTransactions).map(([chainId, transactions]) => {
                const chainIdNumber = Number(chainId)
                const groupedTransactions = groupBy(Object.values(transactions), (trxDetails) =>
                  Boolean(trxDetails.receipt),
                )

                const confirmed = groupedTransactions.true ?? []
                const pending = groupedTransactions.false ?? []

                return (
                  <div key={`transactions#${chainIdNumber}`}>
                    <Text fontSize="12px" color="#FFFFFFDE" mb="4px">
                      {chains.find((c) => c.id === chainIdNumber)?.name ?? 'Unknown network'}
                    </Text>
                    {renderTransactions(pending, chainIdNumber)}
                    {renderTransactions(confirmed, chainIdNumber)}
                  </div>
                )
              })}
            </>
          ) : (
            <NoTransaction>
              <img src="/images/swap/no-recent-transaction.png" alt="" />
              <NoTransactionText>{t('No recent transactions')}</NoTransactionText>
            </NoTransaction>
          )}
        </ModalBody>
      ) : (
        <ConnectWalletButton />
      )}
    </Modal>
  )
}

export default TransactionsModal
