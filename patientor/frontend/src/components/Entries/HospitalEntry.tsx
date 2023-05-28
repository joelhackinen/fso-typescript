import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Diagnosis, HospitalEntry as IHospitalEntry } from "../../types";

interface HospitalEntryProps {
  entry: IHospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntry = ({ entry, diagnoses }: HospitalEntryProps) => {
  const { date, description, diagnosisCodes, discharge } = entry;
  return (
    <div>
      <LocalHospitalIcon />
      {date} {description}
      <ul>
        {diagnosisCodes?.map((code, i) => <li key={i}>{code} {diagnoses.find(d => d.code === code)?.name}</li>)}
      </ul>
      <span>Discharge {discharge.date}: "{discharge.criteria}"</span>
      <hr />
    </div>
  )
};

export default HospitalEntry;