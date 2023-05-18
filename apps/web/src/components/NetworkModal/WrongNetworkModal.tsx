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
import { BRIDGE_CHAINS_ONLY, MAINNET_CHAINS } from 'views/BridgeToken/networks'
import { useRouter } from 'next/router'

// Where page network is not equal to wallet network
export function WrongNetworkModal({ currentChain, onDismiss }: { currentChain: Chain; onDismiss: () => void }) {
  const { switchNetworkAsync, isLoading, canSwitch } = useSwitchNetwork()
  const { chain } = useNetwork()
  const { logout } = useAuth()
  const { isConnected } = useAccount()
  const [, setSessionChainId] = useSessionChainId()
  const chainId = currentChain.id || ChainId.BSC
  const { t } = useTranslation()
  const router = useRouter()

  const switchText = t('Switch to %network%', { network: currentChain.name })

  return (
    <Modal title={t('You are in wrong network')} headerBackground="gradientCardHeader" onDismiss={onDismiss}>
      <Grid style={{ gap: '16px', padding: '16px 0' }} maxWidth="336px">
        {router.pathname === '/bridge-token' ? (
          <>
            <Text textAlign="center">{t('This page is located for %network%.', { network: currentChain.name })}</Text>
            {canSwitch ? (
              <Button isLoading={isLoading} onClick={() => switchNetworkAsync(chainId)} height={43}>
                {isLoading ? <Dots>{switchText}</Dots> : switchText}
              </Button>
            ) : (
              <Message variant="danger">
                <MessageText>{t('Unable to switch network. Please try it on your wallet')}</MessageText>
              </Message>
            )}
            <Button onClick={() => setSessionChainId(chain?.id)} height={43}>
              Switch to {chain?.name}
            </Button>
          </>
        ) : (
          <>
            <Text textAlign="center">
              {t('This page is located for %network%.', {
                network: BRIDGE_CHAINS_ONLY.includes(chainId) ? `Ethereum or Binance Smart Chain` : currentChain.name,
              })}
            </Text>
            {canSwitch ? (
              <Button
                isLoading={isLoading}
                onClick={() => switchNetworkAsync(BRIDGE_CHAINS_ONLY.includes(chainId) ? 1 : chainId)}
                height={43}
              >
                {isLoading ? (
                  <Dots>
                    {BRIDGE_CHAINS_ONLY.includes(chainId)
                      ? t('Switch to %network%', { network: 'Ethereum' })
                      : switchText}
                  </Dots>
                ) : (
                  <>
                    {BRIDGE_CHAINS_ONLY.includes(chainId)
                      ? t('Switch to %network%', { network: 'Ethereum' })
                      : switchText}
                  </>
                )}
              </Button>
            ) : (
              <Message variant="danger">
                <MessageText>{t('Unable to switch network. Please try it on your wallet')}</MessageText>
              </Message>
            )}

            <Button
              onClick={() => setSessionChainId(BRIDGE_CHAINS_ONLY.includes(chainId) ? 56 : chain?.id)}
              height={43}
            >
              {BRIDGE_CHAINS_ONLY.includes(chain?.id)
                ? t('Switch to %network%', { network: 'BNB Smart Chain' })
                : chain?.name}
            </Button>
          </>
        )}

        {isConnected && (
          <Button
            onClick={() =>
              logout().then(() => {
                setSessionChainId(chainId)
              })
            }
            height={43}
          >
            {t('Disconnect Wallet')}
          </Button>
        )}
      </Grid>
    </Modal>
  )
}
