import { Entry, Diagnosis } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
  children: JSX.Element;
}

const BaseEntry = ({ entry, diagnoses, children }: Props) => {
  const { date, description, diagnosisCodes } = entry;

  return (
    <div>
      {children}
      {diagnosisCodes &&
        <ul>
          {diagnosisCodes?.map((code, i) => <li key={i}>{code} {diagnoses.find(d => d.code === code)?.name}</li>)}
        </ul>
      }
      {date} {description}
      <hr />
    </div>
  );
};

export default BaseEntry;