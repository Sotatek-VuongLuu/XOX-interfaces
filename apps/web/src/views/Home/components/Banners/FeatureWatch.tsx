import { Box, Grid } from '@mui/material'
import styled from 'styled-components'

const LeftContent = styled.div``

const RightContent = styled.div`
  .list {
    .main_content {
      display: flex;
      margin-bottom: 16px;
      align-items: center;
      .img-container {
        min-width: 23px;
      }
    }
  }

  .title_list_item {
    font-weight: 400;
    font-size: 18px;
    margin-left: 16px;
    color: rgba(255, 255, 255, 0.87);
    line-height: 32px;
    @media screen and (max-width: 900px) {
      font-size: 16px;
      line-height: 19px;
    }
  }
`

const Title = styled.p`
  font-weight: 700;
  font-size: 36px;
  line-height: 48px;
  color: rgba(255, 255, 255, 0.87);

  @media screen and (max-width: 900px) {
    font-size: 20px;
    line-height: 32px;
  }
`

const Paragraph = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: rgba(255, 255, 255, 0.87);

  @media screen and (max-width: 900px) {
    font-size: 16px;
    line-height: 24px;
  }
`

const FeatureWatch = () => {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <LeftContent></LeftContent>
        </Grid>
        <Grid item xs={12} md={5}>
          <RightContent>
            <Title>Meet XOXS. Our Hybrid Multichain Stable Coin.</Title>
            <Paragraph style={{ margin: '24px 0' }}>
              Designed to be the staking substitute to our governance token XOX, preventing Supply Inflation & Selling
              Pressure XOXS is the result of months studding how staking works, chart behavior to high APYs followed by
              high selling pressure from stakers and Passive Income strategies generated by implementing Stable Coins
              Like BUSD, USDC .... Some Facts About XOXS:
            </Paragraph>

            <div className="list">
              {listTag.map(({ title }) => {
                return (
                  <div className="main_content">
                    <div className="img-container">
                      <img src="/images/icon-stone.svg" alt="icon-stone" className="icon_stone" />
                    </div>
                    <span className="title_list_item">{title}</span>
                  </div>
                )
              })}
            </div>
          </RightContent>
        </Grid>
      </Grid>
    </Box>
  )
}

const listTag = [
  {
    title: 'Only acquired by First Buying the governance token XOX then XOXS is received as a bonus. (no extra cost)',
  },
  {
    title: 'Auto staking functionality with a minimum 8% APY',
  },
  {
    title: 'Earned through giveaways, finishing tasks, community activities etc',
  },
  {
    title:
      'Allow users to earn passive income through staking with no risk neither to the holders or the project long term sustainability.',
  },
]

export default FeatureWatch
