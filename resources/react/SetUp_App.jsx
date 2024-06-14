import React, { useState ,useEffect} from 'react';
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
} from '@mui/material';

const SetupForm = () => {
    const [isPass, setPass] = useState('not checked');
    const [formData, setFormData] = useState({
        app_name: '',
        user_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        db_host: 'localhost',
        db_port: 3306,
        db_database: 'schoolsystem_db_name',
        db_username: 'root',
        db_password: '',
    });
    const [resMSG,setMsg]=useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name==="db_database"||name==="db_username"||name==="db_port"||name==="db_host"||name==="db_password"){
            setPass("not checked");
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
        if (formData.password !== formData.password_confirmation)
            tempErrors.password_confirmation = 'Passwords must match';
        if (!formData.db_host) tempErrors.db_host = 'Host is required';
        if (!formData.db_port) tempErrors.db_port = 'Database Port is required';
        if (!formData.db_database) tempErrors.db_database = 'Database Name is required';
        if (!formData.db_username) tempErrors.db_username = 'Database User is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            user_name:formData.user_name,
            email:formData.email,
            password:formData.password, 
            app_name: formData.app_name,
        };
        if (validate() && isPass) {
            fetch('/setup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    // handle success response
                })
                .catch((error) => {
                    console.error('Error:', error);
                    // handle error response
                });
        }
    }; 
     
    function ResetCheck(){

        setPass("not checked"); 
    }
    
    function createDB(){
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
        const createDB = "/setup/CreateDB";
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
        if(isPass!==true&&isPass!=="not checked"){
            setInterval(() => {
                checkDB();
              }, 2000);
        }
      }, [isPass]);
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
                                                helperText={errors.app_name}
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
                                                helperText={errors.user_name}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
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
                                                helperText={errors.email}
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
                                                helperText={errors.password}
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
                                                helperText={errors.password_confirmation}
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
                                                helperText={errors.db_host}
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
                                                helperText={errors.db_port}
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
                                                helperText={errors.db_database}
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
                                                helperText={errors.db_username}
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
                                                helperText={errors.db_password}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={12} md={4} />
                                        <Grid item xs={12} md={6} >
                                        <Alert sx={{mb:3}} severity={isPass === "not checked" ? "info" : isPass ? "success" : "warning"}>{resMSG}{isPass === "not checked" ? "Not Checked" : isPass ? "Connection Passed!" : "Connection not check"}</Alert>
                                        <Button
                                                variant="contained"
                                                color={isPass === "not checked" ? "primary" : isPass ? "success" : "error"}
                                                onClick={isPass === "not checked"?checkDB:isPass?ResetCheck:createDB}
                                            >{isPass === "not checked" ? "Check Connection" : isPass ? "Recheck" : "Run Migrate"}

                                            </Button> 
                                            </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                            <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs={12} md={4} />
                            <Grid item xs={12} md={6}>
                                    <Button type="submit" disabled={isPass === "not checked"?true : isPass?false:true} variant="contained" color="primary">
                                        Complete Setup
                                    </Button>
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
