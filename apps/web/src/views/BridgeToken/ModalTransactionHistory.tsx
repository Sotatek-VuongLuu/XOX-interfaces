import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import { ModalContainer, ModalHeader, InjectedModalProps } from '@pancakeswap/uikit'
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
  padding-bottom: 20px;

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
  margin-bottom: 15px;
`
interface IContentProps {
  isHistoryData?: boolean
}

const Content = styled.div<IContentProps>`
  padding: 0 24px;
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
  &:hover {
    text-decoration: underline;
    text-decoration-color: #9072ff;
  }
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
  const [tableOptions, _] = useState({
    current: 1,
    pageSize: 10,
    itemStart: 1,
    itemEnd: 10,
    totalPage: null,
  })

  const handleGetBridgeHistory = async () => {
    try {
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
        {historyData && historyData.length !== 0 ? (
          <TableContainer component={Paper} sx={{ height: '165px', background: '#242424', boxShadow: 'none' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead style={{ position: 'sticky', top: 0, zIndex: 1, background: '#242424' }}>
                <TableRow
                  sx={{
                    '& td, & th': {
                      borderBottom: '1px solid #444444',
                      fontWeight: 700,
                      fontSize: 14,
                      color: ' rgba(255, 255, 255, 0.6)',
                      padding: ' 0px 8px 8px 0px',
                    },
                  }}
                >
                  <TableCell style={{ minWidth: '50px' }}>No</TableCell>
                  <TableCell align="left" style={{ minWidth: '150px' }}>
                    Input Transaction
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: '150px' }}>
                    Input Amount
                  </TableCell>
                  <TableCell style={{ minWidth: '150px' }} align="left">
                    Output Transaction
                  </TableCell>
                  <TableCell style={{ minWidth: '150px' }} align="left">
                    Output Amount
                  </TableCell>
                  <TableCell style={{ minWidth: '100px' }} align="left">
                    Type
                  </TableCell>
                  <TableCell style={{ minWidth: '120px' }} align="left">
                    Status
                  </TableCell>
                  <TableCell style={{ minWidth: '150px' }} align="left" />
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
                      <TableCell component="th" scope="row" align="left">
                        {index + 1}
                      </TableCell>
                      <TableCell align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                        <TxHash href={row.txHash && `${linkTransaction(row.chainId)}${row.txHash}`} target="blank">
                          {row.txHash ? shortenAddress(row.txHash) : '........................'}
                        </TxHash>
                      </TableCell>
                      <TableCell align="left">
                        <div style={{ display: 'flex' }}>
                          <Tooltip title={row.amount} placement="top-start">
                            <span className="out_amount">{parseFloat(row.amount)}</span>
                          </Tooltip>
                          <span>XOX</span>
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <TxHash
                          href={
                            row.txSwapHash && `${linkTransaction(getChainIdToByChainId(row.chainId))}${row.txSwapHash}`
                          }
                          target="blank"
                        >
                          {row.txSwapHash ? shortenAddress(row.txSwapHash) : '........................'}
                        </TxHash>
                      </TableCell>
                      <TableCell align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Tooltip title={row.outAmount} placement="top-start">
                          <span className="out_amount">{parseFloat(row.outAmount)}</span>
                        </Tooltip>
                        <span>XOX</span>
                      </TableCell>
                      <TableCell align="left">{handleType(row.from, row.to, row.chainId)}</TableCell>
                      <TableCell align="left">
                        <div
                          style={
                            row.status === 'completed'
                              ? { color: '#6BB372' }
                              : row.status === 'rejected'
                              ? { color: '#F44336' }
                              : (row.status === 'processing' || row.status === 'excuting') && { color: '#FFBD3C' }
                          }
                        >
                          {row.status === 'processing' || row.status === 'excuting'
                            ? 'Processing'
                            : capitalizeFirstLetter(row.status)}
                        </div>
                      </TableCell>
                      <TableCell align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                        <span>{NETWORK_LABEL[row.chainId]}</span>
                        <span style={{ margin: '5px 10px 0px 10px' }}>
                          <img src="/images/arrow_bridge.svg" alt="arrow_bridge" />
                        </span>
                        <span>{NETWORK_LABEL[getChainIdToByChainId(row.chainId)]}</span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <NoData>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <img src="/images/nodata_bridge.svg" alt="nodata_bridge" />
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
              No Data
            </p>
          </NoData>
        )}
      </Content>
    </StyledModalContainer>
  )
}

export default ModalTransactionHistory
