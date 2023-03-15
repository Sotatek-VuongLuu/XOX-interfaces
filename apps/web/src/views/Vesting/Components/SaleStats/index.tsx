import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  border-radius: 20px;
  margin-bottom: 24px;

  background-image: url('/images/ngu.png');
  background-repeat: no-repeat;
  height: 276px;
  background-size: contain;
  position: relative;

  .fake_blur {
    position: absolute;
    height: 194px;
    backdrop-filter: blur(10px);
    z-index: -1;
    bottom: 27px;
    left: 1px;
    right: 2px;
    border-radius: 20px !important;
  }
  #trapezoid {
    border-top: 53px solid transparent;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    background: transparent;
    height: 0;
    width: 166px;
    position: absolute;
    left: 50%;
    backdrop-filter: blur(10px);
    z-index: -1;
    top: 2px;
    border-radius: 25px;
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

      @media screen and (max-width: 900px) {
        & {
          margin-bottom: 0px;
        }
        .divide_0,
        .divide_1,
        .divide_2 {
          position: absolute;
          right: 0;
          width: 1px;
          height: 100%;
          background: none;
        }
      }
    }

    @media screen and (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }

  @media screen and (max-width: 900px) {
    height: 470px;
    background-image: url('/images/dadsad.png');
    background-size: 100% 470px;

    .title {
      font-size: 16px;
      margin-bottom: 40px;
      line-height: 24px;
      padding-top: 13px;
    }

    .fake_blur {
      position: absolute;
      bottom: 0;
      height: 428px;
    }
  }
`

interface IProps {
  dataStat: any
}

function SaleStats({ dataStat }: IProps) {
  return (
    <Wrapper>
      <div className="fake_blur" />
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