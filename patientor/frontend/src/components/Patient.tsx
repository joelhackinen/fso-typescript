import { Patient } from "../types";

interface PatientViewProps {
  patient: Patient | null | undefined;
}

const PatientView = ({ patient } : PatientViewProps) => {
  if (!patient) return null;

  return (
    <div>
      <h3>{patient.name} ({patient.gender})</h3>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientView;