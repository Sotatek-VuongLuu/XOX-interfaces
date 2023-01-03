/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
import { useContext, useState } from 'react'
import { Currency } from '@pancakeswap/sdk'
import { Flex, BottomDrawer, useMatchBreakpoints } from '@pancakeswap/uikit'
import { AppBody } from 'components/App'

import { useCurrency } from '../../hooks/Tokens'
import { Field } from '../../state/swap/actions'
import { useSwapState, useSingleTokenSwapInfo } from '../../state/swap/hooks'
import Page from '../Page'
import { useTranslation } from '@pancakeswap/localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

import { StyledInputCurrencyWrapper, StyledSwapContainer, StyledHeader, StyledHeading1 } from './styles'
import AmountInput from "./AmountInput";
import { useActiveChainId, useLocalNetworkChain } from 'hooks/useActiveChainId'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useAccount } from 'wagmi'
import { ChainId } from '@pancakeswap/sdk'
import { TOKENS_SUPPORT } from "./tokensSupport";

import styled from 'styled-components'

export const getChainIdToByChainId = (chainId: any) => {
  switch (chainId) {
    case ChainId.RINKEBY:
      return ChainId.BSC_TESTNET;
    case ChainId.BSC_TESTNET:
      return ChainId.RINKEBY;
    default:
      return chainId;
  }
};

