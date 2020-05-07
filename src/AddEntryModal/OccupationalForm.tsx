import React from "react";
import {
  Diagnosis,
  OccupationalHealthcareEntry,
  // EntryType
} from '../types';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

// import { useStateValue } from "../state";
import { TextField } from "./FormField";
import { DiagnosisSelection } from "../AddPatientModal/FormField";

export type OccupationalHealthcareFormValues = Omit<OccupationalHealthcareEntry, "id">;

export type EntryFormValues = | OccupationalHealthcareFormValues;

interface FormProps {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
    diagnosis: Diagnosis[];
  }

  //*********** parse string ******************/ 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

export const occupationalForm: React.FC<FormProps> = ({ onSubmit, onCancel, diagnosis }) => 
<Formik
    initialValues={{
    description: "",
    date: "",
    type: "OccupationalHealthcare",
    specialist: "",
    diagnosisCodes: [],
    employerName: "",
    sickLeave: {
      startDate: "",
      endDate: ""
    }
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
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date)) {
        errors.date = formatError;
        }
        if (!values.specialist) {
        errors.specialist = requiredError;
        } else if (!isString(values.specialist)) {
        errors.specialist = stringError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
          } else if (!isString(values.employerName)) {
          errors.employerName = stringError;
          }
        if (!values.diagnosisCodes) {
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
              label="EmployerName"
              placeholder="EmployerName"
              name="employerName"
              component={TextField}
            />
            <Field
              label="SickLeave StartDate"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="SickLeave EndDate"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
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
