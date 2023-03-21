import React from "react";

import {
  Box,
  Grid,
  Step,
  Stepper,
  StepContent,
  StepLabel,
  Typography,
 } from "@mui/material";

 import DocumentUploadForm from "../DocumentUploadForm";
 import EditDocument from "../EditDocument";
 import EditAnalysisForm from "../EditAnalysisForm";

import steps from "./steps"


const NavigationStepper = (props) => {


  const handleStep = (e) => {

    if(e <= props.completedSteps) {
      props.setActiveStep(e);
    };

  };

  return (
    <Grid container className="gridCenterItems">
      <Grid item xs={12}>

        <Stepper activeStep={props.activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label} >
              <StepLabel
                onClick={() => handleStep(index)}
                optional={
                  index === props.activeStep ? (
                    <Typography variant="caption">{step.description}</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>

              <StepContent>
                <Box sx={{ mb: 2 }}>

                  {props.activeStep === 0 ? (

                    <DocumentUploadForm 
                        setActiveStep={props.setActiveStep}  
                        title={props.title}
                        setTitle={props.setTitle}
                        PDFData={props.PDFData}
                        setPDFData={props.setPDFData}
                    />

                  ) : props.activeStep === 1 ? (

                    <EditDocument 
                      title={props.title}
                      setActiveStep={props.setActiveStep}
                    />

                  ) : props.activeStep === 2 && (

                    <EditAnalysisForm 
                      activeStep={props.activeStep}
                      setActiveStep={props.setActiveStep} 
                      topKeywords={props.topKeywords}
                      setTopKeywords={props.setTopKeywords}
                      suggestionKeywords={props.suggestionKeywords}
                      setSuggestionKeywords={props.setSuggestionKeywords}
                      removedKeyword={props.removedKeyword}
                      setRemovedKeyword={props.setRemovedKeyword}
                      title={props.title}
                    />
                    
                  )}
             
                </Box>
              </StepContent>

            </Step>
          ))}
        </Stepper>

      </Grid>
    </Grid>
  );
};

export default NavigationStepper;