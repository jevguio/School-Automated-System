import * as React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function FixedTags({errorF,departments,departments_value, set_departmentsValue}) { 

  return (
    <Autocomplete
      multiple
      id="departments-tags"
      sx={{width:'100%'}}
      value={departments_value}
      onChange={(event, newValue) => {  
        set_departmentsValue(newValue);
      }}
      options={departments}
      getOptionLabel={(option) => option}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option}
            {...getTagProps({ index })} 
          />
        ))
      } 
      renderInput={(params) => (
        <TextField {...params} label="Departments" error={errorF} placeholder="Departments" />
      )}
    />
  );
}