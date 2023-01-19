import styled from 'styled-components'
import { CheckmarkIcon, CloseIcon, ErrorIcon, LinkExternal } from '@pancakeswap/uikit'
import { getBlockExploreLink } from 'utils'
import { TransactionDetails } from 'state/transactions/reducer'
import CircleLoader from '../../Loader/CircleLoader'

const TransactionState = styled.div<{ pending: boolean; success?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none !important;
  font-weight: 400;
  line-height: 24px;
  font-size: 16px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.primary};
`
const TransactionText = styled(LinkExternal)`
  color: #ffffffde;
  font-weight: 400;
  margin-right: 50px;
`

const IconWrapper = styled.div<{ pending: boolean; success?: boolean }>`
  color: ${({ pending, success, theme }) =>
    pending ? theme.colors.primary : success ? theme.colors.success : theme.colors.failure};
  display: flex;
`

export default function Transaction({ tx, chainId }: { tx: TransactionDetails; chainId: number }) {
  const summary = tx?.summary
  const pending = !tx?.receipt
  const success = !pending && tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined')

  if (!chainId) return null

  return (
    <TransactionState pending={pending} success={success}>
      <TransactionText href={getBlockExploreLink(tx.hash, 'transaction', chainId)}>
        {summary ?? tx.hash}
      </TransactionText>
      <IconWrapper pending={pending} success={success}>
        {pending ? <CircleLoader /> : success ? <CheckmarkIcon color="success" /> : <ErrorIcon color="failure" />}
      </IconWrapper>
    </TransactionState>
  )
}
