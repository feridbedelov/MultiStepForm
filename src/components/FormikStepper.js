import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Button, Grid, Stepper, Step, StepLabel, CircularProgress } from "@material-ui/core";

export function FormikStepper({ children, ...props }) {
  const childrenArray = React.Children.toArray(children);

  const [step, setStep] = useState(0);

  const [completed, setCompleted] = useState(false);

  const currentChild = childrenArray[step];

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      validationSchema={currentChild.props.validationSchema}
      {...props}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          const forward  = await currentChild.props.onSubmit(values);
          forward && setStep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete='off'>
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <Grid container spacing={2}>
            {step > 0 && (
              <Grid item>
                <Button
                  disabled={completed || isSubmitting}
                  variant='contained'
                  color='primary'
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button startIcon = {isSubmitting && <CircularProgress size = "1rem" />} variant='contained' color='primary' type='submit' disabled = {isSubmitting || completed} >
                { isSubmitting ? "Submitting" :  isLastStep() ? "Submit" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
