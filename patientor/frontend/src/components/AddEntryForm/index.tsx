import { Card } from "@mui/material";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { EntryOption } from "../../types";
import React, { useState, useMemo } from "react";

interface Props {
  open: boolean;
  children: JSX.Element;
}

const AddEntryForm = ({ open, children }: Props) => {
  const [type, setType] = useState<EntryOption>('Hospital');

  const typeOptions: EntryOption[] = ['Hospital', 'HealthCheck', 'OccupationalHealthcare'];

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = event.target.value;
    if (typeof value === "string" && (value === 'Hospital' || value === 'HealthCheck' || value === 'OccupationalHealthcare')) {
      setType(value);
    }
  };

  const modifiedChildren = useMemo(() => React.Children.map(children, (child) => {
    return React.cloneElement(child, { type });
  }), [type, children]);

  return (
    <Card hidden={!open} raised>
      <Select label="Type" fullWidth value={type} onChange={onTypeChange}>
        {typeOptions.map((value, i) =>
          <MenuItem key={i} value={value}>
            {value}
          </MenuItem>
        )}
      </Select>
      {modifiedChildren}
    </Card>
  );
};

export default AddEntryForm;