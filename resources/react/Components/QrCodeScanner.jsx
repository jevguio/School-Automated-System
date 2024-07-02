import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CameraAlt from '@mui/icons-material/CameraAlt';
import HighlightOff from '@mui/icons-material/HighlightOff';
import Webcam from 'react-webcam';
import {QrReader} from 'react-qr-reader';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function CameraQRScanner({setQrRes}) {
  const [qrData, setQrData] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState('');
  useEffect(() => {
    // Fetch available cameras on component mount
    getCameras();
  }, []);

  const getCameras = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setCameras(videoDevices);
      setSelectedCamera(videoDevices[0]?.deviceId || ''); // Select first camera by default
    } catch (error) {
      console.error('Error enumerating devices:', error);
    }
  };

  // Function to handle QR code scan
  const handleScan = (data) => {
    if (data) {
      const par=JSON.parse(data).studentid; 
      setQrData(data);
      setQrRes(par); 
    }
  };

  // Function to handle QR code scan error
  const handleError = err => {
    console.error(err);
  };

  // Function to toggle scanning state
  const toggleScanning = () => {
    setIsScanning(prev => !prev);
  };

  // Function to handle camera change
  const handleCameraChange = event => {
    setSelectedCamera(event.target.value);
  };

  // Webcam component options
  const webcamOptions = {
    videoConstraints: {
      facingMode: 'environment', // Use rear camera by default
      deviceId: selectedCamera ? { exact: selectedCamera } : undefined
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          QR Code Scanner
        </Typography>
        {/* <Webcam
          audio={false}
          screenshotFormat="image/jpeg"
          width="100%"
          height="auto" 
          {...webcamOptions}
        /> */}
          <QrReader
            scanDelay={300} 
            onResult={handleScan}
            containerStyle={{ width: '100%' }}  
          />
      </CardContent>
      <CardActions>
      {/* <FormControl fullWidth>
          <InputLabel id="camera-select-label" >Select Camera</InputLabel>
          <Select
            labelId="camera-select-label"
            id="camera-select"
            value={selectedCamera}
            label='Select Camera'
            onChange={handleCameraChange}
          >
            {cameras.map(camera => (
              <MenuItem key={camera.deviceId} value={camera.deviceId}>
                {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
      {/* <Button
          variant="contained"
          color={isScanning ? 'secondary' : 'primary'}
          onClick={toggleScanning}
          startIcon={isScanning ? <HighlightOff /> : <CameraAlt />}
        >
          {isScanning ? 'Stop Scanning' : 'Start Scanning'}
        </Button> */}
      </CardActions>
    </Card>
  );
}
