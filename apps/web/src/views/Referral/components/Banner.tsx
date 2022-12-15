import { Box, Grid } from '@mui/material'
import styled from 'styled-components'

const WrapperLeft = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
  background: linear-gradient(27.06deg, #4919d0 13.81%, #9a56f9 136.8%);
  border-radius: 10px;

  .title {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: rgba(255, 255, 255, 0.87);
  }

  .description {
    margin-top: 16px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.6);
  }
`

const WrapperRight = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
  border-radius: 10px;
  padding: 24px;

  .my_code {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: rgba(255, 255, 255, 0.87);
  }

  .code {
    padding: 16px;
    margin-top: 16px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .code_number {
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #ffffff;
      }
    }
  }
`

const Banner = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <WrapperLeft>
            <p className="title">Invite Your Friends. Earn Money Together.</p>

            <p className="description">
              Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua
              dolor do amet sint. Velit officia consequat duis enim velit mollit.
            </p>
          </WrapperLeft>
        </Grid>
        <Grid item xs={12} md={4}>
          <WrapperRight>
            <p className="my_code">My Referral Code</p>
            <div className="code">
              <div className="content">
                <span className="code_number">1234</span>
                <span>
                  <img src="/images/CopySimple.svg" alt="CopySimple" />
                </span>
              </div>
            </div>
          </WrapperRight>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Banner