import { Box, Grid } from '@mui/material'
import { useTranslation } from '@pancakeswap/localization'
import { CopyButton } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import styled from 'styled-components'

const WrapperLeft = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
  background: rgba(16, 16, 16, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  position: relative;

  .corner1 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: -1;
    border-bottom: 2px solid #ffffff30;
    border-left: 2px solid #ffffff30;
    border-bottom-right-radius: unset;
    border-top-left-radius: unset;
  }

  .edge1 {
    width: 2px;
    height: calc(100% - 70px);
    position: absolute;
    bottom: 50px;
    left: 0;
    z-index: -1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

  .corner2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50px;
    border-radius: 20px;
    z-index: -1;
    border-bottom: 2px solid #ffffff30;
    border-right: 2px solid #ffffff30;
    border-bottom-left-radius: unset;
    border-top-right-radius: unset;
  }

  .edge2 {
    width: 2px;
    height: calc(100% - 70px);
    position: absolute;
    bottom: 50px;
    right: 0;
    z-index: -1;
    background: linear-gradient(0deg, #ffffff30 0%, #ffffff00 100%);
  }

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
      line-height: 26px;
      font-size: 16px;
    }
  }
`

const WrapperRight = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 1px;
  background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
  backdrop-filter: blur(4px);
  .content_referral {
    width: 100%;
    height: 100%;
    background: #0d0d0d;
    border-radius: 20px;
    padding: 24px;
  }
  .my_code {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: rgba(255, 255, 255, 0.87);
  }

  .code {
    padding: 16px;
    margin-top: 16px;
    background: #1d1c1c;
    border-radius: 8px;
    .content_code_number {
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
    padding: 1px;

    .my_code {
      font-size: 18px;
      line-height: 22px;
    }
    .code {
      padding: 12px;
      .content_code_number {
        .code_number {
          font-size: 16px;
          line-height: 19px;
        }
      }
    }
  }
`

const Banner = () => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()

  const userProfile = useSelector<AppState, AppState['user']['userProfile']>((state) => state.user.userProfile)
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <WrapperLeft>
            <div className="corner1" />
            <div className="edge1" />
            <div className="corner2" />
            <div className="edge2" />
            <p className="title">Invite Your Friends. Earn Together</p>
            <p className="description">
              Start Earning passive/active income with the XOX Multi-Chain Gamified Referral Program.
            </p>
          </WrapperLeft>
        </Grid>

        <Grid item xs={12} lg={4}>
          <WrapperRight>
            <div className="content_referral">
              <p className="my_code">My Referral Code</p>
              <div className="code">
                <div className="content_code_number">
                  {account && (
                    <>
                      <span className="code_number">{userProfile?.referralCode}</span>
                      <span>
                        <CopyButton
                          width="24px"
                          text={userProfile?.referralCode}
                          tooltipMessage={t('Copied')}
                          button={<img src="/images/CopySimple.svg" alt="CopySimple" />}
                        />
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </WrapperRight>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Banner
