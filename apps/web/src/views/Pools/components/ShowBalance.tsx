import { Tooltip } from '@mui/material'
import { formatToShowBalance } from './utils/formatBalance'

interface IProps {
  balance: string | number
  unit?: string
  name?: string
  notSpace?: boolean
}

export const ShowBalance = ({ balance, unit = '', name = 'default', notSpace = false }: IProps) => {
  const data = String(balance)
  return (
    <>
      {Number(balance) <= 0.000001 ? (
        name === 'liquidity' ? (
          <Tooltip title={balance ? `$${balance}` : null} placement="top-start">
            <span className="liquidity value">${balance ? '0.000000...' : 0}</span>
          </Tooltip>
        ) : (
          <Tooltip
            title={balance ? (!notSpace ? `${balance} ${unit}` : `${balance}${unit}`) : null}
            placement="top-start"
          >
            <p style={{ display: 'flex' }}>
              <span className="value">{balance ? '0.000000...' : 0}</span>
              {!notSpace && <span>&nbsp;</span>}
              <span className="value">{unit}</span>
            </p>
          </Tooltip>
        )
      ) : data.length <= 10 ? (
        <>
          <p style={{ display: 'flex' }}>
            <span className="value">
              {balance ? formatToShowBalance(String(balance)) : `${name === 'liquidity' ? '$0' : '0'}`}
            </span>
            {!notSpace && <span>&nbsp;</span>}
            <span className="value">{unit}</span>
          </p>
        </>
      ) : name === 'liquidity' ? (
        <Tooltip title={balance ? `$${balance}` : null} placement="top-start">
          <span className="liquidity value">${balance ? formatToShowBalance(String(balance)) : '0'}</span>
        </Tooltip>
      ) : (
        <Tooltip
          title={balance ? (!notSpace ? `${balance} ${unit}` : `${balance}${unit}`) : null}
          placement="top-start"
        >
          <p style={{ display: 'flex' }}>
            <span className="value">{balance ? formatToShowBalance(String(balance)) : '0'}</span>
            {!notSpace && <span>&nbsp;</span>}
            <span className="value">{unit}</span>
          </p>
        </Tooltip>
      )}
    </>
  )
}

export default ShowBalance
