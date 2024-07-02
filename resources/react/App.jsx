import React, { useState, useEffect } from 'react';
import { GlobalStyles, ThemeProvider, Typography, createTheme } from '@mui/material';
import { Box, Switch } from '@mui/material';
import LeftMenu from './Components/MainBody';
import { CheckAuth } from './Fetch/Auth';
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2196f3', // Color for active tab in light mode
        },
        secondary: {
            main: '#e0e0e0', // Color for inactive tab in light mode
        },
        background: {
            default: '#f0f0f0',
            main: '#303030',
        },
        action: {
            main: '#FFFFFF',
            default: '#FFFFFF'
        }
    },
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF', // Color for inactive tab in dark mode
                    '&.Mui-selected': {
                        color: '#FFFFFF', // Color for active tab in dark mode  
                        borderBottom: '5px solid #FFFFFF',
                        fontWeight: 'bold',
                        padding: '0'
                    },
                },
            },
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#bb86fc', // Color for active tab in dark mode
            white: '#d1d1d1', // Color for active tab in dark mode
        },
        secondary: {
            main: '#303030', // Color for inactive tab in dark mode
        },
        background: {
            default: '#121212', // Background color for tabs in dark mode
            main: '#FFFFFF', // Background color for tabs in dark mode
        },

        action: {
            main: '#FFFFFF',
            default: '#FFFFFF'
        }
    },
});
const globalStyles = {
    'body': {
        overflowY: 'auto', // Ensure elements are scrollable
    },
    'body::-webkit-scrollbar': {
        width: '4px',
        borderRadius: '14px',
    },
    'body::-webkit-scrollbar:hover': {
        width: '8px',
        borderRadius: '14px',
    },
    'body::-webkit-scrollbar-track': {
        background: '#f1f1f1',
        borderRadius: '14px',
    },
    'body::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '14px',
    },
    'body::-webkit-scrollbar-thumb:hover': {
        background: '#555',
    },
};
const App = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('darkMode') === 'true'
    );
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [studentData, setStudentData] = useState({});
    const [open, setOpen] = React.useState(false);
    const tab = localStorage.getItem('TabValue');
    const [TabValue, setTabValue] = React.useState('');


    useEffect(() => {
        const check = async () => {
            const authData = await CheckAuth();
            setIsLoggedIn(authData.authenticated);
            setUserData(authData.user); 
            setStudentData(authData.student); 
        };
        check(); // Initial check when component mounts

        const intervalId = setInterval(check, 5000); // Check every 5 seconds

        // Clear interval on component unmount to prevent memory leaks
        return () => clearInterval(intervalId);
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        if (TabValue !== '') {
            localStorage.setItem('TabValue', TabValue);
        }
    }, [TabValue]);
    useEffect(() => {
        const storedTabValue = localStorage.getItem('TabValue');
        if (storedTabValue !== null) {
            setTabValue(storedTabValue);
        } else {
            setTabValue(''); // Set a default value if no value is found
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const theme = darkMode ? darkTheme : lightTheme;

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    const [isLoad, setLoad] = useState(true);
    const ClickLoading = (value) => {
        setLoad(value);
    }
    useEffect(() => {
        if (isLoad) {
            ClickLoading(true);
            // Simulate a data fetch
            const timer = setTimeout(() => {
                ClickLoading(false);
            }, 1000);

            // Cleanup function to clear the timeout if component unmounts
            return () => clearTimeout(timer);
        }
    }, [isLoad]);
    return (
        <ThemeProvider theme={theme}>

            <GlobalStyles styles={globalStyles} />
            <LeftMenu open={open} isLoad={isLoad} studentData={studentData} setIsLoggedIn={setIsLoggedIn} userData={userData} checkAuthentication={isLoggedIn} ClickLoading={ClickLoading} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} toggleDarkMode={toggleDarkMode} darkMode={darkMode} TabValue={TabValue} setTabValue={setTabValue}></LeftMenu>
            <Box sx={{
                paddingTop: '5%',
                height: '90.5vh',
                width: '100%',
                backgroundColor: theme.palette.background.default,
                color: theme.palette.primary.white
            }}>
 
            </Box>
        </ThemeProvider>
    );
};

export default App;
