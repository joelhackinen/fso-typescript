import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import { OccupationalHealthcareEntry as IOccupationalHealthcareEntry } from "../../types";

interface OccupationalHealthcareEntryProps {
  entry: IOccupationalHealthcareEntry;
}

const OccupationalHealthcareEntry = ({ entry }: OccupationalHealthcareEntryProps) => {
  const { employerName, sickLeave } = entry;
  return (
    <div>
      <MedicalInformationIcon />
      <br />
      <span>Employer: {employerName}</span>
      {sickLeave && <div>Sick leave from {sickLeave.startDate} to {sickLeave.endDate}</div>}
    </div>
  )
};

export default OccupationalHealthcareEntry;