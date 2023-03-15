import ConnectWalletButton from 'components/ConnectWalletButton'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useWindowSize from 'hooks/useWindowSize'
import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import VestingSchedule from './MainInfoTab/VestingSchedule'
import YourInfo from './MainInfoTab/YourInfo'
import PrivateSale from './MechanismTab/PrivateSale'
import ReferralProgram from './MechanismTab/ReferralProgram'
import TokenMetrics from './MechanismTab/TokenMetrics'

interface IProps {
  tabSaleMechanism: string[]
  tabActiveMechansim: string
  setTabActiveMechansim: (tabActiveMechansim: string) => void
  initialTokenMetrics: any[]
  dataInfo: any[]
  dataRefInfo: any
}

interface IPropsWrapper {
  isMore?: boolean
}

const Wrapper = styled.div<IPropsWrapper>`
  position: relative;
  padding: 24px;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin-top: 24px;
  margin-bottom: 24px;

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

  .overlay_learmore {
    position: absolute;
    width: 100%;
    height: 290px;
    background: linear-gradient(360deg, #0a0a0a 16.15%, rgba(22, 20, 44, 0) 100%);
    border-radius: 0px 0px 20px 20px;
    bottom: 0;
    left: 0;
    z-index: 9;
  }

  .btn_learnmore {
    position: absolute;
    padding: 10px 20px;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    border: 1px solid #ffffff;
    border-radius: 8px;
    background: transparent;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
  }

  @keyframes MoveDown {
    0%,
    100% {
      bottom: 20px;
    }
    50% {
      bottom: 10px;
    }
  }

  @keyframes MoveUp {
    0%,
    100% {
      top: 0px;
    }
    50% {
      top: 10px;
    }
  }

  .fi_chevrons-down {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    animation: MoveDown 2s linear infinite;
  }

  .container_learnless {
    display: flex;
    justify-content: center;
    margin-top: 24px;

    & > div {
      width: max-content;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      img {
        max-width: 24px;
        position: absolute;
        transform: rotate(180deg);
        top: 0;
        margin-bottom: 6px;
        animation: MoveUp 2s linear infinite;
      }
      button {
        padding: 10px 20px;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
        border: 1px solid #ffffff;
        border-radius: 8px;
        background: transparent;
        margin-top: 40px;
      }
    }
  }

  @media screen and (max-width: 900px) {
    height: ${({ isMore }) => (isMore ? 'auto' : '540px')};
    overflow-y: hidden;
  }
`
const Content = styled.div`
  .tab-mechanism {
    display: flex;
    color: white;
    cursor: pointer;
    margin-bottom: 24px;
    justify-content: center;

    .item-tab-mechanism {
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 8px;
      white-space: nowrap;
      &:hover {
        background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
      }
    }

    .item-tab-mechanism.active {
      background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    }

    @media screen and (max-width: 900px) {
      justify-content: flex-start;
      overflow-x: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`

function SaleMechanism({
  tabSaleMechanism,
  tabActiveMechansim,
  setTabActiveMechansim,
  initialTokenMetrics,
  dataInfo,
  dataRefInfo,
}: IProps) {
  const { account } = useActiveWeb3React()
  const { width } = useWindowSize()
  const [isMore, setIsMore] = useState(false)

  const renderBody = (tab: string) => {
    if (!account) {
      return (
        <ConnectWalletButton scale="sm" style={{ whiteSpace: 'nowrap' }}>
          <span>Connect Wallet</span>
        </ConnectWalletButton>
      )
    }
    switch (tab) {
      case 'Sale Referral Program':
        return <ReferralProgram />
      case 'Token Metrics':
        return <TokenMetrics initialTokenMetrics={initialTokenMetrics} />
      case 'Vesting Schedule':
        return <VestingSchedule />
      case 'Your Information':
        return <YourInfo dataInfo={dataInfo} dataRefInfo={dataRefInfo} />
      default:
        return <PrivateSale />
    }
  }

  return (
    <Wrapper isMore={isMore}>
      <div className="corner1" />
      <div className="edge1" />
      <div className="corner2" />
      <div className="edge2" />
      <Content>
        <div className="tab-mechanism">
          {Array.from(tabSaleMechanism).map((item) => {
            return (
              <div
                className={tabActiveMechansim === item ? `item-tab-mechanism active` : `item-tab-mechanism`}
                onClick={() => setTabActiveMechansim(item)}
                aria-hidden="true"
              >
                {item}
              </div>
            )
          })}
        </div>
        <div className="body">{renderBody(tabActiveMechansim)}</div>
      </Content>

      {width <= 900 && isMore && (
        <div className="container_learnless">
          <div>
            <img src="/images/fi_chevrons-down.png" alt="fi_chevrons-down" className="fi_chevrons-up" />
            <button type="button" className="btn_learnless" onMouseDown={() => setIsMore(false)}>
              Learn Less
            </button>
          </div>
        </div>
      )}

      {width <= 900 && !isMore && (
        <div className="overlay_learmore">
          <button type="button" className="btn_learnmore" onClick={() => setIsMore(true)}>
            Learn More
          </button>
          <img src="/images/fi_chevrons-down.svg" alt="fi_chevrons-down" className="fi_chevrons-down" />
        </div>
      )}
    </Wrapper>
  )
}

export default SaleMechanism