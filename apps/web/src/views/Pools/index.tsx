/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import styled from 'styled-components'
import { Flex, Text, Button, useModal, useMatchBreakpoints, LinkExternal } from '@pancakeswap/uikit'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useContractFarmingLP, useXOXPoolContract } from 'hooks/useContract'
import useWindowSize from 'hooks/useWindowSize'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getContractFarmingLPAddress, getXOXPoolAddress } from 'utils/addressHelpers'
import { formatEther, formatUnits, parseEther } from '@ethersproject/units'
import { USD_ADDRESS, USD_DECIMALS, XOX_ADDRESS, XOX_LP } from 'config/constants/exchange'
import { useConnect, useProvider } from 'wagmi'
import { getBalancesForEthereumAddress } from 'ethereum-erc20-token-balances-multicall'
import SwapMainBackgroundMobile from 'components/Svg/LiquidityMainBackgroundMobile'
import SwapMainBackgroundDesktop from 'components/Svg/SwapMainBackgroundDesktop'
import { getUserFarmingData } from 'services/pools'
import { NETWORK_LINK } from 'views/BridgeToken/networks'
import ModalBase from 'views/Referral/components/Modal/ModalBase'
import { GridLoader } from 'react-spinners'
import { Tooltip } from '@mui/material'
import { useActiveHandle } from 'hooks/useEagerConnect.bmp'
import { useSelector } from 'react-redux'
import useAuth from 'hooks/useAuth'
import { AppState } from 'state'
import { createWallets, getDocLink } from 'config/wallet'
import { useTranslation } from '@pancakeswap/localization'
import { WalletModalV2 } from '@pancakeswap/ui-wallets'
import { ChainId } from '@pancakeswap/sdk'
import { XOXLP } from '@pancakeswap/tokens'
import tryParseAmount from '@pancakeswap/utils/tryParseAmount'
import { useApproveCallback, ApprovalState } from 'hooks/useApproveCallback'
import { Context } from '@pancakeswap/uikit/src/widgets/Modal/ModalContext'
import Dots from 'components/Loader/Dots'
import { linkTransaction } from 'views/BridgeToken'
import BigNumber from 'bignumber.js'
import ModalStake from './components/ModalStake'
import PairToken from './components/PairToken'
import ModalUnStake from './components/ModalUnStake'
import { Content } from './components/style'
import ShowBalance from './components/ShowBalance'

const NavWrapper = styled(Flex)`
  padding: 28px 24px 24px;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 5fr 2fr;
    padding-left: 48px;
    padding-right: 48px;
  } ;
`

