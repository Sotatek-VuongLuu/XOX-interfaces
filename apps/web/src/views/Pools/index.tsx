/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import styled from 'styled-components'
import { Flex, Text, Button, useModal, useMatchBreakpoints, LinkExternal, useToast } from '@pancakeswap/uikit'
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
import { getUserFarmingData } from 'services/pools'
import { NETWORK_LINK } from 'views/BridgeToken/networks'
import ModalBase from 'views/Referral/components/Modal/ModalBase'
import { GridLoader } from 'react-spinners'
import { Tooltip } from '@mui/material'
import { useActiveHandle } from 'hooks/useEagerConnect.bmp'
import { useSelector } from 'react-redux'
import useAuth from 'hooks/useAuth'
import { ToastDescriptionWithTx } from 'components/Toast'
import { AppState } from 'state'
import { createWallets, getDocLink } from 'config/wallet'
import { useTranslation } from '@pancakeswap/localization'
import { WalletModalV2 } from '@pancakeswap/ui-wallets'
import { ChainId } from '@pancakeswap/sdk'
import { XOXLP } from '@pancakeswap/tokens'
import tryParseAmount from '@pancakeswap/utils/tryParseAmount'
import { useApproveCallback, ApprovalState } from 'hooks/useApproveCallback'
import { Context } from '@pancakeswap/uikit/src/widgets/Modal/ModalContext'
import { linkTransaction } from 'views/BridgeToken'
import BigNumber from 'bignumber.js'
import GalaxyMobileIcon from 'components/Svg/galaxy.svg'
import GalaxyIcon from 'components/Svg/galaxy-desktop.svg'
import { TooltipCustom } from 'components/ToolTipCustom'
import ModalStake from './components/ModalStake'
import PairToken from './components/PairToken'
import ModalUnStake from './components/ModalUnStake'
import { Content } from './components/style'
import ShowBalance from './components/ShowBalance'

const NavWrapper = styled(Flex)`
  padding: 28px 0px 24px;
  @media screen and (max-width: 576px) {
    padding: 0 0 24px 0;
  }
`

const Banner = styled.div`
  width: 100%;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px 16px;
  margin-top: 20px;
  position: relative;

  & > svg {
    position: absolute;
    transform: translateX(-40%);
    left: 50%;
    top: 0;
    width: 397px;
    max-width: unset;
  }

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

  .get-xox {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #000;
    height: 37px;
    border-radius: 10px;
    background: #fff;
    padding: 10px 20px;
    box-shadow: none;
    position: relative;
    :hover {
    border: 1px solid #ffffff;
      background: transparent;
      color: #fff
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
      .top-left {
      position: absolute;
      top: 0;
      left: -1px;
      width: 10px;
      height: 10px;
      border-top: 1px solid #b809b5;
      background: transparent;
      border-top-left-radius: 10px;
    }

    .bottom-left {
      position: absolute;
      bottom: 0;
      left: -1px;
      width: 10px;
      height: 10px;
      border-bottom: 1px solid #b809b5;
      background: transparent;
      border-bottom-left-radius: 10px;
    }

    .top-right {
      position: absolute;
      top: 0;
      right: -1px;
      width: 10px;
      height: 10px;
      border-top: 1px solid #f4801c;
      background: transparent;
      border-top-right-radius: 10px;
    }

    .bottom-right {
      position: absolute;
      bottom: 0;
      right: -1px;
      width: 10px;
      height: 10px;
      border-bottom: 1px solid #f4801c;
      background: transparent;
      border-bottom-right-radius: 10px;
    }
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
    padding: 30px 24px;
    background: rgba(16, 16, 16, 0.3);
    backdrop-filter: blur(10px);
    border-radius: 20px;

    & > svg {
      position: absolute;
      transform: translate(0, -50%);
      top: 50%;
      left: unset;
      right: 0;
      width: auto;
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
      color: #000;
      width: auto;
      height: 43px;
      border-radius: 10px;
      box-shadow: none;
      background:#ffffff ;

      :hover {
      border: 1px solid #ffffff;
      background:transparent ;
      color: #fff;
      }
    }

    .learn-more {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      height: 43px;
      border: 1px solid #ffffff;
      border-radius: 10px;
      margin-left: 16px;
      background: transparent;
      box-shadow: none;
    }
  }
`

