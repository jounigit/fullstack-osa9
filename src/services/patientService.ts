import patients from '../../data/patients';
import { 
    NewPatient,
    PublicPatient, 
    Patient,
    Entry
} from '../types';

import randomstring from 'randomstring';
// import e from 'express';

//*********** get all  '****************************/
const getEntries = (): Patient[] => {
    return patients;
};


//*********** get all publics  '****************************/
const getPublicPatients = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

//*********** get one  '****************************/
const findById = (id: string): Patient | undefined  => {
    const patient = patients.find(p => p.id === id);

    const getType = ( entry: Entry ) => {
        switch (entry.type) {
            case "HealthCheck":
                return {
                    id: entry.id,
                    date: entry.date,
                    type: entry.type,
                    specialist: entry.specialist,
                    diagnosisCodes: entry.diagnosisCodes,
                    description: entry.description,
                    healthCheckRating: entry.healthCheckRating
                };
            case "OccupationalHealthcare":
                return {
                    id: entry.id,
                    date: entry.date,
                    type: entry.type,
                    specialist: entry.specialist,
                    diagnosisCodes: entry.diagnosisCodes,
                    description: entry.description,
                    employerName: entry.employerName,
                    sickLeave: entry.sickLeave
                };
            case "Hospital":
                return {
                    id: entry.id,
                    date: entry.date,
                    type: entry.type,
                    specialist: entry.specialist,
                    diagnosisCodes: entry.diagnosisCodes,
                    description: entry.description,
                    discharge: entry.discharge
                };
        }
    };

    if (patient === undefined) { return undefined; }

        const entries = patient.entries.map( getType );

        const patientRes = {
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            ssn: patient.ssn,
            gender: patient.gender,
            occupation: patient.occupation,
            entries: entries,
            id: patient.id
        };
        
        return patientRes;
};

//*********** add new  '****************************/
const addEntry = ( entry: NewPatient): Patient => {
    
  const newPatient = {
    id: randomstring.generate(),
    ...entry
  };
  
  patients.push(newPatient);
  return newPatient;
};

export default {
    getEntries,
    addEntry,
    getPublicPatients,
    findById
};

// ***********
// const entries = patient.entries.map(({ ...entry }: Entry) => ({
//     id,
//     date: entry.date,
//     type: entry.type,
//     specialist: entry.specialist,
//     diagnosisCodes: entry.diagnosisCodes,
//     description: entry.description,
//     getType( ),
//     // employerName: entry.employerName,
//     // discharge: entry.discharge
// }));

// const getType = (
//     type: string, 
//     healthCheckRating?: number, 
//     employerName?: string,
//     sickLeave?: SickLeave,
//     discharge?: Discharge,
//      ) => {
//     switch (type) {
//         case "HealthCheck":
//             return {
//                 // type, 
//                 healthCheckRating };
//         case "OccupationalHealthcare":
//             return {
//                 employerName,
//                 sickLeave
//             };
//         case "Hospital":
//             return {
//                 discharge
//             };
//         default: return undefined;
//     }
// };