import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM from 'react-dom'
import App from './SetUp_App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
const AppThis = () => {
    const [mode, setMode] = useState('light');
    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });
    return (

        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <App setMode={setMode} mode={mode} />
        </ThemeProvider>
    )
}

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <AppThis></AppThis>
    </React.StrictMode>
);
