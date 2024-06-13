import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { ButtonGroup, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import CancelIcon from '@mui/icons-material/Cancel';
export default function SaveEdit({ saving, setSaving, setBioEdit, setBiodata, biodata, label }) {


    const handleSave = () => {
        setSaving(true);
    };
    React.useEffect(() => {
        if (saving) {
            const timer = setTimeout(() => {
                setSaving(false);
                setBioEdit(false);
            }, 2000); // 2000 milliseconds = 2 seconds
            return () => clearTimeout(timer); // Cleanup the timeout if the component unmounts
        }
    }, [saving]);
    return (
        <Box sx={{ display: 'flex', ml: 'auto', mr: 'auto', justifyContent: 'center' }}>
            <TextField id="outlined-basic" label={label} variant="outlined"
                value={biodata}
                onChange={(e) => setBiodata(e.target.value)}
            />
            <ButtonGroup variant="outlined" aria-label="Loading button group">
                <Button disabled={saving}
                    color='error'
                    onClick={() => setBioEdit(false)}
                    startIcon={<CancelIcon />}
                >Cancel
                </Button>
                <LoadingButton loading={saving} loadingPosition="start" onClick={handleSave} startIcon={<SaveIcon />}>
                    Save
                </LoadingButton>
            </ButtonGroup>


        </Box>
    );
}
