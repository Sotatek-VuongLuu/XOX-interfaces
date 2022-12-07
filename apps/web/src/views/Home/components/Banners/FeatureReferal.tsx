/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 64px;
  margin-top: 100px;

  .leader_board {
    width: 689px;
    height: 529px;
    background: linear-gradient(100.7deg, rgba(96, 52, 255, 0.1) 0%, rgba(163, 90, 255, 0.1) 100%);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid #a35aff;
    padding: 32px;
  }

  .title_ref {
    font-weight: 700;
    font-size: 36px;
    color: rgba(255, 255, 255, 0.87);
  }

  .ref_container {
    width: 40%;
  }

  .list {
    margin-bottom: 24px;
    display: grid;
    grid-template-columns: 200px 200px;
    column-gap: 40px;
    row-gap: 16px;

    .icon_stone {
      margin-right: 16px;
    }

    p {
      display: flex;
      align-items: center;
    }
  }
  .title_list_item {
    font-weight: 400;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.87);
  }

  .btn_join {
    padding: 16px 40px;
    font-weight: 700;
    font-size: 18px;
    color: #ffffff;
    border: none;
    background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
    border-radius: 8px;
  }
`

const Paragraph = styled.p`
  font-weight: 400;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.87);
  font-weight: 400;
  line-height: 32px;
  margin: 24px 0px;
`

const FeatureReferal = () => {
  return (
    <Wrapper>
      {/* <div className="leader_board">!</div> */}

      <div>
        <img src="/images/leader_board.svg" alt="leader_board" />
      </div>
      <div className="ref_container">
        <p className="title_ref">Gamified Referral Program</p>
        <Paragraph className="description">
          Built to give back, the XOX Gamified Referral Program rewards both "The Referee" & "The Referrer" Earn Points
          that's are redeemable for BUSD/USDC after reaching different levels & milestones.
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

        <button className="btn_join">Join Now</button>
      </div>
    </Wrapper>
  )
}

const listTag = [
  {
    title: 'Connect',
  },
  {
    title: 'Refer',
  },
  {
    title: 'Earn Points',
  },
  {
    title: 'Level Up',
  },
  {
    title: 'Claim',
  },
  {
    title: 'Get BUSD/USDC',
  },
]

export default FeatureReferal
