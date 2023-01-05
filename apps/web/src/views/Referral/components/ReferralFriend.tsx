/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-array-constructor */
/* eslint-disable no-else-return */
/* eslint-disable prefer-const */
/* eslint-disable no-extra-boolean-cast */
import { Box, Grid } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import useWindowSize from 'hooks/useWindowSize'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTreasuryXOX } from 'hooks/useContract'
import { formatEther, formatUnits } from '@ethersproject/units'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { getUserFriend } from 'services/referral'
import { MAPPING_DECIMAL_WITH_CHAIN } from 'config/constants/mappingDecimals'
import axios from 'axios'
import { BigNumber } from '@ethersproject/bignumber'
import { CopyButton, useModal } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { GridLoader } from 'react-spinners'
import { shortenAddress } from 'utils/shortenAddress'
import ModalConfirmClaim from './Modal/ModalComfirmClaim'
import ModalBase from './Modal/ModalBase'

const floatingAnim = (x: string, y: string) => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(${x}, ${y});
  }
  to {
    transform: translate(0, 0px);
  }
`

interface IDataClaim {
  point: number
  dollar: number
}
interface IItemLevel {
  icon: string
  point: number
  dollar: number
  lever: number
  isReach: boolean
  isClaimed?: boolean
}

interface IProps {
  listLevelMustReach: IItemLevel[]
  isClaimAll: boolean
  currentLevelReach: number
  volumnTotalEarn: string
  getUserPoint: () => void
  handleCheckReachLevel: () => void
  handleCheckPendingRewardAll: (account: string) => void
  totalUnClaimed: string
}

interface IPropsWR {
  account?: string
  isClaimAll?: boolean
}

const WrapperLeft = styled(Box)`
  padding: 24px;
  background: #242424;
  border-radius: 10px;
  height: 225px;
  position: relative;

  .title {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.87);

    @media screen and (max-width: 900px) {
      font-size: 18px;
      line-height: 24px;
    }
  }
  .no-data {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    width: fit-content;
    text-align: center;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.6);
  }
