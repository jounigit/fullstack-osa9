import React from "react";
import { 
  HealthCheckEntry, 
  HospitalEntry,
} from '../types';

import { useStateValue } from "../state";
import { healthForm } from "./healthForm";
import { hospitalForm } from "./hospitalForm";

export type HealthEntryFormValues = Omit<HealthCheckEntry, "id">;

export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;

export type EntryFormValues = 
| HealthEntryFormValues 
| HospitalEntryFormValues
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
    default:
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(entryType)}`
      ); 
  }
};

export default AddEntryForm;
