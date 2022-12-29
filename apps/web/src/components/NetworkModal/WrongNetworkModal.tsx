import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'
import { ArrowForwardIcon, Button, Grid, Message, MessageText, Modal, Text, FlexGap } from '@pancakeswap/uikit'
import { ChainLogo } from 'components/Logo/ChainLogo'
import useAuth from 'hooks/useAuth'
import { useSessionChainId } from 'hooks/useSessionChainId'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import Image from 'next/future/image'
import { Chain, useAccount, useNetwork } from 'wagmi'
import Dots from '../Loader/Dots'

// Where page network is not equal to wallet network
export function WrongNetworkModal({ currentChain, onDismiss }: { currentChain: Chain; onDismiss: () => void }) {
  const { switchNetworkAsync, isLoading, canSwitch } = useSwitchNetwork()
  const { chain } = useNetwork()
  const { logout } = useAuth()
  const { isConnected } = useAccount()
  const [, setSessionChainId] = useSessionChainId()
  const chainId = currentChain.id || ChainId.BSC
  const { t } = useTranslation()

  const switchText = t('Switch to %network%', { network: currentChain.name })

  return (
    <Modal title={t('You are in wrong network')} headerBackground="gradientCardHeader" onDismiss={onDismiss}>
      <Grid style={{ gap: '16px', padding: '16px 0' }} maxWidth="336px">
        <Text textAlign="center">{t('This page is located for %network%.', { network: currentChain.name })}</Text>
        {canSwitch ? (
          <Button isLoading={isLoading} onClick={() => switchNetworkAsync(chainId)}>
            {isLoading ? <Dots>{switchText}</Dots> : switchText}
          </Button>
        ) : (
          <Message variant="danger">
            <MessageText>{t('Unable to switch network. Please try it on your wallet')}</MessageText>
          </Message>
        )}
        <Button onClick={() => setSessionChainId(chain?.id)}>Switch to {chain?.name}</Button>
        {isConnected && (
          <Button
            onClick={() =>
              logout().then(() => {
                setSessionChainId(chainId)
              })
            }
          >
            {t('Disconnect Wallet')}
          </Button>
        )}
      </Grid>
    </Modal>
  )
}
