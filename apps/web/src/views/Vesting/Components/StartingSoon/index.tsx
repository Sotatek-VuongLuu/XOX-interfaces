import React from 'react'
import styled from 'styled-components'
import CountDown from '../CountDown'

const Wrapper = styled.div`
  padding: 24px;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  position: relative;
  .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.075em;
    text-transform: uppercase;
    text-align: center;
    color: rgba(255, 255, 255, 0.87);
  }
  .notice {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
    margin-top: 12px;
    margin-bottom: 47px;
  }

  .percent_sale {
    text-align: center;
    margin-top: 27px;
    margin-bottom: 16px;
  }

  .percent_sale {
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.87);
  }

  .processing {
    height: 10px;
    width: 100%;
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    box-shadow: 0px 4px 20px rgba(255, 112, 31, 0.5);
    border-radius: 20px;
  }

  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 2px solid #ffffff30;
    border-left: 2px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 2px;
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
    border-bottom: 2px solid #ffffff30;
    border-right: 2px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }
`

function StartingSoon() {
  return (
    <Wrapper>
      <div className="corner1" />
      <div className="edge1" />
      <div className="corner2" />
      <div className="edge2" />
      <p className="title">XOX Token Private Sale Starting Soon</p>
      <p className="notice">Sale 1 will start on mm/dd/yyyy.</p>
      <CountDown startTime={1679257779000} />
      <p className="percent_sale">57.13% SOLD</p>
      <div className="processing" />
    </Wrapper>
  )
}

export default StartingSoon
