import { Flex, Button } from '@pancakeswap/uikit'
import { useAllTokens } from 'hooks/Tokens'
import styled from 'styled-components'
import InfoNav from "../Info/components/InfoNav"
import WithdrawTable from "./withdrawTable"
import TransactionTable from "./transactionTable"

const Row = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
`

const Box = styled.div`
  padding: 17px 30px;
  border-radius: 10px;
  background: ${({theme}) => theme.colors.bgBox};
  flex: 1;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`

const Container = styled.div`
  padding: 0px 48px;
  margin-bottom: 24px;
  color: 'rgba(0,0,0,0.87)';
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
`

export default function StableCoin() {
  const allTokens = useAllTokens()
  return(
    <>
      <InfoNav allTokens={allTokens} textContentBanner="Earn BUSD/USDC from Your XOXS" />
      <Container>
        <Row>
          <Box>
            <Flex justifyContent="space-between" alignItems="center" width="100%">
              <WrapText>
                <p>Your current XOXS</p>
                <p className='number'>23</p>
              </WrapText>
              <img src='/images/chains/5.png' alt='icon' />
            </Flex>
          </Box>
          <Box>
            <Flex justifyContent="space-between" alignItems="center" width="100%" style={{marginBottom: 15}}>
              <WrapText>
                <p>BUSD earned</p>
                <p className='number'>23</p>
              </WrapText>
              <img width={60} src='/images/1/tokens/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.svg' alt='icon' />
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" width="100%">
              <WrapText>
                <p>USDC earned</p>
                <p className='number'>23</p>
              </WrapText>
              <img width={60} src='/images/1/tokens/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599.svg' alt='icon' />
            </Flex>
          </Box>
          <Box>
            <Flex justifyContent="space-between" alignItems="center" width="100%">
              <WrapText>
                <p>Your current reward</p>
                <p className='number'>23</p>
                <Button height={37} style={{fontSize: 14}}>Withdraw reward</Button>
              </WrapText>
              <img src='/images/chains/5.png' alt='icon' />
            </Flex>
          </Box>
        </Row>
        <Row style={{marginTop: 24}}>
          <Box>
            <WithdrawTable />
          </Box>
          <Box>
            <TransactionTable />
          </Box>
        </Row>
      </Container>
    </>
  )
}