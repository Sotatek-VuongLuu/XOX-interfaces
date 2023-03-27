import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 100px;
  margin-bottom: 70px;

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
    display: flex;
    justify-content: center;

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
        width: 60px;
        height: 60px;
        cursor: pointer;
        background: #1D1C1C;
  
        img {
          width: 30px;
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
    text-decoration: underline;
    &:hover {
      -webkit-transition: 0.5s ease;
      transition: 0.5s ease;
      left: 6px;
      bottom: 5px;
    }
  }

  @media screen and (max-width: 900px) {
    .title {
      font-size: 20px;
    }

    .decoration {
      font-size: 14px;
    }
  }

  @media screen and (max-width: 576px) {
    .subscription-form-container {
      .subscription-form {
        padding: 6px;
    
        input {
          padding: 7.5px 0px 7.5px 8px;
          font-size: 16px;
          line-height: 22px;
        }
    
        button {
          width: 32px;
          height: 32px;
          img {
            width: 28px;
          }
        }
    
        .email-icon {
          width: 19px;
          margin-left: 6px;
        }
      }
    }
  }

  @media screen and (max-width: 399px) {
    .subscription-form-container {
      display: flex;
      justify-content: center;
  
      .subscription-form {
        input {
          padding: 7.5px 0px 7.5px 8px;
          font-size: 14px;
        }
    
        button {
          border: 0;
          width: 32px;
          height: 32px;
          cursor: pointer;
          background: #1D1C1C;
    
          img {
            width: 32px;
          }
        }
    
        .email-icon {
          width: 16px;
          margin-left: 4px;
        }
      }
    }

    .subtitle {
      font-size: 14px;
    }
  }
`

const Subscription = () => {
  return (
    <Wrapper>
      <div className="title" data-aos="fade-up">
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
      <div className="subscription-form-container">
        <form action="/api/form" method="post" className="subscription-form">
          <img src="/images/home/subscription/email.svg" alt="email" className="email-icon" />
          <input type="text" id="email" name="email" placeholder="Your email" required />
          <button type="submit"><img src="/images/home/subscription/forward_arrow.svg" alt="forward_arrow" /></button>
        </form>
      </div>
    
    </Wrapper>
  )
}

export default Subscription
