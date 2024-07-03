import React, { useEffect, useState } from "react";
import { Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import DatePickerJSX from '../../Components/MiniComponents/DatePicker';
import Box from '@mui/material/Box';
import QrGenerator from '../../Components/QrCodeGenerator';

export default function App({ activeStep, setActiveStep, steps, setschoolId, schoolId }) {
    const [course, setCourse] = useState([]);
    const [courseSelected, setCourseSelected] = useState('');


    const admissionLvl = ['First', 'Second', 'Third', 'Fourth'];
    const [admissionLvlSelected, setadmissionLvlSelected] = useState('');

    const Status = ['Single', 'Married', 'Legally Separated', 'Widowed'];
    const [selectedStatus, setSelectedStatus] = useState('');

    const sex = ['Male', 'Female'];
    const [selectedSex, setSelectedSex] = useState('');
    const [formValues, setFormValues] = useState({
        schoolId: '',
        term: '',
        schoolYear: '',
        lrn: '',
        firstName: '',
        middleName: '',
        lastName: '',
        age: '',
        birthPlace: '',
        citizenship: '',
        religion: '',
        celNumber: '',
        email: '',
        facebook: '',
        twitter: '',
        address: '',
        zipCode: '',
        residenceNumber: ''
    });

    useEffect(() => {

        setschoolId(formValues.schoolId);
    }, [formValues]);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };
    useEffect(() => {
        const GetCourse = async () => {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            try {
                const response = await fetch('./getCourse', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(Array.from(data));
                    setCourse(Array.from(data));
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Authentication check failed');
                }
            } catch (error) {
                console.error('Error during get Departments:', error);
                return { departments: null };
            }
        };
        GetCourse();
    }, [])
    const handleChangeCourse = (e) => {
        setCourseSelected(e.target.value);
    }
    const handleChangeAdmission = (e) => {
        setadmissionLvlSelected(e.target.value);
    }

    const handleChangeStatus = (e) => {
        setSelectedStatus(e.target.value);
    }
    const handleChangeSex = (e) => {
        setSelectedSex(e.target.value);
    }
    const form2create = [
        {
            type: 'tf',
            label: 'School ID',
            isRequired: true,
        },
        {
            type: 'tf',
            label: 'School ID',
            isRequired: true,
        },
    ];

    return (
        <>
            <Box sx={{ minWidth: 275, marginTop: '2%' }}>
                <Box sx={{ padding: '2%', flexGrow: '1', marginLeft: '3%', marginRight: '3%' }}>
                    <Typography m={4} variant="h4" color="text.secondary" gutterBottom>
                        Student Data
                    </Typography>
                    <Grid container spacing={1}>

                        <Grid item xs={4}>
                            <Typography color="text.secondary" gutterBottom>
                                School Information
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>
                        <Grid item xs={4}>
                            <QrGenerator schoolId={schoolId} ></QrGenerator>
                        </Grid>
                        <Grid item xs={12} height={25}>
                            <Divider />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="school-id"
                                name="schoolId"
                                label="School ID"
                                variant="outlined"
                                type="number"
                                required
                                value={formValues.schoolId}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth sx={{ minWidth: '25%' }}>
                                <InputLabel id="course-label" required>Course</InputLabel>
                                <Select
                                    labelId="course-label"
                                    id="course-select"
                                    value={courseSelected}
                                    label="Course"
                                    name='course'
                                    onChange={(e) => setCourseSelected(e.target.value)}
                                    required
                                >
                                    {course.map((value) =>
                                        <MenuItem key={value.id} value={value.name}>{value.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth sx={{ minWidth: '25%' }}>
                                <InputLabel id="admission-level-label" required>Admission Level</InputLabel>
                                <Select
                                    labelId="admission-level-label"
                                    id="admission-level-select"
                                    value={admissionLvlSelected}
                                    label="Admission Level"
                                    name='admissionLevel'
                                    onChange={(e) => setAdmissionLvlSelected(e.target.value)}
                                    required
                                >
                                    {admissionLvl.map((value) =>
                                        <MenuItem key={value} value={value}>{value + ' Year'}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="term"
                                name="term"
                                label="Term"
                                variant="outlined"
                                required
                                value={formValues.term}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="school-year"
                                name="schoolYear"
                                label="School Year"
                                variant="outlined"
                                required
                                value={formValues.schoolYear}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="lrn"
                                name="lrn"
                                label="LRN"
                                variant="outlined"
                                required
                                value={formValues.lrn}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} height={25}></Grid>
                        <Grid item xs={12} height={25}></Grid>
                        <Typography color="text.secondary" gutterBottom>
                            Personal Information
                        </Typography>
                        <Grid item xs={12} height={25}>
                            <Divider />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="first-name"
                                name="firstName"
                                label="First Name"
                                variant="outlined"
                                required
                                value={formValues.firstName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="middle-name"
                                name="middleName"
                                label="Middle Name"
                                variant="outlined"
                                value={formValues.middleName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="last-name"
                                name="lastName"
                                label="Last Name"
                                variant="outlined"
                                required
                                value={formValues.lastName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth sx={{ minWidth: '25%' }}>
                                <InputLabel id="sex-label" required>Sex</InputLabel>
                                <Select
                                    labelId="sex-label"
                                    id="sex-select"
                                    value={selectedSex}
                                    label="Sex"
                                    name='sex'
                                    onChange={(e) => setSelectedSex(e.target.value)}
                                    required
                                >
                                    {sex.map((value) =>
                                        <MenuItem key={value} value={value}>{value}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <DatePickerJSX />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="age"
                                name="age"
                                label="AGE"
                                variant="outlined"
                                required
                                value={formValues.age}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="birth-place"
                                name="birthPlace"
                                label="Birth Place"
                                variant="outlined"
                                required
                                value={formValues.birthPlace}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="citizenship"
                                name="citizenship"
                                label="Citizenship"
                                variant="outlined"
                                required
                                value={formValues.citizenship}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="religion"
                                name="religion"
                                label="Religion"
                                variant="outlined"
                                required
                                value={formValues.religion}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth sx={{ minWidth: '25%' }}>
                                <InputLabel id="status-label" required>Civil Status</InputLabel>
                                <Select
                                    labelId="status-label"
                                    id="status-select"
                                    value={selectedStatus}
                                    label="Civil Status"
                                    name='status'
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    required
                                >
                                    {Status.map((value) =>
                                        <MenuItem key={value} value={value}>{value}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="cellphone-number"
                                name="celNumber"
                                label="Cellphone Number"
                                variant="outlined"
                                required
                                value={formValues.celNumber}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="Email"
                                variant="outlined"
                                required
                                value={formValues.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="facebook"
                                name="facebook"
                                label="Facebook"
                                variant="outlined"
                                value={formValues.facebook}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="twitter"
                                name="twitter"
                                label="Twitter"
                                variant="outlined"
                                value={formValues.twitter}
                                onChange={handleChange}
                            />
                        </Grid> <Grid item xs={12} height={25}></Grid>
                        <Typography color="text.secondary" gutterBottom>
                            Residence Information
                        </Typography>
                        <Grid item xs={12} height={25}>
                            <Divider />
                        </Grid>

                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                id="address"
                                name="address"
                                label="Address"
                                variant="outlined"
                                multiline
                                rows={4}
                                required
                                value={formValues.address}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="zip-code"
                                name="zipCode"
                                label="Zip Code"
                                variant="outlined"
                                required
                                value={formValues.zipCode}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="residence-number"
                                name="residenceNumber"
                                label="Residence Number"
                                variant="outlined"
                                required
                                value={formValues.residenceNumber}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} height={25}></Grid>
                        <Grid item xs={12} height={25}>
                            <Divider />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}