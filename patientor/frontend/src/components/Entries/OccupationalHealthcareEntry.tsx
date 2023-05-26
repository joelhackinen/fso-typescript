import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import { OccupationalHealthcareEntry as IOccupationalHealthcareEntry, Diagnosis } from "../../types";

interface OccupationalHealthcareEntryProps {
  entry: IOccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntry = ({ entry, diagnoses }: OccupationalHealthcareEntryProps) => {
  const { date, description, diagnosisCodes } = entry;
  return (
    <div>
      <MedicalInformationIcon />
      <p>{date} {description}</p>
      <ul>
        {diagnosisCodes?.map((code, i) => <li key={i}>{code} {diagnoses.find(d => d.code === code)?.name}</li>)}
      </ul>
    </div>
  )
};

export default OccupationalHealthcareEntry;