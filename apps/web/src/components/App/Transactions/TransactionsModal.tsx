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
  text-align: center;
  &img {
    max-width: 158px;
    max-height: 160px;
    width: 100%;
    height: 100%;
    margin-bottom: 16px;
  }
`
const ConnectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 200px;
  button {
    width: 100%;
    max-width: 268px;
  }
`
const NoTransactionText = styled(Text)`
  margin-top: 16px;
  color: #ffffff99;
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
    <Modal title={t('Recent Transactions')} pb="32px" onDismiss={onDismiss}>
      {account ? (
        <ModalBody style={{ width: hasTransactions ? '495px' : 'unset' }}>
          {hasTransactions ? (
            <>
              <AutoRow mb="1rem" style={{ justifyContent: 'space-between' }}>
                <Text fontSize="18px" fontWeight="700" lineHeight="22px" color="rgba(255, 255, 255, 0.87)">
                  {t('Recent Transactions')}
                </Text>
                <RecentButton variant="tertiary" scale="xs" onClick={clearAllTransactionsCallback}>
                  {t('Clear all')}
                </RecentButton>
              </AutoRow>
              <div style={{ height: '200px', overflowY: 'auto', overflowX: 'hidden' }}>
                {Object.entries(sortedRecentTransactions).map(([chainId, transactions]) => {
                  const chainIdNumber = Number(chainId)
                  const groupedTransactions = groupBy(Object.values(transactions), (trxDetails) =>
                    Boolean(trxDetails.receipt),
                  )

                  const confirmed = groupedTransactions.true ?? []
                  const pending = groupedTransactions.false ?? []

                  return (
                    <>
                      <Text fontSize="16px" lineHeight="19px" color="#FFFFFFDE" mb="8px" mt="8px">
                        {chains.find((c) => c.id === chainIdNumber)?.name ?? 'Unknown network'}
                      </Text>
                      <div key={`transactions#${chainIdNumber}`}>
                        {renderTransactions(pending, chainIdNumber)}
                        {renderTransactions(confirmed, chainIdNumber)}
                      </div>
                    </>
                  )
                })}
              </div>
            </>
          ) : (
            <NoTransaction>
              <img src="/images/swap/no-recent-transaction.png" alt="" />
              <NoTransactionText>{t('No recent transactions')}</NoTransactionText>
            </NoTransaction>
          )}
        </ModalBody>
      ) : (
        <ConnectBox>
          <ConnectWalletButton />
        </ConnectBox>
      )}
    </Modal>
  )
}

export default TransactionsModal
