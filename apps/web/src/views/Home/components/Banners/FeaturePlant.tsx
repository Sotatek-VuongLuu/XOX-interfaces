/* eslint-disable react/no-unescaped-entities */
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  gap: 64px;
  margin-top: 100px;
`

const LeftContent = styled.div`
  .list {
    display: grid;
    grid-template-columns: 358px 241px;
    column-gap: 40px;
    row-gap: 16px;

    .icon_stone {
      margin-right: 16px;
    }

    p {
      display: flex;
    }
  }
  .title_list_item {
    font-weight: 400;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.87);
  }
`

const RightContent = styled.div``

const Title = styled.p`
  font-weight: 700;
  font-size: 36px;
  color: rgba(255, 255, 255, 0.87);
  font-weight: 400;
`

const Paragraph = styled.p`
  font-weight: 400;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.87);
  font-weight: 400;
  line-height: 32px;
`

const Watch = styled.div`
  width: 473px;
  height: 362px;
  background: #9072ff;
  border-radius: 24px;
`

const FeaturePlant = () => {
  return (
    <Wrapper>
      <LeftContent>
        <Title>XOX Dapp - An All-IN-One Solution.</Title>
        <Paragraph style={{ margin: '24px 0' }}>
          Primarily design to provide simple solutions to its users and XOX Holders, the XOX Dapp already provides and
          will keep implementing more robuts functionalities which will eventually make it a truly One Stop Solution for
          Crypto Traders. What's ready:
        </Paragraph>

        <div className="list">
          {listTag.map(({ title }) => {
            return (
              <p>
                <span>
                  <img src="/images/icon-stone.svg" alt="icon-stone" className="icon_stone" />
                </span>
                <span className="title_list_item">{title}</span>
              </p>
            )
          })}
        </div>
      </LeftContent>

      <RightContent>
        <Watch>
          <img src="/images/plant-img.svg" alt="" />
        </Watch>
      </RightContent>
    </Wrapper>
  )
}

const listTag = [
  {
    title: 'Multi Chain Hybrid Swap',
  },
  {
    title: 'XOXS Staking',
  },
  {
    title: 'Gamified Stable Coin Referral Program',
  },
  {
    title: 'Assets/Portfolio Tracker',
  },
  {
    title: 'Liquidity Farming',
  },
  {
    title: 'Bridge',
  },
]

export default FeaturePlant
