import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useMatch, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, NonSensitivePatient } from "./types";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import PatientView from "./components/Patient";

const App = () => {
  const [patients, setPatients] = useState<NonSensitivePatient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    const fetchDiagnoseList = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };

    void fetchPatientList();
    void fetchDiagnoseList();
  }, []);

  const match = useMatch("/patients/:id");

  const patient = match 
    ? patients.find(p => p.id === match.params.id)
    : undefined;

  const getPatient = useCallback(async () => {
    if (patient) {
      const p = await patientService.get(patient.id);
      return p;
    }
    return null;
  }, [patient]);
  
  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
          <Route path="/patients/:id" element={<PatientView getPatient={getPatient} diagnoses={diagnoses} />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
