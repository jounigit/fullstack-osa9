import { State } from "./state";
import { Patient, SetPatientList, Diagnosis, Entry } from "../types";

//******************** types ****************************/
export type Action =
  | SetPatientList
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSE_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: Entry;
      id: string;
    }  
    ;

//******************** action creators ****************************/
export const setPatientList = (patientListFromApi: Patient[]): Action  => {
  return {
    type: "SET_PATIENT_LIST", payload: patientListFromApi
  };
};

export const addPatient = (newPatient: Patient): Action  => {
  return {
    type: "ADD_PATIENT", payload: newPatient
  };
};

export const updatePatient = (patient: Patient): Action  => {
  return {
    type: "UPDATE_PATIENT", payload: patient
  };
};

export const setDiagnoseList = (diagnoseListFromApi: Diagnosis[]): Action  => {
  return {
    type: "SET_DIAGNOSE_LIST", payload: diagnoseListFromApi
  };
};

export const addEntry = (entry: Entry, id: string): Action  => {
  return {
    type: "ADD_ENTRY", 
    payload: entry,
    id: id
  };
};

//******************** reducer ****************************/
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DIAGNOSE_LIST":
      return {...state, diagnosis: action.payload};
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }       
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      const patient = state.patients[action.id];
      const toUpdateEntries = [...patient.entries, action.payload];
      // const toUpdatePatient = {...patient.entries, entries: action.payload};
      const toUpdatePatient = {...patient, entries: toUpdateEntries};
      // console.log('=PATIENT Reducer=', toUpdatePatient);
      const updatedPatients = Object.assign([], state.patients, {[action.id]: toUpdatePatient});
      return {
        ...state,
        patients: updatedPatients
      };
    case "UPDATE_PATIENT":
      const items = state.patients;
      const toUpdate = {...action.payload, visited: true};
      const newArray = Object.assign([], items, {[action.payload.id]: toUpdate});
      return {
        ...state,
        patients: newArray
      };
    default:
      return state;
  }
};