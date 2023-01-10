import {useState} from 'react';
import { Flex, Button, Text } from '@pancakeswap/uikit'
import { useAllTokens } from 'hooks/Tokens'
import styled from 'styled-components'
import InfoNav from "../Info/components/InfoNav"
import WithdrawTable from "./withdrawTable"
import TransactionTable from "./transactionTable"
import WidthdrawForm from "./widthdrawForm"

const TYPE = {
  default: 'DEFAULT',
  history: 'HISTORY',
  withdraw: 'WITHDRAW',
}

const Row = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  & .btn-back{
    cursor: pointer;
  }
  @media (max-width: 576px) {
    flex-direction: column;
  }
`

const Box = styled.div`
  padding: 17px 30px;
  border-radius: 10px;
  background: ${({theme}) => theme.colors.bgBox};
  flex: 1;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  img{
    max-width: 60px;
  }
  @media (max-width: 576px) {
    &.h-190{
      min-height: 193px;
    }
    img{
      max-width: 50px;
    }
    &.wrap-table{
      padding: 18px;
    }
  }
`

const Container = styled.div`
  padding: 0px 48px;
  margin-bottom: 24px;
  color: rgba(0,0,0,0.87);
  @media (max-width: 576px) {
    padding: 0px 24px;
  }
`

const WrapText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  p{
    margin-bottom: 0;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.87);
    &.number{
      color: ${({theme}) => theme.colors.violet};
      font-size: 36px;
      font-weight: 700;
    }
  }
  @media (max-width: 576px) {
    p{
      font-size: 16px;
      &.number{
        font-size: 24px;
      }
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
`

export default function StableCoin() {
  const [widthDraw, setWidthDraw] = useState(TYPE.default); 
  const allTokens = useAllTokens();
  return(
    <>
      <InfoNav allTokens={allTokens} textContentBanner="Earn BUSD/USDC from Your  XOXS" />
      <Container>
          {
           widthDraw === TYPE.withdraw &&
           <>
            <Flex alignItems="center" style={{gap: 10}}>
              <Flex onClick={() => setWidthDraw(TYPE.default)} style={{cursor: 'pointer', gap: 5}} alignItems="center"> 
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 11.9961H18" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 18L6 12L12 6" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <TextStyle>Stable coin</TextStyle>
              </Flex>
              <TextStyle style={{transform: 'translateY(1px)'}}>|</TextStyle>
              <TextStyle className='primary'>Withdraw reward</TextStyle>
            </Flex>
            <Row style={{marginTop: 25}}>
              <Box>
                <WidthdrawForm />
              </Box>
            </Row>
            </>
          }
          {
            widthDraw === TYPE.history &&
            <Flex alignItems="center" style={{gap: 10}}>
              <Flex onClick={() => setWidthDraw(TYPE.default)} style={{cursor: 'pointer', gap: 5}} alignItems="center"> 
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 11.9961H18" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 18L6 12L12 6" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <TextStyle>Stable coin</TextStyle>
              </Flex>
              <TextStyle>|</TextStyle>
              <TextStyle className='primary'>History</TextStyle>
            </Flex>
          }
          {
            widthDraw === TYPE.default && 
            <>
              <Row>
                <Box className='h-190'>
                  <Flex justifyContent="space-between" alignItems="center" width="100%">
                    <WrapText>
                      <p>Your current XOXS</p>
                      <p className='number'>23</p>
                      <Button height={37} style={{fontSize: 14}} onClick={() => setWidthDraw(TYPE.history)}>View your history</Button>
                    </WrapText>
                    <img src='/images/1/tokens/XOX.png' alt='icon' />
                  </Flex>
                </Box>
                <Box className='h-190'>
                  <Flex justifyContent="space-between" alignItems="center" width="100%" style={{marginBottom: 15}}>
                    <WrapText>
                      <p>BUSD earned</p>
                      <p className='number'>23</p>
                    </WrapText>
                    <img src='/images/1/tokens/BUSD.png' alt='icon' />
                  </Flex>
                  <Flex justifyContent="space-between" alignItems="center" width="100%">
                    <WrapText>
                      <p>USDC earned</p>
                      <p className='number'>23</p>
                    </WrapText>
                    <img src='/images/1/tokens/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.svg' alt='icon' />
                  </Flex>
                </Box>
                <Box className='h-190'>
                  <Flex justifyContent="space-between" alignItems="center" width="100%">
                    <WrapText>
                      <p>Your current reward</p>
                      <p className='number'>23</p>
                      <Button height={37} style={{fontSize: 14}} onClick={() => setWidthDraw(TYPE.withdraw)}>Withdraw reward</Button>
                    </WrapText>
                    <img src='/images/1/tokens/XOX.png' alt='icon' />
                  </Flex>
                </Box>
              </Row>
              <Row style={{marginTop: 24}}>
                <Box className='wrap-table'>
                  <WithdrawTable />
                </Box>
                <Box className='wrap-table'>
                  <TransactionTable />
                </Box>
              </Row>
            </>
        } 
      </Container>
    </>
  )
}