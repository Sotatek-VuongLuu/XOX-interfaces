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
        <Grid item xs={12} md={7}></Grid>
      </Grid>
    </Box>
  )
}

export default ReferralFriend
