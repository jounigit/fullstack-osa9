/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender } from './types';

//*********** parse string ******************/ 
const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (param: any): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing input: ' + param);
  }  
  return param;
};


//*********** parse date ******************/
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

//*********** parse date ******************/
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const toNewPatientEntry = (object: { name: any; dateOfBirth: any; ssn: any; gender: any; occupation: any }): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
    };

    return newEntry;
};

export default toNewPatientEntry;