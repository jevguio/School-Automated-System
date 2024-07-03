import React, { useEffect, useState } from "react";
import { Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import DatePickerJSX from '../../Components/MiniComponents/DatePicker';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function App({ activeStep, setActiveStep, steps }) {
    const [course, setCourse] = useState([]);
    const [courseSelected, setCourseSelected] = useState('');


    const SchoolName = ['First', 'Second', 'Third', 'Fourth'];
    const [SelectedSchoolName, setSelectedSchoolName] = useState('');

    const SchoolType = ['Public', 'Private'];
    const [selectedSchoolType, setSelectedSchoolType] = useState('');

    const SchoolLevel = [
        'Elementary',
        'Junior High School',
        'Senior High School',
        'Senior High School Track/Strand',
        'College/University & Degree',
        'Graduate School & Degree',
        'Last School Attended',
    ];
    const [selectedSchoolLevel, setSelectedSchoolLevel] = useState('');
    const [formValues, setFormValues] = useState([
        {
            SchoolLevel: '',
            SchoolType: '',
            Others: '',
            SchoolName: '',
            SchoolAddress: '',
            YrGrad: '',
            GenAveGrd: '',
        },
        {
            SchoolLevel: '',
            SchoolType: '',
            Others: '',
            SchoolName: '',
            SchoolAddress: '',
            YrGrad: '',
            GenAveGrd: '',
        },
        {
            SchoolLevel: '',
            SchoolType: '',
            Others: '',
            SchoolName: '',
            SchoolAddress: '',
            YrGrad: '',
            GenAveGrd: '',
        },
        {
            SchoolLevel: '',
            SchoolType: '',
            Others: '',
            SchoolName: '',
            SchoolAddress: '',
            YrGrad: '',
            GenAveGrd: '',
        },
        {
            SchoolLevel: '',
            SchoolType: '',
            Others: '',
            SchoolName: '',
            SchoolAddress: '',
            YrGrad: '',
            GenAveGrd: '',
        },
        {
            SchoolLevel: '',
            SchoolType: '',
            Others: '',
            SchoolName: '',
            SchoolAddress: '',
            YrGrad: '',
            GenAveGrd: '',
        },
        {
            SchoolLevel: '',
            SchoolType: '',
            Others: '',
            SchoolName: '',
            SchoolAddress: '',
            YrGrad: '',
            GenAveGrd: '',
        },
    ]);
    const handleChange = (index, event) => {
        const values = [...formValues];
        values[index][event.target.name] = event.target.value;
        setFormValues(values);
    };
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
                        <Typography color="text.secondary" gutterBottom>
                            School Information
                        </Typography>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        {SchoolLevel.map((sc, index) => (
                            <Grid container spacing={1} key={index} my={0.1}>
                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        id={sc}
                                        name="SchoolLevel"
                                        label='School Level'
                                        variant="outlined"
                                        disabled
                                        value={sc}
                                        onChange={(event) => handleChange(index, event)}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControl fullWidth>
                                        <InputLabel id={sc + 'SchoolType'}>School Type</InputLabel>
                                        <Select
                                            labelId={sc + 'SchoolType'}
                                            id={sc + 'SchoolType'}
                                            name="SchoolType"
                                            value={formValues[index]?.SchoolType || ''}
                                            label="School Type"
                                            onChange={(event) => handleChange(index, event)}
                                        >
                                            {SchoolType.map((ty, idx) => (
                                                <MenuItem key={idx} value={ty}>{ty}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        id={sc + 'SchoolAddress'}
                                        name="SchoolAddress"
                                        label="School Address"
                                        variant="outlined"
                                        required
                                        value={formValues[index]?.SchoolAddress || ''}
                                        onChange={(event) => handleChange(index, event)}
                                    />
                                </Grid> 
                                <Grid item xs={2}>
                                    <TextField
                                        fullWidth
                                        id={sc + 'YrGrad'}
                                        name="YrGrad"
                                        label="Year Graduated"
                                        variant="outlined"
                                        required
                                        value={formValues[index]?.YrGrad || ''}
                                        onChange={(event) => handleChange(index, event)}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        fullWidth
                                        id={sc + 'GenAveGrd'}
                                        name="GenAveGrd"
                                        label="Gen. Ave. Grade"
                                        variant="outlined"
                                        required
                                        value={formValues[index]?.GenAveGrd || ''}
                                        onChange={(event) => handleChange(index, event)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                            </Grid>
                        ))}


                    </Grid>
                </Box>
            </Box>
        </>
    )
}