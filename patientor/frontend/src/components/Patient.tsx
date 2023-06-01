import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Patient, Diagnosis, Entry, EntryFormValues } from "../types";
import patientService from "../services/patients"
import HospitalEntry from "./Entries/HospitalEntry";
import OccupationalHealthcareEntry from "./Entries/OccupationalHealthcareEntry";
import HealthCheckEntry from "./Entries/HealthCheckEntry";
import AddEntryForm from "./AddEntryForm";
import EntryForm from "./AddEntryForm/EntryForm";
import Error from "./Error";
import axios from "axios";
import BaseEntry from "./Entries/BaseEntry";

interface PatientViewProps {
  getPatient: () => Promise<Patient | null>;
  diagnoses: Diagnosis[];
}

const PatientView = ({ getPatient, diagnoses }: PatientViewProps) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getAndSet = async () =>{
      const p = await getPatient();
      setPatient(p);
    };

    void getAndSet();
  }, [getPatient]);

  if (!patient) {
    return null;
  }

  const submit = async (values: EntryFormValues): Promise<void> => {
    let entry: Entry;

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
  };

  return (
    <div>
      <h3>{patient.name} ({patient.gender})</h3>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <Button variant="contained" color="secondary" onClick={() => setFormOpen(!formOpen)}>
        Add new entry
      </Button>
      <Error error={error} />
      <AddEntryForm open={formOpen}>
        <EntryForm submit={submit} />
      </AddEntryForm>
      {patient.entries.length > 0 && <h3>entries</h3>}
      {patient.entries.map((entry, i) => (
        <div key={i}>
          <BaseEntry entry={entry} diagnoses={diagnoses} >
            <EntryDetails entry={entry} />
          </BaseEntry>
        </div>
      ))}
    </div>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    default:
      return null;
  }
};

export default PatientView;