import React from "react";
import { 
  HealthCheckEntry, 
  HealthCheckRating, 
  Diagnosis,
} from '../types';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField } from "./FormField";
import { DiagnosisSelection, 
  SelectField,
  HealthCheckRatingOption
  // NumberField 
} from "../AddPatientModal/FormField";

export type HealthEntryFormValues = Omit<HealthCheckEntry, "id">;

export type EntryFormValues = | HealthEntryFormValues;

interface FormProps {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
    diagnosis: Diagnosis[];
}

const healthCheckRatingOption: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "LowRisk" },
  { value: HealthCheckRating.HighRisk, label: "HighRisk" },
  { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk"}
];

  //*********** parse string ******************/ 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

export const healthForm: React.FC<FormProps> = ({ onSubmit, onCancel, diagnosis }) => 
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
            } else if (!/^\d{4}-\d{2}-\d{2}$/.exec(values.date)) {
              errors.date = formatError;
            }
            if (!values.specialist) {
              errors.specialist = requiredError;
            } else if (!isString(values.specialist)) {
              errors.specialist = stringError;
            }
            if (!values.diagnosisCodes) {
              errors.diagnosisCodes = requiredError;
            }
            // if (!values.healthCheckRating) {
            //   errors.healthCheckRating = requiredError;
            // }
 
            if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
              errors.healthCheckRating = "Must be a number 0-3";
            }
            return errors;
          }}
        >
          {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
            return (
              <Form className="form ui">
                <SelectField
                  label="Health Check Rating (0-3)"
                  name="healthCheckRating"
                  options={healthCheckRatingOption}
                />
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
                {/* <Field
                  label="Health Check Rating (0-3)"
                  // placeholder="Rating 0-3"
                  name="healthCheckRating"
                  component={NumberField}
                  min={-1}
                  max={3}
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
    </Formik>;