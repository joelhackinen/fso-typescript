import { v1 as uuid } from 'uuid';
import { OccupationalHealthcareEntry, Entry, Gender, Patient, Diagnosis, BaseEntry, HealthCheckEntry, HospitalEntry, HealthCheckRating } from '../types';

export const toPatient = (object: unknown): Patient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
    const patient: Patient = {
      id: uuid(),
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };
    return patient;
  }
  throw new Error('Incorrect or missing data');
};

export const toEntry = (object: unknown): Entry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (!('description' in object && 'date' in object && 'specialist' in object)) {
    throw new Error('Incorrect or missing data');
  }

  const base: BaseEntry = {
    id: uuid(),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object),
  };

  if ('employerName' in object) {
    const occupational: OccupationalHealthcareEntry = {
      ...base,
      type: 'OccupationalHealthcare',
      employerName: parseEmployerName(object.employerName),
      sickLeave: parseSickLeave(object),
    };
    return occupational;
  }

  if ('discharge' in object) {
    const hospital: HospitalEntry = {
      ...base,
      type: 'Hospital',
      discharge: parseDischarge(object.discharge),
    };
    return hospital;
  }

  if ('healthCheckRating' in object) {
    const healthCheck: HealthCheckEntry = {
      ...base,
      type: 'HealthCheck',
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };
    return healthCheck;
  }

  throw new Error('Incorrect or missing data');
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!(rating && isNumber(rating) && isHealthCheckRating(rating))) {
    throw new Error('Incorrect or missing health check rating');
  }
  return rating;
};

const parseDischarge = (discharge: unknown): { date: string, criteria: string } => {
  if (!(discharge && typeof discharge === 'object')) {
    throw new Error('Incorrect or missing discharge');
  }
  if (!('date' in discharge && isString(discharge.date) && isDate(discharge.date))) {
    throw new Error('Incorrect or missing discharge date');
  }
  if (!('criteria' in discharge && isString(discharge.criteria))) {
    throw new Error('Incorrect or missing discharge criteria');
  }
  return {
    date: discharge.date,
    criteria: discharge.criteria
  };
};

const parseEmployerName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect employer name');
  }
  return name;
};

const parseSickLeave = (object: object): undefined | { startDate: string, endDate: string } => {
  if (!('sickLeave' in object && object.sickLeave)) {
    return undefined;
  }
  const { sickLeave } = object;
  if (!(typeof sickLeave === 'object' && 'startDate' in sickLeave && 'endDate' in sickLeave)) {
    throw new Error('Incorrect sickLeave'); 
  }
  if (!(isString(sickLeave.startDate) && isDate(sickLeave.startDate))) {
    throw new Error('Incorrect or missing startDate');
  }
  if (!(isString(sickLeave.endDate) && isDate(sickLeave.endDate))) {
    throw new Error('Incorrect or missing endDate');
  }
  return { startDate: sickLeave.startDate, endDate: sickLeave.endDate };
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseEntries = (entries: unknown) => {
  if (!isArrayOfEntries(entries)) {
    throw new Error('Incorrect or missing entries');
  }
  return entries;
};

const isArrayOfEntries = (list: unknown): list is Entry[] => {
  return Array.isArray(list) && list.every(item => isEntry(item));
};

const isEntry = (object: unknown): object is Entry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  return 'type' in object && isString(object.type) && ["Hospital", "OccupationalHealthcare", "HealthCheck"].includes(object.type);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === 'number' || text instanceof Number;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseSpecialist = (specialist: unknown) => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseDescription = (desc: unknown) => {
  if (!desc || !isString(desc)) {
    throw new Error('Incorrect or missing description: ' + desc);
  }
  return desc;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
      throw new Error('Incorrect name: ' + name);
  }
  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
      throw new Error('Incorrect ssn: ' + ssn);
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect occupation: ' + occupation);
  }
  return occupation;
};