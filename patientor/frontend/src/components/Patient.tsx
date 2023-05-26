import { useEffect, useState } from "react";
import { Patient, Diagnosis, Entry } from "../types";
import patientService from "../services/patients"
import { useNavigate } from "react-router-dom";
import HospitalEntry from "./Entries/HospitalEntry";
import OccupationalHealthcareEntry from "./Entries/OccupationalHealthcareEntry";
import HealthCheckEntry from "./Entries/HealthCheckEntry";

interface PatientViewProps {
  id: string | null | undefined;
  diagnoses: Diagnosis[];
}

const PatientView = ({ id, diagnoses } : PatientViewProps) => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        navigate("/");
        return;
      }
      const patient = await patientService.get(id);
      setPatient(patient);
    }

    void fetchPatient();
  }, [id, navigate]);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h3>{patient.name} ({patient.gender})</h3>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      {patient.entries.length > 0 && <h3>entries</h3>}
      {patient.entries.map((entry, i) => (
        <div key={i}>
          <EntryDetails entry={entry} diagnoses={diagnoses} />
        </div>
      ))}
    </div>
  );
};

const EntryDetails = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    default:
      return null;
  }
};

export default PatientView;