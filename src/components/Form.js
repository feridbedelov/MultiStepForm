import React from "react";

import { CardContent, Box, Card } from "@material-ui/core";
import { FormikStepper } from "./FormikStepper";
import { Field } from "formik";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { object, string, number, mixed } from "yup";




const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

const initialValues = {
  firstName: "",
  lastName: "",
  millionaire: false,
  money: 0,
  moreInfo: "",
};

const validationSchemaForFirstStep = object({
  firstName: string().required(),
  lastName: string().required(),
});

const validationSchemaForSecondStep = object({
  money: mixed().when("millionaire", {
    is: true,
    then: number().required().min(1_000_000),
    otherwise: number().required(),
  }),
});

const validationSchemaForThirdStep = object({
  moreInfo: string().required(),
});

const firstSubmit = async (values) => {
  if (window.confirm("you sure?")) {
     await sleep(1000);
    alert(JSON.stringify(values, null, 4));
    return true
  }
  return false
};

const secondSubmit = async (values) => {
  if (window.confirm("you are sure?")) {
    await sleep(1000);
    alert(JSON.stringify(values, null, 4));
    return true
  }
  return false

};






const MultiStepForm = () => {
  return (
    <Card>
      <CardContent>
        <FormikStepper
          initialValues={initialValues}
          onSubmit={async (values) => {
            await sleep(3000);
            alert(JSON.stringify(values, null, 4));
          }}
        >
          <FormikStep
            label='Personal Info'
            onSubmit = {firstSubmit}
            validationSchema={validationSchemaForFirstStep}
          >
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name='firstName'
                component={TextField}
                label='First Name'
              />
            </Box>

            <Box paddingBottom={2}>
              <Field
                fullWidth
                name='lastName'
                component={TextField}
                label='Last Name'
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                name='millionaire'
                type='checkbox'
                component={CheckboxWithLabel}
                Label={{ label: "I am a millionaire" }}
              />
            </Box>
          </FormikStep>
          <FormikStep
            label='How much money you got?'
            validationSchema={validationSchemaForSecondStep}
            onSubmit = {secondSubmit}
          >
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name='money'
                type='number'
                component={TextField}
                label='All the money I have'
              />
            </Box>
          </FormikStep>
          <FormikStep
            label='More Information'
            validationSchema={validationSchemaForThirdStep}
          >
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name='moreInfo'
                component={TextField}
                label='Description'
              />
            </Box>
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
};

export const FormikStep = ({ children }) => children;

export default MultiStepForm;
