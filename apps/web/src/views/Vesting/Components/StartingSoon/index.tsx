/* eslint-disable consistent-return */
import { formatEther } from '@ethersproject/units'
import BigNumber from 'bignumber.js'
import { logger } from 'ethers'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import IfoFoldableCard from 'views/Ifos/components/IfoFoldableCard'
import { RoundInfo } from 'views/Vesting'
import CountDown from '../CountDown'
import { TOKEN_IN_ROUND } from '../PricingInfo'

const Wrapper = styled.div`
  padding: 24px;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  position: relative;
  .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.075em;
    text-transform: uppercase;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
  }
  .notice {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
    margin-top: 12px;
    margin-bottom: 47px;
  }

  .percent_sale {
    text-align: center;
    margin-top: 27px;
    margin-bottom: 16px;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.87);
  }

  .processing {
    height: 10px;
    width: 100%;
    background: transparent;
    box-shadow: 0px 4px 20px rgba(255, 112, 31, 0.5);
    border-radius: 20px;
  }

  .processing_child {
    height: 100%;
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    border-radius: inherit;
  }

  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 1px solid #ffffff30;
    border-left: 1px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 1px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    left: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 1px solid #ffffff30;
    border-right: 1px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 1px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .rocket_container {
    display: flex;
    justify-content: center;
    img {
      max-width: 100% !important;
      height: auto;
      display: block;
      margin-top: 30px;
    }
  }

  @media screen and (max-width: 900px) {
    padding: 24px 18px;

    .title {
      font-size: 16px;
      line-height: 24px;
    }

    .notice {
      font-size: 14px;
      line-height: 17px;
      margin-top: 10px;
      margin-bottom: 24px;
    }

    .processing {
      font-size: 14px;
      line-height: 17px;
      height: 6px;
    }

    .percent_sale {
      font-size: 14px;
      line-height: 17px;
    }

    .processing_child {
      height: 100%;
    }
  }
`

interface IProps {
  currentRound: number
  infoRoundOne: RoundInfo
  infoRoundTow: RoundInfo
  infoRoundThree: RoundInfo
  totalXOXTokenInRound: number | string
  isInTimeRangeSale: boolean
  isUserInWhiteList: boolean
  isTimeAllowWhitelist: boolean
  setReachZero: (isReach: boolean) => void
  reacheZero: boolean
}

const now = new Date()
const timeStampOfNow = now.getTime()

