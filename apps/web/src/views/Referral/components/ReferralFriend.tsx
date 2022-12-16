import {
  Avatar,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const WrapperLeft = styled(Box)`
  padding: 24px;
  background: #242424;
  border-radius: 10px;

  .title {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.87);
  }
`

const WrapperRight = styled(Box)`
  .item {
    background: #242424;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .shadow {
      width: 110px;
      height: 17px;
      background: radial-gradient(50% 50% at 50% 50%, #000000 0%, rgba(48, 48, 48, 0) 100%);
    }

    .title {
      font-weight: 700;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      color: rgba(255, 255, 255, 0.87);
    }

    .btn {
      background: transparent;
      border: none;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: rgba(255, 255, 255, 0.38);
    }
  }
`

const ReferralFriend = () => {
  function createData(avatar: string, name: string, point: number, code: number) {
    return { avatar, name, point, code }
  }

  const rows = [
    createData(
      'https://ss-images.saostar.vn/wwebp700/pc/1668184763837/saostar-zniwtnewidjz7yhb.jpg',
      'Ha Anh Tuan',
      100,
      10293,
    ),
  ]

  return (
    <Box sx={{ marginTop: '16px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <WrapperLeft>
            <p className="title">Referral friends</p>

            <TableContainer component={Paper} sx={{ height: 190, background: 'transparent', boxShadow: 'unset' }}>
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead>
                  <TableRow
                    sx={{
                      '& td, & th': {
                        borderBottom: '1px solid #444444',
                        fontWeight: 700,
                        fontSize: 14,
                        color: ' rgba(255, 255, 255, 0.6)',
                      },
                    }}
                  >
                    <TableCell>User Name</TableCell>
                    <TableCell align="left">Referral Code</TableCell>
                    <TableCell align="right">Total Points</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        '& td, & th': {
                          border: 0,
                          fontWeight: 400,
                          fontSize: 14,
                          color: ' rgba(255, 255, 255, 0.87)',
                          lineHeight: '14px',
                        },
                      }}
                    >
                      <TableCell align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          alt="Remy Sharp"
                          src={row.avatar}
                          sx={{ marginRight: '8px', height: '24px', width: '24px' }}
                        />
                        {row.name}
                      </TableCell>
                      <TableCell align="left">
                        {row.code}
                        <img
                          src="/images/copy_purple.svg"
                          alt="copy_purple"
                          style={{ marginBottom: '-2px', marginLeft: '8px' }}
                        />
                      </TableCell>
                      <TableCell align="right">{row.point} points</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </WrapperLeft>
        </Grid>
        <Grid item xs={12} md={7}>
          <WrapperRight sx={{ marginTop: '16px' }}>
            <Swiper spaceBetween={50} slidesPerView={4}>
              {Array.from(listLever).map((item, index) => {
                return (
                  <SwiperSlide>
                    <div className="item" key={item.icon}>
                      <img src={item.icon} alt="icons" className="jewellery" />

                      <div className="shadow" />

                      <p className="title">{item.point}</p>
                      <button type="button" className="btn">
                        Claim
                      </button>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </WrapperRight>
        </Grid>
      </Grid>
    </Box>
  )
}

const listLever = [
  {
    icon: '/images/lever_1.svg',
    point: '100 points ~ 10$',
  },
  {
    icon: '/images/lever_2.svg',
    point: '500 points ~ 50$',
  },
  {
    icon: '/images/lever_3.svg',
    point: '1,000 points ~ 100$',
  },
  {
    icon: '/images/lever_4.svg',
    point: '5,000 points ~ 300$',
  },
  {
    icon: '/images/lever_5.svg',
    point: '10,000 points ~ 1,000$',
  },
  {
    icon: '/images/lever_6.svg',
    point: '50,000 points ~ 2,000$',
  },
  {
    icon: '/images/lever_7.svg',
    point: '100,000 points ~ 5,000$',
  },
  {
    icon: '/images/lever_8.svg',
    point: '100,000 points ~ 5,000$',
  },
  {
    icon: '/images/lever_9.svg',
    point: '100,000 points ~ 5,000$',
  },
]

export default ReferralFriend
