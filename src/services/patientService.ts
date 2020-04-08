import patients from '../../data/patients';
import { 
    NewPatient,
    PublicPatient, 
    Patient 
} from '../types';

import randomstring from 'randomstring';

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
const findById = (id: string): Patient | undefined => {
    const patient: Patient = patients.find(p => p.id === id);
    const patientRes: Patient = {
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        ssn: patient.ssn,
        gender: patient.gender,
        occupation: patient.occupation,
        entries: [],
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