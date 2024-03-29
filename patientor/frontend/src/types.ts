type Prettify<T> = {
  [K in keyof T]: T[K]
} & {};

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
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

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: {
    date: string;
    criteria: string;
  };
}

type IEntry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;
export type Entry = Prettify<IEntry>;

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

export type EntryOption = Entry['type'];

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type EntryFormValues =
  | Omit<HealthCheckEntry, "id" | "type">
  | Omit<OccupationalHealthcareEntry, "id" | "type">
  | Omit<HospitalEntry, "id" | "type">;