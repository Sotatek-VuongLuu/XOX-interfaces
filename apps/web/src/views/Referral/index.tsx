import { Box, Grid } from '@mui/material'
import PageSection from 'components/PageSection'
import styled from 'styled-components'
import Banner from './components/Banner'
import MainInfo from './components/MainInfo'

const StyledSection = styled(PageSection)`
  padding-top: 16px;
  padding: 0px 21px;

  ${({ theme }) => theme.mediaQueries.xxl} {
    padding: 0px 130px;
  }
`

export default function Refferal() {
  return (
    <>
      <Box padding="48px 130px">
        <Box height="100vh">
          <Banner />
          <MainInfo />
        </Box>
      </Box>
    </>
  )
}
