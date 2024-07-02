import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Card, CardContent, Skeleton, TextField } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import PostAudienceSelect from '../../Components/MiniComponents/PostAudienceSelect';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CustomImageList from '../../Components/MiniComponents/PostImageList';
import { LoadingButton } from '@mui/lab';

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

export default function BasicModal({ userData }) {
  const [fileImage, setFileImage] = React.useState([]);
  const [previewImage, setPreviewImage] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [selected, setSelected] = React.useState(false);
  const [departments_value, set_departmentsValue] = React.useState([]);


  const [errorF, setErrorF] = React.useState({});


  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fileHandler = (e) => {
    const files = Array.from(e.target.files);

    setFileImage(files);
    makePreview(files);
  };

  const makePreview = async (files) => {

    setLoading(true);
    const previews = await Promise.all(files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }));
    setPreviewImage((prevPreviews) => [...prevPreviews, ...previews]);
    setLoading(false);

  };

  const handleRemove = (index) => {
    const newFileImage = fileImage.filter((_, i) => i !== index);
    const newPreviewImage = previewImage.filter((_, i) => i !== index);
    setFileImage(newFileImage);
    setPreviewImage(newPreviewImage);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorF({
      title: title === '',
      description: description === '',
      departments_value: !selected && departments_value.length === 0,
    })
    if (title === '' || description === '' || (departments_value.length === 0 && !selected)) {
      console.log(title, description, departments_value)
      return;
    }
    const departmentsArray = selected ? ['all'] : departments_value;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append(`departments_value`, departmentsArray.toString());

    // Append each file to FormData
    for (let i = 0; i < fileImage.length; i++) {
      formData.append('fileImage[]', fileImage[i]);
    }
    try {
      const response = await fetch('/post/submit', {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': csrfToken, 
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        console.log('data success:', data.success);
        resetForm();
      }
      if (data.error) {
        console.error('data error:', data.error);
      }
      if (data.fileImage1) {
        console.error('data fileImage1:', data.fileImage1);
      }
      if (data.fileImage2) {
        console.error('data fileImage2:', data.fileImage2);
      }
      if (data.fileImage3) {
        console.error('data fileImage3:', data.fileImage3);
      }
      if (data.fileImage4) {
        console.error('data fileImage4:', data.fileImage4);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  }
  const resetForm = () => {
    setFileImage([]);
    setPreviewImage([]);
    setDescription('');
    setTitle('');
    set_departmentsValue([]);
    setErrorF({});
    handleClose();
  }
  return (
    <div>
      <Card variant="outlined" sx={{ width: "90%", marginLeft: 'auto', marginRight: 'auto', marginBottom: '2%', padding: 0, height: '50px' }}>
        <CardContent sx={{ padding: 0, margin: 0, height: '50px' }}>
          <Button onClick={handleOpen} startIcon={<CreateIcon />} sx={{ width: "100%", margin: 0, height: '50px' }}>Create Post</Button>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Post
          </Typography>
          <Box component="form" onSubmit={submitHandler} sx={{ display: 'block', width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Title"
              multiline
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxRows={4}
              error={errorF.title}
              required
              sx={{ width: '100%', margin: 1 }}
            />
            <PostAudienceSelect errorF={errorF.departments_value} selected={selected} setSelected={setSelected} departments_value={departments_value} set_departmentsValue={set_departmentsValue} />
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              required
              error={errorF.description}
              sx={{ width: '100%', margin: 1 }}
            />
            <LoadingButton
              component="label"
              variant="contained"
              loading={loading}
              loadingPosition="start"
              startIcon={<CloudUploadIcon />}
              sx={{ margin: 1 }}
            >
              Upload file
              <VisuallyHiddenInput type="file" onChange={fileHandler} multiple accept='image/png, image/jpeg, image/jpg' />
            </LoadingButton>


            <CustomImageList itemData={previewImage} loading={loading} fileImage={fileImage} handleRemove={handleRemove} />
            <LoadingButton
              component="label"
              variant="contained"
              color='error'
              sx={{ margin: 1 }}
              onClick={resetForm}
            >
              Cancel
            </LoadingButton><LoadingButton
              component="label"
              variant="contained"
              color='success'
              loading={loading}
              sx={{ margin: 1 }}
              onClick={submitHandler}
            >
              SUBMIT
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
