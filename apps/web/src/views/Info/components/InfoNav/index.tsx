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
  useMatchBreakpoints,
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

interface INavWrapper {
  hasPadding?: boolean
}

const NavWrapper = styled(Flex)<INavWrapper>`
  padding: ${({ hasPadding }) => (hasPadding ? '28px 24px 24px' : '0')};

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 5fr 2fr;
    padding-left: ${({ hasPadding }) => (hasPadding ? '48px' : '0')};
    padding-right: ${({ hasPadding }) => (hasPadding ? '48px' : '0')};
  } ;
`

const MainContent = styled.div`
  width: 100%;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px 16px;
  position: relative;

  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: -1;
    border-bottom: 2px solid #ffffff30;
    border-left: 2px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    left: 0;
    z-index: -1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: -1;
    border-bottom: 2px solid #ffffff30;
    border-right: 2px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: -1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  & > img {
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    top: 0;
    /* width: 397px;
    max-width: unset; */
    width: auto;
    height: auto;
    object-fit: cover;
  }

  .get-xox {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    height: 37px;
    border-radius: 10px;
    padding: 10px 20px;
    box-shadow: none;
    position: relative;
    border: 1px solid #ffffff;
    color: #ffffff;
    background: #ffffff;
    color: #000000;
    :hover {
      border: 1px solid #ffffff;
      color: #ffffff;
      background: #000000;
    }
  }

  .learn-more {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    height: 37px;
    border: 1px solid #ffffff;
    border-radius: 10px;
    margin-left: 16px;
    background: transparent;
    padding: 10px 20px;
    box-shadow: none;
    position: relative;
  }

  .learn-more:hover {
    background: #ffffff;
    color: #000000;
    opacity: 1 !important;
  }

  .title {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.075em;
    color: rgba(255, 255, 255, 0.6);
  }

  .subtitle {
    font-weight: 600;
    font-size: 18px;
    line-height: 32px;
    letter-spacing: 0.075em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.87);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    height: 200px;
    padding: 30px 40px;

    & > img {
      position: absolute;
      transform: translate(0, -50%);
      top: 50%;
      left: unset;
      right: 0;

      width: 740px;
      height: 200px;
      object-fit: cover;
    }

    .corner1 {
      border-bottom: 1px solid #ffffff30;
      border-left: 1px solid #ffffff30;
    }

    .edge1 {
      width: 1px;
    }

    .corner2 {
      border-bottom: 1px solid #ffffff30;
      border-right: 1px solid #ffffff30;
    }

    .edge2 {
      width: 1px;
    }

    .title {
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      letter-spacing: 0.075em;
      color: rgba(255, 255, 255, 0.6);
    }

    .subtitle {
      font-weight: 600;
      font-size: 24px;
      line-height: 29px;
      letter-spacing: 0.075em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.87);
    }

    .get-xox {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      width: 149px;
      height: 43px;
      border-radius: 10px;
      box-shadow: none;

      background: transparent;
      background: #ffffff;
      color: #000000;
      :hover {
        border: 1px solid #ffffff;
        color: #ffffff;
        background: #000000;
      }
    }

    .learn-more {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      width: 149px;
      height: 43px;
      border: 1px solid #ffffff;
      border-radius: 10px;
      margin-left: 16px;
      background: transparent;
      box-shadow: none;
    }
  }
`

const InfoNav: React.FC<{ textContentBanner?: any; hasPadding?: boolean; titleBtn1?: string }> = ({
  textContentBanner,
  hasPadding = true,
  titleBtn1 = 'XOXS',
}) => {
  const { chainId } = useActiveChainId()
  const { isMobile } = useMatchBreakpoints()

  return (
    <NavWrapper hasPadding={hasPadding}>
      <MainContent>
        <div className="corner1" />
        <div className="edge1" />
        <div className="corner2" />
        <div className="edge2" />
        {isMobile ? <img alt="" src="/images/galaxy-mb.png" /> : <img alt="" src="/images/galaxy-pc.png" />}

        <Text className="title" marginBottom="8px" mt={['118px', , '0']}>
          Swap to get XOX & XOXS. Earn like a Pro
        </Text>
        <Text className="subtitle" mb={['16px', , '24px']}>
          {textContentBanner || 'Stake XOXS automatically to earn more'}
        </Text>
        <Flex>
          <a
            href={`/swap?chainId=${chainId}&outputCurrency=${XOX_ADDRESS[chainId]}&inputCurrency=${USD_ADDRESS[chainId]}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button className="get-xox">
              {/* <div className="top-left"></div>
              <div className="top-right"></div>
              <div className="bottom-left"></div>
              <div className="bottom-right"></div> */}
              Get {titleBtn1}
            </Button>
          </a>
          <a href="/whitepaper" target="_blank" rel="noreferrer">
            <Button className="learn-more">
              {/* <div className="top-left"></div>
              <div className="top-right"></div>
              <div className="bottom-left"></div>
              <div className="bottom-right"></div> */}
              Learn More
            </Button>
          </a>
        </Flex>
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
      avatarSrc={`/images/chains/${multiChainId[chainName]}.svg`}
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
