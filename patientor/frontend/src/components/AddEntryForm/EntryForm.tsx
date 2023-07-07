import { TextField, Button, Select, SelectChangeEvent, OutlinedInput, MenuItem, Checkbox, ListItemText, InputLabel } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { BaseEntry, Diagnosis, EntryFormValues, EntryOption, HealthCheckRating } from "../../types";

interface Props {
  submit: (values: EntryFormValues) => Promise<void>;
  type: EntryOption;
  diagnoses: Diagnosis[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const EntryForm = ({ submit, type, diagnoses }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [criteria, setCriteria] = useState<string>('');
  const [employer, setEmployer] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [rating, setRating] = useState<HealthCheckRating>(0);
  const [codes, setCodes] = useState<Diagnosis['code'][]>([]);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const base: Omit<BaseEntry, "id"> = {
      description,
      date,
      specialist,
      diagnosisCodes: codes,
    };

    switch (type) {
      case "HealthCheck":
        return submit({
          ...base,
          healthCheckRating: rating
        });
      case "OccupationalHealthcare":
        return submit({
          ...base,
          employerName: employer,
          sickLeave: {
            startDate,
            endDate
          }
        });
      case "Hospital":
        return submit({
          ...base,
          discharge: {
            date: dischargeDate,
            criteria
          }
        });
      default:
        return;
    }
  };

  const handleSelection = (event: SelectChangeEvent<typeof codes>) => {
    const { target: { value } } = event;
    setCodes(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          style={{ marginTop: 10 }}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel id="multiple-checkbox-label">Diagnosis codes</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox-label"
          multiple
          value={codes}
          onChange={handleSelection}
          input={<OutlinedInput label="Diagnosis codes" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {diagnoses.map(({ code }, i) => (
            <MenuItem key={i} value={code} >
              <Checkbox checked={codes.indexOf(code) > -1} />
              <ListItemText primary={code} />
            </MenuItem>
          ))}
        </Select>
        {
          (() => {
            switch (type) {
              case "HealthCheck":
                return (
                  <div>
                    <TextField
                      type="number"
                      label="Health rating"
                      fullWidth 
                      value={rating}
                      onChange={({ target }) => setRating(Number(target.value))}
                    />
                  </div>
                );
              case "OccupationalHealthcare":
                return (
                  <div>
                    <TextField
                      label="Employer name"
                      fullWidth 
                      value={employer}
                      onChange={({ target }) => setEmployer(target.value)}
                    />
                    <TextField
                      type="date"
                      label="Start date"
                      fullWidth 
                      value={startDate}
                      onChange={({ target }) => setStartDate(target.value)}
                    />
                    <TextField
                      type="date"
                      label="End date"
                      fullWidth 
                      value={endDate}
                      onChange={({ target }) => setEndDate(target.value)}
                    />
                  </div>
                );
              case "Hospital":
                return (
                  <div>
                    <TextField
                      type="date"
                      label="Discharge date"
                      fullWidth 
                      value={dischargeDate}
                      onChange={({ target }) => setDischargeDate(target.value)}
                    />
                    <TextField
                      label="criteria"
                      fullWidth 
                      value={criteria}
                      onChange={({ target }) => setCriteria(target.value)}
                    />
                  </div>
                );
            }
          })()
        }
        <Button type="submit" variant="contained">submit</Button>
      </form>
    </div>
  )
};

export default EntryForm;