import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GetApp from '@mui/icons-material/GetApp';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import { useRef } from 'react';


export default function CameraQRScanner({ setQrRes, schoolId }) {

  const captureRef = useRef(null);



  const handleDownload = () => {
    if (captureRef.current !== null) {
      let studentId;
      try {
        console.log('qrValue', schoolId);
        const parsedValue = JSON.parse(JSON.stringify(schoolId));
        console.log('parsedValue', parsedValue);
        studentId = schoolId;
        console.log('studentId', studentId);
      } catch (error) {
        console.error('Failed to parse QR code value JSON:', error);
        return;
      }

      html2canvas(captureRef.current, { scale: 5 }).then(canvas => {
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
    <Box sx={{ minWidth: 275, padding: '2%', marginTop:'-50%',marginLeft:'auto',textAlign:'center',marginRight:'auto',display:'block',justifyContent:'center',justifyItems:'center'}}>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        QR Code Generator
      </Typography>
      
      <Box
          ref={captureRef}
          sx={{ border: 'solid white 10px',backgroundColor:'white', maxWidth: '135px', aspectRatio: '1/1' ,marginLeft:'auto',marginRight:'auto',marginBottom:'5px'}}>
            {(schoolId!=='')&&<QRCode
            id="qrcode" // Ensure the QRCode component has an ID
            value={JSON.stringify(schoolId||'')}
            fgColor="#000000"
            size={1556}
            style={{ margin: 'auto', width: '100%', height: '100%' }}
          />}
          
        </Box>
      {/* Download button */}
      <Button
      disabled={!schoolId}
          variant="contained"
          color="primary"
          startIcon={<GetApp />}
          onClick={handleDownload}
        >
          Download
        </Button>  
    </Box>
  );
}
