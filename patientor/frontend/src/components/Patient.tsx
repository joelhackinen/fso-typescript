import { Button, Alert } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Patient, Diagnosis, Entry, EntryFormValues, EntryOption } from "../types";
import patientService from "../services/patients"
import AddEntryForm from "./AddEntryForm";
import axios from "axios";
import EntryComponent from "./Entries/Entry";
import { useNavigate } from "react-router-dom";
import TypeSelector from "./AddEntryForm/TypeSelector";
import EntryForm from "./AddEntryForm/EntryForm";

interface PatientViewProps {
  getPatient: () => Promise<Patient | null>;
  diagnoses: Diagnosis[];
}

const PatientView = ({ getPatient, diagnoses }: PatientViewProps) => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [type, setType] = useState<EntryOption>('HealthCheck');

  useEffect(() => {
    const getAndSet = async () => {
      const p = await getPatient();
      setPatient(p);
    };

    try {
      void getAndSet();
    } catch (_) {
      console.log("Patient not found");
      navigate("/");
    }
  }, [getPatient, navigate]);

  const submit = useCallback(async (values: EntryFormValues): Promise<void> => {
    let entry: Entry;

    if (!patient) return;

    try {
      entry = await patientService.addEntry(values, patient.id);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data);
        return;
      }
      setError("Unknown error");
      return;
    }

    setFormOpen(false);
    setError(undefined);
    setPatient({ ...patient, entries: patient.entries.concat(entry) });
  }, [patient]);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h3>{patient.name} ({patient.gender})</h3>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <Button variant="contained" color="secondary" onClick={() => setFormOpen(!formOpen)}>
        Add new entry
      </Button>
      {error && <Alert severity="info">{error}</Alert>}
      <AddEntryForm open={formOpen}>
        <TypeSelector typeValue={type} setType={setType} />
        <EntryForm submit={submit} type={type} diagnoses={diagnoses} />
      </AddEntryForm>
      {patient.entries.length > 0 && <h3>entries</h3>}
      {patient.entries.map((entry, i) => (
        <div key={i}>
          <EntryComponent entry={entry} diagnoses={diagnoses} />
        </div>
      ))}
    </div>
  );
};

export default PatientView;