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
  // RefreshIcon,
  useModal,
  UserMenu as UIKitUserMenu,
  UserMenuDivider,
  UserMenuVariant,
} from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Trans from 'components/Trans'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useAuth from 'hooks/useAuth'
// import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { useProfile } from 'state/profile/hooks'
import { usePendingTransactions } from 'state/transactions/hooks'
import { useAccount, useBalance } from 'wagmi'
import { parseUnits } from '@ethersproject/units'
import { formatBigNumber } from '@pancakeswap/utils/formatBalance'
// import { ChainLogo } from 'components/Logo/ChainLogo'
import { getBlockExploreLink, getBlockExploreName } from 'utils'
import { AppState, useAppDispatch } from 'state'
import { updateOpenFormReferral } from 'state/user/actions'
import styled from 'styled-components'
import ProfileUserMenuItem from './ProfileUserMenuItem'
import WalletModal, { WalletView } from './WalletModal'
import { useSelector } from 'react-redux'
// import WalletUserMenuItem from './WalletUserMenuItem'
// import WalletInfo from './WalletInfo'

export const LOW_NATIVE_BALANCE = parseUnits('0.002', 'ether')

const TextBox = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: rgba(255, 255, 255, 0.87);
`

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

  const userProfile = useSelector<AppState, AppState['user']['userProfile']>((state) => state.user.userProfile)

  const setOpenFormReferral = () => {
    dispatch(updateOpenFormReferral({ openFormReferral: true }))
  }

  // const onClickWalletMenu = (): void => {
  //   if (isWrongNetwork) {
  //     onPresentWrongNetworkModal()
  //   } else {
  //     onPresentWalletModal()
  //   }
  // }

  useEffect(() => {
    if (hasPendingTransactions) {
      setUserMenuText(t('%num% Pending', { num: pendingNumber }))
      setUserMenuVariable('pending')
    } else {
      setUserMenuText('')
      setUserMenuVariable('default')
    }
  }, [hasPendingTransactions, pendingNumber, t])

  const renderAvataImage = () => {
    if (userProfile?.avatar) {
      console.log(userProfile, userProfile.avatar, 'userProfile.avatar')
      return <img src={userProfile.avatar} width="100%" height="100%" alt="" style={{ borderRadius: '50%' }} />
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="48" fill="#8E8E8E" />
          <path
            d="M50 86C37.5 86 26.45 79.6 20 70C20.15 60 40 54.5 50 54.5C60 54.5 79.85 60 80 70C76.6944 74.922 72.2293 78.9558 66.9978 81.7459C61.7663 84.536 55.929 85.9969 50 86ZM50 15C53.9782 15 57.7936 16.5804 60.6066 19.3934C63.4197 22.2064 65 26.0218 65 30C65 33.9782 63.4197 37.7936 60.6066 40.6066C57.7936 43.4197 53.9782 45 50 45C46.0218 45 42.2064 43.4197 39.3934 40.6066C36.5803 37.7936 35 33.9782 35 30C35 26.0218 36.5803 22.2064 39.3934 19.3934C42.2064 16.5804 46.0218 15 50 15ZM50 0C43.4339 0 36.9321 1.29329 30.8658 3.80602C24.7995 6.31876 19.2876 10.0017 14.6447 14.6447C5.26784 24.0215 0 36.7392 0 50C0 63.2608 5.26784 75.9785 14.6447 85.3553C19.2876 89.9983 24.7995 93.6812 30.8658 96.194C36.9321 98.7067 43.4339 100 50 100C63.2608 100 75.9785 94.7322 85.3553 85.3553C94.7322 75.9785 100 63.2608 100 50C100 22.35 77.5 0 50 0Z"
            fill="#444444"
          />
        </svg>
      )
    }
  }

  const UserMenuItems = () => {
    return (
      <UserMenuStyle>
        <div>
          <Flex flexDirection="row">
            <Flex width="45px" height="45px" minWidth="45px" mr="8px">
              {renderAvataImage()}
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
                  {userProfile.username && `@${userProfile.username}`}
                </Text>
                {/* eslint-disable-next-line */}
                <div
                  style={{ cursor: 'pointer', borderRadius: '50%', overflow: 'hidden' }}
                  onClick={setOpenFormReferral}
                  onKeyDown={setOpenFormReferral}
                >
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
                {userProfile.email}
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
                {userProfile.telegram}
              </Text>
            </Flex>
          </Flex>
        </div>

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
            Referral Code: {userProfile.referralCode}
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
