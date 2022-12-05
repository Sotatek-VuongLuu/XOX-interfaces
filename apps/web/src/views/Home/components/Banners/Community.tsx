import styled from 'styled-components'

interface IItemListCommunity {
  icon: string
  name: string
  des: string
}

interface Iprops {
  item: IItemListCommunity
}

const Wrapper = styled.div`
  margin-top: 100px;
  .main_container {
    display: flex;
    justify-content: center;
  }
  .main {
    display: grid;
    grid-template-columns: 580px 580px;
    column-gap: 48px;
    row-gap: 40px;

    .item_container {
      padding: 24px 32px;
      background: #242424;
      border-radius: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      width: 578px;

      .icon-container {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background-image: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
        padding: 1px;
      }
      .icon {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #242424;
      }

      .overlay {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(95, 53, 235, 0.1);
      }

      .name {
        font-weight: 700;
        font-size: 20px;
        color: #ffffff;
        margin-bottom: 16px;
      }

      .des {
        font-weight: 400;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.87);
      }
    }
  }

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
`

const CommunityItem = ({ item }: Iprops) => {
  return (
    <div className="item_container">
      <div>
        <div className="icon-container">
          <div className="icon">
            <div className="overlay">
              <img src={item.icon} alt="icon" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="name">{item.name}</p>
        <ul>
          <li className="des">{item.des}</li>
        </ul>
      </div>
    </div>
  )
}

const Community = () => {
  return (
    <Wrapper>
      <div className="title">Meet the worldwide community.</div>
      <p className="decoration">We are supported by many people. Why don’t you join them?</p>
      <div className="main_container">
        <div className="main">
          {listCommunity.map((item: IItemListCommunity) => {
            return <CommunityItem item={item} />
          })}
        </div>
      </div>
    </Wrapper>
  )
}

const listCommunity = [
  {
    icon: '/images/twitter.svg',
    name: 'Twitter',
    des: 'Follow @xox to get the latest news and updates from across the ecosystem.',
  },
  {
    icon: '/images/telegram.svg',
    name: 'Telegram',
    des: 'Follow @xox to get the latest news and updates from across the ecosystem.',
  },
  {
    icon: '/images/facebook.svg',
    name: 'Facebook',
    des: 'Follow @xox to get the latest news and updates from across the ecosystem.',
  },
  {
    icon: '/images/discord.svg',
    name: 'Discord',
    des: 'Follow @xox to get the latest news and updates from across the ecosystem.',
  },
  {
    icon: '/images/youtube.svg',
    name: 'Youtube',
    des: 'Follow @xox to get the latest news and updates from across the ecosystem.',
  },
  {
    icon: '/images/tiktok.svg',
    name: 'Tiktok',
    des: 'Follow @xox to get the latest news and updates from across the ecosystem.',
  },
]

export default Community
