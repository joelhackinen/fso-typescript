import express from 'express';
import cors from 'cors';

import data from './data/diagnoses';
import { Diagnose } from './types';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  const diagnoses: Diagnose[] = data;
  res.json(diagnoses);
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});