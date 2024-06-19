import React, { useState, useEffect } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import VisuallyHiddenInput from './Components/MiniComponents/vshidden';
import {
    Container,
    Grid,
    Card,
    CardHeader,
    CardContent,
    TextField,
    Button,
    Typography,
    Alert,
    CardMedia,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
const SetupForm = () => {
    const [isPass, setPass] = useState('not checked');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        app_name: '',
        user_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        db_host: '',
        db_port: '',
        db_database: '',
        db_username: '',
        db_password: '',
        profile_path: '', // Add profile_path to formData
    });
    const [resMSG, setMsg] = useState('');
    const [errors, setErrors] = useState({});

    const [previewImage, setPreviewImage] = useState(null);
    const [envVars, setEnvVars] = useState({});
    const [message, setMessage] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "db_database" || name === "db_username" || name === "db_port" || name === "db_host" || name === "db_password") {
            setPass("not checked");
        }
        if (name === "profile_path") {
            const file = e.target.files[0];
            setFormData((prevData) => ({
                ...prevData,
                [name]: file, // Store the file object directly
            }));
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewImage(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setPreviewImage(null);
            }
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.app_name) tempErrors.app_name = 'School Name is required';
        if (!formData.user_name) tempErrors.user_name = 'Username is required';
        if (!formData.email) tempErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is invalid';
        if (!formData.password) tempErrors.password = 'Password is required';
        if (formData.password !== formData.password_confirmation) {

            tempErrors.password_confirmation = 'Passwords must match';
        }
        if (!formData.db_host) tempErrors.db_host = 'Host is required';
        if (!formData.db_port) tempErrors.db_port = 'Database Port is required';
        if (!formData.db_database) tempErrors.db_database = 'Database Name is required';
        if (!formData.db_username) tempErrors.db_username = 'Database User is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        if (validate() && isPass) {
            fetch('/setup/submit', {
                method: 'POST',
                headers: { 
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: formData,
            })
                .then(response => {
                    var s = response.json();
                    if (!response.ok) {
                        console.error(s);
                        throw new Error('Network response was not ok');
                    }
                    return s;
                })
                .then(data => {
                    if (data.error) {

                        console.error('Error:', data.error)
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    };

    function ResetCheck() {

        setPass("not checked");
    }

    function createDB() {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const createDB = "/setup/SetupDB";
        const data = {
            db_host: formData.db_host,
            db_port: formData.db_port,
            db_database: formData.db_database,
            db_username: formData.db_username,
            db_password: formData.db_password, // Assuming you have db_password in your form
            app_name: formData.app_name,
        };

        console.log(data);
        fetch(createDB, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken // Include CSRF token in headers
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                var s = response.json();
                if (!response.ok) {
                    console.error(s);
                    throw new Error('Network response was not ok');
                }
                return s;
            })
            .then(data => {
                if (data.Passed) {
                    // Handle success (e.g., redirect to setup page)
                    setPass(true);
                } else {
                    // Handle failure (e.g., show error message)

                    setPass(false);
                }
            })
            .catch(error => console.error('Error:', error));

    }
    function checkDB() {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const CheckDB = "/setup/CheckDB";
        const data = {
            db_host: formData.db_host,
            db_port: formData.db_port,
            db_database: formData.db_database,
            db_username: formData.db_username,
            db_password: formData.db_password, // Assuming you have db_password in your form
            app_name: formData.app_name,
        };


        fetch(CheckDB, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken // Include CSRF token in headers
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                var s = response.json();
                if (!response.ok) {
                    console.error(s);
                    throw new Error('Network response was not ok');
                }
                return s;
            })
            .then(data => {
                if (data.Passed) {
                    // Handle success (e.g., redirect to setup page)
                    setPass(true);
                } else {
                    // Handle failure (e.g., show error message)

                    setPass(false);
                }
            })
            .catch(error => console.error('Error:', error));

    }
    useEffect(() => {
        if (isPass !== true && isPass !== "not checked") {
            setInterval(() => {
                checkDB();
            }, 2000);
        }
    }, [isPass]);


    useEffect(() => {
        const fetchEnvVars = async () => {
            try {
                const response = await fetch('/env', {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setEnvVars(data);
                setFormData({
                    ...formData,
                    app_name: data.APP_NAME,
                    db_host: data.DB_HOST,
                    db_port: data.DB_PORT,
                    db_database: data.DB_DATABASE,
                    db_username: data.DB_USERNAME,
                    db_password: data.DB_PASSWORD,
                });
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchEnvVars();

    }, []); // Empty dependency array means this runs once after initial render

    return (
        <Container>
            <Grid container justifyContent="center">
                <Typography variant='h1'>Website Setup</Typography>
                <Grid item xs={12} md={8} sx={{ my: 5 }}>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <Card variant="outlined" sx={{ mb: 4 }}>
                                <CardHeader title="Website" />
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4}>
                                            <Typography align="right" sx={{ pt: 2 }}>
                                                School Name
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                id="app_name"
                                                name="app_name"
                                                label="School Name"
                                                value={formData.app_name}
                                                onChange={handleChange}
                                                error={Boolean(errors.app_name)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                            <Card variant="outlined" sx={{ mb: 4 }}>
                                <CardHeader title="Admin Account" />
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4}>
                                            <Typography align="right" sx={{ pt: 2 }}>
                                                Username
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                id="user_name"
                                                name="user_name"
                                                label="Username"
                                                value={formData.user_name}
                                                onChange={handleChange}
                                                error={Boolean(errors.user_name)}

                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4}>
                                            <Typography align="right" sx={{ pt: 2 }}>
                                                Profile Picture
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6} my={2}>
                                            <Alert severity="info" >Only Accept png, jpeg and jpg</Alert>
                                            <LoadingButton
                                                component="label"
                                                role={undefined}
                                                variant="contained"
                                                tabIndex={-1}
                                                loading={loading}
                                                loadingPosition="start"
                                                sx={{ my: 2 }}
                                                startIcon={<CloudUploadIcon />}
                                            >
                                                Upload file
                                                <VisuallyHiddenInput type="file" id='profile_path' name='profile_path'
                                                    onChange={handleChange}
                                                    accept="image/png, image/jpeg, image/jpg"
                                                />
                                            </LoadingButton>
                                            {previewImage ? <CardMedia
                                                component="img"
                                                sx={{ aspectRatio: "1/1" }}
                                                image={previewImage}
                                            /> : ''}

                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} >
                                        <Grid item xs={12} md={4}>
                                            <Typography align="right" sx={{ pt: 2 }}>
                                                Email Address
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                id="email"
                                                name="email"
                                                label="Email Address"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                error={Boolean(errors.email)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={12} md={4}>
                                            <Typography align="right" sx={{ pt: 2 }}>
                                                Password
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                id="password"
                                                name="password"
                                                label="Password"
                                                type="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                error={Boolean(errors.password)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={12} md={4}>
                                            <Typography align="right" sx={{ pt: 2 }}>
                                                Confirm Password
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                label="Confirm Password"
                                                type="password"
                                                value={formData.password_confirmation}
                                                onChange={handleChange}
                                                error={Boolean(errors.password_confirmation)}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                            <Card variant="outlined" sx={{ mb: 4 }}>
                                <CardHeader title="Database MYSQL" />
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4}>
                                            <Typography align="right" sx={{ pt: 2 }}>
                                                Host
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                id="db_host"
                                                name="db_host"
                                                label="Host"
                                                value={formData.db_host}
                                                onChange={handleChange}
                                                error={Boolean(errors.db_host)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={12} md={4}>
                                            <Typography align="right" sx={{ pt: 2 }}>
                                                Database Port
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                id="db_port"
                                                name="db_port"
                                                label="Database Port"
                                                type="number"
                                                value={formData.db_port}
                                                onChange={handleChange}
                                                error={Boolean(errors.db_port)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={12} md={4}>
                                            <Typography align="right" sx={{ pt: 2 }}>
                                                Database Name
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                id="db_database"
                                                name="db_database"
                                                label="Database Name"
                                                value={formData.db_database}
                                                onChange={handleChange}
                                                error={Boolean(errors.db_database)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={12} md={4}>
                                            <Typography align="right" sx={{ pt: 2 }}>
                                                Database User
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                id="db_username"
                                                name="db_username"
                                                label="Database User"
                                                value={formData.db_username}
                                                onChange={handleChange}
                                                error={Boolean(errors.db_username)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={12} md={4}>
                                            <Typography align="right" sx={{ pt: 2 }}>
                                                Database Password
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                id="db_password"
                                                name="db_password"
                                                label="Database Password"
                                                type="password"
                                                value={formData.db_password}
                                                onChange={handleChange}
                                                error={Boolean(errors.db_password)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={12} md={4} />
                                        <Grid item xs={12} md={6} >
                                            <Alert sx={{ mb: 3 }} severity={isPass === "not checked" ? "info" : isPass ? "success" : "warning"}>{resMSG}{isPass === "not checked" ? "Not Checked" : isPass ? "Connection Passed!" : "Connection not check"}</Alert>
                                            <Button
                                                variant="contained"
                                                color={isPass === "not checked" ? "primary" : isPass ? "success" : "error"}
                                                onClick={isPass === "not checked" ? checkDB : isPass ? ResetCheck : createDB}
                                            >{isPass === "not checked" ? "Check Connection" : isPass ? "Recheck" : "Run Migrate"}

                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={12} md={4} />
                                <Grid item xs={12} md={6}>
                                    <LoadingButton type="submit"
                                        disabled={isPass === "not checked" ? true : isPass ? false : true}
                                        variant="contained" color="primary"

                                        loading={loading}
                                    >
                                        Complete Setup
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SetupForm;
