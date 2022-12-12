import styled from 'styled-components'

export const TitleChart = styled.div`
  display: flex;
  justify-content: space-between;

  .title_chart_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title_chart {
    font-weight: 700;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 8px;
  }

  .line {
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
`

export const ChartContent = styled.div`
  margin-top: 32px;
  .container {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    align-items: center;
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
    justify-content: space-between;
    span {
      font-weight: 700;
      font-size: 14px;
      margin-left: 24px;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
    }

    span.active {
      color: #9072ff;
    }
  }
`
