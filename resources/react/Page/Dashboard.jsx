import * as React from 'react';
import Personal_Info from '../Page/enrollment/personal_info';
import Educational_info from '../Page/enrollment/educational_info';
import { Box, Button, Card, CardContent, Step, StepLabel, Stepper, Typography } from '@mui/material';
export default function BasicCard() {

  const [schoolId, setschoolId] = React.useState('');
  const [activeStep, setActiveStep] = React.useState({ step: 0, error: false });
  const steps = [
    {
      label: 'PERSONAL INFORMATION',
      component: <Personal_Info setschoolId={setschoolId} schoolId={schoolId}></Personal_Info>
    },
    {
      label: 'EDUCATIONAL INFORMATION',

      component:<Educational_info></Educational_info>
    },
    {
      label: 'FAMILY INFORMATION',

      component: ''
    },
    {
      label: 'OTHER INFORMATION',

      component: ''
    }
  ];
  const handleNext = () => { 
    setActiveStep((prevState) => ({ step: prevState.step + 1, error: false }));
  };

  const handleBack = () => { 
    setActiveStep((prevState) => ({ step: prevState.step - 1, error: false }));
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>

      <Card sx={{ marginTop: '2%', padding: '4%' }}>
        <CardContent>
          <Stepper activeStep={activeStep.step}>
            {steps.map((val, index) => {
              const stepProps = {};
              const labelProps = {};
              if (activeStep.error && activeStep === index) {
                labelProps.optional = (
                  <Typography variant="caption" color="error">
                    Alert message
                  </Typography>
                );

                labelProps.error = true;
              }
              return (
                <Step key={val.label} {...stepProps}>
                  <StepLabel {...labelProps}>{val.label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep.step === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>

              <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep.step + 1}</Typography>
              {steps[activeStep.step].component && steps[activeStep.step].component}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep.step === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>

                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}>
                  {activeStep.step === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </CardContent>
      </Card>
    </>
  );
}
