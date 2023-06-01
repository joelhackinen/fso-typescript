type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
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


interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: {
    date: string;
    criteria: string;
  };
}

export type PHealthCheckEntry = Prettify<HealthCheckEntry>;
export type POccupationalHealthcareEntry = Prettify<OccupationalHealthcareEntry>;
export type PHospitalEntry = Prettify<HospitalEntry>;
export type Entry = PHealthCheckEntry | POccupationalHealthcareEntry | PHospitalEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

type OmitCommonProperties<T, U> = Pick<T, Exclude<keyof T, keyof U>> & Pick<U, Exclude<keyof U, keyof T>>;

export type Result = Prettify<OmitCommonProperties<BaseEntry, HospitalEntry>>;