`

const WrapperRight = styled(Box)<IPropsWR>`
  margin-top: 0 !important;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    width: 117px;
    height: 157px;
    left: 0px;
    top: 16px;
    background: linear-gradient(90deg, #121212 16.15%, rgba(18, 18, 18, 0) 100%);
  }

  &:after {
    content: '';
    position: absolute;
    width: 117px;
    height: 157px;
    right: 0;
    top: 16px;
    background: linear-gradient(90deg, #121212 15.1%, rgba(18, 18, 18, 0) 100%);
    transform: matrix(-1, 0, 0, 1, 0, 0);
  }

  .item {
    position: relative;
    background-size: 192px 172px;
    background-repeat: no-repeat;
    background-position: center;
    height: 172px;
    width: 192px;
    background: url(/images/item.svg);
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  }
  .item > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    top: -7px;

    .shadow {
      width: 110px;
      height: 17px;
      background: radial-gradient(50% 50% at 50% 50%, #000000 0%, rgba(48, 48, 48, 0) 100%);
    }

    .title {
      font-weight: 700;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      color: rgba(255, 255, 255, 0.87);
      margin-top: 8px;
      white-space: nowrap;
    }

    .btn {
      background: transparent;
      border: none;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: rgba(255, 255, 255, 0.38);
      margin-top: 12px;
      cursor: pointer;
    }

    button:disabled,
    button[disabled] {
      cursor: not-allowed;
    }

    .jewellery {
      animation: ${floatingAnim('0px', '5px')} 3s ease-in-out infinite;
    }
  }

  .current {
    background: url(/images/current_item.svg);
    & > div {
      .btn {
        background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      button:disabled,
      button[disabled] {
        cursor: not-allowed;
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.384) 0%, rgba(255, 255, 255, 0.384) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
  }

  .swiper-button-next {
    background-image: url(/images/next.svg);
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
    border-radius: 50%;
  }

  .swiper-button-next::after {
    display: none;
  }

  .swiper-button-prev {
    background-image: url(/images/prev.svg);
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
  }

  .swiper-button-prev::after {
    display: none;
  }

  .swiper.swiper-initialized {
    padding-top: 16px;
  }

  .claim_total {
    display: flex;
    justify-content: center;
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
      border-radius: 4px;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
      padding: 10px 20px;
    }

    button:disabled,
    button[disabled] {
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.38);
      cursor: not-allowed;
    }

    .unclaim_reward_container {
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
      padding: 2px;
      border-radius: 4px;
      margin-right: 16px;

      .unclaim_reward {
        width: 100%;
        height: 100%;
        background: black;
        border-radius: 4px;
        div {
          font-weight: 700;
          font-size: 14px;
          line-height: 17px;
          padding: 10px 20px;
          background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          /* text-fill-color: transparent; */
        }
      }
    }

    @media screen and (max-width: 900px) {
      flex-direction: column;
      .unclaim_reward_container {
        width: 100%;
        margin-bottom: 16px;
        .unclaim_reward {
          div {
            text-align: center;
          }
        }
      }
    }
  }
`

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 16px;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #444444;

  div:last-child {
    text-align: right;
    margin-right: 3px;
  }
`
const TableBody = styled.div`
  max-height: 107px;
  overflow-y: auto;
  margin-top: 10px;

  & > div {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);
    align-items: center;
    margin-bottom: 16px;
    margin-right: 5px;
  }

  & > div div:first-child {
    display: grid;
    grid-template-columns: 24px 1fr;
    gap: 8px;
    align-items: center;

    img {
      border-radius: 50%;
      width: 24px;
      height: 24px;
      object-fit: cover;
    }
  }

  & > div div:nth-child(2) {
    display: flex;
    align-items: center;
  }

  & > div div:last-child {
    text-align: right;
  }
`

const Content = styled.div`
  .discription {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
    text-align: center;
    padding: 24px 0px;

    span {
      font-weight: 700;
    }
  }

  .btn-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    button {
      border: none;
      border-radius: 6px;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      padding: 12px;
      cursor: pointer;
    }
    & > .cancel {
      background: #313131;
    }
    & > .confirm {
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
    }
  }

  .noti {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
    text-align: center;
    margin-top: 8px;
    margin-bottom: 24px;
    span {
      color: #9072ff;
      font-weight: 700;
    }
  }
  .noti_claim_success {
    display: flex;
    justify-content: center;
  }

  .x-close-icon {
    position: absolute;
    top: 11px;
    right: 11px;
    cursor: pointer;
  }

  .xox_loading {
    display: flex;
    justify-content: center;
  }

  .reject_xox {
    display: flex;
    justify-content: center;
    margin: 24px 0;
  }
  .noti_claim_pending_h1 {
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 16px;
  }
  .noti_claim_pending_h2 {
    text-align: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.6);
  }

  .btn_dismiss_container {
    display: flex;
    justify-content: center;
    margin-top: 24px;
    .btn_dismiss {
      background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
      border-radius: 6px;
      padding: 12px 30px;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      border: none;
      cursor: pointer;
    }
  }
`

const ReferralFriend = ({
  listLevelMustReach,
  isClaimAll,
  currentLevelReach,
  volumnTotalEarn,
  getUserPoint,
  handleCheckReachLevel,
  handleCheckPendingRewardAll,
  totalUnClaimed,
}: IProps) => {
  const { width } = useWindowSize()
  const { account, chainId } = useActiveWeb3React()
  const contractTreasuryXOX = useTreasuryXOX()
  const [isShowModalConfirmClaimByLevel, setIsShowModalConfirmClaimByLevel] = useState<boolean>(false)
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false)
  const [isOpenLoadingClaimModal, setIsOpenLoadingClaimModal] = useState<boolean>(false)
  const [modalReject, setModalReject] = useState<boolean>(false)
  const [dataClaim, setDataClaim] = useState<IDataClaim>({
    point: 0,
    dollar: 0,
  })
  const [level, setLevel] = useState<number | null>(null)
  const userProfile = useSelector<AppState, AppState['user']['userProfile']>((state) => state.user.userProfile)
  const [listFriends, setListFriends] = useState([])
  const { t } = useTranslation()

  const handleClaimAll = async () => {
    try {
      setIsOpenLoadingClaimModal(true)
      const params = []
      const gasLimit = await contractTreasuryXOX.estimateGas.claimReferralAll(...params)
      const txClaimAll = await contractTreasuryXOX.claimReferralAll(...params, {
        gasLimit,
      })
      txClaimAll.wait(1)
      setIsOpenLoadingClaimModal(false)
      setIsOpenSuccessModal(true)
      getUserPoint()
      handleCheckReachLevel()
      handleCheckPendingRewardAll(account)
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(`error>>>>>`, error)
      setIsOpenLoadingClaimModal(false)
      if (error && error?.code === 'ACTION_REJECTED') {
        setModalReject(true)
      }
    }
  }

  const handleClaimLevel = async (_level: number) => {
    try {
      if (!_level) return
      setIsShowModalConfirmClaimByLevel(false)
      setIsOpenLoadingClaimModal(true)
      const gasLimit = await contractTreasuryXOX.estimateGas.claimReferralByLevel(_level)
      const txClaimByLevel = await contractTreasuryXOX.claimReferralByLevel(_level, {
        gasLimit,
      })
      txClaimByLevel.wait(1)
      setIsOpenLoadingClaimModal(false)
      setIsOpenSuccessModal(true)
      getUserPoint()
      handleCheckReachLevel()
      handleCheckPendingRewardAll(account)
    } catch (error: any) {
      // eslint-disable-next-line no-console
      setIsOpenLoadingClaimModal(false)
      console.log(`error>>>>>`, error)
      if (error && error?.code === 'ACTION_REJECTED') {
        setModalReject(true)
      }
    }
  }

  const controlWidth = useMemo(() => {
    let slidesPerView = 5
    if (width < 900) {
      slidesPerView = 4
    }
    if (width < 698) {
      slidesPerView = 3
    }
    if (width < 534) {
      slidesPerView = 2
    }
    if (width < 376) {
      slidesPerView = 2
    }
    if (width < 368) {
      slidesPerView = 1
    }
    return slidesPerView
  }, [width])

  const dataFriend = async (accountId: string) => {
    try {
      setListFriends([])
      const { userInfos } = await getUserFriend(chainId, accountId)

      if (Array.from(userInfos).length !== 0) {
        const dataUserFormatAmount = userInfos[0]?.friends?.map((item: any) => {
          return {
            ...item,
            id: item?.ref_address,
            point: Number(formatUnits(item.amount, MAPPING_DECIMAL_WITH_CHAIN[chainId])),
          }
        })

        const dataMapping = await Promise.all(
          dataUserFormatAmount?.map(async (item: any): Promise<any> => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/users/address/mapping`, {
              wallets: [`${item.ref_address}`],
            })
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/users/${item.ref_address}`)
            const dataMap = response?.data[0]
            return {
              ...item,
              ...dataMap,
              name: dataMap?.username ?? null,
              avatar: dataMap?.avatar ?? null,
              refCode: data?.referralCode,
            }
          }),
        )
        setListFriends(dataMapping)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`error >>>>`, error)
    }
  }

  useEffect(() => {
    if (account && chainId) {
      dataFriend(account)
    }
  }, [chainId, account])

  return (
    <>
      <Box sx={{ marginTop: '16px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <WrapperLeft>
              <p className="title">Referral friends</p>

              {account && listFriends.length !== 0 ? (
                <div>
                  <TableHeader>
                    <div>User Name</div>
                    <div>Referral Code</div>
                    <div>Total Points</div>
                  </TableHeader>
                  <TableBody>
                    {listFriends.map((row) => {
                      return (
                        <div key={row.name}>
                          <div>
                            {row.avatar ? (
                              <img src={row.avatar} alt="avatar" />
                            ) : (
                              <img src="/images/default_avatar.jpg" alt="avatar" />
                            )}
                            {row.name ? row.name : shortenAddress(row.ref_address)}
                          </div>
                          <div>
                            {row?.refCode}
                            <CopyButton
                              width="24px"
                              text={row?.refCode}
                              tooltipMessage={t('Copied')}
                              button={
                                <img
                                  src="/images/copy_purple.svg"
                                  alt="copy_purple"
                                  style={{ marginBottom: '-2px', marginLeft: '8px' }}
                                />
                              }
                            />
                          </div>
                          <div>{row.point}</div>
                        </div>
                      )
                    })}
                  </TableBody>
                </div>
              ) : (
                <div className="no-data">No Data</div>
              )}
            </WrapperLeft>
          </Grid>

          <Grid item xs={12} md={8}>
            <WrapperRight sx={{ marginTop: '16px' }} account={account}>
              <Swiper
                slidesPerView={controlWidth}
                modules={[Navigation, Pagination, A11y]}
                navigation
                scrollbar={{ draggable: true }}
              >
                {listLevelMustReach.map((item: IItemLevel) => {
                  return (
                    <SwiperSlide key={item.icon}>
                      <div
                        className={`item ${item.isReach && item.lever === currentLevelReach ? 'current' : ''}`}
                        key={item.icon}
                      >
                        <div>
                          <img src={item.icon} alt="icons" className="jewellery" />

                          <div className="shadow" />

                          <p className="title">
                            {item.point.toLocaleString()} points
                            <br />~ {item.dollar.toLocaleString()}$
                          </p>

                          {account && (
                            <button
                              type="button"
                              className="btn"
                              disabled={!item.isReach || item?.isClaimed}
                              onClick={() => {
                                setDataClaim({ ...dataClaim, point: item.point, dollar: item.dollar })
                                setIsShowModalConfirmClaimByLevel(true)
                                setLevel(item.lever)
                              }}
                            >
                              {item?.isClaimed ? <span>Claimed</span> : <span>Claim</span>}
                            </button>
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>

              <div className="claim_total">
                {account && (
                  <div className="unclaim_reward_container">
                    <div className="unclaim_reward">
                      <div>{Number(totalUnClaimed) <= 0 ? 0 : Number(totalUnClaimed)}$ Unclaimed Rewards</div>
                    </div>
                  </div>
                )}

                <button type="button" onClick={handleClaimAll} disabled={!account || isClaimAll}>
                  <span>Claim All</span>
                </button>
              </div>

              {/* <button type="button" onClick={handleCheckReachLevel}>
                call
              </button> */}
            </WrapperRight>
          </Grid>
        </Grid>
      </Box>

      <ModalConfirmClaim
        open={isShowModalConfirmClaimByLevel}
        handleClose={() => setIsShowModalConfirmClaimByLevel(false)}
        title="Claim"
      >
        <Content>
          <div className="discription">
            Receive {dataClaim.dollar?.toLocaleString()}$ at level "<span>{dataClaim.point?.toLocaleString()}</span>{' '}
            points"?
          </div>
          <div className="btn-group">
            <button className="cancel" type="button" onClick={() => setIsShowModalConfirmClaimByLevel(false)}>
              Cancel
            </button>
            <button
              className="confirm"
              type="button"
              onClick={() => {
                handleClaimLevel(level)
              }}
            >
              Confirm
            </button>
          </div>
        </Content>
      </ModalConfirmClaim>

      <ModalBase open={isOpenSuccessModal} handleClose={() => setIsOpenSuccessModal(false)} title="Success">
        <Content>
          <div className="noti">
            You have gotten <span>{dataClaim.dollar?.toLocaleString()}$.</span>
          </div>
          <div className="noti_claim_success">
            <img src="/images/success_claim.png" alt="success_claim" />
          </div>
          <img
            src="/images/close-one.svg"
            alt="close-one"
            className="x-close-icon"
            onClick={() => setIsOpenSuccessModal(false)}
          />
        </Content>
      </ModalBase>

      <ModalBase
        open={isOpenLoadingClaimModal}
        handleClose={() => setIsOpenLoadingClaimModal(false)}
        title="Claim Confirm"
      >
        <Content>
          <div className="xox_loading" style={{ margin: '24px 0px' }}>
            <GridLoader color="#9072FF" style={{ width: '51px', height: '51px' }} />
          </div>
          <div className="noti_claim_pending_h1">Waiting For Confirmation</div>
          <div className="noti_claim_pending_h2">Confirm this transaction in your wallet</div>
          <img
            src="/images/close-one.svg"
            alt="close-one"
            className="x-close-icon"
            onClick={() => setIsOpenLoadingClaimModal(false)}
          />
        </Content>
      </ModalBase>
      <ModalBase open={modalReject} handleClose={() => setModalReject(false)} title="Claim Confirm">
        <Content>
          <div className="noti_claim_pending_h1 xox_loading reject_xox" style={{ marginTop: '16px' }}>
            <img src="/images/reject_xox.png" alt="reject_xox" />
          </div>
          <div className="noti_claim_pending_h2">Transaction rejected.</div>
          <div className="btn_dismiss_container">
            <button className="btn_dismiss" type="button" onClick={() => setModalReject(false)}>
              Dismiss
            </button>
          </div>
          <img
            src="/images/close-one.svg"
            alt="close-one"
            className="x-close-icon"
            onClick={() => setModalReject(false)}
          />
        </Content>
      </ModalBase>
    </>
  )
}

export default ReferralFriend

export const listLever: IItemLevel[] = [
  {
    icon: '/images/lever_1.svg',
    point: 100,
    dollar: 10,
    lever: 1,
    isReach: false,
  },
  {
    icon: '/images/lever_2.svg',
    point: 500,
    dollar: 50,
    lever: 2,
    isReach: false,
  },
  {
    icon: '/images/lever_3.svg',
    point: 1000,
    dollar: 100,
    lever: 3,
    isReach: false,
  },
  {
    icon: '/images/lever_4.svg',
    point: 5000,
    dollar: 300,
    lever: 4,
    isReach: false,
  },
  {
    icon: '/images/lever_5.svg',
    point: 10000,
    dollar: 500,
    lever: 5,
    isReach: false,
  },
  {
    icon: '/images/lever_6.svg',
    point: 50000,
    dollar: 2000,
    lever: 6,
    isReach: false,
  },
  {
    icon: '/images/lever_7.svg',
    point: 100000,
    dollar: 5000,
    lever: 7,
    isReach: false,
  },
  {
    icon: '/images/lever_8.svg',
    point: 500000,
    dollar: 10000,
    lever: 8,
    isReach: false,
  },
  {
    icon: '/images/lever_9.svg',
    point: 1000000,
    dollar: 20000,
    lever: 9,
    isReach: false,
  },
]
