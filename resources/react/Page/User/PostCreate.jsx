import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Card, CardContent, TextField } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 800,
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

export default function BasicModal() {
  const [fileImage, setFileImage] = React.useState({});
  const [previewImage, setPreviewImage] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fileHandler = (e) => {
    const targ = e.target;
    if (targ.files[0]) {
      setFileImage(targ.files);
      MakePreview(targ.files);
    }
  }
  const MakePreview = (files) => {
    if (files) {
      const previews = [];
      files.map((file, index) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result);
          if (previews.length === files.length) {
            setPreviewImages(previews); // append all previews at once
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setPreviewImages([]);
    }
  };
  return (
    <div>
      <Card variant="outlined" sx={{ width: "90%", marginLeft: 'auto', marginRight: 'auto', marginBottom: '2%', padding: 0, height: '50px' }}>

        <CardContent sx={{ padding: 0, margin: 0, height: '50px' }}>

          <Button onClick={handleOpen} startIcon={<CreateIcon></CreateIcon>} sx={{ width: "100%", margin: 0, height: '50px' }}>Create Post</Button>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" >
            Post
          </Typography>
          <Box component="form" sx={{ display: 'block', width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Title"
              multiline
              maxRows={4}
              sx={{ width: '100%', margin: 1 }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              rows={6}
              sx={{ width: '100%', margin: 1 }}
            />
            <Box sx={{ borderStyle: 'dashed', borderWidth: '2px', borderColor: 'active', aspectRatio: '5/2' }}>
              {previewImage && previewImage.length > 0 ?
                previewImage.map((img, index) => (
                  <Box key={index}>
                    <img src={img} alt={`Preview ${index + 1}`} />
                  </Box>
                ))
                : null}
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput type="file" onChange={fileHandler} multiple accept='image/png, image/jpeg, image/jpg'/>
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
