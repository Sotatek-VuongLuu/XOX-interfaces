import {
  Box,
  ButtonMenu,
  ButtonMenuItem,
  Flex,
  UserMenu,
  UserMenuDivider,
  UserMenuItem,
  Button,
  Text,
  NextLinkFromReactRouter,
} from '@pancakeswap/uikit'
import { useCallback } from 'react'
import { ChainId } from '@pancakeswap/sdk'
import { useTranslation } from '@pancakeswap/localization'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Search from 'views/Info/components/InfoSearch'
import { useMultiChainPath, useGetChainName } from 'state/info/hooks'
import { multiChainId, multiChainPaths } from 'state/info/constant'
import { chains } from 'utils/wagmi'
import { ChainLogo } from 'components/Logo/ChainLogo'
import { useAccount } from 'wagmi'
import { bsc, mainnet } from '@pancakeswap/wagmi/chains'

const NavWrapper = styled(Flex)`
  padding: 28px 0 24px;
`

const MainContent = styled.div`
  height: 200px;
  width: 100%;
  background: url('/images/bg.svg');
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  padding: 30px 24px;

  button {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    height: 43px;
  }
`

const InfoNav: React.FC<{ isStableSwap: boolean }> = ({ isStableSwap }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const chainPath = useMultiChainPath()
  const { address: account } = useAccount()

  const isPairs = router.pathname === `/info${chainPath && `/[chainName]`}/pairs`
  const isTokens = router.pathname === `/info${chainPath && `/[chainName]`}/tokens`
  const stableSwapQuery = isStableSwap ? '?type=stableSwap' : ''
  let activeIndex = 0
  if (isPairs) {
    activeIndex = 1
  }
  if (isTokens) {
    activeIndex = 2
  }
  return (
    <NavWrapper>
      <MainContent>
        <Text
          fontSize="18px"
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="22px"
          color="#FFBD3C"
          marginBottom="16px"
        >
          Swap to get XOX and XOXS
        </Text>
        <Text
          fontSize="36px"
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="44px"
          color="rgba(255, 255, 255, 0.87)"
          marginBottom="16px"
        >
          Stake XOXS automatically to earn more
        </Text>
        <Button>Get XOX</Button>
      </MainContent>
      {/* <Flex>
        <Box>
          <ButtonMenu activeIndex={activeIndex} scale="sm" variant="subtle">
            <ButtonMenuItem as={NextLinkFromReactRouter} to={`/info${chainPath}${stableSwapQuery}`}>
              {t('Overview')}
            </ButtonMenuItem>
            <ButtonMenuItem as={NextLinkFromReactRouter} to={`/info${chainPath}/pairs${stableSwapQuery}`}>
              {t('Pairs')}
            </ButtonMenuItem>
            <ButtonMenuItem as={NextLinkFromReactRouter} to={`/info${chainPath}/tokens${stableSwapQuery}`}>
              {t('Tokens')}
            </ButtonMenuItem>
          </ButtonMenu>
        </Box>
        {!account && <NetworkSwitcher activeIndex={activeIndex} />}
      </Flex>
      <Box width={['100%', '100%', '250px']}>
        <Search />
      </Box> */}
    </NavWrapper>
  )
}

const targetChains = [mainnet, bsc]

export const NetworkSwitcher: React.FC<{ activeIndex: number }> = ({ activeIndex }) => {
  const { t } = useTranslation()
  const chainName = useGetChainName()
  const foundChain = chains.find((d) => d.id === multiChainId[chainName])
  const symbol = foundChain?.nativeCurrency?.symbol
  const router = useRouter()
  const switchNetwork = useCallback(
    (chainPath: string) => {
      if (activeIndex === 0) router.push(`/info${chainPath}`)
      if (activeIndex === 1) router.push(`/info${chainPath}/pairs`)
      if (activeIndex === 2) router.push(`/info${chainPath}/tokens`)
    },
    [router, activeIndex],
  )

  return (
    <UserMenu
      alignItems="top"
      ml="8px"
      avatarSrc={`/images/chains/${multiChainId[chainName]}.png`}
      text={
        foundChain ? (
          <>
            <Box display={['none', null, null, null, null, 'block']}>{foundChain.name}</Box>
            <Box display={['block', null, null, null, null, 'none']}>{symbol}</Box>
          </>
        ) : (
          t('Select a Network')
        )
      }
      recalculatePopover
    >
      {() => <NetworkSelect chainId={multiChainId[chainName]} switchNetwork={switchNetwork} />}
    </UserMenu>
  )
}

const NetworkSelect: React.FC<{ chainId: ChainId; switchNetwork: (chainPath: string) => void }> = ({
  switchNetwork,
  chainId,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <Box px="16px" py="8px">
        <Text color="textSubtle">{t('Select a Network')}</Text>
      </Box>
      <UserMenuDivider />
      {targetChains.map((chain) => (
        <UserMenuItem
          key={chain.id}
          style={{ justifyContent: 'flex-start' }}
          onClick={() => {
            if (chain.id !== chainId) switchNetwork(multiChainPaths[chain.id])
          }}
        >
          <ChainLogo chainId={chain.id} />
          <Text color={chain.id === chainId ? 'secondary' : 'text'} bold={chain.id === chainId} pl="12px">
            {chain.name}
          </Text>
        </UserMenuItem>
      ))}
    </>
  )
}

export default InfoNav
