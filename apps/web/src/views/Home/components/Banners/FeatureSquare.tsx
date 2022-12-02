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
  display: flex;
  justify-content: space-between;
`

const FeatureSquare = () => {
  return (
    <Wrapper>
      {listSquare.map((item: ISquareItem) => {
        return <SquareItem item={item} />
      })}
    </Wrapper>
  )
}

const listSquare = [
  {
    icon: '/images/exchange.svg',
    title: 'Swap & Stake automatically',
    description:
      'Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis. Morbi sed aliquet donec  facilisis. Senectus eget. Lorem ipsum dolor sit amet consectetur.',
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
