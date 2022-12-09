import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'

interface IItemListCommunity {
  icon: string
  name: string
  des: string
  iconMobile?: string
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
    grid-template-columns: 1fr 1fr;
    column-gap: 48px;
    row-gap: 40px;

    .item_container {
      padding: 24px 32px;
      background: #242424;
      border-radius: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

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
        line-height: 24px;
      }
    }

    @media screen and (max-width: 900px) {
      column-gap: 24px;
      row-gap: 23px;

      .item_container {
        padding: 24px 14px;
        .icon-container {
          width: 60px;
          height: 60px;
        }

        .name_mobile {
          font-weight: 700;
          font-size: 14px;
          line-height: 17px;
          color: #ffffff;
        }
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

  @media screen and (max-width: 900px) {
    .title {
      font-size: 20px;
    }

    .decoration {
      font-size: 14px;
    }

    .wrapper_mobile {
      width: 100%;
      .name_mobile {
        text-align: center;
        margin-top: 16px;
      }
      .icon-container_moblie {
        justify-content: center;
        display: flex;
      }
    }
  }
`

const CommunityItem = ({ item }: Iprops) => {
  const { width } = useWindowSize()
  return (
    <div className="item_container">
      <div className="wrapper_mobile">
        <div className="icon-container_moblie">
          <div className="icon-container">
            <div className="icon">
              <div className="overlay">
                <img src={width < 900 ? item.iconMobile : item.icon} alt="icon" />
              </div>
            </div>
          </div>
        </div>
        {width < 900 && <div className="name_mobile">{item.name}</div>}
      </div>
      {width > 900 && (
        <div style={{ marginLeft: 24 }}>
          <p className="name">{item.name}</p>
          <ul>
            <li className="des">{item.des}</li>
          </ul>
        </div>
      )}
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
    iconMobile: '/images/twitter_mobile.svg',
  },
  {
    icon: '/images/telegram.svg',
    name: 'Telegram Group',
    des: 'Follow @xox to get the latest news and updates from across the ecosystem.',
    iconMobile: '/images/telegram_mobile.svg',
  },
  {
    icon: '/images/telegram.svg',
    name: 'Telegram Channel',
    des: 'Follow @xox to get the latest news and updates from across the ecosystem.',
    iconMobile: '/images/telegram_mobile.svg',
  },
  {
    icon: '/images/discord.svg',
    name: 'Discord',
    des: 'Follow @xox to get the latest news and updates from across the ecosystem.',
    iconMobile: '/images/discord_mobile.svg',
  },
  {
    icon: '/images/youtube.svg',
    name: 'Youtube',
    des: 'Follow @xox to get the latest news and updates from across the ecosystem.',
    iconMobile: '/images/youtube_mobile.svg',
  },
  {
    icon: '/images/tiktok.svg',
    name: 'Tiktok',
    des: 'Follow @xox to get the latest news and updates from across the ecosystem.',
    iconMobile: '/images/tiktok_mobile.svg',
  },
]

export default Community
