import { usePreloadImages } from '@pancakeswap/hooks'
import { useTranslation } from '@pancakeswap/localization'
import { AtomBox } from '@pancakeswap/ui/components/AtomBox'
import {
  Button,
  CloseIcon,
  Heading,
  Image,
  LinkExternal,
  ModalV2,
  ModalV2Props,
  ModalWrapper,
  MoreHorizontalIcon,
  SvgProps,
  Tab,
  TabMenu,
  Text,
  WarningIcon,
} from '@pancakeswap/uikit'
import { atom, useAtom } from 'jotai'
import { FC, lazy, PropsWithChildren, Suspense, useMemo, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { StepIntro } from './components/Intro'
import {
  desktopWalletSelectionClass,
  walletIconClass,
  promotedGradientClass,
  walletSelectWrapperClass,
} from './WalletModal.css'

const Qrcode = lazy(() => import('./components/QRCode'))

type LinkOfTextAndLink = string | { text: string; url: string }

type DeviceLink = {
  desktop?: LinkOfTextAndLink
  mobile?: LinkOfTextAndLink
}

type LinkOfDevice = string | DeviceLink

export type WalletConfigV2<T = unknown> = {
  id: string
  title: string
  icon: string | FC<React.PropsWithChildren<SvgProps>>
  connectorId: T
  deepLink?: string
  installed?: boolean
  guide?: LinkOfDevice
  downloadLink?: LinkOfDevice
  mobileOnly?: boolean
  qrCode?: () => Promise<string>
}

interface WalletModalV2Props<T = unknown> extends ModalV2Props {
  wallets: WalletConfigV2<T>[]
  login: (connectorId: T) => Promise<any>
  docLink: string
  docText: string
  onDismiss: () => void
}

export class WalletConnectorNotFoundError extends Error {}

export class WalletSwitchChainError extends Error {}

const errorAtom = atom<string>('')

const selectedWalletAtom = atom<WalletConfigV2<unknown> | null>(null)

export function useSelectedWallet<T>() {
  // @ts-ignore
  return useAtom<WalletConfigV2<T> | null>(selectedWalletAtom)
}

// const TabContainer = ({ children, docLink, docText }: PropsWithChildren<{ docLink: string; docText: string }>) => {
//   const [index, setIndex] = useState(0)
//   const { t } = useTranslation()

//   return (
//     <AtomBox position="relative" zIndex="modal" className={modalWrapperClass}>
//       <AtomBox position="absolute" style={{ top: '-50px' }}>
//         <TabMenu activeIndex={index} onItemClick={setIndex} gap="0px" isColorInverse>
//           <Tab>{t('Connect Wallet')}</Tab>
//           <Tab>{t('What’s a Web3 Wallet?')}</Tab>
//         </TabMenu>
//       </AtomBox>
//       <AtomBox
//         display="flex"
//         position="relative"
//         background="gradientCardHeader"
//         borderRadius="card"
//         borderBottomRadius={{
//           xs: '0',
//           md: 'card',
//         }}
//         zIndex="modal"
//         width="full"
//       >
//         {index === 0 && children}
//         {index === 1 && <StepIntro docLink={docLink} docText={docText} />}
//       </AtomBox>
//     </AtomBox>
//   )
// }

const MOBILE_DEFAULT_DISPLAY_COUNT = 6

function MobileModal<T>({
  wallets,
  connectWallet,
  onDismiss,
}: Pick<WalletModalV2Props<T>, 'wallets' | 'docLink' | 'docText'> & {
  connectWallet: (wallet: WalletConfigV2<T>) => void,
  onDismiss: () => void
}) {
  const { t } = useTranslation()

  const [selected] = useSelectedWallet()
  const [error] = useAtom(errorAtom)

  const installedWallets: WalletConfigV2<T>[] = wallets.filter((w) => w.installed)
  const walletsToShow: WalletConfigV2<T>[] = wallets.filter((w) => {
    if (installedWallets.length) {
      return w.installed
    }
    return w.installed !== false || w.deepLink
  })

  return (
    <AtomBox width="full" display="flex" flexDirection="column" style={{ padding: '32px 24px' }}>
      {error ? (
        <AtomBox
          display="flex"
          flexDirection="column"
          alignItems="center"
          style={{ gap: '24px' }}
          textAlign="center"
          p="24px"
        >
          <div style={{ position: 'absolute', top: '11px', right: '11px', cursor: 'pointer' }} onClick={onDismiss}>
            <CloseIcon />
          </div>
          {selected && typeof selected.icon === 'string' && <Image src={selected.icon} width={108} height={108} />}
          <div style={{ maxWidth: '246px' }}>
            <ErrorMessage message={error} />
          </div>
        </AtomBox>
      ) : (
        <AtomBox px="32px">
          <div style={{ position: 'absolute', top: '11px', right: '11px', cursor: 'pointer' }} onClick={onDismiss}>
            <CloseIcon />
          </div>
          <Heading
            as="h4"
            fontSize="20px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="24px"
            color="rgba(255, 255, 255, 0.87)"
            textAlign="center"
            mb="8px"
          >
            Connect Wallet
          </Heading>
          <Text
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="24px"
            color="rgba(255, 255, 255, 0.6)"
            textAlign="center"
            mb="40px"
            style={{ width: '239px' }}
          >
            Start by connecting with one of these wallets below.
          </Text>
        </AtomBox>
      )}
      <WalletSelect
        displayCount={MOBILE_DEFAULT_DISPLAY_COUNT}
        wallets={walletsToShow}
        onClick={(wallet) => {
          connectWallet(wallet)
          if (wallet.deepLink && wallet.installed === false) {
            window.open(wallet.deepLink)
          }
        }}
      />
    </AtomBox>
  )
}

function WalletSelect<T>({
  wallets,
  onClick,
  displayCount = 5,
}: {
  wallets: WalletConfigV2<T>[]
  onClick: (wallet: WalletConfigV2<T>) => void
  displayCount?: number
}) {
  const { t } = useTranslation()
  const [showMore, setShowMore] = useState(false)
  const walletsToShow = showMore ? wallets : wallets.slice(0, displayCount)
  const [selected] = useSelectedWallet()
  return (
    <AtomBox display="grid" gap="24px" className={walletSelectWrapperClass}>
      {walletsToShow.map((wallet) => {
        const isImage = typeof wallet.icon === 'string'
        const Icon = wallet.icon

        return (
          <Button
            key={wallet.id}
            variant="text"
            height="fit"
            as={AtomBox}
            display="flex"
            alignItems="center"
            style={{
              justifyContent: 'center',
              letterSpacing: 'normal',
              padding: '0',
              height: '142px',
              background: '#303030',
            }}
            flexDirection="column"
            onClick={() => onClick(wallet)}
          >
            <AtomBox className={wallet.installed && promotedGradientClass} style={{ borderRadius: '50%' }}>
              {isImage ? (
                <Image src={Icon as string} width={60} height={60} />
              ) : (
                <Icon width={24} height={24} color="textSubtle" />
              )}
            </AtomBox>
            <Text
              fontSize="18px"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="400"
              lineHeight="22px"
              color="rgba(255, 255, 255)"
              mt="16px"
            >
              {wallet.title}
            </Text>
          </Button>
        )
      })}
      {!showMore && wallets.length > displayCount && (
        <AtomBox display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Button height="auto" variant="text" as={AtomBox} flexDirection="column" onClick={() => setShowMore(true)}>
            <AtomBox
              className={walletIconClass}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgc="dropdown"
            >
              <MoreHorizontalIcon color="text" />
            </AtomBox>
            <Text fontSize="12px" textAlign="center" mt="4px">
              {t('More')}
            </Text>
          </Button>
        </AtomBox>
      )}
    </AtomBox>
  )
}

export const walletLocalStorageKey = 'wallet'

const lastUsedWalletNameAtom = atom<string>('')

lastUsedWalletNameAtom.onMount = (set) => {
  const preferred = localStorage?.getItem(walletLocalStorageKey)
  if (preferred) {
    set(preferred)
  }
}

function sortWallets<T>(wallets: WalletConfigV2<T>[], lastUsedWalletName: string | null) {
  const sorted = [...wallets].sort((a, b) => {
    if (a.installed === b.installed) return 0
    return a.installed === true ? -1 : 1
  })

  if (!lastUsedWalletName) {
    return sorted
  }
  const foundLastUsedWallet = wallets.find((w) => w.title === lastUsedWalletName)
  if (!foundLastUsedWallet) return sorted
  return [foundLastUsedWallet, ...sorted.filter((w) => w.id !== foundLastUsedWallet.id)]
}

function DesktopModal<T>({
  wallets: wallets_,
  connectWallet,
  onDismiss,
}: Pick<WalletModalV2Props<T>, 'wallets' | 'docLink' | 'docText'> & {
  connectWallet: (wallet: WalletConfigV2<T>) => void
  onDismiss: () => void
}) {
  const wallets: WalletConfigV2<T>[] = wallets_.filter((w) => {
    return w.installed !== false || (!w.installed && (w.guide || w.downloadLink || w.qrCode))
  })

  const [selected] = useSelectedWallet<T>()
  const [error] = useAtom(errorAtom)
  const [qrCode, setQrCode] = useState<string | undefined>(undefined)
  const { t } = useTranslation()

  const connectToWallet = (wallet: WalletConfigV2<T>) => {
    connectWallet(wallet)
  }

  return (
    <>
      <AtomBox
        display="flex"
        flexDirection="column"
        bg="backgroundAlt"
        py="32px"
        zIndex="modal"
        borderRadius="card"
        className={desktopWalletSelectionClass}
      >
        <div style={{ position: 'absolute', top: '11px', right: '11px', cursor: 'pointer' }} onClick={onDismiss}>
          <CloseIcon />
        </div>

        <AtomBox px="64px">
          <Heading
            as="h4"
            fontSize="20px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="24px"
            color="rgba(255, 255, 255, 0.87)"
            textAlign="center"
            mb="8px"
          >
            Connect Wallet
          </Heading>
          <Text
            fontSize="16px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="24px"
            color="rgba(255, 255, 255, 0.6)"
            textAlign="center"
            mb="40px"
          >
            Start by connecting with one of these wallets below.
          </Text>
        </AtomBox>
        <WalletSelect
          wallets={wallets}
          onClick={(w) => {
            connectToWallet(w)
            setQrCode(undefined)
            if (w.qrCode) {
              w.qrCode().then((uri) => {
                setQrCode(uri)
              })
            }
          }}
        />
        <AtomBox
          display="flex"
          flexDirection="column"
          alignItems="center"
          style={{ gap: '16px', paddingTop: '16px' }}
          textAlign="center"
        >
          {selected && selected.installed !== false && (
            <>
              {typeof selected.icon === 'string' && <Image src={selected.icon} width={108} height={108} />}
              <Heading
                as="h4"
                fontSize="20px"
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="700"
                lineHeight="24px"
                color="rgba(255, 255, 255, 0.87)"
                textAlign="center"
              >
                {t('Opening')} {selected.title}
              </Heading>
              {error ? (
                <ErrorContent message={error} onRetry={() => connectToWallet(selected)} />
              ) : (
                <Text
                  fontSize="16px"
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="24px"
                  color="rgba(255, 255, 255, 0.6)"
                  textAlign="center"
                >
                  {t('Please confirm in %wallet%', { wallet: selected.title })}
                </Text>
              )}
            </>
          )}
          {selected && selected.installed === false && <NotInstalled qrCode={qrCode} wallet={selected} />}
        </AtomBox>
      </AtomBox>
    </>
  )
}

export function WalletModalV2<T = unknown>(props: WalletModalV2Props<T>) {
  const { wallets: _wallets, login, docLink, docText, ...rest } = props

  const [lastUsedWalletName] = useAtom(lastUsedWalletNameAtom)

  const wallets = useMemo(() => sortWallets(_wallets, lastUsedWalletName), [_wallets, lastUsedWalletName])
  const [, setSelected] = useSelectedWallet<T>()
  const [, setError] = useAtom(errorAtom)
  const { t } = useTranslation()

  const imageSources = useMemo(
    () =>
      wallets
        .map((w) => w.icon)
        .filter((icon) => typeof icon === 'string')
        .concat('https://cdn.pancakeswap.com/wallets/wallet_intro.png') as string[],
    [wallets],
  )

  usePreloadImages(imageSources.slice(0, MOBILE_DEFAULT_DISPLAY_COUNT))

  const connectWallet = (wallet: WalletConfigV2<T>) => {
    setSelected(wallet)
    setError('')
    if (wallet.installed !== false) {
      login(wallet.connectorId)
        .then((v) => {
          if (v) {
            localStorage.setItem(walletLocalStorageKey, wallet.title)
          }
        })
        .catch((err) => {
          if (err instanceof WalletConnectorNotFoundError) {
            setError(t('no provider found'))
          } else if (err instanceof WalletSwitchChainError) {
            setError(err.message)
          } else {
            setError(t('Error connecting, please authorize wallet to access.'))
          }
        })
    }
  }

  return (
    <ModalV2 closeOnOverlayClick {...rest}>
      <ModalWrapper onDismiss={props.onDismiss} style={{ overflow: 'visible', border: 'none' }}>
        <AtomBox position="relative">
          {isMobile ? (
            <MobileModal
              connectWallet={connectWallet}
              wallets={wallets}
              docLink={docLink}
              docText={docText}
              onDismiss={props.onDismiss}
            />
          ) : (
            <DesktopModal
              connectWallet={connectWallet}
              wallets={wallets}
              docLink={docLink}
              docText={docText}
              onDismiss={props.onDismiss}
            />
          )}
        </AtomBox>
      </ModalWrapper>
    </ModalV2>
  )
}

const NotInstalled = ({ wallet, qrCode }: { wallet: WalletConfigV2; qrCode?: string }) => {
  const { t } = useTranslation()
  return (
    <>
      <Heading
        as="h4"
        fontSize="20px"
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="700"
        lineHeight="24px"
        color="rgba(255, 255, 255, 0.87)"
        textAlign="center"
        mt="16px"
      >
        {t('%wallet% is not installed', { wallet: wallet.title })}
      </Heading>
      {qrCode && (
        <Suspense>
          <AtomBox overflow="hidden" borderRadius="card" style={{ width: '288px', height: '288px' }}>
            <Qrcode url={qrCode} image={typeof wallet.icon === 'string' ? wallet.icon : undefined} />
          </AtomBox>
        </Suspense>
      )}
      {!qrCode && (
        <Text maxWidth="246px" m="auto">
          {t('Please install the %wallet% browser extension to connect the %wallet% wallet.', {
            wallet: wallet.title,
          })}
        </Text>
      )}
      {wallet.guide && (
        <Button variant="subtle" as="a" href={getDesktopLink(wallet.guide)} external>
          {getDesktopText(wallet.guide, t('Setup Guide'))}
        </Button>
      )}
      {wallet.downloadLink && (
        <Button variant="subtle" as="a" href={getDesktopLink(wallet.downloadLink)} external>
          {getDesktopText(wallet.downloadLink, t('Install'))}
        </Button>
      )}
    </>
  )
}

const ErrorMessage = ({ message }: { message: string }) => (
  <Text bold color="failure">
    <WarningIcon width="16px" color="failure" style={{ verticalAlign: 'middle' }} /> {message}
  </Text>
)

const ErrorContent = ({ onRetry, message }: { onRetry: () => void; message: string }) => {
  const { t } = useTranslation()
  return (
    <>
      <ErrorMessage message={message} />
      <Button variant="subtle" onClick={onRetry}>
        {t('Retry')}
      </Button>
    </>
  )
}

const getDesktopLink = (linkDevice: LinkOfDevice) =>
  typeof linkDevice === 'string'
    ? linkDevice
    : typeof linkDevice.desktop === 'string'
    ? linkDevice.desktop
    : linkDevice.desktop?.url

const getDesktopText = (linkDevice: LinkOfDevice, fallback: string) =>
  typeof linkDevice === 'string'
    ? fallback
    : typeof linkDevice.desktop === 'string'
    ? fallback
    : linkDevice.desktop?.text ?? fallback
