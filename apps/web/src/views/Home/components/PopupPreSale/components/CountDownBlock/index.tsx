/* eslint-disable import/no-cycle */
import { RoundInfo } from 'views/Vesting'
import PricingInfo from '../PricingInfo'
import StartingSoon from '../StartingSoon'
import styled from 'styled-components'
import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import BackgroundImage from './bg.svg'
import BackgroundImageMobile from './bg-mobile.svg'
import CloseIcon from './close.svg'

const BorderWrapper = styled.div`
  margin-top: 36px;
  margin-bottom: 24px;
  width: 960px;
  height: 496px;
  position: relative;
  border-radius: 20px;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    background: linear-gradient(90deg, #9bf3cb, #3ec0a6, #f44234, #9f3a83);
    padding: 6px;
    left: -4px;
    top: -4px;
    background-size: 300% 300%;
    background-position-x: 0%;
    animation: animatedgradient 5s linear infinite alternate-reverse;
    border-radius: 24px;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    background: linear-gradient(90deg, #9bf3cb, #3ec0a6, #f44234, #9f3a83);
    padding: 6px;
    border-radius: 32px;
    left: -4px;
    top: -4px;
    background-size: 300% 300%;
    background-position-x: 0%;
    animation: animatedgradient 5s linear infinite alternate-reverse;
    width: calc(100% + 16px);
    height: calc(100% + 16px);
    left: -8px;
    top: -8px;
    filter: blur(24px);
  }

  @media screen and (max-width: 1200px) {
    width: calc(100vw - 40px);
    max-width: 475px;
    height: fit-content;
  }

  @keyframes animatedgradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`

const Wrapper = styled.div`
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  z-index: 1;

  & > .close-icon svg {
    position: absolute;
    top: 22px;
    right: 29px;
    left: unset;
    z-index: 10;
    cursor: pointer;
  }

  & > svg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .desktop {
    display: block;
  }

  .mobile {
    display: none;
  }

  @media screen and (max-width: 1200px) {
    width: calc(100vw - 40px);
    max-width: 475px;
    height: fit-content;
    padding-bottom: 100px;
    background: #0a0a0a;

    & > .close-icon svg {
      top: 10px;
      right: 10px;
    }

    & > svg {
      width: 100%;
      max-width: 100%;
      position: absolute;
      right: 0;
      left: 0;
      bottom: 0;
      top: unset;
    }

    .desktop {
      display: none;
    }

    .mobile {
      display: block;
    }
  }
`

const Content = styled.div`
  display: grid;
  grid-template-columns: 444px 350px;
  justify-content: center;
  gap: 58px;
  padding: 48px 42px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr;
    padding: 20px 24px;
    gap: 15px;
  }
`

const ModalStyle = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9998;

  .layout-blur {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
  }
`

interface IProps {
  currentRound: number
  infoRoundOne: RoundInfo
  infoRoundTow: RoundInfo
  infoRoundThree: RoundInfo
  isInTimeRangeSale: boolean
  typeBuyPrice: number
  totalXOXTokenInRound: number | string
  reacheZero: boolean
  setReachZero: (isReach: boolean) => void
  oneHourBeforeStart: number
  setisReachWhitelist: (reach: boolean) => void
}

function CountDownBlock({
  currentRound,
  infoRoundOne,
  infoRoundTow,
  infoRoundThree,
  isInTimeRangeSale,
  typeBuyPrice,
  totalXOXTokenInRound,
  reacheZero,
  setReachZero,
  oneHourBeforeStart,
  setisReachWhitelist,
}: IProps) {
  const modalElement = document.getElementById('modal-root')
  const [isOpenedModal, setOpenedModal] = useState(false)

  const handleOnClose = () => {
    setOpenedModal(true)
    localStorage.setItem(
      'opened-popup-presale',
      JSON.stringify({
        round1: true,
        round2: true,
        round3: true,
      }),
    )
  }

  useEffect(() => {
    const opened = localStorage.getItem('opened-popup-presale')
    if (!opened) {
      setOpenedModal(true)
    }
  }, [])

  return createPortal(
    isOpenedModal ? null : (
      <ModalStyle>
        <div className="layout-blur" onClick={() => handleOnClose()} />
        <BorderWrapper>
          <Wrapper>
            <div className="close-icon" onClick={() => handleOnClose()}>
              <CloseIcon />
            </div>
            <BackgroundImage className="desktop" />
            <BackgroundImageMobile className="mobile" />

            <Content>
              <PricingInfo currentRound={1} isInTimeRangeSale={true} typeBuyPrice={typeBuyPrice} />
              <StartingSoon
                currentRound={1}
                infoRoundOne={{
                  totalDistribution: 10_000_000,
                  startDate: 1682399206816,
                  endDate: 1682499206816,
                  bonusPercentage: 10,
                  exchangeRate: 1.0,
                }}
                infoRoundTow={{
                  totalDistribution: 10_000_000,
                  startDate: 1682599206816,
                  endDate: 1682699206816,
                  bonusPercentage: 10,
                  exchangeRate: 1.0,
                }}
                infoRoundThree={{
                  totalDistribution: 10_000_000,
                  startDate: 1682799206816,
                  endDate: 1682899206816,
                  bonusPercentage: 10,
                  exchangeRate: 1.0,
                }}
                totalXOXTokenInRound={totalXOXTokenInRound}
                isInTimeRangeSale={isInTimeRangeSale}
                reacheZero={reacheZero}
                setReachZero={setReachZero}
                oneHourBeforeStart={oneHourBeforeStart}
                setisReachWhitelist={setisReachWhitelist}
              />
            </Content>
          </Wrapper>
        </BorderWrapper>
      </ModalStyle>
    ),
    modalElement,
  )
}

export default CountDownBlock