const Banner = styled.div`
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

const Main = styled.div`
  width: 1200px;
  a:hover {
    text-decoration: underline;
  }
  .flex {
    display: flex;
    align-items: center;
  }
  ._flex {
    display: flex;
  }
  .space_between {
    justify-content: space-between;
    align-items: center;
  }
  .content_container {
    border-radius: 10px;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
    background: #242424;
    padding: 24px 0px;
    .header_container {
      padding: 0px 21px;

      .header {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        .name {
          font-weight: 500;
          font-size: 14px;
          line-height: 17px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 8px;
        }
        .value {
          font-weight: 700;
          font-size: 14px;
          line-height: 17px;
          color: rgba(255, 255, 255, 0.87);
          /* text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          max-width: 100px; */
        }
        .liquidity {
          /* text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          max-width: 100px; */
        }
        .flex_direction {
          flex-direction: column;
          align-items: flex-start;
        }

        .u_question {
          margin-left: 9px;
          min-width: 20px;
        }
        .mb_mr {
          margin-right: 50px;
        }
        @media screen and (max-width: 576px) {
          grid-template-columns: 1fr;
        }
      }
      @media screen and (max-width: 576px) {
        padding: 0px 10px;
      }
    }
    .diver {
      border-bottom: 1px solid #444444;
      margin-top: 24px;
    }

    .create_lp {
      padding: 24px;
      margin-top: 24px;
      background: #1d1d1d;
      display: grid;
      grid-template-columns: 0.5fr 1.25fr 1.25fr;
      gap: 20px;
      .get_xox_lp {
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #9072ff;
      }
      .rectangle {
        padding: 16px;
        height: 100%;
        border: 1px solid #444444;
        border-radius: 8px;
        .current_XOX_reward {
          font-weight: 700;
          font-size: 14px;
          line-height: 17px;
          color: rgba(255, 255, 255, 0.6);
          .xox_enable {
            color: #9072ff !important;
          }
        }
        .current_XOX_reward_value {
          font-weight: 700;
          font-size: 20px;
          line-height: 24px;
          color: rgba(255, 255, 255, 0.87);
          /* margin-top: 16px; */
          /* text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          max-width: 130px; */
          @media screen and (max-width: 576px) {
            font-size: 18px;
            line-height: 22px;
          }
        }
        .user_stake {
          font-weight: 700;
          font-size: 20px;
          line-height: 24px;
          color: rgba(255, 255, 255, 0.87);
          /* margin-top: 16px; */
          /* text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          max-width: 100px; */
          @media screen and (max-width: 576px) {
            font-size: 18px;
            line-height: 22px;
          }
        }

        .user_stake_name_lp {
          font-weight: 700;
          font-size: 20px;
          line-height: 24px;
          color: rgba(255, 255, 255, 0.87);
          @media screen and (max-width: 576px) {
            font-size: 18px;
            line-height: 22px;
          }
        }

        @media screen and (max-width: 576px) {
          flex-direction: column;
          align-items: flex-start;
        }
      }

      .enable_farm {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .nable {
          padding: 12px 0px;
          background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
          border-radius: 6px;
          border: none;
          font-weight: 700;
          font-size: 16px;
          line-height: 19px;
          color: #ffffff;
          cursor: pointer;
          width: 100%;
          @media screen and (max-width: 576px) {
            width: 100%;
          }
        }
        .mt {
          margin-top: 16px;
        }
      }
      .withdraw {
        padding: 12px 30px;
        background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
        border-radius: 6px;
        border: none;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        color: #ffffff;
        cursor: pointer;
        &:disabled,
        button[disabled] {
          font-weight: 700;
          font-size: 16px;
          line-height: 19px;
          background: #313131;
          color: rgba(255, 255, 255, 0.38);
          cursor: not-allowed;
        }
        @media screen and (max-width: 576px) {
          width: 100%;
          margin-top: 16px;
        }
      }

      .earned_mb {
        margin: 16px 0px;
      }
      .name {
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: rgba(255, 255, 255, 0.6);
      }
      .value {
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: rgba(255, 255, 255, 0.87);
        /* text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 100px; */
      }
      .u_question {
        margin-left: 9px;
        min-width: 20px;
      }
      .lp_mb {
        margin-bottom: 16px;
      }

      .group_btn_stake {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-top: 16px;
        width: 100%;
        .container_unstake_border {
          background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
          border-radius: 6px;
          padding: 2px;
          cursor: pointer;
          .inner_container {
            display: flex;
            background: #1d1d1d;
            height: 100%;
            width: 100%;
            border-radius: inherit;
            justify-content: center;
            align-items: center;
            span {
              font-weight: 700;
              font-size: 16px;
              line-height: 19px;
              background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              text-fill-color: transparent;
            }
          }
        }
      }
      @media screen and (max-width: 576px) {
        grid-template-columns: 1fr;
        padding: 21px 18px;
      }
    }
  }
`

const MainBackground = styled.div`
  position: absolute;
  z-index: -1;
  top: -50px;
  left: 0;
  right: 0;
  bottom: 0;
  svg {
    width: 100vw;
    height: auto;
    object-fit: cover;
  }
`

const CustomButton = styled(Button)`
  height: 37px;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 43px;
  }
  &:disabled,
  button[disabled] {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    background: #313131 !important;
    color: rgba(255, 255, 255, 0.38) !important;
    cursor: not-allowed !important;
  }
