import { TextField, Button } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { BaseEntry, EntryFormValues, EntryOption, HealthCheckRating } from "../../types";

interface Props {
  submit: (values: EntryFormValues) => Promise<void>;
  type?: EntryOption;
}

const EntryForm = ({ submit, type }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [criteria, setCriteria] = useState<string>('');
  const [employer, setEmployer] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [rating, setRating] = useState<HealthCheckRating>(0);
  const [codes, setCodes] = useState<string>('');

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const splittedCodes = codes.split(", ");
    const diagnosisCodes = splittedCodes[0] === "" ? undefined : splittedCodes;


    const base: Omit<BaseEntry, "id"> = {
      description,
      date,
      specialist,
      diagnosisCodes,
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

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
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
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={codes}
          onChange={({ target }) => setCodes(target.value)}
        />
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