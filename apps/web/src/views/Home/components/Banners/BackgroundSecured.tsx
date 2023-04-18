import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'

const BGLeft = styled.img`
  position: absolute;
  z-index: -1;
  left: 0;
  top: 15%;
  opacity: 0.3;
`
const BGMobileLeft = styled.img`
  position: absolute;
  z-index: -1;
  left: 0;
  top: 454px;
  opacity: 0.8;
`

const BGSecured = () => {
  const { width } = useWindowSize()
  return (
    <>
      {width > 900 ? (
        <>
          <BGLeft src="/images/home/bg-cubes/secured_left.svg" />
        </>
      ) : (
        <>
          <BGMobileLeft src="/images/home/bg-cubes/secured_mobile_left.svg" />
        </>
      )}
    </>
  )
}

export default BGSecured
