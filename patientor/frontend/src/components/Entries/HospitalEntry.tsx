import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Diagnosis, HospitalEntry as IHospitalEntry } from "../../types";

interface HospitalEntryProps {
  entry: IHospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntry = ({ entry, diagnoses }: HospitalEntryProps) => {
  const { date, description, diagnosisCodes } = entry;
  return (
    <div>
      <LocalHospitalIcon />
      <p>{date} {description}</p>
      <ul>
        {diagnosisCodes?.map((code, i) => <li key={i}>{code} {diagnoses.find(d => d.code === code)?.name}</li>)}
      </ul>
    </div>
  )
};

export default HospitalEntry;