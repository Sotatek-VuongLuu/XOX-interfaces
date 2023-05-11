import { useTranslation } from '@pancakeswap/localization'
import { InjectedModalProps, ModalBody, ModalContainer, ModalHeader } from '@pancakeswap/uikit'
import { Content } from './styled'
import { roundingAmountNumber } from '@pancakeswap/utils/formatBalance'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

interface ModalNotificationIprops extends InjectedModalProps {
  dataClaim: { point: number; dollar: number }
  totalUnClaimed: string | number
}

const ModalNotification = ({ onDismiss, dataClaim }: ModalNotificationIprops) => {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()

  return (
    <ModalContainer>
      <ModalHeader>
        <p>{t('Claim')}</p>
      </ModalHeader>
      <ModalBody>
        <Content>
          <div className="discription">
            <p className="value">
              {t('Withdraw Amount')} <span>${roundingAmountNumber(Number(dataClaim.dollar))}</span>
            </p>
            <p className="value">
              {t('You will receive:')}{' '}
              <span>
                ${roundingAmountNumber(Number(dataClaim.dollar) * 0.99)} $
                {chainId === 5 || chainId === 1 ? 'USDC' : 'USDT'}
              </span>
            </p>
            <p className="value">
              {t('Platform Fee:')}{' '}
              <span>
                ${roundingAmountNumber(Number(dataClaim.dollar) - Number(dataClaim.dollar) * 0.99)} $
                {chainId === 5 || chainId === 1 ? 'USDC' : 'USDT'}
              </span>{' '}
            </p>
          </div>
          <div className="btn-group">
            <button className="cancel" type="button" onClick={() => onDismiss()}>
              {t('Cancel')}
            </button>
            <button
              className="confirm"
              type="button"
              onClick={() => {
                // handleClaimLevel(level)
              }}
            >
              {t('Confirm')}
            </button>
          </div>
        </Content>
      </ModalBody>
    </ModalContainer>
  )
}

export default ModalNotification
