import { v1 as uuid } from 'uuid';
import { HospitalEntryWithoutType, OccupationalHealthcareEntry, Entry, Gender, Patient, Diagnosis, BaseEntry, HealthCheckEntry, OccupationalWithoutType, HospitalEntry, HealthCheckWithoutType, Prettify, HealthCheckRating } from '../types';

export const toPatientEntry = (object: unknown): Patient => {
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
  const obj = {
    ...object,
    id: uuid(),
    diagnosisCodes: parseDiagnosisCodes(object),
  };

  if (!(isBaseEntry(obj))) {
    throw new Error('Incorrect or missing data');
  }

  if (isHospitalEntryWithoutType(obj)) {
    const hospitalEntry: Prettify<HospitalEntry> = { ...obj, type: "Hospital" };
    return hospitalEntry;
  }

  if (isOccupationalWithoutType(obj)) {
    const occupationalEntry: Prettify<OccupationalHealthcareEntry> = { ...obj, type: "OccupationalHealthcare" };
    return occupationalEntry;
  }

  if (isHealthCheckWithoutType(obj)) {
    const healthCheckEntry: Prettify<HealthCheckEntry> = { ...obj, type: "HealthCheck" };
    return healthCheckEntry;
  }

  throw new Error('Incorrect or missing data');
};

const isHealthCheckWithoutType = (base: BaseEntry): base is HealthCheckWithoutType => {
  if ('healthCheckRating' in base && isNumber(base.healthCheckRating) && isHealthCheckRating(base.healthCheckRating)) {
    return true;
  }
  return false;
};

const isOccupationalWithoutType = (base: BaseEntry): base is OccupationalWithoutType => {
  if (!('employerName' in base && isString(base.employerName))) {
    return false;
  }
  if (!('sickLeave' in base)) {
    return true;
  }
  if (!(base.sickLeave && typeof base.sickLeave === 'object')) {
    return false;
  }
  if (!('startDate' in base.sickLeave && isString(base.sickLeave.startDate) && isDate(base.sickLeave.startDate))) {
    return false;
  }
  if (('endDate' in base.sickLeave && isString(base.sickLeave.endDate) && isDate(base.sickLeave.endDate))) {
    return false;
  }
  return true;
};

const isHospitalEntryWithoutType = (base: BaseEntry): base is HospitalEntryWithoutType => {
  if (!('discharge' in base && base.discharge && typeof base.discharge === 'object')) {
    return false;
  }
  if (!('date' in base.discharge && isString(base.discharge.date) && isDate(base.discharge.date))) {
    return false;
  }
  if (!('criteria' in base.discharge && isString(base.discharge.criteria))) {
    return false;
  }

  return true;
};

const isBaseEntry = (object: object): object is BaseEntry => {
  if (!('id' in object && isString(object.id))) {
    return false;
  }
  if (!('description' in object && isString(object.description))) {
    return false;
  }
  if (!('date' in object && isString(object.date) && isDate(object.date))) {
    return false;
  }
  if (!('specialist' in object && isString(object.specialist))) {
    return false;
  }
  return true;
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