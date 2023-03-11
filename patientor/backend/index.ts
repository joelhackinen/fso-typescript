import express from 'express';
import cors from 'cors';

import diagnoses from './data/diagnoses';
import patients from './data/patients';
import { Diagnose, PatientNoSsn } from './types';

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});