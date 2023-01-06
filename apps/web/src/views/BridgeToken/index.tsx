/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
import { useContext, useState, useCallback, useEffect } from 'react'
import { Currency } from '@pancakeswap/sdk'
import { Flex, BottomDrawer, useMatchBreakpoints, useModal } from '@pancakeswap/uikit'
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
import Reminder from './Reminder'
import AddressInput from './AddressInput'
import { getAddress } from '@ethersproject/address'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import tryParseAmount from '@pancakeswap/utils/tryParseAmount'
import ConnectWalletButton from '../../components/ConnectWalletButton';
import TransactionsModal from 'components/App/Transactions/TransactionsModal'

import styled from 'styled-components'

const ButtonConnect = styled.button`
  background: ${({ theme }) => theme.colors.secondary};
  margin: 20px 0;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white};
  min-height: 54px;
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  justify-content: center;
  border: none;
`;

const SwapButton = styled.button`
  background: ${({ theme, disabled }) =>
  disabled ? 'rgba(255, 255, 255, 0.05) ': theme.colors.primary};
  color: ${({ theme, disabled }) =>
  disabled ? "rgba(255, 255, 255, 0.38)" : theme.colors.white};
  width: 100%;
  border-radius: 8px;
  padding: 17px 20px;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 24px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;

  > span {
    margin-right: 8px;
  }
`;

const Divider = styled.div`
  padding: 0 12px;
  margin: -5px 0;
  text-align: center;

  @media screen and (min-width: 576px) {
    padding: 0 25px;
    margin: 10px 0;
  }
`;

