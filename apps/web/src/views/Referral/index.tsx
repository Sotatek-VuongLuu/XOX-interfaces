import { Box, Grid } from '@mui/material'
import PageSection from 'components/PageSection'
import styled from 'styled-components'
import Banner from './components/Banner'
import MainInfo from './components/MainInfo'
import ReferralFriend from './components/ReferralFriend'

const Wrapper = styled(Box)`
  padding: 48px;

  @media screen and (max-width: 900px) {
    padding: 48px 24px;
  }
`

export default function Refferal() {
  return (
    <>
      <Wrapper>
        <Box>
          <Banner />
          <MainInfo />
          <ReferralFriend />
        </Box>
      </Wrapper>
    </>
  )
}
