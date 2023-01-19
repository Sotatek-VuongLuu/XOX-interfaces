import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'

const BGLeft = styled.img`
  position: absolute;
  z-index: -1;
  left: 0;
  top: 42%;
`

const BGRight = styled.img`
  position: absolute;
  z-index: -1;
  right: 0;
  top: 600px;
  background: radial-gradient(50% 50% at 50% 50%, rgba(143, 0, 255, 0.3) 0%, rgba(82, 0, 255, 0) 100%);
`

const BGXOX = styled.img`
  position: absolute;
  z-index: -1;
  right: 0;
  top: 30%;
  mix-blend-mode: multiply;
`

const BGXOXMobile = styled.img`
  position: absolute;
  z-index: -2;
  right: 0;
  top: 18.1%;
  mix-blend-mode: multiply;
`

const BGMobile = styled.img`
  position: absolute;
  z-index: -2;
  right: 0;
  top: 17.6%;
  background: radial-gradient(50% 50% at 50% 50%, rgba(143, 0, 255, 0.3) 0%, rgba(82, 0, 255, 0) 100%);
`

const BGMobileTow = styled.img`
  position: absolute;
  z-index: -2;
  left: 0;
  top: 55%;
  background: radial-gradient(50% 50% at 50% 50%, rgba(143, 0, 255, 0.3) 0%, rgba(82, 0, 255, 0) 100%);
`

const BGPartner = () => {
  const { width } = useWindowSize()
  return (
    <>
      {width > 900 ? (
        <>
          <BGLeft src="/images/pl.svg" />
          <BGRight src="/images/pr.svg" />
          <BGXOX src="/images/xoxs_secured.svg" />
        </>
      ) : (
        <>
          <BGMobile src="/images/bg_mobile.svg" alt="bg_mobile" />
          <BGXOXMobile src="/images/xox_mobile_change.svg" alt="xox_mobile" />
          <BGMobileTow src="/images/bg_mobile_2.svg" alt="bg_mobile" />
        </>
      )}
    </>
  )
}

export default BGPartner
