import styled from 'styled-components'
import { Flex, Text, Button, useModal } from '@pancakeswap/uikit'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useEffect, useState } from 'react'
import { useContractFarmingLP, useXOXPoolContract } from 'hooks/useContract'
import useWindowSize from 'hooks/useWindowSize'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getContractFarmingLPAddress, getXOXPoolAddress } from 'utils/addressHelpers'
import { formatEther, formatUnits } from '@ethersproject/units'
import { USD_DECIMALS } from 'config/constants/exchange'
import { useProvider } from 'wagmi'
import { getBalancesForEthereumAddress } from 'ethereum-erc20-token-balances-multicall'
import { NETWORK_LINK } from 'views/BridgeToken/networks'
import ModalStake from './components/ModalStake'
import PairToken from './components/PairToken'

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
        }
        .flex_direction {
          flex-direction: column;
          align-items: flex-start;
        }

        .u_question {
          margin-left: 9px;
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
          margin-top: 16px;
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
          margin-top: 16px;
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
      }
      .u_question {
        margin-left: 9px;
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

export const linkTransaction = (chainId) => {
  return `${NETWORK_LINK[chainId]}/address/`
}

const Pools: React.FC<React.PropsWithChildren> = () => {
  const [aprPercent, setAprPercent] = useState<null | number>(null)
  const [pendingRewardOfUser, setPendingRewardOfUser] = useState<null | string>(null)
  const [liquidity, setLiquidity] = useState<null | number>(null)
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
  const [isUnStake, setIsUnStake] = useState(false)

  const handleGetDataFarming = async () => {
    try {
      const addressFarming = getContractFarmingLPAddress(chainId)
      const amountFarmingBN = await contractPair.balanceOf(addressFarming)
      const endBlock = await contractFarmingLP.bonusEndBlock()
      const startBlock = await contractFarmingLP.startBlock()
      const rewardPBlock = await contractFarmingLP.rewardPerBlock()
      const pendingReward = await contractFarmingLP.pendingReward(account)
      const userInfo = await contractFarmingLP.userInfo(account)
      const totalSupplyBN = await contractPair.totalSupply()
      const reserves = await contractPair.getReserves()

      if (!Number(formatEther(userInfo[0]._hex))) {
        setUserStaked(null)
      } else {
        setUserStaked(formatEther(userInfo[0]._hex))
      }

      const reserves1 = Number(formatUnits(reserves[1]._hex, USD_DECIMALS[chainId]))
      const totalSupply = Number(formatEther(totalSupplyBN._hex))
      setTotalSupplyLP(totalSupply)
      setReserve(reserves1)
      setPendingRewardOfUser(formatEther(pendingReward._hex))
      const balanceOfFarming = Number(formatEther(amountFarmingBN._hex))

      if (!balanceOfFarming) {
        setAprPercent(0)
      } else {
        const resultPercent =
          ((endBlock.toNumber() - startBlock.toNumber()) * Number(formatEther(rewardPBlock._hex)) * 100) /
          balanceOfFarming
        setAprPercent(resultPercent)
      }

      const amountLiquidity = (balanceOfFarming * reserves1) / totalSupply
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
  }, [account, chainId, provider])

  useEffect(() => {
    if (!account || !chainId) return
    handleGetDataFarming()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account])

  const [onModalStake] = useModal(<ModalStake balanceLP={balanceLP} totalSupply={totalSupplyLP} reverse={reserve} />)

  return (
    <>
      <NavWrapper>
        <Banner>
          <Text className="title" marginBottom="16px">
            Swap to get XOX and XOXS
          </Text>
          <Text className="subtitle" marginBottom="16px">
            Earn BUSD/USDC from Your XOXS
          </Text>
          <a href="/#" target="_blank" rel="noreferrer">
            <Button className="get-xox">Get LP Token</Button>
          </a>
          <a href="/whitepaper" target="_blank" rel="noreferrer">
            <Button className="learn-more">Learn More</Button>
          </a>
        </Banner>
      </NavWrapper>

      <NavWrapper>
        <Main>
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
                      <span className="value">{aprPercent || '-'}%</span>
                    </div>
                    <div className="flex flex_direction">
                      <span className="name">Earned:</span>
                      <span className="value">0</span>
                    </div>
                    <div className="flex flex_direction">
                      <span className="name">Liquidity</span>
                      <span className="value _flex">
                        <span>${liquidity || '-'}</span>
                        <span className="u_question">
                          <img src="/images/u_question-circle.svg" alt="u_question-circle" />
                        </span>
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex">
                    <div className="flex flex_direction mb_mr">
                      <span className="name">APR:</span>
                      <span className="value">{aprPercent || '-'}%</span>
                    </div>
                    <div className="flex flex_direction">
                      <span className="name">Earned:</span>
                      <span className="value">0</span>
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
                    <p className="_flex">
                      <a href="/liquidity" target="_blank">
                        <span>Get {chainIdSupport.includes(chainId) ? 'XOX - BUSD' : 'XOX - USDC'} LP</span>
                        <span style={{ marginLeft: 8 }}>
                          <img src="/images/external-icon.svg" alt="external-icon" />
                        </span>
                      </a>
                    </p>
                    <p className="_flex">
                      <a
                        href={`${linkTransaction(chainId)}${getXOXPoolAddress(chainId)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>View Contract</span>
                        <span style={{ marginLeft: 8 }}>
                          <img src="/images/external-icon.svg" alt="external-icon" />
                        </span>
                      </a>
                    </p>
                  </div>
                </div>
              )}
              <div>
                <div className="rectangle _flex space_between">
                  <div>
                    <p className="current_XOX_reward">Current XOX reward</p>
                    <p className="current_XOX_reward_value">{pendingRewardOfUser || '-'}</p>
                  </div>
                  <button type="button" className="withdraw">
                    Withdraw
                  </button>
                </div>
              </div>
              <div>
                <div className="rectangle enable_farm">
                  <p className="current_XOX_reward">
                    {enable
                      ? `Stake ${chainIdSupport.includes(chainId) ? 'XOX - BUSD' : 'XOX - USDC'} LP`
                      : 'Enable Farm'}
                  </p>
                  {enable && userStaked && <p className="user_stake">{enable ? userStaked || null : null}</p>}
                  {!enable ? (
                    <button type="button" className="nable mt" onClick={() => setEnable(true)}>
                      Enable
                    </button>
                  ) : enable && userStaked ? (
                    <div className="group_btn_stake">
                      {enable && userStaked && (
                        <div className="container_unstake_border">
                          <div className="inner_container">
                            <span>Unstake</span>
                          </div>
                        </div>
                      )}
                      <button type="button" className="nable" onClick={onModalStake}>
                        Stake LP
                      </button>
                    </div>
                  ) : (
                    <button type="button" className="nable mt" onClick={onModalStake}>
                      Stake LP
                    </button>
                  )}
                </div>
              </div>
              {width <= 576 && (
                <>
                  <div>
                    <p className="flex space_between apr_mb">
                      <span className="name">APR:</span>
                      <span className="value">{aprPercent || '-'}%</span>
                    </p>
                    <p className="flex space_between earned_mb">
                      <span className="name">Earned:</span>
                      <span className="value">0</span>
                    </p>
                    <p className="flex space_between liquidity_mb">
                      <span className="name">Liquidity:</span>
                      <span className="_flex">
                        <span className="value">${liquidity || '-'}</span>
                        <span className="u_question">
                          <img src="/images/u_question-circle.svg" alt="u_question-circle" />
                        </span>
                      </span>
                    </p>
                  </div>
                  <div className="get_xox_lp">
                    <div>
                      <p className="_flex lp_mb">
                        <a href="/liquidity" target="_blank">
                          <span>Get {chainIdSupport.includes(chainId) ? 'XOX - BUSD' : 'XOX - USDC'} LP</span>
                          <span style={{ marginLeft: 8 }}>
                            <img src="/images/external-icon.svg" alt="external-icon" />
                          </span>
                        </a>
                      </p>
                      <p className="_flex">
                        <a
                          href={`${linkTransaction(chainId)}${getXOXPoolAddress(chainId)}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>View Contract</span>
                          <span style={{ marginLeft: 8 }}>
                            <img src="/images/external-icon.svg" alt="external-icon" />
                          </span>
                        </a>
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Main>
      </NavWrapper>
    </>
  )
}

export default Pools
