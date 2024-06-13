import * as React from 'react'; 
import Menu from '@mui/material/Menu';
import { Badge, Box, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatList from './MiniComponents/ChatList';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const clearNotif=()=>{

    }
    return (
        <>
            <Tooltip title="Notification">
                <Badge badgeContent={4000} color="warning" onClick={handleClick} sx={{ mr: 3 }}>
                    <NotificationsIcon color="action" />
                </Badge>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Box sx={{ mb: 4 }}>
                    <Typography sx={{ ml: 2, fontWeight: 'bold', fontSize: 'large', position: 'absolute', left: 0 }}>Chats</Typography>
                    <IconButton
                        sx={{ mr: 2,borderRadius:0, fontWeight: 'bold', fontSize: 'large', position: 'absolute', right: 0, p: 0 }}
                        onClick={clearNotif}
                    >
                        <DeleteForeverIcon></DeleteForeverIcon>
                        Clear
                    </IconButton>
                </Box>
                <Divider></Divider>
                <ChatList></ChatList>
            </Menu>
        </>
    );
}
