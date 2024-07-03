import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function MyDatePicker({value, setValue}) { 

  return (
    <LocalizationProvider  dateAdapter={AdapterDayjs}>
      <DatePicker
      required
      sx={{width:'100%'}}
        label="Select Date"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(params) => <TextField  {...params} />}
      />
    </LocalizationProvider>
  );
}

export default MyDatePicker;
