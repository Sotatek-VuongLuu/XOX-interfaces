import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-bottom: 43px;
  .title {
    font-weight: 700;
    font-size: 36px;
    line-height: 44px;
    color: rgba(255, 255, 255, 0.87);
    text-align: center;

    @media screen and (max-width: 900px) {
      font-size: 20px;
    }
  }

  .description {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 16px;
    margin-bottom: 40px;

    @media screen and (max-width: 900px) {
      font-size: 14px;
    }
  }

  .img {
    text-align: center;
  }
`

const SecuredBy = () => {
  const { width } = useWindowSize()
  return (
    <Wrapper>
      <p className="title">Secured By</p>
      <p className="description">XOX has Industry Leading Security. Protected By The Best.</p>

      <p className="img">
        {width < 9000 ? (
          <img src="/images/security_mobile.svg" alt="security" />
        ) : (
          <img src="/images/security.svg" alt="security" />
        )}
      </p>
    </Wrapper>
  )
}
export default SecuredBy
