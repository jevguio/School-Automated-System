import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckAuth from '../Fetch/Auth';
import ProfileIcon from '../img/profile.jpg'
import { Alert, Avatar, Box, ButtonGroup, IconButton, TextField, Tooltip } from '@mui/material';

import { styled } from '@mui/material/styles';  
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit'; 
 
import SaveEdit from './MiniComponents/SaveEdit';
export default function MediaCard() {

    const theme = useTheme();
    const [isLoggedIn, setIsLoggedIn, userData] = CheckAuth();
    const [isBioEdit, setBioEdit] = React.useState(false);
    const EditHander = () => {
        setBioEdit(!isBioEdit)
    }
    const [error, setError] = React.useState(false);
    const [name, setName] = React.useState('');
    const [biodata, setBiodata] = React.useState('');
    const [saving, setSaving] = React.useState(false);

 
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!acceptedTypes.includes(file.type)) {
                event.target.value = null; // Clear the selection
                setError(true);
            } else {
                // Process the selected file
                console.log('Selected file:', file);
            }
        }
    }; 
    const fileInputRef = React.useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const handleSaveEdit = () => {

    }
    return (
        <Card sx={{ maxWidth: '100%' }}>
            <CardMedia
                sx={{ aspectRatio: 16 / 9, maxHeight: '250px', width: '100%', borderBottom: '1.2px lightgray solid' }}
                image={userData.bg_path ? userData.bg_path : ProfileIcon}
                title={userData.name}
            />
            <Box sx={{ width: '35%', maxWidth: '200px', aspectRatio: '1/1', mt: '-10%', ml: 'auto', mr: 'auto', }}
            >

                <Avatar
                    alt="Remy Sharp"

                    src={userData.profile_path ? userData.profile_path : ProfileIcon}
                    sx={{ width: '100%', height: '100%', border: '5px solid #743ad5', borderRadius: 100 }}
                ></Avatar>
                <IconButton
                    onClick={handleButtonClick}
                    sx={{
                        mt: '-30%',
                        ml: '70%',
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        '&:hover': {
                            backgroundColor: theme.palette.background.main
                        }
                    }}>
                    <VisuallyHiddenInput type="file" onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{ display: 'none' }} accept=".jpg, .jpeg, .png" />

                    <AddAPhotoIcon>
                    </AddAPhotoIcon>
                </IconButton>
            </Box>
            <CardContent >

                <Typography gutterBottom variant="h5" align='center' component="div">
                    {userData.name}
                </Typography>
                {isBioEdit ?
                <SaveEdit saving={saving} setSaving={setSaving} label={'Biodata'} setBioEdit={setBioEdit} setBiodata={setBiodata} biodata={biodata} ></SaveEdit>
                    :
                    <Box sx={{ display: 'flex', ml: 'auto', mr: 'auto', justifyContent: 'center' }}>

                        <Typography variant="body2" align='center' color="text.secondary">
                            {userData.biodata}
                        </Typography>

                        <Tooltip title='Edit' arrow>

                            <IconButton sx={{ mt: '-1%' }}
                                onClick={EditHander}
                            >
                                <EditIcon></EditIcon>
                            </IconButton>
                        </Tooltip>
                    </Box>
                }

            </CardContent>
        </Card>
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
