import patients from '../../data/patients';
import { 
    NewPatientEntry,
    NonSensitivePatientEntry, 
    PatientEntry 
} from '../types';

import randomstring from 'randomstring';


const getEntries = (): PatientEntry[] => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addEntry = ( entry: NewPatientEntry): PatientEntry => {
    
  const newPatientEntry = {
    id: randomstring.generate(),
    ...entry
  };
  
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
    getEntries,
    addEntry,
    getNonSensitiveEntries
};