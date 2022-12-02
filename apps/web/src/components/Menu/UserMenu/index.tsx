import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'
import {
  Box,
  Flex,
  Text,
  Skeleton,
  LinkExternal,
  CopyAddress,
  LogoutIcon,
  RefreshIcon,
  useModal,
  UserMenu as UIKitUserMenu,
  UserMenuDivider,
  UserMenuVariant,
} from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Trans from 'components/Trans'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useAuth from 'hooks/useAuth'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { useProfile } from 'state/profile/hooks'
import { usePendingTransactions } from 'state/transactions/hooks'
import ProfileUserMenuItem from './ProfileUserMenuItem'
import WalletModal, { WalletView } from './WalletModal'
import WalletUserMenuItem from './WalletUserMenuItem'
import styled from 'styled-components'
import WalletInfo from './WalletInfo'
import { useAccount, useBalance } from 'wagmi'
import { parseUnits } from '@ethersproject/units'
import { formatBigNumber } from '@pancakeswap/utils/formatBalance'
import { ChainLogo } from 'components/Logo/ChainLogo'
import { getBlockExploreLink, getBlockExploreName } from 'utils'
import { useAppDispatch } from 'state'
import { updateOpenFormReferral } from 'state/user/actions'

export const LOW_NATIVE_BALANCE = parseUnits('0.002', 'ether')

const TextBox = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: rgba(255, 255, 255, 0.87);
`

const ProfileInfo = styled.div``

const UserMenuStyle = styled.div`
  padding: 8px 14px;

  & .link-bnb {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: #9072ff;
  }
`

const MenuItemsStyle = styled.div`
  cursor: pointer;
  padding: 12px 0;

  &:hover {
    background-color: #ffffff10;
  }