const WapperConnectBtn = styled(ConnectWalletButton)`
  width: 100%;
  margin-top: 20px;
  height: 54px;
  font-size: 18px;
  font-weight: 700;
  border-radius: 8px;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`

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
  const { isMobile } = useMatchBreakpoints();
  const [amountInput, setAmountInput] = useState("");
  const [defaultToken, setDefaultToken] = useState(TOKENS_SUPPORT?.[chainId]?.[0]);
  const [indexToken, setIndexToken] = useState(0);
  const [isShowDropFrom, setIsShowDropFrom] = useState(false);
  const [isShowDropTo, setIsShowDropTo] = useState(false);
  const [minAmount, setMinAmount] = useState<number>(0);
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [messageAddress, setMessageAddress] = useState("");
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const { t } = useTranslation()
  const [addressTokenInput, setAddressTokenInput] = useState(
    TOKENS_SUPPORT[chainId]?.[0].address
  );
  const [amountTo, setAmountTo] = useState<string>("");
  const [tokenB, setTokenB] = useState(
    TOKENS_SUPPORT[getChainIdToByChainId(chainId)]?.[0]
  );

  // swap state & price data
  const {
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()
  const { address: account } = useAccount()
  const balanceInput = useCurrencyBalance(
    account ?? undefined,
    TOKENS_SUPPORT[chainId]?.[indexToken]
  )
  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)

  const [chainIdSupport, setChainIdSupport] = useState(chainId);
  const [addressTo, setAddressTo] = useState(account);
  const [messageButton, setMessageButton] = useState("Enter an amount");
  const [approvalState, approveCallback] = useApproveCallback(
    TOKENS_SUPPORT[chainId]?.[indexToken] &&
      tryParseAmount(amountInput, TOKENS_SUPPORT[chainId]?.[indexToken]),
    // BRIDGE_TOKEN_ADDRESS[chainId]
  );

  const currencies: { [field in Field]?: Currency } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined,
  }

  useEffect(() => {
    setAddressTo(account);
  }, [account]);

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

  const handleShowDropTo = () => {
    setIsShowDropTo(!isShowDropTo);
    setIsShowDropFrom(false);
  };

  const isAddress = (value: any) => {
    try {
      return getAddress(value)
    } catch {
      return false
    }
  }

  const handleAddressTo = (value) => {
    setAddressTo(value);
    const validAdress = isAddress(value);
    if (!validAdress) {
      setMessageAddress("Please enter a valid address!");
    } else setMessageAddress("");
  };

  // handle approve STAND to contract
  const handleApprove = useCallback(async () => {
    await approveCallback();
  }, [approveCallback]);

  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)

  // handle click button Swap, approve or swap
  const handleSwapButtonClick = () => {
    if (
      approvalState === ApprovalState.NOT_APPROVED ||
      approvalState === ApprovalState.UNKNOWN
    ) {
      handleApprove();
      return;
    }

    setIsOpenConfirm(true);
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
    return null;
  };

  return (
    <Page>
      <Flex width={['328px', , '100%']} height="100%" justifyContent="center" position="relative">
        <Flex flexDirection="column" position="relative">
          <svg width="591" height="743" viewBox="0 0 591 743" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_8007_31104)">
            <path d="M570.777 45.4999L531.696 17.8377C530.007 16.6421 527.988 16 525.919 16H65.0849C63.0154 16 60.9968 16.6421 59.3076 17.8377L20.2261 45.4999C17.5777 47.3745 16.0035 50.4175 16.0034 53.6622L16.0002 694.511V717C16.0002 722.523 20.4773 727 26.0002 727H61.9007H529.096H564.997C570.52 727 574.997 722.523 574.997 717V694.511L575 53.6622C575 50.4175 573.426 47.3745 570.777 45.4999Z" fill="#242424"/>
            <path d="M569.911 46.7242L530.829 19.0621C529.393 18.0458 527.678 17.5 525.919 17.5H65.0849C63.3258 17.5 61.61 18.0458 60.1742 19.0621L21.0927 46.7243C18.8416 48.3177 17.5035 50.9042 17.5034 53.6622L17.5002 694.511V717C17.5002 721.694 21.3058 725.5 26.0002 725.5H61.9007H529.096H564.997C569.691 725.5 573.497 721.694 573.497 717V694.511L573.5 53.6622C573.5 50.9042 572.162 48.3176 569.911 46.7242Z" stroke="url(#paint0_linear_8007_31104)" strokeWidth="3"/>
            </g>
            <defs>
            <filter id="filter0_d_8007_31104" x="0.000183105" y="0" width="591" height="743" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="8"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8007_31104"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_8007_31104" result="shape"/>
            </filter>
            <linearGradient id="paint0_linear_8007_31104" x1="254.5" y1="16" x2="253.029" y2="531.999" gradientUnits="userSpaceOnUse">
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
                <Button onClick={onPresentTransactionsModal}>
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
                </Button>
              </StyledHeader>
              <AmountInput
                isTokenFrom
                inputChainId={chainIdSupport}
                balance={balanceInput ? balanceInput?.toExact() : "-"}
                amount={amountInput}
                handleUserInput={handleUserInput}
                handleBalanceMax={(balance) => setAmountInput(balance)}
                switchNetwork={switchNetwork}
                tokenSymbol={defaultToken?.symbol}
                switchToken={switchToken}
                isShowDrop={isShowDropFrom}
                handleShowDrop={handleShowDropFrom}
              />
              <Divider>
                <div
                  onClick={() => {
                    switchNetwork();
                  }}
                  aria-hidden="true"
                >
                  <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15.5" cy="15" r="15" fill="#303030"/>
                    <path d="M15.5042 20.9498V9" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21.5 15L15.5 21L9.5 15" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Divider>
              <AmountInput
                isTokenFrom={false}
                inputChainId={getChainIdToByChainId(chainIdSupport)}
                amount={amountTo}
                switchNetwork={switchNetwork}
                tokenSymbol={tokenB?.symbol}
                switchToken={switchToken}
                isShowDrop={isShowDropTo}
                handleShowDrop={handleShowDropTo}
              />
              {account && (
                <AddressInput
                  address={addressTo}
                  handleAddressTo={handleAddressTo}
                  messageAddress={messageAddress}
                />
              )}
              {!account ? (
                <WapperConnectBtn>
                  Connect Wallet
                </WapperConnectBtn>
              ) : (
                <SwapButton
                  disabled={
                    (messageButton !== "Swap" &&
                      messageButton !==
                        `Approve ${TOKENS_SUPPORT[chainId]?.[indexToken].symbol}`) ||
                    messageAddress !== "" ||
                    amountTo === ""
                  }
                  onClick={handleSwapButtonClick}
                >
                  <span>{messageButton}</span>
                  {approvalState === ApprovalState.PENDING && (
                    <span>Loader...</span>
                  )}
                </SwapButton>
              )}
              <Reminder
                chainId={chainId}
                tokenInput={defaultToken}
                tokenOutput={tokenB}
                amount={amountInput}
                // eslint-disable-next-line @typescript-eslint/no-shadow
                onBridgeTokenFeeChange={(minAmount, maxAmount) => {
                  setMinAmount(Number(minAmount));
                  setMaxAmount(Number(maxAmount));
                }}
                setAmountTo={setAmountTo}
              />
            </StyledInputCurrencyWrapper>
          </StyledSwapContainer>
        </Flex>
      </Flex>
    </Page>
  )
}
