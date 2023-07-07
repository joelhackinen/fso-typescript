import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import { Entry, Diagnosis } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryComponent = ({ entry, diagnoses }: Props) => {
  const { date, description, diagnosisCodes } = entry;

  return (
    <div>
      {
        (() => {
          switch (entry.type) {
            case "Hospital":
              return <HospitalEntry entry={entry} />;
            case "OccupationalHealthcare":
              return <OccupationalHealthcareEntry entry={entry} />;
            case "HealthCheck":
              return <HealthCheckEntry entry={entry} />;
            default:
              return null;
          }
        })()
      }
      {diagnosisCodes &&
        <ul>
          {diagnosisCodes.map((code, i) => <li key={i}>{code} {diagnoses.find(d => d.code === code)?.name}</li>)}
        </ul>
      }
      {date} {description}
      <hr />
    </div>
  );
};

export default EntryComponent;