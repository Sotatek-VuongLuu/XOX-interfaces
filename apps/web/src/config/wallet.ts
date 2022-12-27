import { WalletConfigV2 } from '@pancakeswap/ui-wallets'
// import { WalletFilledIcon } from '@pancakeswap/uikit'
import type { ExtendEthereum } from 'global'
// import { isFirefox } from 'react-device-detect'
import { metaMaskConnector, walletConnectNoQrCodeConnector } from '../utils/wagmi'

export enum ConnectorNames {
  MetaMask = 'metaMask',
  Injected = 'injected',
  WalletConnect = 'walletConnect',
  BSC = 'bsc',
  Blocto = 'blocto',
  WalletLink = 'coinbaseWallet',
}

const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t))

const createQrCode = (chainId: number, connect) => async () => {
  connect({ connector: walletConnectNoQrCodeConnector, chainId })

  // wait for WalletConnect to setup in order to get the uri
  await delay(100)
  const { uri } = (await walletConnectNoQrCodeConnector.getProvider()).connector

  return uri
}

const walletsConfig = ({
  chainId,
  connect,
}: {
  chainId: number
  connect: (connectorID: ConnectorNames) => void
}): WalletConfigV2<ConnectorNames>[] => {
  const qrCode = createQrCode(chainId, connect)
  return [
    {
      id: 'metamask',
      title: 'Metamask',
      icon: '/images/wallets/metamask2.png',
      installed: typeof window !== 'undefined' && Boolean(window.ethereum?.isMetaMask) && metaMaskConnector.ready,
      connectorId: ConnectorNames.MetaMask,
      deepLink: 'https://metamask.app.link/dapp/dev.xoxnet.io/swap/',
      qrCode,
      downloadLink: 'https://metamask.app.link/dapp/dev.xoxnet.io/swap/',
    },
    {
      id: 'trust',
      title: 'Trust Wallet',
      icon: '/images/wallets/trustwallet.png',
      connectorId: ConnectorNames.Injected,
      installed:
        typeof window !== 'undefined' &&
        !(window.ethereum as ExtendEthereum)?.isSafePal && // SafePal has isTrust flag
        (Boolean(window.ethereum?.isTrust) || Boolean((window.ethereum as ExtendEthereum)?.isTrustWallet)),
      deepLink: 'https://link.trustwallet.com/open_url?coin_id=20000714&url=https://dev.xoxnet.io/swap/',
      downloadLink: {
        desktop: 'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph/related',
      },
      qrCode,
    },
  ]
}

export const createWallets = (chainId: number, connect: any) => {
  return walletsConfig({ chainId, connect })
}

const docLangCodeMapping: Record<string, string> = {
  it: 'italian',
  ja: 'japanese',
  fr: 'french',
  tr: 'turkish',
  vi: 'vietnamese',
  id: 'indonesian',
  'zh-cn': 'chinese',
  'pt-br': 'portuguese-brazilian',
}

export const getDocLink = (code: string) =>
  docLangCodeMapping[code]
    ? `https://docs.pancakeswap.finance/v/${docLangCodeMapping[code]}/get-started/wallet-guide`
    : `https://docs.pancakeswap.finance/get-started/wallet-guide`
