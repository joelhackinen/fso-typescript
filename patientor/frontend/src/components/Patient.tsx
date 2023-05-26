import { useEffect, useState } from "react";
import { Patient } from "../types";
import patientService from "../services/patients"
import { useNavigate } from "react-router-dom";

interface PatientViewProps {
  id: string | null | undefined;
}

const PatientView = ({ id } : PatientViewProps) => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        navigate("/");
        return null;
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
      {patient.entries.map(({ date, description, diagnosisCodes }, i) => (
        <div key={i}>
          <p>{date} {description}</p>
          <ul>
            {diagnosisCodes?.map((code, i) => <li key={i}>{code}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientView;