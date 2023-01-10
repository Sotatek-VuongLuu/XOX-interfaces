import React from 'react';
import styled from 'styled-components'
import { Flex, Button, Text, Select } from '@pancakeswap/uikit'

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
      gap: 5px;
    }
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
`

const ButtonRight = styled(Button)`
  position: absolute;
  right: 15px;
  top: 9px;
`

export default function WidthdrawForm() {

  const handleChangeNetwork = () => {
    console.log("aaa");
  }

  return (
    <WrapForm>
      <Flex justifyContent="space-between" alignItems="center">
        <TextStyle>Network</TextStyle>
        <BoxRight className='wrap-select'>
          <Select
            options={[
              {
                label: 'BSC',
                value: 'hot',
              },
              {
                label: 'Rinkey',
                value: 'apr',
              }
            ]}
            onOptionChange={handleChangeNetwork}
          />
        </BoxRight>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <TextStyle>Interest</TextStyle>
        <BoxRight>
          <InputFill>
          {/* <img src="" /> */}
          USDC
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