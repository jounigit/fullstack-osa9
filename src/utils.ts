/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry } from './types';

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const parseString = (stringToParse: any): string => {
    if (!stringToParse || !isString(stringToParse)) {
      throw new Error('Incorrect or missing comment: ' + stringToParse);
    }
  
    return stringToParse;
  };

const toNewPatientEntry = (object: { name: any; dateOfBirth: any; ssn: any; gender: any; occupation: any }): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
        name: parseString(object.name),
        dateOfBirth: parseString(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseString(object.gender),
        occupation: parseString(object.occupation),
    };

    return newEntry;
};

export default toNewPatientEntry;