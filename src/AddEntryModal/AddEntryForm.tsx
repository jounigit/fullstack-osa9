import React from "react";
import { useStateValue } from "../state";
import { healthForm, HealthEntryFormValues } from "./healthForm";
import { hospitalForm, HospitalEntryFormValues } from "./hospitalForm";
import { OccupationalHealthcareFormValues, occupationalForm } from "./OccupationalForm";

export type EntryFormValues = 
| HealthEntryFormValues 
| HospitalEntryFormValues
| OccupationalHealthcareFormValues
;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  entryType: string;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel, entryType }) => {
  const [{ diagnosis }] = useStateValue();

  if (!entryType) return null;
  switch (entryType) {
    case "HealthCheck":
      return ( healthForm({ onSubmit, onCancel, diagnosis }) );
    case "Hospital":
      return ( hospitalForm({ onSubmit, onCancel, diagnosis }) );
      case "OccupationalHealthcare":
        return ( occupationalForm({ onSubmit, onCancel, diagnosis }) );
    default:
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(entryType)}`
      ); 
  }
};

export default AddEntryForm;
