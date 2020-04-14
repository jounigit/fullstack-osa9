import { State } from "./state";
import { Patient, SetPatientList } from "../types";

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
    };

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

//******************** reducer ****************************/
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
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
    case "UPDATE_PATIENT":
      const items = state.patients;
      // console.log('=Reducer before update=', items);
      const toUpdate = {...action.payload, visited: true};
      // toUpdate.visited = true;
      const newArray = Object.assign([], items, {[action.payload.id]: toUpdate});
      // console.log('=Reducer update=', newArray);
      return {
        ...state,
        patients: newArray
      };
    default:
      return state;
  }
};