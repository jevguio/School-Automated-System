import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function AlignItemsList() {
    const listChats = [
        {
            name: 'Remy Sharp',
            msgTitle: 'Brunch this weekend?',
            msgSubject: " — I'll be in your neighborhood doing errands this…",
            when: '2 Mins Ago',
            img:'/static/images/avatar/1.jpg'
        },
        {
            name: 'Remy Sharp',
            msgTitle: 'Brunch this weekend?',
            msgSubject: " — I'll be in your neighborhood doing errands this…",
            when: '2 Mins Ago',
            img:'/static/images/avatar/1.jpg'
        },
        {
            name: 'Remy Sharp',
            msgTitle: 'Brunch this weekend?',
            msgSubject: " — I'll be in your neighborhood doing errands this…",
            when: '2 Mins Ago',
            img:'/static/images/avatar/1.jpg'
        },
        {
            name: 'Remy Sharp',
            msgTitle: 'Brunch this weekend?',
            msgSubject: " — I'll be in your neighborhood doing errands this…",
            when: '2 Mins Ago',
            img:'/static/images/avatar/1.jpg'
        },
        {
            name: 'Remy Sharp',
            msgTitle: 'Brunch this weekend?',
            msgSubject: " — I'll be in your neighborhood doing errands this…",
            when: '2 Mins Ago',
            img:'/static/images/avatar/1.jpg'
        },
        {
            name: 'Remy Sharp',
            msgTitle: 'Brunch this weekend?',
            msgSubject: " — I'll be in your neighborhood doing errands this…",
            when: '2 Mins Ago',
            img:'/static/images/avatar/1.jpg'
        },
    ];
    return (
        <List sx={{ width: '100%', maxWidth: 360 ,maxHeight:'50vh',
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
            (<Box key={index}>
                <ListItem key={index} alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={item.img}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={item.msgTitle}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {item.name}
                                </Typography>
                                {item.msgSubject}
                            </React.Fragment>
                        }
                    />
                </ListItem>

                <Divider variant="inset" component="li" />
            </Box>
            )
            )}


        </List>
    );
}