interface IMain {
  userStaked?: boolean
}

const Main = styled.div<IMain>`
  width: 100%;
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
    background: rgba(16, 16, 16, 0.3);
    padding: 24px 0px;
    backdrop-filter: blur(10px);
    border-radius: 20px;
    width: 1126px;
    margin: 0 auto;
    position: relative;
    .corner1 {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50%;
      height: 50px;
      border-radius: 20px;
      z-index: -1;
      border-bottom: 2px solid #7e5c19ad;
      border-left: 2px solid #7e5c19ad;
      border-bottom-right-radius: unset;
      border-top-left-radius: unset;
    }

    .edge1 {
      width: 2px;
      height: calc(100% - 120px);
      position: absolute;
      bottom: 50px;
      left: 0;
      z-index: -1;
      background: linear-gradient(0deg, #7e5c19ad 0%, #721430e5 40%, #76143020 100%);
      @media screen and (max-width: 576px) {
        height: calc(100% - 250px);
      }
    }

    .corner2 {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 50%;
      height: 50px;
      border-radius: 20px;
      z-index: -1;
      border-bottom: 2px solid #7e5c19ad;
      border-right: 2px solid #7e5c19ad;
      border-bottom-left-radius: unset;
      border-top-right-radius: unset;
    }

    .edge2 {
      width: 2px;
      height: calc(100% - 120px);
      position: absolute;
      bottom: 50px;
      right: 0;
      z-index: -1;
      background: linear-gradient(0deg, #7e5c19ad 0%, #721430e5 40%, #76143020 100%);
      @media screen and (max-width: 576px) {
        height: calc(100% - 250px);
      }
    }
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
        padding: 0px 18px;
        .header {
          .name {
            margin-bottom: 16px;
          }
        }
      }
    }
    .diver {
      border-bottom: 1px solid #444444;
      margin-top: 24px;
      @media screen and (max-width: 576px) {
        margin-top: 16px;
      }
    }

    .create_lp {
      padding: 24px;
      margin-top: 24px;
      display: grid;
      grid-template-columns: 0.5fr 1.25fr 1.25fr;
      gap: 20px;
      .get_xox_lp {
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
        @media screen and (max-width: 576px) {
          div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }
        }
      }
      .rectangle._flex {
        align-items: center;
        justify-content: space-between;
        @media screen and (max-width: 576px) {
          align-items: flex-start;
        }
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
          background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
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
            font-size: 14px;
          }
        }
        .mt {
          margin-top: 16px;
        }
      }
      .withdraw {
        padding: 12px 30px;
        background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
        border-radius: 10px;
        border: none;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        color: #ffffff;
        cursor: pointer;
        margin-top: 0;
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
          margin-top: 14px;
          font-size: 14px;
          &:disabled,
          button[disabled] {
            font-size: 14px;
          }
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
        font-size: 20px;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.87);
      }
      .u_question {
        margin-left: 9px;
        min-width: 20px;
      }
      .lp_mb {
        margin-bottom: 16px;
        @media screen and (max-width: 576px) {
          margin-bottom: 0px;
        }
      }

      .group_btn_stake {
        ${({ userStaked }) =>
          userStaked
            ? `
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        `
            : ``}
        margin-top: 16px;
        width: 100%;
        .container_unstake_border {
          background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
          border-radius: 6px;
          padding: 2px;
          cursor: pointer;
          .inner_container {
            display: flex;
            background: #0d0d0d;
            height: 100%;
            width: 100%;
            border-radius: inherit;
            justify-content: center;
            align-items: center;
            span {
              font-weight: 700;
              font-size: 16px;
              line-height: 19px;
              background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              text-fill-color: transparent;
              @media screen and (max-width: 576px) {
                font-size: 14px;
              }
            }
          }
        }
      }
      @media screen and (max-width: 576px) {
        grid-template-columns: 1fr;
        padding: 21px 18px;
        .value {
          font-weight: 700;
          font-size: 14px;
          line-height: 17px;
          color: rgba(255, 255, 255, 0.87);
        }
      }
    }
    @media screen and (max-width: 576px) {
      width: 100%;
    }
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

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  /* align-items: center; */
  .content {
    width: 1400px;
  }

  @media screen and (max-width: 1400px) {
    padding: 24px;
    padding-top: 0;
    .content {
      width: 1200px;
    }
  }

  @media screen and (max-width: 1200px) {
    display: block;
    .content {
      width: 100%;
    }
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
  const [pendingRewardOfUser, setPendingRewardOfUser] = useState<string>(null)
  const [liquidity, setLiquidity] = useState<null | number | string>(null)
  const [totalSupplyLP, setTotalSupplyLP] = useState<any>(null)
  const [userStaked, setUserStaked] = useState<null | string>()
  const [reserve, setReserve] = useState<any>()
  const { chainId } = useActiveChainId()
  const { account } = useActiveWeb3React()
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
  const { nodeId } = useContext(Context)
  const { toastError, toastWarning, toastSuccess } = useToast()
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)
  const [approvalState, approveCallback] = useApproveCallback(
    XOX_LP[chainId] && tryParseAmount(String(amount), XOXLP[chainId]),
    getContractFarmingLPAddress(chainId),
  )

  const handleApprove = useCallback(async () => {
    await approveCallback()
  }, [approveCallback])

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

      if (!Number(balanceOfFarming)) {
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

  const handleGetBalanceOfUser = () => {
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
  }

  useEffect(() => {
    if (!account || !chainId) return
    handleGetBalanceOfUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId, provider, isOpenSuccessModal])

  const handleWithdraw = async () => {
    try {
      setNotiMess(t('Withdraw %amount% XOX', { amount: pendingRewardOfUser }))
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
        toastSuccess(t('Transaction receipt'), <ToastDescriptionWithTx txHash={tx?.transactionHash} />)

        handleCallbackAfterSuccess()
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      // console.log(`error>>>`, error)
      setIsOpenLoadingClaimModal(false)
      setNotiMess('')
      if (error?.error?.message === 'execution reverted: ERC20: transfer amount exceeds balance') {
        // setModalReject({ ...modalReject, isShow: true, message: 'Transfer amount exceeds balance' })
        toastError(t('Confirm Farming'), t('Transfer amount exceeds balance.'))
      }
      if (error?.message.includes('rejected')) {
        // setModalReject({ ...modalReject, isShow: true, message: 'Transaction rejected.' })
        toastWarning(t('Confirm Farming'), t('Transaction rejected.'))
      }
      if (error?.code !== 'ACTION_REJECTED') {
        toastError(t('Confirm Farming'), t('Transaction failed'))
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
      setNotiMess(
        t('Unstake %amount% %symbol%', {
          amount: amountUnStake,
          symbol: chainIdSupport.includes(chainId) ? 'XOX - USDT LP' : 'XOX - USDC LP',
        }),
      )
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
        toastSuccess(t('Transaction receipt'), <ToastDescriptionWithTx txHash={tx?.transactionHash} />)

        handleCallbackAfterSuccess()
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(`error>>>`, error)
      setNotiMess('')
      setIsOpenLoadingClaimModal(false)
      if (error?.error?.message === 'execution reverted: ERC20: transfer amount exceeds balance') {
        toastError(t('Confirm Farming'), t('Transfer amount exceeds balance.'))

        // setModalReject({ ...modalReject, isShow: true, message: 'Transfer amount exceeds balance' })
      }
      if (error?.message.includes('rejected')) {
        // setModalReject({ ...modalReject, isShow: true, message: 'Transaction rejected.' })
        toastWarning(t('Confirm Farming'), t('Transaction rejected.'))
      }
      if (error?.code !== 'ACTION_REJECTED') {
        toastError('Error', t('Transaction failed'))
      }
    }
  }

  const handleConfirmDeposit = async () => {
    try {
      setNotiMess(
        t('Stake %amount% %symbol%', {
          amount,
          symbol: chainIdSupport.includes(chainId) ? 'XOX - USDT LP' : 'XOX - USDC LP',
        }),
      )
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
        toastSuccess(t('Transaction receipt'), <ToastDescriptionWithTx txHash={tx?.transactionHash} />)

        handleCallbackAfterSuccess()
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(`error>>>`, error)
      setNotiMess('')
      setIsOpenLoadingClaimModal(false)
      if (error?.error?.message === 'execution reverted: ERC20: transfer amount exceeds balance') {
        // setModalReject({ ...modalReject, isShow: true, message: 'Transfer amount exceeds balance' })
        toastError(t('Confirm Farming'), t('Transfer amount exceeds balance.'))
      }
      if (error?.message.includes('rejected')) {
        // setModalReject({ ...modalReject, isShow: true, message: 'Transaction rejected.' })
        toastWarning(t('Confirm Farming'), t('Transaction rejected.'))
      }
      if (error?.code !== 'ACTION_REJECTED') {
        toastError(t('Confirm Farming'), t('Transaction failed'))
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
      approvalState={approvalState}
      approvalSubmitted={approvalSubmitted}
      handleApprove={handleApprove}
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
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
    if (approvalState === ApprovalState.APPROVED) {
      setApprovalSubmitted(false)
    }
  }, [approvalState, approvalSubmitted])

  return (
    <>
      <Container>
        <div className="content">
          <NavWrapper>
            <Banner>
              {isMobile ? <GalaxyMobileIcon /> : <GalaxyIcon />}
              <div className="corner1" />
              <div className="edge1" />
              <div className="corner2" />
              <div className="edge2" />
              <Text className="title" marginBottom="8px" mt={['118px', , '0']}>
                {t('Add Liquidity. Earn Trading Fees')}
              </Text>
              <Text className="subtitle" marginBottom="24px">
                {t('Level Up your DeFi Game')}
              </Text>
              <Flex>
                <a
                  href={`/add/${XOX_ADDRESS[chainId]}/${USD_ADDRESS[chainId]}?step=1&chainId=${chainId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button className="get-xox">{t('Get %sym%', { sym: 'LP Token' })}</Button>
                </a>
                <a href="https://docs.xoxlabs.io/" target="_blank" rel="noreferrer">
                  <Button className="learn-more">{t('Learn More')}</Button>
                </a>
              </Flex>
            </Banner>
          </NavWrapper>

          <NavWrapper>
            <Main userStaked={Boolean(userStaked) && Boolean(account)}>
              <div className="content_container">
                <div className="corner1" />
                <div className="edge1" />
                <div className="corner2" />
                <div className="edge2" />
                <div className="header_container">
                  <div className="header">
                    <div className="flex">
                      {chainIdSupport.includes(chainId) ? (
                        <PairToken
                          linkTokenSecond={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/1/tokens/0xdAC17F958D2ee523a2206206994597C13D831ec7.png`}
                          symbolTokenSecond="USDT"
                        />
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
                          <span className="name">{t('Earned:')}</span>
                          {account ? <ShowBalance balance={earned} unit="XOX" /> : <span className="value">-</span>}
                        </div>
                        <div className="flex flex_direction">
                          <span className="name">{t('Liquidity')}</span>
                          <span className="value _flex">
                            {account ? (
                              <>
                                <ShowBalance balance={liquidity} name="liquidity" />
                                <TooltipCustom title={t('Total value of the funds in this farm’s liquidity pair')}>
                                  <span className="u_question" style={{ cursor: 'pointer' }}>
                                    <img
                                      src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/u_question-circle.svg`}
                                      alt="u_question-circle"
                                    />
                                  </span>
                                </TooltipCustom>
                              </>
                            ) : (
                              <span className="liquidity">-</span>
                            )}
                          </span>
                        </div>
                      </>
                    ) : (
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
                          <span className="name">{t('Earned:')}</span>
                          {account ? <ShowBalance balance={earned} unit="XOX" /> : <span className="value">-</span>}
                        </p>
                        <p className="flex space_between liquidity_mb">
                          <span className="name">{t('Liquidity')}:</span>
                          <span className="_flex">
                            {account ? (
                              <>
                                <ShowBalance balance={liquidity} name="liquidity" />
                                <Tooltip
                                  title={t('Total value of the funds in this farm’s liquidity pair')}
                                  placement="top"
                                  PopperProps={{
                                    sx: (theme) => ({
                                      '& .MuiTooltip-tooltip': {
                                        border: '1px solid #FE4039',
                                        background: '#242424',
                                        padding: '6px',
                                        color: 'rgba(255, 255, 255, 0.6) !important',
                                        borderRadius: '10px',
                                        fontSize: '14px !important',
                                      },
                                    }),
                                  }}
                                >
                                  <span className="u_question" style={{ cursor: 'pointer' }}>
                                    <img
                                      src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/u_question-circle.svg`}
                                      alt="u_question-circle"
                                    />
                                  </span>
                                </Tooltip>
                              </>
                            ) : (
                              <span className="value">-</span>
                            )}
                          </span>
                        </p>
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
                          <p className="_flex" style={{ marginBottom: '8px' }}>
                            <span>
                              {t('Get %symbol%', {
                                symbol: chainIdSupport.includes(chainId) ? 'XOX - USDT LP' : 'XOX - USDC LP',
                              })}{' '}
                            </span>
                            <span style={{ marginLeft: 8 }}>
                              <img
                                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/external-icon.svg`}
                                alt="external-icon"
                              />
                            </span>
                          </p>
                        </a>
                        <a
                          href={`${linkAddressScan(chainId)}${getXOXPoolAddress(chainId)}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <p className="_flex">
                            <span>{t('View Contract')}</span>
                            <span style={{ marginLeft: 8 }}>
                              <img
                                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/external-icon.svg`}
                                alt="external-icon"
                              />
                            </span>
                          </p>
                        </a>
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="rectangle _flex">
                      <div>
                        <p className="current_XOX_reward">{t('Current %symbol% reward', { symbol: 'XOX' })}</p>
                        {account ? (
                          <div style={{ width: '100%', marginTop: 16 }}>
                            <ShowBalance balance={pendingRewardOfUser} unit="" />
                          </div>
                        ) : (
                          <span className="current_XOX_reward_value">-</span>
                        )}
                      </div>
                      <CustomButton
                        type="button"
                        className="withdraw"
                        onClick={handleWithdraw}
                        disabled={!Number(pendingRewardOfUser)}
                        mt={16}
                      >
                        {t('Withdraw')}
                      </CustomButton>
                    </div>
                  </div>
                  <div>
                    <div className="rectangle enable_farm">
                      <p className="current_XOX_reward">
                        {userStaked && account
                          ? t('%asset% Staked', {
                              asset: chainIdSupport.includes(chainId) ? 'XOX - USDT LP' : 'XOX - USDC LP',
                            })
                          : t('Stake %symbol%', {
                              symbol: chainIdSupport.includes(chainId) ? 'XOX - USDT LP' : 'XOX - USDC LP',
                            })}
                      </p>
                      {userStaked && account && (
                        <div style={{ width: '100%', marginTop: 16 }}>
                          <ShowBalance balance={userStaked} />
                        </div>
                      )}

                      {!account && (
                        <div className="group_btn_stake">
                          <CustomButton type="button" className="nable mt" onClick={handleClick}>
                            {t('Connect Wallet')}
                          </CustomButton>
                        </div>
                      )}

                      {account && (
                        <div className="group_btn_stake">
                          {userStaked && (
                            <ButtonUnStake
                              className="container_unstake_border"
                              onClick={onModalUnStake}
                              role="button"
                              disabled={!reserve || !totalSupplyLP}
                            >
                              <div className="inner_container">
                                <span>{t('Unstake')}</span>
                              </div>
                            </ButtonUnStake>
                          )}
                          <CustomButton
                            type="button"
                            className="nable"
                            onClick={() => {
                              onModalStake()
                              handleGetBalanceOfUser()
                            }}
                            disabled={!reserve || !totalSupplyLP}
                          >
                            {t('Stake')}
                          </CustomButton>
                        </div>
                      )}
                    </div>
                  </div>
                  {width <= 576 && (
                    <>
                      <div className="get_xox_lp">
                        <div>
                          <a
                            href={`/add/${XOX_ADDRESS[chainId]}/${USD_ADDRESS[chainId]}?step=1&chainId=${chainId}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <p className="_flex lp_mb">
                              <span>
                                {t('Get %symbol%', {
                                  symbol: chainIdSupport.includes(chainId) ? 'XOX - USDT LP' : 'XOX - USDC LP',
                                })}
                              </span>
                              <span style={{ marginLeft: 8 }}>
                                <img
                                  src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/external-icon.svg`}
                                  alt="external-icon"
                                />
                              </span>
                            </p>
                          </a>
                          <a
                            href={`${linkAddressScan(chainId)}${getXOXPoolAddress(chainId)}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <p className="_flex">
                              <span>{t('View Contract')}</span>
                              <span style={{ marginLeft: 8 }}>
                                <img
                                  src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/external-icon.svg`}
                                  alt="external-icon"
                                />
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
        </div>
      </Container>
      <ModalBase
        open={modalReject.isShow}
        handleClose={() => setModalReject({ ...modalReject, isShow: false })}
        title={t('Confirm Farming')}
      >
        <Content>
          <div className="noti_claim_pending_h1 xox_loading reject_xox" style={{ marginTop: '16px' }}>
            <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/reject_xox.png`} alt="reject_xox" />
          </div>
          <div className="noti_claim_pending_h4">{modalReject.message}</div>
          <div className="btn_dismiss_container">
            <button
              className="btn_dismiss hv"
              type="button"
              onClick={() => setModalReject({ ...modalReject, isShow: false })}
            >
              {t('Dismiss')}
            </button>
          </div>
          <img
            src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/close-one.svg`}
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
        title={t('Confirm Farming')}
      >
        <Content>
          <div className="xox_loading" style={{ margin: '24px 0px' }}>
            <GridLoader color="#FB8618" style={{ width: '51px', height: '51px' }} />
          </div>
          <div className="noti_claim_pending_h1">{t('Waiting For Confirmation')}</div>
          <div className="noti_claim_pending_h3"> {notiMess}</div>
          <div className="noti_claim_pending_h2">{t('Confirm this transaction in your wallet.')}</div>
          <img
            src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/close-one.svg`}
            alt="close-one"
            className="x-close-icon"
            aria-hidden="true"
            onClick={() => setIsOpenLoadingClaimModal(false)}
          />
        </Content>
      </ModalBase>
      <ModalBase
        open={isOpenSuccessModal}
        handleClose={() => setIsOpenSuccessModal(false)}
        title={t('Confirm Farming')}
      >
        <Content>
          <div className="noti_claim_success">
            <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/success_claim.png`} alt="success_claim" />
          </div>
          <div className="submitted">{t('Transaction Submitted')}</div>
          <p style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
            <LinkExternal
              href={`${linkTransaction(chainId)}${txHash}`}
              target="_blank"
              rel="noreferrer"
              color="#FB8618"
              hiddenIcon
            >
              <div className="view_on">{t('View on %site%', { site: `${NETWORK_LABEL[chainId]}scan` })}</div>
            </LinkExternal>
          </p>
          <div className="btn_dismiss_container">
            <button className="btn_dismiss bg" type="button" onClick={() => setIsOpenSuccessModal(false)}>
              {t('Close')}
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
