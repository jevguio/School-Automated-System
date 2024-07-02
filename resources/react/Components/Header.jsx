import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useTheme } from '@mui/material/styles';
import { Tab, Tabs, useMediaQuery, styled } from '@mui/material';
import Chat from './Chat'
import Notification from './Notification'
const drawerWidth = 240;
import MuiAppBar from '@mui/material/AppBar';
import LinearProgress from '@mui/material/LinearProgress';
import Login from '../Fetch/Login';
import Logout from '../Fetch/Logout';

import { useEffect, useState, createContext, useContext, } from 'react';
function ResponsiveAppBar({ setIsLoggedIn, userData, checkAuthentication, isLoad, ClickLoading, open, pages, settings, toggleDarkMode, darkMode, TabValue, setTabValue, handleDrawerOpen }) {


    const [TabHead, setTabHead] = useState(0);



    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const theme = useTheme();

    const isLargeScreen = useMediaQuery('(min-width:500px)');

    const isSmall = useMediaQuery('(min-width:700px)');
    const phone = useMediaQuery('(min-width:600px)');
    const handleChange = (event, newValue) => {
        console.log(TabHead + ":" + TabValue);
        setTabValue(pages[newValue]);
        setTabHead(newValue);
        ClickLoading(true);

    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleUserMenu = (setting) => {
        if (setting === 'Light Mode' || setting === 'Dark Mode') {
            toggleDarkMode();
        } else if (setting === 'Logout') {
            setTabValue('Home');
            Logout(handleCloseUserMenu, setIsLoggedIn);
            return;
        }

        setTabValue(setting);
        ClickLoading(true);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const [appName, setAppName] = useState('');

    useEffect(() => {
        const appNameFromEnv = window.appName;
        setAppName(appNameFromEnv);
        document.title = appNameFromEnv;
    }, []);
    return (
        <AppBar position="fixed" open={open}>
            <Container  >
                <Toolbar disableGutters sx={{ flexGrow: 2, display: { md: 'flex' } }}>
                    <Tooltip title={appName} arrow>
                        <Box sx={{ display: 'flex', padding: 0, alignItems: 'center', position: 'absolute', left: '0' }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: 5,
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Avatar src='/resources/react/img/logo.png'></Avatar>
                            {isLargeScreen && !open ? <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    mr: 2,
                                    ml: 2,
                                    display: { md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    "&:hover": {
                                        color: theme.palette.primary,
                                    },
                                }}
                            >
                                {appName}
                            </Typography>
                                : ''}




                        </Box>
                    </Tooltip>

                    <Box sx={{ flexGrow: 0, position: 'absolute', right: '0' }}>
                        {checkAuthentication ?
                            <>
                                <Chat></Chat>
                                <Notification></Notification>
                                {phone ?
                                    <>

                                        <Tooltip title="Account">
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                <Avatar alt={userData ? userData.name ? userData.name.toString().toUpperCase() : '' : ''} src={userData ? userData.profile_path ? "storage/" + userData.profile_path : '//' : "//"} />
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
                                            {settings.map((setting) => (
                                                <MenuItem key={setting} onClick={() => handleUserMenu(setting)}>
                                                    <Typography textAlign="center" >{setting}</Typography>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </>
                                    : ''


                                }
                            </>
                            :isLargeScreen||!open? <Login setIsLoggedIn={setIsLoggedIn} setTabValue={setTabValue} >
                            </Login>
                            :''}


                    </Box>
                </Toolbar>
            </Container>
            {isLoad ? <LinearProgress></LinearProgress> : ''}

        </AppBar>
    );
}
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
export default ResponsiveAppBar;