`

const UserMenu = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { chainId, isWrongNetwork } = useActiveChainId()
  const { logout } = useAuth()
  const { hasPendingTransactions, pendingNumber } = usePendingTransactions()
  const { isInitialized, isLoading, profile } = useProfile()
  const [onPresentWalletModal] = useModal(<WalletModal initialView={WalletView.WALLET_INFO} />)
  const [onPresentTransactionModal] = useModal(<WalletModal initialView={WalletView.TRANSACTIONS} />)
  const [onPresentWrongNetworkModal] = useModal(<WalletModal initialView={WalletView.WRONG_NETWORK} />)
  const hasProfile = isInitialized && !!profile
  const avatarSrc = profile?.nft?.image?.thumbnail
  const [userMenuText, setUserMenuText] = useState<string>('')
  const [userMenuVariable, setUserMenuVariable] = useState<UserMenuVariant>('default')
  const bnbBalance = useBalance({ addressOrName: account, chainId: ChainId.BSC })

  useEffect(() => {
    if (hasPendingTransactions) {
      setUserMenuText(t('%num% Pending', { num: pendingNumber }))
      setUserMenuVariable('pending')
    } else {
      setUserMenuText('')
      setUserMenuVariable('default')
    }
  }, [hasPendingTransactions, pendingNumber, t])

  // const onClickWalletMenu = (): void => {
  //   if (isWrongNetwork) {
  //     onPresentWrongNetworkModal()
  //   } else {
  //     onPresentWalletModal()
  //   }
  // }

  const openFormReferral = () => {
    dispatch(updateOpenFormReferral({ openFormReferral: true }))
  }

  const UserMenuItems = () => {
    return (
      <UserMenuStyle>
        <ProfileInfo>
          <Flex flexDirection="row">
            <Flex width="45px" height="45px" minWidth="45px" mr="8px">
              <img src="" width="100%" height="100%" />
            </Flex>
            <Flex flexDirection="column" width="100%">
              <Flex flexDirection="row" justifyContent="space-between" mb="8px">
                <Text
                  fontSize="16px"
                  fontFamily="Inter"
                  fontStyle="normal"
                  fontWeight="700"
                  lineHeight="19px"
                  color="rgba(255, 255, 255)"
                >
                  @thanh.le
                </Text>
                <div style={{ cursor: 'pointer', borderRadius: '50%', overflow: 'hidden' }} onClick={openFormReferral}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path
                      d="M0.374023 11.6573V14.626H3.34277L12.0986 5.87017L9.12986 2.90142L0.374023 11.6573ZM14.3944 3.57434C14.7032 3.26559 14.7032 2.76684 14.3944 2.45809L12.5419 0.605586C12.2332 0.296836 11.7344 0.296836 11.4257 0.605586L9.97694 2.05434L12.9457 5.02309L14.3944 3.57434Z"
                      fill="#8E8E8E"
                    />
                  </svg>
                </div>
              </Flex>
              <Text
                fontSize="12px"
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="15px"
                color="rgba(255, 255, 255)"
                marginBottom="6px"
              >
                thanh.le@sotatek.com
              </Text>
              <Text
                fontSize="12px"
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="15px"
                color="rgba(255, 255, 255)"
                marginBottom="8px"
              >
                +84123456789
              </Text>
            </Flex>
          </Flex>
        </ProfileInfo>

        <UserMenuDivider />

        <Flex flexDirection="column" mb="12px" mt="12px">
          <CopyAddress tooltipMessage={t('Copied')} account={account} />
          <Text
            fontSize="14px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="500"
            lineHeight="17px"
            color="rgba(255, 255, 255, 0.87)"
          >
            Referral Code: {'123456'}
          </Text>
        </Flex>

        <UserMenuDivider />

        <Flex justifyContent="space-between" alignItems="center" mt="12px">
          <Flex
            borderRadius="200px"
            pl="4px"
            pr="8px"
            py="2px"
            border="1px solid #444444"
            padding="6px"
            alignItems="center"
          >
            {/* <ChainLogo chainId={ChainId.BSC} /> */}
            <Flex width="24px" height="24px">
              <img src="images/chains/56.png" alt="BNB" />
            </Flex>
            <Text color="white" ml="4px" fontSize="12px" lineHeight="15px">
              BNB Smart Chain
            </Text>
          </Flex>
          <LinkExternal
            href={getBlockExploreLink(account, 'address', ChainId.BSC)}
            className="link-bnb"
            color="#9072FF"
          >
            {getBlockExploreName(ChainId.BSC)}
          </LinkExternal>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" width="100%" mt="8px">
          <Text color="rgba(255, 255, 255, 0.87)">BNB {t('Balance')}</Text>
          {!bnbBalance.isFetched ? (
            <Skeleton height="22px" width="60px" />
          ) : (
            <Text color="rgba(255, 255, 255, 0.87)">{formatBigNumber(bnbBalance.data.value, 6)}</Text>
          )}
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" width="100%" mb="12px" mt="8px">
          <Text color="rgba(255, 255, 255, 0.87)">XOX {t('Balance')}</Text>
          {!bnbBalance.isFetched ? (
            <Skeleton height="22px" width="60px" />
          ) : (
            <Text color="rgba(255, 255, 255, 0.87)">{formatBigNumber(bnbBalance.data.value, 6)}</Text>
          )}
        </Flex>

        <UserMenuDivider />

        <MenuItemsStyle onClick={logout}>
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            <TextBox>{t('Disconnect')}</TextBox>
            <LogoutIcon />
          </Flex>
        </MenuItemsStyle>
      </UserMenuStyle>
    )
  }

  if (account) {
    return (
      <UIKitUserMenu account={account} avatarSrc={avatarSrc} text={userMenuText} variant={userMenuVariable}>
        {({ isOpen }) => (isOpen ? <UserMenuItems /> : null)}
      </UIKitUserMenu>
    )
  }

  if (isWrongNetwork) {
    return (
      <UIKitUserMenu text={t('Network')} variant="danger">
        {({ isOpen }) => (isOpen ? <UserMenuItems /> : null)}
      </UIKitUserMenu>
    )
  }

  return (
    <ConnectWalletButton scale="sm" height="43px">
      <Box display={['block', , , 'block']}>
        <Trans>Connect</Trans>
      </Box>
    </ConnectWalletButton>
  )
}

export default UserMenu