export default function BridgeToken() {
  const { chainId } = useActiveChainId();
  const { library } = useActiveWeb3React();
  const { isMobile } = useMatchBreakpoints();
  const [amountInput, setAmountInput] = useState("");
  const [defaultToken, setDefaultToken] = useState(TOKENS_SUPPORT[chainId][0]);
  const [indexToken, setIndexToken] = useState(0);
  const [isShowDropFrom, setIsShowDropFrom] = useState(false);
  const [isShowDropTo, setIsShowDropTo] = useState(false);
  const { t } = useTranslation()
  const [addressTokenInput, setAddressTokenInput] = useState(
    TOKENS_SUPPORT[chainId][0].address
  );
  const [tokenB, setTokenB] = useState(
    TOKENS_SUPPORT[getChainIdToByChainId(chainId)][0]
  );

  // swap state & price data
  const {
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()
  const { address: account } = useAccount()
  const balanceInput = useCurrencyBalance(
    account ?? undefined,
    TOKENS_SUPPORT[chainId][indexToken]
  )
  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)

  const [chainIdSupport, setChainIdSupport] = useState(chainId);

  const currencies: { [field in Field]?: Currency } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined,
  }

  // handle user type input
  const handleUserInput = (value) => {
    const decimalRegExp = new RegExp(
      "^[+-]?([0-9]{0,20}([.][0-9]{0,18})?|[.][0-9]{0,18})$"
    );
    if (
      !value ||
      decimalRegExp.test(value) ||
      amountInput.length > value.length
    ) {
      setAmountInput(value);
    }
  };

  const switchToken = (index: any) => {
    setDefaultToken(TOKENS_SUPPORT[chainId][index]);
    setIndexToken(index);
    setAddressTokenInput(TOKENS_SUPPORT[chainId][index].address);
    setTokenB(TOKENS_SUPPORT[getChainIdToByChainId(chainId)][index]);
  };

  const handleShowDropFrom = () => {
    setIsShowDropFrom(!isShowDropFrom);
    setIsShowDropTo(false);
  };

  // handle switch network
  const switchNetwork = (chainIdToSwitch: ChainId) => {
    // cookie.set("chainId", chainIdToSwitch);
    if (account) {
      // TODO:Switch Network
      //   if (chainIdToSwitch === ChainId.MAINNET) {
      //     library?.send("wallet_switchEthereumChain", [
      //       { chainId: "0x1" },
      //       account,
      //     ]);
      //   } else if (chainIdToSwitch === ChainId.RINKEBY) {
      //     library?.send("wallet_switchEthereumChain", [
      //       { chainId: "0x4" },
      //       account,
      //     ]);
      //   } else {
      //     library?.send("wallet_addEthereumChain", [
      //       NETWORK_PARAMS[chainIdToSwitch],
      //       account,
      //     ]);
      //   }
      // } else {
      //   localStorage.setItem("chainId", chainIdToSwitch.toString());
      //   dispatch(setChainIdDisconnect({ chainId: chainIdToSwitch }));
    }
    if (!account) setChainIdSupport(chainIdToSwitch);
    setAmountInput("");
  };

  return (
    <Page>
      <Flex width={['328px', , '100%']} height="100%" justifyContent="center" position="relative">
        <Flex flexDirection="column" position="relative">
          <svg width="591" height="678" viewBox="0 0 591 678" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_8007_30824)">
            <path d="M570.777 45.4999L531.696 17.8377C530.006 16.6421 527.988 16 525.918 16H65.0847C63.0152 16 60.9966 16.6421 59.3074 17.8377L20.2259 45.4999C17.5776 47.3745 16.0033 50.4175 16.0033 53.6622L16 629.511V652C16 657.523 20.4772 662 26 662H61.9005H529.096H564.997C570.519 662 574.997 657.523 574.997 652V629.511L575 53.6622C575 50.4175 573.426 47.3745 570.777 45.4999Z" fill="#242424"/>
            <path d="M569.911 46.7242L530.829 19.0621C529.393 18.0458 527.677 17.5 525.918 17.5H65.0847C63.3256 17.5 61.6098 18.0458 60.174 19.0621L21.0925 46.7243C18.8414 48.3177 17.5033 50.9042 17.5033 53.6622L17.5 629.511V652C17.5 656.694 21.3056 660.5 26 660.5H61.9005H529.096H564.997C569.691 660.5 573.497 656.694 573.497 652V629.511L573.5 53.6622C573.5 50.9042 572.162 48.3176 569.911 46.7242Z" stroke="url(#paint0_linear_8007_30824)" strokeWidth="3"/>
            </g>
            <defs>
            <filter id="filter0_d_8007_30824" x="0" y="0" width="591" height="678" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="8"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8007_30824"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_8007_30824" result="shape"/>
            </filter>
            <linearGradient id="paint0_linear_8007_30824" x1="254.5" y1="16" x2="253.029" y2="531.999" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6437FF"/>
            <stop offset="0.442708" stopColor="#9F59FF" stopOpacity="0"/>
            </linearGradient>
            </defs>
          </svg>
          <StyledSwapContainer>
            <StyledInputCurrencyWrapper>
                <StyledHeader>
                  <div>
                    <StyledHeading1>{t('Swap')}</StyledHeading1>
                    <p>{t('Trade tokens in an instant')} </p>
                  </div>
                  <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2.90918 3.36365V7H6.54556"
                      stroke="#8E8E8E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12C2 17.5229 6.47715 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2C8.299 2 5.06755 4.01056 3.33839 6.99905"
                      stroke="#8E8E8E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.0026 6L12.002 12.0044L16.2417 16.2441"
                      stroke="#8E8E8E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                </svg>
                  </span>
                </StyledHeader>
                <AmountInput
                  isTokenFrom
                  inputChainId={chainIdSupport}
                  balance={balanceInput ? balanceInput?.toExact() : "-"}
                  amount={amountInput}
                  handleUserInput={handleUserInput}
                  handleBalanceMax={(balance) => setAmountInput(balance)}
                  switchNetwork={switchNetwork}
                  tokenSymbol={defaultToken.symbol}
                  switchToken={switchToken}
                  isShowDrop={isShowDropFrom}
                  handleShowDrop={handleShowDropFrom}
                />
            </StyledInputCurrencyWrapper>
          </StyledSwapContainer>
        </Flex>
      </Flex>
    </Page>
  )
}
