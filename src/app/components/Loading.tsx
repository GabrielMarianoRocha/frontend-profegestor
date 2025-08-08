// components/Loading.tsx
import React from 'react'
import { CircularProgress, Box } from '@mui/material'

export default function Loading() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
        zIndex: 1300, // acima da maioria dos componentes MUI
      }}
    >
      <CircularProgress />
    </Box>
  )
}
