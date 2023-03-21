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
      display: flex;
      /* justify-content: space-between; */
      align-items: center;
      background: rgba(16, 16, 16, 0.3);
      backdrop-filter: blur(10px);
      border-radius: 20px;

      .icon-container {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background: linear-gradient(95.32deg, #B809B5 -7.25%, #ED1C51 54.2%, #FFB000 113.13%);
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
        background: rgba(16, 16, 16, 1);
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
        color: rgba(255, 255, 255, 0.6);
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
    color: #FB8618;
    margin-bottom: 48px;
  }

  .subscription-form-container {
    .subscription-form {
      width: 100%;
      max-width: 680px;
      background: #1D1C1C;
      display: flex;
      align-items: center;
      border-radius: 12px;
      padding: 6px;
      justify-content: center;
  
      input {
        background: transparent;
        flex: 1;
        border: 0;
        outline: none;
        padding: 12px 16px 12px 8px;
        font-size: 18px;
        line-height: 22px;
        color: rgba(255, 255, 255, 0.38);
  
      }
  
      button {
        border: 0;
        border-raidus: 50%;
        width: 60px
        height: 60px;
        cursor: pointer;
        background: #1D1C1C;
  
        img {
          width: 25px;
        }
      }
  
      .email-icon {
        width: 25px;
        margin-left: 16px;
      }
    }
  }

  .subtitle {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 48px;
  }

  .privacy-link {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.87);
    span {
      up-icon {
        &:hover {
          -webkit-transition: 0.5s ease;
          transition: 0.5s ease;
          left: 6px;
          bottom: 5px;
        }
      }
    }
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

      {/* <div className="title" data-aos="fade-up">
        Subscribe to the XOX Labs Newsletter
      </div>
      <p className="subtitle" data-aos="fade-up" data-aos-duration="2300">
        Unsubscribe at any time. <a className="privacy-link" href="javascript:void(0)">Privacy policy 
                                  <span className="up-icon" style={{ marginLeft: 6}}>
                                    <svg
                                      width="10"
                                      height="11"
                                      viewBox="0 0 10 11"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M2.5 8L7.5 3" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                      <path
                                        d="M3.4375 3H7.5V7.0625"
                                        stroke="white"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    </span>
                                  </a>
      </p>
      <div className="main_container">
        <div className="subscription-form-container">
          <form action="/api/form" method="post" className="subscription-form">
            <img src="/images/home/subscription/email.svg" alt="email" className="email-icon" />
            <input type="text" id="email" name="email" placeholder="Your email" required />
            <button type="submit"><img src="/images/home/subscription/forward_arrow.svg" alt="forward_arrow" /></button>
          </form>
        </div>
      </div> */}
    
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
    icon: '/images/pc_tiktok.svg',
    name: 'Tiktok',
    des: 'Follow @xox to get the latest news and updates from across the ecosystem.',
    iconMobile: '/images/tiktok_mb.svg',
  },
  {
    icon: '/images/pc_telegram.svg',
    name: 'Telegram Channel',
    des: 'Follow @xox to get the latest news and updates from across the ecosystem.',
    iconMobile: '/images/telegram_mb.svg',
  },
  {
    icon: '/images/pc_youtube.svg',
    name: 'Youtube',
    des: 'Follow @xox to get the latest news and updates from across the ecosystem.',
    iconMobile: '/images/youtube_mb.svg',
  },
  {
    icon: '/images/pc_discord.svg',
    name: 'Discord',
    des: 'Ask general questions and chat with the worldwide community on Discord.',
    iconMobile: '/images/discord_mb.svg',
  },
]

export default Community
