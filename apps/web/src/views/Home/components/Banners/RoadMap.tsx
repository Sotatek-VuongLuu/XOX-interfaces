import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'
// eslint-disable-next-line import/no-cycle
import RoadMapItem from './RoadMapItem'
// eslint-disable-next-line import/no-cycle
import RoadMapMobile from './RoadMapMobile'

export interface IRoadMapItem {
  year: string
  describe: string[]
  status?: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .main {
    max-width: 100%;
    margin-top: 48px;
    height: 570px;
    display: flex;
    justify-content: center;

    @media screen and (min-width: 900px) {
      padding: 0 20px;
    }

    .timeline-item {
      width: 20%;
      overflow: visible;
    }

    .timeline-item:last-child > div {
      width: 100%;
      overflow: visible;
    }

    .timeline-item-2,
    .timeline-item-4 {
      .line {
        background: linear-gradient(180deg, #000000 0%, #9072ff 100%);
        bottom: 0;
        opacity: 0.25;
      }
      .milestone {
        left: 0;
        bottom: 0;
        transform: translate(-50%, 50%);
      }

      .line_status {
        transform: translateY(50%);
        bottom: 0;
      }

      .item__main-content {
        margin-bottom: 70px;
        margin-left: 20px;
      }
    }

    .timeline-item-1,
    .timeline-item-3,
    .timeline-item-5 {
      align-self: flex-end;
      .line {
        background: linear-gradient(0deg, #000000 0%, #9072ff 100%);
        top: 0;
        opacity: 0.25;
      }
      .milestone {
        top: 0;
        transform: translate(-50%, -50%);
      }
      .line_status {
        transform: translateY(-50%);
        top: 0;
      }

      .item__main-content {
        margin-top: 50px;
        margin-left: 20px;
      }
    }
  }
`

const Description = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;

  @media screen and (max-width: 900px) {
    font-size: 14px;
  }
`

const Title = styled.div`
  font-weight: 700;
  font-size: 36px;
  color: rgba(255, 255, 255, 0.87);
  text-align: center;
  margin-bottom: 16px;

  @media screen and (max-width: 900px) {
    font-size: 20px;
    line-height: 32px;
  }
`

const RoadMap = () => {
  const { width } = useWindowSize()
  return (
    <Wrapper style={{ overflow: 'hidden' }}>
      <Title data-aos="fade-up">Road map</Title>
      <Description data-aos="fade-up" data-aos-duration="2300">
        Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis.
      </Description>

      {width < 970 ? (
        <RoadMapMobile />
      ) : (
        <div className="main">
          {listRoadMap.map((item: IRoadMapItem, index) => {
            return <RoadMapItem item={item} index={index + 1} key={`${item.year}_parent_${index % 2}`} />
          })}
        </div>
      )}
    </Wrapper>
  )
}

export const listRoadMap = [
  {
    year: 'Ready & Live',
    describe: ['Website', 'XOX & XOXS Multi Chain Smart Contracts', 'Decentralized Dex'],
    status: 'done',
  },
  {
    year: 'Ready & Live',
    describe: ['Referral Program Dapp', 'XOXS Staking Dashboard', 'Multi Chain Assets Management Dapp'],
    status: 'done',
  },
  {
    year: 'Under Development',
    describe: [
      'Bridge',
      'Adding Features To Already Live Utilities',
      'Decentralized Wallet Available On IOS, Android & Web',
    ],
    status: 'processing',
  },
  {
    year: 'Under Development',
    describe: [
      'Multichain Launchpad',
      'Coin Listing/Ranking Site (Early Stage)',
      'Advance Trading Station (Early Stage)',
    ],
    status: 'todo',
  },
  {
    year: 'Upcoming Developments',
    describe: [
      'Improve and fix bugs or issues on current live utilities. (Improvement Stage)',
      'Planning & Researching Upcoming Potential Developments.',
    ],
    status: 'todo',
  },
]

export default RoadMap
