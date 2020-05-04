import React from "react";
import { 
  HealthCheckEntry,  
  HospitalEntry,
  Diagnosis,
  // EntryType
} from '../types';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

// import { useStateValue } from "../state";
import { TextField } from "./FormField";
import { DiagnosisSelection } from "../AddPatientModal/FormField";

export type HealthEntryFormValues = Omit<HealthCheckEntry, "id">;

export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;

export type EntryFormValues = 
| HealthEntryFormValues 
| HospitalEntryFormValues
;

interface FormProps {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
    // entryType: string;
    diagnosis: Diagnosis[];
  }

  //*********** parse string ******************/ 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

export const hospitalForm: React.FC<FormProps> = ({ onSubmit, onCancel, diagnosis }) => 
<Formik
    initialValues={{
    description: "",
    date: "",
    type: "Hospital",
    specialist: "",
    diagnosisCodes: [],
    discharge: {
        date: "",
        criteria: "",
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
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
            />
                <Field
                  label="Discharge Criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
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
