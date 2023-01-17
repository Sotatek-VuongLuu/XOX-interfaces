/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState, useCallback} from 'react';
import styled from 'styled-components'
import { Flex, Button, Text, Select, Dropdown , useToast, useModal } from '@pancakeswap/uikit'
import { NetworkSwitcher } from 'components/NetworkSwitcher'
import { useWeb3React } from '@pancakeswap/wagmi'
import { ChainId } from '@pancakeswap/sdk'
import { useTreasuryXOX } from 'hooks/useContract'
import { getDecimalAmount } from '@pancakeswap/utils/formatBalance'
import BigNumber from "bignumber.js";
import { calculateGasMargin } from 'utils';
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { TransactionResponse } from '@ethersproject/providers'
import { addTransaction } from 'state/transactions/actions';
import TransactionConfirmationModal, {
  TransactionErrorContent,
} from 'components/TransactionConfirmationModal'
import { ToastDescriptionWithTx } from 'components/Toast'
import ConfirmSwapModal from '../Swap/components/ConfirmSwapModal'

const WrapForm = styled.div`
  padding: 60px 0;
  width: 450px;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  &.error{
    color: #F44336;
    font-weight: 400;
    padding-left: 120px;
  }
  @media(max-width: 576px){
    &.error{
      padding-left: 0;
    }
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
        margin: 0;
      }
      >div>div{
        width: 100%;
        justify-content: flex-start;
        >div{
          padding-right: 50px;
          width: 100%;
          +div{
            max-width: 330px;
            padding-right: 0;
          }
          svg{
            position: absolute;
            right: 0;
          }
        }
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
  &.no-border{
    border: none;
    padding: 0;
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

const WidthdrawForm = ({priceAvailable, onSuccess} : {priceAvailable?: number | string, onSuccess?: any}) => {
  const [withdrawErrorMessage, setWithdrawErrorMessage] = useState('');
  const [pending, setPending] = useState(false);
  const { account, chainId } = useWeb3React();
  const contractTreasuryXOX = useTreasuryXOX();
  const isBUSD = (chainId === ChainId.BSC || chainId === ChainId.BSC_TESTNET);
  const [keyInput, setKeyInput] = useState(Math.random());
  const [amount, setAmount] = useState<any>();
  const [error, setError] = useState<any>();
  const {callWithGasPrice} = useCallWithGasPrice();
  const { toastError, toastSuccess } = useToast();
  const symbol = 'BUSD';
  const [txHas, setTxHas] = useState('');

  const handleSucess = (response: any) => {
    setTimeout(() => {
      setPending(false);
      setTxHas(response?.hash);
      setWithdrawErrorMessage('');
      addTransaction(response);
      toastSuccess('Withdraw sucess', <ToastDescriptionWithTx txHash={response?.hash} txChainId={response?.chainId} />)
    }, 2000);
  }

  const handleWidthdraw = async() => {
    const fullDecimalWithdrawAmount = getDecimalAmount(new BigNumber(amount), 18);
    const estimatedGas:any = await contractTreasuryXOX.estimateGas.claimFarmingReward(fullDecimalWithdrawAmount.toString()).catch((err) => {
      console.log(err);
    });

    onPresentConfirmModal();
    setPending(true);
    return callWithGasPrice(
      contractTreasuryXOX,
      'claimFarmingReward',
      [fullDecimalWithdrawAmount.toString()],
      {
        gasLimit: calculateGasMargin(estimatedGas),
      },
    ).then((response: any) => {
      handleSucess(response);
    }).catch((error: any) => {
      setTxHas('');
      setWithdrawErrorMessage('Transaction rejected.');
      setPending(false);
      if (error?.code === 'ACTION_REJECTED') {
        return
      }
      if (error?.code !== 4001) {
        toastError('Error', error.message);
      }
      // throw error
    })
  }

  const confirmationContent = useCallback(
    () =>
      withdrawErrorMessage ? (
        <>
          <TransactionErrorContent message={withdrawErrorMessage} />
        </>
      ) : (
        <></>
      ),
    [withdrawErrorMessage],
  )

  const [onPresentConfirmModal] = useModal(
    <TransactionConfirmationModal
      title="Confirm Withdraw"
      content={confirmationContent}
      pendingText={`Withdraw ${amount} ${isBUSD ? 'BUSD' : 'USDC'}`}
      attemptingTxn={pending}
      hash={txHas}
      iconGridLoader
    />,
    true,
    true,
    'transactionConfirmationModal',
  )

  return (
    <WrapForm>
      <Flex justifyContent="space-between" alignItems="center">
        <TextStyle>Network</TextStyle>
        <BoxRight className='wrap-select'>
          <NetworkSwitcher removeTxtHeader />
        </BoxRight>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <TextStyle>Interest</TextStyle>
        <BoxRight> 
          <InputFill className='no-border'>
            {isBUSD ? <img src="/images/1/tokens/BUSD.png" alt='icon' /> : <img src="/images/1/tokens/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48.svg" alt='icon' />}
            {isBUSD ? 'BUSD' : 'USDC'}
          </InputFill>
        </BoxRight>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <TextStyle>Available</TextStyle>
        <BoxRight>
          <Flex alignItems="center" height={44}>
            <TextStyle className='color-white'>{priceAvailable} {isBUSD ? 'BUSD' : 'USDC'}</TextStyle>
          </Flex>
        </BoxRight>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <TextStyle>Amount</TextStyle>
        <BoxRight>
          <input type="number" key={keyInput} defaultValue={amount} placeholder='0.00' onChange={(e:any) => {
            setAmount(e?.target?.value);
            if(parseFloat(e?.target?.value) > priceAvailable){
              setError('Insufficient balance');
            }else{
              setError('');
            }
          }} />
          <ButtonRight width={43} height={27} style={{fontSize: 12}} onClick={() => {
            setAmount(priceAvailable);
            setKeyInput(Math.random());
            setError('')
          }}>All</ButtonRight>
        </BoxRight>
      </Flex>
      {
        error && <TextStyle className='error'>{error}</TextStyle>
      }
      <Flex justifyContent="end">
        <Button width={140} height={43} disabled={error || !amount} onClick={handleWidthdraw}>Withdraw</Button>
      </Flex>
    </WrapForm>
  )
}
export default WidthdrawForm