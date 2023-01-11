import React from 'react';
import styled from 'styled-components'
import { Flex, Button, Text, Select, Dropdown } from '@pancakeswap/uikit'

const WrapForm = styled.div`
  padding: 60px 0;
  width: 450px;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media(max-width: 576px){
    >div{
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
    padding: 0;
  }
`
const TextStyle = styled(Text)`
  font-size: 14px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.6);
  line-height: 20px;
  &.primary{
    color: ${({theme}) => theme.colors.violet}
  }
  &.color-white{
    color: rgba(255, 255, 255, 0.87);
  }
`

const BoxRight = styled.div`
  width: calc(100% - 120px);
  min-height: 44px;
  position: relative;
  input{
    width: 100%;
    height: 100%;
    border: 1px solid #444;
    background: none;
    border-radius: 6px;
    padding: 0 15px;
    height: 44px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.87);
    padding-right: 80px;
    &:focus{
      outline: none;
    }
  }
  &.wrap-select{
    >div{
      height: 44px;
      >div:nth-child(1){
        height: 44px;
      }
    }
  }
  @media(max-width: 576px){
    width: 100%;
    min-height: inherit;
  }
`

const InputFill = styled.div`
  padding: 0 15px;
  border: 1px solid #444;
  border-radius: 6px;
  height: 44px;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.87);
  &.dropdown{
    cursor: pointer;
    +div{
      width: 100%;
      padding: 0;
      transform: translate(0);
      left: 0;
      background: ${({theme}) => theme.colors.backgroundAlt};
      border: 1px solid ${({theme}) => theme.colors.cardBorder};
    }
  }
  & .icon-dropdown{
    position: absolute;
    right: 10px;
  }
  img{
    max-width: 20px !important;
    margin-right: 10px;
  }
`
const MenuItem = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  color: ${({theme}) => theme.colors.text};
  padding: 0 20px;
  font-size: 16px;
  img{
    max-width: 20px !important;
    margin-right: 10px;
  }
  &:hover{
    background: ${({theme}) => theme.colors.tertiary};
    cursor: pointer;
  }
`

const ButtonRight = styled(Button)`
  position: absolute;
  right: 15px;
  top: 9px;
`

export default function WidthdrawForm() {

  const handleChangeNetwork = () => {
    console.log("handle change network");
  }

  return (
    <WrapForm>
      <Flex justifyContent="space-between" alignItems="center">
        <TextStyle>Network</TextStyle>
        <BoxRight className='wrap-select'>
          <Dropdown position="bottom" target={
            <InputFill className='dropdown'>
                <img src="/images/chains/1.png" alt="icon" />  Rinkey
                <span className='icon-dropdown'>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.8542 1.625L6.10425 6.375L1.35425 1.625" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
              </span>
            </InputFill>
          }>
            <MenuItem><img src="/images/chains/56.png" alt="icon" />BSC Testnet</MenuItem>
            <MenuItem><img src="/images/chains/1.png" alt="icon" />Rinkey</MenuItem>
          </Dropdown>
        </BoxRight>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <TextStyle>Interest</TextStyle>
        <BoxRight> 
          <InputFill>
            <img src="/images/1/tokens/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.svg" alt='icon' /> USDC
          </InputFill>
        </BoxRight>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <TextStyle>Available</TextStyle>
        <BoxRight>
          <Flex alignItems="center" height={44}>
            <TextStyle className='color-white'>100.98 USDC</TextStyle>
          </Flex>
        </BoxRight>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <TextStyle>Amount</TextStyle>
        <BoxRight>
          <input placeholder='0.00' />
          <ButtonRight width={43} height={27} style={{fontSize: 12}}>All</ButtonRight>
        </BoxRight>
      </Flex>
      <Flex justifyContent="end">
        <Button width={140} height={43}>Withdraw</Button>
      </Flex>
    </WrapForm>
  )
}