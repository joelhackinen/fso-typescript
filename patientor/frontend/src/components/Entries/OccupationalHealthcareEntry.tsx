import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import { OccupationalHealthcareEntry as IOccupationalHealthcareEntry, Diagnosis } from "../../types";

interface OccupationalHealthcareEntryProps {
  entry: IOccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntry = ({ entry, diagnoses }: OccupationalHealthcareEntryProps) => {
  const { date, description, diagnosisCodes, employerName, sickLeave } = entry;
  return (
    <div>
      <MedicalInformationIcon />
      {date} {description}
      <ul>
        {diagnosisCodes?.map((code, i) => <li key={i}>{code} {diagnoses.find(d => d.code === code)?.name}</li>)}
      </ul>
      <span>Employer: {employerName}</span>
      {sickLeave && <div>Sick leave from {sickLeave.startDate} to {sickLeave.endDate}</div>}
      <hr />
    </div>
  )
};

export default OccupationalHealthcareEntry;