import styled from 'styled-components'
import BannerCloseX from './components/BannerCloseX'

const Container = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  padding: 8px;
  align-items: center;
  background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 0px;
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
  }

  > .svg {
    position: absolute;
    right: 17px;
    top: 7px;
    cursor: pointer;
  }

  button {
    border: none;
    background: transparent;
  }
`

const InnerContainer = styled.div`
  display: flex;
  height: 100%;
  width: fit-content;
  margin: auto;
  align-items: center;

  > span {
    font-size: 17px;
    line-height: 21px;
    color: rgba(255, 255, 255, 0.87);
  }

  > span:nth-child(1) {
    font-weight: 700;
  }

  > a {
    > button {
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      padding: 10px 20px;
      color: #ffffff;
      border: 1px solid #ffffff;
      border-radius: 8px;
      margin-left: 24px;
    }
  }
`

interface INotiBanner {
  title?: string
  description?: string
  btnText?: string
  href?: string
  onRemove: (id: number) => void
  id: number
}

function NotificationBanner({ title, description, btnText = 'Participate', href = '#', onRemove, id }: INotiBanner) {
  return (
    <Container>
      <InnerContainer>
        <span>{title}</span> &nbsp;
        <span>{description}</span>
        <a href={href}>
          <button type="button">{btnText}</button>
        </a>
      </InnerContainer>
      <span aria-hidden="true" onClick={() => onRemove(id)} className="svg">
        <BannerCloseX />
      </span>
    </Container>
  )
}

export default NotificationBanner
