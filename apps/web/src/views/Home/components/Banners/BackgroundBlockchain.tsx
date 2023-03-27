import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'

const BGLeft = styled.img`
  position: absolute;
  z-index: -1;
  left: 0;
  top: 10%;
`

const BGRight = styled.img`
  position: absolute;
  z-index: -1;
  right: 0;
  top: 3%;
`

const BGBlockchain = () => {
  const { width } = useWindowSize()
  return (
    <>
      {width > 900 ? (
        <>
          <BGLeft src="/images/home/bg-cubes/xoxdapp_left.svg" />
          <BGRight src="/images/home/bg-cubes/xoxdapp_right.svg" />
        </>
      ) : (
        <>
          {/* <BGMobile src="/images/bg_mobile.svg" alt="bg_mobile" /> */}
        </>
      )}
    </>
  )
}

export default BGBlockchain
