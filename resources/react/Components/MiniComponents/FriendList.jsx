import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from './Avatar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function AlignItemsList({theme}) {
    const listChats = [
        {
            name: 'Remy Sharp', 
            bio: '2 Mins Ago',
            img:'/static/images/avatar/1.jpg',
            online:true,
        },
        {
            name: 'Remy Sharp', 
            bio: " — I'll be in your neighborhood doing errands this…", 
            img:'/static/images/avatar/1.jpg',
            online:false,
        },
        {
            name: 'Remy Sharp', 
            bio: " — I'll be in your neighborhood doing errands this…", 
            img:'/static/images/avatar/1.jpg',
            online:true,
        },
        {
            name: 'Remy Sharp', 
            bio: '2 Mins Ago',
            img:'/static/images/avatar/1.jpg',
            online:false,
        },
        {
            name: 'Remy Sharp', 
            bio: " — I'll be in your neighborhood doing errands this…", 
            img:'/static/images/avatar/1.jpg',
            online:true,
        },
        {
            name: 'Remy Sharp',
            bio: 'Brunch this weekend?',  
            img:'/static/images/avatar/1.jpg',
            online:true,
        },
    ];
    return (
        <List  sx={{ width: '100%',maxHeight:'90vh',
         overflowY: 'auto', // Ensure the list is scrollable
        '&::-webkit-scrollbar': {
          width: '4px',
          borderRadius: '14px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '14px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '14px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },}}>
            {listChats.map((item, index) =>
            (<Box key={index}   sx={{
                width: '100%',
                color:theme.palette.background.main,
                border:'none',
                backgroundColor:theme.palette.background.default,
                cursor:'pointer',
                '&:hover':{
                    backgroundColor:theme.palette.secondary.main
                }
                }}>
                <ListItem key={index}  >
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={item.img} online={item.online}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={item.name} 
                    />
                </ListItem>

                <Divider variant="inset" component="li" sx={{marginLeft:'5%'}} />
            </Box>
            )
            )}


        </List>
    );
}
