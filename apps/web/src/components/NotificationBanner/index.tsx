import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import BannerCloseX from './components/BannerCloseX'

const Container = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  padding: 24px;
  align-items: center;
  background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);

  > .svg {
    position: absolute;
    right: 7px;
    top: 7px;
    cursor: pointer;
  }

  button {
    border: none;
    background: transparent;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 0px;
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);

    > .svg {
      right: 17px;
      top: 7px;
    }
  }
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: fit-content;
  justify-content: center;
  margin: auto;
  align-items: center;

  > span {
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);
  }

  > span:nth-child(1) {
    font-weight: 700;
    text-align: center;
  }

  > span:nth-child(2) {
    text-align: center;
    margin-bottom: 24px;
    font-size: 14px;
    line-height: 17px;
  }

  > a {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    padding: 10px 20px;
    color: #ffffff;
    border: 1px solid #ffffff;
    border-radius: 8px;
    margin-left: 0px;

    &:hover {
      background: #ffffff;
      color: #000000;
      border: 1px solid #000000;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    > span {
      font-size: 17px;
      line-height: 21px;
    }
    > a {
      margin-left: 24px;
    }

    > span:nth-child(2) {
      margin-bottom: 0px;
      font-size: 17px;
      line-height: 21px;
    }
  }
`

interface INotiBanner {
  title?: string
  description?: string
  btnText?: string
  href?: string
  onRemove?: (id: number) => void
  id: number
}

function NotificationBanner({ title, description, btnText = 'Participate', href = '#', onRemove, id }: INotiBanner) {
  const { t } = useTranslation()

  return (
    <Container>
      <InnerContainer>
        <span>{t(title)}&nbsp;</span>
        <span>{t(description)}</span>
        <a href={href}>{t(btnText)}</a>
      </InnerContainer>
      <span aria-hidden="true" onClick={() => onRemove && onRemove(id)} className="svg">
        <BannerCloseX />
      </span>
    </Container>
  )
}

export default NotificationBanner
