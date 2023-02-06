import { Tooltip } from '@mui/material'
import { formatToShowBalance } from './utils/formatBalance'

interface IProps {
  balance: string | number
  unit?: string
  name?: string
}

export const ShowBalance = ({ balance, unit = '', name = 'default' }: IProps) => {
  const data = String(balance)
  return (
    <>
      {data.length <= 10 ? (
        <>
          <p style={{ display: 'flex' }}>
            <span className="value">
              {balance ? formatToShowBalance(String(balance)) : `${name === 'liquidity' ? '$0' : '0'}`}
            </span>
            &nbsp;
            <span className="value">{unit}</span>
          </p>
        </>
      ) : name === 'liquidity' ? (
        <Tooltip title={balance ? `$${balance}` : null} placement="top-start">
          <span className="liquidity value">${balance ? formatToShowBalance(String(balance)) : '0'}</span>
        </Tooltip>
      ) : (
        <Tooltip title={balance ? `${balance} ${unit}` : null} placement="top-start">
          <p style={{ display: 'flex' }}>
            <span className="value">{balance ? formatToShowBalance(String(balance)) : '0'}</span>&nbsp;
            <span className="value">{unit}</span>
          </p>
        </Tooltip>
      )}
    </>
  )
}

export default ShowBalance
