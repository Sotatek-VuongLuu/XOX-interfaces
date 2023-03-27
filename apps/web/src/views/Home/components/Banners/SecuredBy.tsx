import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-bottom: 24px;
  margin-top: 32px;
  .title {
    font-weight: 700;
    font-size: 36px;
    line-height: 44px;
    color: rgba(255, 255, 255, 0.87);
    text-align: center;

    @media screen and (max-width: 900px) {
      font-size: 20px;
      margin-top: 36px;
    }
  }

  .description {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #FB8618;
    margin-top: 16px;
    margin-bottom: 40px;

    @media screen and (max-width: 900px) {
      font-size: 14px;
    }
  }

  .img {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 70px;
    margin-bottom: 100px;

    img {
      cursor: pointer;
      @media screen and (max-width: 900px) {
        max-height: 27px;
        width: auto;
      }
    }

    @media screen and (max-width: 900px) {
      gap: 16px;
    }
  }
`

const SecuredBy = () => {
  const { width } = useWindowSize()

  return (
    <Wrapper>
      <p className="title" data-aos="fade-up">
        Secured By
      </p>
      <p className="description" data-aos="fade-up" data-aos-duration="2300">
        XOX has Industry Leading Security. Protected By The Best.
      </p>

      <p className="img">
        {width < 900 ? (
          <>
            <img src="/images/airbnb.svg" alt="security" data-aos="fade-right" />
            <img src="/images/hubspot.svg" alt="security" data-aos="fade-down" />
            <img src="/images/google.svg" alt="security" data-aos="fade-left" />
          </>
        ) : (
          <>
            <img src="/images/airbnb.svg" alt="security" style={{ cursor: 'pointer' }} data-aos="fade-right" />
            <img src="/images/hubspot.svg" alt="security" data-aos="fade-down" />
            <img src="/images/google.svg" alt="security" data-aos="fade-left" />
          </>
        )}
      </p>
    </Wrapper>
  )
}
export default SecuredBy
