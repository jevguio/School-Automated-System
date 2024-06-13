import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ChatIcon from '@mui/icons-material/Chat';
import { Badge, Box, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChatList from './MiniComponents/ChatList';
export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const AddMessage = () => {

    }
    return (
        <>
            <Tooltip title="Message">
                <Badge badgeContent={4000} color="warning" onClick={handleClick} sx={{ mr: 3 }}>
                    <ChatIcon color="action" />
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
                    <Tooltip title="Create Message">
                    <IconButton
                        sx={{ mr: 2, fontWeight: 'bold', fontSize: 'large', position: 'absolute', right: 0, p: 0 }}
                        onClick={AddMessage}
                    >
                        
                        <AddCircleOutlineIcon></AddCircleOutlineIcon>
                    </IconButton>
                    </Tooltip>
                </Box>
                <Divider></Divider>
                <ChatList></ChatList>
            </Menu>
        </>
    );
}
