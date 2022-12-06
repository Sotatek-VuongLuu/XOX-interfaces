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
  return (
    <>
      <BGLeft src="/images/pl.svg" />
      <BGRight src="/images/pr.svg" />
      <BGXOX src="/images/xox_1.svg" />
    </>
  )
}

export default BGPartner
