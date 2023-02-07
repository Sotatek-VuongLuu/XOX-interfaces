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
import { useActiveChainId } from 'hooks/useActiveChainId'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { USD_ADDRESS, XOX_ADDRESS } from 'config/constants/exchange'

const NavWrapper = styled(Flex)`
  padding: 28px 24px 24px;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 5fr 2fr;
    padding-left: 48px;
    padding-right: 48px;
  } ;
`

const MainContent = styled.div`
  height: 315px;
  width: 100%;
  background: url('/images/bg_mobile_info.svg');
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  padding: 20px 16px;

  .get-xox {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    height: 43px;
  }

  .learn-more {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    width: 149px;
    height: 43px;
    border: 1px solid #ffffff;
    border-radius: 6px;
    margin-left: 16px;
    background: transparent;
  }

  .title {
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
    color: #ffbd3c;
  }

  .subtitle {
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.87);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    height: 200px;
    padding: 30px 24px;
    background: url('/images/bg.svg');
    background-repeat: no-repeat;
    background-size: cover;
    .title {
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      color: #ffbd3c;
    }

    .subtitle {
      font-weight: 700;
      font-size: 36px;
      line-height: 44px;
      color: rgba(255, 255, 255, 0.87);
    }

    .get-xox {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      height: 43px;
    }

    .learn-more {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      width: 149px;
      height: 43px;
      border: 1px solid #ffffff;
      border-radius: 6px;
      margin-left: 16px;
      background: transparent;
    }
  }
`

const InfoNav: React.FC<{ allTokens: any, textContentBanner?: string }> = ({ allTokens, textContentBanner }) => {
  const router = useRouter()
  const chainPath = useMultiChainPath()
  const { chainId } = useActiveChainId()
  const native = useNativeCurrency()

  const baseToken = chainId === 1 || chainId === 5 ? 'USDC' : 'BUSD'

  const inputCurrency = Object.values(allTokens).find((value: any) => value.symbol === baseToken)

  return (
    <NavWrapper>
      <MainContent>
        <Text className="title" marginBottom="16px">
        Swap to get XOX & XOXS. Earn like a Pro
        </Text>
        <Text className="subtitle" marginBottom="16px">
          {textContentBanner || "Stake XOXS automatically to earn more"}
        </Text>
        <a
          href={`/swap?chainId=${chainId}&outputCurrency=${XOX_ADDRESS[chainId]}&inputCurrency=${USD_ADDRESS[chainId]}`}
          target="_blank" rel="noreferrer"
        >
          <Button className="get-xox">Get XOX</Button>
        </a>
        <a href="/whitepaper" target="_blank" rel="noreferrer">
          <Button className="learn-more">Learn More</Button>
        </a>
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
