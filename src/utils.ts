/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, 
  EntryType,
  Entry,
} from './types';
import { v4 as uuidv4 } from 'uuid';

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

//*********** parse gender ******************/
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

//*********** new patient ******************/
export const toNewPatient = (object: { name: any; dateOfBirth: any; ssn: any; gender: any; occupation: any }): NewPatient => {
  const newEntry: NewPatient = {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        entries: []
    };
    return newEntry;
};

//*********** parse entry ******************/
const isEntryType = (entry: any): entry is EntryType => {
	return Object.values(EntryType).includes(entry);
};

const parseEntryType = (entry: any): EntryType => {
  if ( !isEntryType(entry)) {
    throw new Error(`Incorrect or missing type: ${entry}`);
  }
  return entry;
};

/**
 * Helper function for exhaustive type checking
 */
// const assertNever = (value: never): never => {
//   throw new Error(
//     `Unhandled discriminated union member: ${JSON.stringify(value)}`
//   );
// };

//*********** new entry ******************/
export const toNewEntry = (object: any): Entry => {
  const entryType = parseEntryType(object.type);

  const baseEntry = {
    id: uuidv4(),
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    diagnosisCodes: object.diagnosisCodes,
    type: entryType,
  };

  switch (entryType) {
    case "HealthCheck":
      return {
        ...baseEntry,
        type: entryType,
        healthCheckRating: object.healthCheckRating,
      };
    case "Hospital":
      return {
        ...baseEntry,
        type: entryType,
        discharge: {
          date: object.discharge.date,
          criteria: object.discharge.criteria,
        }
      };
    case "OccupationalHealthcare":
      return {
        ...baseEntry,
        type: entryType,
        employerName: parseString(object.employerName),
        sickLeave: {
          startDate: object.sickLeave.startDate,
          endDate: object.sickLeave.endDate,
        }
      };
      default:
        throw new Error(
          `Unhandled discriminated union member`
        );
        // return undefined;
        // return assertNever(entryType);
  }
};
