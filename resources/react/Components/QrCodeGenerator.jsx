import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GetApp from '@mui/icons-material/GetApp';
import QRCode from 'qrcode.react';
import { TextField } from '@mui/material';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function CameraQRScanner({ setQrRes }) {
  const [qrValue, setQrValue] = useState({ studentid: '' });
  const [qrImageData, setQRImageData] = useState(null);

  const captureRef = useRef(null);

  // Function to handle text change
  const handleTextChange = (e) => {
    setQrValue({ studentid: e.target.value });
  };

  const handleDownload = () => {
    if (captureRef.current !== null) {
      let studentId;
      try {
        console.log('qrValue', qrValue);
        const parsedValue = JSON.parse(JSON.stringify(qrValue));
        console.log('parsedValue', parsedValue);
        studentId = qrValue.studentid;
        console.log('studentId', studentId);
      } catch (error) {
        console.error('Failed to parse QR code value JSON:', error);
        return;
      }

      html2canvas(captureRef.current,{ scale: 5 }).then(canvas => {
        // Canvas is the rendered image of the element
        // You can now save or display this canvas as needed
        const imgData = canvas.toDataURL('image/png');
        // Example: display the captured image in a new window 
        const downloadLink = document.createElement('a');
        downloadLink.href = imgData;
        downloadLink.download = `${studentId}_qrcode.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });
    }


  };
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          QR Code Generator
        </Typography>
        <TextField
          label="Enter text or URL"
          variant="outlined"
          fullWidth
          value={qrValue.studentid}
          onChange={handleTextChange}
          sx={{ marginBottom: '2%' }}
        /> {qrValue.studentid && (

          <Box 
          ref={captureRef} 
          sx={{border:'solid white 20px',maxWidth:'256px',aspectRatio:'1/1'}}>
            <QRCode
            id="qrcode" // Ensure the QRCode component has an ID
            value={JSON.stringify(qrValue)}
            fgColor="#000000"
            size={1556}
            style={{ margin: 'auto',width:'100%',height:'100%'}}
          />
          </Box>

        )}
      </CardContent>
      <CardActions>
        {/* Download button */}
        {qrValue && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<GetApp />}
            onClick={handleDownload}
          >
            Download QR Code
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