`
interface IPropsButtonUnStake {
  disabled?: boolean
}
const ButtonUnStake = styled.div<IPropsButtonUnStake>``

export const linkAddressScan = (chainId) => {
  return `${NETWORK_LINK[chainId]}/address/`
}

export const NETWORK_LABEL: { [chainId in ChainId]?: string } = {
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.BSC_TESTNET]: 'Bsc',
  [ChainId.BSC]: 'Bsc',
  [ChainId.ETHEREUM]: 'Ether',
  [ChainId.GOERLI]: 'Ether',
}

const Pools: React.FC<React.PropsWithChildren> = () => {
  const [aprPercent, setAprPercent] = useState<null | string | number>(null)
  const [pendingRewardOfUser, setPendingRewardOfUser] = useState<any>(null)
  const [liquidity, setLiquidity] = useState<null | number | string>(null)
  const [totalSupplyLP, setTotalSupplyLP] = useState<any>(null)
  const [userStaked, setUserStaked] = useState<null | string>()
  const [reserve, setReserve] = useState<any>()
  const { chainId } = useActiveChainId()
  const { account } = useActiveWeb3React()
  const [enable, setEnable] = useState(false)
  const { width } = useWindowSize()
  const chainIdSupport = [97, 56]
  const contractFarmingLP = useContractFarmingLP()
  const contractPair = useXOXPoolContract()
  const provider = useProvider({ chainId })
  const [balanceLP, setBalanceLP] = useState<any>()
  const { isMobile } = useMatchBreakpoints()
  const [modalReject, setModalReject] = useState<{ isShow: boolean; message: string }>({ isShow: false, message: '' })
  const [isOpenLoadingClaimModal, setIsOpenLoadingClaimModal] = useState<boolean>(false)
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false)
  const [txHash, setTxHash] = useState('')
  const [earned, setEarned] = useState<any>(null)
  const [amount, setAmount] = useState('')
  const [amountUnStake, setAmountUnStake] = useState('')
  const [notiMess, setNotiMess] = useState('')
  const [loadOk, setLoadOk] = useState(false)
  const addressFarming = getContractFarmingLPAddress(chainId)
  const [pendingApprove, setPendingApprove] = useState(false)
  const { nodeId } = useContext(Context)
  const [isLoadingApproval, setIsLoadingApproval] = useState(false)
  const [approvalState, approveCallback] = useApproveCallback(
    XOX_LP[chainId] && tryParseAmount('0.01', XOXLP[chainId]),
    getContractFarmingLPAddress(chainId),
  )

  const handleGetDataFarming = async () => {
    try {
      const [reserves, totalSupplyBN, amountFarmingBN, endBlock, startBlock, rewardPBlock, pendingReward, userInfo] =
        await Promise.all([
          contractPair.getReserves(),
          contractPair.totalSupply(),
          contractPair.balanceOf(addressFarming),
          contractFarmingLP.bonusEndBlock(),
          contractFarmingLP.startBlock(),
          contractFarmingLP.rewardPerBlock(),
          contractFarmingLP.pendingReward(account),
          contractFarmingLP.userInfo(account),
        ])

      const totalSupply = formatEther(totalSupplyBN._hex)
      const reserves1 = formatUnits(reserves[1]._hex, USD_DECIMALS[chainId])

      setTotalSupplyLP(totalSupply)
      if (!Number(formatEther(userInfo[0]._hex))) {
        setUserStaked(null)
      } else {
        setUserStaked(formatEther(userInfo[0]._hex))
      }

      setReserve(reserves1)
      setPendingRewardOfUser(formatEther(pendingReward._hex))
      const balanceOfFarming = formatEther(amountFarmingBN._hex)

      const delta = new BigNumber(endBlock.toNumber() - startBlock.toNumber())

      getDataFarming()
      if (!balanceOfFarming) {
        setAprPercent(0)
      } else {
        const resultPercent = delta
          .multipliedBy(100)
          .multipliedBy(formatEther(rewardPBlock._hex))
          .dividedBy(balanceOfFarming)
          .toFixed(18)
          .toString()

        setAprPercent(resultPercent)
      }

      const amountLiquidity = new BigNumber(balanceOfFarming)
        .multipliedBy(reserves1)
        .dividedBy(totalSupply)
        .toFixed(18)
        .toString()

      setLiquidity(amountLiquidity)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`error`, error)
    }
  }

  useEffect(() => {
    if (!account || !chainId) return
    const currentProvider = provider
    getBalancesForEthereumAddress({
      // erc20 tokens you want to query!
      contractAddresses: [getXOXPoolAddress(chainId)],
      // ethereum address of the user you want to get the balances for
      ethereumAddress: account,
      // your ethers provider
      providerOptions: {
        ethersProvider: currentProvider,
      },
    })
      .then((balance) => {
        setBalanceLP(balance.tokens[0].balance)
      })
      .catch((error) => {
        console.warn(error)
      })
  }, [account, chainId, provider, isOpenSuccessModal])

  const handleWithdraw = async () => {
    try {
      setNotiMess(`Withdraw ${pendingRewardOfUser} XOX`)
      setIsOpenLoadingClaimModal(true)
      const gasFee = await contractFarmingLP.estimateGas.withdraw(0)
      const txWithdraw = await contractFarmingLP.withdraw(0, {
        gasLimit: gasFee,
      })
      const tx = await txWithdraw.wait(1)
      if (tx?.transactionHash) {
        // eslint-disable-next-line no-console
        setNotiMess('')
        setIsOpenLoadingClaimModal(false)
        setIsOpenSuccessModal(true)
        setTxHash(tx?.transactionHash)
        handleCallbackAfterSuccess()
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      // console.log(`error>>>`, error)
      setIsOpenLoadingClaimModal(false)
      setNotiMess('')
      if (error?.error?.message === 'execution reverted: ERC20: transfer amount exceeds balance') {
        setModalReject({ ...modalReject, isShow: true, message: 'Transfer amount exceeds balance' })
      }
      if (error?.message.includes('rejected')) {
        setModalReject({ ...modalReject, isShow: true, message: 'Transaction rejected.' })
      }
    }
  }

  const {
    t,
    currentLanguage: { code },
  } = useTranslation()

  const handleActive = useActiveHandle()
  const { connectAsync } = useConnect()
  const [open, setOpen] = useState(false)
  const userProfile = useSelector<AppState, AppState['user']['userProfile']>((state) => state.user.userProfile)
  const { login } = useAuth()
  const docLink = useMemo(() => getDocLink(code), [code])
  const wallets = useMemo(() => createWallets(chainId, connectAsync), [chainId, connectAsync])

  const handleClick = () => {
    if (typeof __NEZHA_BRIDGE__ !== 'undefined') {
      handleActive()
    } else {
      setOpen(true)
    }
  }

  const getDataFarming = async () => {
    try {
      const data = await getUserFarmingData(chainId, account)
      if (data?.userFarmingDatas[0]?.amount) {
        setEarned(formatEther(data?.userFarmingDatas[0]?.amount))
      } else {
        setEarned(0)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const handleConfirmWithdraw = async () => {
    try {
      setIsOpenLoadingClaimModal(true)
      setNotiMess(`Unstake ${amountUnStake} ${chainIdSupport.includes(chainId) ? 'XOX - BUSD' : 'XOX - USDC'} LP`)
      const gasFee = await contractFarmingLP.estimateGas.withdraw(parseEther(amountUnStake.toString()))
      const txWithdraw = await contractFarmingLP.withdraw(parseEther(amountUnStake.toString()), {
        gasLimit: gasFee,
      })
      const tx = await txWithdraw.wait(1)
      if (tx?.transactionHash) {
        // eslint-disable-next-line no-console
        setNotiMess('')
        setAmountUnStake('')
        setIsOpenLoadingClaimModal(false)
        setTxHash(tx?.transactionHash)
        onDismissStake()
        setIsOpenSuccessModal(true)
        handleCallbackAfterSuccess()
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(`error>>>`, error)
      setNotiMess('')
      setIsOpenLoadingClaimModal(false)
      if (error?.error?.message === 'execution reverted: ERC20: transfer amount exceeds balance') {
        setModalReject({ ...modalReject, isShow: true, message: 'Transfer amount exceeds balance' })
      }
      if (error?.message.includes('rejected')) {
        setModalReject({ ...modalReject, isShow: true, message: 'Transaction rejected.' })
      }
    }
  }

  const handleConfirmDeposit = async () => {
    try {
      setNotiMess(`Stake ${amount} ${chainIdSupport.includes(chainId) ? 'XOX - BUSD' : 'XOX - USDC'} LP`)
      setIsOpenLoadingClaimModal(true)
      const gasFee = await contractFarmingLP.estimateGas.deposit(parseEther(amount.toString()))
      const txDeposit = await contractFarmingLP.deposit(parseEther(amount.toString()), {
        gasLimit: gasFee,
      })
      const tx = await txDeposit.wait(1)
      if (tx?.transactionHash) {
        // eslint-disable-next-line no-console
        setNotiMess('')
        setIsOpenLoadingClaimModal(false)
        setTxHash(tx?.transactionHash)
        setAmount('')
        onDismissUnStake()
        setIsOpenSuccessModal(true)
        handleCallbackAfterSuccess()
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(`error>>>`, error)
      setNotiMess('')
      setIsOpenLoadingClaimModal(false)
      if (error?.error?.message === 'execution reverted: ERC20: transfer amount exceeds balance') {
        setModalReject({ ...modalReject, isShow: true, message: 'Transfer amount exceeds balance' })
      }
      if (error?.message.includes('rejected')) {
        setModalReject({ ...modalReject, isShow: true, message: 'Transaction rejected.' })
      }
    }
  }

  const handleCallbackAfterSuccess = async () => {
    await getDataFarming()
    await handleGetDataFarming()
  }

  const [onModalStake, onDismissStake] = useModal(
    <ModalStake
      balanceLP={balanceLP}
      totalSupply={totalSupplyLP}
      reverse={reserve}
      handleCallbackAfterSuccess={handleCallbackAfterSuccess}
      handleConfirm={handleConfirmDeposit}
      amount={amount}
      setAmount={setAmount}
    />,
    true,
    true,
    'ModalStake',
  )
  const [onModalUnStake, onDismissUnStake] = useModal(
    <ModalUnStake
      balanceLP={userStaked}
      totalSupply={totalSupplyLP}
      reverse={reserve}
      handleCallbackAfterSuccess={handleCallbackAfterSuccess}
      handleConfirm={handleConfirmWithdraw}
      amount={amountUnStake}
      setAmount={setAmountUnStake}
    />,
    true,
    true,
    'ModalUnStake',
  )

  const handleApprove = useCallback(async () => {
    await approveCallback()
    setPendingApprove(true)
    setIsLoadingApproval(true)
  }, [approveCallback])

  useEffect(() => {
    setAmount('')
    setAmountUnStake('')
  }, [nodeId])

  useEffect(() => {
    if (account && !userProfile) {
      setOpen(false)
    }
  }, [account, userProfile])

  useEffect(() => {
    if (!account || !chainId) return
    if (loadOk) window.location.reload()
    setLoadOk(true)
    const id = setInterval(() => {
      handleGetDataFarming()
    }, 10000)

    // eslint-disable-next-line consistent-return
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account])

  useEffect(() => {
    if (approvalState === ApprovalState.APPROVED) {
      setPendingApprove(false)
      setEnable(true)
      setIsLoadingApproval(false)
    } else {
      setEnable(false)
    }
  }, [approvalState, account, chainId])

  return (
    <>
      <MainBackground>{isMobile ? <SwapMainBackgroundMobile /> : <SwapMainBackgroundDesktop />}</MainBackground>
      <NavWrapper>
        <Banner>
          <Text className="title" marginBottom="16px">
            Add Liquidity. Earn Trading Fees
          </Text>
          <Text className="subtitle" marginBottom="16px">
            Level Up your DeFi Game
          </Text>
          <a
            href={`/add/${XOX_ADDRESS[chainId]}/${USD_ADDRESS[chainId]}?step=1&chainId=${chainId}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button className="get-xox">Get LP Token</Button>
          </a>
          <a href="/whitepaper" target="_blank" rel="noreferrer">
            <Button className="learn-more">Learn More</Button>
          </a>
        </Banner>
      </NavWrapper>

      <NavWrapper>
        <Main className="border-gradient-style">
          <div className="content_container">
            <div className="header_container">
              <div className="header">
                <div className="flex">
                  {chainIdSupport.includes(chainId) ? (
                    <PairToken linkTokenSecond="/images/1/tokens/BUSD.png" symbolTokenSecond="BUSD" />
                  ) : (
                    <PairToken />
                  )}
                </div>
                {width > 576 ? (
                  <>
                    <div className="flex flex_direction">
                      <span className="name">APR:</span>
                      {account ? (
                        <ShowBalance balance={aprPercent} unit="%" notSpace />
                      ) : (
                        <span className="value">-</span>
                      )}
                    </div>
                    <div className="flex flex_direction">
                      <span className="name">Earned:</span>
                      {account ? <ShowBalance balance={earned} unit="XOX" /> : <span className="value">-</span>}
                    </div>
                    <div className="flex flex_direction">
                      <span className="name">Liquidity</span>
                      <span className="value _flex">
                        {account ? (
                          <>
                            <ShowBalance balance={liquidity} name="liquidity" />
                            <Tooltip
                              title="Total value of the funds in this farm’s liquidity pair"
                              placement="top"
                              id="u_question_farming"
                            >
                              <span className="u_question">
                                <img src="/images/u_question-circle.svg" alt="u_question-circle" />
                              </span>
                            </Tooltip>
                          </>
                        ) : (
                          <span className="liquidity">-</span>
                        )}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex">
                    <div className="flex flex_direction mb_mr">
                      <span className="name">APR:</span>
                      {account ? (
                        <ShowBalance balance={aprPercent} unit="%" notSpace />
                      ) : (
                        <span className="value">-</span>
                      )}
                    </div>
                    <div className="flex flex_direction">
                      <span className="name">Earned:</span>
                      {account ? <ShowBalance balance={earned} unit="XOX" /> : <span className="value">-</span>}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="diver" />
            <div className="create_lp">
              {width > 576 && (
                <div className="get_xox_lp">
                  <div>
                    <a
                      href={`/add/${XOX_ADDRESS[chainId]}/${USD_ADDRESS[chainId]}?step=1&chainId=${chainId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p className="_flex">
                        <span>Get {chainIdSupport.includes(chainId) ? 'XOX - BUSD' : 'XOX - USDC'} LP</span>
                        <span style={{ marginLeft: 8 }}>
                          <img src="/images/external-icon.svg" alt="external-icon" />
                        </span>
                      </p>
                    </a>
                    <a
                      href={`${linkAddressScan(chainId)}${getXOXPoolAddress(chainId)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p className="_flex">
                        <span>View Contract</span>
                        <span style={{ marginLeft: 8 }}>
                          <img src="/images/external-icon.svg" alt="external-icon" />
                        </span>
                      </p>
                    </a>
                  </div>
                </div>
              )}
              <div>
                <div className="rectangle _flex space_between">
                  <div>
                    <p className="current_XOX_reward">Current XOX reward</p>
                    {account ? (
                      <div style={{ width: '100%', marginTop: 16 }}>
                        <ShowBalance balance={pendingRewardOfUser} unit="XOX" />
                      </div>
                    ) : (
                      <span className="current_XOX_reward_value">-</span>
                    )}
                  </div>
                  <CustomButton
                    type="button"
                    className="withdraw"
                    onClick={handleWithdraw}
                    disabled={!pendingRewardOfUser}
                  >
                    Withdraw
                  </CustomButton>
                </div>
              </div>
              <div>
                <div className="rectangle enable_farm">
                  <p className="current_XOX_reward">
                    {enable
                      ? userStaked
                        ? `${chainIdSupport.includes(chainId) ? 'XOX - BUSD' : 'XOX - USDC'} LP Staked`
                        : `Stake ${chainIdSupport.includes(chainId) ? 'XOX - BUSD' : 'XOX - USDC'} LP`
                      : 'Enable Farm'}
                  </p>
                  {enable && userStaked && (
                    <div style={{ width: '100%', marginTop: 16 }}>
                      <ShowBalance balance={userStaked} />
                    </div>
                  )}
                  {!enable ? (
                    account ? (
                      <CustomButton
                        type="button"
                        className="nable mt"
                        onClick={handleApprove}
                        disabled={pendingApprove}
                      >
                        {isLoadingApproval ? <Dots>Enabling</Dots> : 'Enable'}
                      </CustomButton>
                    ) : (
                      <CustomButton type="button" className="nable mt" onClick={handleClick}>
                        Connect Wallet
                      </CustomButton>
                    )
                  ) : enable && userStaked ? (
                    <div className="group_btn_stake">
                      {enable && userStaked && (
                        // eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events
                        <ButtonUnStake
                          className="container_unstake_border"
                          onClick={onModalUnStake}
                          role="button"
                          disabled={!reserve || !totalSupplyLP}
                        >
                          <div className="inner_container">
                            <span>Unstake</span>
                          </div>
                        </ButtonUnStake>
                      )}
                      <CustomButton
                        type="button"
                        className="nable"
                        onClick={onModalStake}
                        disabled={!reserve || !totalSupplyLP}
                      >
                        Stake
                      </CustomButton>
                    </div>
                  ) : (
                    <CustomButton
                      type="button"
                      className="nable mt"
                      onClick={onModalStake}
                      disabled={!reserve || !totalSupplyLP}
                    >
                      Stake
                    </CustomButton>
                  )}
                </div>
              </div>
              {width <= 576 && (
                <>
                  <div>
                    <p className="flex space_between apr_mb">
                      <span className="name">APR:</span>
                      {account ? (
                        <ShowBalance balance={aprPercent} unit="%" notSpace />
                      ) : (
                        <span className="value">-</span>
                      )}
                    </p>
                    <p className="flex space_between earned_mb">
                      <span className="name">Earned:</span>
                      {account ? <ShowBalance balance={earned} unit="XOX" /> : <span className="value">-</span>}
                    </p>
                    <p className="flex space_between liquidity_mb">
                      <span className="name">Liquidity:</span>
                      <span className="_flex">
                        {account ? (
                          <>
                            <ShowBalance balance={liquidity} name="liquidity" />
                            <Tooltip title="Total value of the funds in this farm’s liquidity pair" placement="top">
                              <span className="u_question">
                                <img src="/images/u_question-circle.svg" alt="u_question-circle" />
                              </span>
                            </Tooltip>
                          </>
                        ) : (
                          <span className="value">-</span>
                        )}
                      </span>
                    </p>
                  </div>
                  <div className="get_xox_lp">
                    <div>
                      <a
                        href={`/add/${XOX_ADDRESS[chainId]}/${USD_ADDRESS[chainId]}?step=1&chainId=${chainId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <p className="_flex lp_mb">
                          <span>Get {chainIdSupport.includes(chainId) ? 'XOX - BUSD' : 'XOX - USDC'} LP</span>
                          <span style={{ marginLeft: 8 }}>
                            <img src="/images/external-icon.svg" alt="external-icon" />
                          </span>
                        </p>
                      </a>
                      <a
                        href={`${linkAddressScan(chainId)}${getXOXPoolAddress(chainId)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <p className="_flex">
                          <span>View Contract</span>
                          <span style={{ marginLeft: 8 }}>
                            <img src="/images/external-icon.svg" alt="external-icon" />
                          </span>
                        </p>
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Main>
      </NavWrapper>
      <ModalBase
        open={modalReject.isShow}
        handleClose={() => setModalReject({ ...modalReject, isShow: false })}
        title="Confirm Farming"
      >
        <Content>
          <div className="noti_claim_pending_h1 xox_loading reject_xox" style={{ marginTop: '16px' }}>
            <img src="/images/reject_xox.png" alt="reject_xox" />
          </div>
          <div className="noti_claim_pending_h4">{modalReject.message}</div>
          <div className="btn_dismiss_container">
            <button
              className="btn_dismiss hv"
              type="button"
              onClick={() => setModalReject({ ...modalReject, isShow: false })}
            >
              Dismiss
            </button>
          </div>
          <img
            src="/images/close-one.svg"
            alt="close-one"
            className="x-close-icon"
            aria-hidden="true"
            onClick={() => setModalReject({ ...modalReject, isShow: false })}
          />
        </Content>
      </ModalBase>
      <ModalBase
        open={isOpenLoadingClaimModal}
        handleClose={() => setIsOpenLoadingClaimModal(false)}
        title="Confirm Farming"
      >
        <Content>
          <div className="xox_loading" style={{ margin: '24px 0px' }}>
            <GridLoader color="#9072FF" style={{ width: '51px', height: '51px' }} />
          </div>
          <div className="noti_claim_pending_h1">Waiting For Confirmation</div>
          <div className="noti_claim_pending_h3"> {notiMess}</div>
          <div className="noti_claim_pending_h2">Confirm this transaction in your wallet</div>
          <img
            src="/images/close-one.svg"
            alt="close-one"
            className="x-close-icon"
            aria-hidden="true"
            onClick={() => setIsOpenLoadingClaimModal(false)}
          />
        </Content>
      </ModalBase>
      <ModalBase open={isOpenSuccessModal} handleClose={() => setIsOpenSuccessModal(false)} title="Confirm Farming">
        <Content>
          <div className="noti_claim_success">
            <img src="/images/success_claim.png" alt="success_claim" />
          </div>
          <div className="submitted">Transaction Submitted</div>
          <p style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
            <LinkExternal
              href={`${linkTransaction(chainId)}${txHash}`}
              target="_blank"
              rel="noreferrer"
              color="#3D8AFF"
            >
              <div className="view_on">View on {NETWORK_LABEL[chainId]}scan</div>
            </LinkExternal>
          </p>
          <div className="btn_dismiss_container">
            <button className="btn_dismiss bg" type="button" onClick={() => setIsOpenSuccessModal(false)}>
              Close
            </button>
          </div>
        </Content>
      </ModalBase>
      <WalletModalV2
        docText={t('Learn How to Connect')}
        docLink={docLink}
        isOpen={open}
        wallets={wallets}
        login={login}
        onDismiss={() => setOpen(false)}
      />
    </>
  )
}

export default Pools
