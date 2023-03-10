import express from 'express';
import cors from 'cors';

import diagnoses from './data/diagnoses';
import patients from './data/patients';
import { Diagnose, PatientNoSsn } from './types';
import { toPatientEntry } from './utils/helper';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  const data: Diagnose[] = diagnoses;
  res.json(data);
});

app.get('/api/patients', (_req, res) => {
  const data: PatientNoSsn[] = patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));

  res.json(data);
});

app.post('/api/patients', (req, res) => {
  try {
    const newPatient = toPatientEntry(req.body);
    patients.push(newPatient);
    res.json(newPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});