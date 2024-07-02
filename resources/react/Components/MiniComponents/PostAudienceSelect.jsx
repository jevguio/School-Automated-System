import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { Box, Divider, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import DepartmentSearchBox from '../MiniComponents/DepartmentSearchBox';
export default function MultipleSelectCheckmarks({errorF,departments_value, set_departmentsValue,selected, setSelected}) {

  const [departments, setDepartments] = React.useState([]);
  const Departments = async () => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    try {
      const response = await fetch('./getDepartments', {
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
        setDepartments([]);
        data.forEach(department =>
          setDepartments((prevdepartments) => [...prevdepartments,  department.name])

        );
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Authentication check failed');
      }
    } catch (error) {
      console.error('Error during get Departments:', error);
    }
  };
  useEffect(() => {
    Departments();
  }, []); 
  return (
    <Box sx={{ m: 1 }}>


      <FormControlLabel control={<Checkbox
        checked={selected}
        onChange={(e) => setSelected(e.target.checked)}
        inputProps={{ 'aria-label': 'controlled' }}
      />} 
      label="All Departments?" />
      {selected ? '' :
        <DepartmentSearchBox errorF={errorF} departments={Array.from(departments)} departments_value={departments_value} set_departmentsValue={set_departmentsValue}></DepartmentSearchBox>}

    </Box>
  );
} 