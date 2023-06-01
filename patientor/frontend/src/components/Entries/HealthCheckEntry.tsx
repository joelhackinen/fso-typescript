import CheckIcon from '@mui/icons-material/Check';
import { HealthCheckEntry as IHealthCheckEntry } from "../../types";

interface HealthCheckEntryProps {
  entry: IHealthCheckEntry;
}

const HealthCheckEntry = ({ entry }: HealthCheckEntryProps) => {
  const { healthCheckRating } = entry;

  return (
    <div>
      <CheckIcon />
      <br />
      Rating {healthCheckRating}
    </div>
  )
};

export default HealthCheckEntry;