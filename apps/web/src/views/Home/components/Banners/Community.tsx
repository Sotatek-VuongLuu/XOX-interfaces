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
      /* justify-content: space-between; */
      align-items: center;

      .icon-container {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background-image: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
        padding: 1px;
        cursor: pointer;
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
      cursor: pointer;
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
    <div className="item_container" data-aos="fade-up">
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
      <div className="title" data-aos="fade-up">
        Meet the worldwide community.
      </div>
      <p className="decoration" data-aos="fade-up" data-aos-duration="2300">
        We are supported by many people. Why don’t you join them?
      </p>
      <div className="main_container">
        <div className="main">
          {listCommunity.map((item: IItemListCommunity) => {
            return <CommunityItem item={item} key={item.name} />
          })}
        </div>
      </div>
    </Wrapper>
  )
}

const listCommunity = [
  {
    icon: '/images/pc_twitter.svg',
    name: 'Twitter',
    des: 'Follow @xox to get the latest news and updates from across the ecosystem.',
    iconMobile: '/images/twitter_mob.svg',
  },
  {
    icon: '/images/group_tele_pc.svg',
    name: 'Telegram Group',
    des: 'Ask general questions and chat with the worldwide community on Telegram.',
    iconMobile: '/images/group_tele_mb.svg',
  },
  {
    icon: '/images/pc_telegram.svg',
    name: 'Telegram Channel',
    des: 'Follow @xox to get the latest news and updates from across the ecosystem.',
    iconMobile: '/images/telegram_mb.svg',
  },
  {
    icon: '/images/pc_discord.svg',
    name: 'Discord',
    des: 'Ask general questions and chat with the worldwide community on Discord.',
    iconMobile: '/images/discord_mb.svg',
  },
  {
    icon: '/images/pc_youtube.svg',
    name: 'Youtube',
    des: 'Follow @xox to get the latest news and updates from across the ecosystem.',
    iconMobile: '/images/youtube_mb.svg',
  },
  {
    icon: '/images/pc_tiktok.svg',
    name: 'Tiktok',
    des: 'Follow @xox to get the latest news and updates from across the ecosystem.',
    iconMobile: '/images/tiktok_mb.svg',
  },
]

export default Community
