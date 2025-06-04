import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  Box
} from '@mui/material';

import Step1 from './steps/Step1_DataCollection';
import Step2 from './steps/Step2_DataExtraction';
import Step3 from './steps/Step3_CommentaryAnalysis';
import Step4 from './steps/Step4_ReportingPresentation';

const steps = [
  { label: 'Data Collection', content: <Step1 /> },
  { label: 'Data Extraction', content: <Step2 /> },
  { label: 'Commentary Analysis', content: <Step3 /> },
  { label: 'Reporting & Presentation', content: <Step4 /> }
];

export default function VerticalStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <Typography fontWeight={600}>{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Box sx={{ mb: 2 }}>
                {step.content}
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={activeStep === steps.length - 1}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mt: 1 }}
                  >
                    Back
                  </Button>
                </Box>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>🎉 All steps completed — you're done!</Typography>
          <Button onClick={handleReset} sx={{ mt: 2 }}>Reset</Button>
        </Paper>
      )}
    </Box>
  );
}
