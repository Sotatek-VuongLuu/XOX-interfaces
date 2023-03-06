import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin-bottom: 24px;

  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 2px solid #ffffff30;
    border-left: 2px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    left: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: 1;
    border-bottom: 2px solid #ffffff30;
    border-right: 2px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 2px;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: 1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .title {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.075em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.87);
    text-align: center;
    padding-top: 23px;
    margin-bottom: 50px;
  }
  .content_stat {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    color: white;
    align-items: center;
    .item_content_container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 48px;

      .divide_0,
      .divide_1,
      .divide_2 {
        position: absolute;
        right: 0;
        width: 1px;
        height: 100%;
        background: rgba(255, 255, 255, 0.38);
      }

      .item_content_amount {
        font-weight: 700;
        font-size: 36px;
        line-height: 44px;
        color: rgba(255, 255, 255, 0.87);
        position: relative;

        .icon {
          font-weight: 700;
          position: absolute;
          font-size: 18px;
          line-height: 22px;
          color: rgba(255, 255, 255, 0.6);
          left: -13px;
        }
      }

      .item_content_title {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: rgba(255, 255, 255, 0.6);
        margin-top: 12px;
      }
    }
  }
`

interface IProps {
  dataStat: any
}

function SaleStats({ dataStat }: IProps) {
  return (
    <Wrapper>
      <div className="corner1" />
      <div className="edge1" />
      <div className="corner2" />
      <div className="edge2" />
      <p className="title">Sale Stats</p>
      <div className="content_stat">
        {Array.from(dataStat).map((item: any, index: number) => {
          return (
            <div className="item_content_container">
              <p className="item_content_amount">
                <span className="icon">{item?.icon}</span>
                <span>{item.amount}</span>
              </p>
              <p className="item_content_title">{item.title}</p>
              <div className={`divide divide_${index}`} />
            </div>
          )
        })}
      </div>
    </Wrapper>
  )
}

export default SaleStats
