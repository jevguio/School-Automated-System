import { Box, Card, TextField, Typography } from '@mui/material';
import QrCodeAttendance from '../Components/QrCodeScanner';
import React, { useState } from 'react';
export default function Attendance() {
  const [qr_res, setQrRes] = useState('000'); 
  return (
    <>
      <Card
        sx={{ display: 'flex' }}
      >
        <Box
          sx={{ maxWidth: '50%' }}
        >
          <QrCodeAttendance setQrRes={setQrRes}></QrCodeAttendance>
        </Box> 
        
        <Box
          sx={{ maxWidth: '50%' ,marginTop:'5%'}}
        >
          <TextField id="outlined-basic" label="Student ID" value={qr_res} variant="outlined" disabled/>
        </Box>
      </Card>
    </>
  )
}