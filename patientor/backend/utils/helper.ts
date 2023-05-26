import { v1 as uuid } from 'uuid';
import { Entry, Gender, Patient } from '../types';

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