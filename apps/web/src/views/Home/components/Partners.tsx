import styled from 'styled-components'

const Wrapper = styled.div`
  .main {
    display: flex;
    justify-content: center;
  }

  .title {
    text-align: center;
    font-weight: 700;
    font-size: 36px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 16px;
  }

  .decoration {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 48px;
  }
`

const Partners = () => {
  return (
    <Wrapper>
      <div className="title">Strategic Partners</div>
      <p className="decoration">Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis.</p>
      <div className="main">
        <img src="/images/partner.svg" alt="partner" />
      </div>
    </Wrapper>
  )
}

export default Partners
