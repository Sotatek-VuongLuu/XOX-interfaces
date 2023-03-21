/* eslint-disable react/no-unescaped-entities */
import {
  Avatar,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material'
import { useEffect, useMemo, useState, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import useWindowSize from 'hooks/useWindowSize'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTreasuryXOX } from 'hooks/useContract'
import { formatUnits } from '@ethersproject/units'
import { getUserFriend } from 'services/referral'
import { USD_DECIMALS } from 'config/constants/exchange'
import { formatAmountNumber, roundingAmountNumber } from '@pancakeswap/utils/formatBalance'
import axios from 'axios'
import { CopyButton, useToast } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { GridLoader } from 'react-spinners'
import ModalConfirmClaim from './Modal/ModalComfirmClaim'
import ModalBase from './Modal/ModalBase'
import { ToastDescriptionWithTx } from 'components/Toast'

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
  totalUnClaimed: string | number
}

enum TYPE_OF_CLAIM {
  CLAIM_ALL,
  CLAIM_BY_LEVEL,
}

interface IPropsWR {
  account?: string
  isClaimAll?: boolean
}

const WrapperLeft = styled(Box)`
  padding: 24px 24px 12px 24px;
  border-radius: 20px;
  min-height: 240px;
  position: relative;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);

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
    height: calc(100% - 80px);
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
    height: calc(100% - 80px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: -1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }
  /* &::before {
    content: '';
    display: inline-block;
    width: 7px;
    height: 7px;
    background: #242424;
    position: absolute;
    right: 23px;
    bottom: 23px;
  } */
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

export const WrapperRight = styled(Box)<IPropsWR>`
  margin-top: 0 !important;
  position: relative;

  .item {
    position: relative;
    background-size: 192px 172px;
    background-repeat: no-repeat;
    background-position: center;
    height: auto;
    width: 100%;
    /* background: url(/images/item.svg); */
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
    margin: auto;
    &:hover {
      transform: scale(1.08);
      .jewellery {
        animation: ${floatingAnim('0px', '10px')} 3s ease-in-out infinite !important;
      }
      .main-img .sec-img {
        opacity: 1;
      }

      div.inner-text .shadow {
        background: radial-gradient(50% 50% at 50% 50%, #f97d1d 0%, rgba(64, 25, 21, 0) 100%) !important;
      }
    }
  }
  .main-img {
    width: calc(100% + 20px);
    margin-left: -10px;
    position: relative;
    img {
      width: 100%;
      height: auto;
    }
    .sec-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      opacity: 0;
    }
  }
  .item > div.inner-text {
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
      background-color: unset;
      -webkit-text-fill-color: unset;
    }

    .jewellery {
      animation: ${floatingAnim('0px', '5px')} 3s ease-in-out infinite;
    }
  }

  .current {
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
    z-index: 999;
    background-image: url(/images/next.svg);
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
    border-radius: 50%;
    @media screen and (max-width: 555px) {
      margin-right: -14px;
    }
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
    margin-top: -20px;
  }

  .claim_total {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      border-radius: 8px;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
      padding: 8px 20px;
      &:hover {
        opacity: 0.9;
      }

      @media screen and (max-width: 900px) {
        width: 100%;
      }
    }

    button:disabled,
    button[disabled] {
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.38);
      cursor: not-allowed;
    }

    .total_un_claimed {
      color: rgba(255, 255, 255, 0.6);
      font-weight: 700;
      font-size: 14px;
      margin: 10px 0 20px 0;
    }

    .unclaim_reward_container {
      /* background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
      padding: 2px;
      border-radius: 4px;
      margin-right: 16px; */

      .unclaim_reward {
        /* width: 100%;
        height: 100%;
        background: black;
        border-radius: 4px; */
        div {
          color: rgba(255, 255, 255, 0.6);
          font-weight: 700;
          font-size: 14px;

          /* font-weight: 700;
          font-size: 14px;
          line-height: 17px;
          padding: 8px 20px;
          background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text; */
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

  .claim {
    background: #ffffff;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  .claimed {
    color: rgba(255, 255, 255, 0.38);
    background: unset;
    text-fill-color: unset;
  }
`

const Content = styled.div`
  .discription {
    padding: 24px 0px;
    text-align: center;
    .value {
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: rgba(255, 255, 255, 0.87);
      margin-bottom: 10px;

      span {
        font-weight: 700;
      }
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
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
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
      color: #fb8618;
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

const Pad = styled.div`
  width: 100%;
  height: calc(100% + 16px);
  background: #242424;
  margin-top: -16px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  z-index: 7;
`

const StyledTable = styled.div`
  overflow-x: scroll;
  ::-webkit-scrollbar-corner {
    display: none;
  }
  .table {
    min-width: 400px;
    width: 100%;
    .table-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0 8px;
      margin-bottom: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-right: 8px;

      p:first-child {
        width: 40%;
      }
      p:last-child {
        text-align: end;
      }
      p {
        width: 25%;
        font-size: 14px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.6);
        font-family: 'Inter';
      }
    }
    .table-row {
      width: 100%;
      max-height: 128px;
      overflow: scroll;
      padding-right: 8px;
      ::-webkit-scrollbar-corner {
        display: none;
      }
      .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 8px 0;
        .row-item:first-child {
          width: 40%;
        }
        .row-item {
          width: 25%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .name,
          .code,
          .point {
            color: rgba(255, 255, 255, 0.87);
            font-size: 14px;
            font-weight: 400;
            font-family: 'Inter';
          }
          .point {
            text-align: end;
            width: 100%;
          }
        }
      }
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
  const [isShowModalConfirmClaimAll, setIsShowModalConfirmClaimAll] = useState<boolean>(false)
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false)
  const [isOpenLoadingClaimModal, setIsOpenLoadingClaimModal] = useState<boolean>(false)
  const [modalReject, setModalReject] = useState<boolean>(false)
  const [dataClaim, setDataClaim] = useState<IDataClaim>({
    point: 0,
    dollar: 0,
  })
  const [level, setLevel] = useState<number | null>(null)
  const [typeOfClaim, setTypeOfClaim] = useState<number | null>(null)
  const [listFriends, setListFriends] = useState([])
  const { t } = useTranslation()
  const { toastError, toastSuccess, toastWarning } = useToast()
  const [cacheAmountUnClaimOfUser, setCacheAmountUnClaimOfUser] = useState<null | number>(null)

  const swiperRef = useRef(null)

  useEffect(() => {
    if (!swiperRef.current) return
    swiperRef.current.swiper?.slideTo(currentLevelReach ? currentLevelReach - 1 : 0)
  }, [currentLevelReach])

  const handleClaimAll = async () => {
    try {
      setIsShowModalConfirmClaimAll(false)
      setIsOpenLoadingClaimModal(true)
      setTypeOfClaim(TYPE_OF_CLAIM.CLAIM_ALL)
      const txPendingReward = await contractTreasuryXOX.pendingRewardAll(account)
      setCacheAmountUnClaimOfUser(Number(formatUnits(txPendingReward._hex, USD_DECIMALS[chainId])))
      const params = []
      const gasLimit = await contractTreasuryXOX.estimateGas.claimReferralAll(...params)
      const txClaimAll = await contractTreasuryXOX.claimReferralAll(...params, {
        gasLimit,
      })
      const tx = await txClaimAll.wait(1)
      if (tx?.transactionHash) {
        getUserPoint()
        handleCheckReachLevel()
        handleCheckPendingRewardAll(account)
        setIsOpenLoadingClaimModal(false)
        // setIsOpenSuccessModal(true)
        toastSuccess(
          'Success',
          `You have received $${(
            Number(formatUnits(txPendingReward._hex, USD_DECIMALS[chainId])) * 0.99
          ).toLocaleString()}`,
        )
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(`error>>>>>`, error)
      setIsOpenLoadingClaimModal(false)
      if (error && error?.code === 'ACTION_REJECTED') {
        toastWarning('Confirm Claim', 'Transaction rejected.')
      }
      if (error?.code !== 'ACTION_REJECTED') {
        toastError('Confirm Claim', 'Transaction failed')
      }
    }
  }

  const handleClaimLevel = async (_level: number) => {
    try {
      if (!_level) return
      setTypeOfClaim(TYPE_OF_CLAIM.CLAIM_BY_LEVEL)
      setIsShowModalConfirmClaimByLevel(false)
      setIsOpenLoadingClaimModal(true)
      const gasLimit = await contractTreasuryXOX.estimateGas.claimReferralByLevel(_level)
      const txClaimByLevel = await contractTreasuryXOX.claimReferralByLevel(_level, {
        gasLimit,
      })
      const tx = await txClaimByLevel.wait(1)
      if (tx?.transactionHash) {
        getUserPoint()
        handleCheckReachLevel()
        handleCheckPendingRewardAll(account)
        setIsOpenLoadingClaimModal(false)
        // setIsOpenSuccessModal(true)
        toastSuccess('Success.', `You have received $${(dataClaim.dollar * 0.99).toLocaleString()}`)
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(`error>>>>>`, error)
      setIsOpenLoadingClaimModal(false)
      if (error && error?.code === 'ACTION_REJECTED') {
        // setModalReject(true)
        toastWarning('Confirm Claim', 'Transaction rejected.')
      }

      if (error?.code !== 'ACTION_REJECTED') {
        toastError('Confirm Claim', 'Transaction failed')
      }
    }
  }

  const controlWidth = useMemo(() => {
    let slidesPerView = 5
    if (width < 1600) {
      slidesPerView = 5
    }
    if (width < 1400) {
      slidesPerView = 4
    }
    if (width < 1200) {
      slidesPerView = 4
    }
    if (width < 900) {
      slidesPerView = 3
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
      const sortByPoints = userInfos[0]?.friends?.sort(function (a: any, b: any) {
        return Number(b.amount) - Number(a.amount)
      })
      // console.log('sortByPoints', sortByPoints)
      if (Array.from(userInfos).length !== 0) {
        const dataUserFormatAmount = sortByPoints.map((item: any) => {
          return {
            ...item,
            id: item?.ref_address,
            point: Number(formatUnits(item.amount, USD_DECIMALS[chainId])),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account])

  return (
    <>
      <Box sx={{ marginTop: '16px', zIndex: 9 }}>
        <Grid container spacing={2}>
          {width > 1200 && (
            <Grid item xs={12} lg={4} sx={{ zIndex: 7 }}>
              {account && (
                <WrapperLeft>
                  <div className="corner1" />
                  <div className="edge1" />
                  <div className="corner2" />
                  <div className="edge2" />
                  <p className="title">Referral friends</p>
                  {listFriends.length !== 0 ? (
                    <StyledTable>
                      <div className="table">
                        <div className="table-head">
                          <p>Username</p>
                          <p>Referral Code</p>
                          <p>Total Points</p>
                        </div>
                        <div className="table-row">
                          {[...listFriends].map((row) => (
                            <div className="row" key={row.name}>
                              <div className="row-item">
                                <Avatar
                                  alt="Remy Sharp"
                                  src={row.avatar}
                                  sx={{ marginRight: '8px', height: '24px', width: '24px' }}
                                />
                                <Tooltip title={row?.name}>
                                  <p className="name">
                                    {row.name?.length > 9
                                      ? `${row.name.substring(0, 7)}...${row.name.substring(row.name.length - 2)}`
                                      : row.name}
                                  </p>
                                </Tooltip>
                              </div>
                              <div className="row-item">
                                <p className="code">
                                  {row?.refCode?.length > 9
                                    ? `${row.refCode.substring(0, 7)}...${row.refCode.substring(
                                        row.refCode.length - 2,
                                      )}`
                                    : row.refCode}
                                </p>
                                <CopyButton
                                  width="24px"
                                  text={row?.refCode}
                                  tooltipMessage={t('Copied')}
                                  button={
                                    <img
                                      src="/images/copy_referral.svg"
                                      alt="copy_purple"
                                      style={{ marginBottom: '-2px', marginLeft: '8px' }}
                                    />
                                  }
                                />
                              </div>
                              <div className="row-item">
                                <p className="point">{formatAmountNumber(row.point, 2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </StyledTable>
                  ) : (
                    <div className="no-data">No Data</div>
                  )}
                </WrapperLeft>
              )}
            </Grid>
          )}

          <Grid item xs={12} lg={8}>
            {account && (
              <WrapperRight sx={{ marginTop: '16px' }} account={account}>
                <Swiper
                  slidesPerView={controlWidth}
                  modules={[Navigation, Pagination, A11y]}
                  navigation
                  scrollbar={{ draggable: true }}
                  ref={swiperRef}
                >
                  {listLevelMustReach.map((item: IItemLevel) => {
                    return (
                      <SwiperSlide key={item.icon}>
                        <div
                          className={`item ${item.isReach && item.lever === currentLevelReach ? 'current' : ''}`}
                          key={item.icon}
                        >
                          <div className="main-img">
                            <img
                              className="first-img"
                              src={item.isReach ? '/images/current_item.svg' : 'images/item.svg'}
                              alt="images"
                            />
                            <img className="sec-img" src="/images/current_item.svg" alt="images" />
                          </div>
                          <div className="inner-text">
                            <img src={item.icon} alt="icons" className="jewellery" />
                            <div
                              className="shadow"
                              style={{
                                background: `${
                                  item.isReach
                                    ? 'radial-gradient(50% 50% at 50% 50%, #f97d1d 0%, rgba(64, 25, 21, 0) 100%)'
                                    : 'radial-gradient(50% 50% at 50% 50%, #000000 0%, rgba(48, 48, 48, 0) 100%)'
                                }`,
                              }}
                            />

                            <p className="title">{item.point.toLocaleString()} points</p>
                            <p className="title">~ ${item.dollar.toLocaleString()}</p>
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
                                {item?.isClaimed ? (
                                  <span className={`${item.lever === currentLevelReach ? 'claimed' : ''}`}>
                                    Claimed
                                  </span>
                                ) : (
                                  <span className={`${item.isReach ? 'claim' : ''} `}>Claim</span>
                                )}
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
                    // <div className="unclaim_reward_container">
                    //   <div className="unclaim_reward">
                    <p className="total_un_claimed">
                      ${Number(totalUnClaimed) <= 0 ? 0 : Number(totalUnClaimed)} Unclaimed Rewards
                    </p>
                    //   </div>
                    // </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsShowModalConfirmClaimAll(true)}
                    disabled={!account || isClaimAll}
                  >
                    <span>Claim All</span>
                  </button>
                </div>
              </WrapperRight>
            )}
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
            <p className="value">
              Withdraw Amount <span>${roundingAmountNumber(Number(dataClaim.dollar))}</span>
            </p>
            <p className="value">
              You will receive:{' '}
              <span>
                ${roundingAmountNumber(Number(dataClaim.dollar) * 0.99)} $
                {chainId === 5 || chainId === 1 ? 'USDC' : 'USDT'}
              </span>
            </p>
            <p className="value">
              Platform Fee:{' '}
              <span>
                ${roundingAmountNumber(Number(dataClaim.dollar) - Number(dataClaim.dollar) * 0.99)} $
                {chainId === 5 || chainId === 1 ? 'USDC' : 'USDT'}
              </span>{' '}
            </p>
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

      <ModalBase
        open={isShowModalConfirmClaimAll}
        handleClose={() => setIsShowModalConfirmClaimAll(false)}
        title="Claim"
        width="464px"
      >
        <Content>
          <div className="discription">
            <p className="value">
              {' '}
              Withdraw Amount <span>${Number(totalUnClaimed)?.toLocaleString()}</span>{' '}
            </p>
            <p className="value">
              You will receive:{' '}
              <span>
                {`${roundingAmountNumber(Number(totalUnClaimed) * 0.99)} ${
                  chainId === 5 || chainId === 1 ? 'USDC' : 'USDT'
                }`}
              </span>
            </p>
            <p className="value">
              Platform Fee:{' '}
              <span>
                {`${roundingAmountNumber(Number(totalUnClaimed) - Number(totalUnClaimed) * 0.99)} ${
                  chainId === 5 || chainId === 1 ? 'USDC' : 'USDT'
                }`}
              </span>
            </p>
          </div>
          <div className="btn-group">
            <button className="cancel" type="button" onClick={() => setIsShowModalConfirmClaimAll(false)}>
              Cancel
            </button>
            <button
              className="confirm"
              type="button"
              onClick={() => {
                handleClaimAll()
              }}
            >
              Confirm
            </button>
          </div>
        </Content>
      </ModalBase>

      <ModalBase open={isOpenSuccessModal} handleClose={() => setIsOpenSuccessModal(false)} title="Success">
        <Content>
          <div className="noti">
            You have got{' '}
            <span>
              {typeOfClaim === TYPE_OF_CLAIM.CLAIM_BY_LEVEL
                ? (dataClaim.dollar * 0.99).toLocaleString()
                : (Number(cacheAmountUnClaimOfUser) * 0.99).toLocaleString()}
              $.
            </span>
          </div>
          <div className="noti_claim_success">
            <img src="/images/success_claim.png" alt="success_claim" />
          </div>
          <img
            src="/images/close-one.svg"
            alt="close-one"
            className="x-close-icon"
            aria-hidden="true"
            onClick={() => setIsOpenSuccessModal(false)}
          />
        </Content>
      </ModalBase>

      <ModalBase
        open={isOpenLoadingClaimModal}
        handleClose={() => setIsOpenLoadingClaimModal(false)}
        title="Confirm Claim"
      >
        <Content>
          <div className="xox_loading" style={{ margin: '24px 0px' }}>
            <GridLoader color="#FB8618" style={{ width: '51px', height: '51px' }} />
          </div>
          <div className="noti_claim_pending_h1">Waiting For Confirmation</div>
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
      <ModalBase open={modalReject} handleClose={() => setModalReject(false)} title="Confirm Claim">
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
            aria-hidden="true"
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
