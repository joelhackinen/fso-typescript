import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { HospitalEntry as IHospitalEntry } from "../../types";

interface HospitalEntryProps {
  entry: IHospitalEntry;
}

const HospitalEntry = ({ entry }: HospitalEntryProps) => {
  const { discharge } = entry;
  return (
    <div>
      <LocalHospitalIcon />
      <br />
      <span>Discharge {discharge.date}: "{discharge.criteria}"</span>
    </div>
  )
};

export default HospitalEntry;