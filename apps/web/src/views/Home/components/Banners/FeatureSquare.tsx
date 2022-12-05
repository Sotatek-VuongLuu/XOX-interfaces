import styled from 'styled-components'
// eslint-disable-next-line import/no-cycle
import SquareItem from './SquareItems'

export interface ISquareItem {
  icon: string
  title: string
  description: string
  link: string
}
const Wrapper = styled.div`
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 48px;

    .heart {
      font-weight: 700;
      font-size: 36px;
      color: rgba(255, 255, 255, 0.87);
    }

    .describe {
      font-weight: 400;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);
      width: 409px;
      line-height: 19px;
    }
  }
`

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const FeatureSquare = () => {
  return (
    <Wrapper>
      <div className="title">
        <span className="heart">The Heart of the XOX Ecosystem</span>
        <span className="describe">
          Wide range of apps, utilities and solutions powering the protocol creating a True One-Stop Ecosystem for all
          your DeFi needs.
        </span>
      </div>

      <MainContainer>
        {listSquare.map((item: ISquareItem) => {
          return <SquareItem item={item} />
        })}
      </MainContainer>
    </Wrapper>
  )
}

const listSquare = [
  {
    icon: '/images/exchange.svg',
    title: 'Revolutionary Multichain DEX',
    description:
      'Not just swap for free, but also get dual cash back. Our multi-token ecosystem & revolutionary referral program is designed to reward you twice on every transaction you perform in our DEX, receiving...',
    link: '',
  },
  {
    icon: '/images/wallet.svg',
    title: 'Add liquidity & Earn rewards',
    description:
      'Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis. Morbi sed aliquet donec  facilisis. Senectus eget. Lorem ipsum dolor sit amet consectetur.',
    link: '',
  },
  {
    icon: '/images/refferal.svg',
    title: 'Referral Program',
    description:
      'Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis. Morbi sed aliquet donec  facilisis. Senectus eget. Lorem ipsum dolor sit amet consectetur.',
    link: '',
  },
]

export default FeatureSquare