function StartingSoon({
  infoRoundOne,
  infoRoundTow,
  infoRoundThree,
  totalXOXTokenInRound,
  currentRound,
  isInTimeRangeSale,
  isUserInWhiteList,
  isTimeAllowWhitelist,
  setReachZero,
  reacheZero,
}: IProps) {
  const isCanBuyWithWhitelistUser = isUserInWhiteList && isTimeAllowWhitelist
  const isNotSetDataForAll = !infoRoundOne.endDate && !infoRoundTow.endDate && !infoRoundThree.endDate

  const handleReturnPercent = (round: any) => {
    const roundCheckWithWhitelist = isTimeAllowWhitelist ? 1 : round
    switch (roundCheckWithWhitelist) {
      case 1: {
        const percent = new BigNumber(totalXOXTokenInRound)
          .multipliedBy(100)
          .dividedBy(TOKEN_IN_ROUND.ROUND_ONE)
          .toNumber()
        return (
          <>
            <p className="percent_sale">{`${percent}%`} SOLD</p>
            <div className="processing">
              <div className="processing_child" style={{ width: `${percent}%` }} />
            </div>
          </>
        )
      }

      case 2: {
        const percent = new BigNumber(totalXOXTokenInRound)
          .multipliedBy(100)
          .dividedBy(TOKEN_IN_ROUND.ROUND_TOW)
          .toNumber()
        return (
          <>
            <p className="percent_sale">{`${percent}%`} SOLD</p>
            <div className="processing">
              <div className="processing_child" style={{ width: `${percent}%` }} />
            </div>
          </>
        )
      }

      case 3: {
        const percent = new BigNumber(totalXOXTokenInRound)
          .multipliedBy(100)
          .dividedBy(TOKEN_IN_ROUND.ROUND_ONE)
          .toNumber()
        return (
          <>
            <p className="percent_sale">
              <p className="percent_sale">{`${percent}%`} SOLD</p>
            </p>
            <div className="processing">
              <div className="processing_child" style={{ width: `${percent}%` }} />
            </div>
          </>
        )
      }
      default:
        break
    }
  }

  const handleCountdownArg = (startDate: number) => {
    return <CountDown startTime={startDate} setReachZero={setReachZero} />
  }

  const handleRenderCountdown = (timeStamp: number) => {
    if (timeStamp < infoRoundOne.startDate) {
      return (
        <>
          <p className="notice">
            Sale 1 will start on {moment.unix(infoRoundOne.startDate / 1000).format('DD/MM/YYYY')}.
          </p>
          {handleCountdownArg(infoRoundOne.startDate)}
        </>
      )
    }
    if (infoRoundOne.startDate < timeStamp && timeStamp < infoRoundOne.endDate) {
      return (
        <>
          <p className="notice">Sale 1 will end on {moment.unix(infoRoundOne.endDate / 1000).format('DD/MM/YYYY')}.</p>
          {handleCountdownArg(infoRoundOne.endDate)}
        </>
      )
    }

    if (infoRoundTow.startDate && timeStamp >= infoRoundOne.endDate && timeStamp < infoRoundTow.endDate) {
      if (infoRoundOne.endDate <= timeStamp && timeStamp < infoRoundTow.startDate) {
        return (
          <>
            <p className="notice">
              Sale 2 will start on {moment.unix(infoRoundTow.startDate / 1000).format('DD/MM/YYYY')}.
            </p>
            {handleCountdownArg(infoRoundTow.startDate)}
          </>
        )
      }

      if (infoRoundTow.startDate <= timeStamp && timeStamp < infoRoundTow.endDate) {
        return (
          <>
            <p className="notice">
              Sale 2 will end on {moment.unix(infoRoundTow.endDate / 1000).format('DD/MM/YYYY')}.
            </p>
            {handleCountdownArg(infoRoundTow.endDate)}
          </>
        )
      }
    }
    if (infoRoundThree.startDate && timeStamp >= infoRoundTow.endDate && timeStamp <= infoRoundThree.endDate) {
      if (infoRoundTow.endDate <= timeStamp && timeStamp < infoRoundThree.startDate) {
        return (
          <>
            <p className="notice">
              Sale 3 will start on {moment.unix(infoRoundThree.startDate / 1000).format('DD/MM/YYYY')}.
            </p>
            {handleCountdownArg(infoRoundThree.startDate)}
          </>
        )
      }

      if (infoRoundThree.startDate <= timeStamp && timeStamp < infoRoundThree.endDate) {
        return (
          <>
            <p className="notice">
              Sale 3 will end on {moment.unix(infoRoundThree.endDate / 1000).format('DD/MM/YYYY')}.
            </p>
            {handleCountdownArg(infoRoundThree.endDate)}
          </>
        )
      }

      if (infoRoundThree.endDate <= timeStamp) {
        return (
          <>
            <p className="notice">Pre-Sale is end!.</p>
            <CountDown startTime={null} />
          </>
        )
      }
    }

    return (
      <div className="rocket_container">
        <img src="/images/rocket_xox.png" alt="rocket_xox" />
      </div>
    )
  }

  useEffect(() => {
    if (reacheZero) {
      const ngu = now.getTime()
      handleRenderCountdown(ngu)
    }
    const id = setTimeout(() => {
      setReachZero(false)
    }, 5000)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reacheZero])

  return (
    <Wrapper>
      <div className="corner1" />
      <div className="edge1" />
      <div className="corner2" />
      <div className="edge2" />
      <p className="title">{isInTimeRangeSale ? 'XOX Token is on sale' : 'New Sale Will Start Soon'}</p>
      {isNotSetDataForAll ? (
        <div className="rocket_container">
          <img src="/images/rocket_xox.png" alt="rocket_xox" />
        </div>
      ) : (
        handleRenderCountdown(timeStampOfNow)
      )}
      {(isInTimeRangeSale || isCanBuyWithWhitelistUser) && handleReturnPercent(currentRound)}
    </Wrapper>
  )
}

export default StartingSoon
