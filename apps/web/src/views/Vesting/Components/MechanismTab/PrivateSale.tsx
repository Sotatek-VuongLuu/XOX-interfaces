import styled from 'styled-components'

const Wrapper = styled.div``

const Content = styled.div`
  .title {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 20px;
  }
  .description {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.87);

    p:nth-child(odd) {
      margin-bottom: 20px;
      font-weight: 700;
    }
    p:nth-child(2) {
      margin-bottom: 20px;
    }
  }
`

function PrivateSale() {
  return (
    <Wrapper>
      <Content>
        <div className="title">Sale mechanism:</div>
        <div className="description">
          <p>A description of the sale mechanism:</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
          <p>Benefit of each sale: </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </div>
      </Content>
    </Wrapper>
  )
}

export default PrivateSale
