import { Card } from "@mui/material";

interface Props {
  open: boolean;
  children: JSX.Element[];
}

const AddEntryForm = ({ open, children }: Props) => {
  return (
    <Card hidden={!open} raised style={{ marginTop: 10 }}>
      {children}
    </Card>
  );
};

export default AddEntryForm;