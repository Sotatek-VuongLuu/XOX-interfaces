import { Box, Modal } from '@mui/material'
import React from 'react'

interface IProps {
  handleClose: () => void
  onClick?: () => void
  open: boolean
  title: string
}

const ModalBase: React.FC<React.PropsWithChildren<IProps>> = ({ open, handleClose, children, title }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 327,
    bgcolor: '#242424',
    border: 'none',
    boxShadow: 24,
    borderRadius: '20px',
    p: '32px 24px',
  }
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            fontSize: '20px',
            lineHeight: '24px',
            color: 'rgba(255, 255, 255, 0.87)',
          }}
        >
          {title}
        </Box>
        <Box>{children}</Box>
      </Box>
    </Modal>
  )
}

export default ModalBase
