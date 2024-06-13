import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import LoginIcon from '@mui/icons-material/Login';
import { Alert, Tooltip } from '@mui/material';



// Usage

export default function Login() {
   
    const [open, setOpen] = React.useState(false);

    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [isEmailError, setEmailError] = React.useState(false);
    const [isError, setError] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const emailHandle = (e) => {
        setEmail(e.target.value);
        setName(e.target.value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();


        register(name, email, password, password);
    };

    async function register(name, email, password, passwordConfirmation) {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation }),
            });
    
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('authToken', data.token); // Store the token
                setEmailError(false)
                setError(false)
                console.log('Registration successful');
                handleClose();
            } else {
                const errorData = await response.json();
                {
                    errorData.email[0]==="The email has already been taken."?setEmailError(true):setError(true)
                }
                console.error('Registration failed:', errorData.email);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    }
    
    return (
        <React.Fragment>
            <Tooltip title="Login">
                <Button variant="outlined" onClick={handleClickOpen}>
                    <LoginIcon></LoginIcon>Login
                </Button>
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                    //   (event) => {
                    //     event.preventDefault();
                    //     const formData = new FormData(event.currentTarget);
                    //     const formJson = Object.fromEntries(formData.entries());
                    //     const email = formJson.email;
                    //     const pass = formJson.password;
                    //     console.log(email+':'+pass);
                    //     handleClose();
                    //   },
                }}
            >
                <DialogTitle sx={{ textAlign: 'center' }}>Login</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ textAlign: 'center' }}>
                        You can use your email or student ID in loging in
                    </DialogContentText>
                    {isEmailError ?
                        <Alert severity={isEmailError ? "error" : "success"}>The email has already been taken.</Alert> : ''}
                    {isError ?
                        <Alert severity={isError ? "error" : "success"}>Incorrect Credentials</Alert> : ''}
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        error={isEmailError}
                        variant="standard"
                        value={email}
                        onChange={emailHandle}
                    /><TextField
                        autoFocus
                        required
                        margin="dense"
                        id="pass"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        error={isError}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Login</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}