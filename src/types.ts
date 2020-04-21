export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

/*************** patient types ********************** */
export enum Gender {
    Male = 'male', 
    Female = 'female',
    Other = 'other' 
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

/************** entry types *********************** */
export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    type: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum EntryType {
    HealthCheck = "HealthCheck",
    Hospital = "Hospital",
    OccupationalHealthcare = "OccupationalHealthcare",
  }

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}
  
interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

export interface Discharge {
    date: string;
    criteria: string;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge?: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

/************************************************ */

// export type NewEntry = {
//     description: string;
//     date: string;
//     type: string;
//     specialist: string;
//     diagnosisCodes?: Array<Diagnosis['code']>;
//     employerName?: string;
//     sickLeave?: SickLeave;
//     healthCheckRating?: number;
//     discharge?: Discharge;
// };


// export type NewEntry = Omit<BaseEntry, 'id' | 'diagnosisCodes'>;
