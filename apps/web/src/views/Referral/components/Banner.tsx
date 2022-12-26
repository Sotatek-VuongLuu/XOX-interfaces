import { Box, Grid, useMediaQuery } from '@mui/material'
import { useTranslation } from '@pancakeswap/localization'
import { CopyAddress, CopyButton, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useWindowSize from 'hooks/useWindowSize'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
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
    font-size: 20px;
    line-height: 32px;
    color: rgba(255, 255, 255, 0.6);
  }

  @media screen and (max-width: 900px) {
    padding: 22px;

    .title {
      font-size: 18px;
      line-height: 24px;
    }
    .description {
      font-weight: 400;
      font-size: 16px;
    }
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

  @media screen and (max-width: 900px) {
    padding: 22px;

    .my_code {
      font-size: 18px;
      line-height: 22px;
    }
    .code {
      padding: 12px;
      .content {
        .code_number {
          font-size: 16px;
          line-height: 19px;
        }
      }
    }
  }
`

const Banner = () => {
  const { isMobile } = useMatchBreakpoints()
  const { width } = useWindowSize()
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()

  const userProfile = useSelector<AppState, AppState['user']['userProfile']>((state) => state.user.userProfile)
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <WrapperLeft>
            <p className="title">Invite Your Friends. Earn Money Together.</p>

            <p className="description">
              Start Earning passive/active income with the XOX Multi-Chain Gamified Referral Program.
            </p>
          </WrapperLeft>
        </Grid>

        <Grid item xs={12} md={4}>
          <WrapperRight>
            <p className="my_code">My Referral Code</p>
            <div className="code">
              <div className="content">
                {account && (
                  <>
                    <span className="code_number">{userProfile?.referralCode}</span>
                    <span>
                      {width <= 900 ? (
                        <img src="/images/CopySimple_mb.svg" alt="CopySimple" />
                      ) : (
                        <CopyButton
                          width="24px"
                          text={userProfile?.referralCode}
                          tooltipMessage={t('Copied')}
                          button={<img src="/images/CopySimple.svg" alt="CopySimple" />}
                        />
                      )}
                    </span>
                  </>
                )}
              </div>
            </div>
          </WrapperRight>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Banner
