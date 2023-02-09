import styled from 'styled-components'

export const TitleChart = styled.div`
  display: flex;
  justify-content: space-between;

  .title_chart_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .btns {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .btn-get-token {
    padding: 1px;
    border-radius: 4px;
    background-image: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
    height: 37px;
    cursor: pointer;
    margin-right: 8px;

    .boxed-child {
      width: 100%;
      height: 100%;
      background-color: #242424;
      padding: 9px 40px;
      border-radius: inherit;
      span {
        background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        width: 100%;
        height: 100%;
        background-color: #191a28;
        border-radius: inherit;
      }
    }
  }

  .title_chart {
    font-weight: 700;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 8px;
  }

  .line {
    margin-bottom: 4px;
    width: 40px;
    height: 4px;
    background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
  }

  .btn_select_token {
    padding: 10px 20px;
    background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
    border-radius: 4px;
    font-weight: 700;
    font-size: 14px;
    color: #ffffff;
    border: none;
    cursor: pointer;
  }

  @media screen and (max-width: 900px) {
    .btn-get-token {
      padding: 1px;
      .boxed-child {
        padding: 9px 20px;
        span {
          font-size: 14px;
        }
      }
    }
  }

  @media screen and (min-width: 1921px) {
    .btn-get-token {
      padding: 2px;
    }
  }

  @media screen and (max-width: 530px) {
    .title_chart {
      font-size: 16px;
      line-height: 19px;
      margin-bottom: 0;
    }
    .btn_select_token {
      padding-left: 6px;
      padding-right: 6px;
    }
    .btn-get-token {
      .boxed-child {
        padding: 9px;
        span {
          font-size: 14px;
        }
      }
    }
  }
`

export const ChartContent = styled.div`
  margin-top: 32px;
  .container {
    margin-top: 24px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    width: 100%;
  }
  .token {
    font-weight: 700;
    font-size: 16px;
    color: #ffffff;
    display: flex;
    align-items: center;

    img,
    svg {
      margin-right: 10px;
    }
  }

  .liquidity {
    font-weight: 400;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.87);
    p:first-child {
      margin-bottom: 16px;
    }
  }

  .volume {
    font-weight: 400;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.87);
    p:first-child {
      margin-bottom: 16px;
    }
  }

  .filter {
    margin: 25px 0px;
    display: flex;
    justify-content: flex-start;
    button {
      font-weight: 700;
      font-size: 14px;
      margin-right: 8px;
      color: rgba(255, 255, 255, 0.6);
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;
    }
    @media (max-width: 576px) {
      button{
        padding: 0 5px;
      }
    }

    button.active {
      color: #9072ff;
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .filter {
      justify-content: flex-end;

      button {
        margin-left: 8px;
      }
    }
  }
`
