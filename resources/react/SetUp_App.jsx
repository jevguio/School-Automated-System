import React, { useState, useEffect, useRef } from 'react';

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

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import LighDarkMode from './LightDarkMode';


export default function VerticalLinearStepper({setMode,mode}) {
 
    
    const [isPass, setPass] = useState('not checked');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        app_name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        db_host: '',
        db_port: '',
        db_database: '',
        db_username: '',
        db_password: '', 
    }); 
    const [logo, setLogo] = useState({});
    const [profile_path, setprofile_path] = useState({});
    const [errors, setErrors] = useState({});

    const [previewImage, setPreviewImage] = useState(null);
    const [previewLogoImage, setPreviewLogoImage] = useState(null); 
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "db_database" || name === "db_username" || name === "db_port" || name === "db_host" || name === "db_password") {
            setPass("not checked");
        }
        if (name === "profile_path") {
            const file = e.target.files[0];
            setprofile_path(file);
            console.log("profile_path" , file);
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
        if (name === "logo") {
            const file = e.target.files[0];
            setLogo(file);

            console.log("logo" ,file);
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewLogoImage(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setPreviewLogoImage(null);
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
        if (!formData.username) tempErrors.username = 'Username is required';
        if (!formData.email) tempErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is invalid';
        if (!formData.password) tempErrors.password = 'Password is required';
        if (formData.password !== formData.password_confirmation) {

            tempErrors.password_confirmation = 'Passwords must match';
        }
        if (!formData.db_host) tempErrors.db_host = 'Host is required';

        if (!formData.profile_path) tempErrors.profile_path = 'profile image is required';
        if (!formData.logo) tempErrors.logo = 'logo is required';

        if (!formData.db_port) tempErrors.db_port = 'Database Port is required';
        if (!formData.db_database) tempErrors.db_database = 'Database Name is required';
        if (!formData.db_username) tempErrors.db_username = 'Database User is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = () => {
        setSubmited(true);
        const uploadData = new FormData();
        uploadData.append('username', formData.username);
        uploadData.append('email', formData.email);
        uploadData.append('password', formData.password);
        uploadData.append('app_name', formData.app_name);
        uploadData.append('profile_path', profile_path);
        uploadData.append('logo', logo);
        for (let [key, value] of uploadData.entries()) {
            console.log(key + ":" + value);
        }
        for (let [key, value] of uploadData.entries()) {
            console.log(key + ":" + value);
        }
        if (validate() && isPass) {
            fetch('/setup/submit', {
                method: 'POST',
                headers: {

                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: uploadData,
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
    const profile_path_ref = useRef(null)
    const logo_ref = useRef(null)
    React.useEffect(() => {
        if (errors.profile_path) {
            profile_path_ref.current.focus();
        }
    }, [errors.profile_path]);
    React.useEffect(() => {
        if (errors.logo) {
            logo_ref.current.focus();
        }
    }, [errors.logo]);
    let [isSubmiged, setSubmited] = useState(false);

    //this to handle the error that will not show until form change

    React.useEffect(() => {
        if (isSubmiged) {
            validate();
        } else {

        }
    }, [formData]);
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const steps = [
        {
            label: 'Database Setup',
            description: <Card variant="outlined" sx={{ mb: 4 }}>
                <CardHeader title="Database MYSQL" />
                <CardContent sx={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Grid container spacing={2}>
                        <Grid item
                            sx={{ width: '100%', maxWidth: '50%', minWidth: '70px' }}>
                            <TextField

                                disabled={!!(isPass === "not checked" ? false : isPass ? true : false)}
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
                        <Grid item
                            sx={{ width: '100%', maxWidth: '50%', minWidth: '70px' }}>
                            <TextField
                                disabled={!!(isPass === "not checked" ? false : isPass ? true : false)}
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
                    <Grid container spacing={2} sx={{ mt: 0 }}>
                        <Grid item xs={12}
                            sx={{ width: '100%', minWidth: '70px' }}>
                            <TextField
                                fullWidth
                                disabled={!!(isPass === "not checked" ? false : isPass ? true : false)}
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
                    <Grid container spacing={2} sx={{ mt: 0 }}>
                        <Grid item xs={12}
                            sx={{ width: '100%', minWidth: '70px' }}>
                            <TextField
                                fullWidth
                                disabled={!!(isPass === "not checked" ? false : isPass ? true : false)}
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
                    <Grid container spacing={2} sx={{ mt: 0 }}>
                        <Grid item xs={12}
                            sx={{ width: '100%', minWidth: '70px' }}>
                            <TextField
                                fullWidth
                                disabled={!!(isPass === "not checked" ? false : isPass ? true : false)}
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
                    <Grid container spacing={1} sx={{ mt: 0 }}>
                        <Grid item xs={12}
                            sx={{ width: '100%', minWidth: '70px' }}>
                            <Alert sx={{ mb: 1 }} severity={isPass === "not checked" ? "info" : isPass ? "success" : "warning"}>{isPass === "not checked" ? "Not Checked" : isPass ? "Connection Passed!" : "Connection not check"}</Alert>
                            <Button
                                variant="contained"
                                color={isPass === "not checked" ? "primary" : isPass ? "success" : "error"}
                                onClick={isPass === "not checked" ? checkDB : isPass ? ResetCheck : createDB}
                            >{isPass === "not checked" ? "Check Connection" : isPass ? "Recheck" : "Run Migrate"}

                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>,
        },
        {
            label: 'Website Setup',
            description:
                <CardContent sx={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Grid container spacing={2} >
                        <Grid item 
                            sx={{ width: '100%', minWidth: '70px' }}>
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
                            
                    <Grid container spacing={2}>
                        <Grid item sx={{ width: '100%', minWidth: '70px',marginTop:'2%'}}>
                            <Alert severity="info" >Only Accept png, jpeg and jpg</Alert>
                            {errors.logo ?
                                <Alert severity="error" >{errors.logo}</Alert> : ''}
                            <Button
                                component="label"
                                ref={logo_ref}
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                sx={{ my: 2 }}
                                startIcon={<CloudUploadIcon />}
                            >{previewLogoImage ? 'Change logo' : 'Upload Logo'}

                                <VisuallyHiddenInput type="file" id='logo' name='logo'
                                    onChange={handleChange}
                                    accept="image/png, image/jpeg, image/jpg"
                                    error={Boolean(errors.logo)}
                                />
                            </Button>
                            {previewLogoImage ? <CardMedia
                                component="img"
                                sx={{ width: '100%' }}
                                image={previewLogoImage}
                            /> : ''}

                        </Grid>
                    </Grid>
                </CardContent>
            ,
        },
        {
            label: 'Admin Setup',
            description: <Box sx={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Grid container spacing={2}>
                    <Grid item sx={{ width: '100%' , minWidth: '70px' }}>
                        <TextField
                            fullWidth
                            id="username"
                            name="username"
                            label="Username"
                            value={formData.username}
                            onChange={handleChange}
                            error={Boolean(errors.username)}

                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item sx={{ width: '100%' , minWidth: '70px',marginTop:'2%' }}>
                        <Alert severity="info" >Only Accept png, jpeg and jpg</Alert>
                        {errors.profile_path ?
                            <Alert severity="error" >{errors.profile_path}</Alert> : ''}
                        <Button
                            component="label"
                            ref={profile_path_ref}
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            focus={errors.profile_path}
                            sx={{ my: 2 }}
                            startIcon={<CloudUploadIcon />}
                        >{previewImage ? 'Change profile' : 'Upload file'}
                            <VisuallyHiddenInput type="file" id='profile_path' name='profile_path'
                                onChange={handleChange}
                                accept="image/png, image/jpeg, image/jpg"
                                error={Boolean(errors.profile_path)}
                            />
                        </Button>
                        {previewImage ? <CardMedia
                            component="img"
                            sx={{ aspectRatio: "1/1" ,marginBottom:'1%'}}
                            image={previewImage}
                        /> : ''}

                    </Grid>
                </Grid>
                <Grid container spacing={2} >
                    <Grid item sx={{ width: '100%' , minWidth: '70px' }}>
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
                <Grid container spacing={2} sx={{ mt: 0 }}>
                    <Grid item  sx={{ width: '100%' , minWidth: '70px' }}>
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
                <Grid container spacing={2} sx={{ mt: 0 }}>
                    <Grid item sx={{ width: '100%' , minWidth: '70px' }}>
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
                </Grid></Box>,
        },
    ];
    return (
        <Card sx={{ marginRight: 'auto', marginLeft: 'auto', maxWidth: '80vw', marginTop: '1%', marginBottom: '1%', padding: '2%' }}>
            <LighDarkMode  setMode={setMode} mode={mode} ></LighDarkMode>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                                optional={
                                    index === 2 ? (
                                        <Typography variant="caption">Last step</Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </StepLabel>
                            <StepContent>
                            {step.description}
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            disabled={
                                                (isPass === "not checked" ? true : isPass ? false : true) || 
                                                (!previewImage && index === 2) || 
                                                (!previewLogoImage && index === 1)
                                              }
                                              variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                        <Button
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <LoadingButton type="button" onClick={handleSubmit}
                            disabled={isPass === "not checked" ? true : isPass ? false : true}
                            variant="contained" color="primary"
                            sx={{ mt: 1, mr: 1 }}
                            loading={loading}
                        >
                            Complete Setup
                        </LoadingButton>
                    </Paper>
                )}
            </Box>
        </Card>
    );
} 