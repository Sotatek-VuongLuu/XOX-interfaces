import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import { ModalContainer, ModalHeader, InjectedModalProps } from '@pancakeswap/uikit'
import { GridLoader } from 'react-spinners'
import { ColumnCenter } from 'components/Layout/Column'

import styled from 'styled-components'
import axios from 'axios'
import { useEffect, useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { NETWORK_LABEL, NETWORK_LINK } from './networks'
// eslint-disable-next-line import/no-cycle
import { getChainIdToByChainId } from '.'

const StyledModalContainer = styled(ModalContainer)`
  position: relative;
  min-width: 337px;
  /* padding-bottom: 20px; */
  background: #101010;

  padding: 32px 24px;

  border: 1px solid rgba(255, 255, 255, 0.1);

  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  z-index: 30 !important;

  .x-close-icon {
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
  }
`

const StyledModalHeader = styled(ModalHeader)`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  width: 100%;
  margin-bottom: 24px;
  padding: 0;
`
interface IContentProps {
  isHistoryData?: boolean
}

const Content = styled.div<IContentProps>`
  /* padding: 0 24px; */
  background: #101010;
  .out_amount {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100px;
    display: inline-block;
    margin-right: 2px;
  }
  div {
    ::-webkit-scrollbar-corner {
      display: none;
    }
  }
  @media screen and (min-width: 1400px) {
    overflow-x: ${({ isHistoryData }) => (isHistoryData ? 'hidden' : 'unset')};
  }
`

const NoData = styled.div``
const TxHash = styled.a`
  text-decoration: underline;
  text-decoration-color: #ffffff;
  &:hover {
  }
`

const StyledHeader = styled(TableCell)`
  font-size: 16px !important;

  @media (max-width: 576px) {
    font-size: 12px !important;
  }
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 14px 0 34px 0;
`

export const shortenAddress = (address = '', start = 8, chars = 4) => {
  return address ? `${address?.substring(0, start)}...${address?.substring(address.length - chars)}` : ``
}

export const linkTransaction = (chainId) => {
  return `${NETWORK_LINK[chainId]}/tx/`
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const ModalTransactionHistory: React.FC<React.PropsWithChildren<InjectedModalProps>> = ({ onDismiss }) => {
  const { account, chainId } = useActiveWeb3React()
  const [historyData, setHistoryData] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [tableOptions, _] = useState({
    current: 1,
    pageSize: 10,
    itemStart: 1,
    itemEnd: 10,
    totalPage: null,
  })

  const handleGetBridgeHistory = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BRIDGE_TOKEN}/history`, {
        params: {
          limit: tableOptions.pageSize,
          page: tableOptions.current,
          address: account,
          chainId,
        },
      })

      if (response?.status === 200) {
        setHistoryData(response?.data.data)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`error>>>`, error)
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line consistent-return
  const handleType = (from: string, to: string, chainIdSender: number) => {
    const fromAddress = from.toLowerCase()
    const toAddress = to.toLowerCase()
    const accountReal = account.toLowerCase()
    if (fromAddress === accountReal && chainId === chainIdSender) {
      return 'Sender'
      // eslint-disable-next-line no-else-return
    } else if (toAddress === accountReal && chainId !== chainIdSender) {
      return 'Receiver'
    }
  }

  useEffect(() => {
    if (!chainId || !account) return
    handleGetBridgeHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account])

  return (
    <StyledModalContainer>
      <StyledModalHeader>Bridge Token History</StyledModalHeader>
      <img
        src="/images/close-one.svg"
        alt="close-one"
        className="x-close-icon"
        onClick={onDismiss}
        aria-hidden="true"
      />
      <Content isHistoryData={historyData.length !== 0}>
        {loading ? (
          <ConfirmedIcon>
            <GridLoader color="#FB8618" style={{ width: '51px', height: '51px' }} />
          </ConfirmedIcon>
        ) : (
          <>
            {historyData && historyData.length !== 0 ? (
              <TableContainer component={Paper} sx={{ height: '165px', background: '#101010', boxShadow: 'none' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead
                    style={{
                      position: 'sticky',
                      top: 0,
                      zIndex: 1,
                      background: '#101010',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    <TableRow
                      sx={{
                        '& td, & th': {
                          border: 'none',
                          fontWeight: 700,
                          // fontSize: 14,
                          color: ' rgba(255, 255, 255, 0.6)',
                          padding: ' 0px 8px 8px 0px',
                        },
                      }}
                    >
                      <StyledHeader style={{ minWidth: '50px' }}>No</StyledHeader>
                      <StyledHeader align="left" style={{ minWidth: '170px' }}>
                        Input Transaction
                      </StyledHeader>
                      <StyledHeader align="left" style={{ minWidth: '150px' }}>
                        Input Amount
                      </StyledHeader>
                      <StyledHeader style={{ minWidth: '170px' }} align="left">
                        Output Transaction
                      </StyledHeader>
                      <StyledHeader style={{ minWidth: '170px' }} align="left">
                        Output Amount
                      </StyledHeader>
                      <StyledHeader style={{ minWidth: '100px' }} align="left">
                        Type
                      </StyledHeader>
                      <StyledHeader style={{ minWidth: '120px' }} align="left">
                        Status
                      </StyledHeader>
                      <StyledHeader style={{ minWidth: '150px' }} align="left" />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {historyData.map((row, index) => {
                      return (
                        <TableRow
                          // eslint-disable-next-line react/no-array-index-key
                          key={`${index}`}
                          sx={{
                            '& td, & th': {
                              border: 0,
                              fontWeight: 400,
                              fontSize: 16,
                              color: ' rgba(255, 255, 255, 0.87)',
                              padding: ' 0px 8px 8px 0px',
                            },
                          }}
                        >
                          <StyledHeader component="th" scope="row" align="left">
                            {index + 1}
                          </StyledHeader>
                          <StyledHeader align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                            <TxHash href={row.txHash && `${linkTransaction(row.chainId)}${row.txHash}`} target="blank">
                              {row.txHash ? shortenAddress(row.txHash) : '........................'}
                            </TxHash>
                          </StyledHeader>
                          <StyledHeader align="left">
                            <div style={{ display: 'flex' }}>
                              <Tooltip title={row.amount} placement="top-start">
                                <span className="out_amount">{parseFloat(row.amount)}</span>
                              </Tooltip>
                              <span>XOX</span>
                            </div>
                          </StyledHeader>
                          <StyledHeader align="left">
                            <TxHash
                              href={
                                row.txSwapHash &&
                                `${linkTransaction(getChainIdToByChainId(row.chainId))}${row.txSwapHash}`
                              }
                              target="blank"
                            >
                              {row.txSwapHash ? shortenAddress(row.txSwapHash) : '........................'}
                            </TxHash>
                          </StyledHeader>
                          <StyledHeader align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Tooltip title={row.outAmount} placement="top-start">
                              <span className="out_amount">{parseFloat(row.outAmount)}</span>
                            </Tooltip>
                            <span>XOX</span>
                          </StyledHeader>
                          <StyledHeader align="left">{handleType(row.from, row.to, row.chainId)}</StyledHeader>
                          <StyledHeader align="left">
                            <div
                              style={
                                row.status === 'completed'
                                  ? { color: '#64C66D' }
                                  : row.status === 'rejected'
                                  ? { color: '#F44336' }
                                  : (row.status === 'processing' || row.status === 'excuting') && { color: '#FFBD3C' }
                              }
                            >
                              {row.status === 'processing' || row.status === 'excuting'
                                ? 'Processing'
                                : capitalizeFirstLetter(row.status === 'completed' ? 'Success' : row.status)}
                            </div>
                          </StyledHeader>
                          <StyledHeader align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                            <span>{NETWORK_LABEL[row.chainId]}</span>
                            <span style={{ margin: '5px 10px 0px 10px' }}>
                              <img src="/images/bridge/arrow_bridge.svg" alt="bridge" />
                            </span>
                            <span>{NETWORK_LABEL[getChainIdToByChainId(row.chainId)]}</span>
                          </StyledHeader>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <NoData>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <img src="/images/nodata_history.png" alt="nodata" />
                </div>
                <p
                  style={{
                    textAlign: 'center',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginTop: '16px',
                  }}
                >
                  No transactions
                </p>
              </NoData>
            )}
          </>
        )}
      </Content>
    </StyledModalContainer>
  )
}

export default ModalTransactionHistory
