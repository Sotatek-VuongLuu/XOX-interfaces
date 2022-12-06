import styled from 'styled-components'
import TeamMenber from './TeamMenber'

const Wrapper = styled.div`
  margin-bottom: 100px;
  .title {
    text-align: center;
    font-weight: 700;
    font-size: 36px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 16px;
  }

  .decoration {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 48px;
  }

  .main_content {
    display: flex;
    gap: 24px;
  }
`

const WrapperItem = styled.div`
  padding: 24px 22px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 20px;

  .title_item {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 16px;
  }

  .describe {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.6);
  }
`

const UpComingItem = ({ title, describe }) => {
  return (
    <WrapperItem>
      <p className="title_item">{title}</p>
      <p className="describe">{describe}</p>
    </WrapperItem>
  )
}

const UpComing = () => {
  return (
    <Wrapper>
      <div className="title">Upcoming Utilities</div>
      <p className="decoration">Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis.</p>

      <div className="main_content">
        {listItem.map(({ title, describe }) => {
          return <UpComingItem describe={describe} title={title} />
        })}
      </div>
    </Wrapper>
  )
}

const listItem = [
  {
    title: 'Decentralized Wallet',
    describe:
      'Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis. Morbi sed aliquet donec  facilisis. Senectus eget. Lorem ipsum dolor sit amet consectetur.',
  },
  {
    title: 'Multichain Launchpad',
    describe:
      'Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis. Morbi sed aliquet donec  facilisis. Senectus eget. Lorem ipsum dolor sit amet consectetur.',
  },
  {
    title: 'Coin Listing/Ranking Site',
    describe:
      'Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis. Morbi sed aliquet donec  facilisis. Senectus eget. Lorem ipsum dolor sit amet consectetur.',
  },
  {
    title: 'Advance Trading Station',
    describe:
      'Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis. Morbi sed aliquet donec  facilisis. Senectus eget. Lorem ipsum dolor sit amet consectetur.',
  },
]

export default UpComing
