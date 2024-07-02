import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Header from './Header';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';//grade
const drawerWidth = 240;
import FriendList from './MiniComponents/FriendList';
import { Tooltip, useMediaQuery } from '@mui/material';
import Profile from './Profile';
import PostView from '../Page/User/PostView';
import PostCreate from '../Page/User/PostCreate';
import Logout from '../Fetch/Logout';
import DashboardPage from '../Page/Dashboard';
import Attendance from '../Page/Attendance';
const GetIcon = ({ text }) => {
  return (
    <>
      {
        text === 'Dashboard' ? <DashboardIcon></DashboardIcon> :
          text === 'Home' ? <HomeIcon></HomeIcon> :
            text === 'Blog' ? <NewspaperIcon></NewspaperIcon> :
              text === 'Profile' ? <AccountBoxIcon></AccountBoxIcon> :
                text === 'Account' ? <ManageAccountsIcon></ManageAccountsIcon> :
                  text === 'Light Mode' ? <LightModeIcon></LightModeIcon> :
                    text === 'Dark Mode' ? <DarkModeIcon></DarkModeIcon> :
                      text === 'Grades' ? <HistoryEduIcon></HistoryEduIcon> :
                        text === 'Program & Course' ? <SchoolIcon></SchoolIcon> :
                          text === 'Events' ? <EmojiEventsIcon></EmojiEventsIcon> :
                            text === 'Logout' ? <LogoutIcon></LogoutIcon> : ''

      }
    </>
  )
}

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer({ studentData, setIsLoggedIn, checkAuthentication, userData, ClickLoading, isLoad, open, handleDrawerClose, toggleDarkMode, darkMode, TabValue, setTabValue, handleDrawerOpen }) {
  const theme = useTheme();

  const isLargeScreen = useMediaQuery('(min-width:800px)');
  const tabs = ['Home', 'Dashboard', 'Blog', 'Profile', 'Account', 'Program & Course', 'Grades', 'Events', darkMode ? 'Light Mode' : 'Dark Mode', 'Logout'];

  const handleUserMenu = (setting, v) => {
    if (setting === 'Light Mode' || setting === 'Dark Mode') {

      toggleDarkMode();
    } else if (setting === 'Logout') {

      Logout(null, setIsLoggedIn);
      setTabValue(setting);
    } else {
      setTabValue(setting);
    }
    ClickLoading(true);
  };
  const slicedTabs = tabs.slice(3);
  const firstThreeTabs = tabs.slice(0, 3);
  React.useEffect(() => {
    if (!checkAuthentication) {
      setTabValue = 'Home';
    }
  }, [checkAuthentication]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header setIsLoggedIn={setIsLoggedIn} ClickLoading={ClickLoading} userData={userData} checkAuthentication={checkAuthentication} isLoad={isLoad} settings={slicedTabs} pages={firstThreeTabs} toggleDarkMode={toggleDarkMode} open={open} darkMode={darkMode} TabValue={TabValue} setTabValue={setTabValue} handleDrawerOpen={handleDrawerOpen}></Header>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ padding: 0, margin: 0 }}>
          {tabs.map((text, index) => ( 
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              {checkAuthentication && index == 3 ?
                <Divider />

                : ''///////

              }
              {index < 3 &&((!checkAuthentication&&text!=='Dashboard')||checkAuthentication)?
                <Tooltip title={text} placement="right" arrow>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={() => handleUserMenu(text, index)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: TabValue === text ? theme.palette.primary.main : theme.palette.background.main,
                      }}
                    >
                      <GetIcon text={text}></GetIcon>
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </Tooltip>

                : ''

              }
              {checkAuthentication && index >= 3 ?

                <Tooltip title={text} placement="right" arrow>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={() => handleUserMenu(text, index)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: TabValue === text ? theme.palette.primary.main : theme.palette.background.main,
                      }}
                    >
                      <GetIcon text={text}></GetIcon>
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </Tooltip>
                :
                ''
              }

            </ListItem>
          ))}
        </List>

      </Drawer>
      <Box component="main" sx={{
        flexGrow: 1, p: 3, mr: isLargeScreen ? '20%' : '0'
      }}>
        <DrawerHeader />
        {TabValue === "Profile" && checkAuthentication ?
          <Profile userData={userData}></Profile>
          : TabValue === "Home" ?
            <>
              {checkAuthentication && (userData ? userData.type === 'admin' : '' || userData ? userData.type === 'teacher' : '') ?
                <PostCreate userData={userData}></PostCreate> : ''}

              <PostView studentData={studentData}></PostView>
            </>
            : TabValue === "Dashboard" ? <DashboardPage></DashboardPage>
              : TabValue === "Program & Course" ? <Attendance></Attendance>
                : ''
        }
      </Box>
      {isLargeScreen && checkAuthentication ?
        <Box sx={{ flexGrow: 1, width: '20%', right: 0 }} position='fixed'>

          <DrawerHeader />
          <FriendList theme={theme}></FriendList>

        </Box> : ''}
    </Box>
  );
}
