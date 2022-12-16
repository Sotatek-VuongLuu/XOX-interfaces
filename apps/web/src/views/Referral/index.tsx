import { Box, Grid } from '@mui/material'
import PageSection from 'components/PageSection'
import styled from 'styled-components'
import Banner from './components/Banner'
import MainInfo from './components/MainInfo'
import ReferralFriend from './components/ReferralFriend'

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
        <Box>
          <Banner />
          <MainInfo />
          <ReferralFriend />
        </Box>
      </Box>
    </>
  )
}
