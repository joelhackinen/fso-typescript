import CheckIcon from '@mui/icons-material/Check';
import { Diagnosis, HealthCheckEntry as IHealthCheckEntry } from "../../types";

interface HealthCheckEntryProps {
  entry: IHealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntry = ({ entry, diagnoses }: HealthCheckEntryProps) => {
  const { date, description, diagnosisCodes } = entry;
  return (
    <div>
      <CheckIcon />
      <p>{date} {description}</p>
      <ul>
        {diagnosisCodes?.map((code, i) => <li key={i}>{code} {diagnoses.find(d => d.code === code)?.name}</li>)}
      </ul>
    </div>
  )
};

export default HealthCheckEntry;