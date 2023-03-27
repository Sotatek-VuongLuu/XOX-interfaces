import useWindowSize from 'hooks/useWindowSize'
import styled from 'styled-components'

const BGLeft = styled.img`
  position: absolute;
  z-index: -1;
  left: 0;
  bottom: 10%;
`

const BGCubeLeft = styled.img`
  position: absolute;
  z-index: -1;
  left: 0;
  bottom: 17%;
  opacity: 0.3;
`

const BGRight = styled.img`
  position: absolute;
  z-index: -1;
  right: 0;
  top: 38%;
`

const BGCubeRight = styled.img`
  position: absolute;
  z-index: -1;
  right: 0;
  top: 48%;
  opacity: 0.3;
`

const BGXOXDapp = () => {
  const { width } = useWindowSize()
  return (
    <>
      {width > 900 ? (
        <>
          <BGLeft src="/images/home/bg-cubes/xoxdapp_left.svg" />
          <BGCubeLeft src="/images/home/bg-cubes/xoxdapp_cube_left.svg" />
          <BGRight src="/images/home/bg-cubes/xoxdapp_right.svg" />
          <BGCubeRight src="/images/home/bg-cubes/xoxdapp_cube_right.svg" />
        </>
      ) : (
        <>
          {/* <BGMobile src="/images/bg_mobile.svg" alt="bg_mobile" /> */}
        </>
      )}
    </>
  )
}

export default BGXOXDapp
