/* eslint-disable no-useless-escape */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { useTranslation } from '@pancakeswap/localization'
import useWindowSize from 'hooks/useWindowSize'
import { useState } from 'react'
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
    color: #fb8618;
    margin-bottom: 48px;
  }

  .subscription-form-container {
    display: flex;
    justify-content: center;

    .subscription-box {
      width: 100%;
      max-width: 680px;

      .subscription-form {
        background: #1D1C1C;
        display: flex;
        align-items: center;
        border-radius: 12px;
        padding: 6px;
        justify-content: center;
        border: unset;
        margin-bottom: 8px;
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
            -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
            -webkit-transition-delay: 9999s;
        }
  
        input {
          background: transparent;
          flex: 1;
          border: 0;
          outline: none;
          padding: 12px 16px 12px 8px;
          font-size: 18px;
          line-height: 22px;
          color: rgba(255, 255, 255, 0.38);
          width: 100%;
    
          &:hover {
            .subscription-form {
              border: 1px solid #FB8618;
            }
          }
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

      .hover-form {
        border: 2px solid #FB8618;
      }
  
      .error {
        border: 2px solid #FF5353;
  
        .text-error {
          p {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            color: #F44336;
          }
        }
      }

      .hidden-text {
        display: none;
      }

      .text-error {
        display: block;

        p {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 17px;
          color: #F44336;
        }
      }

      .hover-button {
        svg {
          path {
            stroke: #FB8618;
          }
        }
      }
    }
  }

  .subtitle {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 48px;

    @media screen and (max-width: 576px) {
      font-size: 14px;
    }
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
      .subscription-box 
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

            margin-right: 6px;
          }
      
          .email-icon {
            width: 19px;
            margin-left: 6px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 399px) {
    .subscription-form-container {
      display: flex;
      justify-content: center;
  
      .subscription-box {
        .subscription-form {
          input {
            padding: 7.5px 0px 7.5px 8px;
            font-size: 16px;
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
    }

    .subtitle {
      font-size: 14px;
    }
  }
`

const Subscription = () => {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState<string>('')
  const [emailValid, setEmailValid] = useState(true)
  const [emailBorderClass, setEmailBorderClass] = useState<string>('')
  const [btnHoverClass, setBtnHoverClass] = useState<string>('')
  const [emailErrorClass, setEmailErrorClass] = useState<string>('')
  const [textErrorClass, setTextErrorClass] = useState<string>('')

  const handleChange = (event) => {
    const email = event.target.value
    const isValid = validateEmail(email)
    setInputValue(email)
    setEmailValid(isValid)

    if (!isValid) {
      setEmailErrorClass(' error')
      setTextErrorClass(' text-error')
      setEmailBorderClass('')
    } else {
      setTextErrorClass('')
      setEmailErrorClass('')
      setEmailBorderClass(' hover-form')
    }
  }

  const validateEmail = (email) => {
    const reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email)
  }

  const handleMouseOut = (event) => { 
    setEmailBorderClass('')
    setBtnHoverClass('')
    if (inputValue.length == 0) {
      setTextErrorClass('')
      setEmailErrorClass('')
    }
  }

  const handleMouseOver = (event) => {
    setEmailBorderClass(' hover-form')
    setBtnHoverClass(' hover-button')
  }

  return (
    <Wrapper>
      <div className="title" data-aos="fade-up">
        {t('Subscribe to the XOX Labs Newsletter')}
      </div>
      <p className="subtitle" data-aos="fade-up" data-aos-duration="2300">
        {t('Unsubscribe at any time.')}{' '}
        <a className="privacy-link" href="javascript:void(0)">
          {t('Privacy policy')}
          <span className="up-icon" style={{ marginLeft: 6 }}>
            <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 8L7.5 3" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3.4375 3H7.5V7.0625" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      </p>
      <div className="subscription-form-container">
        <div className="subscription-box">
          <form action="#" method="post" className={'subscription-form ' + emailBorderClass + emailErrorClass}>
            <img src="/images/home/subscription/email.svg" alt="email" className="email-icon" />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Your email"
              required
              value={inputValue}
              onChange={handleChange}
              onMouseOut={handleMouseOut}
              onMouseOver={handleMouseOver}
            />
            <button type="submit" className={'btn-submit ' + btnHoverClass}>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.75 15.3066H24.25"
                  stroke="#515151"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.5 6.55664L24.25 15.3066L15.5 24.0566"
                  stroke="#515151"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
          <span className={'hidden-text' + textErrorClass}>
            <p>Invalid email address</p>
          </span>
        </div>
      </div>
    </Wrapper>
  )
}

export default Subscription
