import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { EntryOption } from "../../types";

interface Props {
  typeValue: EntryOption;
  setType: React.Dispatch<React.SetStateAction<EntryOption>>;
}

const TypeSelector = ({ typeValue, setType }: Props) => {
  const typeOptions: Readonly<EntryOption[]> = ['Hospital', 'HealthCheck', 'OccupationalHealthcare'];

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = event.target.value;
    if (typeof value === "string" && (value === 'Hospital' || value === 'HealthCheck' || value === 'OccupationalHealthcare')) {
      setType(value);
    }
  };

  return (
    <Select label="Type" fullWidth value={typeValue} onChange={onTypeChange}>
      {typeOptions.map((value, i) =>
        <MenuItem key={i} value={value}>
          {value}
        </MenuItem>
      )}
    </Select>
  )
};

export default TypeSelector;