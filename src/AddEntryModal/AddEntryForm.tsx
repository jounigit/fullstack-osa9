import React from "react";
import { HealthCheckEntry, HealthCheckRating } from '../types';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { useStateValue } from "../state";
import { TextField } from "./FormField";
import {  } from "../types";
import { DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

//*********** parse string ******************/ 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const parseString = (param: any): string => {
// if (!param || !isString(param)) {
//   throw new Error('Incorrect or missing input: ' + param);
// }  
// return param;
// };


export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();
  console.log('=DIAGNOSIS=', diagnosis);
  
  return (
    <Formik
    initialValues={{
      description: "",
      date: "",
      type: "HealthCheck",
      specialist: "",
      diagnosisCodes: [],
      healthCheckRating: HealthCheckRating.Healthy,
    }}
      onSubmit={onSubmit}
      validate={values => {
        const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
        const requiredError = "Field is required";
        const stringError = "Field must be a string";
        const formatError = "Field is not in right format";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!isString(values.description)) {
          errors.description = stringError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!dateFormat.exec(values.date)) {
          errors.date = formatError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!isString(values.specialist)) {
          errors.specialist = stringError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.diagnosisCodes = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Field
              label="Health Check Rating (0-3)"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            {/* <Field
              label="Health Check Rating (0-3)"
              placeholder="0-3"
              name="healthCheckRating"
              component={TextField}
            /> */}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
