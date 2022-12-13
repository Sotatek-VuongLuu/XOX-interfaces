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
  top: 10%;
`

const BGXOX = styled.img`
  position: absolute;
  z-index: -2;
  right: 0;
  top: 23%;
`

const BGPartner = () => {
  const { width } = useWindowSize()
  return (
    <>
      <BGLeft src="/images/pl.svg" />
      <BGRight src="/images/pr.svg" />

      {/* <img src="/images/xox_mobile.svg" alt="xox_mobile" /> */}

      {width > 900 && <BGXOX src="/images/xox_1.svg" />}
    </>
  )
}

export default BGPartner
