import styled from 'styled-components'

const Wrapper = styled.div`
  margin-bottom: 80px;
  .title {
    font-weight: 700;
    font-size: 36px;
    line-height: 44px;
    color: rgba(255, 255, 255, 0.87);
    text-align: center;
  }

  .description {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 16px;
    margin-bottom: 40px;
  }

  .img {
    text-align: center;
  }
`

const SecuredBy = () => {
  return (
    <Wrapper>
      <p className="title">Secured By</p>
      <p className="description">Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis.</p>

      <p className="img">
        <img src="/images/security.svg" alt="security" />
      </p>
    </Wrapper>
  )
}
export default SecuredBy
